package com.example.backend.model;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Tests unitarios para la entidad PlanificacionSemana.
 * Valida la planificación semanal de comidas de un usuario.
 */
@DisplayName("Tests de la entidad PlanificacionSemana")
class PlanificacionSemanaTest {

    private static Validator validator;

    @BeforeAll
    static void setUp() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
    }

    @Test
    @DisplayName("Debe crear una planificación semanal válida")
    void testCrearPlanificacionSemanaValida() {
        // Given
        Usuario usuario = Usuario.builder().id(1L).build();

        PlanificacionSemana planificacion = PlanificacionSemana.builder()
                .usuario(usuario)
                .fechaInicio(LocalDate.now())
                .etiqueta("Semana del 28 de Enero")
                .fechaCreacion(LocalDateTime.now())
                .build();

        // When
        Set<ConstraintViolation<PlanificacionSemana>> violations = validator.validate(planificacion);

        // Then
        assertTrue(violations.isEmpty(), "No debe haber violaciones de validación");
        assertNotNull(planificacion.getFechaInicio());
        assertEquals("Semana del 28 de Enero", planificacion.getEtiqueta());
    }

    @Test
    @DisplayName("Debe fallar cuando el usuario es null")
    void testUsuarioNull() {
        // Given
        PlanificacionSemana planificacion = PlanificacionSemana.builder()
                .usuario(null)
                .fechaInicio(LocalDate.now())
                .etiqueta("Semana 1")
                .fechaCreacion(LocalDateTime.now())
                .build();

        // When
        Set<ConstraintViolation<PlanificacionSemana>> violations = validator.validate(planificacion);

        // Then
        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
                .anyMatch(v -> v.getPropertyPath().toString().equals("usuario")));
    }

    @Test
    @DisplayName("Debe fallar cuando la fecha de inicio es null")
    void testFechaInicioNull() {
        // Given
        Usuario usuario = Usuario.builder().id(1L).build();

        PlanificacionSemana planificacion = PlanificacionSemana.builder()
                .usuario(usuario)
                .fechaInicio(null)
                .etiqueta("Semana 1")
                .fechaCreacion(LocalDateTime.now())
                .build();

        // When
        Set<ConstraintViolation<PlanificacionSemana>> violations = validator.validate(planificacion);

        // Then
        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
                .anyMatch(v -> v.getPropertyPath().toString().equals("fechaInicio")));
    }

    @Test
    @DisplayName("Debe fallar cuando la etiqueta es null o vacía")
    void testEtiquetaNullOVacia() {
        // Given
        Usuario usuario = Usuario.builder().id(1L).build();

        PlanificacionSemana planificacion1 = PlanificacionSemana.builder()
                .usuario(usuario)
                .fechaInicio(LocalDate.now())
                .etiqueta(null)
                .fechaCreacion(LocalDateTime.now())
                .build();

        PlanificacionSemana planificacion2 = PlanificacionSemana.builder()
                .usuario(usuario)
                .fechaInicio(LocalDate.now())
                .etiqueta("")
                .fechaCreacion(LocalDateTime.now())
                .build();

        // When
        Set<ConstraintViolation<PlanificacionSemana>> violations1 = validator.validate(planificacion1);
        Set<ConstraintViolation<PlanificacionSemana>> violations2 = validator.validate(planificacion2);

        // Then
        assertFalse(violations1.isEmpty());
        assertFalse(violations2.isEmpty());
    }

    @Test
    @DisplayName("Debe aceptar diferentes formatos de etiqueta")
    void testDiferentesEtiquetas() {
        // Given
        Usuario usuario = Usuario.builder().id(1L).build();

        String[] etiquetas = {
                "Semana 1",
                "Menú Saludable",
                "Dieta Keto - Semana 2",
                "Planificación Familiar"
        };

        for (String etiqueta : etiquetas) {
            PlanificacionSemana planificacion = PlanificacionSemana.builder()
                    .usuario(usuario)
                    .fechaInicio(LocalDate.now())
                    .etiqueta(etiqueta)
                    .fechaCreacion(LocalDateTime.now())
                    .build();

            // When
            Set<ConstraintViolation<PlanificacionSemana>> violations = validator.validate(planificacion);

            // Then
            assertTrue(violations.isEmpty(), "La etiqueta '" + etiqueta + "' debería ser válida");
        }
    }

    @Test
    @DisplayName("Debe almacenar correctamente las fechas")
    void testAlmacenarFechas() {
        // Given
        Usuario usuario = Usuario.builder().id(1L).build();
        LocalDate inicio = LocalDate.of(2026, 1, 28);
        LocalDateTime creacion = LocalDateTime.now();

        PlanificacionSemana planificacion = PlanificacionSemana.builder()
                .usuario(usuario)
                .fechaInicio(inicio)
                .etiqueta("Semana de prueba")
                .fechaCreacion(creacion)
                .build();

        // When
        Set<ConstraintViolation<PlanificacionSemana>> violations = validator.validate(planificacion);

        // Then
        assertTrue(violations.isEmpty());
        assertEquals(inicio, planificacion.getFechaInicio());
        assertEquals(creacion, planificacion.getFechaCreacion());
    }
}
