package com.example.backend.service;

import com.example.backend.dto.RecetaIngredienteCreateRequest;
import com.example.backend.dto.RecetaIngredienteResponse;
import com.example.backend.dto.IngredienteResponse;
import com.example.backend.model.RecetaIngrediente;
import com.example.backend.model.Receta;
import com.example.backend.model.Ingrediente;
import com.example.backend.repository.RecetaIngredienteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Servicio para la lógica de negocio de la relación RecetaIngrediente.
 * Maneja la asociación N:M entre recetas e ingredientes.
 */
@Service
@RequiredArgsConstructor
@Transactional
public class RecetaIngredienteService {

    private final RecetaIngredienteRepository recetaIngredienteRepository;
    private final RecetaService recetaService;
    private final IngredienteService ingredienteService;

    /**
     * Agrega un ingrediente a una receta.
     *
     * @param recetaId id de la receta
     * @param request datos del ingrediente (cantidad, unidad, etc.)
     * @return respuesta con la relación creada
     * @throws IllegalArgumentException si el ingrediente ya está en la receta
     */
    public RecetaIngredienteResponse agregarIngrediente(Long recetaId, RecetaIngredienteCreateRequest request) {
        Receta receta = recetaService.obtenerRecetaCompleta(recetaId);
        Ingrediente ingrediente = ingredienteService.obtenerIngredienteCompleto(request.getIngredienteId());

        if (recetaIngredienteRepository.existsByRecetaIdAndIngredienteId(recetaId, request.getIngredienteId())) {
            throw new IllegalArgumentException("El ingrediente ya existe en esta receta");
        }

        RecetaIngrediente recetaIngrediente = RecetaIngrediente.builder()
                .receta(receta)
                .ingrediente(ingrediente)
                .cantidad(request.getCantidad())
                .unidad(request.getUnidad())
                .opcional(request.getOpcional())
                .build();

        RecetaIngrediente saved = recetaIngredienteRepository.save(recetaIngrediente);
        return mapToResponse(saved);
    }

    /**
     * Obtiene todos los ingredientes de una receta.
     *
     * @param recetaId id de la receta
     * @return lista de ingredientes en la receta
     */
    public List<RecetaIngredienteResponse> obtenerIngredientesPorReceta(Long recetaId) {
        recetaService.obtenerRecetaCompleta(recetaId); // Validar que existe la receta
        return recetaIngredienteRepository.findByRecetaId(recetaId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    /**
     * Obtiene los ingredientes opcionales de una receta.
     *
     * @param recetaId id de la receta
     * @return lista de ingredientes opcionales
     */
    public List<RecetaIngredienteResponse> obtenerIngredientesOpcionalesPorReceta(Long recetaId) {
        recetaService.obtenerRecetaCompleta(recetaId); // Validar que existe la receta
        return recetaIngredienteRepository.findIngredientesOpcionalesByRecetaId(recetaId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    /**
     * Cuenta el número de ingredientes en una receta.
     *
     * @param recetaId id de la receta
     * @return cantidad de ingredientes
     */
    public long contarIngredientesPorReceta(Long recetaId) {
        recetaService.obtenerRecetaCompleta(recetaId); // Validar que existe la receta
        return recetaIngredienteRepository.countByRecetaId(recetaId);
    }

    /**
     * Obtiene todas las recetas que contienen un ingrediente específico.
     *
     * @param ingredienteId id del ingrediente
     * @return lista de relaciones receta-ingrediente
     */
    public List<RecetaIngredienteResponse> obtenerRecetasPorIngrediente(Long ingredienteId) {
        ingredienteService.obtenerIngredienteCompleto(ingredienteId); // Validar que existe el ingrediente
        return recetaIngredienteRepository.findByIngredienteId(ingredienteId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    /**
     * Cuenta cuántas recetas contienen un ingrediente específico.
     *
     * @param ingredienteId id del ingrediente
     * @return número de recetas
     */
    public long contarRecetasPorIngrediente(Long ingredienteId) {
        ingredienteService.obtenerIngredienteCompleto(ingredienteId); // Validar que existe el ingrediente
        return recetaIngredienteRepository.countRecetasByIngredienteId(ingredienteId);
    }

    /**
     * Elimina un ingrediente de una receta.
     *
     * @param recetaIngredienteId id de la relación a eliminar
     * @throws IllegalArgumentException si no existe
     */
    public void eliminarIngrediente(Long recetaIngredienteId) {
        RecetaIngrediente recetaIngrediente = recetaIngredienteRepository.findById(recetaIngredienteId)
                .orElseThrow(() -> new IllegalArgumentException("Ingrediente no encontrado en la receta"));
        recetaIngredienteRepository.delete(recetaIngrediente);
    }

    /**
     * Mapea una entidad RecetaIngrediente a un DTO Response.
     *
     * @param recetaIngrediente entidad RecetaIngrediente
     * @return DTO Response
     */
    private RecetaIngredienteResponse mapToResponse(RecetaIngrediente recetaIngrediente) {
        IngredienteResponse ingredienteResponse = IngredienteResponse.builder()
                .id(recetaIngrediente.getIngrediente().getId())
                .nombre(recetaIngrediente.getIngrediente().getNombre())
                .categoria(recetaIngrediente.getIngrediente().getCategoria())
                .unidadDefecto(recetaIngrediente.getIngrediente().getUnidadDefecto())
                .caloriasPorUnidad(recetaIngrediente.getIngrediente().getCaloriasPorUnidad())
                .build();

        return RecetaIngredienteResponse.builder()
                .id(recetaIngrediente.getId())
                .ingrediente(ingredienteResponse)
                .cantidad(recetaIngrediente.getCantidad())
                .unidad(recetaIngrediente.getUnidad())
                .opcional(recetaIngrediente.getOpcional())
                .build();
    }
}

