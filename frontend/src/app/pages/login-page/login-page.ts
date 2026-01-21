import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { LoginForm } from '../../components/shared/login-form/login-form';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoadingService } from '../../services/loading.service';

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

  private returnUrl: string = '/dashboard';

  ngOnInit(): void {
    // Leer la URL de retorno desde queryParams
    this.route.queryParamMap.subscribe(params => {
      this.returnUrl = params.get('returnUrl') || '/dashboard';
      console.log('📍 LoginPage: returnUrl =', this.returnUrl);
    });
  }

  onSubmit(formData: any): void {
    console.log('Login form submitted:', formData);

    // Mostrar loading
    this.loadingService.show();

    // Intentar autenticación con el servicio
    // loginWithCredentials retorna un Observable con delay(1000)
    this.authService.loginWithCredentials(
      formData.email,
      formData.password
    ).subscribe({
      next: (success) => {
        if (success) {
          console.log('✅ Login exitoso, redirigiendo a:', this.returnUrl);
          // Redirigir al dashboard o a la URL original
          this.router.navigateByUrl(this.returnUrl);
        } else {
          console.error('❌ Login fallido: credenciales inválidas');
          this.loadingService.hide();
          // Resetear estado del formulario
          if (this.loginFormComponent) {
            this.loginFormComponent.resetFormState();
          }
          // Aquí podrías mostrar un mensaje de error
        }
      },
      error: (err) => {
        console.error('❌ Error en login:', err);
        this.loadingService.hide();
        // Resetear estado del formulario
        if (this.loginFormComponent) {
          this.loginFormComponent.resetFormState();
        }
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/']);
  }
}

