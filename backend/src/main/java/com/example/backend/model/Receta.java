package com.example.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.*;

/**
 * Entidad RECETA.
 * Representa una receta con sus atributos e ingredientes.
 */
@Entity
@Table(name = "receta")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Receta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El nombre de la receta es obligatorio")
    @Size(min = 3, max = 255, message = "El nombre debe tener entre 3 y 255 caracteres")
    @Column(nullable = false)
    private String nombre;

    @Size(max = 1000, message = "La descripción no puede exceder 1000 caracteres")
    private String descripcion;

    @NotBlank(message = "Las instrucciones son obligatorias")
    @Column(nullable = false, columnDefinition = "LONGTEXT")
    private String instrucciones;

    @NotNull(message = "El tiempo de preparación es obligatorio")
    @Min(value = 1, message = "El tiempo debe ser mayor a 0")
    @Column(nullable = false)
    private Integer tiempoPreparacion; // en minutos

    @NotNull(message = "Las porciones son obligatorias")
    @Min(value = 1, message = "Las porciones deben ser mayor a 0")
    @Column(nullable = false)
    private Integer porciones;

    @Column(nullable = false)
    private LocalDateTime fechaCreacion;

    // ==================== RELACIONES ====================

    @OneToMany(mappedBy = "receta", cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private List<RecetaIngrediente> ingredientes = new ArrayList<>();

    @OneToMany(mappedBy = "receta", cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private List<RecetaUsuario> usuariosQueGuardan = new ArrayList<>();

    @OneToMany(mappedBy = "receta", cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private List<PlanificacionDia> planificacionesDia = new ArrayList<>();
}

