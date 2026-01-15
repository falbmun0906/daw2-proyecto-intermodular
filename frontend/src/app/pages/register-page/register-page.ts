import { Component } from '@angular/core';
import { RegisterForm } from '../../components/shared/register-form/register-form';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  imports: [RegisterForm],
  templateUrl: './register-page.html',
  styleUrl: './register-page.scss',
})
export class RegisterPage {
  constructor(private router: Router) {}

  onSubmit(formData: any): void {
    console.log('Register form submitted:', formData);
    // Aquí iría la lógica de registro
  }

  onCancel(): void {
    this.router.navigate(['/']);
  }
}

