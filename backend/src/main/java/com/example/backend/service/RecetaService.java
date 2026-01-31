package com.example.backend.service;

import com.example.backend.dto.RecetaCreateRequest;
import com.example.backend.dto.RecetaDetailedResponse;
import com.example.backend.dto.RecetaIngredienteResponse;
import com.example.backend.dto.RecetaResponse;
import com.example.backend.model.Receta;
import com.example.backend.model.RecetaIngrediente;
import com.example.backend.model.TipoDieta;
import com.example.backend.repository.RecetaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Servicio para la lógica de negocio relacionada con Recetas.
 * Maneja operaciones CRUD y búsquedas avanzadas.
 */
@Service
@RequiredArgsConstructor
@Transactional
public class RecetaService {

    private final RecetaRepository recetaRepository;

    /**
     * Crea una nueva receta.
     *
     * @param request datos de la receta a crear
     * @return respuesta con la receta creada
     */
    public RecetaResponse crear(RecetaCreateRequest request) {
        Set<TipoDieta> etiquetas = new HashSet<>();
        if (request.getEtiquetas() != null) {
            request.getEtiquetas().forEach(etiqueta -> {
                try {
                    etiquetas.add(TipoDieta.valueOf(etiqueta));
                } catch (IllegalArgumentException e) {
                    // Ignorar etiquetas inválidas
                }
            });
        }

        Receta receta = Receta.builder()
                .nombre(request.getNombre())
                .descripcion(request.getDescripcion())
                .imagenUrl(request.getImagenUrl())
                .tiempoPreparacion(request.getTiempoPreparacion())
                .porciones(request.getPorciones())
                .fechaCreacion(LocalDateTime.now())
                .etiquetas(etiquetas)
                .build();

        Receta saved = recetaRepository.save(receta);
        return mapToResponse(saved);
    }

    /**
     * Obtiene una receta por su ID con todos sus ingredientes.
     *
     * @param id id de la receta
     * @return respuesta detallada con ingredientes
     * @throws IllegalArgumentException si no existe
     */
    public RecetaDetailedResponse obtenerPorIdDetallado(Long id) {
        Receta receta = recetaRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Receta no encontrada con ID: " + id));
        return mapToDetailedResponse(receta);
    }

    /**
     * Obtiene una receta simple por su ID.
     *
     * @param id id de la receta
     * @return respuesta básica
     * @throws IllegalArgumentException si no existe
     */
    public RecetaResponse obtenerPorId(Long id) {
        Receta receta = recetaRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Receta no encontrada con ID: " + id));
        return mapToResponse(receta);
    }

    /**
     * Obtiene todas las recetas.
     *
     * @return lista de recetas
     */
    public List<RecetaResponse> obtenerTodas() {
        return recetaRepository.findAllOrderByFechaCreacionDesc()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    /**
     * Obtiene todas las recetas con paginación.
     *
     * @param pageable parámetros de paginación
     * @return página de recetas
     */
    public Page<RecetaResponse> obtenerTodas(Pageable pageable) {
        return recetaRepository.findAll(pageable)
                .map(this::mapToResponse);
    }

    /**
     * Busca recetas por nombre (búsqueda parcial).
     *
     * @param nombre parte del nombre a buscar
     * @return lista de recetas encontradas
     */
    public List<RecetaResponse> buscarPorNombre(String nombre) {
        return recetaRepository.findByNombreContainingIgnoreCase(nombre)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    /**
     * Busca recetas por nombre con paginación.
     *
     * @param nombre parte del nombre a buscar
     * @param pageable parámetros de paginación
     * @return página de recetas
     */
    public Page<RecetaResponse> buscarPorNombre(String nombre, Pageable pageable) {
        return recetaRepository.findByNombreContainingIgnoreCase(nombre, pageable)
                .map(this::mapToResponse);
    }

    /**
     * Obtiene recetas rápidas (tiempo de preparación menor al especificado).
     *
     * @param minutos tiempo máximo de preparación
     * @return lista de recetas rápidas
     */
    public List<RecetaResponse> obtenerRecetasRapidas(Integer minutos) {
        return recetaRepository.findRecetasRapidas(minutos)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    /**
     * Obtiene recetas por número de porciones.
     *
     * @param porciones número de porciones
     * @return lista de recetas
     */
    public List<RecetaResponse> obtenerPorPorciones(Integer porciones) {
        return recetaRepository.findByPorciones(porciones)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    /**
     * Búsqueda avanzada de recetas con filtros múltiples.
     * Filtra por dificultad, tiempo máximo de preparación y/o etiqueta de dieta.
     *
     * @param dificultad nivel de dificultad (BAJA, MEDIA, ALTA) - opcional
     * @param tiempoMaximo tiempo máximo de preparación en minutos - opcional
     * @param dieta etiqueta de dieta (VEGETARIANA, VEGANA, etc.) - opcional
     * @return lista de recetas que cumplen los criterios
     */
    public List<RecetaResponse> filtrar(String dificultad, Integer tiempoMaximo, String dieta) {
        List<Receta> recetas = recetaRepository.findAllOrderByFechaCreacionDesc();

        // Filtrar por dificultad si se especifica
        if (dificultad != null && !dificultad.isEmpty()) {
            recetas = recetas.stream()
                    .filter(r -> r.getDificultad() != null && r.getDificultad().equalsIgnoreCase(dificultad))
                    .collect(Collectors.toList());
        }

        // Filtrar por tiempo máximo de preparación si se especifica
        if (tiempoMaximo != null) {
            recetas = recetas.stream()
                    .filter(r -> r.getTiempoPreparacion() != null && r.getTiempoPreparacion() <= tiempoMaximo)
                    .collect(Collectors.toList());
        }

        // Filtrar por etiqueta de dieta si se especifica
        if (dieta != null && !dieta.isEmpty()) {
            recetas = recetas.stream()
                    .filter(r -> r.getEtiquetas() != null && r.getEtiquetas().stream()
                            .anyMatch(etiqueta -> etiqueta.name().equalsIgnoreCase(dieta)))
                    .collect(Collectors.toList());
        }

        return recetas.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    /**
     * Cuenta el número total de recetas.
     *
     * @return total de recetas
     */
    public long contar() {
        return recetaRepository.count();
    }

    /**
     * Obtiene la entidad Receta completa por ID (uso interno).
     *
     * @param id id de la receta
     * @return entidad Receta
     * @throws IllegalArgumentException si no existe
     */
    public Receta obtenerRecetaCompleta(Long id) {
        return recetaRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Receta no encontrada con ID: " + id));
    }

    /**
     * Mapea una entidad Receta a un DTO Response básico.
     *
     * @param receta entidad Receta
     * @return DTO Response
     */
    private RecetaResponse mapToResponse(Receta receta) {
        Set<String> etiquetasStr = new HashSet<>();
        if (receta.getEtiquetas() != null) {
            receta.getEtiquetas().forEach(e -> etiquetasStr.add(e.name()));
        }

        // Generar las 3 URLs de imágenes basándose en el nombre de la receta (slug)
        String slug = generarSlug(receta.getNombre());
        String imagenUrlSmall = slug + "-small.webp";
        String imagenUrlMedium = slug + "-medium.webp";
        String imagenUrlLarge = slug + "-large.webp";

        return RecetaResponse.builder()
                .id(receta.getId())
                .nombre(receta.getNombre())
                .descripcion(receta.getDescripcion())
                .imagenUrlSmall(imagenUrlSmall)
                .imagenUrlMedium(imagenUrlMedium)
                .imagenUrlLarge(imagenUrlLarge)
                .tiempoPreparacion(receta.getTiempoPreparacion())
                .porciones(receta.getPorciones())
                .dificultad(receta.getDificultad())
                .fechaCreacion(receta.getFechaCreacion())
                .etiquetas(etiquetasStr)
                .build();
    }

    /**
     * Mapea una entidad Receta a un DTO Response detallado con ingredientes.
     *
     * @param receta entidad Receta
     * @return DTO Response detallado
     */
    private RecetaDetailedResponse mapToDetailedResponse(Receta receta) {
        Set<String> etiquetasStr = new HashSet<>();
        if (receta.getEtiquetas() != null) {
            receta.getEtiquetas().forEach(e -> etiquetasStr.add(e.name()));
        }

        // Generar las 3 URLs de imágenes basándose en el nombre de la receta (slug)
        String slug = generarSlug(receta.getNombre());
        String imagenUrlSmall = slug + "-small.webp";
        String imagenUrlMedium = slug + "-medium.webp";
        String imagenUrlLarge = slug + "-large.webp";

        return RecetaDetailedResponse.builder()
                .id(receta.getId())
                .nombre(receta.getNombre())
                .descripcion(receta.getDescripcion())
                .imagenUrlSmall(imagenUrlSmall)
                .imagenUrlMedium(imagenUrlMedium)
                .imagenUrlLarge(imagenUrlLarge)
                .tiempoPreparacion(receta.getTiempoPreparacion())
                .porciones(receta.getPorciones())
                .dificultad(receta.getDificultad())
                .fechaCreacion(receta.getFechaCreacion())
                .ingredientes(receta.getIngredientes()
                        .stream()
                        .map(ri -> RecetaIngredienteResponse.builder()
                                .id(ri.getId())
                                .ingrediente(com.example.backend.dto.IngredienteResponse.builder()
                                        .id(ri.getIngrediente().getId())
                                        .nombre(ri.getIngrediente().getNombre())
                                        .categoria(ri.getIngrediente().getCategoria())
                                        .unidadDefecto(ri.getIngrediente().getUnidadDefecto())
                                        .caloriasPorUnidad(ri.getIngrediente().getCaloriasPorUnidad())
                                        .build())
                                .cantidad(ri.getCantidad())
                                .unidad(ri.getUnidad())
                                .opcional(ri.getOpcional())
                                .build())
                        .collect(Collectors.toList()))
                .pasos(receta.getPasos()
                        .stream()
                        .map(paso -> com.example.backend.dto.RecetaPasoResponse.builder()
                                .id(paso.getId())
                                .orden(paso.getOrden())
                                .descripcion(paso.getDescripcion())
                                .tiempoMinutos(paso.getTiempoMinutos())
                                .build())
                        .collect(Collectors.toList()))
                .etiquetas(etiquetasStr)
                .build();
    }

    /**
     * Genera un slug a partir del nombre de la receta.
     * Convierte "Paella Valenciana" a "paella-valenciana".
     * Elimina acentos y caracteres especiales.
     *
     * @param nombre nombre de la receta
     * @return slug para usar en URLs de imágenes
     */
    private String generarSlug(String nombre) {
        if (nombre == null || nombre.isEmpty()) {
            return "default";
        }

        // Normalizar para eliminar acentos
        String normalized = java.text.Normalizer.normalize(nombre, java.text.Normalizer.Form.NFD);
        // Eliminar caracteres diacríticos (acentos)
        String sinAcentos = normalized.replaceAll("\\p{InCombiningDiacriticalMarks}+", "");
        // Convertir a minúsculas y reemplazar espacios por guiones
        String slug = sinAcentos.toLowerCase()
                .replaceAll("[^a-z0-9\\s-]", "") // Solo letras, números, espacios y guiones
                .replaceAll("\\s+", "-")          // Espacios a guiones
                .replaceAll("-+", "-")            // Múltiples guiones a uno solo
                .replaceAll("^-|-$", "");         // Eliminar guiones al inicio/final

        return slug.isEmpty() ? "default" : slug;
    }
}

