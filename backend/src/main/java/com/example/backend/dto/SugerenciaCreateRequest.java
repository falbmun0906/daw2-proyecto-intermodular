package com.example.backend.dto;

import jakarta.validation.constraints.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SugerenciaCreateRequest {
    @NotBlank private String asunto;
    @NotBlank private String mensaje;
}
