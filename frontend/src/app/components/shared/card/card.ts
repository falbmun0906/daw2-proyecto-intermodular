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
   * URL de la imagen de fondo (deprecated - usar imagenUrlSmall, imagenUrlMedium, imagenUrlLarge)
   */
  @Input() imageUrl: string = '';

  /**
   * URL de la imagen pequeña (small.webp - para mobile y thumbnails)
   */
  @Input() imagenUrlSmall: string = '';

  /**
   * URL de la imagen mediana (medium.webp - para cards en desktop)
   */
  @Input() imagenUrlMedium: string = '';

  /**
   * URL de la imagen grande (large.webp - para detalles y pantallas grandes)
   */
  @Input() imagenUrlLarge: string = '';

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
   * Etiquetas de la receta (ej: ["vegetariano", "sin gluten"])
   */
  @Input() tags: string[] = [];

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
   * Usa imagenUrlSmall si está disponible
   */
  get computedSmallWebp(): string {
    // Solo usar URLs completas desde el backend
    return this.imagenUrlSmall || '';
  }

  /**
   * Genera srcset para desktop (mediana y grande con 1.5x)
   * Usa imagenUrlMedium e imagenUrlLarge si están disponibles
   */
  get computedLargeWebp(): string {
    // Solo usar URLs completas desde el backend
    if (this.imagenUrlMedium && this.imagenUrlLarge) {
      return `${this.imagenUrlMedium}, ${this.imagenUrlLarge} 1.5x`;
    }
    return '';
  }

  /**
   * Genera srcset automáticamente para imágenes responsivas
   * Usa las propiedades imagenUrlSmall, imagenUrlMedium, imagenUrlLarge
   */
  get computedSrcset(): string {
    if (this.imageSrcset) {
      return this.imageSrcset;
    }

    // Si tenemos las 3 URLs específicas, usarlas
    if (this.imagenUrlSmall && this.imagenUrlMedium && this.imagenUrlLarge) {
      return `${this.imagenUrlSmall} 400w, ${this.imagenUrlMedium} 600w, ${this.imagenUrlLarge} 800w`;
    }

    return '';
  }

  /**
   * Genera URL optimizada para src (fallback)
   * Usa imagenUrlMedium como fallback (balance entre calidad y tamaño)
   */
  get computedSrc(): string {
    // Solo usar URLs completas desde el backend
    return this.imagenUrlMedium || this.imagenUrlSmall || this.imageUrl || '';
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
   * Usa imagenUrlMedium si está disponible
   */
  get computedBackgroundImage(): string {
    // Solo usar URLs completas desde el backend
    if (this.imagenUrlMedium) {
      return `url(${this.imagenUrlMedium})`;
    }

    if (this.imageUrl && this.imageUrl.startsWith('http')) {
      return `url(${this.imageUrl})`;
    }

    return 'none';
  }

  /**
   * Maneja el click en la card
   */
  onCardClick(): void {
    this.cardClick.emit();
  }

  /**
   * Maneja el error de carga de imagen
   * Si la variante WebP no existe, intenta cargar el fallback
   */
  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;

    // Si estamos intentando cargar una variante WebP y falló
    if (img.src.includes('-large.webp') || img.src.includes('-medium.webp') || img.src.includes('-small.webp')) {
      // Si tenemos una URL alternativa desde el backend, intentar cargarla
      if (this.imageUrl && this.imageUrl.startsWith('http')) {
        img.src = this.imageUrl;
        img.srcset = '';
        img.sizes = '';
      } else {
        // Sino, solo limpiar srcset para no volver a intentar
        img.srcset = '';
        img.sizes = '';
        // El navegador mantendrá src como está (que ha fallado)
      }
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

  /**
   * Obtiene la variante del badge según la dificultad
   */
  getDifficultyVariant(): 'success' | 'warning' | 'error' {
    const difficultyUpper = this.difficulty.toUpperCase();
    if (difficultyUpper === 'BAJA') return 'success';
    if (difficultyUpper === 'MEDIA') return 'warning';
    if (difficultyUpper === 'ALTA') return 'error';
    return 'warning'; // default
  }

  /**
   * Obtiene el label traducido de la dificultad
   */
  getDifficultyLabel(): string {
    const difficultyUpper = this.difficulty.toUpperCase();
    if (difficultyUpper === 'BAJA') return 'Fácil';
    if (difficultyUpper === 'MEDIA') return 'Media';
    if (difficultyUpper === 'ALTA') return 'Difícil';
    return this.difficulty;
  }

  /**
   * Formatea una etiqueta para mostrarla de forma legible
   * Ej: "DIETA_MEDITERRANEA" -> "Dieta Mediterránea"
   */
  formatTag(tag: string): string {
    if (!tag) return '';

    // Reemplazar guiones bajos por espacios y convertir a Title Case
    return tag
      .replace(/_/g, ' ')
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
