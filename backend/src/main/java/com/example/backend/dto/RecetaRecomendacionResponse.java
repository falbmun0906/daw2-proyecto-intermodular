package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecetaRecomendacionResponse {
    private Long id;
    private String nombre;
    private String descripcion;
    private String imagenUrl;
    private Integer tiempoPreparacion;
    private Integer porciones;
    private String dificultad;
    private Integer porcentajeCoincidencia;
    private List<String> ingredientesFaltantes;
    private List<String> ingredientesDisponibles;
}
