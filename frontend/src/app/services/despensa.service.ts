import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { retry, map } from 'rxjs/operators';
import { ApiService } from '../core/services/api.service';
import { DespensaItem, DespensaItemCreateRequest, DespensaItemUpdateRequest } from '../models/despensa.model';

/**
 * Servicio de Despensa
 *
 * Conecta con el backend Spring Boot en /api/usuarios/{usuarioId}/despensa
 */
@Injectable({ providedIn: 'root' })
export class DespensaService {
  private api = inject(ApiService);

  /**
   * Base URL para imágenes (backend estático)
   */
  private readonly imageBaseUrl = 'http://localhost:8080/images';

  /**
   * Transforma las URLs de imágenes de ingredientes en un item de despensa
   */
  private transformImageUrls(item: DespensaItem): DespensaItem {
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
   * GET /api/usuarios/:usuarioId/despensa - Obtener toda la despensa del usuario
   */
  getDespensa(usuarioId: number): Observable<DespensaItem[]> {
    return this.api.get<DespensaItem[]>(`usuarios/${usuarioId}/despensa`).pipe(
      map(items => items.map(item => this.transformImageUrls(item))),
      retry(2)
    );
  }

  /**
   * GET /api/usuarios/:usuarioId/despensa/caducados - Productos caducados
   */
  getCaducados(usuarioId: number): Observable<DespensaItem[]> {
    return this.api.get<DespensaItem[]>(`usuarios/${usuarioId}/despensa/caducados`).pipe(
      map(items => items.map(item => this.transformImageUrls(item))),
      retry(2)
    );
  }

  /**
   * GET /api/usuarios/:usuarioId/despensa/proximo-caducar - Productos próximos a caducar
   */
  getProximoCaducar(usuarioId: number): Observable<DespensaItem[]> {
    return this.api.get<DespensaItem[]>(`usuarios/${usuarioId}/despensa/proximo-caducar`).pipe(
      map(items => items.map(item => this.transformImageUrls(item))),
      retry(2)
    );
  }

  /**
   * GET /api/usuarios/:usuarioId/despensa/ok - Productos en buen estado
   */
  getEnBuenEstado(usuarioId: number): Observable<DespensaItem[]> {
    return this.api.get<DespensaItem[]>(`usuarios/${usuarioId}/despensa/ok`).pipe(
      map(items => items.map(item => this.transformImageUrls(item))),
      retry(2)
    );
  }

  /**
   * GET /api/usuarios/:usuarioId/despensa/ubicacion/{ubicacion} - Por ubicación
   */
  getPorUbicacion(usuarioId: number, ubicacion: string): Observable<DespensaItem[]> {
    return this.api.get<DespensaItem[]>(`usuarios/${usuarioId}/despensa/ubicacion/${ubicacion}`).pipe(
      map(items => items.map(item => this.transformImageUrls(item))),
      retry(2)
    );
  }

  /**
   * GET /api/usuarios/:usuarioId/despensa/buscar?nombre={nombre} - Buscar por nombre
   */
  buscarPorNombre(usuarioId: number, nombre: string): Observable<DespensaItem[]> {
    return this.api.get<DespensaItem[]>(`usuarios/${usuarioId}/despensa/buscar?nombre=${nombre}`).pipe(
      map(items => items.map(item => this.transformImageUrls(item))),
      retry(2)
    );
  }

  /**
   * POST /api/usuarios/:usuarioId/despensa - Agregar item a la despensa
   */
  agregar(usuarioId: number, dto: DespensaItemCreateRequest): Observable<DespensaItem> {
    return this.api.post<DespensaItem>(`usuarios/${usuarioId}/despensa`, dto).pipe(
      map(item => this.transformImageUrls(item))
    );
  }

  /**
   * PUT /api/usuarios/:usuarioId/despensa/:itemId - Actualizar item de la despensa
   */
  actualizar(usuarioId: number, itemId: number, dto: DespensaItemUpdateRequest): Observable<DespensaItem> {
    return this.api.put<DespensaItem>(`usuarios/${usuarioId}/despensa/${itemId}`, dto).pipe(
      map(item => this.transformImageUrls(item))
    );
  }

  /**
   * DELETE /api/usuarios/:usuarioId/despensa/:itemId - Eliminar item de la despensa
   */
  eliminar(usuarioId: number, itemId: number): Observable<void> {
    return this.api.delete<void>(`usuarios/${usuarioId}/despensa/${itemId}`);
  }
}

