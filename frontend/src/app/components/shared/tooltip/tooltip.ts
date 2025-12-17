import { Component, Input, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

/**
 * Tooltip Component
 * Componente para mostrar información adicional al hover o focus.
 * Implementa eventos mouseenter/mouseleave y focus/blur para control de visibilidad.
 */
@Component({
  selector: 'app-tooltip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tooltip.html',
  styleUrl: './tooltip.scss',
})
export class Tooltip {
  @Input() text: string = '';
  @Input() position: TooltipPosition = 'top';
  @Input() delay: number = 200;

  showTooltip: boolean = false;
  private timeoutId: ReturnType<typeof setTimeout> | null = null;


  /**
   * Muestra el tooltip con delay configurable
   */
  @HostListener('mouseenter')
  @HostListener('focusin')
  onShow(): void {
    this.timeoutId = setTimeout(() => {
      this.showTooltip = true;
    }, this.delay);
  }

  /**
   * Oculta el tooltip y cancela el timeout
   */
  @HostListener('mouseleave')
  @HostListener('focusout')
  onHide(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    this.showTooltip = false;
  }

  /**
   * Oculta el tooltip al presionar Escape
   */
  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.showTooltip = false;
  }
}

