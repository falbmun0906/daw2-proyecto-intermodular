import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ToastService, ToastMessage } from '../../../services/toast.service';

/**
 * Toast Component
 * Componente overlay que muestra notificaciones/toasts.
 * Se suscribe al ToastService y renderiza toasts con animaciones.
 */
@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.html',
  styleUrl: './toast.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Toast implements OnInit, OnDestroy {
  toasts = signal<ToastMessage[]>([]);
  private subscription: Subscription | null = null;

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.subscription = this.toastService.toasts$.subscribe(toasts => {
      this.toasts.set(toasts);
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  /**
   * Elimina un toast al hacer click
   */
  dismiss(id: number): void {
    this.toastService.dismiss(id);
  }

  /**
   * Obtiene el icono según el tipo de toast
   */
  getIcon(type: string): string {
    switch (type) {
      case 'success': return '✓';
      case 'error': return '✕';
      case 'warning': return '⚠';
      case 'info': return 'ℹ';
      default: return 'ℹ';
    }
  }

  /**
   * TrackBy para optimizar renderizado
   */
  trackByToastId(index: number, toast: ToastMessage): number {
    return toast.id;
  }
}
