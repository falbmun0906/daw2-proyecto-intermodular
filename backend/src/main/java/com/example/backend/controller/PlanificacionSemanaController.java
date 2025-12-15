package com.example.backend.controller;

import com.example.backend.dto.PlanificacionSemanaCreateRequest;
import com.example.backend.dto.PlanificacionSemanaResponse;
import com.example.backend.service.PlanificacionSemanaService;
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
 * Controlador REST para la gestión de Planificaciones Semanales (anidado en Usuario).
 * Rutas base: /api/usuarios/{usuarioId}/planificaciones
 */
@RestController
@RequestMapping("/api/usuarios/{usuarioId}/planificaciones")
@RequiredArgsConstructor
public class PlanificacionSemanaController {

    private final PlanificacionSemanaService planificacionSemanaService;

    /**
     * Crea una nueva planificación semanal.
     * POST /api/usuarios/{usuarioId}/planificaciones
     *
     * @param usuarioId id del usuario
     * @param request datos de la planificación
     * @return 201 Created con la planificación creada
     */
    @PostMapping
    public ResponseEntity<PlanificacionSemanaResponse> crear(
            @PathVariable Long usuarioId,
            @Valid @RequestBody PlanificacionSemanaCreateRequest request) {
        PlanificacionSemanaResponse response = planificacionSemanaService.crear(usuarioId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * Obtiene la planificación más reciente del usuario.
     * GET /api/usuarios/{usuarioId}/planificaciones/reciente
     *
     * @param usuarioId id del usuario
     * @return 200 OK con la planificación más reciente
     */
    @GetMapping("/reciente")
    public ResponseEntity<PlanificacionSemanaResponse> obtenerMasReciente(@PathVariable Long usuarioId) {
        PlanificacionSemanaResponse response = planificacionSemanaService.obtenerMasReciente(usuarioId);
        return ResponseEntity.ok(response);
    }

    /**
     * Obtiene una planificación por ID.
     * GET /api/usuarios/{usuarioId}/planificaciones/{planificacionId}
     *
     * @param usuarioId id del usuario
     * @param planificacionId id de la planificación
     * @return 200 OK con la planificación
     */
    @GetMapping("/{planificacionId}")
    public ResponseEntity<PlanificacionSemanaResponse> obtenerPorId(
            @PathVariable Long usuarioId,
            @PathVariable Long planificacionId) {
        PlanificacionSemanaResponse response = planificacionSemanaService.obtenerPorId(usuarioId, planificacionId);
        return ResponseEntity.ok(response);
    }

    /**
     * Lista todas las planificaciones del usuario con paginación opcional.
     * GET /api/usuarios/{usuarioId}/planificaciones?page=0&size=10
     *
     * @param usuarioId id del usuario
     * @param page número de página (opcional)
     * @param size tamaño de página (opcional)
     * @return 200 OK con página de planificaciones o lista completa
     */
    @GetMapping
    public ResponseEntity<?> obtenerDelUsuario(
            @PathVariable Long usuarioId,
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer size) {
        if (page != null && size != null) {
            Pageable pageable = PageRequest.of(page, size);
            Page<PlanificacionSemanaResponse> planificaciones = planificacionSemanaService.obtenerDelUsuario(usuarioId, pageable);
            return ResponseEntity.ok(planificaciones);
        } else {
            List<PlanificacionSemanaResponse> planificaciones = planificacionSemanaService.obtenerDelUsuario(usuarioId);
            return ResponseEntity.ok(planificaciones);
        }
    }
}

