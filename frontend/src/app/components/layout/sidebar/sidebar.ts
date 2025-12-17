import { Component, EventEmitter, Input, Output, ViewChild, ElementRef, Renderer2, OnChanges, SimpleChanges } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

/**
 * Sidebar Component
 * Menú lateral de navegación con toggle de apertura/cierre.
 * Implementa manipulación del DOM con Renderer2 para controlar el scroll del body y aplicar estilos dinámicos.
 */
@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar implements OnChanges {
  @Input() isOpen: boolean = false;
  @Input() activeRoute: string = '';
  @Output() close = new EventEmitter<void>();

  @ViewChild('sidebarElement', { static: false }) sidebarElement!: ElementRef;

  constructor(private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    // Cuando cambia el estado de isOpen, manejar el scroll del body
    if (changes['isOpen']) {
      if (this.isOpen) {
        // Prevenir scroll del body cuando el sidebar está abierto (en mobile)
        this.renderer.setStyle(document.body, 'overflow', 'hidden');
      } else {
        // Restaurar scroll del body
        this.renderer.setStyle(document.body, 'overflow', '');
      }
    }
  }

  onClose() {
    this.close.emit();
  }

  onLinkClick() {
    // Cerrar sidebar en mobile al hacer click en un enlace
    this.close.emit();
  }
}
