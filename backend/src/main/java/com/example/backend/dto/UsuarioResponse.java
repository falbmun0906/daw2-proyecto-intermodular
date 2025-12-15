package com.example.backend.dto;

import lombok.*;

import java.time.LocalDateTime;

/**
 * DTO para obtener información de un Usuario.
 * No expone el password hasheado.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UsuarioResponse {

    private Long id;
    private String email;
    private String rol;
    private LocalDateTime fechaRegistro;
}

