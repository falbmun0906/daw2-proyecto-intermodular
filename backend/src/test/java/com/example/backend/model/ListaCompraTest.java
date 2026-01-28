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
 * Tests unitarios para la entidad ListaCompra.
 * Valida la lógica de negocio, validaciones y constraints del modelo.
 */
@DisplayName("Tests de la entidad ListaCompra")
class ListaCompraTest {

    private static Validator validator;

    @BeforeAll
    static void setUp() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
    }

    @Test
    @DisplayName("Debe crear una lista de compra válida con todos los campos requeridos")
    void testCrearListaCompraValida() {
        // Given
        Usuario usuario = Usuario.builder().id(1L).build();

        ListaCompra listaCompra = ListaCompra.builder()
                .usuario(usuario)
                .fechaGenerada(LocalDateTime.now())
                .origen("PLANIFICACION")
                .estado(ListaCompra.EstadoListaCompra.PENDIENTE)
                .build();

        // When
        Set<ConstraintViolation<ListaCompra>> violations = validator.validate(listaCompra);

        // Then
        assertTrue(violations.isEmpty(), "No debe haber violaciones de validación");
        assertEquals(ListaCompra.EstadoListaCompra.PENDIENTE, listaCompra.getEstado());
        assertEquals("PLANIFICACION", listaCompra.getOrigen());
    }

    @Test
    @DisplayName("Debe tener estado PENDIENTE por defecto con Builder")
    void testEstadoDefectoBuilder() {
        // Given & When
        ListaCompra listaCompra = ListaCompra.builder().build();

        // Then
        assertEquals(ListaCompra.EstadoListaCompra.PENDIENTE, listaCompra.getEstado());
    }

    @Test
    @DisplayName("Debe permitir todos los estados de lista de compra")
    void testEstadosValidos() {
        // Given & When
        ListaCompra listaPendiente = ListaCompra.builder()
                .estado(ListaCompra.EstadoListaCompra.PENDIENTE)
                .build();

        ListaCompra listaComprada = ListaCompra.builder()
                .estado(ListaCompra.EstadoListaCompra.COMPRADA)
                .build();

        // Then
        assertEquals(ListaCompra.EstadoListaCompra.PENDIENTE, listaPendiente.getEstado());
        assertEquals(ListaCompra.EstadoListaCompra.COMPRADA, listaComprada.getEstado());
    }

    @Test
    @DisplayName("Debe fallar cuando el usuario es nulo")
    void testUsuarioObligatorio() {
        // Given
        ListaCompra listaCompra = ListaCompra.builder()
                .usuario(null)
                .fechaGenerada(LocalDateTime.now())
                .estado(ListaCompra.EstadoListaCompra.PENDIENTE)
                .build();

        // When
        Set<ConstraintViolation<ListaCompra>> violations = validator.validate(listaCompra);

        // Then
        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
                .anyMatch(v -> v.getPropertyPath().toString().equals("usuario")));
    }

    @Test
    @DisplayName("Debe fallar cuando el estado es nulo")
    void testEstadoObligatorio() {
        // Given
        Usuario usuario = Usuario.builder().id(1L).build();

        ListaCompra listaCompra = ListaCompra.builder()
                .usuario(usuario)
                .fechaGenerada(LocalDateTime.now())
                .estado(null)
                .build();

        // When
        Set<ConstraintViolation<ListaCompra>> violations = validator.validate(listaCompra);

        // Then
        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
                .anyMatch(v -> v.getPropertyPath().toString().equals("estado")));
    }

    @Test
    @DisplayName("Debe inicializar la colección de items vacía correctamente")
    void testInicializacionColeccionItems() {
        // Given & When
        ListaCompra listaCompra = new ListaCompra();

        // Then
        assertNotNull(listaCompra.getItems());
        assertTrue(listaCompra.getItems().isEmpty());
    }

    @Test
    @DisplayName("Debe permitir origen opcional")
    void testOrigenOpcional() {
        // Given
        Usuario usuario = Usuario.builder().id(1L).build();

        ListaCompra listaCompra = ListaCompra.builder()
                .usuario(usuario)
                .fechaGenerada(LocalDateTime.now())
                .origen(null)
                .estado(ListaCompra.EstadoListaCompra.PENDIENTE)
                .build();

        // When
        Set<ConstraintViolation<ListaCompra>> violations = validator.validate(listaCompra);

        // Then
        assertTrue(violations.isEmpty());
        assertNull(listaCompra.getOrigen());
    }

    @Test
    @DisplayName("Debe fallar cuando el origen excede 100 caracteres")
    void testOrigenLongitudMaxima() {
        // Given
        Usuario usuario = Usuario.builder().id(1L).build();
        String origenLargo = "A".repeat(101); // más de 100 caracteres

        ListaCompra listaCompra = ListaCompra.builder()
                .usuario(usuario)
                .fechaGenerada(LocalDateTime.now())
                .origen(origenLargo)
                .estado(ListaCompra.EstadoListaCompra.PENDIENTE)
                .build();

        // When
        Set<ConstraintViolation<ListaCompra>> violations = validator.validate(listaCompra);

        // Then
        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
                .anyMatch(v -> v.getPropertyPath().toString().equals("origen")));
    }

    @Test
    @DisplayName("Debe permitir texto WhatsApp generado opcional")
    void testTextoWhatsappOpcional() {
        // Given
        Usuario usuario = Usuario.builder().id(1L).build();

        ListaCompra listaCompra = ListaCompra.builder()
                .usuario(usuario)
                .fechaGenerada(LocalDateTime.now())
                .estado(ListaCompra.EstadoListaCompra.PENDIENTE)
                .textoWhatsappGenerado("Lista de compra:\n- Tomates\n- Cebollas")
                .build();

        // When
        Set<ConstraintViolation<ListaCompra>> violations = validator.validate(listaCompra);

        // Then
        assertTrue(violations.isEmpty());
        assertNotNull(listaCompra.getTextoWhatsappGenerado());
        assertTrue(listaCompra.getTextoWhatsappGenerado().contains("Tomates"));
    }

    @Test
    @DisplayName("Debe permitir crear lista de compra con Builder")
    void testBuilderPattern() {
        // Given
        Usuario usuario = Usuario.builder().id(1L).build();
        LocalDateTime fechaGenerada = LocalDateTime.now();

        // When
        ListaCompra listaCompra = ListaCompra.builder()
                .id(1L)
                .usuario(usuario)
                .fechaGenerada(fechaGenerada)
                .origen("MANUAL")
                .estado(ListaCompra.EstadoListaCompra.PENDIENTE)
                .textoWhatsappGenerado("Lista manual")
                .build();

        // Then
        assertNotNull(listaCompra);
        assertEquals(1L, listaCompra.getId());
        assertEquals(fechaGenerada, listaCompra.getFechaGenerada());
        assertEquals("MANUAL", listaCompra.getOrigen());
        assertEquals(ListaCompra.EstadoListaCompra.PENDIENTE, listaCompra.getEstado());
        assertEquals("Lista manual", listaCompra.getTextoWhatsappGenerado());
    }

    @Test
    @DisplayName("Debe permitir diferentes orígenes de lista de compra")
    void testDiferentesOrigenes() {
        // Given & When
        ListaCompra listaPlanificacion = ListaCompra.builder()
                .origen("PLANIFICACION")
                .build();

        ListaCompra listaManual = ListaCompra.builder()
                .origen("MANUAL")
                .build();

        ListaCompra listaReceta = ListaCompra.builder()
                .origen("RECETA")
                .build();

        // Then
        assertEquals("PLANIFICACION", listaPlanificacion.getOrigen());
        assertEquals("MANUAL", listaManual.getOrigen());
        assertEquals("RECETA", listaReceta.getOrigen());
    }

    @Test
    @DisplayName("Debe permitir cambiar estado de PENDIENTE a COMPRADA")
    void testCambiarEstado() {
        // Given
        Usuario usuario = Usuario.builder().id(1L).build();

        ListaCompra listaCompra = ListaCompra.builder()
                .usuario(usuario)
                .fechaGenerada(LocalDateTime.now())
                .estado(ListaCompra.EstadoListaCompra.PENDIENTE)
                .build();

        // When
        listaCompra.setEstado(ListaCompra.EstadoListaCompra.COMPRADA);

        // Then
        assertEquals(ListaCompra.EstadoListaCompra.COMPRADA, listaCompra.getEstado());
    }
}
