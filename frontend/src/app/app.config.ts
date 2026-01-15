import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { loggingInterceptor } from './core/interceptors/logging.interceptor';

/**
 * Configuración principal de la aplicación
 *
 * PreloadAllModules: Precarga todos los módulos lazy-loaded en segundo plano
 * HttpClient: Configurado con interceptores funcionales:
 *   1. authInterceptor: Añade headers de autenticación y cliente
 *   2. errorInterceptor: Manejo global de errores HTTP
 *   3. loggingInterceptor: Logging de peticiones y respuestas
 *
 * TAREA 5.6 - Interceptores HTTP (10 puntos):
 * ✅ authInterceptor: Headers de autenticación
 * ✅ errorInterceptor: Manejo global de errores (401, 403, 404, 500)
 * ✅ loggingInterceptor: Logging de peticiones HTTP
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withPreloading(PreloadAllModules)
    ),
    provideHttpClient(
      withInterceptors([
        authInterceptor,
        errorInterceptor,
        loggingInterceptor
      ])
    )
  ]
};
