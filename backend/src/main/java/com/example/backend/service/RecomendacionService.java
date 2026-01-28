package com.example.backend.service;

import com.example.backend.dto.RecetaRecomendacionResponse;
import com.example.backend.model.DespensaItem;
import com.example.backend.model.Receta;
import com.example.backend.model.RecetaIngrediente;
import com.example.backend.model.Usuario;
import com.example.backend.repository.DespensaItemRepository;
import com.example.backend.repository.RecetaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

/**
 * Servicio para generar recomendaciones de recetas basadas en ingredientes disponibles.
 */
@Service
@RequiredArgsConstructor
public class RecomendacionService {

    private final RecetaRepository recetaRepository;
    private final DespensaItemRepository despensaItemRepository;
    private final NotificacionService notificacionService;

    /**
     * Obtiene recomendaciones de recetas basadas en los ingredientes disponibles del usuario.
     *
     * @param usuario usuario para el cual generar recomendaciones
     * @param porcentajeMinimo porcentaje mínimo de coincidencia (por defecto 50%)
     * @return lista de recetas recomendadas ordenadas por porcentaje de coincidencia
     */
    @Transactional(readOnly = true)
    public List<RecetaRecomendacionResponse> obtenerRecomendaciones(Usuario usuario, Integer porcentajeMinimo) {
        if (porcentajeMinimo == null) {
            porcentajeMinimo = 50;
        }

        // Obtener ingredientes disponibles en la despensa del usuario
        List<DespensaItem> despensa = despensaItemRepository.findByUsuarioId(usuario.getId());
        Set<Long> ingredientesDisponiblesIds = despensa.stream()
                .map(item -> item.getIngrediente().getId())
                .collect(Collectors.toSet());

        if (ingredientesDisponiblesIds.isEmpty()) {
            return Collections.emptyList();
        }

        // Obtener todas las recetas
        List<Receta> todasRecetas = recetaRepository.findAll();

        // Calcular coincidencias
        List<RecetaRecomendacionResponse> recomendaciones = new ArrayList<>();

        for (Receta receta : todasRecetas) {
            List<RecetaIngrediente> ingredientesReceta = receta.getIngredientes();

            if (ingredientesReceta.isEmpty()) {
                continue;
            }

            Set<Long> ingredientesRecetaIds = ingredientesReceta.stream()
                    .map(ri -> ri.getIngrediente().getId())
                    .collect(Collectors.toSet());

            // Calcular coincidencias
            Set<Long> coincidencias = new HashSet<>(ingredientesRecetaIds);
            coincidencias.retainAll(ingredientesDisponiblesIds);

            int porcentajeCoincidencia = (coincidencias.size() * 100) / ingredientesRecetaIds.size();

            if (porcentajeCoincidencia >= porcentajeMinimo) {
                // Ingredientes que faltan
                Set<Long> faltantesIds = new HashSet<>(ingredientesRecetaIds);
                faltantesIds.removeAll(ingredientesDisponiblesIds);

                List<String> ingredientesFaltantes = ingredientesReceta.stream()
                        .filter(ri -> faltantesIds.contains(ri.getIngrediente().getId()))
                        .map(ri -> ri.getIngrediente().getNombre())
                        .collect(Collectors.toList());

                List<String> ingredientesDisponibles = ingredientesReceta.stream()
                        .filter(ri -> coincidencias.contains(ri.getIngrediente().getId()))
                        .map(ri -> ri.getIngrediente().getNombre())
                        .collect(Collectors.toList());

                RecetaRecomendacionResponse recomendacion = RecetaRecomendacionResponse.builder()
                        .id(receta.getId())
                        .nombre(receta.getNombre())
                        .descripcion(receta.getDescripcion())
                        .imagenUrl(receta.getImagenUrl())
                        .tiempoPreparacion(receta.getTiempoPreparacion())
                        .porciones(receta.getPorciones())
                        .dificultad(receta.getDificultad())
                        .porcentajeCoincidencia(porcentajeCoincidencia)
                        .ingredientesFaltantes(ingredientesFaltantes)
                        .ingredientesDisponibles(ingredientesDisponibles)
                        .build();

                recomendaciones.add(recomendacion);
            }
        }

        // Ordenar por porcentaje de coincidencia descendente
        recomendaciones.sort((r1, r2) -> r2.getPorcentajeCoincidencia().compareTo(r1.getPorcentajeCoincidencia()));

        return recomendaciones;
    }

    /**
     * Genera notificaciones de recomendaciones para un usuario.
     * Solo crea notificaciones para recetas con 80% o más de coincidencia.
     */
    @Transactional
    public void generarNotificacionesRecomendaciones(Usuario usuario) {
        List<RecetaRecomendacionResponse> recomendaciones = obtenerRecomendaciones(usuario, 80);

        // Crear notificaciones solo para las mejores recomendaciones (máximo 3)
        recomendaciones.stream()
                .limit(3)
                .forEach(rec -> {
                    Receta receta = recetaRepository.findById(rec.getId()).orElse(null);
                    if (receta != null) {
                        notificacionService.crearNotificacionRecomendacion(usuario, receta, rec.getPorcentajeCoincidencia());
                    }
                });
    }
}
