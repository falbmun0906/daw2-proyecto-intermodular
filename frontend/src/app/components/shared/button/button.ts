import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Icon } from '../icon/icon';
/**
 * Componente Button reutilizable
 *
 * Soporta múltiples variantes, tamaños y estados.
 * Implementa BEM para nomenclatura de clases.
 */
@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, Icon],
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
   * - 'cta': Call-To-Action, variante destacada con sombra y escala
   */
  @Input() variant: 'primary' | 'secondary' | 'ghost' | 'danger' | 'cta' = 'primary';

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
   * Icono opcional (SVG string, emoji o texto)
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

  /**
   * Verifica si el icono es un nombre válido
   */
  isLucideIcon(iconName: string): boolean {
    const validIcons = [
      'search', 'filter', 'settings', 'heart', 'star', 'arrow-right',
      'chevron-right', 'home', 'user', 'menu', 'x', 'check',
      'alert-circle', 'info', 'trash2', 'edit', 'eye', 'plus',
      'mail', 'lock', 'google', 'facebook', 'x-icon', 'chef-hat',
      'utensils', 'fire'
    ];
    return validIcons.includes(iconName);
  }

  /**
   * Calcula el tamaño del icono dinámicamente según el tamaño del botón
   * Para variante CTA y lg, el icono es del tamaño de la fuente
   */
  get iconSize(): number {
    // Para CTA, el icono es más grande (proporcional al tamaño del texto)
    if (this.variant === 'cta') {
      if (this.size === 'lg') {
        return 28; // Para CTA lg
      } else if (this.size === 'md') {
        return 22; // Para CTA md
      }
    }

    // Para otros tamaños
    switch (this.size) {
      case 'sm':
        return 16;
      case 'lg':
        return 24;
      case 'md':
      default:
        return 20;
    }
  }
}

