import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pending-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pending-product.html',
  styleUrl: './pending-product.scss'
})
export class PendingProduct {
  @Input() name: string = '';
  @Input() urgency: 'Alta' | 'Media' | 'Baja' = 'Baja';
  @Input() daysRemaining: number = 0;
  @Input() color: string = '#E6E6FA';
}


