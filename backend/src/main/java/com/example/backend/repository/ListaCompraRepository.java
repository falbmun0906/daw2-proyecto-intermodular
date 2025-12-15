package com.example.backend.repository;

import com.example.backend.model.ListaCompra;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

/**
 * Repositorio para la entidad ListaCompra.
 * Proporciona operaciones CRUD y consultas para listas de compra.
 */
@Repository
public interface ListaCompraRepository extends JpaRepository<ListaCompra, Long> {

    /**
     * Obtiene todas las listas de compra de un usuario.
     *
     * @param usuarioId id del usuario
     * @return lista de listas de compra
     */
    @Query("SELECT lc FROM ListaCompra lc WHERE lc.usuario.id = :usuarioId ORDER BY lc.fechaGenerada DESC")
    List<ListaCompra> findByUsuarioId(@Param("usuarioId") Long usuarioId);

    /**
     * Obtiene listas de compra de un usuario con paginación.
     *
     * @param usuarioId id del usuario
     * @param pageable información de paginación
     * @return página de listas
     */
    Page<ListaCompra> findByUsuarioId(@Param("usuarioId") Long usuarioId, Pageable pageable);

    /**
     * Obtiene listas de compra pendientes de un usuario.
     *
     * @param usuarioId id del usuario
     * @return lista de listas pendientes
     */
    @Query("SELECT lc FROM ListaCompra lc WHERE lc.usuario.id = :usuarioId AND lc.estado = 'PENDIENTE' ORDER BY lc.fechaGenerada DESC")
    List<ListaCompra> findPendientesByUsuarioId(@Param("usuarioId") Long usuarioId);

    /**
     * Obtiene listas de compra completadas de un usuario.
     *
     * @param usuarioId id del usuario
     * @return lista de listas compradas
     */
    @Query("SELECT lc FROM ListaCompra lc WHERE lc.usuario.id = :usuarioId AND lc.estado = 'COMPRADA' ORDER BY lc.fechaGenerada DESC")
    List<ListaCompra> findCompradasByUsuarioId(@Param("usuarioId") Long usuarioId);

    /**
     * Obtiene la lista más reciente de un usuario.
     *
     * @param usuarioId id del usuario
     * @return Optional con la lista más reciente
     */
    @Query("SELECT lc FROM ListaCompra lc WHERE lc.usuario.id = :usuarioId ORDER BY lc.fechaGenerada DESC LIMIT 1")
    Optional<ListaCompra> findMostRecentByUsuarioId(@Param("usuarioId") Long usuarioId);

    /**
     * Obtiene la lista más reciente pendiente de un usuario.
     *
     * @param usuarioId id del usuario
     * @return Optional con la lista pendiente más reciente
     */
    @Query("SELECT lc FROM ListaCompra lc WHERE lc.usuario.id = :usuarioId AND lc.estado = 'PENDIENTE' ORDER BY lc.fechaGenerada DESC LIMIT 1")
    Optional<ListaCompra> findMostRecentPendienteByUsuarioId(@Param("usuarioId") Long usuarioId);

    /**
     * Obtiene listas de compra generadas a partir de una planificación.
     *
     * @param usuarioId id del usuario
     * @param origen origen de la lista (ej: planificación)
     * @return lista de listas con ese origen
     */
    @Query("SELECT lc FROM ListaCompra lc WHERE lc.usuario.id = :usuarioId AND lc.origen = :origen ORDER BY lc.fechaGenerada DESC")
    List<ListaCompra> findByUsuarioIdAndOrigen(@Param("usuarioId") Long usuarioId, @Param("origen") String origen);

    /**
     * Obtiene listas generadas dentro de un rango de fechas.
     *
     * @param usuarioId id del usuario
     * @param fechaInicio fecha inicial
     * @param fechaFin fecha final
     * @return lista de listas en ese rango
     */
    @Query("SELECT lc FROM ListaCompra lc WHERE lc.usuario.id = :usuarioId AND lc.fechaGenerada >= :fechaInicio AND lc.fechaGenerada <= :fechaFin ORDER BY lc.fechaGenerada DESC")
    List<ListaCompra> findByUsuarioIdAndFechaRange(@Param("usuarioId") Long usuarioId, @Param("fechaInicio") LocalDateTime fechaInicio, @Param("fechaFin") LocalDateTime fechaFin);

    /**
     * Cuenta el número de listas pendientes de un usuario.
     *
     * @param usuarioId id del usuario
     * @return número de listas pendientes
     */
    @Query("SELECT COUNT(lc) FROM ListaCompra lc WHERE lc.usuario.id = :usuarioId AND lc.estado = 'PENDIENTE'")
    long countPendientesByUsuarioId(@Param("usuarioId") Long usuarioId);

    /**
     * Cuenta el número total de listas de un usuario.
     *
     * @param usuarioId id del usuario
     * @return número de listas
     */
    @Query("SELECT COUNT(lc) FROM ListaCompra lc WHERE lc.usuario.id = :usuarioId")
    long countByUsuarioId(@Param("usuarioId") Long usuarioId);
}

