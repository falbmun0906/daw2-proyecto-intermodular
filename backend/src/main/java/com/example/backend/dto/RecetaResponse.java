package com.example.backend.dto;

import lombok.*;

import java.time.LocalDateTime;
import java.util.Set;

/**
 * DTO para obtener información de una Receta.
 * Incluye datos básicos sin ingredientes (se obtienen en endpoint separado).
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecetaResponse {

    private Long id;
    private String nombre;
    private String descripcion;
    private String imagenUrlSmall;   // nombre_receta-small.webp
    private String imagenUrlMedium;  // nombre_receta-medium.webp
    private String imagenUrlLarge;   // nombre_receta-large.webp
    private Integer tiempoPreparacion;
    private Integer porciones;
    private String dificultad;
    private LocalDateTime fechaCreacion;
    private Set<String> etiquetas;
}
