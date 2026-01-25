import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProductsStore } from '../products.store';
import { ProductsSearchStore } from '../products-search.store';
import { Product } from '../models/product';

/**
 * TAREA 6.5: Componente de búsqueda y filtrado en tiempo real
 *
 * Características:
 * - Input de búsqueda con debounce de 300ms
 * - Filtros múltiples (categoría, precio, stock)
 * - Resultados actualizados sin parpadeos
 * - Estado de "sin resultados"
 * - Contadores de resultados
 * - OnPush para rendimiento óptimo
 */
@Component({
  selector: 'app-product-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './product-search.html',
  styleUrls: ['./product-search.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductSearchComponent implements OnInit {
  private productsStore = inject(ProductsStore);
  searchStore = inject(ProductsSearchStore);

  // TAREA 6.5: FormControl para el input de búsqueda
  searchControl = new FormControl('');

  // Referencias a signals del store
  filteredProducts = this.searchStore.filteredProducts;
  resultCount = this.searchStore.resultCount;
  hasResults = this.searchStore.hasResults;
  isSearching = this.searchStore.isSearching;
  availableCategories = this.searchStore.availableCategories;
  selectedCategory = this.searchStore.selectedCategory;
  lowStockOnly = this.searchStore.lowStockOnly;
  inStockOnly = this.searchStore.inStockOnly;

  // Estado de carga
  loading = this.productsStore.loading;

  // Filtros de precio
  minPriceControl = new FormControl<number | null>(null);
  maxPriceControl = new FormControl<number | null>(null);

  ngOnInit(): void {
    // Inicializar el store de búsqueda
    this.searchStore.init(this.productsStore);

    // TAREA 6.5: Conectar el FormControl con el store (debounce automático)
    this.searchControl.valueChanges.subscribe(value => {
      this.searchStore.search(value || '');
    });

    // Conectar filtros de precio
    this.minPriceControl.valueChanges.subscribe(min => {
      this.updatePriceRange();
    });

    this.maxPriceControl.valueChanges.subscribe(max => {
      this.updatePriceRange();
    });
  }

  /**
   * Actualizar rango de precio
   */
  private updatePriceRange(): void {
    const min = this.minPriceControl.value;
    const max = this.maxPriceControl.value;
    this.searchStore.setPriceRange(min, max);
  }

  /**
   * Filtrar por categoría
   */
  onCategoryChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const category = select.value || null;
    this.searchStore.setCategory(category);
  }

  /**
   * Toggle filtro de stock bajo
   */
  toggleLowStock(): void {
    this.searchStore.setLowStockOnly(!this.lowStockOnly());
  }

  /**
   * Toggle filtro de en stock
   */
  toggleInStock(): void {
    this.searchStore.setInStockOnly(!this.inStockOnly());
  }

  /**
   * TAREA 6.5: Limpiar todos los filtros
   */
  clearAllFilters(): void {
    this.searchControl.setValue('', { emitEvent: false });
    this.minPriceControl.setValue(null, { emitEvent: false });
    this.maxPriceControl.setValue(null, { emitEvent: false });
    this.searchStore.clearFilters();
  }

  /**
   * TAREA 6.3: TrackBy para optimización
   */
  trackById(index: number, item: Product): string {
    return item.id;
  }

  /**
   * Obtener texto del placeholder dinámico
   */
  getSearchPlaceholder(): string {
    const total = this.productsStore.totalCount();
    return `Buscar entre ${total} productos...`;
  }
}

