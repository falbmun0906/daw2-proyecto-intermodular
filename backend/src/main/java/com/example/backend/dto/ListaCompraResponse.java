package com.example.backend.dto;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

/**
 * DTO para obtener información de una ListaCompra.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ListaCompraResponse {

    private Long id;
    private LocalDateTime fechaGenerada;
    private String origen;
    private String estado;
    private String textoWhatsappGenerado;
    private List<ListaItemResponse> items;
}

