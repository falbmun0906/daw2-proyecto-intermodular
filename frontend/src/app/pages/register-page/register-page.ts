import { Component, inject, ViewChild } from '@angular/core';
import { RegisterForm } from '../../components/shared/register-form/register-form';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoadingService } from '../../services/loading.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-register-page',
  imports: [RegisterForm],
  templateUrl: './register-page.html',
  styleUrl: './register-page.scss',
})
export class RegisterPage {
  @ViewChild(RegisterForm) registerFormComponent!: RegisterForm;

  private router = inject(Router);
  private authService = inject(AuthService);
  private loadingService = inject(LoadingService);
  private toastService = inject(ToastService);

  onSubmit(formData: any): void {
    this.loadingService.show();

    const nombre = `${formData.nombre} ${formData.apellido}`;

    this.authService.register(
      nombre,
      formData.email,
      formData.password
    ).subscribe({
      next: (authResponse) => {
        this.loadingService.hide();
        this.toastService.success('¡Cuenta creada con éxito!');
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.loadingService.hide();

        if (this.registerFormComponent) {
          this.registerFormComponent.isSubmitting = false;
        }

        if (error.status === 400) {
          this.toastService.error('El email ya está registrado');
        } else if (error.status === 0) {
          this.toastService.error('No se puede conectar con el servidor');
        } else if (error.status === 422) {
          this.toastService.error('Los datos proporcionados no son válidos');
        } else {
          this.toastService.error('Error al crear la cuenta');
        }
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/']);
  }
}

