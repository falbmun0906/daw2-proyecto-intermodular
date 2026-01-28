package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CompartirListaResponse {
    private String plataforma;
    private String url;
    private String mensaje;
    private Boolean exito;
}
