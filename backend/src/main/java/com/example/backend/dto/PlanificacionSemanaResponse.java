package com.example.backend.dto;

import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

/**
 * DTO para obtener información de una PlanificacionSemana.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlanificacionSemanaResponse {

    private Long id;
    private LocalDate fechaInicio;
    private String etiqueta;
    private LocalDateTime fechaCreacion;
    private List<PlanificacionDiaResponse> dias;
}

