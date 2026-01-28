package com.example.backend.model;

import io.swagger.v3.oas.annotations.media.Schema;
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
    @Schema(description = "Identificador único de la receta", example = "1")
    private Long id;

    @NotBlank(message = "El nombre de la receta es obligatorio")
    @Size(min = 3, max = 255, message = "El nombre debe tener entre 3 y 255 caracteres")
    @Column(nullable = false)
    @Schema(description = "Nombre de la receta", example = "Paella valenciana")
    private String nombre;

    @Size(max = 1000, message = "La descripción no puede exceder 1000 caracteres")
    @Column(columnDefinition = "TEXT")
    @Schema(description = "Descripción de la receta", example = "Deliciosa paella tradicional valenciana con arroz y azafrán")
    private String descripcion;

    @Size(max = 500, message = "La URL de la imagen no puede exceder 500 caracteres")
    @Schema(description = "URL de la imagen de la receta", example = "https://ejemplo.com/paella.jpg")
    private String imagenUrl;

    @NotNull(message = "El tiempo de preparación es obligatorio")
    @Min(value = 1, message = "El tiempo debe ser mayor a 0")
    @Column(nullable = false)
    @Schema(description = "Tiempo de preparación en minutos", example = "45")
    private Integer tiempoPreparacion; // en minutos

    @NotNull(message = "Las porciones son obligatorias")
    @Min(value = 1, message = "Las porciones deben ser mayor a 0")
    @Column(nullable = false)
    @Schema(description = "Número de porciones que rinde la receta", example = "4")
    private Integer porciones;

    @NotBlank(message = "La dificultad es obligatoria")
    @Column(nullable = false)
    @Schema(description = "Nivel de dificultad de la receta", example = "MEDIA", allowableValues = {"BAJA", "MEDIA", "ALTA"})
    private String dificultad; // BAJA, MEDIA, ALTA

    @Column(nullable = false)
    @Schema(description = "Fecha y hora de creación de la receta", example = "2026-01-28T10:30:00")
    private LocalDateTime fechaCreacion;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "receta_etiquetas", joinColumns = @JoinColumn(name = "receta_id"))
    @Column(name = "tipo_dieta")
    @Enumerated(EnumType.STRING)
    @Builder.Default
    @Schema(description = "Etiquetas de tipos de dieta asociadas a la receta", example = "[\"VEGANO\", \"SIN_GLUTEN\"]")
    private Set<TipoDieta> etiquetas = new HashSet<>();

    // ==================== RELACIONES ====================

    @OneToMany(mappedBy = "receta", cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @Builder.Default
    private List<RecetaPaso> pasos = new ArrayList<>();

    @OneToMany(mappedBy = "receta", cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @Builder.Default
    private List<RecetaIngrediente> ingredientes = new ArrayList<>();

    @OneToMany(mappedBy = "receta", cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @Builder.Default
    private List<RecetaUsuario> usuariosQueGuardan = new ArrayList<>();

    @OneToMany(mappedBy = "receta", cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @Builder.Default
    private List<PlanificacionDia> planificacionesDia = new ArrayList<>();
}
