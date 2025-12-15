package com.example.backend.controller;

import com.example.backend.dto.RecetaCreateRequest;
import com.example.backend.dto.RecetaDetailedResponse;
import com.example.backend.dto.RecetaResponse;
import com.example.backend.service.RecetaService;
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
    @GetMapping("/rapidas")
    public ResponseEntity<List<RecetaResponse>> obtenerRecetasRapidas(@RequestParam Integer minutos) {
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
    @GetMapping("/porciones/{porciones}")
    public ResponseEntity<List<RecetaResponse>> obtenerPorPorciones(@PathVariable Integer porciones) {
        List<RecetaResponse> recetas = recetaService.obtenerPorPorciones(porciones);
        return ResponseEntity.ok(recetas);
    }

    /**
     * Cuenta el número total de recetas.
     * GET /api/recetas/count
     *
     * @return 200 OK con el total
     */
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
    @GetMapping("/{id}")
    public ResponseEntity<RecetaDetailedResponse> obtenerPorId(@PathVariable Long id) {
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
    @GetMapping
    public ResponseEntity<Page<RecetaResponse>> obtenerTodas(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<RecetaResponse> recetas = recetaService.obtenerTodas(pageable);
        return ResponseEntity.ok(recetas);
    }
}