import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs';

/**
 * Interceptor de logging HTTP
 *
 * En producción, este interceptor está deshabilitado.
 * Para habilitar logs, descomentar las líneas de console.
 */
export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    tap({
      next: (event) => {
        // Logs deshabilitados en producción
      },
      error: (error) => {
        // Logs deshabilitados en producción
      }
    })
  );
};

