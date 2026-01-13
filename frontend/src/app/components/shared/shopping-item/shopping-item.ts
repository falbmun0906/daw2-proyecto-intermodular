import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shopping-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shopping-item.html',
  styleUrl: './shopping-item.scss'
})
export class ShoppingItem {
  @Input() name: string = '';
  @Input() quantity: string = '';
  @Input() imageUrl: string = '';
}

