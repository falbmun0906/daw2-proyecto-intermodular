package com.example.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

/**
 * Entidad RECETA_INGREDIENTE.
 * Tabla intermedia N:M entre RECETA e INGREDIENTE.
 * Almacena la cantidad y unidad de cada ingrediente en una receta específica.
 */
@Entity
@Table(name = "receta_ingrediente")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecetaIngrediente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "La receta es obligatoria")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "receta_id", nullable = false)
    private Receta receta;

    @NotNull(message = "El ingrediente es obligatorio")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ingrediente_id", nullable = false)
    private Ingrediente ingrediente;

    @NotNull(message = "La cantidad es obligatoria")
    @Positive(message = "La cantidad debe ser mayor a 0")
    @Column(nullable = false)
    private Float cantidad;

    @NotBlank(message = "La unidad es obligatoria")
    @Column(nullable = false)
    private String unidad;

    @Builder.Default
    private Boolean opcional = false;
}

