package com.example.backend.dto;

import lombok.*;

import java.time.LocalDate;

/**
 * DTO para obtener información de una PlanificacionDia.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlanificacionDiaResponse {

    private Long id;
    private LocalDate fecha;
    private String tipoComida;
    private RecetaResponse receta;
    private String notas;
}

