import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { LoadingService } from '../../../services/loading.service';

/**
 * Spinner Component
 * Componente overlay que muestra un spinner de carga global.
 * Se suscribe al LoadingService para mostrar/ocultar automáticamente.
 */
@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spinner.html',
  styleUrl: './spinner.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Spinner implements OnInit, OnDestroy {
  isLoading = signal<boolean>(false);
  private subscription: Subscription | null = null;

  constructor(private loadingService: LoadingService) {}

  ngOnInit(): void {
    this.subscription = this.loadingService.isLoading$.subscribe(loading => {
      this.isLoading.set(loading);
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

