import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Componente Button reutilizable
 *
 * Soporta múltiples variantes, tamaños y estados.
 * Implementa BEM para nomenclatura de clases.
 */
@Component({
  selector: 'app-button',
  imports: [CommonModule],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
  /**
   * Variante del botón
   * - 'primary': Color secundario (amarillo), para acciones principales
   * - 'secondary': Color primario (verde), para acciones secundarias
   * - 'ghost': Sin fondo, solo texto y borde
   * - 'danger': Color rojo, para acciones destructivas
   */
  @Input() variant: 'primary' | 'secondary' | 'ghost' | 'danger' = 'primary';

  /**
   * Tamaño del botón
   * - 'sm': Pequeño
   * - 'md': Mediano (por defecto)
   * - 'lg': Grande
   */
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * Tipo de botón HTML
   */
  @Input() type: 'button' | 'submit' | 'reset' = 'button';

  /**
   * Estado deshabilitado
   */
  @Input() disabled: boolean = false;

  /**
   * Ancho completo (100%)
   */
  @Input() fullWidth: boolean = false;

  /**
   * Icono opcional (emoji o texto)
   */
  @Input() icon: string = '';

  /**
   * Posición del icono
   */
  @Input() iconPosition: 'left' | 'right' = 'left';

  /**
   * Evento de click
   */
  @Output() buttonClick = new EventEmitter<MouseEvent>();

  /**
   * Genera las clases CSS del botón
   */
  get buttonClasses(): string {
    const classes = ['button'];

    // Variante
    classes.push(`button--${this.variant}`);

    // Tamaño
    classes.push(`button--${this.size}`);

    // Ancho completo
    if (this.fullWidth) {
      classes.push('button--full-width');
    }

    // Deshabilitado
    if (this.disabled) {
      classes.push('button--disabled');
    }

    // Con icono
    if (this.icon) {
      classes.push('button--with-icon');
    }

    return classes.join(' ');
  }

  /**
   * Maneja el click del botón
   */
  onClick(event: MouseEvent): void {
    if (!this.disabled) {
      this.buttonClick.emit(event);
    }
  }
}

