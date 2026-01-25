import { Injectable, signal, computed } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { ProductsStore } from './products.store';
import { Product } from './models/product';

/**
 * TAREA 6.5: Store para búsqueda y filtrado en tiempo real
 *
 * Características:
 * - Búsqueda con debounce (300ms)
 * - Filtros múltiples (categoría, precio, stock)
 * - Actualización sin parpadeos (trackBy)
 * - Estado de "sin resultados"
 * - Filtrado local eficiente
 */
@Injectable({ providedIn: 'root' })
export class ProductsSearchStore {
  private productsStore = signal<ProductsStore | null>(null);

  // Estado de búsqueda y filtros
  private _searchTerm = signal('');
  private _selectedCategory = signal<string | null>(null);
  private _minPrice = signal<number | null>(null);
  private _maxPrice = signal<number | null>(null);
  private _lowStockOnly = signal(false);
  private _inStockOnly = signal(false);

  // Observable para búsqueda con debounce
  private searchSubject = new Subject<string>();

  // Estado público readonly
  readonly searchTerm = this._searchTerm.asReadonly();
  readonly selectedCategory = this._selectedCategory.asReadonly();
  readonly minPrice = this._minPrice.asReadonly();
  readonly maxPrice = this._maxPrice.asReadonly();
  readonly lowStockOnly = this._lowStockOnly.asReadonly();
  readonly inStockOnly = this._inStockOnly.asReadonly();

  // TAREA 6.5: Resultados filtrados calculados automáticamente
  readonly filteredProducts = computed(() => {
    const store = this.productsStore();
    if (!store) return [];

    let products = store.products();

    // Filtro por búsqueda
    const term = this._searchTerm().toLowerCase().trim();
    if (term) {
      products = products.filter(p =>
        p.name.toLowerCase().includes(term) ||
        (p.description || '').toLowerCase().includes(term) ||
        (p.category || '').toLowerCase().includes(term)
      );
    }

    // Filtro por categoría
    const category = this._selectedCategory();
    if (category) {
      products = products.filter(p => p.category === category);
    }

    // Filtro por precio mínimo
    const minPrice = this._minPrice();
    if (minPrice !== null) {
      products = products.filter(p => (p.price || 0) >= minPrice);
    }

    // Filtro por precio máximo
    const maxPrice = this._maxPrice();
    if (maxPrice !== null) {
      products = products.filter(p => (p.price || 0) <= maxPrice);
    }

    // Filtro por stock bajo
    if (this._lowStockOnly()) {
      products = products.filter(p => (p.stock || 0) < 10);
    }

    // Filtro por en stock
    if (this._inStockOnly()) {
      products = products.filter(p => (p.stock || 0) > 0);
    }

    return products;
  });

  // Estadísticas de resultados
  readonly resultCount = computed(() => this.filteredProducts().length);
  readonly hasResults = computed(() => this.resultCount() > 0);
  readonly isSearching = computed(() => {
    return this._searchTerm() !== '' ||
           this._selectedCategory() !== null ||
           this._minPrice() !== null ||
           this._maxPrice() !== null ||
           this._lowStockOnly() ||
           this._inStockOnly();
  });

  // Categorías disponibles
  readonly availableCategories = computed(() => {
    const store = this.productsStore();
    if (!store) return [];

    const categories = new Set<string>();
    store.products().forEach(p => {
      if (p.category) {
        categories.add(p.category);
      }
    });
    return Array.from(categories).sort();
  });

  constructor() {
    // TAREA 6.5: Configurar debounce para búsqueda
    this.setupSearchDebounce();
  }

  /**
   * Inicializar con el store de productos
   */
  init(store: ProductsStore): void {
    this.productsStore.set(store);
  }

  /**
   * TAREA 6.5: Configurar debounce de 300ms para búsqueda
   */
  private setupSearchDebounce(): void {
    this.searchSubject.pipe(
      debounceTime(300),           // Esperar 300ms desde la última pulsación
      distinctUntilChanged()        // Solo si el valor cambió
    ).subscribe(term => {
      this._searchTerm.set(term);
      console.log('🔍 Búsqueda aplicada:', term);
    });
  }

  /**
   * TAREA 6.5: Actualizar término de búsqueda (con debounce)
   */
  search(term: string): void {
    this.searchSubject.next(term);
  }

  /**
   * Filtrar por categoría
   */
  setCategory(category: string | null): void {
    this._selectedCategory.set(category);
    console.log('📁 Categoría seleccionada:', category);
  }

  /**
   * Filtrar por rango de precio
   */
  setPriceRange(min: number | null, max: number | null): void {
    this._minPrice.set(min);
    this._maxPrice.set(max);
    console.log('💰 Rango de precio:', min, '-', max);
  }

  /**
   * Filtrar solo productos con stock bajo
   */
  setLowStockOnly(value: boolean): void {
    this._lowStockOnly.set(value);
    if (value) {
      this._inStockOnly.set(false); // Desactivar filtro opuesto
    }
  }

  /**
   * Filtrar solo productos en stock
   */
  setInStockOnly(value: boolean): void {
    this._inStockOnly.set(value);
    if (value) {
      this._lowStockOnly.set(false); // Desactivar filtro opuesto
    }
  }

  /**
   * TAREA 6.5: Limpiar todos los filtros
   */
  clearFilters(): void {
    this._searchTerm.set('');
    this._selectedCategory.set(null);
    this._minPrice.set(null);
    this._maxPrice.set(null);
    this._lowStockOnly.set(false);
    this._inStockOnly.set(false);
    console.log('🧹 Filtros limpiados');
  }

  /**
   * Limpiar solo búsqueda
   */
  clearSearch(): void {
    this._searchTerm.set('');
    this.searchSubject.next('');
  }
}

