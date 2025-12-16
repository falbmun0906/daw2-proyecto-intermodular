import { Component, Input } from '@angular/core';

export type BadgeVariant = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'neutral';
export type BadgeSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-badge',
  imports: [],
  templateUrl: './badge.html',
  styleUrl: './badge.scss',
})
export class Badge {
  @Input() variant: BadgeVariant = 'neutral';
  @Input() size: BadgeSize = 'md';
  @Input() label: string = '';
  @Input() count: number | string = '';
  @Input() dot: boolean = false; // Badge de punto (sin texto)
  @Input() rounded: boolean = false; // Badge completamente redondeado (para números)
}
