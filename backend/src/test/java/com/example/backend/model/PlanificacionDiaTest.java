package com.example.backend.model;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Tests unitarios para la entidad PlanificacionDia.
 * Valida la lógica de negocio, validaciones y constraints del modelo.
 */
@DisplayName("Tests de la entidad PlanificacionDia")
class PlanificacionDiaTest {

    private static Validator validator;

    @BeforeAll
    static void setUp() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
    }

    @Test
    @DisplayName("Debe crear una planificación de día válida con todos los campos requeridos")
    void testCrearPlanificacionDiaValida() {
        // Given
        PlanificacionSemana planificacionSemana = PlanificacionSemana.builder().id(1L).build();
        Receta receta = Receta.builder().id(1L).build();

        PlanificacionDia planificacionDia = PlanificacionDia.builder()
                .planificacionSemana(planificacionSemana)
                .receta(receta)
                .fecha(LocalDate.now())
                .tipoComida(PlanificacionDia.TipoComida.COMIDA)
                .build();

        // When
        Set<ConstraintViolation<PlanificacionDia>> violations = validator.validate(planificacionDia);

        // Then
        assertTrue(violations.isEmpty(), "No debe haber violaciones de validación");
        assertEquals(PlanificacionDia.TipoComida.COMIDA, planificacionDia.getTipoComida());
        assertNotNull(planificacionDia.getFecha());
    }

    @Test
    @DisplayName("Debe permitir todos los tipos de comida")
    void testTiposComidaValidos() {
        // Given & When
        PlanificacionDia desayuno = PlanificacionDia.builder()
                .tipoComida(PlanificacionDia.TipoComida.DESAYUNO)
                .build();

        PlanificacionDia almuerzo = PlanificacionDia.builder()
                .tipoComida(PlanificacionDia.TipoComida.ALMUERZO)
                .build();

        PlanificacionDia comida = PlanificacionDia.builder()
                .tipoComida(PlanificacionDia.TipoComida.COMIDA)
                .build();

        PlanificacionDia merienda = PlanificacionDia.builder()
                .tipoComida(PlanificacionDia.TipoComida.MERIENDA)
                .build();

        PlanificacionDia cena = PlanificacionDia.builder()
                .tipoComida(PlanificacionDia.TipoComida.CENA)
                .build();

        // Then
        assertEquals(PlanificacionDia.TipoComida.DESAYUNO, desayuno.getTipoComida());
        assertEquals(PlanificacionDia.TipoComida.ALMUERZO, almuerzo.getTipoComida());
        assertEquals(PlanificacionDia.TipoComida.COMIDA, comida.getTipoComida());
        assertEquals(PlanificacionDia.TipoComida.MERIENDA, merienda.getTipoComida());
        assertEquals(PlanificacionDia.TipoComida.CENA, cena.getTipoComida());
    }

    @Test
    @DisplayName("Debe fallar cuando la planificación de semana es nula")
    void testPlanificacionSemanaObligatoria() {
        // Given
        PlanificacionDia planificacionDia = PlanificacionDia.builder()
                .planificacionSemana(null)
                .fecha(LocalDate.now())
                .tipoComida(PlanificacionDia.TipoComida.COMIDA)
                .build();

        // When
        Set<ConstraintViolation<PlanificacionDia>> violations = validator.validate(planificacionDia);

        // Then
        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
                .anyMatch(v -> v.getPropertyPath().toString().equals("planificacionSemana")));
    }

    @Test
    @DisplayName("Debe fallar cuando la fecha es nula")
    void testFechaObligatoria() {
        // Given
        PlanificacionSemana planificacionSemana = PlanificacionSemana.builder().id(1L).build();

        PlanificacionDia planificacionDia = PlanificacionDia.builder()
                .planificacionSemana(planificacionSemana)
                .fecha(null)
                .tipoComida(PlanificacionDia.TipoComida.COMIDA)
                .build();

        // When
        Set<ConstraintViolation<PlanificacionDia>> violations = validator.validate(planificacionDia);

        // Then
        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
                .anyMatch(v -> v.getPropertyPath().toString().equals("fecha")));
    }

    @Test
    @DisplayName("Debe fallar cuando el tipo de comida es nulo")
    void testTipoComidaObligatorio() {
        // Given
        PlanificacionSemana planificacionSemana = PlanificacionSemana.builder().id(1L).build();

        PlanificacionDia planificacionDia = PlanificacionDia.builder()
                .planificacionSemana(planificacionSemana)
                .fecha(LocalDate.now())
                .tipoComida(null)
                .build();

        // When
        Set<ConstraintViolation<PlanificacionDia>> violations = validator.validate(planificacionDia);

        // Then
        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
                .anyMatch(v -> v.getPropertyPath().toString().equals("tipoComida")));
    }

    @Test
    @DisplayName("Debe permitir receta nula u opcional")
    void testRecetaOpcional() {
        // Given
        PlanificacionSemana planificacionSemana = PlanificacionSemana.builder().id(1L).build();

        PlanificacionDia planificacionDia = PlanificacionDia.builder()
                .planificacionSemana(planificacionSemana)
                .receta(null)
                .fecha(LocalDate.now())
                .tipoComida(PlanificacionDia.TipoComida.COMIDA)
                .build();

        // When
        Set<ConstraintViolation<PlanificacionDia>> violations = validator.validate(planificacionDia);

        // Then
        assertTrue(violations.isEmpty());
        assertNull(planificacionDia.getReceta());
    }

    @Test
    @DisplayName("Debe permitir notas opcionales")
    void testNotasOpcionales() {
        // Given
        PlanificacionSemana planificacionSemana = PlanificacionSemana.builder().id(1L).build();

        PlanificacionDia planificacionDia = PlanificacionDia.builder()
                .planificacionSemana(planificacionSemana)
                .fecha(LocalDate.now())
                .tipoComida(PlanificacionDia.TipoComida.COMIDA)
                .notas("Preparar con anticipación")
                .build();

        // When
        Set<ConstraintViolation<PlanificacionDia>> violations = validator.validate(planificacionDia);

        // Then
        assertTrue(violations.isEmpty());
        assertEquals("Preparar con anticipación", planificacionDia.getNotas());
    }

    @Test
    @DisplayName("Debe fallar cuando las notas exceden 500 caracteres")
    void testNotasLongitudMaxima() {
        // Given
        PlanificacionSemana planificacionSemana = PlanificacionSemana.builder().id(1L).build();
        String notasLargas = "A".repeat(501); // más de 500 caracteres

        PlanificacionDia planificacionDia = PlanificacionDia.builder()
                .planificacionSemana(planificacionSemana)
                .fecha(LocalDate.now())
                .tipoComida(PlanificacionDia.TipoComida.COMIDA)
                .notas(notasLargas)
                .build();

        // When
        Set<ConstraintViolation<PlanificacionDia>> violations = validator.validate(planificacionDia);

        // Then
        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
                .anyMatch(v -> v.getPropertyPath().toString().equals("notas")));
    }

    @Test
    @DisplayName("Debe permitir crear planificación con Builder")
    void testBuilderPattern() {
        // Given
        PlanificacionSemana planificacionSemana = PlanificacionSemana.builder().id(1L).build();
        Receta receta = Receta.builder().id(2L).build();

        // When
        PlanificacionDia planificacionDia = PlanificacionDia.builder()
                .id(1L)
                .planificacionSemana(planificacionSemana)
                .receta(receta)
                .fecha(LocalDate.of(2026, 1, 28))
                .tipoComida(PlanificacionDia.TipoComida.CENA)
                .notas("Receta especial")
                .build();

        // Then
        assertNotNull(planificacionDia);
        assertEquals(1L, planificacionDia.getId());
        assertEquals(PlanificacionDia.TipoComida.CENA, planificacionDia.getTipoComida());
        assertEquals(LocalDate.of(2026, 1, 28), planificacionDia.getFecha());
        assertEquals("Receta especial", planificacionDia.getNotas());
    }

    @Test
    @DisplayName("Debe permitir planificación sin receta asignada (día vacío)")
    void testDiaVacioSinReceta() {
        // Given
        PlanificacionSemana planificacionSemana = PlanificacionSemana.builder().id(1L).build();

        PlanificacionDia planificacionDia = PlanificacionDia.builder()
                .planificacionSemana(planificacionSemana)
                .receta(null)
                .fecha(LocalDate.now())
                .tipoComida(PlanificacionDia.TipoComida.COMIDA)
                .notas("Comer fuera")
                .build();

        // When
        Set<ConstraintViolation<PlanificacionDia>> violations = validator.validate(planificacionDia);

        // Then
        assertTrue(violations.isEmpty());
        assertNull(planificacionDia.getReceta());
        assertEquals("Comer fuera", planificacionDia.getNotas());
    }
}
