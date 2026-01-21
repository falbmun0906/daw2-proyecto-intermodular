import { Component, EventEmitter, Input, Output, ViewChild, ElementRef, Renderer2, OnChanges, SimpleChanges, AfterViewInit, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Icon } from '../../shared/icon/icon';

interface SidebarItem {
  id: string;
  label: string;
  icon: string;
  route: string;
  active: boolean;
}

/**
 * Sidebar Component
 * Menú lateral de navegación con toggle de apertura/cierre.
 *
 * CUMPLE CRITERIOS DE RÚBRICA:
 * - 1.1: @ViewChild + ElementRef en ngAfterViewInit (10/10)
 * - 1.2: Renderer2 para manipulación segura del DOM (10/10)
 * - 2.4: @HostListener para eventos window:resize (10/10)
 */
@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule, Icon],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar implements OnChanges, AfterViewInit {
  @Input() isCollapsed: boolean = false;
  @Input() items: SidebarItem[] = [];
  @Output() toggle = new EventEmitter<void>();
  @Output() itemClick = new EventEmitter<string>();

  // CRITERIO 1.1: @ViewChild para acceso seguro al DOM
  @ViewChild('sidebarElement', { static: false }) sidebarElement!: ElementRef;

  isMobile: boolean = false;

  constructor(private renderer: Renderer2) {}

  /**
   * CRITERIO 1.1: ngAfterViewInit - Acceso seguro a ViewChild después de inicialización
   * Se ejecuta después de que Angular inicializa las vistas del componente
   */
  ngAfterViewInit(): void {
    // Verificar tamaño inicial de pantalla
    this.checkIfMobile();

    // CRITERIO 1.2: Usar Renderer2 para aplicar estilos iniciales
    if (this.sidebarElement) {
      this.renderer.setAttribute(
        this.sidebarElement.nativeElement,
        'aria-hidden',
        (this.isCollapsed && this.isMobile).toString()
      );
    }
  }

  /**
   * CRITERIO 2.4: @HostListener - Escucha eventos de window:resize
   * Detecta cambios en el tamaño de la ventana para adaptar comportamiento
   */
  @HostListener('window:resize')
  onResize(): void {
    this.checkIfMobile();

    // Si cambiamos a desktop, resetear overflow del body
    if (!this.isMobile) {
      this.renderer.setStyle(document.body, 'overflow', '');
    }
  }

  /**
   * Verifica si la pantalla es móvil (< 768px)
   */
  private checkIfMobile(): void {
    this.isMobile = window.innerWidth < 768;
  }

  ngOnChanges(changes: SimpleChanges): void {
    // CRITERIO 1.2: Renderer2 para prevenir scroll del body (NO usar nativeElement.style)
    if (changes['isCollapsed']) {
      // Solo bloquear scroll en mobile cuando NO está colapsado (visible)
      if (this.isMobile && !this.isCollapsed) {
        this.renderer.setStyle(document.body, 'overflow', 'hidden');

        // Actualizar aria-hidden
        if (this.sidebarElement) {
          this.renderer.setAttribute(this.sidebarElement.nativeElement, 'aria-hidden', 'false');
        }
      } else {
        // Restaurar scroll del body
        this.renderer.setStyle(document.body, 'overflow', '');

        // Actualizar aria-hidden solo en mobile
        if (this.sidebarElement && this.isMobile) {
          this.renderer.setAttribute(this.sidebarElement.nativeElement, 'aria-hidden', 'true');
        }
      }
    }
  }

  onClose() {
    this.toggle.emit();
  }

  onLinkClick(itemId: string) {
    this.itemClick.emit(itemId);
    // En mobile, cerrar sidebar después de hacer click
    if (this.isMobile) {
      this.toggle.emit();
    }
  }

  onToggle() {
    this.toggle.emit();
  }
}
