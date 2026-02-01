import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Badge } from '../badge/badge';
import { Button } from '../button/button';

@Component({
  selector: 'app-meal-card',
  standalone: true,
  imports: [CommonModule, Badge, Button],
  templateUrl: './meal-card.html',
  styleUrl: './meal-card.scss'
})
export class MealCard {
  @Input() time: string = '';
  @Input() title: string = '';

  /**
   * URL de imagen simple (deprecated - usar imagenUrlSmall, imagenUrlMedium, imagenUrlLarge)
   */
  @Input() imageUrl: string = '';

  /**
   * URL de la imagen pequeña (small.webp - 400px - para mobile)
   */
  @Input() imagenUrlSmall: string = '';

  /**
   * URL de la imagen mediana (medium.webp - 600px - para tablets)
   */
  @Input() imagenUrlMedium: string = '';

  /**
   * URL de la imagen grande (large.webp - 800px - para desktop)
   */
  @Input() imagenUrlLarge: string = '';

  @Input() rating: number = 0;
  @Input() tags: string[] = [];
  @Input() isPrimary: boolean = false;
  @Output() viewRecipe = new EventEmitter<void>();

  get stars(): boolean[] {
    return Array(5).fill(false).map((_, index) => index < Math.floor(this.rating));
  }

  /**
   * Obtiene la URL de imagen para background
   * Prioriza imagenUrlMedium como balance entre calidad y tamaño
   */
  get computedBackgroundImage(): string {
    const url = this.imagenUrlMedium || this.imagenUrlSmall || this.imageUrl;
    return url ? `url(${url})` : 'none';
  }

  onViewClick(): void {
    this.viewRecipe.emit();
  }
}

