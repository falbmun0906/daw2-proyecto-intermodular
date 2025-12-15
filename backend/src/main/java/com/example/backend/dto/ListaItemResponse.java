package com.example.backend.dto;

import lombok.*;

/**
 * DTO para obtener información de un ListaItem.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ListaItemResponse {

    private Long id;
    private IngredienteResponse ingrediente;
    private Float cantidadNecesaria;
    private String unidad;
    private Boolean comprado;
}

