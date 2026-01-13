import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Badge } from '../badge/badge';
import { Button } from '../button/button';

@Component({
  selector: 'app-meal-plan-card',
  standalone: true,
  imports: [CommonModule, Badge, Button],
  templateUrl: './meal-plan-card.html',
  styleUrl: './meal-plan-card.scss'
})
export class MealPlanCard {
  @Input() dateTime: string = '';
  @Input() title: string = '';
  @Input() imageUrl: string = '';
  @Input() tags: string[] = [];
  @Output() viewPlan = new EventEmitter<void>();
  @Output() deletePlan = new EventEmitter<void>();
  @Output() addToList = new EventEmitter<void>();

  onView(): void {
    this.viewPlan.emit();
  }

  onDelete(): void {
    this.deletePlan.emit();
  }

  onAddToList(): void {
    this.addToList.emit();
  }
}

