package com.example.backend.dto;

import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDate;

/**
 * DTO para crear una PlanificacionSemana.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlanificacionSemanaCreateRequest {

    @NotNull(message = "La fecha de inicio es obligatoria")
    private LocalDate fechaInicio;

    @NotBlank(message = "La etiqueta es obligatoria")
    private String etiqueta;
}

