package com.example.backend.model;

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
    private Long id;

    @NotBlank(message = "El nombre del ingrediente es obligatorio")
    @Size(min = 2, max = 100, message = "El nombre debe tener entre 2 y 100 caracteres")
    @Column(nullable = false)
    private String nombre;

    @Size(max = 100, message = "La categoría no puede exceder 100 caracteres")
    private String categoria;

    @NotBlank(message = "La unidad por defecto es obligatoria")
    @Column(nullable = false)
    private String unidadDefecto; // kg, l, unidades, etc.

    @Min(value = 0, message = "Las calorías no pueden ser negativas")
    private Integer caloriasPorUnidad;

    // ==================== RELACIONES ====================

    @OneToMany(mappedBy = "ingrediente", cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private List<RecetaIngrediente> recetas = new ArrayList<>();

    @OneToMany(mappedBy = "ingrediente", cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private List<DespensaItem> despensaItems = new ArrayList<>();

    @OneToMany(mappedBy = "ingrediente", cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private List<ListaItem> listaItems = new ArrayList<>();
}

