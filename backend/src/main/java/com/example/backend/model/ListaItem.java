package com.example.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

/**
 * Entidad LISTA_ITEM.
 * Representa un item dentro de una lista de compra.
 * Contiene la cantidad necesaria de un ingrediente.
 */
@Entity
@Table(name = "lista_item")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ListaItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "La lista de compra es obligatoria")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lista_compra_id", nullable = false)
    private ListaCompra listaCompra;

    @NotNull(message = "El ingrediente es obligatorio")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ingrediente_id", nullable = false)
    private Ingrediente ingrediente;

    @NotNull(message = "La cantidad necesaria es obligatoria")
    @Positive(message = "La cantidad debe ser mayor a 0")
    @Column(nullable = false)
    private Float cantidadNecesaria;

    @NotBlank(message = "La unidad es obligatoria")
    @Column(nullable = false)
    private String unidad;

    @Builder.Default
    private Boolean comprado = false;
}

