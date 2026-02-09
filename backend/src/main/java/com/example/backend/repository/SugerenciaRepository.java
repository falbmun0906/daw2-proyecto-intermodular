package com.example.backend.repository;

import com.example.backend.model.Sugerencia;
import com.example.backend.model.Usuario;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface SugerenciaRepository extends JpaRepository<Sugerencia, Long> {
}
