package com.example.backend.dto;

import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDate;

/**
 * DTO para crear un DespensaItem (agregar producto a la despensa).
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DespensaItemCreateRequest {

    @NotNull(message = "El ID del ingrediente es obligatorio")
    private Long ingredienteId;

    @NotNull(message = "La cantidad es obligatoria")
    @Positive(message = "La cantidad debe ser mayor a 0")
    private Float cantidadActual;

    @NotBlank(message = "La unidad es obligatoria")
    private String unidad;

    private LocalDate fechaCaducidad;

    @NotNull(message = "La ubicación es obligatoria")
    private String ubicacion;
}

