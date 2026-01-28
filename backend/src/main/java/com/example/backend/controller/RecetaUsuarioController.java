package com.example.backend.controller;

import com.example.backend.dto.RecetaUsuarioCreateRequest;
import com.example.backend.dto.RecetaUsuarioResponse;
import com.example.backend.service.RecetaUsuarioService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controlador REST para la relación RecetaUsuario (anidado en Usuario).
 * Rutas base: /api/usuarios/{usuarioId}/recetas
 */
@RestController
@RequestMapping("/api/usuarios/{usuarioId}/recetas")
@RequiredArgsConstructor
public class RecetaUsuarioController {

    private final RecetaUsuarioService recetaUsuarioService;

    /**
     * Guarda una receta para un usuario (favorita o propia).
     * POST /api/usuarios/{usuarioId}/recetas/{recetaId}
     *
     * @param usuarioId id del usuario
     * @param recetaId id de la receta
     * @param request tipo de guardado (FAVORITA o PROPIA)
     * @return 201 Created con la relación creada
     */
    @PostMapping("/{recetaId}")
    public ResponseEntity<RecetaUsuarioResponse> guardarReceta(
            @PathVariable Long usuarioId,
            @PathVariable Long recetaId,
            @Valid @RequestBody RecetaUsuarioCreateRequest request) {
        RecetaUsuarioResponse response = recetaUsuarioService.guardarReceta(usuarioId, recetaId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * Obtiene todas las recetas guardadas por un usuario.
     * GET /api/usuarios/{usuarioId}/recetas
     *
     * @param usuarioId id del usuario
     * @return 200 OK con lista de recetas guardadas
     */
    @GetMapping
    public ResponseEntity<List<RecetaUsuarioResponse>> obtenerRecetasGuardadas(@PathVariable Long usuarioId) {
        List<RecetaUsuarioResponse> recetas = recetaUsuarioService.obtenerRecetasGuardadas(usuarioId);
        return ResponseEntity.ok(recetas);
    }

    /**
     * Obtiene solo las recetas favoritas de un usuario.
     * GET /api/usuarios/{usuarioId}/recetas/favoritas
     *
     * @param usuarioId id del usuario
     * @return 200 OK con lista de favoritas
     */
    @GetMapping("/favoritas")
    public ResponseEntity<List<RecetaUsuarioResponse>> obtenerFavoritas(@PathVariable Long usuarioId) {
        List<RecetaUsuarioResponse> recetas = recetaUsuarioService.obtenerFavoritas(usuarioId);
        return ResponseEntity.ok(recetas);
    }

    /**
     * Obtiene solo las recetas propias de un usuario.
     * GET /api/usuarios/{usuarioId}/recetas/propias
     *
     * @param usuarioId id del usuario
     * @return 200 OK con lista de recetas propias
     */
    @GetMapping("/propias")
    public ResponseEntity<List<RecetaUsuarioResponse>> obtenerPropias(@PathVariable Long usuarioId) {
        List<RecetaUsuarioResponse> recetas = recetaUsuarioService.obtenerPropias(usuarioId);
        return ResponseEntity.ok(recetas);
    }

    /**
     * Cuenta las recetas guardadas por un usuario.
     * GET /api/usuarios/{usuarioId}/recetas/count
     *
     * @param usuarioId id del usuario
     * @return 200 OK con el total
     */
    @GetMapping("/count")
    public ResponseEntity<Long> contarRecetas(@PathVariable Long usuarioId) {
        long total = recetaUsuarioService.contarRecetasGuardadas(usuarioId);
        return ResponseEntity.ok(total);
    }

    /**
     * Elimina una receta guardada (desguardar).
     * DELETE /api/usuarios/{usuarioId}/recetas/{recetaId}
     *
     * @param usuarioId id del usuario
     * @param recetaId id de la receta
     * @return 204 No Content
     */
    @DeleteMapping("/{recetaId}")
    public ResponseEntity<Void> desguardar(
            @PathVariable Long usuarioId,
            @PathVariable Long recetaId) {
        recetaUsuarioService.desguardar(usuarioId, recetaId);
        return ResponseEntity.noContent().build();
    }

    /**
     * Verifica si un usuario tiene guardada una receta.
     * GET /api/usuarios/{usuarioId}/recetas/{recetaId}/guardada
     *
     * @param usuarioId id del usuario
     * @param recetaId id de la receta
     * @return 200 OK con boolean
     */
    @GetMapping("/{recetaId}/guardada")
    public ResponseEntity<Boolean> estaGuardada(
            @PathVariable Long usuarioId,
            @PathVariable Long recetaId) {
        boolean guardada = recetaUsuarioService.estaGuardada(usuarioId, recetaId);
        return ResponseEntity.ok(guardada);
    }
}

