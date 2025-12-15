package com.example.backend.dto;

import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDate;

/**
 * DTO para crear una PlanificacionDia.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlanificacionDiaCreateRequest {

    @NotNull(message = "La fecha es obligatoria")
    private LocalDate fecha;

    @NotBlank(message = "El tipo de comida es obligatorio")
    private String tipoComida;

    private Long recetaId;

    private String notas;
}

