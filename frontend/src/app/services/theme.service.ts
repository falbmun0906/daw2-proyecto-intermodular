import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

export type Theme = 'light' | 'dark';

/**
 * ThemeService
 * Servicio para gestionar el tema de la aplicación (claro/oscuro).
 * Detecta preferencias del sistema, persiste en localStorage y aplica clases al documento.
 */
@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;
  private currentTheme: Theme = 'light';
  private readonly STORAGE_KEY = 'theme';

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.initializeTheme();
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
   * Aplica el tema al documento HTML
   */
  private applyTheme(theme: Theme): void {
    const body = document.body;
    const html = document.documentElement;

    if (theme === 'dark') {
      this.renderer.addClass(body, 'dark-theme');
      this.renderer.removeClass(body, 'light-theme');
      this.renderer.addClass(html, 'dark-theme');
      this.renderer.removeClass(html, 'light-theme');
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
}

