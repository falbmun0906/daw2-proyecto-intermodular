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
 * Tests unitarios para la entidad RecetaUsuario.
 * Valida la relación N:M entre Usuario y Receta (favoritas/propias).
 */
@DisplayName("Tests de la entidad RecetaUsuario")
class RecetaUsuarioTest {

    private static Validator validator;

    @BeforeAll
    static void setUp() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
    }

    @Test
    @DisplayName("Debe crear una relación receta-usuario válida como FAVORITA")
    void testCrearRecetaUsuarioFavorita() {
        // Given
        Usuario usuario = Usuario.builder().id(1L).build();
        Receta receta = Receta.builder().id(1L).build();

        RecetaUsuario recetaUsuario = RecetaUsuario.builder()
                .usuario(usuario)
                .receta(receta)
                .tipo(RecetaUsuario.TipoRecetaUsuario.FAVORITA)
                .fechaGuardado(LocalDateTime.now())
                .visibilidad("PUBLICA")
                .build();

        // When
        Set<ConstraintViolation<RecetaUsuario>> violations = validator.validate(recetaUsuario);

        // Then
        assertTrue(violations.isEmpty(), "No debe haber violaciones de validación");
        assertEquals(RecetaUsuario.TipoRecetaUsuario.FAVORITA, recetaUsuario.getTipo());
        assertNotNull(recetaUsuario.getFechaGuardado());
    }

    @Test
    @DisplayName("Debe crear una relación receta-usuario válida como PROPIA")
    void testCrearRecetaUsuarioPropia() {
        // Given
        Usuario usuario = Usuario.builder().id(1L).build();
        Receta receta = Receta.builder().id(1L).build();

        RecetaUsuario recetaUsuario = RecetaUsuario.builder()
                .usuario(usuario)
                .receta(receta)
                .tipo(RecetaUsuario.TipoRecetaUsuario.PROPIA)
                .fechaGuardado(LocalDateTime.now())
                .visibilidad("PRIVADA")
                .build();

        // When
        Set<ConstraintViolation<RecetaUsuario>> violations = validator.validate(recetaUsuario);

        // Then
        assertTrue(violations.isEmpty());
        assertEquals(RecetaUsuario.TipoRecetaUsuario.PROPIA, recetaUsuario.getTipo());
    }

    @Test
    @DisplayName("Debe fallar cuando el usuario es null")
    void testUsuarioNull() {
        // Given
        Receta receta = Receta.builder().id(1L).build();

        RecetaUsuario recetaUsuario = RecetaUsuario.builder()
                .usuario(null)
                .receta(receta)
                .tipo(RecetaUsuario.TipoRecetaUsuario.FAVORITA)
                .fechaGuardado(LocalDateTime.now())
                .build();

        // When
        Set<ConstraintViolation<RecetaUsuario>> violations = validator.validate(recetaUsuario);

        // Then
        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
                .anyMatch(v -> v.getPropertyPath().toString().equals("usuario")));
    }

    @Test
    @DisplayName("Debe fallar cuando la receta es null")
    void testRecetaNull() {
        // Given
        Usuario usuario = Usuario.builder().id(1L).build();

        RecetaUsuario recetaUsuario = RecetaUsuario.builder()
                .usuario(usuario)
                .receta(null)
                .tipo(RecetaUsuario.TipoRecetaUsuario.FAVORITA)
                .fechaGuardado(LocalDateTime.now())
                .build();

        // When
        Set<ConstraintViolation<RecetaUsuario>> violations = validator.validate(recetaUsuario);

        // Then
        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
                .anyMatch(v -> v.getPropertyPath().toString().equals("receta")));
    }

    @Test
    @DisplayName("Debe fallar cuando el tipo es null")
    void testTipoNull() {
        // Given
        Usuario usuario = Usuario.builder().id(1L).build();
        Receta receta = Receta.builder().id(1L).build();

        RecetaUsuario recetaUsuario = RecetaUsuario.builder()
                .usuario(usuario)
                .receta(receta)
                .tipo(null)
                .fechaGuardado(LocalDateTime.now())
                .build();

        // When
        Set<ConstraintViolation<RecetaUsuario>> violations = validator.validate(recetaUsuario);

        // Then
        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
                .anyMatch(v -> v.getPropertyPath().toString().equals("tipo")));
    }

    @Test
    @DisplayName("Debe permitir visibilidad null u opcional")
    void testVisibilidadOpcional() {
        // Given
        Usuario usuario = Usuario.builder().id(1L).build();
        Receta receta = Receta.builder().id(1L).build();

        RecetaUsuario recetaUsuario = RecetaUsuario.builder()
                .usuario(usuario)
                .receta(receta)
                .tipo(RecetaUsuario.TipoRecetaUsuario.FAVORITA)
                .fechaGuardado(LocalDateTime.now())
                .visibilidad(null)
                .build();

        // When
        Set<ConstraintViolation<RecetaUsuario>> violations = validator.validate(recetaUsuario);

        // Then
        assertTrue(violations.isEmpty());
        assertNull(recetaUsuario.getVisibilidad());
    }

    @Test
    @DisplayName("Debe aceptar diferentes valores de visibilidad")
    void testDiferentesVisibilidades() {
        // Given
        Usuario usuario = Usuario.builder().id(1L).build();
        Receta receta = Receta.builder().id(1L).build();

        String[] visibilidades = {"PUBLICA", "PRIVADA", "AMIGOS"};

        for (String visibilidad : visibilidades) {
            RecetaUsuario recetaUsuario = RecetaUsuario.builder()
                    .usuario(usuario)
                    .receta(receta)
                    .tipo(RecetaUsuario.TipoRecetaUsuario.PROPIA)
                    .fechaGuardado(LocalDateTime.now())
                    .visibilidad(visibilidad)
                    .build();

            // When
            Set<ConstraintViolation<RecetaUsuario>> violations = validator.validate(recetaUsuario);

            // Then
            assertTrue(violations.isEmpty(), "La visibilidad " + visibilidad + " debería ser válida");
            assertEquals(visibilidad, recetaUsuario.getVisibilidad());
        }
    }

    @Test
    @DisplayName("Debe distinguir entre tipos FAVORITA y PROPIA")
    void testDiferenciarTipos() {
        // Given
        Usuario usuario = Usuario.builder().id(1L).build();
        Receta receta = Receta.builder().id(1L).build();

        RecetaUsuario favorita = RecetaUsuario.builder()
                .usuario(usuario)
                .receta(receta)
                .tipo(RecetaUsuario.TipoRecetaUsuario.FAVORITA)
                .fechaGuardado(LocalDateTime.now())
                .build();

        RecetaUsuario propia = RecetaUsuario.builder()
                .usuario(usuario)
                .receta(receta)
                .tipo(RecetaUsuario.TipoRecetaUsuario.PROPIA)
                .fechaGuardado(LocalDateTime.now())
                .build();

        // Then
        assertEquals(RecetaUsuario.TipoRecetaUsuario.FAVORITA, favorita.getTipo());
        assertEquals(RecetaUsuario.TipoRecetaUsuario.PROPIA, propia.getTipo());
        assertNotEquals(favorita.getTipo(), propia.getTipo());
    }

    @Test
    @DisplayName("Debe almacenar correctamente la fecha de guardado")
    void testFechaGuardado() {
        // Given
        Usuario usuario = Usuario.builder().id(1L).build();
        Receta receta = Receta.builder().id(1L).build();
        LocalDateTime ahora = LocalDateTime.now();

        RecetaUsuario recetaUsuario = RecetaUsuario.builder()
                .usuario(usuario)
                .receta(receta)
                .tipo(RecetaUsuario.TipoRecetaUsuario.FAVORITA)
                .fechaGuardado(ahora)
                .build();

        // When
        Set<ConstraintViolation<RecetaUsuario>> violations = validator.validate(recetaUsuario);

        // Then
        assertTrue(violations.isEmpty());
        assertNotNull(recetaUsuario.getFechaGuardado());
        assertEquals(ahora, recetaUsuario.getFechaGuardado());
    }
}
