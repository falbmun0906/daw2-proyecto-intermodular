package com.example.backend.service;

import com.example.backend.dto.SugerenciaCreateRequest;
import com.example.backend.model.Sugerencia;
import com.example.backend.model.Usuario;
import com.example.backend.repository.SugerenciaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

/**
 * Servicio para gestionar sugerencias de usuarios.
 */
@Service
@RequiredArgsConstructor
public class SugerenciaService {
    private final SugerenciaRepository sugerenciaRepository;
    private final UsuarioService usuarioService;

    /**
     * Crea una sugerencia de usuario.
     */
    @Transactional
    public Sugerencia crearSugerencia(String email, SugerenciaCreateRequest request) {
        Usuario u = usuarioService.obtenerUsuarioCompletoPorEmail(email);

        Sugerencia s = Sugerencia.builder()
                .usuario(u)
                .asunto(request.getAsunto()) // o setTitulo
                .descripcion(request.getMensaje())
                .fechaDeCreacion(LocalDate.now())
                .build();
        return sugerenciaRepository.save(s);
    }
}