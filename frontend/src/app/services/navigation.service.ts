import { Injectable, inject } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

/**
 * Servicio centralizado para navegación programática.
 * Demuestra navegación básica, con parámetros, queryParams, fragments y estado.
 */
@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private router = inject(Router);

  /**
   * Navegación básica a una ruta
   */
  goToHome() {
    this.router.navigate(['/']);
  }

  /**
   * Navegación a listado de recetas
   */
  goToRecipes() {
    this.router.navigate(['/recetas']);
  }

  /**
   * Navegación con parámetros de ruta
   * @param recipeId ID de la receta
   */
  goToRecipeDetail(recipeId: string | number) {
    this.router.navigate(['/recetas', recipeId]);
  }

  /**
   * Navegación con queryParams (filtros, paginación)
   * Ejemplo: /recetas?categoria=postres&dificultad=facil&page=2
   */
  goToRecipesWithFilters(filters: {
    categoria?: string;
    dificultad?: string;
    page?: number;
  }) {
    this.router.navigate(['/recetas'], {
      queryParams: filters
    });
  }

  /**
   * Navegación con fragment (scroll a sección)
   * Ejemplo: /recetas/123#comentarios
   */
  goToRecipeSection(recipeId: string | number, section: string) {
    this.router.navigate(['/recetas', recipeId], {
      fragment: section
    });
  }

  /**
   * Navegación con estado (datos en memoria, no en URL)
   * Útil para pasar objetos completos sin exponerlos en la URL
   */
  goToCheckout(order: any) {
    this.router.navigate(['/checkout'], {
      state: { order }
    });
  }

  /**
   * Navegación que reemplaza la entrada del historial
   * Útil para redirects, login, etc.
   */
  redirectToLogin(returnUrl?: string) {
    const extras: NavigationExtras = {
      replaceUrl: true
    };

    if (returnUrl) {
      extras.queryParams = { returnUrl };
    }

    this.router.navigate(['/login'], extras);
  }

  /**
   * Navegación completa con todos los NavigationExtras
   */
  navigateWithFullExtras(
    path: any[],
    options?: {
      queryParams?: any;
      fragment?: string;
      state?: any;
      replaceUrl?: boolean;
      skipLocationChange?: boolean;
      queryParamsHandling?: 'merge' | 'preserve' | '';
    }
  ) {
    this.router.navigate(path, options as NavigationExtras);
  }

  /**
   * Navegación relativa (requiere ActivatedRoute en el componente)
   */
  goBack() {
    window.history.back();
  }
}

