import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable, Subject } from 'rxjs';
import { retry, tap } from 'rxjs/operators';

/**
 * TAREA 6.6: Servicio de WebSocket para comunicación en tiempo real
 *
 * Características:
 * - Conexión bidireccional con el servidor
 * - Reconexión automática en caso de error
 * - Gestión de estado de conexión
 * - Tipado seguro de mensajes
 * - Manejo de errores robusto
 */
@Injectable({ providedIn: 'root' })
export class RealtimeService {
  private socket$: WebSocketSubject<any> | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectInterval = 3000; // 3 segundos

  // Subject para estado de conexión
  private connectionStatus$ = new Subject<'connected' | 'disconnected' | 'reconnecting'>();

  // Subject para errores
  private errors$ = new Subject<Error>();

  /**
   * TAREA 6.6: Conectar al WebSocket con reconexión automática
   */
  connect(url: string = 'ws://localhost:3000/ws'): WebSocketSubject<any> {
    if (!this.socket$ || this.socket$.closed) {
      console.log('🔌 Conectando a WebSocket:', url);

      this.socket$ = webSocket({
        url,
        openObserver: {
          next: () => {
            console.log('✅ WebSocket conectado');
            this.connectionStatus$.next('connected');
            this.reconnectAttempts = 0;
          }
        },
        closeObserver: {
          next: () => {
            console.log('❌ WebSocket desconectado');
            this.connectionStatus$.next('disconnected');
            this.handleReconnect(url);
          }
        }
      });
    }

    return this.socket$;
  }

  /**
   * TAREA 6.6: Escuchar mensajes del servidor
   */
  listen<T>(): Observable<T> {
    if (!this.socket$) {
      throw new Error('WebSocket no conectado. Llama a connect() primero.');
    }

    return this.socket$.asObservable().pipe(
      tap(msg => console.log('📨 Mensaje recibido:', msg)),
      retry({
        count: this.maxReconnectAttempts,
        delay: this.reconnectInterval
      })
    );
  }

  /**
   * TAREA 6.6: Enviar mensaje al servidor
   */
  send<T>(message: T): void {
    if (!this.socket$) {
      throw new Error('WebSocket no conectado. Llama a connect() primero.');
    }

    console.log('📤 Enviando mensaje:', message);
    this.socket$.next(message);
  }

  /**
   * TAREA 6.6: Reconexión automática
   */
  private handleReconnect(url: string): void {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      this.connectionStatus$.next('reconnecting');

      console.log(`🔄 Intentando reconectar (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);

      setTimeout(() => {
        this.socket$ = null;
        this.connect(url);
      }, this.reconnectInterval);
    } else {
      console.error('❌ Máximo de intentos de reconexión alcanzado');
      this.errors$.next(new Error('No se pudo reconectar al WebSocket'));
    }
  }

  /**
   * Observable del estado de conexión
   */
  getConnectionStatus(): Observable<'connected' | 'disconnected' | 'reconnecting'> {
    return this.connectionStatus$.asObservable();
  }

  /**
   * Observable de errores
   */
  getErrors(): Observable<Error> {
    return this.errors$.asObservable();
  }

  /**
   * Cerrar conexión manualmente
   */
  disconnect(): void {
    if (this.socket$) {
      console.log('🔌 Cerrando conexión WebSocket');
      this.socket$.complete();
      this.socket$ = null;
      this.connectionStatus$.next('disconnected');
    }
  }

  /**
   * Verificar si está conectado
   */
  isConnected(): boolean {
    return this.socket$ !== null && !this.socket$.closed;
  }
}

/**
 * Tipos de mensajes para tipado seguro
 */
export interface WebSocketMessage<T = any> {
  type: 'notification' | 'update' | 'delete' | 'create';
  payload: T;
  timestamp: string;
}

export interface ProductUpdateMessage {
  productId: string;
  field: string;
  value: any;
}

export interface NotificationMessage {
  id: string;
  message: string;
  severity: 'info' | 'warning' | 'error' | 'success';
}
