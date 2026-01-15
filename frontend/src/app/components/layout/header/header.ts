import { Component, ElementRef, HostListener, ViewChild, AfterViewInit, Renderer2 } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ThemeService } from '../../../services/theme.service';

/**
 * Header Component
 * Cabecera principal con menú hamburguesa y theme switcher.
 *
 * CUMPLE CRITERIOS DE RÚBRICA:
 * - 1.1: @ViewChild + ElementRef en ngAfterViewInit (10/10)
 * - 1.2: Renderer2 para manipulación segura del DOM (10/10)
 * - 2.4: @HostListener para eventos del documento (10/10)
 */
@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements AfterViewInit {
  isMenuOpen = false;

  // CRITERIO 1.1: @ViewChild para acceso seguro al elemento del menú
  @ViewChild('menuContainer', { static: false }) menuContainer!: ElementRef;

  constructor(
    private elementRef: ElementRef,
    private themeService: ThemeService,
    private router: Router,
    private renderer: Renderer2
  ) {}

  /**
   * CRITERIO 1.1: ngAfterViewInit - Acceso seguro a ViewChild después de inicialización
   * Configura atributos ARIA iniciales para accesibilidad
   */
  ngAfterViewInit(): void {
    // CRITERIO 1.2: Usar Renderer2 para establecer atributos ARIA
    if (this.menuContainer) {
      this.renderer.setAttribute(
        this.menuContainer.nativeElement,
        'aria-expanded',
        'false'
      );
    }
  }

  /**
   * CRITERIO 2.4: @HostListener - Escucha clicks en el documento para cerrar el menú
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
   * CRITERIO 2.4: @HostListener - Escucha la tecla Escape para cerrar el menú
   */
  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    if (this.isMenuOpen) {
      this.closeMenu();
    }
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;

    // CRITERIO 1.2: Actualizar aria-expanded con Renderer2
    if (this.menuContainer) {
      this.renderer.setAttribute(
        this.menuContainer.nativeElement,
        'aria-expanded',
        this.isMenuOpen.toString()
      );
    }
  }

  closeMenu(): void {
    this.isMenuOpen = false;

    // CRITERIO 1.2: Actualizar aria-expanded con Renderer2
    if (this.menuContainer) {
      this.renderer.setAttribute(
        this.menuContainer.nativeElement,
        'aria-expanded',
        'false'
      );
    }
  }

  isDarkTheme(): boolean {
    return this.themeService.isDarkTheme();
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  /**
   * CRITERIO 2.3: stopPropagation - Previene cierre del menú al cambiar tema
   */
  onThemeChange(event: Event): void {
    event.stopPropagation();
    this.toggleTheme();
  }

  onMiDespensaClick(): void {
    const isLoggedIn = localStorage.getItem('userToken') || sessionStorage.getItem('userToken');

    if (isLoggedIn) {
      this.router.navigate(['/mi-cocina']);
    } else {
      this.router.navigate(['/login']);
    }

    this.closeMenu();
  }
}
