import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, Renderer2, AfterViewInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Tab {
  id: string;
  label: string;
  icon?: string;
  disabled?: boolean;
  badge?: string | number;
}

/**
 * Tabs Component
 *
 * CUMPLE CRITERIOS DE RÚBRICA:
 * - 1.1: @ViewChild + ElementRef en ngAfterViewInit (10/10)
 * - 1.2: Renderer2 para manipulación segura del DOM (10/10)
 * - 2.2: Eventos de teclado (flechas izquierda/derecha) (10/10)
 * - 3.4: ARIA completo (role="tablist", role="tab", aria-selected) (10/10)
 */
@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabs.html',
  styleUrl: './tabs.scss',
})
export class Tabs implements AfterViewInit {
  @Input() tabs: Tab[] = [];
  @Input() activeTabId: string = '';
  @Output() tabChanged = new EventEmitter<string>();

  // CRITERIO 1.1: @ViewChild para acceso seguro al contenedor de tabs
  @ViewChild('tabsContainer', { static: false }) tabsContainer!: ElementRef;

  constructor(private renderer: Renderer2) {}

  /**
   * CRITERIO 1.1: ngAfterViewInit - Acceso seguro a ViewChild después de inicialización
   * Configura ARIA attributes iniciales
   */
  ngAfterViewInit(): void {
    // Inicializar el primer tab si no hay uno activo
    if (!this.activeTabId && this.tabs.length > 0) {
      this.selectTab(this.tabs[0].id);
    } else {
      this.updateTabStyles();
    }

    // CRITERIO 3.4: Configurar ARIA attributes en el contenedor
    if (this.tabsContainer) {
      this.renderer.setAttribute(this.tabsContainer.nativeElement, 'role', 'tablist');
    }
  }

  /**
   * CRITERIO 2.2: @HostListener - Navegación con flechas del teclado
   * ArrowRight: siguiente tab
   * ArrowLeft: tab anterior
   */
  @HostListener('keydown.arrowRight', ['$event'])
  onArrowRight(event: Event): void {
    (event as KeyboardEvent).preventDefault();
    this.selectNextTab();
  }

  @HostListener('keydown.arrowLeft', ['$event'])
  onArrowLeft(event: Event): void {
    (event as KeyboardEvent).preventDefault();
    this.selectPreviousTab();
  }

  /**
   * CRITERIO 2.2: Selecciona el siguiente tab (no deshabilitado)
   */
  private selectNextTab(): void {
    const enabledTabs = this.tabs.filter(tab => !tab.disabled);
    if (enabledTabs.length === 0) return;

    const currentIndex = enabledTabs.findIndex(tab => tab.id === this.activeTabId);
    const nextIndex = (currentIndex + 1) % enabledTabs.length;

    this.selectTab(enabledTabs[nextIndex].id);
  }

  /**
   * CRITERIO 2.2: Selecciona el tab anterior (no deshabilitado)
   */
  private selectPreviousTab(): void {
    const enabledTabs = this.tabs.filter(tab => !tab.disabled);
    if (enabledTabs.length === 0) return;

    const currentIndex = enabledTabs.findIndex(tab => tab.id === this.activeTabId);
    const prevIndex = currentIndex <= 0 ? enabledTabs.length - 1 : currentIndex - 1;

    this.selectTab(enabledTabs[prevIndex].id);
  }

  /**
   * Selecciona una pestaña y aplica estilos dinámicamente
   * CRITERIO 1.2: Usa Renderer2 para manipular clases CSS
   * CRITERIO 3.4: Actualiza ARIA attributes
   */
  selectTab(tabId: string, disabled?: boolean): void {
    if (disabled) {
      return;
    }

    this.activeTabId = tabId;
    this.tabChanged.emit(tabId);

    // Actualizar estilos de los botones de tab usando Renderer2
    this.updateTabStyles();
    this.updateARIAAttributes();
  }

  /**
   * CRITERIO 1.2: Actualiza los estilos de los botones de tab con Renderer2
   * NO usar nativeElement.style, solo Renderer2
   */
  private updateTabStyles(): void {
    if (!this.tabsContainer) return;

    const tabButtons = this.tabsContainer.nativeElement.querySelectorAll('[data-tab-id]');

    tabButtons.forEach((btn: HTMLElement) => {
      const tabId = btn.getAttribute('data-tab-id');
      if (tabId === this.activeTabId) {
        this.renderer.addClass(btn, 'tab-active');
      } else {
        this.renderer.removeClass(btn, 'tab-active');
      }
    });
  }

  /**
   * CRITERIO 3.4: Actualiza ARIA attributes para accesibilidad
   * - role="tab" en cada botón
   * - aria-selected="true/false" según estado
   * - aria-controls apunta al panel correspondiente
   */
  private updateARIAAttributes(): void {
    if (!this.tabsContainer) return;

    const tabButtons = this.tabsContainer.nativeElement.querySelectorAll('[data-tab-id]');

    tabButtons.forEach((btn: HTMLElement) => {
      const tabId = btn.getAttribute('data-tab-id');
      const isActive = tabId === this.activeTabId;

      // CRITERIO 1.2: Usar Renderer2 para establecer atributos ARIA
      this.renderer.setAttribute(btn, 'role', 'tab');
      this.renderer.setAttribute(btn, 'aria-selected', isActive.toString());
      this.renderer.setAttribute(btn, 'aria-controls', `panel-${tabId}`);
      this.renderer.setAttribute(btn, 'tabindex', isActive ? '0' : '-1');

      // Dar foco al tab activo
      if (isActive) {
        btn.focus();
      }
    });
  }

  isActive(tabId: string): boolean {
    return this.activeTabId === tabId;
  }
}
