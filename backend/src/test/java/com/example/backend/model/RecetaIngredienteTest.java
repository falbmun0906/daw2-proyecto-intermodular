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
 * Tests unitarios para la entidad RecetaIngrediente.
 * Valida la relación N:M entre Receta e Ingrediente con atributos adicionales.
 */
@DisplayName("Tests de la entidad RecetaIngrediente")
class RecetaIngredienteTest {

    private static Validator validator;

    @BeforeAll
    static void setUp() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
    }

    @Test
    @DisplayName("Debe crear una relación receta-ingrediente válida")
    void testCrearRecetaIngredienteValida() {
        // Given
        Receta receta = Receta.builder().id(1L).build();
        Ingrediente ingrediente = Ingrediente.builder().id(1L).build();

        RecetaIngrediente recetaIngrediente = RecetaIngrediente.builder()
                .receta(receta)
                .ingrediente(ingrediente)
                .cantidad(2.5f)
                .unidad("kg")
                .opcional(false)
                .build();

        // When
        Set<ConstraintViolation<RecetaIngrediente>> violations = validator.validate(recetaIngrediente);

        // Then
        assertTrue(violations.isEmpty(), "No debe haber violaciones de validación");
        assertEquals(2.5f, recetaIngrediente.getCantidad());
        assertEquals("kg", recetaIngrediente.getUnidad());
        assertFalse(recetaIngrediente.getOpcional());
    }

    @Test
    @DisplayName("Debe fallar cuando la cantidad es null")
    void testCantidadNull() {
        // Given
        Receta receta = Receta.builder().id(1L).build();
        Ingrediente ingrediente = Ingrediente.builder().id(1L).build();

        RecetaIngrediente recetaIngrediente = RecetaIngrediente.builder()
                .receta(receta)
                .ingrediente(ingrediente)
                .cantidad(null)
                .unidad("kg")
                .build();

        // When
        Set<ConstraintViolation<RecetaIngrediente>> violations = validator.validate(recetaIngrediente);

        // Then
        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
                .anyMatch(v -> v.getPropertyPath().toString().equals("cantidad")));
    }

    @Test
    @DisplayName("Debe fallar cuando la cantidad es negativa o cero")
    void testCantidadNoPositiva() {
        // Given
        Receta receta = Receta.builder().id(1L).build();
        Ingrediente ingrediente = Ingrediente.builder().id(1L).build();

        RecetaIngrediente recetaIngrediente = RecetaIngrediente.builder()
                .receta(receta)
                .ingrediente(ingrediente)
                .cantidad(-1.0f)
                .unidad("kg")
                .build();

        // When
        Set<ConstraintViolation<RecetaIngrediente>> violations = validator.validate(recetaIngrediente);

        // Then
        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
                .anyMatch(v -> v.getPropertyPath().toString().equals("cantidad")));
    }

    @Test
    @DisplayName("Debe fallar cuando la unidad es null o vacía")
    void testUnidadNullOVacia() {
        // Given
        Receta receta = Receta.builder().id(1L).build();
        Ingrediente ingrediente = Ingrediente.builder().id(1L).build();

        RecetaIngrediente recetaIngrediente1 = RecetaIngrediente.builder()
                .receta(receta)
                .ingrediente(ingrediente)
                .cantidad(1.0f)
                .unidad(null)
                .build();

        RecetaIngrediente recetaIngrediente2 = RecetaIngrediente.builder()
                .receta(receta)
                .ingrediente(ingrediente)
                .cantidad(1.0f)
                .unidad("")
                .build();

        // When
        Set<ConstraintViolation<RecetaIngrediente>> violations1 = validator.validate(recetaIngrediente1);
        Set<ConstraintViolation<RecetaIngrediente>> violations2 = validator.validate(recetaIngrediente2);

        // Then
        assertFalse(violations1.isEmpty());
        assertFalse(violations2.isEmpty());
    }

    @Test
    @DisplayName("Debe permitir ingrediente opcional")
    void testIngredienteOpcional() {
        // Given
        Receta receta = Receta.builder().id(1L).build();
        Ingrediente ingrediente = Ingrediente.builder().id(1L).build();

        RecetaIngrediente recetaIngrediente = RecetaIngrediente.builder()
                .receta(receta)
                .ingrediente(ingrediente)
                .cantidad(1.0f)
                .unidad("unidades")
                .opcional(true)
                .build();

        // When
        Set<ConstraintViolation<RecetaIngrediente>> violations = validator.validate(recetaIngrediente);

        // Then
        assertTrue(violations.isEmpty());
        assertTrue(recetaIngrediente.getOpcional());
    }

    @Test
    @DisplayName("Debe fallar cuando la receta es null")
    void testRecetaNull() {
        // Given
        Ingrediente ingrediente = Ingrediente.builder().id(1L).build();

        RecetaIngrediente recetaIngrediente = RecetaIngrediente.builder()
                .receta(null)
                .ingrediente(ingrediente)
                .cantidad(1.0f)
                .unidad("kg")
                .build();

        // When
        Set<ConstraintViolation<RecetaIngrediente>> violations = validator.validate(recetaIngrediente);

        // Then
        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
                .anyMatch(v -> v.getPropertyPath().toString().equals("receta")));
    }

    @Test
    @DisplayName("Debe fallar cuando el ingrediente es null")
    void testIngredienteNull() {
        // Given
        Receta receta = Receta.builder().id(1L).build();

        RecetaIngrediente recetaIngrediente = RecetaIngrediente.builder()
                .receta(receta)
                .ingrediente(null)
                .cantidad(1.0f)
                .unidad("kg")
                .build();

        // When
        Set<ConstraintViolation<RecetaIngrediente>> violations = validator.validate(recetaIngrediente);

        // Then
        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
                .anyMatch(v -> v.getPropertyPath().toString().equals("ingrediente")));
    }

    @Test
    @DisplayName("Debe aceptar diferentes unidades de medida")
    void testDiferentesUnidades() {
        // Given
        Receta receta = Receta.builder().id(1L).build();
        Ingrediente ingrediente = Ingrediente.builder().id(1L).build();

        String[] unidades = {"kg", "g", "l", "ml", "unidades", "tazas", "cucharadas"};

        for (String unidad : unidades) {
            RecetaIngrediente recetaIngrediente = RecetaIngrediente.builder()
                    .receta(receta)
                    .ingrediente(ingrediente)
                    .cantidad(1.0f)
                    .unidad(unidad)
                    .build();

            // When
            Set<ConstraintViolation<RecetaIngrediente>> violations = validator.validate(recetaIngrediente);

            // Then
            assertTrue(violations.isEmpty(), "La unidad " + unidad + " debería ser válida");
        }
    }
}
