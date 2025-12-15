package com.example.backend.repository;

import com.example.backend.model.PlanificacionSemana;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

/**
 * Repositorio para la entidad PlanificacionSemana.
 * Proporciona operaciones CRUD y consultas para planificaciones semanales.
 */
@Repository
public interface PlanificacionSemanaRepository extends JpaRepository<PlanificacionSemana, Long> {

    /**
     * Obtiene todas las planificaciones de un usuario.
     *
     * @param usuarioId id del usuario
     * @return lista de planificaciones
     */
    @Query("SELECT ps FROM PlanificacionSemana ps WHERE ps.usuario.id = :usuarioId ORDER BY ps.fechaInicio DESC")
    List<PlanificacionSemana> findByUsuarioId(@Param("usuarioId") Long usuarioId);

    /**
     * Obtiene planificaciones de un usuario con paginación.
     *
     * @param usuarioId id del usuario
     * @param pageable información de paginación
     * @return página de planificaciones
     */
    Page<PlanificacionSemana> findByUsuarioId(@Param("usuarioId") Long usuarioId, Pageable pageable);

    /**
     * Obtiene la planificación más reciente de un usuario.
     *
     * @param usuarioId id del usuario
     * @return Optional con la planificación más reciente
     */
    @Query("SELECT ps FROM PlanificacionSemana ps WHERE ps.usuario.id = :usuarioId ORDER BY ps.fechaInicio DESC LIMIT 1")
    Optional<PlanificacionSemana> findMostRecentByUsuarioId(@Param("usuarioId") Long usuarioId);

    /**
     * Busca una planificación específica por usuario y fecha de inicio.
     *
     * @param usuarioId id del usuario
     * @param fechaInicio fecha de inicio
     * @return Optional con la planificación si existe
     */
    @Query("SELECT ps FROM PlanificacionSemana ps WHERE ps.usuario.id = :usuarioId AND ps.fechaInicio = :fechaInicio")
    Optional<PlanificacionSemana> findByUsuarioIdAndFechaInicio(@Param("usuarioId") Long usuarioId, @Param("fechaInicio") LocalDate fechaInicio);

    /**
     * Obtiene planificaciones de un usuario dentro de un rango de fechas.
     *
     * @param usuarioId id del usuario
     * @param fechaInicio fecha inicial
     * @param fechaFin fecha final
     * @return lista de planificaciones en ese rango
     */
    @Query("SELECT ps FROM PlanificacionSemana ps WHERE ps.usuario.id = :usuarioId AND ps.fechaInicio >= :fechaInicio AND ps.fechaInicio <= :fechaFin ORDER BY ps.fechaInicio DESC")
    List<PlanificacionSemana> findByUsuarioIdAndFechaRange(@Param("usuarioId") Long usuarioId, @Param("fechaInicio") LocalDate fechaInicio, @Param("fechaFin") LocalDate fechaFin);

    /**
     * Cuenta el número de planificaciones de un usuario.
     *
     * @param usuarioId id del usuario
     * @return número de planificaciones
     */
    @Query("SELECT COUNT(ps) FROM PlanificacionSemana ps WHERE ps.usuario.id = :usuarioId")
    long countByUsuarioId(@Param("usuarioId") Long usuarioId);

    /**
     * Busca planificaciones por nombre/etiqueta.
     *
     * @param usuarioId id del usuario
     * @param etiqueta parte del nombre de la etiqueta
     * @return lista de planificaciones
     */
    @Query("SELECT ps FROM PlanificacionSemana ps WHERE ps.usuario.id = :usuarioId AND LOWER(ps.etiqueta) LIKE LOWER(CONCAT('%', :etiqueta, '%')) ORDER BY ps.fechaInicio DESC")
    List<PlanificacionSemana> findByUsuarioIdAndEtiqueta(@Param("usuarioId") Long usuarioId, @Param("etiqueta") String etiqueta);
}

