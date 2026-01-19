import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Icon } from '../icon/icon';

/**
 * CarouselNavButton Component
 * Botón de navegación vertical para carruseles con chevron dinámico
 *
 * @example
 * <app-carousel-nav-button
 *   direction="prev"
 *   [disabled]="isAtStart"
 *   (navigate)="onPrevClick()"
 * ></app-carousel-nav-button>
 */
@Component({
  selector: 'app-carousel-nav-button',
  standalone: true,
  imports: [CommonModule, Icon],
  templateUrl: './carousel-nav-button.html',
  styleUrl: './carousel-nav-button.scss',
})
export class CarouselNavButton {
  /**
   * Dirección del botón: 'prev' para izquierda, 'next' para derecha
   */
  @Input() direction: 'prev' | 'next' = 'prev';

  /**
   * Estado deshabilitado del botón
   */
  @Input() disabled: boolean = false;

  /**
   * Evento emitido al hacer click en el botón
   */
  @Output() navigate = new EventEmitter<'prev' | 'next'>();

  /**
   * Estado de presión (para efecto active)
   */
  isPressed: boolean = false;

  /**
   * Obtiene el aria-label dinámico según la dirección
   */
  get ariaLabel(): string {
    return this.direction === 'prev'
      ? 'Ir al carrusel anterior'
      : 'Ir al carrusel siguiente';
  }

  /**
   * Obtiene el nombre del icono según la dirección
   */
  get iconName(): string {
    return this.direction === 'prev' ? 'chevron-left' : 'chevron-right';
  }

  /**
   * Maneja el click del botón
   */
  onClick(): void {
    if (!this.disabled) {
      this.navigate.emit(this.direction);
    }
  }

  /**
   * Maneja el evento mousedown para efecto de presión
   */
  @HostListener('mousedown')
  onMouseDown(): void {
    if (!this.disabled) {
      this.isPressed = true;
    }
  }

  /**
   * Maneja el evento mouseup para efecto de presión
   */
  @HostListener('mouseup')
  onMouseUp(): void {
    this.isPressed = false;
  }

  /**
   * Maneja el evento mouseleave para cancelar efecto de presión
   */
  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.isPressed = false;
  }
}

