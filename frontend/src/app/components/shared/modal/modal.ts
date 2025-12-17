import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, OnChanges, SimpleChanges, HostListener, ViewChild, ElementRef, Renderer2 } from '@angular/core';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

/**
 * Modal Component
 * FASE 1 - Tarea 1: Implementa manipulación del DOM usando:
 * - @ViewChild: Accede a elementos del template
 * - ElementRef: Obtiene referencias nativas del DOM
 * - Renderer2: Manipula el DOM de forma segura y compatible
 */
@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
})
export class Modal implements OnInit, OnDestroy, OnChanges {
  @Input() isOpen: boolean = false;
  @Input() title: string = '';
  @Input() size: ModalSize = 'md';
  @Input() showCloseButton: boolean = true;
  @Input() closeOnOverlayClick: boolean = true;
  @Input() closeOnEscape: boolean = true;
  @Output() closed = new EventEmitter<void>();
  @Output() opened = new EventEmitter<void>();

  // Referencias a elementos del DOM mediante @ViewChild
  @ViewChild('modalDialog', { static: false }) modalDialog!: ElementRef;
  @ViewChild('modalOverlay', { static: false }) modalOverlay!: ElementRef;

  isVisible: boolean = false;
  isAnimatingIn: boolean = false;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    if (this.isOpen) {
      this.open();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen']) {
      if (changes['isOpen'].currentValue) {
        this.open();
      } else if (!changes['isOpen'].firstChange) {
        this.close();
      }
    }
  }

  ngOnDestroy(): void {
    this.close();
  }

  @HostListener('document:keydown.escape')
  handleEscapeKey(): void {
    if (this.closeOnEscape && this.isOpen) {
      this.close();
    }
  }

  /**
   * Abre el modal de forma segura usando Renderer2
   * - Modifica el overflow del body con Renderer2
   * - Aplica clases CSS al modal para animación
   */
  open(): void {
    this.isVisible = true;

    // Usar Renderer2 para modificar el body de forma segura
    this.renderer.setStyle(document.body, 'overflow', 'hidden');

    // Pequeño delay para activar animación
    setTimeout(() => {
      this.isAnimatingIn = true;
      this.opened.emit();
    }, 10);
  }

  /**
   * Cierra el modal de forma segura
   * - Desactiva animación de entrada
   * - Restaura el overflow del body
   * - Emite evento de cierre
   */
  close(): void {
    this.isAnimatingIn = false;

    // Esperar animación de salida
    setTimeout(() => {
      this.isVisible = false;
      // Restaurar scroll del body con Renderer2
      this.renderer.setStyle(document.body, 'overflow', '');
      this.closed.emit();
    }, 300);
  }

  /**
   * Maneja el click en el overlay
   * Si closeOnOverlayClick está activo, cierra el modal
   * Detiene la propagación para evitar que el evento llegue a elementos padres
   */
  onOverlayClick(event: MouseEvent): void {
    // Solo cerrar si el click fue directamente en el overlay (no en el contenido)
    if (this.closeOnOverlayClick && event.target === event.currentTarget) {
      event.stopPropagation(); // Detener propagación del evento
      this.close();
    }
  }

  /**
   * Maneja clicks en el contenido del modal
   * Detiene la propagación para evitar que el click cierre el modal
   */
  onContentClick(event: MouseEvent): void {
    event.stopPropagation();
  }

  /**
   * Maneja el doble click en el overlay
   * Permite cerrar con doble click si está configurado
   */
  onOverlayDoubleClick(event: MouseEvent): void {
    if (this.closeOnOverlayClick) {
      event.preventDefault();
      this.close();
    }
  }
}
