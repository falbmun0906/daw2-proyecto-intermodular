package com.example.backend.service;

import com.example.backend.dto.PlanificacionSemanaCreateRequest;
import com.example.backend.dto.PlanificacionSemanaResponse;
import com.example.backend.dto.PlanificacionDiaResponse;
import com.example.backend.model.PlanificacionSemana;
import com.example.backend.model.PlanificacionDia;
import com.example.backend.model.Usuario;
import com.example.backend.repository.PlanificacionSemanaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Servicio para la lógica de negocio de Planificación de Semanas.
 */
@Service
@RequiredArgsConstructor
@Transactional
public class PlanificacionSemanaService {

    private final PlanificacionSemanaRepository planificacionSemanaRepository;
    private final UsuarioService usuarioService;

    /**
     * Crea una nueva planificación semanal.
     */
    public PlanificacionSemanaResponse crear(Long usuarioId, PlanificacionSemanaCreateRequest request) {
        Usuario usuario = usuarioService.obtenerUsuarioCompleto(usuarioId);

        PlanificacionSemana planificacion = PlanificacionSemana.builder()
                .usuario(usuario)
                .fechaInicio(request.getFechaInicio())
                .etiqueta(request.getEtiqueta())
                .fechaCreacion(LocalDateTime.now())
                .build();

        PlanificacionSemana saved = planificacionSemanaRepository.save(planificacion);
        return mapToResponse(saved);
    }

    /**
     * Obtiene una planificación por ID.
     */
    public PlanificacionSemanaResponse obtenerPorId(Long usuarioId, Long planificacionId) {
        PlanificacionSemana planificacion = obtenerCompleta(usuarioId, planificacionId);
        return mapToResponse(planificacion);
    }

    /**
     * Obtiene todas las planificaciones del usuario.
     */
    public List<PlanificacionSemanaResponse> obtenerDelUsuario(Long usuarioId) {
        usuarioService.obtenerUsuarioCompleto(usuarioId);
        return planificacionSemanaRepository.findByUsuarioId(usuarioId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    /**
     * Obtiene planificaciones del usuario con paginación.
     */
    public Page<PlanificacionSemanaResponse> obtenerDelUsuario(Long usuarioId, Pageable pageable) {
        usuarioService.obtenerUsuarioCompleto(usuarioId);
        return planificacionSemanaRepository.findByUsuarioId(usuarioId, pageable)
                .map(this::mapToResponse);
    }

    /**
     * Obtiene la planificación más reciente del usuario.
     */
    public PlanificacionSemanaResponse obtenerMasReciente(Long usuarioId) {
        usuarioService.obtenerUsuarioCompleto(usuarioId);
        PlanificacionSemana planificacion = planificacionSemanaRepository.findMostRecentByUsuarioId(usuarioId)
                .orElseThrow(() -> new IllegalArgumentException("No hay planificaciones para este usuario"));
        return mapToResponse(planificacion);
    }

    /**
     * Obtiene la entidad completa (uso interno).
     */
    public PlanificacionSemana obtenerCompleta(Long usuarioId, Long planificacionId) {
        usuarioService.obtenerUsuarioCompleto(usuarioId);
        PlanificacionSemana planificacion = planificacionSemanaRepository.findById(planificacionId)
                .orElseThrow(() -> new IllegalArgumentException("Planificación no encontrada"));
        if (!planificacion.getUsuario().getId().equals(usuarioId)) {
            throw new IllegalArgumentException("La planificación no pertenece a este usuario");
        }
        return planificacion;
    }

    /**
     * Mapea a Response.
     */
    private PlanificacionSemanaResponse mapToResponse(PlanificacionSemana planificacion) {
        List<PlanificacionDiaResponse> dias = planificacion.getDias()
                .stream()
                .map(pd -> PlanificacionDiaResponse.builder()
                        .id(pd.getId())
                        .fecha(pd.getFecha())
                        .tipoComida(pd.getTipoComida().name())
                        .notas(pd.getNotas())
                        .receta(pd.getReceta() != null ? com.example.backend.dto.RecetaResponse.builder()
                                .id(pd.getReceta().getId())
                                .nombre(pd.getReceta().getNombre())
                                .descripcion(pd.getReceta().getDescripcion())
                                .imagenUrl(pd.getReceta().getImagenUrl())
                                .tiempoPreparacion(pd.getReceta().getTiempoPreparacion())
                                .porciones(pd.getReceta().getPorciones())
                                .fechaCreacion(pd.getReceta().getFechaCreacion())
                                .build() : null)
                        .build())
                .collect(Collectors.toList());

        return PlanificacionSemanaResponse.builder()
                .id(planificacion.getId())
                .fechaInicio(planificacion.getFechaInicio())
                .etiqueta(planificacion.getEtiqueta())
                .fechaCreacion(planificacion.getFechaCreacion())
                .dias(dias)
                .build();
    }
}

