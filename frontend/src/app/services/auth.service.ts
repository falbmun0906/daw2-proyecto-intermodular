import { Injectable, signal } from '@angular/core';

/**
 * Servicio de autenticación simulado
 * En producción, esto se conectaría a un backend real
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Signal para estado reactivo de autenticación
  private _isLoggedIn = signal<boolean>(false);

  // Getter público para verificar estado de autenticación
  get isLoggedIn(): boolean {
    return this._isLoggedIn();
  }

  constructor() {
    // Restaurar estado de sesión desde localStorage
    const savedLoginState = localStorage.getItem('isLoggedIn');
    if (savedLoginState === 'true') {
      this._isLoggedIn.set(true);
    }
  }

  /**
   * Simula un login exitoso
   */
  login(): void {
    this._isLoggedIn.set(true);
    localStorage.setItem('isLoggedIn', 'true');
    console.log('✅ Usuario autenticado');
  }

  /**
   * Simula un logout
   */
  logout(): void {
    this._isLoggedIn.set(false);
    localStorage.removeItem('isLoggedIn');
    console.log('🚪 Usuario ha cerrado sesión');
  }

  /**
   * Simula login con credenciales (para formulario de login)
   * En producción, esto haría una llamada HTTP al backend
   */
  loginWithCredentials(email: string, password: string): boolean {
    // Simulación: acepta cualquier credencial no vacía
    if (email && password) {
      this.login();
      return true;
    }
    return false;
  }
}

