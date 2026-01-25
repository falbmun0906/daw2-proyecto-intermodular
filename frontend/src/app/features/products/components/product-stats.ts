import { Component, OnInit, OnDestroy, inject, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProductsStore } from '../products.store';

/**
 * TAREA 6.3: Componente de estadísticas optimizado con todas las técnicas de rendimiento
 *
 * Optimizaciones implementadas:
 * 1. OnPush Change Detection Strategy
 * 2. Unsubscribe automático con destroy$
 * 3. Uso de Signals (sin async pipe necesario)
 * 4. Computed values para cálculos eficientes
 * 5. TrackBy en listas
 */
@Component({
  selector: 'app-product-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-stats.html',
  styleUrls: ['./product-stats.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush // OPTIMIZACIÓN 1: OnPush
})
export class ProductStatsComponent implements OnInit, OnDestroy {
  // OPTIMIZACIÓN 2: Subject para unsubscribe automático
  private destroy$ = new Subject<void>();

  // OPTIMIZACIÓN 3: Usar Signals del store (no necesita async pipe)
  private storeInstance = inject(ProductsStore);

  // Estado local con signals
  autoRefreshEnabled = signal(false);
  refreshInterval = signal(30); // segundos
  lastRefresh = signal<Date | null>(null);

  // Getters para acceder a los signals del store
  get store() {
    return this.storeInstance;
  }

  get products() {
    return this.storeInstance.products;
  }

  get totalCount() {
    return this.storeInstance.totalCount;
  }

  get totalValue() {
    return this.storeInstance.totalValue;
  }

  get totalStock() {
    return this.storeInstance.totalStock;
  }

  get averagePrice() {
    return this.storeInstance.averagePrice;
  }

  get categoriesStats() {
    return this.storeInstance.categoriesStats;
  }

  get lowStockProducts() {
    return this.storeInstance.lowStockProducts;
  }

  ngOnInit(): void {
    // Ejemplo de suscripción con takeUntil para evitar memory leak
    this.setupAutoRefresh();
  }

  /**
   * OPTIMIZACIÓN 2: Patrón destroy$ para unsubscribe automático
   * Todas las suscripciones se cancelan automáticamente al destruir el componente
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    console.log('🧹 ProductStatsComponent destruido - Suscripciones canceladas');
  }

  /**
   * Configurar auto-refresh con gestión correcta de suscripciones
   */
  private setupAutoRefresh(): void {
    // OPTIMIZACIÓN 2: takeUntil previene memory leaks
    interval(this.refreshInterval() * 1000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        if (this.autoRefreshEnabled()) {
          this.refreshStats();
        }
      });
  }

  /**
   * OPTIMIZACIÓN 2: Uso de take(1) para suscripciones puntuales
   * No necesita unsubscribe porque se completa automáticamente
   */
  refreshStats(): void {
    this.storeInstance.refresh();
    this.lastRefresh.set(new Date());
  }

  /**
   * OPTIMIZACIÓN 5: TrackBy para listas de categorías
   * Evita recrear elementos DOM innecesariamente
   */
  trackByCategory(index: number, item: { category: string }): string {
    return item.category;
  }

  /**
   * OPTIMIZACIÓN 5: TrackBy para productos con stock bajo
   */
  trackById(index: number, item: { id: string }): string {
    return item.id;
  }

  toggleAutoRefresh(): void {
    this.autoRefreshEnabled.update(enabled => !enabled);
  }

  setRefreshInterval(seconds: number): void {
    this.refreshInterval.set(seconds);
    // Reiniciar el interval con el nuevo valor
    this.destroy$.next();
    this.setupAutoRefresh();
  }
}

