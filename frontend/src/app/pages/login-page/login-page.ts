import { Component } from '@angular/core';
import { LoginForm } from '../../components/shared/login-form/login-form';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [LoginForm],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {
  constructor(private router: Router) {}

  onSubmit(formData: any): void {
    console.log('Login form submitted:', formData);
    // Aquí iría la lógica de autenticación
  }

  onCancel(): void {
    this.router.navigate(['/']);
  }
}

