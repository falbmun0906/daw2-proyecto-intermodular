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
 * Tests unitarios para la entidad ListaItem.
 * Valida los items individuales de una lista de compra.
 */
@DisplayName("Tests de la entidad ListaItem")
class ListaItemTest {

    private static Validator validator;

    @BeforeAll
    static void setUp() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
    }

    @Test
    @DisplayName("Debe crear un item de lista válido")
    void testCrearListaItemValido() {
        // Given
        ListaCompra listaCompra = ListaCompra.builder().id(1L).build();
        Ingrediente ingrediente = Ingrediente.builder().id(1L).build();

        ListaItem item = ListaItem.builder()
                .listaCompra(listaCompra)
                .ingrediente(ingrediente)
                .cantidadNecesaria(2.5f)
                .unidad("kg")
                .comprado(false)
                .build();

        // When
        Set<ConstraintViolation<ListaItem>> violations = validator.validate(item);

        // Then
        assertTrue(violations.isEmpty(), "No debe haber violaciones de validación");
        assertEquals(2.5f, item.getCantidadNecesaria());
        assertEquals("kg", item.getUnidad());
        assertFalse(item.getComprado());
    }

    @Test
    @DisplayName("Debe fallar cuando la lista de compra es null")
    void testListaCompraNull() {
        // Given
        Ingrediente ingrediente = Ingrediente.builder().id(1L).build();

        ListaItem item = ListaItem.builder()
                .listaCompra(null)
                .ingrediente(ingrediente)
                .cantidadNecesaria(1.0f)
                .unidad("kg")
                .build();

        // When
        Set<ConstraintViolation<ListaItem>> violations = validator.validate(item);

        // Then
        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
                .anyMatch(v -> v.getPropertyPath().toString().equals("listaCompra")));
    }

    @Test
    @DisplayName("Debe fallar cuando el ingrediente es null")
    void testIngredienteNull() {
        // Given
        ListaCompra listaCompra = ListaCompra.builder().id(1L).build();

        ListaItem item = ListaItem.builder()
                .listaCompra(listaCompra)
                .ingrediente(null)
                .cantidadNecesaria(1.0f)
                .unidad("kg")
                .build();

        // When
        Set<ConstraintViolation<ListaItem>> violations = validator.validate(item);

        // Then
        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
                .anyMatch(v -> v.getPropertyPath().toString().equals("ingrediente")));
    }

    @Test
    @DisplayName("Debe fallar cuando la cantidad necesaria es null")
    void testCantidadNecesariaNull() {
        // Given
        ListaCompra listaCompra = ListaCompra.builder().id(1L).build();
        Ingrediente ingrediente = Ingrediente.builder().id(1L).build();

        ListaItem item = ListaItem.builder()
                .listaCompra(listaCompra)
                .ingrediente(ingrediente)
                .cantidadNecesaria(null)
                .unidad("kg")
                .build();

        // When
        Set<ConstraintViolation<ListaItem>> violations = validator.validate(item);

        // Then
        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
                .anyMatch(v -> v.getPropertyPath().toString().equals("cantidadNecesaria")));
    }

    @Test
    @DisplayName("Debe fallar cuando la cantidad necesaria es cero o negativa")
    void testCantidadNoPositiva() {
        // Given
        ListaCompra listaCompra = ListaCompra.builder().id(1L).build();
        Ingrediente ingrediente = Ingrediente.builder().id(1L).build();

        ListaItem item = ListaItem.builder()
                .listaCompra(listaCompra)
                .ingrediente(ingrediente)
                .cantidadNecesaria(-1.0f)
                .unidad("kg")
                .build();

        // When
        Set<ConstraintViolation<ListaItem>> violations = validator.validate(item);

        // Then
        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
                .anyMatch(v -> v.getPropertyPath().toString().equals("cantidadNecesaria")));
    }

    @Test
    @DisplayName("Debe fallar cuando la unidad es null o vacía")
    void testUnidadNullOVacia() {
        // Given
        ListaCompra listaCompra = ListaCompra.builder().id(1L).build();
        Ingrediente ingrediente = Ingrediente.builder().id(1L).build();

        ListaItem item1 = ListaItem.builder()
                .listaCompra(listaCompra)
                .ingrediente(ingrediente)
                .cantidadNecesaria(1.0f)
                .unidad(null)
                .build();

        ListaItem item2 = ListaItem.builder()
                .listaCompra(listaCompra)
                .ingrediente(ingrediente)
                .cantidadNecesaria(1.0f)
                .unidad("")
                .build();

        // When
        Set<ConstraintViolation<ListaItem>> violations1 = validator.validate(item1);
        Set<ConstraintViolation<ListaItem>> violations2 = validator.validate(item2);

        // Then
        assertFalse(violations1.isEmpty());
        assertFalse(violations2.isEmpty());
    }

    @Test
    @DisplayName("Debe marcar item como comprado")
    void testMarcarComoComprado() {
        // Given
        ListaCompra listaCompra = ListaCompra.builder().id(1L).build();
        Ingrediente ingrediente = Ingrediente.builder().id(1L).build();

        ListaItem item = ListaItem.builder()
                .listaCompra(listaCompra)
                .ingrediente(ingrediente)
                .cantidadNecesaria(1.0f)
                .unidad("kg")
                .comprado(true)
                .build();

        // When
        Set<ConstraintViolation<ListaItem>> violations = validator.validate(item);

        // Then
        assertTrue(violations.isEmpty());
        assertTrue(item.getComprado());
    }

    @Test
    @DisplayName("Debe tener comprado en false por defecto")
    void testCompradoDefaultFalse() {
        // Given
        ListaCompra listaCompra = ListaCompra.builder().id(1L).build();
        Ingrediente ingrediente = Ingrediente.builder().id(1L).build();

        ListaItem item = ListaItem.builder()
                .listaCompra(listaCompra)
                .ingrediente(ingrediente)
                .cantidadNecesaria(1.0f)
                .unidad("kg")
                .build();

        // When
        Set<ConstraintViolation<ListaItem>> violations = validator.validate(item);

        // Then
        assertTrue(violations.isEmpty());
        assertFalse(item.getComprado());
    }

    @Test
    @DisplayName("Debe aceptar diferentes unidades de medida")
    void testDiferentesUnidades() {
        // Given
        ListaCompra listaCompra = ListaCompra.builder().id(1L).build();
        Ingrediente ingrediente = Ingrediente.builder().id(1L).build();

        String[] unidades = {"kg", "g", "l", "ml", "unidades", "piezas", "paquetes"};

        for (String unidad : unidades) {
            ListaItem item = ListaItem.builder()
                    .listaCompra(listaCompra)
                    .ingrediente(ingrediente)
                    .cantidadNecesaria(1.0f)
                    .unidad(unidad)
                    .build();

            // When
            Set<ConstraintViolation<ListaItem>> violations = validator.validate(item);

            // Then
            assertTrue(violations.isEmpty(), "La unidad " + unidad + " debería ser válida");
        }
    }

    @Test
    @DisplayName("Debe aceptar cantidades decimales")
    void testCantidadesDecimales() {
        // Given
        ListaCompra listaCompra = ListaCompra.builder().id(1L).build();
        Ingrediente ingrediente = Ingrediente.builder().id(1L).build();

        Float[] cantidades = {0.5f, 1.5f, 2.75f, 3.333f};

        for (Float cantidad : cantidades) {
            ListaItem item = ListaItem.builder()
                    .listaCompra(listaCompra)
                    .ingrediente(ingrediente)
                    .cantidadNecesaria(cantidad)
                    .unidad("kg")
                    .build();

            // When
            Set<ConstraintViolation<ListaItem>> violations = validator.validate(item);

            // Then
            assertTrue(violations.isEmpty(), "La cantidad " + cantidad + " debería ser válida");
            assertEquals(cantidad, item.getCantidadNecesaria());
        }
    }
}
