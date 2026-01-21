import { Injectable, inject } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { BehaviorSubject, filter } from 'rxjs';

export interface Breadcrumb {
  label: string;
  url: string;
}

/**
 * Servicio de breadcrumbs dinámicos
 *
 * TAREA 4.6 - Breadcrumbs dinámicos:
 * - Construye breadcrumbs automáticamente desde configuración de rutas (data.breadcrumb)
 * - Se actualiza en cada NavigationEnd
 * - Expone Observable para que componentes se suscriban
 *
 * @example
 * // En app.routes.ts
 * { path: 'recetas', component: RecipesPage, data: { breadcrumb: 'Recetas' } }
 *
 * // En componente
 * breadcrumbs$ = inject(BreadcrumbService).breadcrumbs$;
 */
@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  private _breadcrumbs$ = new BehaviorSubject<Breadcrumb[]>([]);
  readonly breadcrumbs$ = this._breadcrumbs$.asObservable();

  constructor() {
    // Escuchar eventos de navegación
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const breadcrumbs: Breadcrumb[] = [];
        this.buildBreadcrumbs(this.route.root, '', breadcrumbs);

        // Si no hay breadcrumbs construidos, significa que estamos en una ruta que no tiene data.breadcrumb
        // En ese caso, simplemente mostrar Inicio
        if (breadcrumbs.length === 0) {
          breadcrumbs.push({ label: 'Inicio', url: '/home' });
        }
        // Si el primer breadcrumb no es Inicio, prepend Inicio
        else if (!breadcrumbs[0].url.includes('home')) {
          breadcrumbs.unshift({ label: 'Inicio', url: '/home' });
        }

        this._breadcrumbs$.next(breadcrumbs);
        console.log('🍞 Breadcrumbs actualizados:', breadcrumbs);
      });
  }

  /**
   * Construye breadcrumbs recursivamente desde el árbol de rutas
   *
   * @param route Ruta actual
   * @param url URL acumulada
   * @param breadcrumbs Array de breadcrumbs construido
   */
  private buildBreadcrumbs(
    route: ActivatedRoute,
    url: string,
    breadcrumbs: Breadcrumb[]
  ): void {
    const children = route.children;

    if (!children || !children.length) {
      return;
    }

    for (const child of children) {
      // Construir URL del segmento
      const routeURL = child.snapshot.url
        .map(segment => segment.path)
        .join('/');

      if (routeURL) {
        url += `/${routeURL}`;
      }

      // Leer label desde data.breadcrumb
      const label = child.snapshot.data['breadcrumb'] as string | undefined;

      if (label) {
        breadcrumbs.push({ label, url: url || '/' });
      }

      // Recursión para hijos
      this.buildBreadcrumbs(child, url, breadcrumbs);
    }
  }

  /**
   * Obtiene breadcrumbs actuales (snapshot)
   */
  getCurrentBreadcrumbs(): Breadcrumb[] {
    return this._breadcrumbs$.value;
  }
}

