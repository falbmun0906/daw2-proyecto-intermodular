package com.example.backend.repository;

import com.example.backend.model.PlanificacionDia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

/**
 * Repositorio para la entidad PlanificacionDia.
 * Proporciona operaciones CRUD y consultas para días planificados.
 */
@Repository
public interface PlanificacionDiaRepository extends JpaRepository<PlanificacionDia, Long> {

    /**
     * Obtiene todos los días planificados de una semana.
     *
     * @param planificacionSemanaId id de la planificación semanal
     * @return lista de días ordenados por fecha
     */
    @Query("SELECT pd FROM PlanificacionDia pd WHERE pd.planificacionSemana.id = :planificacionSemanaId ORDER BY pd.fecha ASC")
    List<PlanificacionDia> findByPlanificacionSemanaId(@Param("planificacionSemanaId") Long planificacionSemanaId);

    /**
     * Obtiene un día planificado específico por fecha y tipo de comida.
     *
     * @param planificacionSemanaId id de la planificación semanal
     * @param fecha fecha del día
     * @param tipoComida tipo de comida (DESAYUNO, COMIDA, CENA)
     * @return Optional con el día si existe
     */
    @Query("SELECT pd FROM PlanificacionDia pd WHERE pd.planificacionSemana.id = :planificacionSemanaId AND pd.fecha = :fecha AND pd.tipoComida = :tipoComida")
    Optional<PlanificacionDia> findByPlanificacionSemanaIdAndFechaAndTipoComida(
            @Param("planificacionSemanaId") Long planificacionSemanaId,
            @Param("fecha") LocalDate fecha,
            @Param("tipoComida") String tipoComida);

    /**
     * Obtiene todos los días planificados para una fecha específica.
     *
     * @param planificacionSemanaId id de la planificación semanal
     * @param fecha fecha del día
     * @return lista de comidas planificadas ese día
     */
    @Query("SELECT pd FROM PlanificacionDia pd WHERE pd.planificacionSemana.id = :planificacionSemanaId AND pd.fecha = :fecha ORDER BY FIELD(pd.tipoComida, 'DESAYUNO', 'ALMUERZO', 'COMIDA', 'MERIENDA', 'CENA')")
    List<PlanificacionDia> findByPlanificacionSemanaIdAndFecha(@Param("planificacionSemanaId") Long planificacionSemanaId, @Param("fecha") LocalDate fecha);

    /**
     * Obtiene todas las comidas de un tipo específico en una semana.
     *
     * @param planificacionSemanaId id de la planificación semanal
     * @param tipoComida tipo de comida
     * @return lista de comidas de ese tipo
     */
    @Query("SELECT pd FROM PlanificacionDia pd WHERE pd.planificacionSemana.id = :planificacionSemanaId AND pd.tipoComida = :tipoComida ORDER BY pd.fecha ASC")
    List<PlanificacionDia> findByPlanificacionSemanaIdAndTipoComida(
            @Param("planificacionSemanaId") Long planificacionSemanaId,
            @Param("tipoComida") String tipoComida);

    /**
     * Obtiene días con recetas asignadas en una planificación.
     *
     * @param planificacionSemanaId id de la planificación semanal
     * @return lista de días que tienen receta
     */
    @Query("SELECT pd FROM PlanificacionDia pd WHERE pd.planificacionSemana.id = :planificacionSemanaId AND pd.receta IS NOT NULL ORDER BY pd.fecha ASC")
    List<PlanificacionDia> findWithRecetaByPlanificacionSemanaId(@Param("planificacionSemanaId") Long planificacionSemanaId);

    /**
     * Obtiene días sin recetas asignadas en una planificación.
     *
     * @param planificacionSemanaId id de la planificación semanal
     * @return lista de días sin receta
     */
    @Query("SELECT pd FROM PlanificacionDia pd WHERE pd.planificacionSemana.id = :planificacionSemanaId AND pd.receta IS NULL ORDER BY pd.fecha ASC")
    List<PlanificacionDia> findWithoutRecetaByPlanificacionSemanaId(@Param("planificacionSemanaId") Long planificacionSemanaId);

    /**
     * Cuenta cuántos días tienen receta asignada en una planificación.
     *
     * @param planificacionSemanaId id de la planificación semanal
     * @return número de días con receta
     */
    @Query("SELECT COUNT(pd) FROM PlanificacionDia pd WHERE pd.planificacionSemana.id = :planificacionSemanaId AND pd.receta IS NOT NULL")
    long countWithReceta(@Param("planificacionSemanaId") Long planificacionSemanaId);

    /**
     * Obtiene todas las recetas planificadas en una semana (sin duplicados).
     *
     * @param planificacionSemanaId id de la planificación semanal
     * @return lista de recetas únicas
     */
    @Query("SELECT DISTINCT pd.receta FROM PlanificacionDia pd WHERE pd.planificacionSemana.id = :planificacionSemanaId AND pd.receta IS NOT NULL")
    List<com.example.backend.model.Receta> findDistinctRecetasByPlanificacionSemanaId(@Param("planificacionSemanaId") Long planificacionSemanaId);
}

