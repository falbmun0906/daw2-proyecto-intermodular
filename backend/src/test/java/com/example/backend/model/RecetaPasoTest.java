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
 * Tests unitarios para la entidad RecetaPaso.
 * Valida los pasos de preparación de una receta.
 */
@DisplayName("Tests de la entidad RecetaPaso")
class RecetaPasoTest {

    private static Validator validator;

    @BeforeAll
    static void setUp() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
    }

    @Test
    @DisplayName("Debe crear un paso de receta válido")
    void testCrearRecetaPasoValido() {
        // Given
        Receta receta = Receta.builder().id(1L).build();

        RecetaPaso paso = RecetaPaso.builder()
                .receta(receta)
                .orden(1)
                .descripcion("Precalentar el horno a 180°C")
                .tiempoMinutos(10)
                .build();

        // When
        Set<ConstraintViolation<RecetaPaso>> violations = validator.validate(paso);

        // Then
        assertTrue(violations.isEmpty(), "No debe haber violaciones de validación");
        assertEquals(1, paso.getOrden());
        assertEquals("Precalentar el horno a 180°C", paso.getDescripcion());
        assertEquals(10, paso.getTiempoMinutos());
    }

    @Test
    @DisplayName("Debe fallar cuando el orden es null")
    void testOrdenNull() {
        // Given
        Receta receta = Receta.builder().id(1L).build();

        RecetaPaso paso = RecetaPaso.builder()
                .receta(receta)
                .orden(null)
                .descripcion("Mezclar los ingredientes")
                .build();

        // When
        Set<ConstraintViolation<RecetaPaso>> violations = validator.validate(paso);

        // Then
        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
                .anyMatch(v -> v.getPropertyPath().toString().equals("orden")));
    }

    @Test
    @DisplayName("Debe fallar cuando el orden es menor o igual a cero")
    void testOrdenInvalido() {
        // Given
        Receta receta = Receta.builder().id(1L).build();

        RecetaPaso paso = RecetaPaso.builder()
                .receta(receta)
                .orden(0)
                .descripcion("Mezclar los ingredientes")
                .build();

        // When
        Set<ConstraintViolation<RecetaPaso>> violations = validator.validate(paso);

        // Then
        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
                .anyMatch(v -> v.getPropertyPath().toString().equals("orden")));
    }

    @Test
    @DisplayName("Debe fallar cuando la descripción es null o vacía")
    void testDescripcionNullOVacia() {
        // Given
        Receta receta = Receta.builder().id(1L).build();

        RecetaPaso paso1 = RecetaPaso.builder()
                .receta(receta)
                .orden(1)
                .descripcion(null)
                .build();

        RecetaPaso paso2 = RecetaPaso.builder()
                .receta(receta)
                .orden(1)
                .descripcion("")
                .build();

        // When
        Set<ConstraintViolation<RecetaPaso>> violations1 = validator.validate(paso1);
        Set<ConstraintViolation<RecetaPaso>> violations2 = validator.validate(paso2);

        // Then
        assertFalse(violations1.isEmpty());
        assertFalse(violations2.isEmpty());
    }

    @Test
    @DisplayName("Debe fallar cuando la descripción es demasiado corta")
    void testDescripcionDemasiadoCorta() {
        // Given
        Receta receta = Receta.builder().id(1L).build();

        RecetaPaso paso = RecetaPaso.builder()
                .receta(receta)
                .orden(1)
                .descripcion("Mix")  // Menos de 5 caracteres
                .build();

        // When
        Set<ConstraintViolation<RecetaPaso>> violations = validator.validate(paso);

        // Then
        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
                .anyMatch(v -> v.getPropertyPath().toString().equals("descripcion")));
    }

    @Test
    @DisplayName("Debe aceptar descripción de longitud válida")
    void testDescripcionValida() {
        // Given
        Receta receta = Receta.builder().id(1L).build();

        RecetaPaso paso = RecetaPaso.builder()
                .receta(receta)
                .orden(1)
                .descripcion("Mezclar todos los ingredientes secos en un bowl grande")
                .build();

        // When
        Set<ConstraintViolation<RecetaPaso>> violations = validator.validate(paso);

        // Then
        assertTrue(violations.isEmpty());
    }

    @Test
    @DisplayName("Debe permitir tiempo en minutos opcional")
    void testTiempoOpcional() {
        // Given
        Receta receta = Receta.builder().id(1L).build();

        RecetaPaso paso = RecetaPaso.builder()
                .receta(receta)
                .orden(1)
                .descripcion("Servir inmediatamente")
                .tiempoMinutos(null)  // Tiempo opcional
                .build();

        // When
        Set<ConstraintViolation<RecetaPaso>> violations = validator.validate(paso);

        // Then
        assertTrue(violations.isEmpty());
        assertNull(paso.getTiempoMinutos());
    }

    @Test
    @DisplayName("Debe fallar cuando el tiempo es cero o negativo")
    void testTiempoInvalido() {
        // Given
        Receta receta = Receta.builder().id(1L).build();

        RecetaPaso paso = RecetaPaso.builder()
                .receta(receta)
                .orden(1)
                .descripcion("Hornear la mezcla")
                .tiempoMinutos(0)
                .build();

        // When
        Set<ConstraintViolation<RecetaPaso>> violations = validator.validate(paso);

        // Then
        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
                .anyMatch(v -> v.getPropertyPath().toString().equals("tiempoMinutos")));
    }

    @Test
    @DisplayName("Debe fallar cuando la receta es null")
    void testRecetaNull() {
        // Given
        RecetaPaso paso = RecetaPaso.builder()
                .receta(null)
                .orden(1)
                .descripcion("Mezclar ingredientes")
                .build();

        // When
        Set<ConstraintViolation<RecetaPaso>> violations = validator.validate(paso);

        // Then
        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
                .anyMatch(v -> v.getPropertyPath().toString().equals("receta")));
    }

    @Test
    @DisplayName("Debe aceptar múltiples pasos con diferentes órdenes")
    void testMultiplesPasos() {
        // Given
        Receta receta = Receta.builder().id(1L).build();

        RecetaPaso paso1 = RecetaPaso.builder()
                .receta(receta)
                .orden(1)
                .descripcion("Primer paso de la receta")
                .tiempoMinutos(5)
                .build();

        RecetaPaso paso2 = RecetaPaso.builder()
                .receta(receta)
                .orden(2)
                .descripcion("Segundo paso de la receta")
                .tiempoMinutos(10)
                .build();

        RecetaPaso paso3 = RecetaPaso.builder()
                .receta(receta)
                .orden(3)
                .descripcion("Tercer paso de la receta")
                .tiempoMinutos(15)
                .build();

        // When
        Set<ConstraintViolation<RecetaPaso>> violations1 = validator.validate(paso1);
        Set<ConstraintViolation<RecetaPaso>> violations2 = validator.validate(paso2);
        Set<ConstraintViolation<RecetaPaso>> violations3 = validator.validate(paso3);

        // Then
        assertTrue(violations1.isEmpty());
        assertTrue(violations2.isEmpty());
        assertTrue(violations3.isEmpty());
        assertEquals(1, paso1.getOrden());
        assertEquals(2, paso2.getOrden());
        assertEquals(3, paso3.getOrden());
    }
}
