package com.example.backend.controller;

import com.example.backend.dto.PlanificacionDiaCreateRequest;
import com.example.backend.dto.PlanificacionDiaResponse;
import com.example.backend.service.PlanificacionDiaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

/**
 * Controlador REST para la gestión de Días Planificados (anidado en PlanificacionSemana).
 * Rutas base: /api/usuarios/{usuarioId}/planificaciones/{planificacionId}/dias
 */
@RestController
@RequestMapping("/api/usuarios/{usuarioId}/planificaciones/{planificacionId}/dias")
@RequiredArgsConstructor
public class PlanificacionDiaController {

    private final PlanificacionDiaService planificacionDiaService;

    /**
     * Crea una comida planificada para un día.
     * POST /api/usuarios/{usuarioId}/planificaciones/{planificacionId}/dias
     *
     * @param usuarioId id del usuario
     * @param planificacionId id de la planificación semanal
     * @param request datos del día a planificar
     * @return 201 Created con el día creado
     */
    @PostMapping
    public ResponseEntity<PlanificacionDiaResponse> crear(
            @PathVariable Long usuarioId,
            @PathVariable Long planificacionId,
            @Valid @RequestBody PlanificacionDiaCreateRequest request) {
        PlanificacionDiaResponse response = planificacionDiaService.crear(usuarioId, planificacionId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * Obtiene un día planificado específico.
     * GET /api/usuarios/{usuarioId}/planificaciones/{planificacionId}/dias/{diaId}
     *
     * @param usuarioId id del usuario
     * @param planificacionId id de la planificación semanal
     * @param diaId id del día
     * @return 200 OK con el día planificado
     */
    @GetMapping("/{diaId}")
    public ResponseEntity<PlanificacionDiaResponse> obtenerPorId(
            @PathVariable Long usuarioId,
            @PathVariable Long planificacionId,
            @PathVariable Long diaId) {
        PlanificacionDiaResponse response = planificacionDiaService.obtenerPorId(usuarioId, planificacionId, diaId);
        return ResponseEntity.ok(response);
    }

    /**
     * Lista todos los días de una semana.
     * GET /api/usuarios/{usuarioId}/planificaciones/{planificacionId}/dias
     *
     * @param usuarioId id del usuario
     * @param planificacionId id de la planificación semanal
     * @return 200 OK con lista de días
     */
    @GetMapping
    public ResponseEntity<List<PlanificacionDiaResponse>> obtenerDelaSemana(
            @PathVariable Long usuarioId,
            @PathVariable Long planificacionId) {
        List<PlanificacionDiaResponse> dias = planificacionDiaService.obtenerDelaSemana(usuarioId, planificacionId);
        return ResponseEntity.ok(dias);
    }

    /**
     * Obtiene todas las comidas de un día específico.
     * GET /api/usuarios/{usuarioId}/planificaciones/{planificacionId}/dias/fecha?fecha=2025-01-15
     *
     * @param usuarioId id del usuario
     * @param planificacionId id de la planificación semanal
     * @param fecha fecha del día
     * @return 200 OK con lista de comidas del día
     */
    @GetMapping("/fecha")
    public ResponseEntity<List<PlanificacionDiaResponse>> obtenerDelDia(
            @PathVariable Long usuarioId,
            @PathVariable Long planificacionId,
            @RequestParam LocalDate fecha) {
        List<PlanificacionDiaResponse> dias = planificacionDiaService.obtenerDelDia(usuarioId, planificacionId, fecha);
        return ResponseEntity.ok(dias);
    }

    /**
     * Actualiza una comida planificada.
     * PUT /api/usuarios/{usuarioId}/planificaciones/{planificacionId}/dias/{diaId}
     *
     * @param usuarioId id del usuario
     * @param planificacionId id de la planificación semanal
     * @param diaId id del día
     * @param request datos a actualizar
     * @return 200 OK con el día actualizado
     */
    @PutMapping("/{diaId}")
    public ResponseEntity<PlanificacionDiaResponse> actualizar(
            @PathVariable Long usuarioId,
            @PathVariable Long planificacionId,
            @PathVariable Long diaId,
            @Valid @RequestBody PlanificacionDiaCreateRequest request) {
        PlanificacionDiaResponse response = planificacionDiaService.actualizar(usuarioId, planificacionId, diaId, request);
        return ResponseEntity.ok(response);
    }

    /**
     * Elimina una comida planificada.
     * DELETE /api/usuarios/{usuarioId}/planificaciones/{planificacionId}/dias/{diaId}
     *
     * @param usuarioId id del usuario
     * @param planificacionId id de la planificación semanal
     * @param diaId id del día
     * @return 204 No Content
     */
    @DeleteMapping("/{diaId}")
    public ResponseEntity<Void> eliminar(
            @PathVariable Long usuarioId,
            @PathVariable Long planificacionId,
            @PathVariable Long diaId) {
        planificacionDiaService.eliminar(usuarioId, planificacionId, diaId);
        return ResponseEntity.noContent().build();
    }
}

