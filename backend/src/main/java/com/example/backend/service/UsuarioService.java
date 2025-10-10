package com.example.backend.service;

import com.example.backend.model.Usuario;
import com.example.backend.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Servicio para manejar la lógica de negocio relacionada con los {@link Usuario}.
 * Proporciona métodos para obtener todos los usuarios y guardar nuevos usuarios.
 */
@Service
public class UsuarioService {
    /**
     * Repositorio para acceder a los datos de {@link Usuario}.
     */
    private final UsuarioRepository repository;

    /**
     * Constructor que inyecta el repositorio de usuarios.
     *
     * @param repository el repositorio de usuarios a utilizar
     */
    public UsuarioService(UsuarioRepository repository) {
        this.repository = repository;
    }

    /**
     * Obtiene todos los usuarios registrados en la base de datos.
     *
     * @return lista de todos los {@link Usuario} existentes
     */
    public List<Usuario> getAll() {
        return repository.findAll();
    }

    /**
     * Guarda un usuario en la base de datos.
     *
     * @param usuario el {@link Usuario} a guardar
     * @return el {@link Usuario} guardado con su ID generado
     */
    public Usuario save (Usuario usuario) {
        return repository.save(usuario);
    }
}
