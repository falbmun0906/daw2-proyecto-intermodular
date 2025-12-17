import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';

export type AlertType = 'success' | 'error' | 'warning' | 'info';

/**
 * Alert Component
 * Componente para mostrar mensajes de alerta con diferentes tipos (success, error, warning, info).
 * Implementa manipulación del DOM con ViewChild, ElementRef y Renderer2 para animaciones y estilos dinámicos.
 */
@Component({
  selector: 'app-alert',
  imports: [],
  templateUrl: './alert.html',
  styleUrl: './alert.scss',
})
export class Alert implements AfterViewInit {
  @Input() type: AlertType = 'info';
  @Input() title: string = '';
  @Input() message: string = '';
  @Input() dismissible: boolean = true;
  @Input() icon: string = '';
  @Output() dismissed = new EventEmitter<void>();

  @ViewChild('alertContainer', { static: false }) alertContainer!: ElementRef;

  isVisible: boolean = true;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    // Aplicar animación de entrada al alert usando Renderer2
    if (this.alertContainer) {
      this.renderer.addClass(this.alertContainer.nativeElement, 'alert--fade-in');
    }
  }

  get alertIcon(): string {
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

  /**
   * Cierra el alert con animación de salida usando Renderer2
   */
  onDismiss(): void {
    if (this.alertContainer) {
      // Aplicar clase de animación de salida
      this.renderer.addClass(this.alertContainer.nativeElement, 'alert--fade-out');

      // Esperar a que termine la animación antes de ocultar
      setTimeout(() => {
        this.isVisible = false;
        this.dismissed.emit();
      }, 300);
    } else {
      this.isVisible = false;
      this.dismissed.emit();
    }
  }
}
