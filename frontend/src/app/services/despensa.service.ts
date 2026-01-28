import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
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
   * GET /api/usuarios/:usuarioId/despensa - Obtener toda la despensa del usuario
   */
  getDespensa(usuarioId: number): Observable<DespensaItem[]> {
    return this.api.get<DespensaItem[]>(`usuarios/${usuarioId}/despensa`).pipe(
      retry(2)
    );
  }

  /**
   * GET /api/usuarios/:usuarioId/despensa/caducados - Productos caducados
   */
  getCaducados(usuarioId: number): Observable<DespensaItem[]> {
    return this.api.get<DespensaItem[]>(`usuarios/${usuarioId}/despensa/caducados`).pipe(
      retry(2)
    );
  }

  /**
   * GET /api/usuarios/:usuarioId/despensa/proximo-caducar - Productos próximos a caducar
   */
  getProximoCaducar(usuarioId: number): Observable<DespensaItem[]> {
    return this.api.get<DespensaItem[]>(`usuarios/${usuarioId}/despensa/proximo-caducar`).pipe(
      retry(2)
    );
  }

  /**
   * GET /api/usuarios/:usuarioId/despensa/ok - Productos en buen estado
   */
  getEnBuenEstado(usuarioId: number): Observable<DespensaItem[]> {
    return this.api.get<DespensaItem[]>(`usuarios/${usuarioId}/despensa/ok`).pipe(
      retry(2)
    );
  }

  /**
   * GET /api/usuarios/:usuarioId/despensa/ubicacion/{ubicacion} - Por ubicación
   */
  getPorUbicacion(usuarioId: number, ubicacion: string): Observable<DespensaItem[]> {
    return this.api.get<DespensaItem[]>(`usuarios/${usuarioId}/despensa/ubicacion/${ubicacion}`).pipe(
      retry(2)
    );
  }

  /**
   * GET /api/usuarios/:usuarioId/despensa/buscar?nombre={nombre} - Buscar por nombre
   */
  buscarPorNombre(usuarioId: number, nombre: string): Observable<DespensaItem[]> {
    return this.api.get<DespensaItem[]>(`usuarios/${usuarioId}/despensa/buscar?nombre=${nombre}`).pipe(
      retry(2)
    );
  }

  /**
   * POST /api/usuarios/:usuarioId/despensa - Agregar item a la despensa
   */
  agregar(usuarioId: number, dto: DespensaItemCreateRequest): Observable<DespensaItem> {
    return this.api.post<DespensaItem>(`usuarios/${usuarioId}/despensa`, dto);
  }

  /**
   * PUT /api/usuarios/:usuarioId/despensa/:itemId - Actualizar item de la despensa
   */
  actualizar(usuarioId: number, itemId: number, dto: DespensaItemUpdateRequest): Observable<DespensaItem> {
    return this.api.put<DespensaItem>(`usuarios/${usuarioId}/despensa/${itemId}`, dto);
  }

  /**
   * DELETE /api/usuarios/:usuarioId/despensa/:itemId - Eliminar item de la despensa
   */
  eliminar(usuarioId: number, itemId: number): Observable<void> {
    return this.api.delete<void>(`usuarios/${usuarioId}/despensa/${itemId}`);
  }
}

