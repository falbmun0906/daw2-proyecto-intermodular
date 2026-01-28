package com.example.backend.controller;

import com.example.backend.dto.RecetaIngredienteCreateRequest;
import com.example.backend.dto.RecetaIngredienteResponse;
import com.example.backend.service.RecetaIngredienteService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controlador REST para la relación RecetaIngrediente (anidado en Receta).
 * Rutas base: /api/recetas/{recetaId}/ingredientes
 */
@RestController
@RequestMapping("/api/recetas/{recetaId}/ingredientes")
@RequiredArgsConstructor
public class RecetaIngredienteController {

    private final RecetaIngredienteService recetaIngredienteService;

    /**
     * Agrega un ingrediente a una receta.
     * POST /api/recetas/{recetaId}/ingredientes
     *
     * @param recetaId id de la receta
     * @param request datos del ingrediente a agregar
     * @return 201 Created con la relación creada
     */
    @PostMapping
    public ResponseEntity<RecetaIngredienteResponse> agregarIngrediente(
            @PathVariable Long recetaId,
            @Valid @RequestBody RecetaIngredienteCreateRequest request) {
        RecetaIngredienteResponse response = recetaIngredienteService.agregarIngrediente(recetaId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * Lista todos los ingredientes de una receta.
     * GET /api/recetas/{recetaId}/ingredientes
     *
     * @param recetaId id de la receta
     * @return 200 OK con lista de ingredientes
     */
    @GetMapping
    public ResponseEntity<List<RecetaIngredienteResponse>> obtenerIngredientes(@PathVariable Long recetaId) {
        List<RecetaIngredienteResponse> ingredientes = recetaIngredienteService.obtenerIngredientesPorReceta(recetaId);
        return ResponseEntity.ok(ingredientes);
    }

    /**
     * Obtiene solo los ingredientes opcionales de una receta.
     * GET /api/recetas/{recetaId}/ingredientes/opcionales
     *
     * @param recetaId id de la receta
     * @return 200 OK con lista de ingredientes opcionales
     */
    @GetMapping("/opcionales")
    public ResponseEntity<List<RecetaIngredienteResponse>> obtenerIngredientesOpcionales(@PathVariable Long recetaId) {
        List<RecetaIngredienteResponse> ingredientes = recetaIngredienteService.obtenerIngredientesOpcionalesPorReceta(recetaId);
        return ResponseEntity.ok(ingredientes);
    }

    /**
     * Cuenta el número de ingredientes en una receta.
     * GET /api/recetas/{recetaId}/ingredientes/count
     *
     * @param recetaId id de la receta
     * @return 200 OK con el total
     */
    @GetMapping("/count")
    public ResponseEntity<Long> contarIngredientes(@PathVariable Long recetaId) {
        long total = recetaIngredienteService.contarIngredientesPorReceta(recetaId);
        return ResponseEntity.ok(total);
    }

    /**
     * Elimina un ingrediente de una receta.
     * DELETE /api/recetas/{recetaId}/ingredientes/{ingredienteId}
     *
     * @param recetaId id de la receta
     * @param ingredienteId id de la relación RecetaIngrediente
     * @return 204 No Content
     */
    @DeleteMapping("/{ingredienteId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> eliminarIngrediente(
            @PathVariable Long recetaId,
            @PathVariable Long ingredienteId) {
        recetaIngredienteService.eliminarIngrediente(ingredienteId);
        return ResponseEntity.noContent().build();
    }
}

