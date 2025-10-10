package com.example.backend.repository;

import com.example.backend.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repositorio para la entidad {@link Usuario}.
 * Permite realizar operaciones CRUD en la base de datos.
 * Hereda los métodos estándar de {@link JpaRepository}.
 */
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
}
