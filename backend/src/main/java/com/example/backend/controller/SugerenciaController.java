package com.example.backend.controller;

import com.example.backend.dto.IngredienteResponse;
import com.example.backend.dto.SugerenciaCreateRequest;
import com.example.backend.dto.SugerenciaResponse;
import com.example.backend.model.Sugerencia;
import com.example.backend.service.SugerenciaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controlador REST para gestionar sugerencias.
 */
@RestController
@RequestMapping("/api/sugerencias")
@RequiredArgsConstructor
@Tag(name = "Sugerencias", description = "API para gestionar sugerencias de usuarios")
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

    /**
     * Lista todos las sugerencias con paginación opcional.
     * GET /api/sugerencias?page=0&size=10
     *
     * @param page número de página (opcional)
     * @param size tamaño de página (opcional)
     * @return 200 OK con página de sugerencias o lista completa
     */
    @GetMapping
    public ResponseEntity<?> obtenerTodos(
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer size) {
        if (page != null && size != null) {
            Pageable pageable = PageRequest.of(page, size);
            Page<SugerenciaResponse> sugerencias = sugerenciaService.obtenerTodas(pageable);
            return ResponseEntity.ok(sugerencias);
        } else {
            List<SugerenciaResponse> sugerencias = sugerenciaService.obtenerTodas();
            return ResponseEntity.ok(sugerencias);
        }
    }
}
