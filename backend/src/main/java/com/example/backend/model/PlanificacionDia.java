package com.example.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDate;

/**
 * Entidad PLANIFICACION_DIA.
 * Representa una comida planificada para un día específico.
 * Pertenece a una PLANIFICACION_SEMANA y puede tener una RECETA asignada.
 */
@Entity
@Table(name = "planificacion_dia")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlanificacionDia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "La planificación de semana es obligatoria")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "planificacion_semana_id", nullable = false)
    private PlanificacionSemana planificacionSemana;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "receta_id")
    private Receta receta;

    @NotNull(message = "La fecha es obligatoria")
    @Column(nullable = false)
    private LocalDate fecha;

    @NotNull(message = "El tipo de comida es obligatorio")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoComida tipoComida;

    @Size(max = 500, message = "Las notas no pueden exceder 500 caracteres")
    private String notas;

    /**
     * Enumeración de tipos de comidas.
     */
    public enum TipoComida {
        DESAYUNO,
        ALMUERZO,
        COMIDA,
        MERIENDA,
        CENA
    }
}

