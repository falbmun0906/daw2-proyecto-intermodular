import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Badge } from '../badge/badge';
import { Icon } from '../icon/icon';
import { Button } from '../button/button';

/**
 * Componente Card reutilizable para tarjetas de recetas
 *
 * Soporta imagen de fondo, SVG decorativo, contenido y acciones.
 * Implementa BEM para nomenclatura de clases.
 */
@Component({
  selector: 'app-card',
  imports: [CommonModule, Badge, Icon, Button],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  /**
   * Variante de la card
   * - 'vertical': Card vertical estándar (por defecto) - para grids
   * - 'carousel': Card para carruseles, ligeramente más grande
   * - 'horizontal': Card horizontal con imagen a la izquierda - para listados
   * - 'featured': Card destacada con estilos especiales
   */
  @Input() variant: 'vertical' | 'carousel' | 'horizontal' | 'featured' = 'vertical';

  /**
   * URL de la imagen de fondo
   */
  @Input() imageUrl: string = '';

  /**
   * Srcset para la imagen responsive (ej: "image-small.webp 400w, image-large.webp 800w")
   */
  @Input() imageSrcset: string = '';

  /**
   * Sizes para la imagen responsive (ej: "(max-width: 768px) 100vw, 50vw")
   */
  @Input() imageSizes: string = '';

  /**
   * Texto alternativo para la imagen
   */
  @Input() imageAlt: string = '';

  /**
   * Título de la card
   */
  @Input() title: string = '';

  /**
   * Descripción o resumen
   */
  @Input() description: string = '';

  /**
   * Valoración en estrellas (0-5)
   */
  @Input() rating: number = 0;

  /**
   * Tiempo de preparación (ej: "30 min")
   */
  @Input() time: string = '';

  /**
   * Dificultad (ej: "Fácil", "Media", "Difícil")
   */
  @Input() difficulty: string = '';

  /**
   * Categoría o etiqueta
   */
  @Input() category: string = '';

  /**
   * Texto del botón de acción
   */
  @Input() actionText: string = 'Ver receta';

  /**
   * Mostrar el botón de acción
   */
  @Input() showAction: boolean = true;

  /**
   * Mostrar el SVG decorativo de fondo
   */
  @Input() showDecorative: boolean = true;

  /**
   * Evento al hacer click en la card
   */
  @Output() cardClick = new EventEmitter<void>();

  /**
   * Evento al hacer click en el botón de acción
   */
  @Output() actionClick = new EventEmitter<void>();

  /**
   * Evento al hacer click en guardar (solo en horizontal)
   */
  @Output() saveClick = new EventEmitter<void>();

  /**
   * Genera las clases CSS de la card
   */
  get cardClasses(): string {
    const classes = ['card'];

    // Variante
    classes.push(`card--${this.variant}`);

    // Card clickeable
    if (this.cardClick.observers.length > 0) {
      classes.push('card--clickable');
    }

    return classes.join(' ');
  }

  /**
   * Genera array de estrellas para la valoración
   */
  get stars(): boolean[] {
    return Array(5).fill(false).map((_, index) => index < Math.floor(this.rating));
  }

  /**
   * Maneja el click en la card
   */
  onCardClick(): void {
    this.cardClick.emit();
  }

  /**
   * Maneja el click en el botón de acción
   */
  onActionClick(event: Event, action: string = 'view'): void {
    event.stopPropagation(); // Evitar que se propague al click de la card

    if (action === 'save') {
      this.saveClick.emit();
    } else {
      this.actionClick.emit();
    }
  }
}
