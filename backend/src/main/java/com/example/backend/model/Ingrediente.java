package com.example.backend.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.util.*;

/**
 * Entidad INGREDIENTE.
 * Catálogo de ingredientes disponibles en el sistema.
 */
@Entity
@Table(name = "ingrediente")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Ingrediente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "Identificador único del ingrediente", example = "1")
    private Long id;

    @NotBlank(message = "El nombre del ingrediente es obligatorio")
    @Size(min = 2, max = 100, message = "El nombre debe tener entre 2 y 100 caracteres")
    @Column(nullable = false)
    @Schema(description = "Nombre del ingrediente", example = "Tomate")
    private String nombre;

    @Size(max = 100, message = "La categoría no puede exceder 100 caracteres")
    @Schema(description = "Categoría del ingrediente", example = "Verduras")
    private String categoria;

    @NotBlank(message = "La unidad por defecto es obligatoria")
    @Column(nullable = false)
    @Schema(description = "Unidad de medida por defecto", example = "kg")
    private String unidadDefecto; // kg, l, unidades, etc.

    @Min(value = 0, message = "Las calorías no pueden ser negativas")
    @Schema(description = "Calorías por unidad del ingrediente", example = "18")
    private Integer caloriasPorUnidad;

    @Size(max = 500, message = "La URL de la imagen no puede exceder 500 caracteres")
    @Schema(description = "URL de la imagen del ingrediente", example = "https://ejemplo.com/tomate.jpg")
    private String imagenUrl;

    // ==================== RELACIONES ====================

    @OneToMany(mappedBy = "ingrediente", cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @Builder.Default
    private List<RecetaIngrediente> recetas = new ArrayList<>();

    @OneToMany(mappedBy = "ingrediente", cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @Builder.Default
    private List<DespensaItem> despensaItems = new ArrayList<>();

    @OneToMany(mappedBy = "ingrediente", cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @Builder.Default
    private List<ListaItem> listaItems = new ArrayList<>();
}
