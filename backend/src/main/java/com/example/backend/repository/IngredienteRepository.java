package com.example.backend.repository;

import com.example.backend.model.Ingrediente;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repositorio para la entidad Ingrediente.
 * Proporciona operaciones CRUD y consultas personalizadas para ingredientes.
 */
@Repository
public interface IngredienteRepository extends JpaRepository<Ingrediente, Long> {

    /**
     * Busca ingredientes por nombre (búsqueda parcial, case-insensitive).
     *
     * @param nombre parte del nombre a buscar
     * @return lista de ingredientes
     */
    List<Ingrediente> findByNombreContainingIgnoreCase(String nombre);

    /**
     * Busca ingredientes por nombre con paginación.
     *
     * @param nombre parte del nombre a buscar
     * @param pageable información de paginación
     * @return página de ingredientes
     */
    Page<Ingrediente> findByNombreContainingIgnoreCase(String nombre, Pageable pageable);

    /**
     * Busca ingredientes por categoría.
     *
     * @param categoria la categoría a buscar
     * @return lista de ingredientes en esa categoría
     */
    List<Ingrediente> findByCategoria(String categoria);

    /**
     * Busca ingredientes por categoría con paginación.
     *
     * @param categoria la categoría a buscar
     * @param pageable información de paginación
     * @return página de ingredientes
     */
    Page<Ingrediente> findByCategoria(String categoria, Pageable pageable);

    /**
     * Verifica si existe un ingrediente con el nombre exacto (case-insensitive).
     *
     * @param nombre nombre exacto del ingrediente
     * @return true si existe, false en caso contrario
     */
    @Query("SELECT CASE WHEN COUNT(i) > 0 THEN true ELSE false END FROM Ingrediente i WHERE LOWER(i.nombre) = LOWER(:nombre)")
    boolean existsByNombreIgnoreCase(@Param("nombre") String nombre);

    /**
     * Busca un ingrediente por nombre exacto (case-insensitive).
     *
     * @param nombre nombre exacto del ingrediente
     * @return Optional con el ingrediente si existe
     */
    @Query("SELECT i FROM Ingrediente i WHERE LOWER(i.nombre) = LOWER(:nombre)")
    Optional<Ingrediente> findByNombreIgnoreCase(@Param("nombre") String nombre);

    /**
     * Obtiene ingredientes ordenados alfabéticamente.
     *
     * @return lista de ingredientes ordenados por nombre
     */
    @Query("SELECT i FROM Ingrediente i ORDER BY i.nombre ASC")
    List<Ingrediente> findAllOrderByNombre();

    /**
     * Obtiene todas las categorías únicas de ingredientes.
     *
     * @return lista de categorías sin duplicados
     */
    @Query("SELECT DISTINCT i.categoria FROM Ingrediente i WHERE i.categoria IS NOT NULL ORDER BY i.categoria ASC")
    List<String> findDistinctCategories();
}

