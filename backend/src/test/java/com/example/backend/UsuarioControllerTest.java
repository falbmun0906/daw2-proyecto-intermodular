package com.example.backend;

import com.example.backend.controller.UsuarioController;
import com.example.backend.model.Usuario;
import com.example.backend.service.UsuarioService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class UsuarioControllerTest {

    @Mock
    private UsuarioService service;

    @InjectMocks
    private UsuarioController controller;

    @Test
    void testGetUsuarios() {
        // Preparar mock
        Usuario usuario = new Usuario();
        usuario.setId(1L);
        usuario.setNombre("Fran");
        usuario.setEmail("fran@alberti.com");

        when(service.getAll()).thenReturn(List.of(usuario));

        // Ejecutar método del controller
        List<Usuario> usuarios = controller.getUsuarios();

        // Comprobar resultados
        assertEquals(1, usuarios.size());
        assertEquals("Fran", usuarios.get(0).getNombre());
        assertEquals("fran@alberti.com", usuarios.get(0).getEmail());
    }

    @Test
    void testAddUsuario() {
        Usuario input = new Usuario();
        input.setNombre("Rocío");
        input.setEmail("rocio@alberti.com");

        Usuario saved = new Usuario();
        saved.setId(2L);
        saved.setNombre("Rocío");
        saved.setEmail("rocio@alberti.com");

        when(service.save(input)).thenReturn(saved);

        Usuario result = controller.addUsuario(input);

        assertEquals(2L, result.getId());
        assertEquals("Rocío", result.getNombre());
        assertEquals("rocio@alberti.com", result.getEmail());
    }
}
