import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

/**
 * Interceptor de errores HTTP
 *
 * Maneja errores globales:
 * - 401 Unauthorized: Redirige al login (sesión expirada)
 *
 * Los demás errores se propagan para manejo local en los componentes.
 */
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Solo manejar 401 (sesión expirada) de forma global
      if (error.status === 401 && !req.url.includes('/auth/login')) {
        router.navigate(['/login'], {
          queryParams: { returnUrl: router.url }
        });
      }

      // Propagar el error para manejo local en componentes
      return throwError(() => error);
    })
  );
};

