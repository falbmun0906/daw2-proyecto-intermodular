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
  @Input() imageUrl: string = '';
  @Input() rating: number = 0;
  @Input() tags: string[] = [];
  @Input() isPrimary: boolean = false;
  @Output() viewRecipe = new EventEmitter<void>();

  get stars(): boolean[] {
    return Array(5).fill(false).map((_, index) => index < Math.floor(this.rating));
  }

  onViewClick(): void {
    this.viewRecipe.emit();
  }
}

