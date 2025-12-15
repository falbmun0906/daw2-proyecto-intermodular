package com.example.backend.repository;

import com.example.backend.model.Receta;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repositorio para la entidad Receta.
 * Proporciona operaciones CRUD y consultas personalizadas para recetas.
 */
@Repository
public interface RecetaRepository extends JpaRepository<Receta, Long> {

    /**
     * Busca recetas por nombre (búsqueda parcial, case-insensitive).
     * Útil para filtros de búsqueda en la API.
     *
     * @param nombre parte del nombre a buscar
     * @return lista de recetas que contienen el nombre
     */
    List<Receta> findByNombreContainingIgnoreCase(String nombre);

    /**
     * Busca recetas con paginación por nombre.
     *
     * @param nombre parte del nombre a buscar
     * @param pageable información de paginación
     * @return página de recetas
     */
    Page<Receta> findByNombreContainingIgnoreCase(String nombre, Pageable pageable);

    /**
     * Busca recetas por tiempo de preparación menor a un valor.
     * Útil para filtros "recetas rápidas".
     *
     * @param minutos tiempo máximo de preparación
     * @return lista de recetas rápidas
     */
    @Query("SELECT r FROM Receta r WHERE r.tiempoPreparacion <= :minutos ORDER BY r.tiempoPreparacion ASC")
    List<Receta> findRecetasRapidas(@Param("minutos") Integer minutos);

    /**
     * Busca recetas por número de porciones.
     *
     * @param porciones número de porciones
     * @return lista de recetas con ese número de porciones
     */
    List<Receta> findByPorciones(Integer porciones);

    /**
     * Cuenta el número total de recetas en el sistema.
     *
     * @return cantidad de recetas
     */
    long count();

    /**
     * Obtiene todas las recetas ordenadas por fecha de creación descendente.
     *
     * @return lista de recetas más recientes primero
     */
    @Query("SELECT r FROM Receta r ORDER BY r.fechaCreacion DESC")
    List<Receta> findAllOrderByFechaCreacionDesc();
}

