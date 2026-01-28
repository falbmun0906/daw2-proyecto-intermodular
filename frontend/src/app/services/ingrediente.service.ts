import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
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
   * GET /api/ingredientes - Obtener todos los ingredientes
   */
  getAll(): Observable<Ingrediente[]> {
    return this.api.get<Ingrediente[]>(this.endpoint).pipe(
      retry(2)
    );
  }

  /**
   * GET /api/ingredientes/:id - Obtener un ingrediente por ID
   */
  getById(id: number): Observable<Ingrediente> {
    return this.api.get<Ingrediente>(`${this.endpoint}/${id}`).pipe(
      retry(2)
    );
  }

  /**
   * GET /api/ingredientes/buscar?nombre={nombre} - Buscar por nombre
   */
  buscarPorNombre(nombre: string): Observable<Ingrediente[]> {
    return this.api.get<Ingrediente[]>(`${this.endpoint}/buscar?nombre=${nombre}`).pipe(
      retry(2)
    );
  }

  /**
   * GET /api/ingredientes/categoria/{categoria} - Obtener por categoría
   */
  getPorCategoria(categoria: string): Observable<Ingrediente[]> {
    return this.api.get<Ingrediente[]>(`${this.endpoint}/categoria/${categoria}`).pipe(
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
}

