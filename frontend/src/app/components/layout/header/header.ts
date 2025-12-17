import { Component, ElementRef, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThemeService } from '../../../services/theme.service';

/**
 * Header Component
 * Cabecera principal con menú hamburguesa y theme switcher.
 * Implementa @HostListener para cerrar menú al click fuera y Escape.
 */
@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  isMenuOpen = false;

  constructor(
    private elementRef: ElementRef,
    private themeService: ThemeService
  ) {}

  /**
   * Escucha clicks en el documento para cerrar el menú
   * Si el click es fuera del header, cierra el menú
   */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.isMenuOpen) {
      const clickedInside = this.elementRef.nativeElement.contains(event.target);
      if (!clickedInside) {
        this.closeMenu();
      }
    }
  }

  /**
   * Escucha la tecla Escape para cerrar el menú
   */
  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    if (this.isMenuOpen) {
      this.closeMenu();
    }
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  /**
   * Verifica si el tema actual es oscuro
   */
  isDarkTheme(): boolean {
    return this.themeService.isDarkTheme();
  }

  /**
   * Alterna entre tema claro y oscuro
   */
  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  /**
   * Maneja el cambio del checkbox del tema
   */
  onThemeChange(event: Event): void {
    event.stopPropagation();
    this.toggleTheme();
  }
}
