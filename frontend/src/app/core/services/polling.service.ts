import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timer, EMPTY } from 'rxjs';
import { switchMap, shareReplay, catchError, tap } from 'rxjs/operators';

/**
 * TAREA 6.6: Servicio de Polling para actualizaciones periódicas
 *
 * Características:
 * - Polling HTTP a intervalos regulares
 * - Configurable (intervalo, auto-start)
 * - Gestión de errores sin interrumpir polling
 * - ShareReplay para evitar llamadas duplicadas
 * - Control de inicio/pausa
 */
@Injectable({ providedIn: 'root' })
export class PollingService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000';

  /**
   * TAREA 6.6: Polling genérico configurable
   *
   * @param endpoint URL a consultar
   * @param intervalMs Intervalo en milisegundos (default: 30000 = 30s)
   * @returns Observable que emite resultados periódicamente
   */
  poll<T>(endpoint: string, intervalMs: number = 30000): Observable<T> {
    console.log(`🔄 Iniciando polling: ${endpoint} cada ${intervalMs}ms`);

    return timer(0, intervalMs).pipe(
      tap(iteration => console.log(`📊 Polling ${endpoint} (iteración ${iteration + 1})`)),
      switchMap(() =>
        this.http.get<T>(`${this.baseUrl}${endpoint}`).pipe(
          catchError(error => {
            console.error('❌ Error en polling:', error);
            // No interrumpir el polling, continuar en la siguiente iteración
            return EMPTY;
          })
        )
      ),
      shareReplay(1) // Compartir última respuesta entre suscriptores
    );
  }

  /**
   * TAREA 6.6: Polling de notificaciones
   */
  pollNotifications(intervalMs: number = 30000): Observable<NotificationItem[]> {
    return this.poll<NotificationItem[]>('/api/notifications', intervalMs);
  }

  /**
   * TAREA 6.6: Polling de productos (para detectar cambios)
   */
  pollProducts(intervalMs: number = 60000): Observable<ProductItem[]> {
    return this.poll<ProductItem[]>('/api/products', intervalMs);
  }

  /**
   * TAREA 6.6: Polling de estadísticas del dashboard
   */
  pollDashboardStats(intervalMs: number = 15000): Observable<DashboardStats> {
    return this.poll<DashboardStats>('/api/dashboard/stats', intervalMs);
  }
}

/**
 * Tipos para polling
 */
export interface NotificationItem {
  id: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  timestamp: string;
  read: boolean;
}

export interface ProductItem {
  id: string;
  name: string;
  price: number;
  stock: number;
  updatedAt: string;
}

export interface DashboardStats {
  totalProducts: number;
  totalValue: number;
  lowStockCount: number;
  recentOrders: number;
  timestamp: string;
}

