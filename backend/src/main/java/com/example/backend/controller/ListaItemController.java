package com.example.backend.controller;

import com.example.backend.dto.ListaItemCreateRequest;
import com.example.backend.dto.ListaItemResponse;
import com.example.backend.service.ListaItemService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controlador REST para la gestión de Items de Lista de Compra (anidado en ListaCompra).
 * Rutas base: /api/usuarios/{usuarioId}/listas/{listaId}/items
 */
@RestController
@RequestMapping("/api/usuarios/{usuarioId}/listas/{listaId}/items")
@RequiredArgsConstructor
public class ListaItemController {

    private final ListaItemService listaItemService;

    /**
     * Agrega un item a la lista de compra.
     * POST /api/usuarios/{usuarioId}/listas/{listaId}/items
     *
     * @param usuarioId id del usuario
     * @param listaId id de la lista
     * @param request datos del item a agregar
     * @return 201 Created con el item creado
     */
    @PostMapping
    public ResponseEntity<ListaItemResponse> agregarItem(
            @PathVariable Long usuarioId,
            @PathVariable Long listaId,
            @Valid @RequestBody ListaItemCreateRequest request) {
        ListaItemResponse response = listaItemService.agregarItem(usuarioId, listaId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * Obtiene solo los items sin comprar.
     * GET /api/usuarios/{usuarioId}/listas/{listaId}/items/sin-comprar
     *
     * @param usuarioId id del usuario
     * @param listaId id de la lista
     * @return 200 OK con items sin comprar
     */
    @GetMapping("/sin-comprar")
    public ResponseEntity<List<ListaItemResponse>> obtenerSinComprar(
            @PathVariable Long usuarioId,
            @PathVariable Long listaId) {
        List<ListaItemResponse> items = listaItemService.obtenerSinComprar(usuarioId, listaId);
        return ResponseEntity.ok(items);
    }

    /**
     * Obtiene solo los items comprados.
     * GET /api/usuarios/{usuarioId}/listas/{listaId}/items/comprados
     *
     * @param usuarioId id del usuario
     * @param listaId id de la lista
     * @return 200 OK con items comprados
     */
    @GetMapping("/comprados")
    public ResponseEntity<List<ListaItemResponse>> obtenerComprados(
            @PathVariable Long usuarioId,
            @PathVariable Long listaId) {
        List<ListaItemResponse> items = listaItemService.obtenerComprados(usuarioId, listaId);
        return ResponseEntity.ok(items);
    }

    /**
     * Obtiene el porcentaje de items comprados en la lista.
     * GET /api/usuarios/{usuarioId}/listas/{listaId}/items/porcentaje
     *
     * @param usuarioId id del usuario
     * @param listaId id de la lista
     * @return 200 OK con el porcentaje
     */
    @GetMapping("/porcentaje")
    public ResponseEntity<Double> obtenerPorcentajeComprado(
            @PathVariable Long usuarioId,
            @PathVariable Long listaId) {
        Double porcentaje = listaItemService.obtenerPorcentajeComprado(usuarioId, listaId);
        return ResponseEntity.ok(porcentaje);
    }

    /**
     * Lista todos los items de una lista.
     * GET /api/usuarios/{usuarioId}/listas/{listaId}/items
     *
     * @param usuarioId id del usuario
     * @param listaId id de la lista
     * @return 200 OK con lista de items
     */
    @GetMapping
    public ResponseEntity<List<ListaItemResponse>> obtenerItems(
            @PathVariable Long usuarioId,
            @PathVariable Long listaId) {
        List<ListaItemResponse> items = listaItemService.obtenerDelista(usuarioId, listaId);
        return ResponseEntity.ok(items);
    }

    /**
     * Marca un item como comprado.
     * PUT /api/usuarios/{usuarioId}/listas/{listaId}/items/{itemId}/comprado
     *
     * @param usuarioId id del usuario
     * @param listaId id de la lista
     * @param itemId id del item
     * @return 200 OK con el item actualizado
     */
    @PutMapping("/{itemId}/comprado")
    public ResponseEntity<ListaItemResponse> marcarComoComprado(
            @PathVariable Long usuarioId,
            @PathVariable Long listaId,
            @PathVariable Long itemId) {
        ListaItemResponse response = listaItemService.marcarComoComprado(usuarioId, listaId, itemId);
        return ResponseEntity.ok(response);
    }

    /**
     * Desmarca un item como comprado.
     * PUT /api/usuarios/{usuarioId}/listas/{listaId}/items/{itemId}/no-comprado
     *
     * @param usuarioId id del usuario
     * @param listaId id de la lista
     * @param itemId id del item
     * @return 200 OK con el item actualizado
     */
    @PutMapping("/{itemId}/no-comprado")
    public ResponseEntity<ListaItemResponse> desmarcarComprado(
            @PathVariable Long usuarioId,
            @PathVariable Long listaId,
            @PathVariable Long itemId) {
        ListaItemResponse response = listaItemService.desmarcarComprado(usuarioId, listaId, itemId);
        return ResponseEntity.ok(response);
    }

    /**
     * Elimina un item de la lista.
     * DELETE /api/usuarios/{usuarioId}/listas/{listaId}/items/{itemId}
     *
     * @param usuarioId id del usuario
     * @param listaId id de la lista
     * @param itemId id del item
     * @return 204 No Content
     */
    @DeleteMapping("/{itemId}")
    public ResponseEntity<Void> eliminarItem(
            @PathVariable Long usuarioId,
            @PathVariable Long listaId,
            @PathVariable Long itemId) {
        listaItemService.eliminarItem(usuarioId, listaId, itemId);
        return ResponseEntity.noContent().build();
    }
}

