package com.example.backend.dto;

import lombok.*;

/**
 * DTO para obtener información de una Receta con ingredientes.
 * Incluye la lista de RecetaIngredienteResponse y pasos.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecetaDetailedResponse {

    private Long id;
    private String nombre;
    private String descripcion;
    private String imagenUrlSmall;   // nombre_receta-small.webp
    private String imagenUrlMedium;  // nombre_receta-medium.webp
    private String imagenUrlLarge;   // nombre_receta-large.webp
    private Integer tiempoPreparacion;
    private Integer porciones;
    private String dificultad;
    private java.time.LocalDateTime fechaCreacion;
    private java.util.List<RecetaIngredienteResponse> ingredientes;
    private java.util.List<RecetaPasoResponse> pasos;
    private java.util.Set<String> etiquetas;
}
