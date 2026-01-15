import { HttpInterceptorFn } from '@angular/common/http';

/**
 * Interceptor de autenticación
 *
 * Añade headers comunes a todas las peticiones HTTP:
 * - Content-Type: application/json
 * - X-App-Client: Angular-DWEC (identificador de la aplicación)
 * - Authorization: Bearer <token> (si existe token en localStorage)
 *
 * @example
 * // Configuración en app.config.ts
 * provideHttpClient(
 *   withInterceptors([authInterceptor])
 * )
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Obtener token del localStorage (si existe)
  const token = localStorage.getItem('token');

  // Clonar la petición y añadir headers
  let headers = req.headers
    .set('Content-Type', 'application/json')
    .set('X-App-Client', 'Angular-DWEC');

  // Si hay token, añadir header de Authorization
  if (token) {
    headers = headers.set('Authorization', `Bearer ${token}`);
  }

  // Clonar la petición con los nuevos headers
  const clonedReq = req.clone({ headers });

  // Continuar con la petición modificada
  return next(clonedReq);
};

