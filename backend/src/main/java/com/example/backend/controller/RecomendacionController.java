package com.example.backend.controller;

import com.example.backend.dto.RecetaRecomendacionResponse;
import com.example.backend.model.Usuario;
import com.example.backend.service.RecomendacionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controlador REST para gestionar recomendaciones de recetas.
 */
@RestController
@RequestMapping("/api/recomendaciones")
@RequiredArgsConstructor
@Tag(name = "Recomendaciones", description = "API para obtener recomendaciones de recetas basadas en ingredientes disponibles")
public class RecomendacionController {

    private final RecomendacionService recomendacionService;

    @GetMapping
    @Operation(summary = "Obtener recomendaciones de recetas basadas en los ingredientes disponibles en la despensa",
               description = "Devuelve una lista de recetas ordenadas por porcentaje de coincidencia con los ingredientes disponibles")
    public ResponseEntity<List<RecetaRecomendacionResponse>> obtenerRecomendaciones(
            @AuthenticationPrincipal UserDetails userDetails,
            @Parameter(description = "Porcentaje mínimo de coincidencia (por defecto 50%)")
            @RequestParam(required = false, defaultValue = "50") Integer porcentajeMinimo) {
        Usuario usuario = (Usuario) userDetails;
        List<RecetaRecomendacionResponse> recomendaciones =
            recomendacionService.obtenerRecomendaciones(usuario, porcentajeMinimo);
        return ResponseEntity.ok(recomendaciones);
    }

    @PostMapping("/generar-notificaciones")
    @Operation(summary = "Generar notificaciones de recomendaciones",
               description = "Crea notificaciones para las mejores recomendaciones (con 80% o más de coincidencia)")
    public ResponseEntity<Void> generarNotificacionesRecomendaciones(
            @AuthenticationPrincipal UserDetails userDetails) {
        Usuario usuario = (Usuario) userDetails;
        recomendacionService.generarNotificacionesRecomendaciones(usuario);
        return ResponseEntity.ok().build();
    }
}
