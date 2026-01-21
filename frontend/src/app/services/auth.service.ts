import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { LoadingService } from './loading.service';

interface MockUser {
  id: string;
  email: string;
  name: string;
  token: string;
}

/**
 * Servicio de autenticación simulado
 * En producción, esto se conectaría a un backend real
 *
 * Usa sessionStorage (volátil) para mockear el login mientras se conecta el backend
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Signal para estado reactivo de autenticación
  private _isLoggedIn = signal<boolean>(false);

  // Getter público para acceder al signal de autenticación (readonly)
  get isLoggedIn$() {
    return this._isLoggedIn.asReadonly();
  }

  // Getter legado por compatibilidad (retorna valor actual del signal)
  get isLoggedIn(): boolean {
    return this._isLoggedIn();
  }

  constructor(
    private router: Router,
    private loadingService: LoadingService
  ) {
    // Restaurar estado de sesión desde sessionStorage (volátil)
    this.restoreSessionState();
  }

  /**
   * Restaura el estado de sesión desde sessionStorage
   */
  private restoreSessionState(): void {
    const savedUser = sessionStorage.getItem('currentUser');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        this._isLoggedIn.set(true);
        console.log('✅ Sesión restaurada para:', user.email);
      } catch (error) {
        console.error('Error al restaurar sesión:', error);
        sessionStorage.removeItem('currentUser');
        this._isLoggedIn.set(false);
      }
    }
  }

  /**
   * Simula un login exitoso (uso interno)
   */
  private setLoginState(user: MockUser): void {
    this._isLoggedIn.set(true);
    sessionStorage.setItem('currentUser', JSON.stringify(user));
    console.log('✅ Usuario autenticado:', user.email);
  }

  /**
   * Simula login con credenciales (para formulario de login)
   * Devuelve Observable que resuelve a true tras delay(1000)
   * En producción, esto haría una llamada HTTP al backend
   *
   * @param email Email del usuario
   * @param password Contraseña del usuario
   * @returns Observable<boolean> que resuelve a true tras 1 segundo
   */
  loginWithCredentials(email: string, password: string) {
    // Validación básica
    if (!email || !password) {
      return of(false);
    }

    // Crear usuario ficticio
    const mockUser: MockUser = {
      id: 'mock-user-' + Date.now(),
      email: email,
      name: email.split('@')[0], // Usa la parte antes del @ como nombre
      token: 'mock-token-' + Math.random().toString(36).substring(7)
    };

    // Devolver Observable con delay(1000) para simular latencia de red
    return of(true).pipe(
      delay(1000),
      tap(() => {
        this.setLoginState(mockUser);
        this.loadingService.hide();
      })
    );
  }

  /**
   * Obtiene el usuario actual desde sessionStorage
   * @returns Usuario actual o null si no hay sesión
   */
  getCurrentUser(): MockUser | null {
    const savedUser = sessionStorage.getItem('currentUser');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (error) {
        console.error('Error al obtener usuario actual:', error);
        return null;
      }
    }
    return null;
  }

  /**
   * Simula un logout
   * Limpia sessionStorage y redirige a /home
   */
  logout() {
    this._isLoggedIn.set(false);
    sessionStorage.removeItem('currentUser');
    console.log('🚪 Usuario ha cerrado sesión');

    // Devolver Observable para permitir encadenamiento en componentes
    return of(true).pipe(
      tap(() => {
        this.router.navigate(['/home']);
      })
    );
  }
}

