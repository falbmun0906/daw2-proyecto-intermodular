import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { ApiService } from '../core/services/api.service';
import { Receta, RecetaCompleta, RecetaCreateRequest } from '../models/receta.model';

/**
 * Servicio de recetas - Conectado con el backend Spring Boot
 *
 * Endpoints: /api/recetas
 */
@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private api = inject(ApiService);
  private readonly endpoint = 'recetas';

  /**
   * GET /api/recetas - Obtener todas las recetas
   */
  getAllRecipes(): Observable<Receta[]> {
    return this.api.get<Receta[]>(this.endpoint).pipe(
      retry(2)
    );
  }

  /**
   * GET /api/recetas/:id - Obtener una receta por ID (sin ingredientes)
   */
  getRecipeById(id: string | number): Observable<Receta> {
    const recipeId = typeof id === 'string' ? parseInt(id, 10) : id;
    return this.api.get<Receta>(`${this.endpoint}/${recipeId}`).pipe(
      retry(2)
    );
  }

  /**
   * GET /api/recetas/:id/completa - Obtener receta con ingredientes y pasos
   */
  getRecipeComplete(id: number): Observable<RecetaCompleta> {
    return this.api.get<RecetaCompleta>(`${this.endpoint}/${id}/completa`).pipe(
      retry(2)
    );
  }

  /**
   * GET /api/recetas/buscar?nombre={nombre} - Buscar recetas por nombre
   */
  buscarPorNombre(nombre: string): Observable<Receta[]> {
    return this.api.get<Receta[]>(`${this.endpoint}/buscar?nombre=${nombre}`).pipe(
      retry(2)
    );
  }

  /**
   * GET /api/recetas/filtrar?dificultad={dificultad}&tiempoMaximo={tiempo}
   * Búsqueda avanzada con filtros
   */
  filtrar(dificultad?: string, tiempoMaximo?: number, dieta?: string): Observable<Receta[]> {
    let query = '';
    const params: string[] = [];

    if (dificultad) params.push(`dificultad=${dificultad}`);
    if (tiempoMaximo) params.push(`tiempoMaximo=${tiempoMaximo}`);
    if (dieta) params.push(`dieta=${dieta}`);

    if (params.length > 0) {
      query = '?' + params.join('&');
    }

    return this.api.get<Receta[]>(`${this.endpoint}/filtrar${query}`).pipe(
      retry(2)
    );
  }

  /**
   * POST /api/recetas - Crear una nueva receta
   */
  create(dto: RecetaCreateRequest): Observable<Receta> {
    return this.api.post<Receta>(this.endpoint, dto);
  }

  /**
   * DELETE /api/recetas/:id - Eliminar una receta
   */
  delete(id: number): Observable<void> {
    return this.api.delete<void>(`${this.endpoint}/${id}`);
  }
}

