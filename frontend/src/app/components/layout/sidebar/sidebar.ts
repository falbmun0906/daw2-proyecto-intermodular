import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  @Input() isOpen: boolean = false;
  @Input() activeRoute: string = '';
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }

  onLinkClick() {
    // Cerrar sidebar en mobile al hacer click en un enlace
    this.close.emit();
  }
}
