package com.example.backend.dto;

import lombok.*;

import java.time.LocalDate;

/**
 * DTO para obtener información de un DespensaItem.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DespensaItemResponse {

    private Long id;
    private IngredienteResponse ingrediente;
    private Float cantidadActual;
    private String unidad;
    private LocalDate fechaCaducidad;
    private String ubicacion;
    private String estado;
}

