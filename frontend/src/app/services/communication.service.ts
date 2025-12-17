import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

/**
 * CommunicationService
 * Servicio para comunicación entre componentes hermanos o no relacionados.
 * Usa BehaviorSubject para estado persistente y Subject para eventos one-time.
 */
@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  // BehaviorSubject para notificaciones con valor inicial
  private notificationSubject = new BehaviorSubject<string>('');
  public notifications$ = this.notificationSubject.asObservable();

  // Subject para eventos one-time (sin valor inicial)
  private eventSubject = new Subject<{ type: string; payload?: any }>();
  public events$ = this.eventSubject.asObservable();

  // BehaviorSubject para estado global compartido
  private globalStateSubject = new BehaviorSubject<Record<string, any>>({});
  public globalState$ = this.globalStateSubject.asObservable();

  /**
   * Envía una notificación a todos los suscriptores
   */
  sendNotification(message: string): void {
    this.notificationSubject.next(message);
  }

  /**
   * Obtiene el último valor de notificación
   */
  getLastNotification(): string {
    return this.notificationSubject.getValue();
  }

  /**
   * Emite un evento con tipo y payload opcional
   */
  emitEvent(type: string, payload?: any): void {
    this.eventSubject.next({ type, payload });
  }

  /**
   * Actualiza el estado global
   */
  updateGlobalState(key: string, value: any): void {
    const currentState = this.globalStateSubject.getValue();
    this.globalStateSubject.next({ ...currentState, [key]: value });
  }

  /**
   * Obtiene un valor del estado global
   */
  getGlobalStateValue(key: string): any {
    return this.globalStateSubject.getValue()[key];
  }

  /**
   * Limpia el estado global
   */
  clearGlobalState(): void {
    this.globalStateSubject.next({});
  }
}

