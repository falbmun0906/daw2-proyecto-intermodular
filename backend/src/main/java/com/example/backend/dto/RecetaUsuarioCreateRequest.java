package com.example.backend.dto;

import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDateTime;

/**
 * DTO para crear un RecetaUsuario (guardar una receta como favorita/propia).
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecetaUsuarioCreateRequest {

    @NotNull(message = "El tipo es obligatorio (FAVORITA o PROPIA)")
    private String tipo;

    private String visibilidad;
}

