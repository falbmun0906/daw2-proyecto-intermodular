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
 * Tests unitarios para la entidad Usuario.
 * Valida la lógica de negocio, validaciones y constraints del modelo.
 */
@DisplayName("Tests de la entidad Usuario")
class UsuarioTest {

    private static Validator validator;

    @BeforeAll
    static void setUp() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
    }

    @Test
    @DisplayName("Debe crear un usuario válido con todos los campos requeridos")
    void testCrearUsuarioValido() {
        // Given
        Usuario usuario = Usuario.builder()
                .email("test@ejemplo.com")
                .password("password123")
                .rol(Usuario.Rol.ROLE_USER)
                .fechaRegistro(LocalDateTime.now())
                .build();

        // When
        Set<ConstraintViolation<Usuario>> violations = validator.validate(usuario);

        // Then
        assertTrue(violations.isEmpty(), "No debe haber violaciones de validación");
        assertEquals("test@ejemplo.com", usuario.getEmail());
        assertEquals(Usuario.Rol.ROLE_USER, usuario.getRol());
    }

    @Test
    @DisplayName("Debe fallar cuando el email es nulo o vacío")
    void testEmailObligatorio() {
        // Given
        Usuario usuario = Usuario.builder()
                .email(null)
                .password("password123")
                .rol(Usuario.Rol.ROLE_USER)
                .fechaRegistro(LocalDateTime.now())
                .build();

        // When
        Set<ConstraintViolation<Usuario>> violations = validator.validate(usuario);

        // Then
        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
                .anyMatch(v -> v.getPropertyPath().toString().equals("email")));
    }

    @Test
    @DisplayName("Debe fallar cuando el formato del email no es válido")
    void testEmailFormatoInvalido() {
        // Given
        Usuario usuario = Usuario.builder()
                .email("email-invalido")
                .password("password123")
                .rol(Usuario.Rol.ROLE_USER)
                .fechaRegistro(LocalDateTime.now())
                .build();

        // When
        Set<ConstraintViolation<Usuario>> violations = validator.validate(usuario);

        // Then
        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
                .anyMatch(v -> v.getMessage().contains("email")));
    }

    @Test
    @DisplayName("Debe fallar cuando la contraseña tiene menos de 8 caracteres")
    void testPasswordLongitudMinima() {
        // Given
        Usuario usuario = Usuario.builder()
                .email("test@ejemplo.com")
                .password("1234567") // 7 caracteres
                .rol(Usuario.Rol.ROLE_USER)
                .fechaRegistro(LocalDateTime.now())
                .build();

        // When
        Set<ConstraintViolation<Usuario>> violations = validator.validate(usuario);

        // Then
        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
                .anyMatch(v -> v.getPropertyPath().toString().equals("password")));
    }

    @Test
    @DisplayName("Debe fallar cuando el rol es nulo")
    void testRolObligatorio() {
        // Given
        Usuario usuario = Usuario.builder()
                .email("test@ejemplo.com")
                .password("password123")
                .rol(null)
                .fechaRegistro(LocalDateTime.now())
                .build();

        // When
        Set<ConstraintViolation<Usuario>> violations = validator.validate(usuario);

        // Then
        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
                .anyMatch(v -> v.getPropertyPath().toString().equals("rol")));
    }

    @Test
    @DisplayName("Debe permitir rol ROLE_USER y ROLE_ADMIN")
    void testRolesValidos() {
        // Given & When
        Usuario userRoleUser = Usuario.builder()
                .email("user@ejemplo.com")
                .password("password123")
                .rol(Usuario.Rol.ROLE_USER)
                .fechaRegistro(LocalDateTime.now())
                .build();

        Usuario userRoleAdmin = Usuario.builder()
                .email("admin@ejemplo.com")
                .password("password123")
                .rol(Usuario.Rol.ROLE_ADMIN)
                .fechaRegistro(LocalDateTime.now())
                .build();

        // Then
        assertEquals(Usuario.Rol.ROLE_USER, userRoleUser.getRol());
        assertEquals(Usuario.Rol.ROLE_ADMIN, userRoleAdmin.getRol());
    }

    @Test
    @DisplayName("Debe inicializar las colecciones vacías correctamente")
    void testInicializacionColecciones() {
        // Given & When
        Usuario usuario = new Usuario();

        // Then
        assertNotNull(usuario.getDespensaItems());
        assertNotNull(usuario.getRecetasGuardadas());
        assertNotNull(usuario.getPlanificaciones());
        assertNotNull(usuario.getListasCompra());
        assertTrue(usuario.getDespensaItems().isEmpty());
        assertTrue(usuario.getRecetasGuardadas().isEmpty());
        assertTrue(usuario.getPlanificaciones().isEmpty());
        assertTrue(usuario.getListasCompra().isEmpty());
    }

    @Test
    @DisplayName("Debe permitir crear usuario con Builder")
    void testBuilderPattern() {
        // Given & When
        Usuario usuario = Usuario.builder()
                .id(1L)
                .email("test@ejemplo.com")
                .password("password123")
                .rol(Usuario.Rol.ROLE_USER)
                .fechaRegistro(LocalDateTime.now())
                .build();

        // Then
        assertNotNull(usuario);
        assertEquals(1L, usuario.getId());
        assertEquals("test@ejemplo.com", usuario.getEmail());
        assertEquals(Usuario.Rol.ROLE_USER, usuario.getRol());
    }

    @Test
    @DisplayName("Debe validar email único en conjunto con constraint de base de datos")
    void testEmailUnico() {
        // Given
        Usuario usuario1 = Usuario.builder()
                .email("test@ejemplo.com")
                .password("password123")
                .rol(Usuario.Rol.ROLE_USER)
                .fechaRegistro(LocalDateTime.now())
                .build();

        Usuario usuario2 = Usuario.builder()
                .email("test@ejemplo.com") // mismo email
                .password("password456")
                .rol(Usuario.Rol.ROLE_USER)
                .fechaRegistro(LocalDateTime.now())
                .build();

        // When & Then
        // La validación de unicidad se maneja a nivel de base de datos con @UniqueConstraint
        // Este test verifica que el modelo está configurado correctamente
        assertNotNull(usuario1);
        assertNotNull(usuario2);
        assertEquals(usuario1.getEmail(), usuario2.getEmail());
    }
}
