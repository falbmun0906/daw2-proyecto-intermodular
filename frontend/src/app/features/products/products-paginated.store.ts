import { Injectable, signal } from '@angular/core';
import { ProductService, PaginatedResponse } from './product.service';
import { Product } from './models/product';

/**
 * TAREA 6.4: Store de productos con soporte para paginación
 *
 * Gestiona el estado de paginación de forma centralizada:
 * - Carga de páginas con loading states
 * - Control de página actual y total de páginas
 * - Prevención de llamadas duplicadas
 * - Estado de "fin de datos" (EOF)
 */
@Injectable({ providedIn: 'root' })
export class ProductsPaginatedStore {
  private productService = signal<ProductService | null>(null);

  // Estado de paginación
  private _products = signal<Product[]>([]);
  private _loading = signal(false);
  private _error = signal<string | null>(null);
  private _currentPage = signal(1);
  private _pageSize = signal(10);
  private _totalItems = signal(0);
  private _totalPages = signal(0);

  // Estado público readonly
  readonly products = this._products.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();
  readonly currentPage = this._currentPage.asReadonly();
  readonly pageSize = this._pageSize.asReadonly();
  readonly totalItems = this._totalItems.asReadonly();
  readonly totalPages = this._totalPages.asReadonly();

  // Helpers calculados
  readonly hasNextPage = signal(false);
  readonly hasPreviousPage = signal(false);

  /**
   * Inicializar el store con el servicio de productos
   */
  init(service: ProductService, pageSize: number = 10): void {
    this.productService.set(service);
    this._pageSize.set(pageSize);
    this.loadPage(1);
  }

  /**
   * TAREA 6.4: Cargar una página específica
   * Gestiona estados de loading, error y actualiza metadatos de paginación
   */
  loadPage(page: number): void {
    const service = this.productService();
    if (!service) {
      console.error('❌ ProductService no inicializado');
      return;
    }

    // Prevenir carga duplicada
    if (this._loading()) {
      console.log('⏳ Ya hay una carga en progreso');
      return;
    }

    // Validar página
    if (page < 1) {
      console.warn('⚠️ Página inválida:', page);
      return;
    }

    console.log(`📄 Cargando página ${page}...`);

    this._loading.set(true);
    this._error.set(null);

    // Llamada al servicio con paginación
    service.getFiltered(page, this._pageSize()).subscribe({
      next: (response: Product[] | PaginatedResponse<Product>) => {
        // El servicio puede devolver Product[] o PaginatedResponse
        if (Array.isArray(response)) {
          // Respuesta simple (simulada)
          this._products.set(response);
          this._totalItems.set(response.length);
          this._totalPages.set(1);
        } else {
          // Respuesta paginada completa
          this._products.set(response.items || []);
          this._totalItems.set(response.total || 0);
          this._totalPages.set(Math.ceil((response.total || 0) / this._pageSize()));
        }

        this._currentPage.set(page);
        this._loading.set(false);

        // Actualizar helpers
        this.updatePaginationHelpers();

        console.log(`✅ Página ${page} cargada:`, this._products().length, 'productos');
      },
      error: (err) => {
        this._error.set(`Error al cargar página ${page}: ${err.message}`);
        this._loading.set(false);
        console.error('❌ Error cargando página:', err);
      }
    });
  }

  /**
   * Ir a la página siguiente
   */
  nextPage(): void {
    if (this.hasNextPage()) {
      this.loadPage(this._currentPage() + 1);
    }
  }

  /**
   * Ir a la página anterior
   */
  previousPage(): void {
    if (this.hasPreviousPage()) {
      this.loadPage(this._currentPage() - 1);
    }
  }

  /**
   * Ir a la primera página
   */
  firstPage(): void {
    this.loadPage(1);
  }

  /**
   * Ir a la última página
   */
  lastPage(): void {
    if (this._totalPages() > 0) {
      this.loadPage(this._totalPages());
    }
  }

  /**
   * Cambiar tamaño de página y recargar
   */
  setPageSize(size: number): void {
    if (size < 1) return;

    this._pageSize.set(size);
    this.loadPage(1); // Volver a la primera página
  }

  /**
   * Actualizar helpers de paginación
   */
  private updatePaginationHelpers(): void {
    this.hasNextPage.set(this._currentPage() < this._totalPages());
    this.hasPreviousPage.set(this._currentPage() > 1);
  }

  /**
   * Limpiar errores
   */
  clearError(): void {
    this._error.set(null);
  }

  /**
   * Reset del estado de paginación
   */
  reset(): void {
    this._products.set([]);
    this._currentPage.set(1);
    this._totalItems.set(0);
    this._totalPages.set(0);
    this._error.set(null);
    this.updatePaginationHelpers();
  }
}

