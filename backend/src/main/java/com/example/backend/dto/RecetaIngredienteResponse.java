package com.example.backend.dto;

import lombok.*;

/**
 * DTO para obtener información de un RecetaIngrediente.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecetaIngredienteResponse {

    private Long id;
    private IngredienteResponse ingrediente;
    private Float cantidad;
    private String unidad;
    private Boolean opcional;
}