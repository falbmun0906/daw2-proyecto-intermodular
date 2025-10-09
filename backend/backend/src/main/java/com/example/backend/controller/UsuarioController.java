package com.example.backend.controller;

import com.example.backend.model.Usuario;
import com.example.backend.service.UsuarioService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {
    private final UsuarioService service;

    public UsuarioController(UsuarioService service) {
        this.service = service;
    }

    @GetMapping
    public List<Usuario> getUsuarios() {
        return service.getAll();
    }

    @PostMapping
    public Usuario addUsuario(@RequestBody Usuario usuario) {
        return service.save(usuario);
    }
}
