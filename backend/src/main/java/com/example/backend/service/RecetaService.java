package com.example.backend.service;

import com.example.backend.dto.RecetaCreateRequest;
import com.example.backend.dto.RecetaDetailedResponse;
import com.example.backend.dto.RecetaIngredienteResponse;
import com.example.backend.dto.RecetaResponse;
import com.example.backend.model.Receta;
import com.example.backend.model.RecetaIngrediente;
import com.example.backend.repository.RecetaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
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
        Receta receta = Receta.builder()
                .nombre(request.getNombre())
                .descripcion(request.getDescripcion())
                .instrucciones(request.getInstrucciones())
                .tiempoPreparacion(request.getTiempoPreparacion())
                .porciones(request.getPorciones())
                .fechaCreacion(LocalDateTime.now())
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
        return RecetaResponse.builder()
                .id(receta.getId())
                .nombre(receta.getNombre())
                .descripcion(receta.getDescripcion())
                .instrucciones(receta.getInstrucciones())
                .tiempoPreparacion(receta.getTiempoPreparacion())
                .porciones(receta.getPorciones())
                .fechaCreacion(receta.getFechaCreacion())
                .build();
    }

    /**
     * Mapea una entidad Receta a un DTO Response detallado con ingredientes.
     *
     * @param receta entidad Receta
     * @return DTO Response detallado
     */
    private RecetaDetailedResponse mapToDetailedResponse(Receta receta) {
        return RecetaDetailedResponse.builder()
                .id(receta.getId())
                .nombre(receta.getNombre())
                .descripcion(receta.getDescripcion())
                .instrucciones(receta.getInstrucciones())
                .tiempoPreparacion(receta.getTiempoPreparacion())
                .porciones(receta.getPorciones())
                .fechaCreacion(receta.getFechaCreacion())
                .ingredientes(receta.getIngredientes()
                        .stream()
                        .map(ri -> RecetaIngredienteResponse.builder()
                                .id(ri.getId())
                                .cantidad(ri.getCantidad())
                                .unidad(ri.getUnidad())
                                .opcional(ri.getOpcional())
                                .build())
                        .collect(Collectors.toList()))
                .build();
    }
}

