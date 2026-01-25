import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../product.service';
import { ProductsStore } from '../products.store';
import { Product } from '../models/product';
import { ToastService } from '../../../services/toast.service';

/**
 * TAREA 6.1: Componente de lista de productos con actualización dinámica sin recargas
 * TAREA 6.2: Usa ProductsStore con Signals para gestión de estado
 * TAREA 6.3: OnPush para optimización de rendimiento
 *
 * Características implementadas:
 * - Las listas se actualizan automáticamente tras crear/editar/eliminar
 * - Los contadores y estadísticas se recalculan al instante
 * - La posición del scroll se mantiene (trackBy + actualizaciones inmutables)
 * - ChangeDetection OnPush para mejor rendimiento
 * - No se requiere recargar la página en ningún momento
 */
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush // TAREA 6.3: Optimización
})
export class ProductListComponent {
  private productService = inject(ProductService);
  private toastService = inject(ToastService);

  // TAREA 6.1 y 6.2: Store centralizado con Signals
  // Los componentes leen directamente del store sin subscribe
  store = inject(ProductsStore);

  // Acceso directo a los signals del store
  products = this.store.products;
  loading = this.store.loading;
  error = this.store.error;
  lastUpdate = this.store.lastUpdate;

  // TAREA 6.1: Contadores y estadísticas en tiempo real
  totalCount = this.store.totalCount;
  totalValue = this.store.totalValue;
  totalStock = this.store.totalStock;
  averagePrice = this.store.averagePrice;
  lowStockProducts = this.store.lowStockProducts;
  categoriesStats = this.store.categoriesStats;

  /**
   * TAREA 6.1: Refrescar lista sin perder scroll
   * El store actualiza el signal y Angular mantiene el scroll
   */
  refresh(): void {
    this.store.refresh();
  }

  /**
   * TAREA 6.1: Eliminar producto con actualización dinámica
   * Tras eliminar, el store actualiza automáticamente la lista
   * sin necesidad de recargar la página
   */
  onDelete(id: string, name: string): void {
    if (!confirm(`¿Estás seguro de que quieres eliminar "${name}"?`)) {
      return;
    }

    this.productService.delete(id).subscribe({
      next: () => {
        // TAREA 6.1: Actualizar el store para reflejar el cambio
        // La lista se actualiza automáticamente sin recarga
        this.store.remove(id);
        this.toastService.success('Producto eliminado correctamente');
        console.log(`✅ Producto ${name} eliminado - Lista actualizada automáticamente`);
      },
      error: (err) => {
        const errorMessage = err.message || 'Error al eliminar producto';
        this.toastService.error(errorMessage);
      }
    });
  }

  /**
   * TAREA 6.3: TrackBy function para optimizar *ngFor
   * Evita recrear elementos DOM innecesariamente
   * Mantiene la posición del scroll al actualizar la lista
   */
  trackById(index: number, item: Product): string {
    return item.id;
  }

  /**
   * Limpiar mensaje de error
   */
  clearError(): void {
    this.store.clearError();
  }
}
