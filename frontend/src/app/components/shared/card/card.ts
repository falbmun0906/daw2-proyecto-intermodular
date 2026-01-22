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
   * Genera srcset para mobile (solo pequeña)
   * Igual que en el hero
   */
  get computedSmallWebp(): string {
    if (this.imageUrl && this.imageUrl.includes('/recipes/')) {
      const fileName = this.imageUrl.split('/').pop()?.replace(/\.[^/.]+$/, '') || '';
      return `assets/recipes/${fileName}-small.webp`;
    }
    return '';
  }

  /**
   * Genera srcset para desktop (mediana y grande con 1.5x)
   * Igual que en el hero
   */
  get computedLargeWebp(): string {
    if (this.imageUrl && this.imageUrl.includes('/recipes/')) {
      const fileName = this.imageUrl.split('/').pop()?.replace(/\.[^/.]+$/, '') || '';
      return `assets/recipes/${fileName}-medium.webp, assets/recipes/${fileName}-large.webp 1.5x`;
    }
    return '';
  }

  /**
   * Genera srcset automáticamente para imágenes de recetas
   * Si no se proporciona imageSrcset, intenta generarlo del imageUrl
   *
   * NOTA: Asume que las variantes existen siguiendo la convención:
   * original: assets/recipes/nombre.png
   * variantes: assets/recipes/nombre-{small,medium,large}.webp
   */
  get computedSrcset(): string {
    if (this.imageSrcset) {
      return this.imageSrcset;
    }

    // Si es una imagen de receta, generar srcset automáticamente
    if (this.imageUrl && this.imageUrl.includes('/recipes/')) {
      const fileName = this.imageUrl.split('/').pop()?.replace(/\.[^/.]+$/, '') || '';

      return `
        assets/recipes/${fileName}-small.webp 400w,
        assets/recipes/${fileName}-medium.webp 600w,
        assets/recipes/${fileName}-large.webp 800w
      `.trim().replace(/\s+/g, ' ');
    }

    return '';
  }

  /**
   * Genera URL optimizada para src (fallback)
   *
   * Usa versión MEDIUM como fallback (balance entre calidad y tamaño)
   * El navegador elegirá la correcta según viewport usando srcset+sizes
   */
  get computedSrc(): string {
    // Si el imageUrl es una receta, usa la versión optimizada en WebP (medium como fallback)
    if (this.imageUrl && this.imageUrl.includes('/recipes/')) {
      const fileName = this.imageUrl.split('/').pop()?.replace(/\.[^/.]+$/, '') || '';
      return `assets/recipes/${fileName}-medium.webp`;
    }

    // Si no, usa el URL original
    return this.imageUrl;
  }

  /**
   * Genera sizes automáticamente
   *
   * IMPORTANTE: sizes debe permitir que el navegador elija entre small, medium y large
   * según el ANCHO REAL de la tarjeta en cada viewport
   *
   * Mapeo de breakpoints a ancho real de tarjeta:
   * - Mobile pequeño (≤480px): 90vw (full width menos márgenes) → ~360px → small
   * - Mobile (481-768px): 48vw (casi mitad) → ~360px → small
   * - Tablet pequeña (769-1024px): 32vw (tercio) → ~310px → small/medium
   * - Tablet grande (1025-1200px): 24vw (cuarto) → ~290px → small/medium
   * - Desktop (>1200px): 22vw (poco menos de cuarto) → ~260px → small
   *
   * El navegador elegirá automáticamente:
   * - 360px viewport → 400w descriptor (small)
   * - 500px viewport → 600w descriptor (medium)
   * - 600px+ viewport → 800w descriptor (large)
   */
  get computedSizes(): string {
    return this.imageSizes || '(max-width: 480px) 90vw, (max-width: 768px) 48vw, (max-width: 1024px) 32vw, (max-width: 1200px) 24vw, 22vw';
  }

  /**
   * Genera background-image URL optimizado
   * Usa versión MEDIUM como fallback
   */
  get computedBackgroundImage(): string {
    if (!this.imageUrl) return 'none';

    // Si es imagen de receta, intenta WebP (medium como fallback)
    if (this.imageUrl.includes('/recipes/')) {
      const fileName = this.imageUrl.split('/').pop()?.replace(/\.[^/.]+$/, '') || '';
      return `url(assets/recipes/${fileName}-medium.webp)`;
    }

    return `url(${this.imageUrl})`;
  }

  /**
   * Maneja el click en la card
   */
  onCardClick(): void {
    this.cardClick.emit();
  }

  /**
   * Maneja el error de carga de imagen
   * Si la variante WebP no existe, carga el original PNG
   */
  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;

    // Si estamos intentando cargar una variante WebP y falló
    if (img.src.includes('-large.webp') || img.src.includes('-medium.webp') || img.src.includes('-small.webp')) {
      // Fallback: cargar el PNG original
      img.src = this.imageUrl;
      img.srcset = ''; // Limpiar srcset para no intentar variantes que no existen
      img.sizes = '';
    }
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
