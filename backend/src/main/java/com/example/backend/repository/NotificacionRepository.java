package com.example.backend.repository;

import com.example.backend.model.Notificacion;
import com.example.backend.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface NotificacionRepository extends JpaRepository<Notificacion, Long> {
    List<Notificacion> findByUsuarioOrderByFechaCreacionDesc(Usuario usuario);
    List<Notificacion> findByUsuarioAndLeidaFalseOrderByFechaCreacionDesc(Usuario usuario);
    Long countByUsuarioAndLeidaFalse(Usuario usuario);
    List<Notificacion> findByUsuarioAndFechaCreacionAfter(Usuario usuario, LocalDateTime fecha);
}
