package com.example.backend.service;

import com.example.backend.dto.RecetaUsuarioCreateRequest;
import com.example.backend.dto.RecetaUsuarioResponse;
import com.example.backend.dto.RecetaResponse;
import com.example.backend.model.RecetaUsuario;
import com.example.backend.model.Usuario;
import com.example.backend.model.Receta;
import com.example.backend.repository.RecetaUsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Servicio para la lógica de negocio de la relación RecetaUsuario.
 * Maneja recetas guardadas (favoritas o propias) por usuario.
 */
@Service
@RequiredArgsConstructor
@Transactional
public class RecetaUsuarioService {

    private final RecetaUsuarioRepository recetaUsuarioRepository;
    private final UsuarioService usuarioService;
    private final RecetaService recetaService;

    /**
     * Guarda una receta para un usuario (como favorita o propia).
     *
     * @param usuarioId id del usuario
     * @param recetaId id de la receta
     * @param request tipo de guardado (FAVORITA o PROPIA)
     * @return respuesta con la relación creada
     * @throws IllegalArgumentException si ya está guardada
     */
    public RecetaUsuarioResponse guardarReceta(Long usuarioId, Long recetaId, RecetaUsuarioCreateRequest request) {
        Usuario usuario = usuarioService.obtenerUsuarioCompleto(usuarioId);
        Receta receta = recetaService.obtenerRecetaCompleta(recetaId);

        if (recetaUsuarioRepository.existsByUsuarioIdAndRecetaId(usuarioId, recetaId)) {
            throw new IllegalArgumentException("El usuario ya tiene guardada esta receta");
        }

        RecetaUsuario recetaUsuario = RecetaUsuario.builder()
                .usuario(usuario)
                .receta(receta)
                .tipo(RecetaUsuario.TipoRecetaUsuario.valueOf(request.getTipo()))
                .fechaGuardado(LocalDateTime.now())
                .visibilidad(request.getVisibilidad())
                .build();

        RecetaUsuario saved = recetaUsuarioRepository.save(recetaUsuario);
        return mapToResponse(saved);
    }

    /**
     * Obtiene todas las recetas guardadas por un usuario.
     *
     * @param usuarioId id del usuario
     * @return lista de recetas guardadas
     */
    public List<RecetaUsuarioResponse> obtenerRecetasGuardadas(Long usuarioId) {
        usuarioService.obtenerUsuarioCompleto(usuarioId); // Validar que existe
        return recetaUsuarioRepository.findByUsuarioId(usuarioId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    /**
     * Obtiene todas las recetas favoritas de un usuario.
     *
     * @param usuarioId id del usuario
     * @return lista de recetas favoritas
     */
    public List<RecetaUsuarioResponse> obtenerFavoritas(Long usuarioId) {
        usuarioService.obtenerUsuarioCompleto(usuarioId); // Validar que existe
        return recetaUsuarioRepository.findFavoritasByUsuarioId(usuarioId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    /**
     * Obtiene todas las recetas propias de un usuario.
     *
     * @param usuarioId id del usuario
     * @return lista de recetas propias
     */
    public List<RecetaUsuarioResponse> obtenerPropias(Long usuarioId) {
        usuarioService.obtenerUsuarioCompleto(usuarioId); // Validar que existe
        return recetaUsuarioRepository.findPropiasByUsuarioId(usuarioId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    /**
     * Cuenta cuántas recetas ha guardado un usuario.
     *
     * @param usuarioId id del usuario
     * @return número de recetas guardadas
     */
    public long contarRecetasGuardadas(Long usuarioId) {
        usuarioService.obtenerUsuarioCompleto(usuarioId); // Validar que existe
        return recetaUsuarioRepository.countByUsuarioId(usuarioId);
    }

    /**
     * Cuenta cuántas recetas favoritas tiene un usuario.
     *
     * @param usuarioId id del usuario
     * @return número de favoritas
     */
    public long contarFavoritas(Long usuarioId) {
        usuarioService.obtenerUsuarioCompleto(usuarioId); // Validar que existe
        return recetaUsuarioRepository.countFavoritasByUsuarioId(usuarioId);
    }

    /**
     * Obtiene la popularidad de una receta (cuántos usuarios la tienen guardada).
     *
     * @param recetaId id de la receta
     * @return número de usuarios que la guardaron
     */
    public long obtenerPopularidad(Long recetaId) {
        recetaService.obtenerRecetaCompleta(recetaId); // Validar que existe
        return recetaUsuarioRepository.countUsuariosByRecetaId(recetaId);
    }

    /**
     * Elimina una receta guardada de un usuario.
     *
     * @param usuarioId id del usuario
     * @param recetaId id de la receta
     * @throws IllegalArgumentException si no está guardada
     */
    public void desguardar(Long usuarioId, Long recetaId) {
        RecetaUsuario recetaUsuario = recetaUsuarioRepository.findByUsuarioIdAndRecetaId(usuarioId, recetaId)
                .orElseThrow(() -> new IllegalArgumentException("La receta no está guardada por este usuario"));
        recetaUsuarioRepository.delete(recetaUsuario);
    }

    /**
     * Verifica si un usuario tiene guardada una receta.
     *
     * @param usuarioId id del usuario
     * @param recetaId id de la receta
     * @return true si está guardada, false en caso contrario
     */
    public boolean estaGuardada(Long usuarioId, Long recetaId) {
        return recetaUsuarioRepository.existsByUsuarioIdAndRecetaId(usuarioId, recetaId);
    }

    /**
     * Mapea una entidad RecetaUsuario a un DTO Response.
     *
     * @param recetaUsuario entidad RecetaUsuario
     * @return DTO Response
     */
    private RecetaUsuarioResponse mapToResponse(RecetaUsuario recetaUsuario) {
        RecetaResponse recetaResponse = RecetaResponse.builder()
                .id(recetaUsuario.getReceta().getId())
                .nombre(recetaUsuario.getReceta().getNombre())
                .descripcion(recetaUsuario.getReceta().getDescripcion())
                .instrucciones(recetaUsuario.getReceta().getInstrucciones())
                .tiempoPreparacion(recetaUsuario.getReceta().getTiempoPreparacion())
                .porciones(recetaUsuario.getReceta().getPorciones())
                .fechaCreacion(recetaUsuario.getReceta().getFechaCreacion())
                .build();

        return RecetaUsuarioResponse.builder()
                .id(recetaUsuario.getId())
                .receta(recetaResponse)
                .tipo(recetaUsuario.getTipo().name())
                .fechaGuardado(recetaUsuario.getFechaGuardado())
                .visibilidad(recetaUsuario.getVisibilidad())
                .build();
    }
}

