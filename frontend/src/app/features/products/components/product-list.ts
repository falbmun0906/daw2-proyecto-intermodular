import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../models/product';
import { ToastService } from '../../../services/toast.service';

/**
 * Estado de carga para peticiones HTTP
 */
interface LoadingState<T> {
  loading: boolean;
  error: string | null;
  data: T | null;
}

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.scss']
})
export class ProductListComponent implements OnInit {
  private productService = inject(ProductService);
  private toastService = inject(ToastService);

  // TAREA 5.5: Patrón de estado con loading, error, data
  state = signal<LoadingState<Product[]>>({
    loading: false,
    error: null,
    data: null
  });

  ngOnInit(): void {
    this.loadProducts();
  }

  /**
   * TAREA 5.5: Método que gestiona estado loading/error/data
   */
  loadProducts(): void {
    // Establecer estado de carga
    this.state.update(() => ({
      loading: true,
      error: null,
      data: null
    }));

    this.productService.getAll().subscribe({
      next: (products) => {
        // Éxito: actualizar estado con datos
        this.state.update(() => ({
          loading: false,
          error: null,
          data: products
        }));
      },
      error: (err) => {
        // Error: actualizar estado con mensaje de error
        const errorMessage = err.message || 'Error al cargar productos';
        this.state.update(() => ({
          loading: false,
          error: errorMessage,
          data: null
        }));
      }
    });
  }

  onDelete(id: string, name: string): void {
    if (!confirm(`¿Estás seguro de que quieres eliminar "${name}"?`)) {
      return;
    }

    this.productService.delete(id).subscribe({
      next: () => {
        console.log(`✅ Producto ${name} eliminado`);
        this.toastService.success('Producto eliminado correctamente');
        this.loadProducts(); // Recargar lista
      },
      error: (err) => {
        const errorMessage = err.message || 'Error al eliminar producto';
        this.toastService.error(errorMessage);
      }
    });
  }
}
