package com.example.backend.dto;

import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDate;

/**
 * DTO para actualizar un DespensaItem (cantidad, caducidad, estado).
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DespensaItemUpdateRequest {

    @Positive(message = "La cantidad debe ser mayor a 0")
    private Float cantidadActual;

    private String unidad;

    private LocalDate fechaCaducidad;

    private String ubicacion;

    private String estado;
}

