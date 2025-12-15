package com.example.backend.service;

import com.example.backend.dto.UsuarioCreateRequest;
import com.example.backend.dto.UsuarioResponse;
import com.example.backend.model.Usuario;
import com.example.backend.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Servicio para la lógica de negocio relacionada con Usuarios.
 * Maneja autenticación, validación y operaciones CRUD.
 */
@Service
@RequiredArgsConstructor
@Transactional
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    /**
     * Registra un nuevo usuario en el sistema.
     * Valida que el email no exista y hashea la contraseña.
     *
     * @param request datos del usuario a registrar
     * @return respuesta con los datos del usuario creado
     * @throws IllegalArgumentException si el email ya existe
     */
    public UsuarioResponse registrar(UsuarioCreateRequest request) {
        if (usuarioRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("El email ya está registrado");
        }

        Usuario usuario = Usuario.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .rol(Usuario.Rol.ROLE_USER) // Rol por defecto
                .fechaRegistro(LocalDateTime.now())
                .build();

        Usuario saved = usuarioRepository.save(usuario);
        return mapToResponse(saved);
    }

    /**
     * Obtiene un usuario por su ID.
     *
     * @param id id del usuario
     * @return respuesta con los datos del usuario
     * @throws IllegalArgumentException si el usuario no existe
     */
    public UsuarioResponse obtenerPorId(Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado con ID: " + id));
        return mapToResponse(usuario);
    }

    /**
     * Obtiene un usuario por su email.
     *
     * @param email email del usuario
     * @return respuesta con los datos del usuario
     * @throws IllegalArgumentException si el usuario no existe
     */
    public UsuarioResponse obtenerPorEmail(String email) {
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado con email: " + email));
        return mapToResponse(usuario);
    }

    /**
     * Obtiene todos los usuarios del sistema.
     *
     * @return lista de usuarios
     */
    public List<UsuarioResponse> obtenerTodos() {
        return usuarioRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    /**
     * Obtiene todos los usuarios con un rol específico.
     *
     * @param rol el rol a filtrar
     * @return lista de usuarios con ese rol
     */
    public List<UsuarioResponse> obtenerPorRol(Usuario.Rol rol) {
        return usuarioRepository.findByRol(rol)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    /**
     * Verifica las credenciales de un usuario (email y contraseña).
     * Útil para autenticación.
     *
     * @param email email del usuario
     * @param password contraseña en claro
     * @return true si las credenciales son válidas, false en caso contrario
     */
    public boolean verificarCredenciales(String email, String password) {
        return usuarioRepository.findByEmail(email)
                .map(usuario -> passwordEncoder.matches(password, usuario.getPassword()))
                .orElse(false);
    }

    /**
     * Verifica si existe un usuario con el email dado.
     *
     * @param email email a verificar
     * @return true si existe, false en caso contrario
     */
    public boolean existeEmail(String email) {
        return usuarioRepository.existsByEmail(email);
    }

    /**
     * Obtiene la entidad Usuario completa por ID (uso interno).
     *
     * @param id id del usuario
     * @return entidad Usuario
     * @throws IllegalArgumentException si no existe
     */
    public Usuario obtenerUsuarioCompleto(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado con ID: " + id));
    }

    /**
     * Mapea una entidad Usuario a un DTO Response (sin exponer password).
     *
     * @param usuario entidad Usuario
     * @return DTO Response
     */
    private UsuarioResponse mapToResponse(Usuario usuario) {
        return UsuarioResponse.builder()
                .id(usuario.getId())
                .email(usuario.getEmail())
                .rol(usuario.getRol().name())
                .fechaRegistro(usuario.getFechaRegistro())
                .build();
    }
}

