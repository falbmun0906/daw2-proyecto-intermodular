package com.example.backend.repository;

import com.example.backend.model.RecetaUsuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repositorio para la entidad RecetaUsuario.
 * Proporciona operaciones para la relación N:M entre Usuario y Receta.
 */
@Repository
public interface RecetaUsuarioRepository extends JpaRepository<RecetaUsuario, Long> {

    /**
     * Obtiene todas las recetas guardadas por un usuario.
     *
     * @param usuarioId id del usuario
     * @return lista de recetas guardadas
     */
    @Query("SELECT ru FROM RecetaUsuario ru WHERE ru.usuario.id = :usuarioId ORDER BY ru.fechaGuardado DESC")
    List<RecetaUsuario> findByUsuarioId(@Param("usuarioId") Long usuarioId);

    /**
     * Obtiene todas las recetas favoritas de un usuario.
     *
     * @param usuarioId id del usuario
     * @return lista de recetas favoritas
     */
    @Query("SELECT ru FROM RecetaUsuario ru WHERE ru.usuario.id = :usuarioId AND ru.tipo = 'FAVORITA' ORDER BY ru.fechaGuardado DESC")
    List<RecetaUsuario> findFavoritasByUsuarioId(@Param("usuarioId") Long usuarioId);

    /**
     * Obtiene todas las recetas propias de un usuario.
     *
     * @param usuarioId id del usuario
     * @return lista de recetas propias
     */
    @Query("SELECT ru FROM RecetaUsuario ru WHERE ru.usuario.id = :usuarioId AND ru.tipo = 'PROPIA' ORDER BY ru.fechaGuardado DESC")
    List<RecetaUsuario> findPropiasByUsuarioId(@Param("usuarioId") Long usuarioId);

    /**
     * Busca una receta guardada específica por usuario y receta.
     *
     * @param usuarioId id del usuario
     * @param recetaId id de la receta
     * @return Optional con la relación si existe
     */
    @Query("SELECT ru FROM RecetaUsuario ru WHERE ru.usuario.id = :usuarioId AND ru.receta.id = :recetaId")
    Optional<RecetaUsuario> findByUsuarioIdAndRecetaId(@Param("usuarioId") Long usuarioId, @Param("recetaId") Long recetaId);

    /**
     * Verifica si un usuario tiene guardada una receta específica.
     *
     * @param usuarioId id del usuario
     * @param recetaId id de la receta
     * @return true si está guardada, false en caso contrario
     */
    @Query("SELECT CASE WHEN COUNT(ru) > 0 THEN true ELSE false END FROM RecetaUsuario ru WHERE ru.usuario.id = :usuarioId AND ru.receta.id = :recetaId")
    boolean existsByUsuarioIdAndRecetaId(@Param("usuarioId") Long usuarioId, @Param("recetaId") Long recetaId);

    /**
     * Cuenta cuántas recetas ha guardado un usuario.
     *
     * @param usuarioId id del usuario
     * @return número de recetas guardadas
     */
    @Query("SELECT COUNT(ru) FROM RecetaUsuario ru WHERE ru.usuario.id = :usuarioId")
    long countByUsuarioId(@Param("usuarioId") Long usuarioId);

    /**
     * Cuenta cuántas recetas favoritas tiene un usuario.
     *
     * @param usuarioId id del usuario
     * @return número de recetas favoritas
     */
    @Query("SELECT COUNT(ru) FROM RecetaUsuario ru WHERE ru.usuario.id = :usuarioId AND ru.tipo = 'FAVORITA'")
    long countFavoritasByUsuarioId(@Param("usuarioId") Long usuarioId);

    /**
     * Obtiene la popularidad de una receta (cuántos usuarios la tienen guardada).
     *
     * @param recetaId id de la receta
     * @return número de usuarios que la tienen guardada
     */
    @Query("SELECT COUNT(DISTINCT ru.usuario.id) FROM RecetaUsuario ru WHERE ru.receta.id = :recetaId")
    long countUsuariosByRecetaId(@Param("recetaId") Long recetaId);
}

