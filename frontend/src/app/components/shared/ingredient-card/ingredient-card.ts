import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ingredient-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ingredient-card.html',
  styleUrl: './ingredient-card.scss'
})
export class IngredientCard {
  @Input() name: string = '';
  @Input() quantity: string = '';

  /**
   * URL de imagen simple (deprecated - usar imagenUrlSmall, imagenUrlMedium, imagenUrlLarge)
   */
  @Input() imageUrl: string = '';

  /**
   * URL de la imagen pequeña (small.webp - 200px - para thumbnails)
   */
  @Input() imagenUrlSmall: string = '';

  /**
   * URL de la imagen mediana (medium.webp - 400px - para cards)
   */
  @Input() imagenUrlMedium: string = '';

  /**
   * URL de la imagen grande (large.webp - 600px - para detalles)
   */
  @Input() imagenUrlLarge: string = '';

  private readonly imageBaseUrl = 'http://localhost:8080/images';

  /**
   * Obtiene la URL de imagen a usar como src
   * Prioriza imagenUrlSmall para thumbnails
   */
  get imageSrc(): string {
    if (this.imagenUrlSmall) {
      return this.imagenUrlSmall;
    }

    // Fallback: si tenemos imageUrl (slug), generar la URL
    if (this.imageUrl) {
      // Si ya es una URL completa, usarla
      if (this.imageUrl.startsWith('http')) {
        return this.imageUrl;
      }
      // Si es un slug, construir la URL
      let slug = this.imageUrl;
      if (slug.includes('-small.webp')) {
        slug = slug.replace(/-small\.webp$/, '');
      }
      return `${this.imageBaseUrl}/ingredientes/${slug}-small.webp`;
    }

    // Último fallback: generar slug desde el nombre
    if (this.name) {
      const slug = this.generateSlug(this.name);
      return `${this.imageBaseUrl}/ingredientes/${slug}-small.webp`;
    }

    return 'assets/ingredients/default.webp';
  }

  /**
   * Genera el srcset para imágenes responsivas
   */
  get imageSrcset(): string {
    if (this.imagenUrlSmall && this.imagenUrlMedium && this.imagenUrlLarge) {
      return `${this.imagenUrlSmall} 200w, ${this.imagenUrlMedium} 400w, ${this.imagenUrlLarge} 600w`;
    }

    // Fallback: generar desde imageUrl si existe
    if (this.imageUrl && !this.imageUrl.startsWith('http')) {
      let slug = this.imageUrl;
      if (slug.includes('-small.webp') || slug.includes('-medium.webp') || slug.includes('-large.webp')) {
        slug = slug.replace(/-small\.webp$/, '').replace(/-medium\.webp$/, '').replace(/-large\.webp$/, '');
      }
      return `${this.imageBaseUrl}/ingredientes/${slug}-small.webp 200w, ${this.imageBaseUrl}/ingredientes/${slug}-medium.webp 400w, ${this.imageBaseUrl}/ingredientes/${slug}-large.webp 600w`;
    }

    // Último fallback: generar desde el nombre
    if (this.name) {
      const slug = this.generateSlug(this.name);
      return `${this.imageBaseUrl}/ingredientes/${slug}-small.webp 200w, ${this.imageBaseUrl}/ingredientes/${slug}-medium.webp 400w, ${this.imageBaseUrl}/ingredientes/${slug}-large.webp 600w`;
    }

    return '';
  }

  /**
   * Genera un slug desde el nombre del ingrediente
   */
  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }
}

