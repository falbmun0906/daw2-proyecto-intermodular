package com.example.backend.repository;

import com.example.backend.model.RecetaPaso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repositorio para la entidad RecetaPaso.
 */
@Repository
public interface RecetaPasoRepository extends JpaRepository<RecetaPaso, Long> {
    List<RecetaPaso> findByRecetaIdOrderByOrden(Long recetaId);
}

