package com.example.backend.service;

import com.example.backend.dto.ListaItemCreateRequest;
import com.example.backend.dto.ListaItemResponse;
import com.example.backend.dto.IngredienteResponse;
import com.example.backend.model.ListaItem;
import com.example.backend.model.ListaCompra;
import com.example.backend.repository.ListaItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Servicio para la lógica de negocio de Items de Lista de Compra.
 */
@Service
@RequiredArgsConstructor
@Transactional
public class ListaItemService {

    private final ListaItemRepository listaItemRepository;
    private final ListaCompraService listaCompraService;
    private final IngredienteService ingredienteService;

    /**
     * Agrega un ingrediente a la lista de compra.
     */
    public ListaItemResponse agregarItem(Long usuarioId, Long listaId, ListaItemCreateRequest request) {
        ListaCompra lista = listaCompraService.obtenerCompleta(usuarioId, listaId);
        var ingrediente = ingredienteService.obtenerIngredienteCompleto(request.getIngredienteId());

        if (listaItemRepository.existsByListaCompraIdAndIngredienteId(listaId, request.getIngredienteId())) {
            throw new IllegalArgumentException("El ingrediente ya está en esta lista");
        }

        ListaItem item = ListaItem.builder()
                .listaCompra(lista)
                .ingrediente(ingrediente)
                .cantidadNecesaria(request.getCantidadNecesaria())
                .unidad(request.getUnidad())
                .comprado(false)
                .build();

        ListaItem saved = listaItemRepository.save(item);
        return mapToResponse(saved);
    }

    /**
     * Obtiene todos los items de una lista.
     */
    public List<ListaItemResponse> obtenerDelista(Long usuarioId, Long listaId) {
        listaCompraService.obtenerCompleta(usuarioId, listaId);
        return listaItemRepository.findByListaCompraId(listaId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    /**
     * Obtiene items sin comprar.
     */
    public List<ListaItemResponse> obtenerSinComprar(Long usuarioId, Long listaId) {
        listaCompraService.obtenerCompleta(usuarioId, listaId);
        return listaItemRepository.findNotCompradosByListaCompraId(listaId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    /**
     * Obtiene items comprados.
     */
    public List<ListaItemResponse> obtenerComprados(Long usuarioId, Long listaId) {
        listaCompraService.obtenerCompleta(usuarioId, listaId);
        return listaItemRepository.findCompradosByListaCompraId(listaId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    /**
     * Marca un item como comprado.
     */
    public ListaItemResponse marcarComoComprado(Long usuarioId, Long listaId, Long itemId) {
        ListaItem item = obtenerItemCompleto(usuarioId, listaId, itemId);
        item.setComprado(true);
        ListaItem saved = listaItemRepository.save(item);
        return mapToResponse(saved);
    }

    /**
     * Marca un item como no comprado.
     */
    public ListaItemResponse desmarcarComprado(Long usuarioId, Long listaId, Long itemId) {
        ListaItem item = obtenerItemCompleto(usuarioId, listaId, itemId);
        item.setComprado(false);
        ListaItem saved = listaItemRepository.save(item);
        return mapToResponse(saved);
    }

    /**
     * Elimina un item de la lista.
     */
    public void eliminarItem(Long usuarioId, Long listaId, Long itemId) {
        ListaItem item = obtenerItemCompleto(usuarioId, listaId, itemId);
        listaItemRepository.delete(item);
    }

    /**
     * Obtiene el porcentaje de items comprados.
     */
    public Double obtenerPorcentajeComprado(Long usuarioId, Long listaId) {
        listaCompraService.obtenerCompleta(usuarioId, listaId);
        return listaItemRepository.getPorcentajeComprado(listaId);
    }

    /**
     * Obtiene el item completo validando pertenencia.
     */
    private ListaItem obtenerItemCompleto(Long usuarioId, Long listaId, Long itemId) {
        listaCompraService.obtenerCompleta(usuarioId, listaId);
        ListaItem item = listaItemRepository.findById(itemId)
                .orElseThrow(() -> new IllegalArgumentException("Item no encontrado"));
        if (!item.getListaCompra().getId().equals(listaId)) {
            throw new IllegalArgumentException("El item no pertenece a esta lista");
        }
        return item;
    }

    /**
     * Mapea a Response.
     */
    private ListaItemResponse mapToResponse(ListaItem item) {
        IngredienteResponse ingredienteResponse = IngredienteResponse.builder()
                .id(item.getIngrediente().getId())
                .nombre(item.getIngrediente().getNombre())
                .categoria(item.getIngrediente().getCategoria())
                .unidadDefecto(item.getIngrediente().getUnidadDefecto())
                .caloriasPorUnidad(item.getIngrediente().getCaloriasPorUnidad())
                .build();

        return ListaItemResponse.builder()
                .id(item.getId())
                .ingrediente(ingredienteResponse)
                .cantidadNecesaria(item.getCantidadNecesaria())
                .unidad(item.getUnidad())
                .comprado(item.getComprado())
                .build();
    }
}

