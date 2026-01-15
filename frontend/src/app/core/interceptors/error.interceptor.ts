import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../../services/toast.service';
import { Router } from '@angular/router';

/**
 * Interceptor de errores HTTP
 *
 * Captura y maneja errores HTTP de forma centralizada:
 * - 401 Unauthorized: Redirige al login
 * - 403 Forbidden: Muestra toast de error de permisos
 * - 404 Not Found: Muestra toast de recurso no encontrado
 * - 500 Server Error: Muestra toast de error del servidor
 * - Errores de red: Muestra toast de error de conexión
 *
 * TAREA 5.6 - Interceptores HTTP (Interceptor de errores):
 * Manejo global de errores HTTP con feedback visual al usuario
 *
 * @example
 * // Configuración en app.config.ts
 * provideHttpClient(
 *   withInterceptors([authInterceptor, errorInterceptor, loggingInterceptor])
 * )
 */
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Ha ocurrido un error';

      if (error.error instanceof ErrorEvent) {
        // Error del lado del cliente o de red
        errorMessage = `Error de conexión: ${error.error.message}`;
        console.error('Error del cliente:', error.error.message);

        toastService.show({
          message: 'Error de conexión. Por favor, verifica tu red.',
          type: 'error',
          duration: 5000
        });
      } else {
        // Error del lado del servidor
        console.error(
          `Error HTTP ${error.status}:`,
          error.message,
          error.error
        );

        // Manejo específico según código de estado
        switch (error.status) {
          case 401:
            errorMessage = 'No autorizado. Por favor, inicia sesión.';
            toastService.show({
              message: errorMessage,
              type: 'error',
              duration: 4000
            });
            // Redirigir al login
            router.navigate(['/login'], {
              queryParams: { returnUrl: router.url }
            });
            break;

          case 403:
            errorMessage = 'No tienes permisos para realizar esta acción.';
            toastService.show({
              message: errorMessage,
              type: 'error',
              duration: 4000
            });
            break;

          case 404:
            errorMessage = 'Recurso no encontrado.';
            toastService.show({
              message: errorMessage,
              type: 'error',
              duration: 3000
            });
            break;

          case 500:
            errorMessage = 'Error interno del servidor. Inténtalo más tarde.';
            toastService.show({
              message: errorMessage,
              type: 'error',
              duration: 5000
            });
            break;

          case 503:
            errorMessage = 'Servicio no disponible. Inténtalo más tarde.';
            toastService.show({
              message: errorMessage,
              type: 'error',
              duration: 5000
            });
            break;

          default:
            errorMessage = error.error?.message || error.message || 'Error desconocido';
            toastService.show({
              message: `Error: ${errorMessage}`,
              type: 'error',
              duration: 4000
            });
        }
      }

      // Propagar el error para que pueda ser manejado localmente si es necesario
      return throwError(() => new Error(errorMessage));
    })
  );
};

