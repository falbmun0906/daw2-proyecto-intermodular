package com.example.backend.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDate;

/**
 * Entidad DESPENSA_ITEM.
 * Almacena los ingredientes que el usuario tiene actualmente en su despensa.
 * Incluye información de caducidad, ubicación y estado.
 */
@Entity
@Table(name = "despensa_item")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "Entidad que representa un ingrediente en la despensa de un usuario")
public class DespensaItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "El usuario es obligatorio")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @NotNull(message = "El ingrediente es obligatorio")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ingrediente_id", nullable = false)
    private Ingrediente ingrediente;

    @NotNull(message = "La cantidad actual es obligatoria")
    @Positive(message = "La cantidad debe ser mayor a 0")
    @Column(nullable = false)
    private Float cantidadActual;

    @NotBlank(message = "La unidad es obligatoria")
    @Column(nullable = false)
    private String unidad;

    private LocalDate fechaCaducidad;

    @NotNull(message = "La ubicación es obligatoria")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UbicacionDespensa ubicacion;

    @NotNull(message = "El estado es obligatorio")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private EstadoDespensaItem estado = EstadoDespensaItem.OK;

    /**
     * Enumeración de ubicaciones en la despensa.
     */
    public enum UbicacionDespensa {
        NEVERA,
        CONGELADOR,
        DESPENSA,
        MOSTRADOR
    }

    /**
     * Enumeración de estados del item.
     */
    public enum EstadoDespensaItem {
        OK,
        PROXIMO_A_CADUCAR,
        CADUCADO
    }
}

