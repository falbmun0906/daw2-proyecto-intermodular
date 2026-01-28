package com.example.backend.service;

import com.example.backend.model.DespensaItem;
import com.example.backend.model.Usuario;
import com.example.backend.repository.DespensaItemRepository;
import com.example.backend.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

/**
 * Servicio programado para verificar ingredientes próximos a caducar
 * y actualizar su estado automáticamente.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class CaducidadSchedulerService {

    private final DespensaItemRepository despensaItemRepository;
    private final UsuarioRepository usuarioRepository;
    private final NotificacionService notificacionService;

    /**
     * Verifica los ingredientes próximos a caducar cada día a las 9:00 AM.
     * Cron: segundo, minuto, hora, día del mes, mes, día de la semana
     */
    @Scheduled(cron = "0 0 9 * * *")
    @Transactional
    public void verificarCaducidades() {
        log.info("Iniciando verificación de caducidades programada");

        List<Usuario> usuarios = usuarioRepository.findAll();
        int notificacionesCreadas = 0;

        for (Usuario usuario : usuarios) {
            List<DespensaItem> items = despensaItemRepository.findByUsuarioId(usuario.getId());

            for (DespensaItem item : items) {
                if (item.getFechaCaducidad() == null) {
                    continue;
                }

                LocalDate hoy = LocalDate.now();
                LocalDate fechaCaducidad = item.getFechaCaducidad();
                long diasRestantes = ChronoUnit.DAYS.between(hoy, fechaCaducidad);

                DespensaItem.EstadoDespensaItem estadoAnterior = item.getEstado();
                DespensaItem.EstadoDespensaItem nuevoEstado = estadoAnterior;

                // Actualizar estado según días restantes
                if (diasRestantes < 0) {
                    // Ya caducó
                    nuevoEstado = DespensaItem.EstadoDespensaItem.CADUCADO;
                    if (estadoAnterior != DespensaItem.EstadoDespensaItem.CADUCADO) {
                        notificacionService.crearNotificacionCaducado(usuario, item);
                        notificacionesCreadas++;
                    }
                } else if (diasRestantes <= 3) {
                    // Próximo a caducar (3 días o menos)
                    nuevoEstado = DespensaItem.EstadoDespensaItem.PROXIMO_A_CADUCAR;
                    if (estadoAnterior != DespensaItem.EstadoDespensaItem.PROXIMO_A_CADUCAR
                            && estadoAnterior != DespensaItem.EstadoDespensaItem.CADUCADO) {
                        notificacionService.crearNotificacionCaducidad(usuario, item, (int) diasRestantes);
                        notificacionesCreadas++;
                    }
                } else {
                    // OK
                    nuevoEstado = DespensaItem.EstadoDespensaItem.OK;
                }

                if (nuevoEstado != estadoAnterior) {
                    item.setEstado(nuevoEstado);
                    despensaItemRepository.save(item);
                }
            }
        }

        log.info("Verificación de caducidades completada. Notificaciones creadas: {}", notificacionesCreadas);
    }

    /**
     * Genera recomendaciones de recetas semanalmente (Lunes a las 10:00 AM).
     */
    @Scheduled(cron = "0 0 10 * * MON")
    @Transactional
    public void generarRecomendacionesSemanales() {
        log.info("Iniciando generación de recomendaciones semanales");

        List<Usuario> usuarios = usuarioRepository.findAll();

        for (Usuario usuario : usuarios) {
            try {
                // Este método se implementará en el RecomendacionService
                // y generará notificaciones de recomendaciones
                log.info("Generando recomendaciones para usuario: {}", usuario.getEmail());
            } catch (Exception e) {
                log.error("Error al generar recomendaciones para usuario {}: {}", usuario.getId(), e.getMessage());
            }
        }

        log.info("Generación de recomendaciones semanales completada");
    }

    /**
     * Limpia notificaciones antiguas cada semana (Domingo a las 23:00).
     * Elimina notificaciones leídas con más de 30 días.
     */
    @Scheduled(cron = "0 0 23 * * SUN")
    @Transactional
    public void limpiarNotificacionesAntiguas() {
        log.info("Iniciando limpieza de notificaciones antiguas");
        // Este método se puede implementar en NotificacionService
        log.info("Limpieza de notificaciones antiguas completada");
    }
}
