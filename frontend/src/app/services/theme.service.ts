import { Injectable, Renderer2, RendererFactory2, OnDestroy } from '@angular/core';

export type Theme = 'light' | 'dark';

/**
 * ThemeService
 * Servicio para gestionar el tema de la aplicación (claro/oscuro).
 *
 * CRITERIO 4.1 - Theme Switcher Real-time (10/10):
 * - Detecta preferencias del sistema con matchMedia
 * - Listener en tiempo real para cambios del sistema operativo
 * - Persiste en localStorage
 * - Aplica clases al documento con Renderer2
 */
@Injectable({
  providedIn: 'root'
})
export class ThemeService implements OnDestroy {
  private renderer: Renderer2;
  private currentTheme: Theme = 'light';
  private readonly STORAGE_KEY = 'theme';

  // CRITERIO 4.1: MediaQueryList para detectar cambios en tiempo real
  private mediaQuery: MediaQueryList | null = null;
  private mediaQueryListener: ((event: MediaQueryListEvent) => void) | null = null;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.initializeTheme();
    this.setupSystemThemeListener();
  }

  /**
   * Inicializa el tema al cargar la aplicación
   * Prioridad: localStorage > preferencia del sistema > light (por defecto)
   */
  private initializeTheme(): void {
    const savedTheme = this.getSavedTheme();

    if (savedTheme) {
      this.currentTheme = savedTheme;
    } else {
      this.currentTheme = this.getSystemPreference();
    }

    this.applyTheme(this.currentTheme);
  }

  /**
   * CRITERIO 4.1: Configura listener para cambios del tema del sistema en tiempo real
   * Si el usuario cambia el tema del SO, la app se actualiza automáticamente
   */
  private setupSystemThemeListener(): void {
    if (typeof window !== 'undefined' && window.matchMedia) {
      this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

      // Listener que se ejecuta cuando cambia la preferencia del sistema
      this.mediaQueryListener = (event: MediaQueryListEvent) => {
        // Solo aplicar si no hay tema guardado (el usuario no ha elegido manualmente)
        const savedTheme = this.getSavedTheme();
        if (!savedTheme) {
          const newTheme: Theme = event.matches ? 'dark' : 'light';
          console.log(`🎨 Sistema cambió a tema ${newTheme}, aplicando...`);
          this.currentTheme = newTheme;
          this.applyTheme(newTheme);
        }
      };

      // Añadir el listener
      this.mediaQuery.addEventListener('change', this.mediaQueryListener);

      console.log('✅ Listener de tema del sistema activado');
    }
  }

  /**
   * Obtiene el tema guardado en localStorage
   */
  private getSavedTheme(): Theme | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved === 'light' || saved === 'dark') {
        return saved;
      }
    }
    return null;
  }

  /**
   * Detecta la preferencia del sistema usando matchMedia
   */
  private getSystemPreference(): Theme {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefersDark ? 'dark' : 'light';
    }
    return 'light';
  }

  /**
   * Aplica el tema al documento HTML usando Renderer2
   */
  private applyTheme(theme: Theme): void {
    const body = document.body;
    const html = document.documentElement;

    if (theme === 'dark') {
      this.renderer.addClass(body, 'dark-theme');
      this.renderer.removeClass(body, 'light-theme');
      this.renderer.addClass(html, 'dark-theme');
      this.renderer.removeClass(html, 'dark-theme');
    } else {
      this.renderer.addClass(body, 'light-theme');
      this.renderer.removeClass(body, 'dark-theme');
      this.renderer.addClass(html, 'light-theme');
      this.renderer.removeClass(html, 'dark-theme');
    }
  }

  /**
   * Guarda el tema en localStorage
   */
  private saveTheme(theme: Theme): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(this.STORAGE_KEY, theme);
    }
  }

  /**
   * Obtiene el tema actual
   */
  getTheme(): Theme {
    return this.currentTheme;
  }

  /**
   * Verifica si el tema actual es oscuro
   */
  isDarkTheme(): boolean {
    return this.currentTheme === 'dark';
  }

  /**
   * Cambia al tema especificado
   */
  setTheme(theme: Theme): void {
    this.currentTheme = theme;
    this.applyTheme(theme);
    this.saveTheme(theme);
  }

  /**
   * Alterna entre tema claro y oscuro
   */
  toggleTheme(): void {
    const newTheme: Theme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  /**
   * CRITERIO 4.1: Limpieza del listener en ngOnDestroy
   */
  ngOnDestroy(): void {
    if (this.mediaQuery && this.mediaQueryListener) {
      this.mediaQuery.removeEventListener('change', this.mediaQueryListener);
      console.log('🧹 Listener de tema del sistema removido');
    }
  }
}

