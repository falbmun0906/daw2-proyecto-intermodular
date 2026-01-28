import { HttpInterceptorFn } from '@angular/common/http';

/**
 * Interceptor de autenticación
 *
 * Añade headers comunes a todas las peticiones HTTP:
 * - Content-Type: application/json (solo si no es FormData)
 * - X-App-Client: Angular-DWEC (identificador de la aplicación)
 * - Authorization: Bearer <token> (si existe token en sessionStorage)
 *
 * @example
 * // Configuración en app.config.ts
 * provideHttpClient(
 *   withInterceptors([authInterceptor])
 * )
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Obtener token del sessionStorage (si existe)
  const token = sessionStorage.getItem('token');

  // Clonar la petición y añadir headers
  let headers = req.headers.set('X-App-Client', 'Angular-DWEC');

  // Solo añadir Content-Type si no es FormData (para upload de archivos)
  if (!(req.body instanceof FormData)) {
    headers = headers.set('Content-Type', 'application/json');
  }

  // Si hay token, añadir header de Authorization
  if (token) {
    headers = headers.set('Authorization', `Bearer ${token}`);
  }

  // Clonar la petición con los nuevos headers
  const clonedReq = req.clone({ headers });

  // Continuar con la petición modificada
  return next(clonedReq);
};

