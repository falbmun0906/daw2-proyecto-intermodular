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
  @Input() imageUrl: string = '';
}

