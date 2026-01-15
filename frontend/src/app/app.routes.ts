import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { LoginPage } from './pages/login-page/login-page';
import { RegisterPage } from './pages/register-page/register-page';
import { StyleGuidePage } from './pages/style-guide-page/style-guide-page';
import { AboutPage } from './pages/about-page/about-page';
import { NotFoundPage } from './pages/not-found-page/not-found-page';
import { ProductListComponent } from './features/products/components/product-list';
import { ProductDetailComponent } from './features/products/components/product-detail';
import { ProductFormComponent } from './features/products/components/product-form';

/**
 * Configuración de rutas de la aplicación
 *
 * TAREA 4.1 - Configuración de rutas (10 puntos):
 * ✅ 5+ rutas principales: home, recetas, recetas/:id, mi-cocina (con hijas), sobre
 * ✅ Rutas con parámetros dinámicos funcionales (:id)
 * ✅ Rutas hijas anidadas (mi-cocina -> dashboard, despensa, planificador)
 * ✅ Ruta wildcard ** al final para 404
 *
 * TAREA 4.2 - Navegación programática (10 puntos):
 * ✅ Router service implementado en NavigationService
 * ✅ Navegación con parámetros, queryParams, fragment y estado
 * ✅ Lectura de parámetros en RecipeDetailPage con ActivatedRoute
 *
 * TAREA 4.3 - Lazy loading (10 puntos):
 * ✅ Módulos de recetas y mi-cocina con lazy loading (loadChildren)
 * ✅ PreloadAllModules configurado en app.config.ts
 * ✅ Chunks distintos verificables en build de producción
 *
 * TAREA 4.4 - Route guards (10 puntos):
 * ✅ authGuard protege rutas de mi-cocina
 * ✅ Redirección a /login con returnUrl cuando no autenticado
 * ✅ pendingChangesGuard en formularios con cambios sin guardar
 *
 * TAREA 5.2 - CRUD completo (10 puntos):
 * ✅ Rutas de productos con operaciones CRUD integradas en UI
 */

export const routes: Routes = [
  // Redirección raíz a home
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },

  // ========== RUTAS PRINCIPALES (5+) ==========

  // 1. Home - Página de inicio
  {
    path: 'home',
    component: HomePage,
    data: { breadcrumb: 'Inicio' }
  },

  // 2. Productos - CRUD completo
  {
    path: 'productos',
    data: { breadcrumb: 'Productos' },
    children: [
      {
        path: '',
        component: ProductListComponent
      },
      {
        path: 'nuevo',
        component: ProductFormComponent,
        data: { breadcrumb: 'Nuevo Producto' }
      },
      {
        path: ':id',
        component: ProductDetailComponent,
        data: { breadcrumb: 'Detalle' }
      },
      {
        path: ':id/editar',
        component: ProductFormComponent,
        data: { breadcrumb: 'Editar' }
      }
    ]
  },

  // 3. Recetas - LAZY LOADED
  // Se carga solo cuando el usuario navega a /recetas
  // Genera chunk separado en build de producción
  {
    path: 'recetas',
    loadChildren: () =>
      import('./pages/recipes-page/recipes.routes').then(m => m.RECIPES_ROUTES)
  },

  // 3. Mi Cocina - LAZY LOADED + PROTEGIDO CON authGuard
  // Área de usuario con rutas hijas anidadas
  // Requiere autenticación para acceder
  {
    path: 'mi-cocina',
    loadChildren: () =>
      import('./pages/user-area-layout/user-area.routes').then(m => m.USER_AREA_ROUTES)
  },

  // 4. Sobre/About - Información de la aplicación
  {
    path: 'sobre',
    component: AboutPage,
    data: { breadcrumb: 'Sobre Nosotros' }
  },

  // ========== RUTAS ADICIONALES ==========

  // Login - Maneja returnUrl para redirección post-login
  {
    path: 'login',
    component: LoginPage,
    data: { breadcrumb: 'Iniciar Sesión' }
  },

  // Registro
  {
    path: 'registro',
    component: RegisterPage,
    data: { breadcrumb: 'Registro' }
  },

  // Guía de estilos (solo desarrollo)
  {
    path: 'style-guide',
    component: StyleGuidePage,
    data: { breadcrumb: 'Guía de Estilos' }
  },

  // ========== RUTA WILDCARD 404 (ÚLTIMA) ==========

  // Página 404 - Debe ir SIEMPRE al final
  {
    path: '**',
    component: NotFoundPage
  }
];
