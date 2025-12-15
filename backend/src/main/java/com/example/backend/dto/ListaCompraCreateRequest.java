package com.example.backend.dto;

import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDateTime;

/**
 * DTO para crear una ListaCompra.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ListaCompraCreateRequest {

    private String origen;

    private String textoWhatsappGenerado;
}

