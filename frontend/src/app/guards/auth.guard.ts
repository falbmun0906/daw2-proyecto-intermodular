import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Guard funcional para proteger rutas que requieren autenticación
 *
 * Si el usuario no está autenticado:
 * - Redirige a /login
 * - Guarda la URL de retorno en queryParams (returnUrl)
 * - Tras login exitoso, redirecciona a la URL original
 *
 * @example
 * { path: 'mi-cocina', canActivate: [authGuard], component: UserAreaLayout }
 */
export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn) {
    console.log('✅ authGuard: Usuario autenticado, acceso permitido');
    return true;
  }

  console.warn('🚫 authGuard: Usuario NO autenticado, redirigiendo a /login');

  // Redirige a login guardando la URL de destino
  return router.createUrlTree(['/login'], {
    queryParams: { returnUrl: state.url }
  });
};

