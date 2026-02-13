import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shopping-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shopping-item.html',
  styleUrl: './shopping-item.scss'
})
export class ShoppingItem {
  @Input() id: number = 0;
  @Input() name: string = '';
  @Input() quantity: string = '';
  @Input() imageUrl: string = '';

  @Output() delete = new EventEmitter<number>();
  @Output() markAsComprado = new EventEmitter<number>();

  private readonly imageBaseUrl = 'http://localhost:8080/images';

  get imageSrc(): string {
    // Si ya es una URL completa (http), usarla directamente
    if (this.imageUrl && this.imageUrl.startsWith('http')) {
      return this.imageUrl;
    }

    // Si es un slug, construir la URL del backend
    if (this.imageUrl) {
      return `${this.imageBaseUrl}/ingredientes/${this.imageUrl}-small.webp`;
    }

    // Fallback
    return 'assets/icons/ingredient-default.svg';
  }

  onDelete(): void {
    // Emitir evento y dejar que el padre muestre la confirmación
    this.delete.emit(this.id);
  }

  onMarkAsComprado(): void {
    this.markAsComprado.emit(this.id);
  }
}
