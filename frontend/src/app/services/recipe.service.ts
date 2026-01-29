import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { ApiService } from '../core/services/api.service';
import { Receta, RecetaCompleta, RecetaCreateRequest, PageResponse } from '../models/receta.model';

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
   * Base URL para imágenes (backend estático)
   */
  private readonly imageBaseUrl = 'http://localhost:8080/images';

  /**
   * GET /api/recetas?page=X&size=Y - Obtener recetas paginadas
   */
  getRecipesPaginated(page: number = 0, size: number = 5): Observable<PageResponse<Receta>> {
    return this.api.get<PageResponse<Receta>>(`${this.endpoint}?page=${page}&size=${size}`).pipe(
      retry(2)
    );
  }

  /**
   * GET /api/recetas - Obtener todas las recetas (sin paginación)
   */
  getAllRecipes(): Observable<Receta[]> {
    return this.api.get<Receta[]>(this.endpoint).pipe(
      retry(2)
    );
  }

  /**
   * GET /api/recetas/:id - Obtener una receta por ID
   */
  getRecipeById(id: string | number): Observable<RecetaCompleta> {
    const recipeId = typeof id === 'string' ? parseInt(id, 10) : id;
    return this.api.get<RecetaCompleta>(`${this.endpoint}/${recipeId}`).pipe(
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
   * GET /api/recetas/buscar?nombre={nombre}&page=X&size=Y - Buscar recetas por nombre paginado
   */
  buscarPorNombre(nombre: string, page?: number, size?: number): Observable<PageResponse<Receta> | Receta[]> {
    let query = `nombre=${encodeURIComponent(nombre)}`;
    if (page !== undefined && size !== undefined) {
      query += `&page=${page}&size=${size}`;
      return this.api.get<PageResponse<Receta>>(`${this.endpoint}/buscar?${query}`).pipe(retry(2));
    }
    return this.api.get<Receta[]>(`${this.endpoint}/buscar?${query}`).pipe(retry(2));
  }

  /**
   * GET /api/recetas/filtrar?dificultad={dificultad}&tiempoMaximo={tiempo}
   * Búsqueda avanzada con filtros
   */
  filtrar(dificultad?: string, tiempoMaximo?: number, dieta?: string): Observable<Receta[]> {
    const params: string[] = [];

    if (dificultad) params.push(`dificultad=${dificultad}`);
    if (tiempoMaximo) params.push(`tiempoMaximo=${tiempoMaximo}`);
    if (dieta) params.push(`dieta=${dieta}`);

    const query = params.length > 0 ? '?' + params.join('&') : '';

    return this.api.get<Receta[]>(`${this.endpoint}/filtrar${query}`).pipe(
      retry(2)
    );
  }

  /**
   * GET /api/recetas/count - Obtener número total de recetas
   */
  count(): Observable<number> {
    return this.api.get<number>(`${this.endpoint}/count`).pipe(retry(2));
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

  /**
   * Genera las URLs de imagen responsive para una receta
   * @param imagenUrl URL base de la imagen (ej: "paella-valenciana")
   * @returns Objeto con URLs para small, medium y large
   */
  getImageUrls(imagenUrl: string): { small: string; medium: string; large: string } {
    // Imagen por defecto si no hay URL
    const defaultImage = 'assets/recipes/default.jpg';

    if (!imagenUrl) {
      return {
        small: defaultImage,
        medium: defaultImage,
        large: defaultImage
      };
    }

    // Si la URL ya es completa (http/https), usar directamente
    if (imagenUrl.startsWith('http')) {
      return {
        small: imagenUrl,
        medium: imagenUrl,
        large: imagenUrl
      };
    }

    // Si es una ruta local de assets (ej: assets/recipes/...)
    if (imagenUrl.startsWith('assets/')) {
      return {
        small: imagenUrl,
        medium: imagenUrl,
        large: imagenUrl
      };
    }

    // Generar URLs basadas en el nombre de imagen (slug)
    return {
      small: `${this.imageBaseUrl}/recetas/${imagenUrl}-small.webp`,
      medium: `${this.imageBaseUrl}/recetas/${imagenUrl}-medium.webp`,
      large: `${this.imageBaseUrl}/recetas/${imagenUrl}-large.webp`
    };
  }

  /**
   * Genera la URL de imagen para un ingrediente
   */
  getIngredientImageUrl(imagenUrl: string, size: 'small' | 'medium' | 'large' = 'small'): string {
    if (!imagenUrl) {
      return `assets/ingredients/default-${size}.webp`;
    }

    if (imagenUrl.startsWith('http')) {
      const baseName = imagenUrl.replace(/\.[^/.]+$/, '');
      return `${baseName}-${size}.webp`;
    }

    return `${this.imageBaseUrl}/ingredientes/${imagenUrl}-${size}.webp`;
  }
}

