import { Injectable, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoadingService } from './loading.service';
import { ApiService } from '../core/services/api.service';
import { AuthResponse, LoginRequest, RegistroRequest, Usuario } from '../models/auth.model';

/**
 * Servicio de autenticación conectado al backend Spring Boot
 *
 * Endpoints:
 * - POST /api/auth/login
 * - POST /api/auth/registro
 *
 * Usa sessionStorage para almacenar el token JWT y los datos del usuario
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api = inject(ApiService);
  private router = inject(Router);
  private loadingService = inject(LoadingService);

  // Signal para estado reactivo de autenticación
  private _isLoggedIn = signal<boolean>(false);
  private _currentUser = signal<Usuario | null>(null);

  // Getter público para acceder al signal de autenticación (readonly)
  get isLoggedIn$() {
    return this._isLoggedIn.asReadonly();
  }

  // Getter legado por compatibilidad (retorna valor actual del signal)
  get isLoggedIn(): boolean {
    return this._isLoggedIn();
  }

  // Getter para el usuario actual
  get currentUser$() {
    return this._currentUser.asReadonly();
  }

  constructor() {
    // Restaurar estado de sesión desde sessionStorage
    this.restoreSessionState();
  }

  /**
   * Restaura el estado de sesión desde sessionStorage
   */
  private restoreSessionState(): void {
    const token = sessionStorage.getItem('token');
    const savedUser = sessionStorage.getItem('currentUser');

    if (token && savedUser) {
      try {
        const user = JSON.parse(savedUser);
        this._isLoggedIn.set(true);
        this._currentUser.set(user);
      } catch (error) {
        this.clearSession();
      }
    }
  }

  /**
   * Guarda el estado de login en sessionStorage
   */
  private setLoginState(authResponse: AuthResponse): void {
    const usuario: Usuario = {
      id: authResponse.id,
      nombre: authResponse.email.split('@')[0],
      email: authResponse.email,
      rol: authResponse.rol
    };

    sessionStorage.setItem('token', authResponse.token);
    sessionStorage.setItem('currentUser', JSON.stringify(usuario));

    this._isLoggedIn.set(true);
    this._currentUser.set(usuario);
  }

  private clearSession(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('currentUser');
    this._isLoggedIn.set(false);
    this._currentUser.set(null);
  }

  loginWithCredentials(email: string, password: string): Observable<AuthResponse> {
    const loginRequest: LoginRequest = { email, password };

    return this.api.post<AuthResponse>('auth/login', loginRequest).pipe(
      tap((authResponse) => {
        this.setLoginState(authResponse);
      })
    );
  }

  /**
   * Registro de nuevo usuario
   * POST /api/auth/registro
   *
   * @param nombre Nombre del usuario
   * @param email Email del usuario
   * @param password Contraseña del usuario
   * @returns Observable<AuthResponse>
   */
  register(nombre: string, email: string, password: string): Observable<AuthResponse> {
    const registroRequest: RegistroRequest = { nombre, email, password };

    return this.api.post<AuthResponse>('auth/registro', registroRequest).pipe(
      tap((authResponse) => {
        this.setLoginState(authResponse);
      })
    );
  }

  getCurrentUser(): Usuario | null {
    return this._currentUser();
  }

  /**
   * Obtiene el ID del usuario actual
   * @returns ID del usuario o null si no hay sesión
   */
  getCurrentUserId(): number | null {
    const user = this._currentUser();
    return user?.id ?? null;
  }

  /**
   * Obtiene el token JWT actual
   * @returns Token JWT o null si no hay sesión
   */
  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  /**
   * Limpia sessionStorage y redirige a /home
   */
  logout(): void {
    this.clearSession();
    this.router.navigate(['/home']);
  }
}

