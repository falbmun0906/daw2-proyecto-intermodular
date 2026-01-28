package com.example.backend.service;

import com.example.backend.dto.DespensaItemCreateRequest;
import com.example.backend.dto.DespensaItemResponse;
import com.example.backend.dto.DespensaItemUpdateRequest;
import com.example.backend.model.DespensaItem;
import com.example.backend.model.Usuario;
import com.example.backend.repository.DespensaItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Servicio para la lógica de negocio de la Despensa del usuario.
 * Maneja productos almacenados, caducidad y ubicaciones.
 */
@Service
@RequiredArgsConstructor
@Transactional
public class DespensaItemService {

    private final DespensaItemRepository despensaItemRepository;
    private final UsuarioService usuarioService;
    private final IngredienteService ingredienteService;

    /**
     * Agrega un ingrediente a la despensa del usuario.
     *
     * @param usuarioId id del usuario
     * @param request datos del item (ingrediente, cantidad, ubicación, etc.)
     * @return respuesta con el item creado
     * @throws IllegalArgumentException si ya existe en la despensa
     */
    public DespensaItemResponse agregarADespensa(Long usuarioId, DespensaItemCreateRequest request) {
        Usuario usuario = usuarioService.obtenerUsuarioCompleto(usuarioId);
        var ingrediente = ingredienteService.obtenerIngredienteCompleto(request.getIngredienteId());

        if (despensaItemRepository.existsByUsuarioIdAndIngredienteId(usuarioId, request.getIngredienteId())) {
            throw new IllegalArgumentException("El ingrediente ya existe en la despensa del usuario");
        }

        DespensaItem item = DespensaItem.builder()
                .usuario(usuario)
                .ingrediente(ingrediente)
                .cantidadActual(request.getCantidadActual())
                .unidad(request.getUnidad())
                .fechaCaducidad(request.getFechaCaducidad())
                .ubicacion(DespensaItem.UbicacionDespensa.valueOf(request.getUbicacion()))
                .estado(determinarEstado(request.getFechaCaducidad()))
                .build();

        DespensaItem saved = despensaItemRepository.save(item);
        return mapToResponse(saved);
    }

    /**
     * Obtiene todos los items de la despensa del usuario.
     *
     * @param usuarioId id del usuario
     * @return lista de items
     */
    public List<DespensaItemResponse> obtenerDespensa(Long usuarioId) {
        usuarioService.obtenerUsuarioCompleto(usuarioId); // Validar
        return despensaItemRepository.findByUsuarioId(usuarioId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    /**
     * Obtiene items de la despensa con paginación.
     *
     * @param usuarioId id del usuario
     * @param pageable parámetros de paginación
     * @return página de items
     */
    public Page<DespensaItemResponse> obtenerDespensa(Long usuarioId, Pageable pageable) {
        usuarioService.obtenerUsuarioCompleto(usuarioId); // Validar
        return despensaItemRepository.findByUsuarioId(usuarioId, pageable)
                .map(this::mapToResponse);
    }

    /**
     * Obtiene los productos caducados de la despensa.
     *
     * @param usuarioId id del usuario
     * @return lista de productos caducados
     */
    public List<DespensaItemResponse> obtenerCaducados(Long usuarioId) {
        usuarioService.obtenerUsuarioCompleto(usuarioId); // Validar
        return despensaItemRepository.findCaducadosByUsuarioId(usuarioId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    /**
     * Obtiene los productos próximos a caducar.
     *
     * @param usuarioId id del usuario
     * @return lista de productos próximos a caducar
     */
    public List<DespensaItemResponse> obtenerProximoCaducar(Long usuarioId) {
        usuarioService.obtenerUsuarioCompleto(usuarioId); // Validar
        return despensaItemRepository.findProximoCaducarByUsuarioId(usuarioId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    /**
     * Obtiene productos en buen estado de la despensa.
     *
     * @param usuarioId id del usuario
     * @return lista de productos OK
     */
    public List<DespensaItemResponse> obtenerEnBuenEstado(Long usuarioId) {
        usuarioService.obtenerUsuarioCompleto(usuarioId); // Validar
        return despensaItemRepository.findOkByUsuarioId(usuarioId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    /**
     * Obtiene items por ubicación en la despensa.
     *
     * @param usuarioId id del usuario
     * @param ubicacion la ubicación (NEVERA, CONGELADOR, etc.)
     * @return lista de items en esa ubicación
     */
    public List<DespensaItemResponse> obtenerPorUbicacion(Long usuarioId, String ubicacion) {
        usuarioService.obtenerUsuarioCompleto(usuarioId); // Validar
        return despensaItemRepository.findByUsuarioIdAndUbicacion(usuarioId, ubicacion)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    /**
     * Busca items por nombre de ingrediente en la despensa.
     *
     * @param usuarioId id del usuario
     * @param nombre parte del nombre a buscar
     * @return lista de items encontrados
     */
    public List<DespensaItemResponse> buscarPorNombre(Long usuarioId, String nombre) {
        usuarioService.obtenerUsuarioCompleto(usuarioId); // Validar
        return despensaItemRepository.findByUsuarioIdAndIngredienteNombre(usuarioId, nombre)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    /**
     * Actualiza un item de la despensa.
     *
     * @param usuarioId id del usuario
     * @param itemId id del item
     * @param request datos a actualizar
     * @return respuesta con el item actualizado
     */
    public DespensaItemResponse actualizar(Long usuarioId, Long itemId, DespensaItemUpdateRequest request) {
        DespensaItem item = obtenerItemCompleto(usuarioId, itemId);

        if (request.getCantidadActual() != null) {
            item.setCantidadActual(request.getCantidadActual());
        }
        if (request.getUnidad() != null) {
            item.setUnidad(request.getUnidad());
        }
        if (request.getFechaCaducidad() != null) {
            item.setFechaCaducidad(request.getFechaCaducidad());
            item.setEstado(determinarEstado(request.getFechaCaducidad()));
        }
        if (request.getUbicacion() != null) {
            item.setUbicacion(DespensaItem.UbicacionDespensa.valueOf(request.getUbicacion()));
        }
        if (request.getEstado() != null) {
            item.setEstado(DespensaItem.EstadoDespensaItem.valueOf(request.getEstado()));
        }

        DespensaItem saved = despensaItemRepository.save(item);
        return mapToResponse(saved);
    }

    /**
     * Elimina un item de la despensa.
     *
     * @param usuarioId id del usuario
     * @param itemId id del item
     */
    public void eliminar(Long usuarioId, Long itemId) {
        DespensaItem item = obtenerItemCompleto(usuarioId, itemId);
        despensaItemRepository.delete(item);
    }

    /**
     * Obtiene el item completo (validando que pertenece al usuario).
     *
     * @param usuarioId id del usuario
     * @param itemId id del item
     * @return entidad DespensaItem
     * @throws IllegalArgumentException si no existe o no pertenece al usuario
     */
    private DespensaItem obtenerItemCompleto(Long usuarioId, Long itemId) {
        usuarioService.obtenerUsuarioCompleto(usuarioId); // Validar usuario
        DespensaItem item = despensaItemRepository.findById(itemId)
                .orElseThrow(() -> new IllegalArgumentException("Item no encontrado"));
        if (!item.getUsuario().getId().equals(usuarioId)) {
            throw new IllegalArgumentException("El item no pertenece a este usuario");
        }
        return item;
    }

    /**
     * Determina el estado de un item según su fecha de caducidad.
     *
     * @param fechaCaducidad fecha de caducidad
     * @return estado (OK, PROXIMO_A_CADUCAR, CADUCADO)
     */
    private DespensaItem.EstadoDespensaItem determinarEstado(LocalDate fechaCaducidad) {
        if (fechaCaducidad == null) {
            return DespensaItem.EstadoDespensaItem.OK;
        }

        LocalDate hoy = LocalDate.now();
        if (fechaCaducidad.isBefore(hoy)) {
            return DespensaItem.EstadoDespensaItem.CADUCADO;
        } else if (fechaCaducidad.minusDays(3).isBefore(hoy)) {
            return DespensaItem.EstadoDespensaItem.PROXIMO_A_CADUCAR;
        }
        return DespensaItem.EstadoDespensaItem.OK;
    }

    /**
     * Mapea una entidad DespensaItem a un DTO Response.
     *
     * @param item entidad DespensaItem
     * @return DTO Response
     */
    private DespensaItemResponse mapToResponse(DespensaItem item) {
        var ingredienteResponse = com.example.backend.dto.IngredienteResponse.builder()
                .id(item.getIngrediente().getId())
                .nombre(item.getIngrediente().getNombre())
                .categoria(item.getIngrediente().getCategoria())
                .unidadDefecto(item.getIngrediente().getUnidadDefecto())
                .caloriasPorUnidad(item.getIngrediente().getCaloriasPorUnidad())
                .imagenUrl(item.getIngrediente().getImagenUrl())
                .build();

        // Calcular días restantes hasta caducidad
        Long diasRestantes = null;
        if (item.getFechaCaducidad() != null) {
            diasRestantes = java.time.temporal.ChronoUnit.DAYS.between(
                LocalDate.now(),
                item.getFechaCaducidad()
            );
        }

        return DespensaItemResponse.builder()
                .id(item.getId())
                .ingrediente(ingredienteResponse)
                .cantidadActual(item.getCantidadActual())
                .unidad(item.getUnidad())
                .fechaCaducidad(item.getFechaCaducidad())
                .diasRestantes(diasRestantes)
                .ubicacion(item.getUbicacion().name())
                .estado(item.getEstado().name())
                .build();
    }
}

