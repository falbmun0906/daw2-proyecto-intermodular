package com.example.backend.controller;

import com.example.backend.dto.UsuarioCreateRequest;
import com.example.backend.dto.UsuarioResponse;
import com.example.backend.model.Usuario;
import com.example.backend.service.UsuarioService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controlador REST para la gestión de Usuarios.
 * Rutas base: /api/usuarios
 */
@RestController
@RequestMapping("/api/usuarios")
@RequiredArgsConstructor
public class UsuarioController {

    private final UsuarioService usuarioService;

    /**
     * Registra un nuevo usuario en el sistema.
     * POST /api/usuarios/registro
     *
     * @param request datos del usuario a registrar
     * @return 201 Created con el usuario creado
     */
    @PostMapping("/registro")
    public ResponseEntity<UsuarioResponse> registrar(@Valid @RequestBody UsuarioCreateRequest request) {
        UsuarioResponse response = usuarioService.registrar(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * Obtiene un usuario por su email.
     * GET /api/usuarios/email/{email}
     *
     * @param email email del usuario
     * @return 200 OK con el usuario encontrado
     */
    @GetMapping("/email/{email}")
    public ResponseEntity<UsuarioResponse> obtenerPorEmail(@PathVariable String email) {
        UsuarioResponse response = usuarioService.obtenerPorEmail(email);
        return ResponseEntity.ok(response);
    }

    /**
     * Obtiene usuarios por rol.
     * GET /api/usuarios/rol/{rol}
     * TODO: Restringir a ROLE_ADMIN en Entrega de Seguridad
     *
     * @param rol rol a filtrar (ROLE_USER, ROLE_ADMIN)
     * @return 200 OK con la lista de usuarios
     */
    @GetMapping("/rol/{rol}")
    public ResponseEntity<List<UsuarioResponse>> obtenerPorRol(@PathVariable String rol) {
        Usuario.Rol rolEnum = Usuario.Rol.valueOf(rol);
        List<UsuarioResponse> usuarios = usuarioService.obtenerPorRol(rolEnum);
        return ResponseEntity.ok(usuarios);
    }

    /**
     * Verifica si existe un email en el sistema.
     * GET /api/usuarios/existe-email?email=X
     *
     * @param email email a verificar
     * @return 200 OK con boolean
     */
    @GetMapping("/existe-email")
    public ResponseEntity<Boolean> existeEmail(@RequestParam String email) {
        boolean existe = usuarioService.existeEmail(email);
        return ResponseEntity.ok(existe);
    }

    /**
     * Obtiene un usuario por su ID.
     * GET /api/usuarios/{id}
     *
     * @param id id del usuario
     * @return 200 OK con el usuario encontrado
     */
    @GetMapping("/{id}")
    public ResponseEntity<UsuarioResponse> obtenerPorId(@PathVariable Long id) {
        UsuarioResponse response = usuarioService.obtenerPorId(id);
        return ResponseEntity.ok(response);
    }

    /**
     * Lista todos los usuarios del sistema.
     * GET /api/usuarios
     * TODO: Restringir a ROLE_ADMIN en Entrega de Seguridad
     *
     * @return 200 OK con la lista de usuarios
     */
    @GetMapping
    public ResponseEntity<List<UsuarioResponse>> obtenerTodos() {
        List<UsuarioResponse> usuarios = usuarioService.obtenerTodos();
        return ResponseEntity.ok(usuarios);
    }
}

