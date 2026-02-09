package com.example.backend.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "sugerencia")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Sugerencia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "Identificador único del ingrediente", example = "1")
    private Long id;

    @NotNull(message = "El usuario es obligatorio")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @NotBlank(message = "El asunto es obligatorio")
    @Column(nullable = false, columnDefinition = "TEXT")
    private String asunto;

    @NotBlank(message = "La descripción es obligatoria")
    @Column(nullable = false, columnDefinition = "TEXT")
    private String descripcion;

    @NotNull(message = "La fecha es obligatoria")
    @Column(nullable = false)
    private LocalDate fechaDeCreacion;
}