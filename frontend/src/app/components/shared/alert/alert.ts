import { Component, Input, Output, EventEmitter } from '@angular/core';

export type AlertType = 'success' | 'error' | 'warning' | 'info';

@Component({
  selector: 'app-alert',
  imports: [],
  templateUrl: './alert.html',
  styleUrl: './alert.scss',
})
export class Alert {
  @Input() type: AlertType = 'info';
  @Input() title: string = '';
  @Input() message: string = '';
  @Input() dismissible: boolean = true;
  @Input() icon: string = '';
  @Output() dismissed = new EventEmitter<void>();

  isVisible: boolean = true;

  get alertIcon(): string {
    if (this.icon) {
      return this.icon;
    }

    // Iconos por defecto según el tipo
    switch (this.type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'warning':
        return '⚠';
      case 'info':
        return 'ℹ';
      default:
        return 'ℹ';
    }
  }

  get ariaRole(): string {
    return this.type === 'error' ? 'alert' : 'status';
  }

  onDismiss(): void {
    this.isVisible = false;
    this.dismissed.emit();
  }
}
