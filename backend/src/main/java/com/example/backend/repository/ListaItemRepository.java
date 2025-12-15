package com.example.backend.repository;

import com.example.backend.model.ListaItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repositorio para la entidad ListaItem.
 * Proporciona operaciones CRUD y consultas para items de listas de compra.
 */
@Repository
public interface ListaItemRepository extends JpaRepository<ListaItem, Long> {

    /**
     * Obtiene todos los items de una lista de compra.
     *
     * @param listaCompraId id de la lista de compra
     * @return lista de items
     */
    @Query("SELECT li FROM ListaItem li WHERE li.listaCompra.id = :listaCompraId ORDER BY li.ingrediente.nombre ASC")
    List<ListaItem> findByListaCompraId(@Param("listaCompraId") Long listaCompraId);

    /**
     * Obtiene items no comprados de una lista.
     *
     * @param listaCompraId id de la lista de compra
     * @return lista de items sin comprar
     */
    @Query("SELECT li FROM ListaItem li WHERE li.listaCompra.id = :listaCompraId AND li.comprado = false ORDER BY li.ingrediente.nombre ASC")
    List<ListaItem> findNotCompradosByListaCompraId(@Param("listaCompraId") Long listaCompraId);

    /**
     * Obtiene items comprados de una lista.
     *
     * @param listaCompraId id de la lista de compra
     * @return lista de items comprados
     */
    @Query("SELECT li FROM ListaItem li WHERE li.listaCompra.id = :listaCompraId AND li.comprado = true ORDER BY li.ingrediente.nombre ASC")
    List<ListaItem> findCompradosByListaCompraId(@Param("listaCompraId") Long listaCompraId);

    /**
     * Obtiene un item específico de una lista.
     *
     * @param listaCompraId id de la lista de compra
     * @param ingredienteId id del ingrediente
     * @return Optional con el item si existe
     */
    @Query("SELECT li FROM ListaItem li WHERE li.listaCompra.id = :listaCompraId AND li.ingrediente.id = :ingredienteId")
    Optional<ListaItem> findByListaCompraIdAndIngredienteId(@Param("listaCompraId") Long listaCompraId, @Param("ingredienteId") Long ingredienteId);

    /**
     * Cuenta el número de items en una lista.
     *
     * @param listaCompraId id de la lista de compra
     * @return número de items
     */
    @Query("SELECT COUNT(li) FROM ListaItem li WHERE li.listaCompra.id = :listaCompraId")
    long countByListaCompraId(@Param("listaCompraId") Long listaCompraId);

    /**
     * Cuenta el número de items no comprados en una lista.
     *
     * @param listaCompraId id de la lista de compra
     * @return número de items sin comprar
     */
    @Query("SELECT COUNT(li) FROM ListaItem li WHERE li.listaCompra.id = :listaCompraId AND li.comprado = false")
    long countNotCompradosByListaCompraId(@Param("listaCompraId") Long listaCompraId);

    /**
     * Cuenta el número de items comprados en una lista.
     *
     * @param listaCompraId id de la lista de compra
     * @return número de items comprados
     */
    @Query("SELECT COUNT(li) FROM ListaItem li WHERE li.listaCompra.id = :listaCompraId AND li.comprado = true")
    long countCompradosByListaCompraId(@Param("listaCompraId") Long listaCompraId);

    /**
     * Verifica si un ingrediente está en una lista.
     *
     * @param listaCompraId id de la lista de compra
     * @param ingredienteId id del ingrediente
     * @return true si existe, false en caso contrario
     */
    @Query("SELECT CASE WHEN COUNT(li) > 0 THEN true ELSE false END FROM ListaItem li WHERE li.listaCompra.id = :listaCompraId AND li.ingrediente.id = :ingredienteId")
    boolean existsByListaCompraIdAndIngredienteId(@Param("listaCompraId") Long listaCompraId, @Param("ingredienteId") Long ingredienteId);

    /**
     * Obtiene el porcentaje de items comprados en una lista.
     * Retorna 0 si la lista está vacía.
     *
     * @param listaCompraId id de la lista de compra
     * @return porcentaje (0-100)
     */
    @Query(value = "SELECT CASE WHEN COUNT(*) = 0 THEN 0 ELSE ROUND(100.0 * SUM(CASE WHEN comprado = true THEN 1 ELSE 0 END) / COUNT(*), 2) END FROM lista_item WHERE lista_compra_id = :listaCompraId", nativeQuery = true)
    Double getPorcentajeComprado(@Param("listaCompraId") Long listaCompraId);
}

