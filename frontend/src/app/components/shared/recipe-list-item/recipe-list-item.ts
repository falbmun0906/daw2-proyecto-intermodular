import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Badge } from '../badge/badge';
import { Button } from '../button/button';

@Component({
  selector: 'app-recipe-list-item',
  standalone: true,
  imports: [CommonModule, Badge, Button],
  templateUrl: './recipe-list-item.html',
  styleUrl: './recipe-list-item.scss'
})
export class RecipeListItem {
  @Input() title: string = '';
  @Input() imageUrl: string = '';
  @Input() rating: number = 0;
  @Input() ratingCount: number = 0;
  @Input() tags: string[] = [];
  @Output() saveRecipe = new EventEmitter<void>();
  @Output() viewRecipe = new EventEmitter<void>();

  get stars(): boolean[] {
    return Array(5).fill(false).map((_, index) => index < Math.floor(this.rating));
  }

  onSave(): void {
    this.saveRecipe.emit();
  }

  onView(): void {
    this.viewRecipe.emit();
  }
}

