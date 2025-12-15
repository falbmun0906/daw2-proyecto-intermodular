package com.example.backend.dto;

import lombok.*;

/**
 * DTO para obtener información de una Receta con ingredientes.
 * Incluye la lista de RecetaIngredienteResponse.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecetaDetailedResponse {

    private Long id;
    private String nombre;
    private String descripcion;
    private String instrucciones;
    private Integer tiempoPreparacion;
    private Integer porciones;
    private java.time.LocalDateTime fechaCreacion;
    private java.util.List<RecetaIngredienteResponse> ingredientes;
}

