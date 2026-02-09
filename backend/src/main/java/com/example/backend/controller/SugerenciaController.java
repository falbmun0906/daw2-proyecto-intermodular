package com.example.backend.controller;

import com.example.backend.dto.SugerenciaCreateRequest;
import com.example.backend.model.Sugerencia;
import com.example.backend.service.SugerenciaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

/**
 * Controlador REST para gestionar sugerencias.
 */
@RestController
@RequestMapping("/api/sugerencias")
@RequiredArgsConstructor
@Tag(name = "Notificaciones", description = "API para gestionar sugerencias de usuarios")
public class SugerenciaController {

    private final SugerenciaService sugerenciaService;

    @Operation(summary = "Crear una nueva sugerencia")
    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Sugerencia> crearSugerencia(@AuthenticationPrincipal UserDetails userDetails,
                                                      @RequestBody SugerenciaCreateRequest request) {
        String email = userDetails.getUsername(); // El username es el email del usuario
        Sugerencia nuevaSugerencia = sugerenciaService.crearSugerencia(email, request);
        return ResponseEntity.ok(nuevaSugerencia);
    }
}
