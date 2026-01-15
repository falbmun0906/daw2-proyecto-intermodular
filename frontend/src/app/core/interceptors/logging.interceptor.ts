import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs';

/**
 * Interceptor de logging HTTP
 *
 * Registra en consola todas las peticiones HTTP y sus respuestas:
 * - Método HTTP y URL
 * - Headers de la petición
 * - Body de la petición (si existe)
 * - Tiempo de respuesta
 * - Estado de la respuesta
 * - Body de la respuesta
 *
 * TAREA 5.6 - Interceptores HTTP (Interceptor de logging):
 * Logging detallado de todas las peticiones HTTP para debugging
 *
 * @example
 * // Configuración en app.config.ts
 * provideHttpClient(
 *   withInterceptors([authInterceptor, errorInterceptor, loggingInterceptor])
 * )
 */
export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  const startTime = Date.now();

  // Log de la petición saliente
  console.group(`🌐 HTTP ${req.method} ${req.url}`);
  console.log('📤 Petición:', {
    url: req.url,
    method: req.method,
    headers: req.headers.keys().reduce((acc, key) => {
      acc[key] = req.headers.get(key);
      return acc;
    }, {} as Record<string, string | null>),
    body: req.body
  });

  return next(req).pipe(
    tap({
      next: (event) => {
        // Solo loguear respuestas HTTP completas
        if (event instanceof HttpResponse) {
          const elapsedTime = Date.now() - startTime;

          console.log('📥 Respuesta:', {
            status: event.status,
            statusText: event.statusText,
            time: `${elapsedTime}ms`,
            body: event.body
          });
          console.groupEnd();
        }
      },
      error: (error) => {
        const elapsedTime = Date.now() - startTime;

        console.error('❌ Error:', {
          status: error.status,
          statusText: error.statusText,
          time: `${elapsedTime}ms`,
          message: error.message,
          error: error.error
        });
        console.groupEnd();
      }
    })
  );
};

