package com.example.backend.dto;

import jakarta.validation.constraints.*;
import lombok.*;

/**
 * DTO para crear un RecetaIngrediente (agregar ingrediente a una receta).
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecetaIngredienteCreateRequest {

    @NotNull(message = "El ID del ingrediente es obligatorio")
    private Long ingredienteId;

    @NotNull(message = "La cantidad es obligatoria")
    @Positive(message = "La cantidad debe ser mayor a 0")
    private Float cantidad;

    @NotBlank(message = "La unidad es obligatoria")
    private String unidad;

    @Builder.Default
    private Boolean opcional = false;
}

