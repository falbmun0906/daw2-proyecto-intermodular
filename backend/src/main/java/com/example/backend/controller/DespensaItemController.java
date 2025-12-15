package com.example.backend.controller;

import com.example.backend.dto.DespensaItemCreateRequest;
import com.example.backend.dto.DespensaItemResponse;
import com.example.backend.dto.DespensaItemUpdateRequest;
import com.example.backend.service.DespensaItemService;
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
 * Controlador REST para la gestión de Despensa (anidado en Usuario).
 * Rutas base: /api/usuarios/{usuarioId}/despensa
 */
@RestController
@RequestMapping("/api/usuarios/{usuarioId}/despensa")
@RequiredArgsConstructor
public class DespensaItemController {

    private final DespensaItemService despensaItemService;

    /**
     * Agrega un producto a la despensa del usuario.
     * POST /api/usuarios/{usuarioId}/despensa
     *
     * @param usuarioId id del usuario
     * @param request datos del item a agregar
     * @return 201 Created con el item creado
     */
    @PostMapping
    public ResponseEntity<DespensaItemResponse> agregarItem(
            @PathVariable Long usuarioId,
            @Valid @RequestBody DespensaItemCreateRequest request) {
        DespensaItemResponse response = despensaItemService.agregarADespensa(usuarioId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * Obtiene productos caducados de la despensa.
     * GET /api/usuarios/{usuarioId}/despensa/caducados
     *
     * @param usuarioId id del usuario
     * @return 200 OK con lista de items caducados
     */
    @GetMapping("/caducados")
    public ResponseEntity<List<DespensaItemResponse>> obtenerCaducados(@PathVariable Long usuarioId) {
        List<DespensaItemResponse> items = despensaItemService.obtenerCaducados(usuarioId);
        return ResponseEntity.ok(items);
    }

    /**
     * Obtiene productos próximos a caducar.
     * GET /api/usuarios/{usuarioId}/despensa/proximo-caducar
     *
     * @param usuarioId id del usuario
     * @return 200 OK con lista de items próximos a caducar
     */
    @GetMapping("/proximo-caducar")
    public ResponseEntity<List<DespensaItemResponse>> obtenerProximoCaducar(@PathVariable Long usuarioId) {
        List<DespensaItemResponse> items = despensaItemService.obtenerProximoCaducar(usuarioId);
        return ResponseEntity.ok(items);
    }

    /**
     * Obtiene productos en buen estado.
     * GET /api/usuarios/{usuarioId}/despensa/ok
     *
     * @param usuarioId id del usuario
     * @return 200 OK con lista de items OK
     */
    @GetMapping("/ok")
    public ResponseEntity<List<DespensaItemResponse>> obtenerEnBuenEstado(@PathVariable Long usuarioId) {
        List<DespensaItemResponse> items = despensaItemService.obtenerEnBuenEstado(usuarioId);
        return ResponseEntity.ok(items);
    }

    /**
     * Obtiene items por ubicación.
     * GET /api/usuarios/{usuarioId}/despensa/ubicacion/{ubicacion}
     *
     * @param usuarioId id del usuario
     * @param ubicacion ubicación (NEVERA, CONGELADOR, etc.)
     * @return 200 OK con lista de items en esa ubicación
     */
    @GetMapping("/ubicacion/{ubicacion}")
    public ResponseEntity<List<DespensaItemResponse>> obtenerPorUbicacion(
            @PathVariable Long usuarioId,
            @PathVariable String ubicacion) {
        List<DespensaItemResponse> items = despensaItemService.obtenerPorUbicacion(usuarioId, ubicacion);
        return ResponseEntity.ok(items);
    }

    /**
     * Busca items por nombre de ingrediente.
     * GET /api/usuarios/{usuarioId}/despensa/buscar?nombre=X
     *
     * @param usuarioId id del usuario
     * @param nombre parte del nombre a buscar
     * @return 200 OK con lista de items encontrados
     */
    @GetMapping("/buscar")
    public ResponseEntity<List<DespensaItemResponse>> buscarPorNombre(
            @PathVariable Long usuarioId,
            @RequestParam String nombre) {
        List<DespensaItemResponse> items = despensaItemService.buscarPorNombre(usuarioId, nombre);
        return ResponseEntity.ok(items);
    }

    /**
     * Obtiene todos los items de la despensa con paginación opcional.
     * GET /api/usuarios/{usuarioId}/despensa?page=0&size=10
     *
     * @param usuarioId id del usuario
     * @param page número de página (opcional)
     * @param size tamaño de página (opcional)
     * @return 200 OK con página de items o lista completa
     */
    @GetMapping
    public ResponseEntity<?> obtenerDespensa(
            @PathVariable Long usuarioId,
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer size) {
        if (page != null && size != null) {
            Pageable pageable = PageRequest.of(page, size);
            Page<DespensaItemResponse> items = despensaItemService.obtenerDespensa(usuarioId, pageable);
            return ResponseEntity.ok(items);
        } else {
            List<DespensaItemResponse> items = despensaItemService.obtenerDespensa(usuarioId);
            return ResponseEntity.ok(items);
        }
    }

    /**
     * Actualiza un item de la despensa.
     * PUT /api/usuarios/{usuarioId}/despensa/{itemId}
     *
     * @param usuarioId id del usuario
     * @param itemId id del item
     * @param request datos a actualizar
     * @return 200 OK con el item actualizado
     */
    @PutMapping("/{itemId}")
    public ResponseEntity<DespensaItemResponse> actualizar(
            @PathVariable Long usuarioId,
            @PathVariable Long itemId,
            @Valid @RequestBody DespensaItemUpdateRequest request) {
        DespensaItemResponse response = despensaItemService.actualizar(usuarioId, itemId, request);
        return ResponseEntity.ok(response);
    }

    /**
     * Elimina un item de la despensa.
     * DELETE /api/usuarios/{usuarioId}/despensa/{itemId}
     *
     * @param usuarioId id del usuario
     * @param itemId id del item
     * @return 204 No Content
     */
    @DeleteMapping("/{itemId}")
    public ResponseEntity<Void> eliminar(
            @PathVariable Long usuarioId,
            @PathVariable Long itemId) {
        despensaItemService.eliminar(usuarioId, itemId);
        return ResponseEntity.noContent().build();
    }
}

