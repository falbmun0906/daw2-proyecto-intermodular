package com.example.backend.controller;

import com.example.backend.dto.NotificacionResponse;
import com.example.backend.model.Usuario;
import com.example.backend.service.NotificacionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controlador REST para gestionar notificaciones.
 */
@RestController
@RequestMapping("/api/notificaciones")
@RequiredArgsConstructor
@Tag(name = "Notificaciones", description = "API para gestionar notificaciones de usuarios")
public class NotificacionController {

    private final NotificacionService notificacionService;

    @GetMapping
    @Operation(summary = "Obtener todas las notificaciones del usuario autenticado")
    public ResponseEntity<List<NotificacionResponse>> obtenerNotificaciones(
            @AuthenticationPrincipal UserDetails userDetails) {
        Usuario usuario = (Usuario) userDetails;
        List<NotificacionResponse> notificaciones = notificacionService.obtenerNotificaciones(usuario);
        return ResponseEntity.ok(notificaciones);
    }

    @GetMapping("/no-leidas")
    @Operation(summary = "Obtener notificaciones no leídas del usuario autenticado")
    public ResponseEntity<List<NotificacionResponse>> obtenerNotificacionesNoLeidas(
            @AuthenticationPrincipal UserDetails userDetails) {
        Usuario usuario = (Usuario) userDetails;
        List<NotificacionResponse> notificaciones = notificacionService.obtenerNotificacionesNoLeidas(usuario);
        return ResponseEntity.ok(notificaciones);
    }

    @GetMapping("/no-leidas/count")
    @Operation(summary = "Contar notificaciones no leídas del usuario autenticado")
    public ResponseEntity<Long> contarNotificacionesNoLeidas(
            @AuthenticationPrincipal UserDetails userDetails) {
        Usuario usuario = (Usuario) userDetails;
        Long count = notificacionService.contarNotificacionesNoLeidas(usuario);
        return ResponseEntity.ok(count);
    }

    @PutMapping("/{id}/marcar-leida")
    @Operation(summary = "Marcar una notificación como leída")
    public ResponseEntity<NotificacionResponse> marcarComoLeida(@PathVariable Long id) {
        NotificacionResponse notificacion = notificacionService.marcarComoLeida(id);
        return ResponseEntity.ok(notificacion);
    }

    @PutMapping("/marcar-todas-leidas")
    @Operation(summary = "Marcar todas las notificaciones como leídas")
    public ResponseEntity<Void> marcarTodasComoLeidas(
            @AuthenticationPrincipal UserDetails userDetails) {
        Usuario usuario = (Usuario) userDetails;
        notificacionService.marcarTodasComoLeidas(usuario);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar una notificación")
    public ResponseEntity<Void> eliminarNotificacion(@PathVariable Long id) {
        notificacionService.eliminarNotificacion(id);
        return ResponseEntity.noContent().build();
    }
}
