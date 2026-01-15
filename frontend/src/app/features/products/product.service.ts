import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { ApiService } from '../../core/services/api.service';
import { Product, CreateProductDto, UpdateProductDto } from './models/product';

/**
 * Respuesta de subida de imagen
 */
export interface UploadResponse {
  success: boolean;
  imageUrl: string;
  message: string;
}

/**
 * Respuesta paginada de API
 */
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

/**
 * Servicio de productos
 *
 * Implementa operaciones CRUD completas + formatos adicionales:
 * - GET listado y detalle
 * - POST crear
 * - PUT actualizar
 * - DELETE eliminar
 * - FormData para subida de archivos
 * - Query params para filtros y paginación
 * - Headers personalizados para reportes
 *
 * Delega en ApiService para las operaciones HTTP reales.
 *
 * @example
 * constructor(private productService: ProductService) {}
 *
 * ngOnInit() {
 *   this.products$ = this.productService.getAll();
 * }
 */
@Injectable({ providedIn: 'root' })
export class ProductService {
  private api = inject(ApiService);
  private http = inject(HttpClient); // Para FormData y casos especiales
  private readonly endpoint = 'products';
  private readonly baseUrl = 'http://localhost:3000';

  /**
   * GET /products - Obtener todos los productos
   *
   * TAREA 5.3: Retry logic para peticiones fallidas
   * Reintenta automáticamente hasta 2 veces en caso de error de red
   *
   * @returns Observable con array de productos
   */
  getAll(): Observable<Product[]> {
    return this.api.get<Product[]>(this.endpoint).pipe(
      retry(2) // Reintentar hasta 2 veces si falla (total 3 intentos)
    );
  }

  /**
   * GET /products/:id - Obtener un producto por ID
   *
   * TAREA 5.3: Retry logic para peticiones fallidas
   * Reintenta automáticamente hasta 2 veces en caso de error de red
   *
   * @param id ID del producto
   * @returns Observable con el producto
   */
  getById(id: string): Observable<Product> {
    return this.api.get<Product>(`${this.endpoint}/${id}`).pipe(
      retry(2) // Reintentar hasta 2 veces si falla
    );
  }

  /**
   * POST /products - Crear un nuevo producto
   * @param dto Datos del producto a crear
   * @returns Observable con el producto creado
   */
  create(dto: CreateProductDto): Observable<Product> {
    return this.api.post<Product>(this.endpoint, dto);
  }

  /**
   * PUT /products/:id - Actualizar un producto existente
   * @param id ID del producto
   * @param dto Datos actualizados
   * @returns Observable con el producto actualizado
   */
  update(id: string, dto: UpdateProductDto): Observable<Product> {
    return this.api.put<Product>(`${this.endpoint}/${id}`, dto);
  }

  /**
   * DELETE /products/:id - Eliminar un producto
   * @param id ID del producto a eliminar
   * @returns Observable vacío
   */
  delete(id: string): Observable<void> {
    return this.api.delete<void>(`${this.endpoint}/${id}`);
  }

  // ==================== TAREA 5.4: Diferentes Formatos ====================

  /**
   * POST /products/upload-image - Subir imagen usando FormData
   *
   * TAREA 5.4: FormData para subida de archivos
   *
   * @param productId ID del producto
   * @param file Archivo de imagen
   * @returns Observable con respuesta de upload
   */
  uploadImage(productId: string, file: File): Observable<UploadResponse> {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('productId', productId);

    // No establecer Content-Type manualmente - el navegador lo hace con boundary
    return this.http.post<UploadResponse>(
      `${this.baseUrl}/${this.endpoint}/upload-image`,
      formData
    );
  }

  /**
   * GET /products con filtros - Usando query params para filtros y paginación
   *
   * TAREA 5.4: Query params para filtros y paginación
   *
   * @param page Número de página (base 1)
   * @param pageSize Tamaño de página
   * @param search Búsqueda por nombre (opcional)
   * @param category Filtro por categoría (opcional)
   * @returns Observable con respuesta paginada
   */
  getFiltered(
    page: number = 1,
    pageSize: number = 10,
    search?: string,
    category?: string
  ): Observable<Product[]> {
    let params = new HttpParams()
      .set('_page', page.toString())
      .set('_limit', pageSize.toString());

    // json-server usa 'q' para búsqueda de texto completo
    if (search) {
      params = params.set('q', search);
    }

    // json-server usa 'category' para filtro exacto
    if (category) {
      params = params.set('category', category);
    }

    return this.http.get<Product[]>(`${this.baseUrl}/${this.endpoint}`, { params });
  }

  /**
   * GET /products/report - Obtener reporte con headers personalizados
   *
   * TAREA 5.4: Headers personalizados cuando sea necesario
   *
   * @param format Formato del reporte ('pdf' o 'csv')
   * @returns Observable con Blob del reporte
   */
  getReport(format: 'pdf' | 'csv'): Observable<Blob> {
    const headers = new HttpHeaders()
      .set('X-Report-Format', format)
      .set('X-Client-Version', 'web-1.0.0')
      .set('Accept', format === 'pdf' ? 'application/pdf' : 'text/csv');

    return this.http.get(`${this.baseUrl}/${this.endpoint}/report`, {
      headers,
      responseType: 'blob'
    });
  }
}

