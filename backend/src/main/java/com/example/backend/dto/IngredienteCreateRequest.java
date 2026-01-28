package com.example.backend.dto;

import jakarta.validation.constraints.*;
import lombok.*;

/**
 * DTO para crear un nuevo Ingrediente.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class IngredienteCreateRequest {

    @NotBlank(message = "El nombre del ingrediente es obligatorio")
    @Size(min = 2, max = 100, message = "El nombre debe tener entre 2 y 100 caracteres")
    private String nombre;

    @Size(max = 100, message = "La categoría no puede exceder 100 caracteres")
    private String categoria;

    @NotBlank(message = "La unidad por defecto es obligatoria")
    private String unidadDefecto;

    @Min(value = 0, message = "Las calorías no pueden ser negativas")
    private Integer caloriasPorUnidad;


    @Size(max = 500, message = "La URL de la imagen no puede exceder 500 caracteres")
    private String imagenUrl;
}

