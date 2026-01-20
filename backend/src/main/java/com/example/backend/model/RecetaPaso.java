package com.example.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

/**
 * Entidad RECETA_PASO.
 * Representa un paso individual en la preparación de una receta.
 * Cada paso tiene un orden, descripción y tiempo estimado.
 */
@Entity
@Table(name = "receta_paso")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecetaPaso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "La receta es obligatoria")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "receta_id", nullable = false)
    private Receta receta;

    @NotNull(message = "El orden del paso es obligatorio")
    @Min(value = 1, message = "El orden debe ser mayor a 0")
    @Column(nullable = false)
    private Integer orden;

    @NotBlank(message = "La descripción del paso es obligatoria")
    @Size(min = 5, max = 1000, message = "La descripción debe tener entre 5 y 1000 caracteres")
    @Column(nullable = false, columnDefinition = "TEXT")
    private String descripcion;

    @Min(value = 1, message = "El tiempo debe ser mayor a 0")
    private Integer tiempoMinutos;
}

