package com.example.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

/**
 * Entidad PLANIFICACION_SEMANA.
 * Agrupa la planificación de comidas de un usuario para una semana completa.
 */
@Entity
@Table(name = "planificacion_semana")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlanificacionSemana {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "El usuario es obligatorio")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @NotNull(message = "La fecha de inicio es obligatoria")
    @Column(nullable = false)
    private LocalDate fechaInicio;

    @NotBlank(message = "La etiqueta es obligatoria")
    @Column(nullable = false)
    private String etiqueta;

    @Column(nullable = false)
    private LocalDateTime fechaCreacion;

    // ==================== RELACIONES ====================

    @OneToMany(mappedBy = "planificacionSemana", cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private List<PlanificacionDia> dias = new ArrayList<>();
}

