import { Component, OnInit, OnDestroy, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RealtimeService, WebSocketMessage, NotificationMessage } from '../../core/services/realtime.service';
import { Subject, takeUntil } from 'rxjs';

/**
 * TAREA 6.6: Componente de notificaciones en tiempo real con WebSocket
 *
 * Características:
 * - Recibe notificaciones push del servidor
 * - Muestra estado de conexión
 * - Actualiza UI automáticamente sin intervención del usuario
 * - Gestión de errores de conexión
 */
@Component({
  selector: 'app-realtime-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './realtime-notifications.html',
  styleUrls: ['./realtime-notifications.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RealtimeNotificationsComponent implements OnInit, OnDestroy {
  private realtimeService = inject(RealtimeService);
  private destroy$ = new Subject<void>();

  // TAREA 6.6: Estado del componente con signals
  notifications = signal<NotificationMessage[]>([]);
  connectionStatus = signal<'connected' | 'disconnected' | 'reconnecting'>('disconnected');
  error = signal<string | null>(null);
  unreadCount = signal(0);

  ngOnInit(): void {
    this.connectToWebSocket();
    this.listenToConnectionStatus();
    this.listenToErrors();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.realtimeService.disconnect();
  }

  /**
   * TAREA 6.6: Conectar y escuchar mensajes WebSocket
   */
  private connectToWebSocket(): void {
    try {
      this.realtimeService.connect('ws://localhost:3000/ws');

      // TAREA 6.6: Escuchar notificaciones en tiempo real
      this.realtimeService.listen<WebSocketMessage<NotificationMessage>>()
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (message) => {
            console.log('📨 Nueva notificación:', message);

            if (message.type === 'notification') {
              this.addNotification(message.payload);
            }
          },
          error: (err) => {
            console.error('❌ Error en WebSocket:', err);
            this.error.set('Error en la conexión: ' + err.message);
          }
        });
    } catch (err: any) {
      this.error.set('No se pudo conectar: ' + err.message);
    }
  }

  /**
   * TAREA 6.6: Escuchar cambios en el estado de conexión
   */
  private listenToConnectionStatus(): void {
    this.realtimeService.getConnectionStatus()
      .pipe(takeUntil(this.destroy$))
      .subscribe(status => {
        this.connectionStatus.set(status);
        console.log('🔌 Estado de conexión:', status);
      });
  }

  /**
   * Escuchar errores de conexión
   */
  private listenToErrors(): void {
    this.realtimeService.getErrors()
      .pipe(takeUntil(this.destroy$))
      .subscribe(err => {
        this.error.set(err.message);
      });
  }

  /**
   * TAREA 6.6: Agregar notificación a la lista
   * Actualización automática sin intervención del usuario
   */
  private addNotification(notification: NotificationMessage): void {
    this.notifications.update(current => [notification, ...current]);
    this.unreadCount.update(count => count + 1);

    // Mostrar toast visual
    this.showToast(notification);
  }

  /**
   * Marcar notificación como leída
   */
  markAsRead(id: string): void {
    this.unreadCount.update(count => Math.max(0, count - 1));
  }

  /**
   * Limpiar todas las notificaciones
   */
  clearAll(): void {
    this.notifications.set([]);
    this.unreadCount.set(0);
  }

  /**
   * Reconectar manualmente
   */
  reconnect(): void {
    this.error.set(null);
    this.realtimeService.disconnect();
    this.connectToWebSocket();
  }

  /**
   * Mostrar toast visual
   */
  private showToast(notification: NotificationMessage): void {
    // Aquí podrías integrar con un servicio de toasts
    console.log('🔔 Toast:', notification.message);
  }

  /**
   * Obtener icono según severidad
   */
  getIcon(severity: string): string {
    const icons: Record<string, string> = {
      info: 'ℹ️',
      warning: '⚠️',
      error: '❌',
      success: '✅'
    };
    return icons[severity] || 'ℹ️';
  }

  /**
   * Obtener clase CSS según severidad
   */
  getSeverityClass(severity: string): string {
    return `notification--${severity}`;
  }
}

