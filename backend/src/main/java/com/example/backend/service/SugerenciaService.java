package com.example.backend.service;

import com.example.backend.dto.IngredienteResponse;
import com.example.backend.dto.RecetaResponse;
import com.example.backend.dto.SugerenciaCreateRequest;
import com.example.backend.dto.SugerenciaResponse;
import com.example.backend.model.Receta;
import com.example.backend.model.Sugerencia;
import com.example.backend.model.Usuario;
import com.example.backend.repository.SugerenciaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

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

    /**
     * Mapea una entidad Sugerencia a un DTO Response básico.
     *
     * @param sugerencia entidad Sugerencia
     * @return DTO Response
     */
    private SugerenciaResponse mapToResponse(Sugerencia sugerencia) {
        return SugerenciaResponse.builder()
                .id(sugerencia.getId())
                .asunto(sugerencia.getAsunto())
                .descripcion(sugerencia.getDescripcion())
                .build();
    }

    /**
     * Obtiene todas las sugerencias.
     *
     * @param pageable parámetros de paginación
     * @return página de sugerencias
     */
    public Page<SugerenciaResponse> obtenerTodas(Pageable pageable) {
        return sugerenciaRepository.findAll(pageable)
                .map(this::mapToResponse);
    }

    public List<SugerenciaResponse> obtenerTodas() {
        return sugerenciaRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

}