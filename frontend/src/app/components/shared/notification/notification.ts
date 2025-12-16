import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';
export type NotificationPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';

@Component({
  selector: 'app-notification',
  imports: [],
  templateUrl: './notification.html',
  styleUrl: './notification.scss',
})
export class Notification implements OnInit, OnDestroy {
  @Input() type: NotificationType = 'info';
  @Input() title: string = '';
  @Input() message: string = '';
  @Input() position: NotificationPosition = 'top-right';
  @Input() duration: number = 5000; // 5 segundos por defecto (0 = no auto-cierre)
  @Input() dismissible: boolean = true;
  @Input() icon: string = '';
  @Output() dismissed = new EventEmitter<void>();

  isVisible: boolean = false;
  isAnimatingOut: boolean = false;
  private autoCloseTimer?: number;

  get notificationIcon(): string {
    if (this.icon) {
      return this.icon;
    }

    // Iconos por defecto según el tipo
    switch (this.type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'warning':
        return '⚠';
      case 'info':
        return 'ℹ';
      default:
        return 'ℹ';
    }
  }

  get ariaRole(): string {
    return this.type === 'error' ? 'alert' : 'status';
  }

  ngOnInit(): void {
    // Pequeño delay para activar la animación de entrada
    setTimeout(() => {
      this.isVisible = true;
    }, 10);

    // Configurar auto-cierre si duration > 0
    if (this.duration > 0) {
      this.autoCloseTimer = window.setTimeout(() => {
        this.onDismiss();
      }, this.duration);
    }
  }

  ngOnDestroy(): void {
    if (this.autoCloseTimer) {
      clearTimeout(this.autoCloseTimer);
    }
  }

  onDismiss(): void {
    this.isAnimatingOut = true;
    this.isVisible = false;

    // Esperar a que termine la animación antes de emitir el evento
    setTimeout(() => {
      this.dismissed.emit();
    }, 300); // Duración de la transición
  }
}
