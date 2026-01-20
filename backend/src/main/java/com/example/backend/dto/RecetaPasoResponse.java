package com.example.backend.dto;

import lombok.*;

/**
 * DTO para obtener información de un paso de receta.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecetaPasoResponse {

    private Long id;
    private Integer orden;
    private String descripcion;
    private Integer tiempoMinutos;
}

