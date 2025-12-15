package com.example.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDateTime;

/**
 * Entidad RECETA_USUARIO.
 * Tabla intermedia N:M entre USUARIO y RECETA.
 * Permite guardar recetas favoritas o propias con metadata.
 */
@Entity
@Table(name = "receta_usuario")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecetaUsuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "El usuario es obligatorio")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @NotNull(message = "La receta es obligatoria")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "receta_id", nullable = false)
    private Receta receta;

    @NotNull(message = "El tipo es obligatorio")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoRecetaUsuario tipo;

    @Column(nullable = false)
    private LocalDateTime fechaGuardado;

    private String visibilidad;

    /**
     * Enumeración de tipos de relación receta-usuario.
     */
    public enum TipoRecetaUsuario {
        FAVORITA,
        PROPIA
    }
}

