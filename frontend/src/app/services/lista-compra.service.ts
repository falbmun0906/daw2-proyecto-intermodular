import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { retry, map } from 'rxjs/operators';
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
   * Base URL para imágenes (backend estático)
   */
  private readonly imageBaseUrl = 'http://localhost:8080/images';

  /**
   * Transforma las URLs de imágenes de ingredientes en una lista
   */
  private transformListaImageUrls(lista: ListaCompra): ListaCompra {
    if (!lista || !lista.items) return lista;

    return {
      ...lista,
      items: lista.items.map(item => this.transformItemImageUrls(item))
    };
  }

  /**
   * Transforma las URLs de imágenes de un ingrediente en un item
   */
  private transformItemImageUrls(item: ListaItem): ListaItem {
    if (!item || !item.ingrediente) return item;

    const ingrediente = item.ingrediente;

    // Si ya están transformadas, no hacer nada
    if (ingrediente.imagenUrlSmall?.startsWith('http')) {
      return item;
    }

    // Si no hay imagenUrl base, retornar sin modificar
    if (!ingrediente.imagenUrl) {
      return item;
    }

    // Si imagenUrl ya es una URL completa, usarla directamente
    if (ingrediente.imagenUrl.startsWith('http')) {
      return {
        ...item,
        ingrediente: {
          ...ingrediente,
          imagenUrlSmall: ingrediente.imagenUrl,
          imagenUrlMedium: ingrediente.imagenUrl,
          imagenUrlLarge: ingrediente.imagenUrl
        }
      };
    }

    // Construir URLs completas basadas en el slug del ingrediente
    const slug = ingrediente.imagenUrl;
    return {
      ...item,
      ingrediente: {
        ...ingrediente,
        imagenUrlSmall: `${this.imageBaseUrl}/ingredientes/${slug}-small.webp`,
        imagenUrlMedium: `${this.imageBaseUrl}/ingredientes/${slug}-medium.webp`,
        imagenUrlLarge: `${this.imageBaseUrl}/ingredientes/${slug}-large.webp`
      }
    };
  }

  /**
   * GET /api/usuarios/:usuarioId/listas - Obtener todas las listas del usuario
   */
  getListas(usuarioId: number): Observable<ListaCompra[]> {
    return this.api.get<ListaCompra[]>(`usuarios/${usuarioId}/listas`).pipe(
      map(listas => listas.map(lista => this.transformListaImageUrls(lista))),
      retry(2)
    );
  }

  /**
   * GET /api/usuarios/:usuarioId/listas/:listaId - Obtener una lista específica
   */
  getListaById(usuarioId: number, listaId: number): Observable<ListaCompra> {
    return this.api.get<ListaCompra>(`usuarios/${usuarioId}/listas/${listaId}`).pipe(
      map(lista => this.transformListaImageUrls(lista)),
      retry(2)
    );
  }

  /**
   * GET /api/usuarios/:usuarioId/listas/pendientes - Obtener listas pendientes
   */
  getListasPendientes(usuarioId: number): Observable<ListaCompra[]> {
    return this.api.get<ListaCompra[]>(`usuarios/${usuarioId}/listas/pendientes`).pipe(
      map(listas => listas.map(lista => this.transformListaImageUrls(lista))),
      retry(2)
    );
  }

  /**
   * POST /api/usuarios/:usuarioId/listas - Crear nueva lista
   */
  crearLista(usuarioId: number, dto: ListaCompraCreateRequest): Observable<ListaCompra> {
    return this.api.post<ListaCompra>(`usuarios/${usuarioId}/listas`, dto).pipe(
      map(lista => this.transformListaImageUrls(lista))
    );
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
    return this.api.post<ListaItem>(`usuarios/${usuarioId}/listas/${listaId}/items`, dto).pipe(
      map(item => this.transformItemImageUrls(item))
    );
  }

  /**
   * PUT /api/usuarios/:usuarioId/listas/:listaId/items/:itemId - Actualizar item
   */
  actualizarItem(usuarioId: number, listaId: number, itemId: number, dto: ListaItemUpdateRequest): Observable<ListaItem> {
    return this.api.put<ListaItem>(`usuarios/${usuarioId}/listas/${listaId}/items/${itemId}`, dto).pipe(
      map(item => this.transformItemImageUrls(item))
    );
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
    return this.api.post<ListaItem>(`usuarios/${usuarioId}/listas/${listaId}/items/${itemId}/toggle`, {}).pipe(
      map(item => this.transformItemImageUrls(item))
    );
  }

  /**
   * POST /api/usuarios/:usuarioId/listas/:listaId/agregar-receta/:recetaId - Añadir ingredientes de una receta
   */
  agregarIngredientesDeReceta(usuarioId: number, listaId: number, recetaId: number): Observable<ListaCompra> {
    return this.api.post<ListaCompra>(`usuarios/${usuarioId}/listas/${listaId}/agregar-receta/${recetaId}`, {}).pipe(
      map(lista => this.transformListaImageUrls(lista))
    );
  }
}
