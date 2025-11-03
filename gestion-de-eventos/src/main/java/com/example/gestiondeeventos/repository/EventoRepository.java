package com.example.gestiondeeventos.repository;

import com.example.gestiondeeventos.domain.Evento;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventoRepository extends JpaRepository<Evento, Long> {
}
