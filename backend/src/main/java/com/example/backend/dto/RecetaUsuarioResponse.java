package com.example.backend.dto;

import lombok.*;

import java.time.LocalDateTime;

/**
 * DTO para obtener información de un RecetaUsuario.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecetaUsuarioResponse {

    private Long id;
    private RecetaResponse receta;
    private String tipo;
    private LocalDateTime fechaGuardado;
    private String visibilidad;
}

