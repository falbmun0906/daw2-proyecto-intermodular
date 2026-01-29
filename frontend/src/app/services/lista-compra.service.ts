import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { ApiService } from '../core/services/api.service';
import { ListaCompra, ListaCompraCreateRequest, ListaItem, ListaItemCreateRequest, ListaItemUpdateRequest } from '../models/lista-compra.model';

/**
 * Servicio de Lista de Compra
 * Conecta con el backend Spring Boot
 */
@Injectable({ providedIn: 'root' })
export class ListaCompraService {
  private api = inject(ApiService);

  /**
   * GET /api/usuarios/:usuarioId/listas - Obtener todas las listas del usuario
   */
  getListas(usuarioId: number): Observable<ListaCompra[]> {
    return this.api.get<ListaCompra[]>(`usuarios/${usuarioId}/listas`).pipe(retry(2));
  }

  /**
   * GET /api/usuarios/:usuarioId/listas/:listaId - Obtener una lista específica
   */
  getListaById(usuarioId: number, listaId: number): Observable<ListaCompra> {
    return this.api.get<ListaCompra>(`usuarios/${usuarioId}/listas/${listaId}`).pipe(retry(2));
  }

  /**
   * GET /api/usuarios/:usuarioId/listas/pendientes - Obtener listas pendientes
   */
  getListasPendientes(usuarioId: number): Observable<ListaCompra[]> {
    return this.api.get<ListaCompra[]>(`usuarios/${usuarioId}/listas/pendientes`).pipe(retry(2));
  }

  /**
   * POST /api/usuarios/:usuarioId/listas - Crear nueva lista
   */
  crearLista(usuarioId: number, dto: ListaCompraCreateRequest): Observable<ListaCompra> {
    return this.api.post<ListaCompra>(`usuarios/${usuarioId}/listas`, dto);
  }

  /**
   * DELETE /api/usuarios/:usuarioId/listas/:listaId - Eliminar lista
   */
  eliminarLista(usuarioId: number, listaId: number): Observable<void> {
    return this.api.delete<void>(`usuarios/${usuarioId}/listas/${listaId}`);
  }

  /**
   * POST /api/usuarios/:usuarioId/listas/:listaId/items - Agregar item a la lista
   */
  agregarItem(usuarioId: number, listaId: number, dto: ListaItemCreateRequest): Observable<ListaItem> {
    return this.api.post<ListaItem>(`usuarios/${usuarioId}/listas/${listaId}/items`, dto);
  }

  /**
   * PUT /api/usuarios/:usuarioId/listas/:listaId/items/:itemId - Actualizar item
   */
  actualizarItem(usuarioId: number, listaId: number, itemId: number, dto: ListaItemUpdateRequest): Observable<ListaItem> {
    return this.api.put<ListaItem>(`usuarios/${usuarioId}/listas/${listaId}/items/${itemId}`, dto);
  }

  /**
   * DELETE /api/usuarios/:usuarioId/listas/:listaId/items/:itemId - Eliminar item
   */
  eliminarItem(usuarioId: number, listaId: number, itemId: number): Observable<void> {
    return this.api.delete<void>(`usuarios/${usuarioId}/listas/${listaId}/items/${itemId}`);
  }

  /**
   * POST /api/usuarios/:usuarioId/listas/:listaId/items/:itemId/toggle - Marcar como comprado
   */
  toggleComprado(usuarioId: number, listaId: number, itemId: number): Observable<ListaItem> {
    return this.api.post<ListaItem>(`usuarios/${usuarioId}/listas/${listaId}/items/${itemId}/toggle`, {});
  }

  /**
   * POST /api/usuarios/:usuarioId/listas/:listaId/agregar-receta/:recetaId - Añadir ingredientes de una receta
   */
  agregarIngredientesDeReceta(usuarioId: number, listaId: number, recetaId: number): Observable<ListaCompra> {
    return this.api.post<ListaCompra>(`usuarios/${usuarioId}/listas/${listaId}/agregar-receta/${recetaId}`, {});
  }
}
