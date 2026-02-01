import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { retry, map } from 'rxjs/operators';
import { ApiService } from '../core/services/api.service';
import { Ingrediente, IngredienteCreateRequest, IngredienteUpdateRequest } from '../models/ingrediente.model';

/**
 * Servicio de Ingredientes
 *
 * Conecta con el backend Spring Boot en /api/ingredientes
 * Reemplaza el antiguo ProductService que usaba json-server
 */
@Injectable({ providedIn: 'root' })
export class IngredienteService {
  private api = inject(ApiService);
  private readonly endpoint = 'ingredientes';

  /**
   * Base URL para imágenes (backend estático)
   */
  private readonly imageBaseUrl = 'http://localhost:8080/images';

  /**
   * Transforma las URLs de imágenes de un ingrediente para que sean completas
   */
  private transformImageUrls(ingrediente: Ingrediente): Ingrediente {
    if (!ingrediente) return ingrediente;

    // Si las URLs ya son completas (empiezan con http), no hacer nada
    if (ingrediente.imagenUrlSmall?.startsWith('http')) {
      return ingrediente;
    }

    // Si no hay imagenUrl base, retornar sin modificar
    if (!ingrediente.imagenUrl) {
      return ingrediente;
    }

    // Si imagenUrl ya es una URL completa, usarla directamente
    if (ingrediente.imagenUrl.startsWith('http')) {
      return {
        ...ingrediente,
        imagenUrlSmall: ingrediente.imagenUrl,
        imagenUrlMedium: ingrediente.imagenUrl,
        imagenUrlLarge: ingrediente.imagenUrl
      };
    }

    // Construir URLs completas basadas en el slug del ingrediente
    const slug = ingrediente.imagenUrl;
    return {
      ...ingrediente,
      imagenUrlSmall: `${this.imageBaseUrl}/ingredientes/${slug}-small.webp`,
      imagenUrlMedium: `${this.imageBaseUrl}/ingredientes/${slug}-medium.webp`,
      imagenUrlLarge: `${this.imageBaseUrl}/ingredientes/${slug}-large.webp`
    };
  }

  /**
   * GET /api/ingredientes - Obtener todos los ingredientes
   */
  getAll(): Observable<Ingrediente[]> {
    return this.api.get<Ingrediente[]>(this.endpoint).pipe(
      map(ingredientes => ingredientes.map(i => this.transformImageUrls(i))),
      retry(2)
    );
  }

  /**
   * GET /api/ingredientes/:id - Obtener un ingrediente por ID
   */
  getById(id: number): Observable<Ingrediente> {
    return this.api.get<Ingrediente>(`${this.endpoint}/${id}`).pipe(
      map(ingrediente => this.transformImageUrls(ingrediente)),
      retry(2)
    );
  }

  /**
   * GET /api/ingredientes/buscar?nombre={nombre} - Buscar por nombre
   */
  buscarPorNombre(nombre: string): Observable<Ingrediente[]> {
    return this.api.get<Ingrediente[]>(`${this.endpoint}/buscar?nombre=${nombre}`).pipe(
      map(ingredientes => ingredientes.map(i => this.transformImageUrls(i))),
      retry(2)
    );
  }

  /**
   * GET /api/ingredientes/categoria/{categoria} - Obtener por categoría
   */
  getPorCategoria(categoria: string): Observable<Ingrediente[]> {
    return this.api.get<Ingrediente[]>(`${this.endpoint}/categoria/${categoria}`).pipe(
      map(ingredientes => ingredientes.map(i => this.transformImageUrls(i))),
      retry(2)
    );
  }

  /**
   * GET /api/ingredientes/categorias - Obtener todas las categorías
   */
  getCategorias(): Observable<string[]> {
    return this.api.get<string[]>(`${this.endpoint}/categorias`).pipe(
      retry(2)
    );
  }

  /**
   * POST /api/ingredientes - Crear un nuevo ingrediente
   */
  create(dto: IngredienteCreateRequest): Observable<Ingrediente> {
    return this.api.post<Ingrediente>(this.endpoint, dto);
  }

  /**
   * PUT /api/ingredientes/:id - Actualizar un ingrediente existente
   */
  update(id: number, dto: IngredienteUpdateRequest): Observable<Ingrediente> {
    return this.api.put<Ingrediente>(`${this.endpoint}/${id}`, dto);
  }

  /**
   * DELETE /api/ingredientes/:id - Eliminar un ingrediente
   */
  delete(id: number): Observable<void> {
    return this.api.delete<void>(`${this.endpoint}/${id}`);
  }

  /**
   * Genera las URLs de imagen responsive para un ingrediente
   * @param imagenUrl URL base de la imagen (ej: "tomate", "pimiento-rojo")
   * @returns Objeto con URLs para small, medium y large
   */
  getImageUrls(imagenUrl: string): { small: string; medium: string; large: string } {
    // Imagen por defecto si no hay URL
    const defaultImage = 'assets/ingredients/default.webp';

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

    // Si es una ruta local de assets (ej: assets/ingredients/...)
    if (imagenUrl.startsWith('assets/')) {
      return {
        small: imagenUrl,
        medium: imagenUrl,
        large: imagenUrl
      };
    }

    // Generar URLs basadas en el nombre de imagen (slug)
    return {
      small: `${this.imageBaseUrl}/ingredientes/${imagenUrl}-small.webp`,
      medium: `${this.imageBaseUrl}/ingredientes/${imagenUrl}-medium.webp`,
      large: `${this.imageBaseUrl}/ingredientes/${imagenUrl}-large.webp`
    };
  }

  /**
   * Genera la URL de imagen para un ingrediente con un tamaño específico
   * @param imagenUrl URL base de la imagen
   * @param size Tamaño deseado (small: 200px, medium: 400px, large: 600px)
   * @returns URL completa de la imagen
   */
  getImageUrl(imagenUrl: string, size: 'small' | 'medium' | 'large' = 'small'): string {
    const urls = this.getImageUrls(imagenUrl);
    return urls[size];
  }
}

