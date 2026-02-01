package com.example.backend.service;

import com.example.backend.dto.ListaCompraCreateRequest;
import com.example.backend.dto.ListaCompraResponse;
import com.example.backend.dto.ListaItemResponse;
import com.example.backend.model.ListaCompra;
import com.example.backend.model.Usuario;
import com.example.backend.repository.ListaCompraRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Servicio para la lógica de negocio de Listas de Compra.
 */
@Service
@RequiredArgsConstructor
@Transactional
public class ListaCompraService {

    private final ListaCompraRepository listaCompraRepository;
    private final UsuarioService usuarioService;

    /**
     * Crea una nueva lista de compra.
     */
    public ListaCompraResponse crear(Long usuarioId, ListaCompraCreateRequest request) {
        Usuario usuario = usuarioService.obtenerUsuarioCompleto(usuarioId);

        ListaCompra lista = ListaCompra.builder()
                .usuario(usuario)
                .fechaGenerada(LocalDateTime.now())
                .origen(request.getOrigen())
                .estado(ListaCompra.EstadoListaCompra.PENDIENTE)
                .textoWhatsappGenerado(request.getTextoWhatsappGenerado())
                .build();

        ListaCompra saved = listaCompraRepository.save(lista);
        return mapToResponse(saved);
    }

    /**
     * Obtiene una lista por ID.
     */
    public ListaCompraResponse obtenerPorId(Long usuarioId, Long listaId) {
        ListaCompra lista = obtenerCompleta(usuarioId, listaId);
        return mapToResponse(lista);
    }

    /**
     * Obtiene todas las listas del usuario.
     */
    public List<ListaCompraResponse> obtenerDelUsuario(Long usuarioId) {
        usuarioService.obtenerUsuarioCompleto(usuarioId);
        return listaCompraRepository.findByUsuarioId(usuarioId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    /**
     * Obtiene listas con paginación.
     */
    public Page<ListaCompraResponse> obtenerDelUsuario(Long usuarioId, Pageable pageable) {
        usuarioService.obtenerUsuarioCompleto(usuarioId);
        return listaCompraRepository.findByUsuarioId(usuarioId, pageable)
                .map(this::mapToResponse);
    }

    /**
     * Obtiene listas pendientes.
     */
    public List<ListaCompraResponse> obtenerPendientes(Long usuarioId) {
        usuarioService.obtenerUsuarioCompleto(usuarioId);
        return listaCompraRepository.findPendientesByUsuarioId(usuarioId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    /**
     * Obtiene la lista más reciente pendiente.
     */
    public ListaCompraResponse obtenerUltimaPendiente(Long usuarioId) {
        usuarioService.obtenerUsuarioCompleto(usuarioId);
        ListaCompra lista = listaCompraRepository.findMostRecentPendienteByUsuarioId(usuarioId)
                .orElseThrow(() -> new IllegalArgumentException("No hay listas pendientes"));
        return mapToResponse(lista);
    }

    /**
     * Marca una lista como comprada.
     */
    public ListaCompraResponse marcarComoComprada(Long usuarioId, Long listaId) {
        ListaCompra lista = obtenerCompleta(usuarioId, listaId);
        lista.setEstado(ListaCompra.EstadoListaCompra.COMPRADA);
        ListaCompra saved = listaCompraRepository.save(lista);
        return mapToResponse(saved);
    }

    /**
     * Obtiene el objeto completo validando pertenencia.
     */
    public ListaCompra obtenerCompleta(Long usuarioId, Long listaId) {
        usuarioService.obtenerUsuarioCompleto(usuarioId);
        ListaCompra lista = listaCompraRepository.findById(listaId)
                .orElseThrow(() -> new IllegalArgumentException("Lista no encontrada"));
        if (!lista.getUsuario().getId().equals(usuarioId)) {
            throw new IllegalArgumentException("La lista no pertenece a este usuario");
        }
        return lista;
    }

    /**
     * Mapea a Response.
     */
    private ListaCompraResponse mapToResponse(ListaCompra lista) {
        List<ListaItemResponse> items = lista.getItems()
                .stream()
                .map(item -> {
                    // Generar URLs de imágenes del ingrediente
                    String ingSlug = item.getIngrediente().getImagenUrl();
                    String ingImagenUrlSmall = null;
                    String ingImagenUrlMedium = null;
                    String ingImagenUrlLarge = null;

                    if (ingSlug != null && !ingSlug.isEmpty()) {
                        ingImagenUrlSmall = ingSlug + "-small.webp";
                        ingImagenUrlMedium = ingSlug + "-medium.webp";
                        ingImagenUrlLarge = ingSlug + "-large.webp";
                    }

                    return ListaItemResponse.builder()
                        .id(item.getId())
                        .cantidadNecesaria(item.getCantidadNecesaria())
                        .unidad(item.getUnidad())
                        .comprado(item.getComprado())
                        .ingrediente(com.example.backend.dto.IngredienteResponse.builder()
                                .id(item.getIngrediente().getId())
                                .nombre(item.getIngrediente().getNombre())
                                .categoria(item.getIngrediente().getCategoria())
                                .unidadDefecto(item.getIngrediente().getUnidadDefecto())
                                .caloriasPorUnidad(item.getIngrediente().getCaloriasPorUnidad())
                                .imagenUrl(item.getIngrediente().getImagenUrl())
                                .imagenUrlSmall(ingImagenUrlSmall)
                                .imagenUrlMedium(ingImagenUrlMedium)
                                .imagenUrlLarge(ingImagenUrlLarge)
                                .build())
                        .build();
                })
                .collect(Collectors.toList());

        return ListaCompraResponse.builder()
                .id(lista.getId())
                .fechaGenerada(lista.getFechaGenerada())
                .origen(lista.getOrigen())
                .estado(lista.getEstado().name())
                .textoWhatsappGenerado(lista.getTextoWhatsappGenerado())
                .items(items)
                .build();
    }
}

