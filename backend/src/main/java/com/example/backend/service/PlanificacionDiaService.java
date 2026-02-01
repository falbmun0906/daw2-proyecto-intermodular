package com.example.backend.service;

import com.example.backend.dto.PlanificacionDiaCreateRequest;
import com.example.backend.dto.PlanificacionDiaResponse;
import com.example.backend.dto.RecetaResponse;
import com.example.backend.model.PlanificacionDia;
import com.example.backend.model.PlanificacionSemana;
import com.example.backend.repository.PlanificacionDiaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Servicio para la lógica de negocio de Planificación de Días.
 */
@Service
@RequiredArgsConstructor
@Transactional
public class PlanificacionDiaService {

    private final PlanificacionDiaRepository planificacionDiaRepository;
    private final PlanificacionSemanaService planificacionSemanaService;
    private final RecetaService recetaService;

    /**
     * Crea una comida planificada para un día.
     */
    public PlanificacionDiaResponse crear(Long usuarioId, Long planificacionSemanaId, PlanificacionDiaCreateRequest request) {
        PlanificacionSemana planificacionSemana = planificacionSemanaService.obtenerCompleta(usuarioId, planificacionSemanaId);

        PlanificacionDia planificacionDia = PlanificacionDia.builder()
                .planificacionSemana(planificacionSemana)
                .fecha(request.getFecha())
                .tipoComida(PlanificacionDia.TipoComida.valueOf(request.getTipoComida()))
                .notas(request.getNotas())
                .build();

        if (request.getRecetaId() != null) {
            planificacionDia.setReceta(recetaService.obtenerRecetaCompleta(request.getRecetaId()));
        }

        PlanificacionDia saved = planificacionDiaRepository.save(planificacionDia);
        return mapToResponse(saved);
    }

    /**
     * Obtiene un día planificado.
     */
    public PlanificacionDiaResponse obtenerPorId(Long usuarioId, Long planificacionSemanaId, Long diaId) {
        planificacionSemanaService.obtenerCompleta(usuarioId, planificacionSemanaId);
        PlanificacionDia dia = planificacionDiaRepository.findById(diaId)
                .orElseThrow(() -> new IllegalArgumentException("Día no encontrado"));
        if (!dia.getPlanificacionSemana().getId().equals(planificacionSemanaId)) {
            throw new IllegalArgumentException("El día no pertenece a esta semana");
        }
        return mapToResponse(dia);
    }

    /**
     * Obtiene todos los días de una semana.
     */
    public List<PlanificacionDiaResponse> obtenerDelaSemana(Long usuarioId, Long planificacionSemanaId) {
        planificacionSemanaService.obtenerCompleta(usuarioId, planificacionSemanaId);
        return planificacionDiaRepository.findByPlanificacionSemanaId(planificacionSemanaId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    /**
     * Obtiene comidas de un día específico.
     */
    public List<PlanificacionDiaResponse> obtenerDelDia(Long usuarioId, Long planificacionSemanaId, LocalDate fecha) {
        planificacionSemanaService.obtenerCompleta(usuarioId, planificacionSemanaId);
        return planificacionDiaRepository.findByPlanificacionSemanaIdAndFecha(planificacionSemanaId, fecha)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    /**
     * Actualiza una comida planificada.
     */
    public PlanificacionDiaResponse actualizar(Long usuarioId, Long planificacionSemanaId, Long diaId, PlanificacionDiaCreateRequest request) {
        PlanificacionDia dia = obtenerDiaCompleto(usuarioId, planificacionSemanaId, diaId);

        if (request.getFecha() != null) {
            dia.setFecha(request.getFecha());
        }
        if (request.getTipoComida() != null) {
            dia.setTipoComida(PlanificacionDia.TipoComida.valueOf(request.getTipoComida()));
        }
        if (request.getRecetaId() != null) {
            dia.setReceta(recetaService.obtenerRecetaCompleta(request.getRecetaId()));
        }
        if (request.getNotas() != null) {
            dia.setNotas(request.getNotas());
        }

        PlanificacionDia saved = planificacionDiaRepository.save(dia);
        return mapToResponse(saved);
    }

    /**
     * Elimina una comida planificada.
     */
    public void eliminar(Long usuarioId, Long planificacionSemanaId, Long diaId) {
        PlanificacionDia dia = obtenerDiaCompleto(usuarioId, planificacionSemanaId, diaId);
        planificacionDiaRepository.delete(dia);
    }

    /**
     * Obtiene el objeto completo validando pertenencia.
     */
    private PlanificacionDia obtenerDiaCompleto(Long usuarioId, Long planificacionSemanaId, Long diaId) {
        planificacionSemanaService.obtenerCompleta(usuarioId, planificacionSemanaId);
        PlanificacionDia dia = planificacionDiaRepository.findById(diaId)
                .orElseThrow(() -> new IllegalArgumentException("Día no encontrado"));
        if (!dia.getPlanificacionSemana().getId().equals(planificacionSemanaId)) {
            throw new IllegalArgumentException("El día no pertenece a esta semana");
        }
        return dia;
    }

    /**
     * Mapea a Response.
     */
    private PlanificacionDiaResponse mapToResponse(PlanificacionDia dia) {
        RecetaResponse recetaResponse = null;
        if (dia.getReceta() != null) {
            // Generar las 3 URLs de imágenes basándose en el nombre de la receta (slug)
            String slug = generarSlug(dia.getReceta().getNombre());
            String imagenUrlSmall = slug + "-small.webp";
            String imagenUrlMedium = slug + "-medium.webp";
            String imagenUrlLarge = slug + "-large.webp";

            recetaResponse = RecetaResponse.builder()
                    .id(dia.getReceta().getId())
                    .nombre(dia.getReceta().getNombre())
                    .descripcion(dia.getReceta().getDescripcion())
                    .imagenUrlSmall(imagenUrlSmall)
                    .imagenUrlMedium(imagenUrlMedium)
                    .imagenUrlLarge(imagenUrlLarge)
                    .tiempoPreparacion(dia.getReceta().getTiempoPreparacion())
                    .porciones(dia.getReceta().getPorciones())
                    .dificultad(dia.getReceta().getDificultad())
                    .fechaCreacion(dia.getReceta().getFechaCreacion())
                    .build();
        }

        return PlanificacionDiaResponse.builder()
                .id(dia.getId())
                .fecha(dia.getFecha())
                .tipoComida(dia.getTipoComida().name())
                .receta(recetaResponse)
                .notas(dia.getNotas())
                .build();
    }

    /**
     * Genera un slug a partir del nombre de la receta.
     */
    private String generarSlug(String nombre) {
        if (nombre == null || nombre.isEmpty()) {
            return "default";
        }

        String normalized = java.text.Normalizer.normalize(nombre, java.text.Normalizer.Form.NFD);
        String sinAcentos = normalized.replaceAll("\\p{InCombiningDiacriticalMarks}+", "");
        String slug = sinAcentos.toLowerCase()
                .replaceAll("[^a-z0-9\\s-]", "")
                .replaceAll("\\s+", "-")
                .replaceAll("-+", "-")
                .replaceAll("^-|-$", "");

        return slug.isEmpty() ? "default" : slug;
    }
}

