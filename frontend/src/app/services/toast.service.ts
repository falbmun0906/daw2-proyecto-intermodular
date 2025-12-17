import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastMessage {
  id: number;
  message: string;
  type: ToastType;
  duration: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastsSubject = new BehaviorSubject<ToastMessage[]>([]);
  public toasts$ = this.toastsSubject.asObservable();

  private idCounter = 0;

  show(message: string, type: ToastType, duration: number = 5000): void {
    const toast: ToastMessage = {
      id: ++this.idCounter,
      message,
      type,
      duration
    };

    const currentToasts = this.toastsSubject.getValue();
    this.toastsSubject.next([...currentToasts, toast]);

    if (duration > 0) {
      setTimeout(() => this.dismiss(toast.id), duration);
    }
  }

  success(message: string, duration: number = 4000): void {
    this.show(message, 'success', duration);
  }

  error(message: string, duration: number = 8000): void {
    this.show(message, 'error', duration);
  }

  info(message: string, duration: number = 3000): void {
    this.show(message, 'info', duration);
  }

  warning(message: string, duration: number = 6000): void {
    this.show(message, 'warning', duration);
  }

  dismiss(id: number): void {
    const currentToasts = this.toastsSubject.getValue();
    this.toastsSubject.next(currentToasts.filter(t => t.id !== id));
  }

  dismissAll(): void {
    this.toastsSubject.next([]);
  }
}

