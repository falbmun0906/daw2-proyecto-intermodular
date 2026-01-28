package com.example.backend.model;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Tests unitarios para la entidad Receta.
 * Valida la lógica de negocio, validaciones y constraints del modelo.
 */
@DisplayName("Tests de la entidad Receta")
class RecetaTest {

    private static Validator validator;

    @BeforeAll
    static void setUp() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
    }

    @Test
    @DisplayName("Debe crear una receta válida con todos los campos requeridos")
    void testCrearRecetaValida() {
        // Given
        Receta receta = Receta.builder()
                .nombre("Paella Valenciana")
                .descripcion("Deliciosa paella tradicional")
                .tiempoPreparacion(45)
                .porciones(4)
                .dificultad("MEDIA")
                .fechaCreacion(LocalDateTime.now())
                .build();

        // When
        Set<ConstraintViolation<Receta>> violations = validator.validate(receta);

        // Then
        assertTrue(violations.isEmpty(), "No debe haber violaciones de validación");
        assertEquals("Paella Valenciana", receta.getNombre());
        assertEquals(45, receta.getTiempoPreparacion());
        assertEquals(4, receta.getPorciones());
    }

    @Test
    @DisplayName("Debe fallar cuando el nombre tiene menos de 3 caracteres")
    void testNombreLongitudMinima() {
        // Given
        Receta receta = Receta.builder()
                .nombre("AB") // 2 caracteres
                .tiempoPreparacion(45)
                .porciones(4)
                .dificultad("MEDIA")
                .fechaCreacion(LocalDateTime.now())
                .build();

        // When
        Set<ConstraintViolation<Receta>> violations = validator.validate(receta);

        // Then
        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
                .anyMatch(v -> v.getPropertyPath().toString().equals("nombre")));
    }

    @Test
    @DisplayName("Debe fallar cuando el tiempo de preparación es 0 o negativo")
    void testTiempoPreparacionPositivo() {
        // Given
        Receta receta = Receta.builder()
                .nombre("Receta Test")
                .tiempoPreparacion(0) // debe ser mayor a 0
                .porciones(4)
                .dificultad("MEDIA")
                .fechaCreacion(LocalDateTime.now())
                .build();

        // When
        Set<ConstraintViolation<Receta>> violations = validator.validate(receta);

        // Then
        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
                .anyMatch(v -> v.getPropertyPath().toString().equals("tiempoPreparacion")));
    }

    @Test
    @DisplayName("Debe fallar cuando las porciones son 0 o negativas")
    void testPorcionesPositivas() {
        // Given
        Receta receta = Receta.builder()
                .nombre("Receta Test")
                .tiempoPreparacion(30)
                .porciones(-1) // debe ser mayor a 0
                .dificultad("MEDIA")
                .fechaCreacion(LocalDateTime.now())
                .build();

        // When
        Set<ConstraintViolation<Receta>> violations = validator.validate(receta);

        // Then
        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
                .anyMatch(v -> v.getPropertyPath().toString().equals("porciones")));
    }

    @Test
    @DisplayName("Debe fallar cuando la dificultad es nula o vacía")
    void testDificultadObligatoria() {
        // Given
        Receta receta = Receta.builder()
                .nombre("Receta Test")
                .tiempoPreparacion(30)
                .porciones(2)
                .dificultad(null)
                .fechaCreacion(LocalDateTime.now())
                .build();

        // When
        Set<ConstraintViolation<Receta>> violations = validator.validate(receta);

        // Then
        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
                .anyMatch(v -> v.getPropertyPath().toString().equals("dificultad")));
    }

    @Test
    @DisplayName("Debe permitir agregar etiquetas de tipo dieta")
    void testAgregarEtiquetas() {
        // Given
        Receta receta = Receta.builder()
                .nombre("Ensalada Vegana")
                .tiempoPreparacion(15)
                .porciones(2)
                .dificultad("BAJA")
                .fechaCreacion(LocalDateTime.now())
                .build();

        // When
        receta.getEtiquetas().add(TipoDieta.VEGANO);
        receta.getEtiquetas().add(TipoDieta.SIN_GLUTEN);

        // Then
        assertEquals(2, receta.getEtiquetas().size());
        assertTrue(receta.getEtiquetas().contains(TipoDieta.VEGANO));
        assertTrue(receta.getEtiquetas().contains(TipoDieta.SIN_GLUTEN));
    }

    @Test
    @DisplayName("Debe inicializar las colecciones vacías correctamente")
    void testInicializacionColecciones() {
        // Given & When
        Receta receta = new Receta();

        // Then
        assertNotNull(receta.getPasos());
        assertNotNull(receta.getIngredientes());
        assertNotNull(receta.getUsuariosQueGuardan());
        assertNotNull(receta.getPlanificacionesDia());
        assertTrue(receta.getPasos().isEmpty());
        assertTrue(receta.getIngredientes().isEmpty());
        assertTrue(receta.getUsuariosQueGuardan().isEmpty());
        assertTrue(receta.getPlanificacionesDia().isEmpty());
    }

    @Test
    @DisplayName("Debe validar descripción con longitud máxima")
    void testDescripcionLongitudMaxima() {
        // Given
        String descripcionLarga = "A".repeat(1001); // más de 1000 caracteres
        Receta receta = Receta.builder()
                .nombre("Receta Test")
                .descripcion(descripcionLarga)
                .tiempoPreparacion(30)
                .porciones(2)
                .dificultad("MEDIA")
                .fechaCreacion(LocalDateTime.now())
                .build();

        // When
        Set<ConstraintViolation<Receta>> violations = validator.validate(receta);

        // Then
        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
                .anyMatch(v -> v.getPropertyPath().toString().equals("descripcion")));
    }

    @Test
    @DisplayName("Debe validar URL de imagen con longitud máxima")
    void testImagenUrlLongitudMaxima() {
        // Given
        String urlLarga = "https://ejemplo.com/" + "a".repeat(500); // más de 500 caracteres
        Receta receta = Receta.builder()
                .nombre("Receta Test")
                .imagenUrl(urlLarga)
                .tiempoPreparacion(30)
                .porciones(2)
                .dificultad("MEDIA")
                .fechaCreacion(LocalDateTime.now())
                .build();

        // When
        Set<ConstraintViolation<Receta>> violations = validator.validate(receta);

        // Then
        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
                .anyMatch(v -> v.getPropertyPath().toString().equals("imagenUrl")));
    }

    @Test
    @DisplayName("Debe permitir crear receta con Builder")
    void testBuilderPattern() {
        // Given & When
        Receta receta = Receta.builder()
                .id(1L)
                .nombre("Tortilla de Patatas")
                .descripcion("Receta tradicional española")
                .imagenUrl("https://ejemplo.com/tortilla.jpg")
                .tiempoPreparacion(30)
                .porciones(4)
                .dificultad("MEDIA")
                .fechaCreacion(LocalDateTime.now())
                .build();

        // Then
        assertNotNull(receta);
        assertEquals(1L, receta.getId());
        assertEquals("Tortilla de Patatas", receta.getNombre());
        assertEquals(30, receta.getTiempoPreparacion());
        assertEquals(4, receta.getPorciones());
        assertEquals("MEDIA", receta.getDificultad());
    }

    @Test
    @DisplayName("Debe permitir valores de dificultad válidos")
    void testDificultadesValidas() {
        // Given & When
        Receta recetaBaja = Receta.builder()
                .nombre("Ensalada Simple")
                .tiempoPreparacion(10)
                .porciones(2)
                .dificultad("BAJA")
                .fechaCreacion(LocalDateTime.now())
                .build();

        Receta recetaMedia = Receta.builder()
                .nombre("Pasta Carbonara")
                .tiempoPreparacion(25)
                .porciones(2)
                .dificultad("MEDIA")
                .fechaCreacion(LocalDateTime.now())
                .build();

        Receta recetaAlta = Receta.builder()
                .nombre("Soufflé de Chocolate")
                .tiempoPreparacion(60)
                .porciones(4)
                .dificultad("ALTA")
                .fechaCreacion(LocalDateTime.now())
                .build();

        // Then
        assertEquals("BAJA", recetaBaja.getDificultad());
        assertEquals("MEDIA", recetaMedia.getDificultad());
        assertEquals("ALTA", recetaAlta.getDificultad());
    }
}
