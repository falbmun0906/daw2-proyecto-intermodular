package com.example.backend.dto;

import lombok.*;

/**
 * DTO para obtener información de un Ingrediente.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class IngredienteResponse {

    private Long id;
    private String nombre;
    private String categoria;
    private String unidadDefecto;
    private Integer caloriasPorUnidad;
    private String imagenUrl;
}

