import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
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
 * FASE 1 - Tarea 1: Implementa manipulación del DOM usando:
 * - @ViewChild: Accede a elementos del template
 * - Renderer2: Aplica estilos y clases CSS dinámicamente
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

  // Referencias a elementos del DOM
  @ViewChild('tabsContainer', { static: false }) tabsContainer!: ElementRef;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    // Inicializar el primer tab si no hay uno activo
    if (!this.activeTabId && this.tabs.length > 0) {
      this.selectTab(this.tabs[0].id);
    }
  }

  /**
   * Selecciona una pestaña y aplica estilos dinámicamente
   * - Emite evento de cambio
   * - Manipula clases CSS de los botones de tab
   */
  selectTab(tabId: string, disabled?: boolean): void {
    if (disabled) {
      return;
    }

    this.activeTabId = tabId;
    this.tabChanged.emit(tabId);

    // Actualizar estilos de los botones de tab usando Renderer2
    this.updateTabStyles();
  }

  /**
   * Actualiza los estilos de los botones de tab
   * Marca con clase activa el tab seleccionado
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

  isActive(tabId: string): boolean {
    return this.activeTabId === tabId;
  }
}
