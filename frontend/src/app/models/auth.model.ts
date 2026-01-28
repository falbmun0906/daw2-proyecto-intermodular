/**
 * Modelos de Autenticación - Alineados con el backend
 */

/**
 * Respuesta de autenticación del backend - AuthResponse.java
 */
export interface AuthResponse {
  token: string;
  type: string; // "Bearer"
  id: number;
  email: string;
  rol: string; // "ROLE_USER" | "ROLE_ADMIN"
}

/**
 * Request de login - LoginRequest.java
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * Request de registro - UsuarioCreateRequest.java
 */
export interface RegistroRequest {
  nombre: string;
  email: string;
  password: string;
}

/**
 * Usuario actual en la sesión
 */
export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  rol: string;
}

