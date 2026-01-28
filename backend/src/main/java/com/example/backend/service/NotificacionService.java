package com.example.backend.service;

import com.example.backend.dto.NotificacionResponse;
import com.example.backend.model.DespensaItem;
import com.example.backend.model.Notificacion;
import com.example.backend.model.Receta;
import com.example.backend.model.Usuario;
import com.example.backend.repository.NotificacionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Servicio para gestionar notificaciones de usuarios.
 */
@Service
@RequiredArgsConstructor
public class NotificacionService {

    private final NotificacionRepository notificacionRepository;

    /**
     * Crea una notificación de ingrediente próximo a caducar.
     */
    @Transactional
    public Notificacion crearNotificacionCaducidad(Usuario usuario, DespensaItem item, int diasRestantes) {
        String titulo = "⚠️ Ingrediente próximo a caducar";
        String mensaje = String.format("El ingrediente '%s' caduca en %d día(s). ¡Úsalo pronto!",
                item.getIngrediente().getNombre(),
                diasRestantes);

        Notificacion notificacion = Notificacion.builder()
                .usuario(usuario)
                .tipo("CADUCIDAD_PROXIMA")
                .titulo(titulo)
                .mensaje(mensaje)
                .fechaCreacion(LocalDateTime.now())
                .leida(false)
                .despensaItem(item)
                .build();

        return notificacionRepository.save(notificacion);
    }

    /**
     * Crea una notificación de ingrediente caducado.
     */
    @Transactional
    public Notificacion crearNotificacionCaducado(Usuario usuario, DespensaItem item) {
        String titulo = "❌ Ingrediente caducado";
        String mensaje = String.format("El ingrediente '%s' ha caducado. Revisa tu despensa.",
                item.getIngrediente().getNombre());

        Notificacion notificacion = Notificacion.builder()
                .usuario(usuario)
                .tipo("CADUCADO")
                .titulo(titulo)
                .mensaje(mensaje)
                .fechaCreacion(LocalDateTime.now())
                .leida(false)
                .despensaItem(item)
                .build();

        return notificacionRepository.save(notificacion);
    }

    /**
     * Crea una notificación de recomendación de receta.
     */
    @Transactional
    public Notificacion crearNotificacionRecomendacion(Usuario usuario, Receta receta, int porcentaje) {
        String titulo = "💡 Receta recomendada";
        String mensaje = String.format("Puedes preparar '%s' con un %d%% de los ingredientes en tu despensa.",
                receta.getNombre(),
                porcentaje);

        Notificacion notificacion = Notificacion.builder()
                .usuario(usuario)
                .tipo("RECOMENDACION_RECETA")
                .titulo(titulo)
                .mensaje(mensaje)
                .fechaCreacion(LocalDateTime.now())
                .leida(false)
                .receta(receta)
                .build();

        return notificacionRepository.save(notificacion);
    }

    /**
     * Obtiene todas las notificaciones de un usuario.
     */
    @Transactional(readOnly = true)
    public List<NotificacionResponse> obtenerNotificaciones(Usuario usuario) {
        List<Notificacion> notificaciones = notificacionRepository.findByUsuarioOrderByFechaCreacionDesc(usuario);
        return notificaciones.stream()
                .map(this::convertirAResponse)
                .collect(Collectors.toList());
    }

    /**
     * Obtiene las notificaciones no leídas de un usuario.
     */
    @Transactional(readOnly = true)
    public List<NotificacionResponse> obtenerNotificacionesNoLeidas(Usuario usuario) {
        List<Notificacion> notificaciones = notificacionRepository.findByUsuarioAndLeidaFalseOrderByFechaCreacionDesc(usuario);
        return notificaciones.stream()
                .map(this::convertirAResponse)
                .collect(Collectors.toList());
    }

    /**
     * Cuenta las notificaciones no leídas de un usuario.
     */
    @Transactional(readOnly = true)
    public Long contarNotificacionesNoLeidas(Usuario usuario) {
        return notificacionRepository.countByUsuarioAndLeidaFalse(usuario);
    }

    /**
     * Marca una notificación como leída.
     */
    @Transactional
    public NotificacionResponse marcarComoLeida(Long notificacionId) {
        Notificacion notificacion = notificacionRepository.findById(notificacionId)
                .orElseThrow(() -> new RuntimeException("Notificación no encontrada con id: " + notificacionId));

        notificacion.setLeida(true);
        Notificacion guardada = notificacionRepository.save(notificacion);
        return convertirAResponse(guardada);
    }

    /**
     * Marca todas las notificaciones de un usuario como leídas.
     */
    @Transactional
    public void marcarTodasComoLeidas(Usuario usuario) {
        List<Notificacion> notificaciones = notificacionRepository.findByUsuarioAndLeidaFalseOrderByFechaCreacionDesc(usuario);
        notificaciones.forEach(n -> n.setLeida(true));
        notificacionRepository.saveAll(notificaciones);
    }

    /**
     * Elimina una notificación.
     */
    @Transactional
    public void eliminarNotificacion(Long notificacionId) {
        notificacionRepository.deleteById(notificacionId);
    }

    /**
     * Convierte una entidad Notificacion a NotificacionResponse.
     */
    private NotificacionResponse convertirAResponse(Notificacion notificacion) {
        return NotificacionResponse.builder()
                .id(notificacion.getId())
                .tipo(notificacion.getTipo())
                .titulo(notificacion.getTitulo())
                .mensaje(notificacion.getMensaje())
                .fechaCreacion(notificacion.getFechaCreacion())
                .leida(notificacion.getLeida())
                .despensaItemId(notificacion.getDespensaItem() != null ? notificacion.getDespensaItem().getId() : null)
                .despensaItemNombre(notificacion.getDespensaItem() != null ? notificacion.getDespensaItem().getIngrediente().getNombre() : null)
                .recetaId(notificacion.getReceta() != null ? notificacion.getReceta().getId() : null)
                .recetaNombre(notificacion.getReceta() != null ? notificacion.getReceta().getNombre() : null)
                .build();
    }
}
