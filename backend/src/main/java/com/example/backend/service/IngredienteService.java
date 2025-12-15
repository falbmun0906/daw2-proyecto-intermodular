package com.example.backend.service;

import com.example.backend.dto.IngredienteCreateRequest;
import com.example.backend.dto.IngredienteResponse;
import com.example.backend.model.Ingrediente;
import com.example.backend.repository.IngredienteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Servicio para la lógica de negocio relacionada con Ingredientes.
 * Maneja operaciones CRUD y búsquedas en el catálogo de ingredientes.
 */
@Service
@RequiredArgsConstructor
@Transactional
public class IngredienteService {

    private final IngredienteRepository ingredienteRepository;

    /**
     * Crea un nuevo ingrediente.
     *
     * @param request datos del ingrediente
     * @return respuesta con el ingrediente creado
     * @throws IllegalArgumentException si el nombre ya existe
     */
    public IngredienteResponse crear(IngredienteCreateRequest request) {
        if (ingredienteRepository.existsByNombreIgnoreCase(request.getNombre())) {
            throw new IllegalArgumentException("Ya existe un ingrediente con el nombre: " + request.getNombre());
        }

        Ingrediente ingrediente = Ingrediente.builder()
                .nombre(request.getNombre())
                .categoria(request.getCategoria())
                .unidadDefecto(request.getUnidadDefecto())
                .caloriasPorUnidad(request.getCaloriasPorUnidad())
                .build();

        Ingrediente saved = ingredienteRepository.save(ingrediente);
        return mapToResponse(saved);
    }

    /**
     * Obtiene un ingrediente por su ID.
     *
     * @param id id del ingrediente
     * @return respuesta con el ingrediente
     * @throws IllegalArgumentException si no existe
     */
    public IngredienteResponse obtenerPorId(Long id) {
        Ingrediente ingrediente = ingredienteRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Ingrediente no encontrado con ID: " + id));
        return mapToResponse(ingrediente);
    }

    /**
     * Obtiene un ingrediente por su nombre exacto (case-insensitive).
     *
     * @param nombre nombre del ingrediente
     * @return respuesta con el ingrediente
     * @throws IllegalArgumentException si no existe
     */
    public IngredienteResponse obtenerPorNombre(String nombre) {
        Ingrediente ingrediente = ingredienteRepository.findByNombreIgnoreCase(nombre)
                .orElseThrow(() -> new IllegalArgumentException("Ingrediente no encontrado: " + nombre));
        return mapToResponse(ingrediente);
    }

    /**
     * Obtiene todos los ingredientes ordenados alfabéticamente.
     *
     * @return lista de ingredientes
     */
    public List<IngredienteResponse> obtenerTodos() {
        return ingredienteRepository.findAllOrderByNombre()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    /**
     * Obtiene todos los ingredientes con paginación.
     *
     * @param pageable parámetros de paginación
     * @return página de ingredientes
     */
    public Page<IngredienteResponse> obtenerTodos(Pageable pageable) {
        return ingredienteRepository.findAll(pageable)
                .map(this::mapToResponse);
    }

    /**
     * Busca ingredientes por nombre (búsqueda parcial).
     *
     * @param nombre parte del nombre a buscar
     * @return lista de ingredientes
     */
    public List<IngredienteResponse> buscarPorNombre(String nombre) {
        return ingredienteRepository.findByNombreContainingIgnoreCase(nombre)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    /**
     * Busca ingredientes por nombre con paginación.
     *
     * @param nombre parte del nombre a buscar
     * @param pageable parámetros de paginación
     * @return página de ingredientes
     */
    public Page<IngredienteResponse> buscarPorNombre(String nombre, Pageable pageable) {
        return ingredienteRepository.findByNombreContainingIgnoreCase(nombre, pageable)
                .map(this::mapToResponse);
    }

    /**
     * Obtiene ingredientes por categoría.
     *
     * @param categoria la categoría
     * @return lista de ingredientes
     */
    public List<IngredienteResponse> obtenerPorCategoria(String categoria) {
        return ingredienteRepository.findByCategoria(categoria)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    /**
     * Obtiene ingredientes por categoría con paginación.
     *
     * @param categoria la categoría
     * @param pageable parámetros de paginación
     * @return página de ingredientes
     */
    public Page<IngredienteResponse> obtenerPorCategoria(String categoria, Pageable pageable) {
        return ingredienteRepository.findByCategoria(categoria, pageable)
                .map(this::mapToResponse);
    }

    /**
     * Obtiene todas las categorías únicas de ingredientes.
     *
     * @return lista de categorías
     */
    public List<String> obtenerCategorias() {
        return ingredienteRepository.findDistinctCategories();
    }

    /**
     * Verifica si existe un ingrediente con el nombre dado.
     *
     * @param nombre nombre a verificar
     * @return true si existe, false en caso contrario
     */
    public boolean existePorNombre(String nombre) {
        return ingredienteRepository.existsByNombreIgnoreCase(nombre);
    }

    /**
     * Obtiene la entidad Ingrediente completa por ID (uso interno).
     *
     * @param id id del ingrediente
     * @return entidad Ingrediente
     * @throws IllegalArgumentException si no existe
     */
    public Ingrediente obtenerIngredienteCompleto(Long id) {
        return ingredienteRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Ingrediente no encontrado con ID: " + id));
    }

    /**
     * Mapea una entidad Ingrediente a un DTO Response.
     *
     * @param ingrediente entidad Ingrediente
     * @return DTO Response
     */
    private IngredienteResponse mapToResponse(Ingrediente ingrediente) {
        return IngredienteResponse.builder()
                .id(ingrediente.getId())
                .nombre(ingrediente.getNombre())
                .categoria(ingrediente.getCategoria())
                .unidadDefecto(ingrediente.getUnidadDefecto())
                .caloriasPorUnidad(ingrediente.getCaloriasPorUnidad())
                .build();
    }
}

