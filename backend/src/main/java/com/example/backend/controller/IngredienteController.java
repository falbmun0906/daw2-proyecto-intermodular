package com.example.backend.controller;

import com.example.backend.dto.IngredienteCreateRequest;
import com.example.backend.dto.IngredienteResponse;
import com.example.backend.service.IngredienteService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controlador REST para la gestión de Ingredientes.
 * Rutas base: /api/ingredientes
 */
@RestController
@RequestMapping("/api/ingredientes")
@RequiredArgsConstructor
public class IngredienteController {

    private final IngredienteService ingredienteService;

    /**
     * Crea un nuevo ingrediente.
     * POST /api/ingredientes
     *
     * @param request datos del ingrediente
     * @return 201 Created con el ingrediente creado
     */
    @PostMapping
    public ResponseEntity<IngredienteResponse> crear(@Valid @RequestBody IngredienteCreateRequest request) {
        IngredienteResponse response = ingredienteService.crear(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * Busca ingredientes por nombre.
     * GET /api/ingredientes/buscar?nombre=X&page=0&size=10
     *
     * @param nombre parte del nombre a buscar
     * @param page número de página (opcional)
     * @param size tamaño de página (opcional)
     * @return 200 OK con página de ingredientes o lista completa
     */
    @GetMapping("/buscar")
    public ResponseEntity<?> buscarPorNombre(
            @RequestParam String nombre,
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer size) {
        if (page != null && size != null) {
            Pageable pageable = PageRequest.of(page, size);
            Page<IngredienteResponse> ingredientes = ingredienteService.buscarPorNombre(nombre, pageable);
            return ResponseEntity.ok(ingredientes);
        } else {
            List<IngredienteResponse> ingredientes = ingredienteService.buscarPorNombre(nombre);
            return ResponseEntity.ok(ingredientes);
        }
    }

    /**
     * Obtiene ingredientes por categoría.
     * GET /api/ingredientes/categoria/{categoria}?page=0&size=10
     *
     * @param categoria nombre de la categoría
     * @param page número de página (opcional)
     * @param size tamaño de página (opcional)
     * @return 200 OK con ingredientes de esa categoría
     */
    @GetMapping("/categoria/{categoria}")
    public ResponseEntity<?> obtenerPorCategoria(
            @PathVariable String categoria,
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer size) {
        if (page != null && size != null) {
            Pageable pageable = PageRequest.of(page, size);
            Page<IngredienteResponse> ingredientes = ingredienteService.obtenerPorCategoria(categoria, pageable);
            return ResponseEntity.ok(ingredientes);
        } else {
            List<IngredienteResponse> ingredientes = ingredienteService.obtenerPorCategoria(categoria);
            return ResponseEntity.ok(ingredientes);
        }
    }

    /**
     * Obtiene todas las categorías únicas de ingredientes.
     * GET /api/ingredientes/categorias
     *
     * @return 200 OK con lista de categorías
     */
    @GetMapping("/categorias")
    public ResponseEntity<List<String>> obtenerCategorias() {
        List<String> categorias = ingredienteService.obtenerCategorias();
        return ResponseEntity.ok(categorias);
    }

    /**
     * Obtiene un ingrediente por ID.
     * GET /api/ingredientes/{id}
     *
     * @param id id del ingrediente
     * @return 200 OK con el ingrediente
     */
    @GetMapping("/{id}")
    public ResponseEntity<IngredienteResponse> obtenerPorId(@PathVariable Long id) {
        IngredienteResponse response = ingredienteService.obtenerPorId(id);
        return ResponseEntity.ok(response);
    }

    /**
     * Lista todos los ingredientes con paginación opcional.
     * GET /api/ingredientes?page=0&size=10
     *
     * @param page número de página (opcional)
     * @param size tamaño de página (opcional)
     * @return 200 OK con página de ingredientes o lista completa
     */
    @GetMapping
    public ResponseEntity<?> obtenerTodos(
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer size) {
        if (page != null && size != null) {
            Pageable pageable = PageRequest.of(page, size);
            Page<IngredienteResponse> ingredientes = ingredienteService.obtenerTodos(pageable);
            return ResponseEntity.ok(ingredientes);
        } else {
            List<IngredienteResponse> ingredientes = ingredienteService.obtenerTodos();
            return ResponseEntity.ok(ingredientes);
        }
    }
}


