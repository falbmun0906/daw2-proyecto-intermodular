import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { LoginForm } from '../../components/shared/login-form/login-form';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoadingService } from '../../services/loading.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-login-page',
  imports: [LoginForm],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage implements OnInit {
  @ViewChild(LoginForm) loginFormComponent!: LoginForm;

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private loadingService = inject(LoadingService);
  private toastService = inject(ToastService);

  private returnUrl: string = '/dashboard';

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.returnUrl = params.get('returnUrl') || '/dashboard';
    });
  }

  onSubmit(formData: any): void {
    this.loadingService.show();

    this.authService.loginWithCredentials(
      formData.email,
      formData.password
    ).subscribe({
      next: (authResponse) => {
        this.loadingService.hide();
        this.toastService.success(`¡Bienvenido de nuevo!`);
        this.router.navigateByUrl(this.returnUrl);
      },
      error: (error) => {
        this.loadingService.hide();

        if (this.loginFormComponent) {
          this.loginFormComponent.resetFormState();
        }

        if (error.status === 401) {
          this.toastService.error('Email o contraseña incorrectos');
        } else if (error.status === 0) {
          this.toastService.error('No se puede conectar con el servidor');
        } else if (error.status === 400) {
          this.toastService.error('Datos de inicio de sesión inválidos');
        } else {
          this.toastService.error('Error al iniciar sesión');
        }
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/']);
  }
}

