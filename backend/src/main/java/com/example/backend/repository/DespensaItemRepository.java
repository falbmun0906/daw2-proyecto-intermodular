package com.example.backend.repository;

import com.example.backend.model.DespensaItem;
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
 * Repositorio para la entidad DespensaItem.
 * Proporciona operaciones CRUD y consultas personalizadas para la despensa del usuario.
 */
@Repository
public interface DespensaItemRepository extends JpaRepository<DespensaItem, Long> {

    /**
     * Obtiene todos los items de la despensa de un usuario.
     *
     * @param usuarioId id del usuario
     * @return lista de items en la despensa
     */
    @Query("SELECT di FROM DespensaItem di WHERE di.usuario.id = :usuarioId ORDER BY di.ingrediente.nombre ASC")
    List<DespensaItem> findByUsuarioId(@Param("usuarioId") Long usuarioId);

    /**
     * Obtiene los items de la despensa de un usuario con paginación.
     *
     * @param usuarioId id del usuario
     * @param pageable información de paginación
     * @return página de items
     */
    Page<DespensaItem> findByUsuarioId(@Param("usuarioId") Long usuarioId, Pageable pageable);

    /**
     * Busca un item específico en la despensa del usuario.
     *
     * @param usuarioId id del usuario
     * @param ingredienteId id del ingrediente
     * @return Optional con el item si existe
     */
    @Query("SELECT di FROM DespensaItem di WHERE di.usuario.id = :usuarioId AND di.ingrediente.id = :ingredienteId")
    Optional<DespensaItem> findByUsuarioIdAndIngredienteId(@Param("usuarioId") Long usuarioId, @Param("ingredienteId") Long ingredienteId);

    /**
     * Obtiene items caducados de la despensa del usuario.
     *
     * @param usuarioId id del usuario
     * @return lista de items caducados
     */
    @Query("SELECT di FROM DespensaItem di WHERE di.usuario.id = :usuarioId AND di.estado = 'CADUCADO' ORDER BY di.fechaCaducidad ASC")
    List<DespensaItem> findCaducadosByUsuarioId(@Param("usuarioId") Long usuarioId);

    /**
     * Obtiene items próximos a caducar de la despensa del usuario.
     *
     * @param usuarioId id del usuario
     * @return lista de items próximos a caducar
     */
    @Query("SELECT di FROM DespensaItem di WHERE di.usuario.id = :usuarioId AND di.estado = 'PROXIMO_A_CADUCAR' ORDER BY di.fechaCaducidad ASC")
    List<DespensaItem> findProximoCaducarByUsuarioId(@Param("usuarioId") Long usuarioId);

    /**
     * Obtiene items en buen estado de la despensa del usuario.
     *
     * @param usuarioId id del usuario
     * @return lista de items OK
     */
    @Query("SELECT di FROM DespensaItem di WHERE di.usuario.id = :usuarioId AND di.estado = 'OK' ORDER BY di.ingrediente.nombre ASC")
    List<DespensaItem> findOkByUsuarioId(@Param("usuarioId") Long usuarioId);

    /**
     * Obtiene items de una ubicación específica en la despensa.
     *
     * @param usuarioId id del usuario
     * @param ubicacion la ubicación (ej: "Nevera", "Congelador", etc.)
     * @return lista de items en esa ubicación
     */
    @Query("SELECT di FROM DespensaItem di WHERE di.usuario.id = :usuarioId AND di.ubicacion = :ubicacion ORDER BY di.ingrediente.nombre ASC")
    List<DespensaItem> findByUsuarioIdAndUbicacion(@Param("usuarioId") Long usuarioId, @Param("ubicacion") String ubicacion);

    /**
     * Obtiene items que caducan antes de una fecha específica.
     *
     * @param usuarioId id del usuario
     * @param fecha fecha límite
     * @return lista de items que caducan antes
     */
    @Query("SELECT di FROM DespensaItem di WHERE di.usuario.id = :usuarioId AND di.fechaCaducidad IS NOT NULL AND di.fechaCaducidad <= :fecha ORDER BY di.fechaCaducidad ASC")
    List<DespensaItem> findCaducadosAntesDeFecha(@Param("usuarioId") Long usuarioId, @Param("fecha") LocalDate fecha);

    /**
     * Busca items por nombre de ingrediente en la despensa del usuario.
     *
     * @param usuarioId id del usuario
     * @param nombre parte del nombre del ingrediente
     * @return lista de items encontrados
     */
    @Query("SELECT di FROM DespensaItem di WHERE di.usuario.id = :usuarioId AND LOWER(di.ingrediente.nombre) LIKE LOWER(CONCAT('%', :nombre, '%')) ORDER BY di.ingrediente.nombre ASC")
    List<DespensaItem> findByUsuarioIdAndIngredienteNombre(@Param("usuarioId") Long usuarioId, @Param("nombre") String nombre);

    /**
     * Cuenta el número de items en la despensa del usuario.
     *
     * @param usuarioId id del usuario
     * @return número de items
     */
    @Query("SELECT COUNT(di) FROM DespensaItem di WHERE di.usuario.id = :usuarioId")
    long countByUsuarioId(@Param("usuarioId") Long usuarioId);

    /**
     * Verifica si un ingrediente existe en la despensa del usuario.
     *
     * @param usuarioId id del usuario
     * @param ingredienteId id del ingrediente
     * @return true si existe, false en caso contrario
     */
    @Query("SELECT CASE WHEN COUNT(di) > 0 THEN true ELSE false END FROM DespensaItem di WHERE di.usuario.id = :usuarioId AND di.ingrediente.id = :ingredienteId")
    boolean existsByUsuarioIdAndIngredienteId(@Param("usuarioId") Long usuarioId, @Param("ingredienteId") Long ingredienteId);

    /**
     * Obtiene items que caducan en los próximos días.
     *
     * @param usuarioId id del usuario
     * @param fechaInicio fecha inicio del rango
     * @param fechaFin fecha fin del rango
     * @return lista de items que caducan en el rango
     */
    @Query("SELECT di FROM DespensaItem di WHERE di.usuario.id = :usuarioId AND di.fechaCaducidad IS NOT NULL AND di.fechaCaducidad BETWEEN :fechaInicio AND :fechaFin ORDER BY di.fechaCaducidad ASC")
    List<DespensaItem> findByUsuarioIdAndFechaCaducidadBetween(@Param("usuarioId") Long usuarioId, @Param("fechaInicio") LocalDate fechaInicio, @Param("fechaFin") LocalDate fechaFin);
}

