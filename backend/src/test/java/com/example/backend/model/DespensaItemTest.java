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
 * Tests unitarios para la entidad DespensaItem.
 * Valida la lógica de negocio, validaciones y constraints del modelo.
 */
@DisplayName("Tests de la entidad DespensaItem")
class DespensaItemTest {

    private static Validator validator;

    @BeforeAll
    static void setUp() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
    }

    @Test
    @DisplayName("Debe crear un item de despensa válido con todos los campos requeridos")
    void testCrearDespensaItemValido() {
        // Given
        Usuario usuario = Usuario.builder().id(1L).build();
        Ingrediente ingrediente = Ingrediente.builder().id(1L).build();

        DespensaItem item = DespensaItem.builder()
                .usuario(usuario)
                .ingrediente(ingrediente)
                .cantidadActual(2.5f)
                .unidad("kg")
                .ubicacion(DespensaItem.UbicacionDespensa.NEVERA)
                .estado(DespensaItem.EstadoDespensaItem.OK)
                .build();

        // When
        Set<ConstraintViolation<DespensaItem>> violations = validator.validate(item);

        // Then
        assertTrue(violations.isEmpty(), "No debe haber violaciones de validación");
        assertEquals(2.5f, item.getCantidadActual());
        assertEquals("kg", item.getUnidad());
        assertEquals(DespensaItem.UbicacionDespensa.NEVERA, item.getUbicacion());
    }

    @Test
    @DisplayName("Debe fallar cuando la cantidad actual es cero o negativa")
    void testCantidadActualPositiva() {
        // Given
        Usuario usuario = Usuario.builder().id(1L).build();
        Ingrediente ingrediente = Ingrediente.builder().id(1L).build();

        DespensaItem item = DespensaItem.builder()
                .usuario(usuario)
                .ingrediente(ingrediente)
                .cantidadActual(-1.0f) // negativa
                .unidad("kg")
                .ubicacion(DespensaItem.UbicacionDespensa.DESPENSA)
                .estado(DespensaItem.EstadoDespensaItem.OK)
                .build();

        // When
        Set<ConstraintViolation<DespensaItem>> violations = validator.validate(item);

        // Then
        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
                .anyMatch(v -> v.getPropertyPath().toString().equals("cantidadActual")));
    }

    @Test
    @DisplayName("Debe fallar cuando la unidad es nula o vacía")
    void testUnidadObligatoria() {
        // Given
        Usuario usuario = Usuario.builder().id(1L).build();
        Ingrediente ingrediente = Ingrediente.builder().id(1L).build();

        DespensaItem item = DespensaItem.builder()
                .usuario(usuario)
                .ingrediente(ingrediente)
                .cantidadActual(2.0f)
                .unidad(null)
                .ubicacion(DespensaItem.UbicacionDespensa.DESPENSA)
                .estado(DespensaItem.EstadoDespensaItem.OK)
                .build();

        // When
        Set<ConstraintViolation<DespensaItem>> violations = validator.validate(item);

        // Then
        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
                .anyMatch(v -> v.getPropertyPath().toString().equals("unidad")));
    }

    @Test
    @DisplayName("Debe permitir todas las ubicaciones de despensa")
    void testUbicacionesValidas() {
        // Given & When
        DespensaItem itemNevera = DespensaItem.builder()
                .ubicacion(DespensaItem.UbicacionDespensa.NEVERA)
                .build();

        DespensaItem itemCongelador = DespensaItem.builder()
                .ubicacion(DespensaItem.UbicacionDespensa.CONGELADOR)
                .build();

        DespensaItem itemDespensa = DespensaItem.builder()
                .ubicacion(DespensaItem.UbicacionDespensa.DESPENSA)
                .build();

        DespensaItem itemMostrador = DespensaItem.builder()
                .ubicacion(DespensaItem.UbicacionDespensa.MOSTRADOR)
                .build();

        // Then
        assertEquals(DespensaItem.UbicacionDespensa.NEVERA, itemNevera.getUbicacion());
        assertEquals(DespensaItem.UbicacionDespensa.CONGELADOR, itemCongelador.getUbicacion());
        assertEquals(DespensaItem.UbicacionDespensa.DESPENSA, itemDespensa.getUbicacion());
        assertEquals(DespensaItem.UbicacionDespensa.MOSTRADOR, itemMostrador.getUbicacion());
    }

    @Test
    @DisplayName("Debe permitir todos los estados de despensa item")
    void testEstadosValidos() {
        // Given & When
        DespensaItem itemOk = DespensaItem.builder()
                .estado(DespensaItem.EstadoDespensaItem.OK)
                .build();

        DespensaItem itemProximo = DespensaItem.builder()
                .estado(DespensaItem.EstadoDespensaItem.PROXIMO_A_CADUCAR)
                .build();

        DespensaItem itemCaducado = DespensaItem.builder()
                .estado(DespensaItem.EstadoDespensaItem.CADUCADO)
                .build();

        // Then
        assertEquals(DespensaItem.EstadoDespensaItem.OK, itemOk.getEstado());
        assertEquals(DespensaItem.EstadoDespensaItem.PROXIMO_A_CADUCAR, itemProximo.getEstado());
        assertEquals(DespensaItem.EstadoDespensaItem.CADUCADO, itemCaducado.getEstado());
    }

    @Test
    @DisplayName("Debe tener estado OK por defecto con Builder")
    void testEstadoDefectoBuilder() {
        // Given & When
        DespensaItem item = DespensaItem.builder().build();

        // Then
        assertEquals(DespensaItem.EstadoDespensaItem.OK, item.getEstado());
    }

    @Test
    @DisplayName("Debe permitir fecha de caducidad nula u opcional")
    void testFechaCaducidadOpcional() {
        // Given
        Usuario usuario = Usuario.builder().id(1L).build();
        Ingrediente ingrediente = Ingrediente.builder().id(1L).build();

        DespensaItem item = DespensaItem.builder()
                .usuario(usuario)
                .ingrediente(ingrediente)
                .cantidadActual(1.0f)
                .unidad("kg")
                .ubicacion(DespensaItem.UbicacionDespensa.DESPENSA)
                .estado(DespensaItem.EstadoDespensaItem.OK)
                .fechaCaducidad(null)
                .build();

        // When
        Set<ConstraintViolation<DespensaItem>> violations = validator.validate(item);

        // Then
        assertTrue(violations.isEmpty());
        assertNull(item.getFechaCaducidad());
    }

    @Test
    @DisplayName("Debe permitir fecha de caducidad válida")
    void testFechaCaducidadValida() {
        // Given
        Usuario usuario = Usuario.builder().id(1L).build();
        Ingrediente ingrediente = Ingrediente.builder().id(1L).build();
        LocalDate fechaCaducidad = LocalDate.now().plusDays(7);

        DespensaItem item = DespensaItem.builder()
                .usuario(usuario)
                .ingrediente(ingrediente)
                .cantidadActual(1.0f)
                .unidad("kg")
                .ubicacion(DespensaItem.UbicacionDespensa.NEVERA)
                .estado(DespensaItem.EstadoDespensaItem.OK)
                .fechaCaducidad(fechaCaducidad)
                .build();

        // When
        Set<ConstraintViolation<DespensaItem>> violations = validator.validate(item);

        // Then
        assertTrue(violations.isEmpty());
        assertEquals(fechaCaducidad, item.getFechaCaducidad());
    }

    @Test
    @DisplayName("Debe permitir crear item con Builder")
    void testBuilderPattern() {
        // Given
        Usuario usuario = Usuario.builder().id(1L).build();
        Ingrediente ingrediente = Ingrediente.builder().id(2L).build();

        // When
        DespensaItem item = DespensaItem.builder()
                .id(1L)
                .usuario(usuario)
                .ingrediente(ingrediente)
                .cantidadActual(3.5f)
                .unidad("l")
                .fechaCaducidad(LocalDate.now().plusDays(10))
                .ubicacion(DespensaItem.UbicacionDespensa.NEVERA)
                .estado(DespensaItem.EstadoDespensaItem.OK)
                .build();

        // Then
        assertNotNull(item);
        assertEquals(1L, item.getId());
        assertEquals(3.5f, item.getCantidadActual());
        assertEquals("l", item.getUnidad());
        assertEquals(DespensaItem.UbicacionDespensa.NEVERA, item.getUbicacion());
        assertEquals(DespensaItem.EstadoDespensaItem.OK, item.getEstado());
    }

    @Test
    @DisplayName("Debe fallar cuando el usuario es nulo")
    void testUsuarioObligatorio() {
        // Given
        Ingrediente ingrediente = Ingrediente.builder().id(1L).build();

        DespensaItem item = DespensaItem.builder()
                .usuario(null)
                .ingrediente(ingrediente)
                .cantidadActual(1.0f)
                .unidad("kg")
                .ubicacion(DespensaItem.UbicacionDespensa.DESPENSA)
                .estado(DespensaItem.EstadoDespensaItem.OK)
                .build();

        // When
        Set<ConstraintViolation<DespensaItem>> violations = validator.validate(item);

        // Then
        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
                .anyMatch(v -> v.getPropertyPath().toString().equals("usuario")));
    }

    @Test
    @DisplayName("Debe fallar cuando el ingrediente es nulo")
    void testIngredienteObligatorio() {
        // Given
        Usuario usuario = Usuario.builder().id(1L).build();

        DespensaItem item = DespensaItem.builder()
                .usuario(usuario)
                .ingrediente(null)
                .cantidadActual(1.0f)
                .unidad("kg")
                .ubicacion(DespensaItem.UbicacionDespensa.DESPENSA)
                .estado(DespensaItem.EstadoDespensaItem.OK)
                .build();

        // When
        Set<ConstraintViolation<DespensaItem>> violations = validator.validate(item);

        // Then
        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
                .anyMatch(v -> v.getPropertyPath().toString().equals("ingrediente")));
    }
}
