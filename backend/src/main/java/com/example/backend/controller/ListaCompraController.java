package com.example.backend.controller;

import com.example.backend.dto.ListaCompraCreateRequest;
import com.example.backend.dto.ListaCompraResponse;
import com.example.backend.service.ListaCompraService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controlador REST para la gestión de Listas de Compra (anidado en Usuario).
 * Rutas base: /api/usuarios/{usuarioId}/listas
 */
@RestController
@RequestMapping("/api/usuarios/{usuarioId}/listas")
@RequiredArgsConstructor
public class ListaCompraController {

    private final ListaCompraService listaCompraService;

    /**
     * Crea una nueva lista de compra.
     * POST /api/usuarios/{usuarioId}/listas
     *
     * @param usuarioId id del usuario
     * @param request datos de la lista
     * @return 201 Created con la lista creada
     */
    @PostMapping
    public ResponseEntity<ListaCompraResponse> crear(
            @PathVariable Long usuarioId,
            @Valid @RequestBody ListaCompraCreateRequest request) {
        ListaCompraResponse response = listaCompraService.crear(usuarioId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * Obtiene una lista por ID.
     * GET /api/usuarios/{usuarioId}/listas/{listaId}
     *
     * @param usuarioId id del usuario
     * @param listaId id de la lista
     * @return 200 OK con la lista
     */
    @GetMapping("/{listaId}")
    public ResponseEntity<ListaCompraResponse> obtenerPorId(
            @PathVariable Long usuarioId,
            @PathVariable Long listaId) {
        ListaCompraResponse response = listaCompraService.obtenerPorId(usuarioId, listaId);
        return ResponseEntity.ok(response);
    }

    /**
     * Lista todas las listas del usuario con paginación opcional.
     * GET /api/usuarios/{usuarioId}/listas?page=0&size=10
     *
     * @param usuarioId id del usuario
     * @param page número de página (opcional)
     * @param size tamaño de página (opcional)
     * @return 200 OK con página de listas o lista completa
     */
    @GetMapping
    public ResponseEntity<?> obtenerDelUsuario(
            @PathVariable Long usuarioId,
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer size) {
        if (page != null && size != null) {
            Pageable pageable = PageRequest.of(page, size);
            Page<ListaCompraResponse> listas = listaCompraService.obtenerDelUsuario(usuarioId, pageable);
            return ResponseEntity.ok(listas);
        } else {
            List<ListaCompraResponse> listas = listaCompraService.obtenerDelUsuario(usuarioId);
            return ResponseEntity.ok(listas);
        }
    }

    /**
     * Obtiene solo las listas pendientes del usuario.
     * GET /api/usuarios/{usuarioId}/listas/pendientes
     *
     * @param usuarioId id del usuario
     * @return 200 OK con lista de listas pendientes
     */
    @GetMapping("/pendientes")
    public ResponseEntity<List<ListaCompraResponse>> obtenerPendientes(@PathVariable Long usuarioId) {
        List<ListaCompraResponse> listas = listaCompraService.obtenerPendientes(usuarioId);
        return ResponseEntity.ok(listas);
    }

    /**
     * Obtiene la última lista pendiente del usuario.
     * GET /api/usuarios/{usuarioId}/listas/ultima-pendiente
     *
     * @param usuarioId id del usuario
     * @return 200 OK con la última lista pendiente
     */
    @GetMapping("/ultima-pendiente")
    public ResponseEntity<ListaCompraResponse> obtenerUltimaPendiente(@PathVariable Long usuarioId) {
        ListaCompraResponse response = listaCompraService.obtenerUltimaPendiente(usuarioId);
        return ResponseEntity.ok(response);
    }

    /**
     * Marca una lista como comprada.
     * PUT /api/usuarios/{usuarioId}/listas/{listaId}/comprada
     *
     * @param usuarioId id del usuario
     * @param listaId id de la lista
     * @return 200 OK con la lista actualizada
     */
    @PutMapping("/{listaId}/comprada")
    public ResponseEntity<ListaCompraResponse> marcarComoComprada(
            @PathVariable Long usuarioId,
            @PathVariable Long listaId) {
        ListaCompraResponse response = listaCompraService.marcarComoComprada(usuarioId, listaId);
        return ResponseEntity.ok(response);
    }
}

