import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Icon } from '../icon/icon';
import {Button} from '../button/button';

@Component({
  selector: 'app-pending-product',
  standalone: true,
  imports: [CommonModule, Icon, Button],
  templateUrl: './pending-product.html',
  styleUrl: './pending-product.scss'
})
export class PendingProduct {
  @Input() name: string = '';
  @Input() urgency: 'Alta' | 'Media' | 'Baja' = 'Baja';
  @Input() daysRemaining: number = 0;
  @Input() color: string = '#E6E6FA';
  @Output() markDone = new EventEmitter<void>();

  onMarkDone() {
    this.markDone.emit();
  }

}


