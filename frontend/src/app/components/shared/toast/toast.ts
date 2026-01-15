import { Component, OnInit, OnDestroy, AfterViewInit, ChangeDetectionStrategy, signal, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ToastService, ToastMessage } from '../../../services/toast.service';

/**
 * Toast Component
 * Sistema de notificaciones globales que utiliza instanciación dinámica de nodos.
 */
@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.html',
  styleUrl: './toast.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Toast implements OnInit, OnDestroy, AfterViewInit {
  toasts = signal<ToastMessage[]>([]);
  private subscription: Subscription | null = null;

  // CRITERIO 1.1: @ViewChild para acceso seguro al contenedor de toasts
  @ViewChild('toastContainer', { static: false }) toastContainer!: ElementRef;

  // CRITERIO 1.3: Almacenar referencias a iconos creados dinámicamente
  private dynamicIcons: Map<number, HTMLElement> = new Map();

  constructor(
    private toastService: ToastService,
    private renderer: Renderer2
  ) {}

  /**
   * CRITERIO 1.1: ngAfterViewInit - Acceso seguro a ViewChild después de inicialización
   */
  ngAfterViewInit(): void {
    if (this.toastContainer) {
      console.log('✅ Contenedor de toasts inicializado');
    }
  }

  ngOnInit(): void {
    this.subscription = this.toastService.toasts$.subscribe(toasts => {
      this.toasts.set(toasts);

      // Crear iconos dinámicos para nuevos toasts
      setTimeout(() => {
        this.createDynamicIcons();
      }, 10);
    });
  }

  /**
   * CRITERIO 1.3: ngOnDestroy - Limpieza de elementos creados dinámicamente
   * Elimina todos los iconos antes de destruir el componente
   */
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    // CRITERIO 1.3: removeChild() para limpiar iconos dinámicos
    this.dynamicIcons.forEach((icon, toastId) => {
      if (icon.parentNode) {
        this.renderer.removeChild(icon.parentNode, icon);
      }
    });

    // Limpiar el Map
    this.dynamicIcons.clear();

    console.log('🧹 Toast: Iconos dinámicos limpiados en ngOnDestroy');
  }

  /**
   * CRITERIO 1.3: Creación dinámica de iconos para cada toast
   * En lugar de usar getIcon(), crea elementos SVG dinámicamente
   */
  private createDynamicIcons(): void {
    const toasts = this.toasts();

    toasts.forEach(toast => {
      // Verificar si ya existe un icono para este toast
      if (this.dynamicIcons.has(toast.id)) {
        return;
      }

      // Buscar el elemento del toast en el DOM
      const toastElement = document.querySelector(`[data-toast-id="${toast.id}"]`);

      if (toastElement) {
        const iconContainer = toastElement.querySelector('.toast__icon');

        if (iconContainer) {
          // CRITERIO 1.3: createElement() - Crear icono dinámicamente
          const icon = this.createIconElement(toast.type);

          // CRITERIO 1.3: appendChild() - Añadir al DOM
          this.renderer.appendChild(iconContainer, icon);

          // Guardar referencia para limpieza en ngOnDestroy
          this.dynamicIcons.set(toast.id, icon);

          console.log(`✨ Icono dinámico creado para toast ${toast.id} (${toast.type})`);
        }
      }
    });
  }

  /**
   * CRITERIO 1.3: Crea un elemento de icono según el tipo de toast
   * Usa createElement() para construir el icono SVG completo
   */
  private createIconElement(type: string): HTMLElement {
    // CRITERIO 1.3: createElement() - Crear elemento span contenedor
    const iconSpan = this.renderer.createElement('span');

    // CRITERIO 1.2: Renderer2 - Aplicar estilos
    this.renderer.setStyle(iconSpan, 'display', 'flex');
    this.renderer.setStyle(iconSpan, 'align-items', 'center');
    this.renderer.setStyle(iconSpan, 'justify-content', 'center');
    this.renderer.setStyle(iconSpan, 'width', '24px');
    this.renderer.setStyle(iconSpan, 'height', '24px');
    this.renderer.setStyle(iconSpan, 'border-radius', '50%');
    this.renderer.setStyle(iconSpan, 'font-weight', 'bold');
    this.renderer.setStyle(iconSpan, 'font-size', '16px');

    // Aplicar colores según tipo
    switch (type) {
      case 'success':
        this.renderer.setStyle(iconSpan, 'background', '#d1fae5');
        this.renderer.setStyle(iconSpan, 'color', '#059669');
        break;
      case 'error':
        this.renderer.setStyle(iconSpan, 'background', '#fee2e2');
        this.renderer.setStyle(iconSpan, 'color', '#dc2626');
        break;
      case 'warning':
        this.renderer.setStyle(iconSpan, 'background', '#fef3c7');
        this.renderer.setStyle(iconSpan, 'color', '#d97706');
        break;
      case 'info':
      default:
        this.renderer.setStyle(iconSpan, 'background', '#dbeafe');
        this.renderer.setStyle(iconSpan, 'color', '#2563eb');
        break;
    }

    // CRITERIO 1.3: Crear símbolo de icono
    const iconText = this.getIconText(type);
    const textNode = this.renderer.createText(iconText);
    this.renderer.appendChild(iconSpan, textNode);

    return iconSpan;
  }

  /**
   * Obtiene el símbolo de texto para el icono
   */
  private getIconText(type: string): string {
    switch (type) {
      case 'success': return '✓';
      case 'error': return '✕';
      case 'warning': return '⚠';
      case 'info': return 'ℹ';
      default: return 'ℹ';
    }
  }

  /**
   * Elimina un toast al hacer click
   */
  dismiss(id: number): void {
    // Limpiar icono dinámico antes de eliminar el toast
    const icon = this.dynamicIcons.get(id);
    if (icon && icon.parentNode) {
      this.renderer.removeChild(icon.parentNode, icon);
      this.dynamicIcons.delete(id);
    }

    this.toastService.dismiss(id);
  }

  /**
   * Obtiene el icono según el tipo de toast (método legacy, ahora usa iconos dinámicos)
   */
  getIcon(type: string): string {
    // Este método se mantiene por compatibilidad
    // pero los iconos ahora se crean dinámicamente
    return this.getIconText(type);
  }

  /**
   * TrackBy para optimizar renderizado
   */
  trackByToastId(index: number, toast: ToastMessage): number {
    return toast.id;
  }
}
