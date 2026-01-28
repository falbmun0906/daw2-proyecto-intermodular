package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NotificacionResponse {
    private Long id;
    private String tipo;
    private String titulo;
    private String mensaje;
    private LocalDateTime fechaCreacion;
    private Boolean leida;
    private Long despensaItemId;
    private String despensaItemNombre;
    private Long recetaId;
    private String recetaNombre;
}
