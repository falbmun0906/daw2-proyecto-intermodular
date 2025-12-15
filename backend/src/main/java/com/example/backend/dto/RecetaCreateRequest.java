package com.example.backend.dto;

import jakarta.validation.constraints.*;
import lombok.*;

/**
 * DTO para crear una nueva Receta.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecetaCreateRequest {

    @NotBlank(message = "El nombre de la receta es obligatorio")
    @Size(min = 3, max = 255, message = "El nombre debe tener entre 3 y 255 caracteres")
    private String nombre;

    @Size(max = 1000, message = "La descripción no puede exceder 1000 caracteres")
    private String descripcion;

    @NotBlank(message = "Las instrucciones son obligatorias")
    private String instrucciones;

    @NotNull(message = "El tiempo de preparación es obligatorio")
    @Min(value = 1, message = "El tiempo debe ser mayor a 0")
    private Integer tiempoPreparacion; // en minutos

    @NotNull(message = "Las porciones son obligatorias")
    @Min(value = 1, message = "Las porciones deben ser mayor a 0")
    private Integer porciones;
}

