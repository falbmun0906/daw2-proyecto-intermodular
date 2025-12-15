package com.example.backend.repository;

import com.example.backend.model.RecetaIngrediente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repositorio para la entidad RecetaIngrediente.
 * Proporciona operaciones CRUD y consultas para la relación N:M entre Receta e Ingrediente.
 */
@Repository
public interface RecetaIngredienteRepository extends JpaRepository<RecetaIngrediente, Long> {

    /**
     * Obtiene todos los ingredientes de una receta específica.
     *
     * @param recetaId id de la receta
     * @return lista de ingredientes en esa receta
     */
    @Query("SELECT ri FROM RecetaIngrediente ri WHERE ri.receta.id = :recetaId ORDER BY ri.ingrediente.nombre ASC")
    List<RecetaIngrediente> findByRecetaId(@Param("recetaId") Long recetaId);

    /**
     * Cuenta cuántos ingredientes tiene una receta.
     *
     * @param recetaId id de la receta
     * @return número de ingredientes
     */
    @Query("SELECT COUNT(ri) FROM RecetaIngrediente ri WHERE ri.receta.id = :recetaId")
    long countByRecetaId(@Param("recetaId") Long recetaId);

    /**
     * Busca ingredientes opcionales de una receta.
     * Útil para mostrar qué ingredientes son opcionales en una receta.
     *
     * @param recetaId id de la receta
     * @return lista de ingredientes opcionales
     */
    @Query("SELECT ri FROM RecetaIngrediente ri WHERE ri.receta.id = :recetaId AND ri.opcional = true")
    List<RecetaIngrediente> findIngredientesOpcionalesByRecetaId(@Param("recetaId") Long recetaId);

    /**
     * Busca todas las recetas que contienen un ingrediente específico.
     *
     * @param ingredienteId id del ingrediente
     * @return lista de recetas que contienen ese ingrediente
     */
    @Query("SELECT ri FROM RecetaIngrediente ri WHERE ri.ingrediente.id = :ingredienteId ORDER BY ri.receta.nombre ASC")
    List<RecetaIngrediente> findByIngredienteId(@Param("ingredienteId") Long ingredienteId);

    /**
     * Cuenta cuántas recetas contienen un ingrediente específico.
     *
     * @param ingredienteId id del ingrediente
     * @return número de recetas
     */
    @Query("SELECT COUNT(DISTINCT ri.receta.id) FROM RecetaIngrediente ri WHERE ri.ingrediente.id = :ingredienteId")
    long countRecetasByIngredienteId(@Param("ingredienteId") Long ingredienteId);

    /**
     * Verifica si un ingrediente ya existe en una receta.
     *
     * @param recetaId id de la receta
     * @param ingredienteId id del ingrediente
     * @return true si existe, false en caso contrario
     */
    @Query("SELECT CASE WHEN COUNT(ri) > 0 THEN true ELSE false END FROM RecetaIngrediente ri WHERE ri.receta.id = :recetaId AND ri.ingrediente.id = :ingredienteId")
    boolean existsByRecetaIdAndIngredienteId(@Param("recetaId") Long recetaId, @Param("ingredienteId") Long ingredienteId);
}

