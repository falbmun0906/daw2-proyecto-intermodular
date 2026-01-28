package com.example.backend.model;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Tests unitarios para la entidad Ingrediente.
 * Valida la lógica de negocio, validaciones y constraints del modelo.
 */
@DisplayName("Tests de la entidad Ingrediente")
class IngredienteTest {

    private static Validator validator;

    @BeforeAll
    static void setUp() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
    }

    @Test
    @DisplayName("Debe crear un ingrediente válido con todos los campos requeridos")
    void testCrearIngredienteValido() {
        // Given
        Ingrediente ingrediente = Ingrediente.builder()
                .nombre("Tomate")
                .categoria("Verduras")
                .unidadDefecto("kg")
                .caloriasPorUnidad(18)
                .build();

        // When
        Set<ConstraintViolation<Ingrediente>> violations = validator.validate(ingrediente);

        // Then
        assertTrue(violations.isEmpty(), "No debe haber violaciones de validación");
        assertEquals("Tomate", ingrediente.getNombre());
        assertEquals("Verduras", ingrediente.getCategoria());
        assertEquals("kg", ingrediente.getUnidadDefecto());
        assertEquals(18, ingrediente.getCaloriasPorUnidad());
    }

    @Test
    @DisplayName("Debe fallar cuando el nombre tiene menos de 2 caracteres")
    void testNombreLongitudMinima() {
        // Given
        Ingrediente ingrediente = Ingrediente.builder()
                .nombre("A") // 1 caracter
                .unidadDefecto("kg")
                .build();

        // When
        Set<ConstraintViolation<Ingrediente>> violations = validator.validate(ingrediente);

        // Then
        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
                .anyMatch(v -> v.getPropertyPath().toString().equals("nombre")));
    }

    @Test
    @DisplayName("Debe fallar cuando el nombre excede 100 caracteres")
    void testNombreLongitudMaxima() {
        // Given
        String nombreLargo = "A".repeat(101); // más de 100 caracteres
        Ingrediente ingrediente = Ingrediente.builder()
                .nombre(nombreLargo)
                .unidadDefecto("kg")
                .build();

        // When
        Set<ConstraintViolation<Ingrediente>> violations = validator.validate(ingrediente);

        // Then
        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
                .anyMatch(v -> v.getPropertyPath().toString().equals("nombre")));
    }

    @Test
    @DisplayName("Debe fallar cuando la unidad por defecto es nula o vacía")
    void testUnidadDefectoObligatoria() {
        // Given
        Ingrediente ingrediente = Ingrediente.builder()
                .nombre("Tomate")
                .unidadDefecto(null)
                .build();

        // When
        Set<ConstraintViolation<Ingrediente>> violations = validator.validate(ingrediente);

        // Then
        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
                .anyMatch(v -> v.getPropertyPath().toString().equals("unidadDefecto")));
    }

    @Test
    @DisplayName("Debe fallar cuando las calorías son negativas")
    void testCaloriasNoNegativas() {
        // Given
        Ingrediente ingrediente = Ingrediente.builder()
                .nombre("Tomate")
                .unidadDefecto("kg")
                .caloriasPorUnidad(-10) // negativas
                .build();

        // When
        Set<ConstraintViolation<Ingrediente>> violations = validator.validate(ingrediente);

        // Then
        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
                .anyMatch(v -> v.getPropertyPath().toString().equals("caloriasPorUnidad")));
    }

    @Test
    @DisplayName("Debe permitir calorías con valor cero")
    void testCaloriasCero() {
        // Given
        Ingrediente ingrediente = Ingrediente.builder()
                .nombre("Agua")
                .unidadDefecto("l")
                .caloriasPorUnidad(0)
                .build();

        // When
        Set<ConstraintViolation<Ingrediente>> violations = validator.validate(ingrediente);

        // Then
        assertTrue(violations.isEmpty());
        assertEquals(0, ingrediente.getCaloriasPorUnidad());
    }

    @Test
    @DisplayName("Debe permitir diferentes unidades de medida")
    void testDiferentesUnidades() {
        // Given & When
        Ingrediente ingredienteKg = Ingrediente.builder()
                .nombre("Tomate")
                .unidadDefecto("kg")
                .build();

        Ingrediente ingredienteLitros = Ingrediente.builder()
                .nombre("Leche")
                .unidadDefecto("l")
                .build();

        Ingrediente ingredienteUnidades = Ingrediente.builder()
                .nombre("Huevos")
                .unidadDefecto("unidades")
                .build();

        // Then
        assertEquals("kg", ingredienteKg.getUnidadDefecto());
        assertEquals("l", ingredienteLitros.getUnidadDefecto());
        assertEquals("unidades", ingredienteUnidades.getUnidadDefecto());
    }

    @Test
    @DisplayName("Debe inicializar las colecciones vacías correctamente")
    void testInicializacionColecciones() {
        // Given & When
        Ingrediente ingrediente = new Ingrediente();

        // Then
        assertNotNull(ingrediente.getRecetas());
        assertNotNull(ingrediente.getDespensaItems());
        assertNotNull(ingrediente.getListaItems());
        assertTrue(ingrediente.getRecetas().isEmpty());
        assertTrue(ingrediente.getDespensaItems().isEmpty());
        assertTrue(ingrediente.getListaItems().isEmpty());
    }

    @Test
    @DisplayName("Debe validar categoría con longitud máxima")
    void testCategoriaLongitudMaxima() {
        // Given
        String categoriaLarga = "A".repeat(101); // más de 100 caracteres
        Ingrediente ingrediente = Ingrediente.builder()
                .nombre("Tomate")
                .categoria(categoriaLarga)
                .unidadDefecto("kg")
                .build();

        // When
        Set<ConstraintViolation<Ingrediente>> violations = validator.validate(ingrediente);

        // Then
        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
                .anyMatch(v -> v.getPropertyPath().toString().equals("categoria")));
    }

    @Test
    @DisplayName("Debe validar URL de imagen con longitud máxima")
    void testImagenUrlLongitudMaxima() {
        // Given
        String urlLarga = "https://ejemplo.com/" + "a".repeat(500); // más de 500 caracteres
        Ingrediente ingrediente = Ingrediente.builder()
                .nombre("Tomate")
                .unidadDefecto("kg")
                .imagenUrl(urlLarga)
                .build();

        // When
        Set<ConstraintViolation<Ingrediente>> violations = validator.validate(ingrediente);

        // Then
        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
                .anyMatch(v -> v.getPropertyPath().toString().equals("imagenUrl")));
    }

    @Test
    @DisplayName("Debe permitir crear ingrediente con Builder")
    void testBuilderPattern() {
        // Given & When
        Ingrediente ingrediente = Ingrediente.builder()
                .id(1L)
                .nombre("Lechuga")
                .categoria("Verduras")
                .unidadDefecto("kg")
                .caloriasPorUnidad(15)
                .imagenUrl("https://ejemplo.com/lechuga.jpg")
                .build();

        // Then
        assertNotNull(ingrediente);
        assertEquals(1L, ingrediente.getId());
        assertEquals("Lechuga", ingrediente.getNombre());
        assertEquals("Verduras", ingrediente.getCategoria());
        assertEquals("kg", ingrediente.getUnidadDefecto());
        assertEquals(15, ingrediente.getCaloriasPorUnidad());
    }

    @Test
    @DisplayName("Debe permitir categoría nula u opcional")
    void testCategoriaNula() {
        // Given
        Ingrediente ingrediente = Ingrediente.builder()
                .nombre("Tomate")
                .categoria(null)
                .unidadDefecto("kg")
                .build();

        // When
        Set<ConstraintViolation<Ingrediente>> violations = validator.validate(ingrediente);

        // Then
        assertTrue(violations.isEmpty());
        assertNull(ingrediente.getCategoria());
    }

    @Test
    @DisplayName("Debe permitir calorías nulas u opcionales")
    void testCaloriasNulas() {
        // Given
        Ingrediente ingrediente = Ingrediente.builder()
                .nombre("Ingrediente sin calorías definidas")
                .unidadDefecto("kg")
                .caloriasPorUnidad(null)
                .build();

        // When
        Set<ConstraintViolation<Ingrediente>> violations = validator.validate(ingrediente);

        // Then
        assertTrue(violations.isEmpty());
        assertNull(ingrediente.getCaloriasPorUnidad());
    }
}
