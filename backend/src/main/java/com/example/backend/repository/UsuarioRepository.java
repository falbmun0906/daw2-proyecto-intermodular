package com.example.backend.repository;

import com.example.backend.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repositorio para la entidad Usuario.
 * Proporciona operaciones CRUD y consultas personalizadas.
 */
@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    /**
     * Busca un usuario por su email.
     * Útil para autenticación y validación de unicidad.
     *
     * @param email el email del usuario
     * @return Optional con el usuario si existe
     */
    Optional<Usuario> findByEmail(String email);

    /**
     * Verifica si existe un usuario con el email dado.
     *
     * @param email el email a verificar
     * @return true si existe, false en caso contrario
     */
    boolean existsByEmail(String email);

    /**
     * Busca usuarios por rol.
     * Útil para listar administradores o usuarios normales.
     *
     * @param rol el rol del usuario (ROLE_USER, ROLE_ADMIN)
     * @return lista de usuarios con el rol especificado
     */
    @Query("SELECT u FROM Usuario u WHERE u.rol = :rol")
    java.util.List<Usuario> findByRol(@Param("rol") Usuario.Rol rol);
}

