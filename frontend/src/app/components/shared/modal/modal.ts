import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, HostListener } from '@angular/core';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
})
export class Modal implements OnInit, OnDestroy {
  @Input() isOpen: boolean = false;
  @Input() title: string = '';
  @Input() size: ModalSize = 'md';
  @Input() showCloseButton: boolean = true;
  @Input() closeOnOverlayClick: boolean = true;
  @Input() closeOnEscape: boolean = true;
  @Output() closed = new EventEmitter<void>();
  @Output() opened = new EventEmitter<void>();

  isVisible: boolean = false;
  isAnimatingIn: boolean = false;

  ngOnInit(): void {
    if (this.isOpen) {
      this.open();
    }
  }

  ngOnDestroy(): void {
    this.close();
  }

  @HostListener('document:keydown.escape')
  handleEscapeKey(): void {
    if (this.closeOnEscape && this.isOpen) {
      this.close();
    }
  }

  open(): void {
    this.isVisible = true;
    document.body.style.overflow = 'hidden'; // Prevenir scroll del body

    // Pequeño delay para activar animación
    setTimeout(() => {
      this.isAnimatingIn = true;
      this.opened.emit();
    }, 10);
  }

  close(): void {
    this.isAnimatingIn = false;

    // Esperar animación de salida
    setTimeout(() => {
      this.isVisible = false;
      document.body.style.overflow = ''; // Restaurar scroll
      this.closed.emit();
    }, 300);
  }

  onOverlayClick(event: MouseEvent): void {
    if (this.closeOnOverlayClick && event.target === event.currentTarget) {
      this.close();
    }
  }
}
