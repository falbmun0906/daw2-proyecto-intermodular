package com.example.backend.dto;

import jakarta.validation.constraints.*;
import lombok.*;

/**
 * DTO para crear un ListaItem (agregar ingrediente a una lista de compra).
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ListaItemCreateRequest {

    @NotNull(message = "El ID del ingrediente es obligatorio")
    private Long ingredienteId;

    @NotNull(message = "La cantidad es obligatoria")
    @Positive(message = "La cantidad debe ser mayor a 0")
    private Float cantidadNecesaria;

    @NotBlank(message = "La unidad es obligatoria")
    private String unidad;
}

