import { Component, inject, OnInit } from '@angular/core';
import { LoginForm } from '../../components/shared/login-form/login-form';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  imports: [LoginForm],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);

  private returnUrl: string = '/home';

  ngOnInit(): void {
    // Leer la URL de retorno desde queryParams
    this.route.queryParamMap.subscribe(params => {
      this.returnUrl = params.get('returnUrl') || '/home';
      console.log('📍 LoginPage: returnUrl =', this.returnUrl);
    });
  }

  onSubmit(formData: any): void {
    console.log('Login form submitted:', formData);

    // Intentar autenticación con el servicio
    const success = this.authService.loginWithCredentials(
      formData.email,
      formData.password
    );

    if (success) {
      console.log('✅ Login exitoso, redirigiendo a:', this.returnUrl);
      // Redirigir a la URL original o /home
      this.router.navigateByUrl(this.returnUrl);
    } else {
      console.error('❌ Login fallido: credenciales inválidas');
      // Aquí podrías mostrar un mensaje de error
    }
  }

  onCancel(): void {
    this.router.navigate(['/']);
  }
}

