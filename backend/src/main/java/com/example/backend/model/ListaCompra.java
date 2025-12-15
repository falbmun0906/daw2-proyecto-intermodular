package com.example.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.*;

/**
 * Entidad LISTA_COMPRA.
 * Genera listas de compra automáticamente a partir de la planificación semanal.
 */
@Entity
@Table(name = "lista_compra")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ListaCompra {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "El usuario es obligatorio")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @Column(nullable = false)
    private LocalDateTime fechaGenerada;

    @Size(max = 100, message = "El origen no puede exceder 100 caracteres")
    private String origen; // PLANIFICACION, MANUAL, etc.

    @NotNull(message = "El estado es obligatorio")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private EstadoListaCompra estado = EstadoListaCompra.PENDIENTE;

    @Column(columnDefinition = "LONGTEXT")
    private String textoWhatsappGenerado;

    // ==================== RELACIONES ====================

    @OneToMany(mappedBy = "listaCompra", cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private List<ListaItem> items = new ArrayList<>();

    /**
     * Enumeración de estados de la lista.
     */
    public enum EstadoListaCompra {
        PENDIENTE,
        COMPRADA
    }
}

