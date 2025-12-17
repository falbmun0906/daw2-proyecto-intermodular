import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * LoadingService
 * Servicio para gestionar estados de carga global.
 * Usa un contador de requests para manejar múltiples operaciones async simultáneas.
 */
@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public isLoading$ = this.loadingSubject.asObservable();

  private requestCount = 0;

  /**
   * Incrementa el contador y muestra loading
   */
  show(): void {
    this.requestCount++;
    this.loadingSubject.next(true);
  }

  /**
   * Decrementa el contador y oculta loading si no hay más requests
   */
  hide(): void {
    this.requestCount--;
    if (this.requestCount <= 0) {
      this.requestCount = 0;
      this.loadingSubject.next(false);
    }
  }

  /**
   * Fuerza ocultar loading (resetea contador)
   */
  forceHide(): void {
    this.requestCount = 0;
    this.loadingSubject.next(false);
  }

  /**
   * Obtiene el estado actual de loading
   */
  isLoading(): boolean {
    return this.loadingSubject.getValue();
  }
}

