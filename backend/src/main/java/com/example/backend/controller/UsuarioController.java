package com.example.backend.controller;

import com.example.backend.model.Usuario;
import com.example.backend.service.UsuarioService;
import org.springframework.web.bind.annotation.*;

import java.util.List;


/**
 * Controlador REST para manejar operaciones de usuarios.
 * Expone endpoints para obtener y agregar usuarios.
 */
@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {
    /** Servicio que maneja la lógica de negocio de Usuario */
    private final UsuarioService service;

    /**
     * Constructor del controlador, inyecta el servicio de Usuario.
     *
     * @param service Servicio de Usuario a inyectar
     */
    public UsuarioController(UsuarioService service) {
        this.service = service;
    }

    /**
     * Obtiene la lista completa de usuarios.
     *
     * @return Lista de objetos Usuario
     */
    @GetMapping
    public List<Usuario> getUsuarios() {
        return service.getAll();
    }

    /**
     * Crea un nuevo usuario en la base de datos.
     *
     * @param usuario Objeto Usuario enviado en el cuerpo de la petición
     * @return El usuario recién creado
     */
    @PostMapping
    public Usuario addUsuario(@RequestBody Usuario usuario) {
        return service.save(usuario);
    }
}
