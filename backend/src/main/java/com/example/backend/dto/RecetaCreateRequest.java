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

    @Size(max = 500, message = "La URL de la imagen no puede exceder 500 caracteres")
    private String imagenUrl;

    @Size(max = 500, message = "Las etiquetas no pueden exceder 500 caracteres")
    private java.util.Set<String> etiquetas;

    @NotNull(message = "El tiempo de preparación es obligatorio")
    @Min(value = 1, message = "El tiempo debe ser mayor a 0")
    private Integer tiempoPreparacion; // en minutos

    @NotNull(message = "Las porciones son obligatorias")
    @Min(value = 1, message = "Las porciones deben ser mayor a 0")
    private Integer porciones;

    @NotBlank(message = "La dificultad es obligatoria")
    private String dificultad; // BAJA, MEDIA, ALTA
}
