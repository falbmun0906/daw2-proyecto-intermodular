package com.example.backend.controller;

import com.example.backend.dto.RecetaCreateRequest;
import com.example.backend.dto.RecetaDetailedResponse;
import com.example.backend.dto.RecetaResponse;
import com.example.backend.service.RecetaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controlador REST para la gestión de Recetas.
 * Rutas base: /api/recetas
 */
@RestController
@RequestMapping("/api/recetas")
@RequiredArgsConstructor
public class RecetaController {

    private final RecetaService recetaService;

    /**
     * Crea una nueva receta.
     * POST /api/recetas
     *
     * @param request datos de la receta
     * @return 201 Created con la receta creada
     */
    @PostMapping
    public ResponseEntity<RecetaResponse> crear(@Valid @RequestBody RecetaCreateRequest request) {
        RecetaResponse response = recetaService.crear(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * Busca recetas por nombre.
     * GET /api/recetas/buscar?nombre=X&page=0&size=10
     *
     * @param nombre parte del nombre a buscar
     * @param page número de página (opcional)
     * @param size tamaño de página (opcional)
     * @return 200 OK con página de recetas o lista completa
     */
    @GetMapping("/buscar")
    public ResponseEntity<?> buscarPorNombre(
            @RequestParam String nombre,
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer size) {
        if (page != null && size != null) {
            Pageable pageable = PageRequest.of(page, size);
            Page<RecetaResponse> recetas = recetaService.buscarPorNombre(nombre, pageable);
            return ResponseEntity.ok(recetas);
        } else {
            List<RecetaResponse> recetas = recetaService.buscarPorNombre(nombre);
            return ResponseEntity.ok(recetas);
        }
    }

    /**
     * Obtiene recetas rápidas (tiempo de preparación <= minutos).
     * GET /api/recetas/rapidas?minutos=30
     *
     * @param minutos tiempo máximo de preparación
     * @return 200 OK con lista de recetas rápidas
     */
    @Operation(summary = "Obtener recetas rápidas", description = "Listar recetas con tiempo de preparación menor o igual al especificado")
    @GetMapping("/rapidas")
    public ResponseEntity<List<RecetaResponse>> obtenerRecetasRapidas(
            @Parameter(description = "Tiempo máximo de preparación en minutos") @RequestParam Integer minutos) {
        List<RecetaResponse> recetas = recetaService.obtenerRecetasRapidas(minutos);
        return ResponseEntity.ok(recetas);
    }

    /**
     * Obtiene recetas por número de porciones.
     * GET /api/recetas/porciones/{porciones}
     *
     * @param porciones número de porciones
     * @return 200 OK con lista de recetas
     */
    @Operation(summary = "Filtrar por porciones", description = "Obtener recetas que rinden un número específico de porciones")
    @GetMapping("/porciones/{porciones}")
    public ResponseEntity<List<RecetaResponse>> obtenerPorPorciones(
            @Parameter(description = "Número de porciones") @PathVariable Integer porciones) {
        List<RecetaResponse> recetas = recetaService.obtenerPorPorciones(porciones);
        return ResponseEntity.ok(recetas);
    }

    /**
     * Cuenta el número total de recetas.
     * GET /api/recetas/count
     *
     * @return 200 OK con el total
     */
    @Operation(summary = "Contar recetas", description = "Obtener el número total de recetas en el sistema")
    @GetMapping("/count")
    public ResponseEntity<Long> contar() {
        long total = recetaService.contar();
        return ResponseEntity.ok(total);
    }

    /**
     * Obtiene una receta por ID con todos sus ingredientes.
     * GET /api/recetas/{id}
     *
     * @param id id de la receta
     * @return 200 OK con la receta detallada
     */
    @Operation(summary = "Obtener receta por ID", description = "Obtener detalles completos de una receta incluyendo ingredientes y pasos")
    @GetMapping("/{id}")
    public ResponseEntity<RecetaDetailedResponse> obtenerPorId(
            @Parameter(description = "ID de la receta") @PathVariable Long id) {
        RecetaDetailedResponse response = recetaService.obtenerPorIdDetallado(id);
        return ResponseEntity.ok(response);
    }

    /**
     * Lista todas las recetas con paginación.
     * GET /api/recetas?page=0&size=10&sort=nombre,asc
     *
     * @param page número de página (default 0)
     * @param size tamaño de página (default 10)
     * @return 200 OK con página de recetas
     */
    @Operation(summary = "Listar todas las recetas", description = "Obtener recetas con paginación")
    @GetMapping
    public ResponseEntity<Page<RecetaResponse>> obtenerTodas(
            @Parameter(description = "Número de página") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Tamaño de página") @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<RecetaResponse> recetas = recetaService.obtenerTodas(pageable);
        return ResponseEntity.ok(recetas);
    }
}