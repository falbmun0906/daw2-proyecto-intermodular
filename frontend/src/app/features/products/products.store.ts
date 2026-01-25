import { Injectable, inject, signal, computed } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from './models/product';

/**
 * TAREA 6.1: Store de productos con gestión de estado mediante Signals
 *
 * Este store centraliza el estado de los productos y permite:
 * - Actualización dinámica sin recargas de página
 * - Recalculo automático de contadores y estadísticas
 * - Gestión del estado de carga y errores
 * - Sincronización automática entre todos los componentes suscritos
 *
 * TAREA 6.2: Patrón de gestión de estado
 * Se usa Angular Signals (patrón moderno) en lugar de BehaviorSubject
 * Ventajas:
 * - Integración nativa con el motor de Angular
 * - Menos boilerplate que RxJS
 * - Mejor rendimiento con change detection
 * - Más adecuado para proyectos medianos como este
 */
@Injectable({ providedIn: 'root' })
export class ProductsStore {
  private productService = inject(ProductService);

  // Estado privado (signals writeables)
  private _products = signal<Product[]>([]);
  private _loading = signal(false);
  private _error = signal<string | null>(null);
  private _lastUpdate = signal<Date | null>(null);

  // Estado público (signals readonly)
  readonly products = this._products.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();
  readonly lastUpdate = this._lastUpdate.asReadonly();

  // TAREA 6.1: Contadores y estadísticas calculados automáticamente
  // Se recalculan al instante cuando cambia la lista de productos
  readonly totalCount = computed(() => this._products().length);
  readonly totalValue = computed(() =>
    this._products().reduce((acc, p) => acc + (p.price || 0), 0)
  );
  readonly totalStock = computed(() =>
    this._products().reduce((acc, p) => acc + (p.stock || 0), 0)
  );
  readonly averagePrice = computed(() => {
    const count = this.totalCount();
    return count > 0 ? this.totalValue() / count : 0;
  });

  // Estadísticas por categoría
  readonly categoriesStats = computed(() => {
    const products = this._products();
    const stats = new Map<string, { count: number; total: number }>();

    products.forEach(p => {
      const category = p.category || 'Sin categoría';
      const current = stats.get(category) || { count: 0, total: 0 };
      stats.set(category, {
        count: current.count + 1,
        total: current.total + (p.price || 0)
      });
    });

    return Array.from(stats.entries()).map(([category, data]) => ({
      category,
      count: data.count,
      totalValue: data.total,
      averagePrice: data.total / data.count
    }));
  });

  // Productos con bajo stock (menos de 10 unidades)
  readonly lowStockProducts = computed(() =>
    this._products().filter(p => (p.stock || 0) < 10)
  );

  constructor() {
    // Carga inicial de productos al instanciar el store
    this.refresh();
  }

  /**
   * TAREA 6.1: Refrescar todos los productos desde el servidor
   * Actualiza la lista completa sin recargar la página
   */
  refresh(): void {
    this._loading.set(true);
    this._error.set(null);

    this.productService.getAll().subscribe({
      next: (products) => {
        this._products.set(products);
        this._loading.set(false);
        this._lastUpdate.set(new Date());
        console.log('✅ Productos cargados:', products.length);
      },
      error: (err) => {
        this._error.set('Error al cargar productos: ' + err.message);
        this._loading.set(false);
        console.error('❌ Error al cargar productos:', err);
      }
    });
  }

  /**
   * TAREA 6.1: Agregar un nuevo producto a la lista
   * La lista se actualiza automáticamente sin recarga
   * Los contadores se recalculan al instante
   *
   * @param product Producto creado (con ID asignado por el servidor)
   */
  add(product: Product): void {
    const current = this._products();
    this._products.set([...current, product]);
    this._lastUpdate.set(new Date());
    console.log('✅ Producto agregado al store:', product.name);
  }

  /**
   * TAREA 6.1: Actualizar un producto existente en la lista
   * La lista se actualiza automáticamente sin recarga
   * Los contadores se recalculan al instante
   *
   * @param product Producto actualizado
   */
  update(product: Product): void {
    const current = this._products();
    this._products.set(
      current.map(p => (p.id === product.id ? product : p))
    );
    this._lastUpdate.set(new Date());
    console.log('✅ Producto actualizado en el store:', product.name);
  }

  /**
   * TAREA 6.1: Eliminar un producto de la lista
   * La lista se actualiza automáticamente sin recarga
   * Los contadores se recalculan al instante
   *
   * @param id ID del producto a eliminar
   */
  remove(id: string): void {
    const current = this._products();
    this._products.set(current.filter(p => p.id !== id));
    this._lastUpdate.set(new Date());
    console.log('✅ Producto eliminado del store:', id);
  }

  /**
   * Obtener un producto por ID desde la lista en memoria
   * @param id ID del producto
   * @returns Producto o undefined si no existe
   */
  getById(id: string): Product | undefined {
    return this._products().find(p => p.id === id);
  }

  /**
   * Buscar productos por nombre o descripción
   * @param term Término de búsqueda
   * @returns Array de productos que coinciden
   */
  search(term: string): Product[] {
    const searchTerm = term.toLowerCase().trim();
    if (!searchTerm) return this._products();

    return this._products().filter(p =>
      p.name.toLowerCase().includes(searchTerm) ||
      (p.description || '').toLowerCase().includes(searchTerm)
    );
  }

  /**
   * Filtrar productos por categoría
   * @param category Categoría a filtrar
   * @returns Array de productos de esa categoría
   */
  filterByCategory(category: string): Product[] {
    return this._products().filter(p => p.category === category);
  }

  /**
   * Limpiar el estado de error
   */
  clearError(): void {
    this._error.set(null);
  }
}

