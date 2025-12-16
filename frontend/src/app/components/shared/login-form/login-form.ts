import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormInput } from '../form-input/form-input';

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

@Component({
  selector: 'app-login-form',
  imports: [CommonModule, FormsModule, RouterModule, FormInput],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss',
})
export class LoginForm {
  @Output() submitForm = new EventEmitter<LoginFormData>();
  @Output() cancel = new EventEmitter<void>();

  formData: LoginFormData = {
    email: '',
    password: '',
    rememberMe: false
  };

  emailError: boolean = false;
  emailErrorMessage: string = '';
  passwordError: boolean = false;
  passwordErrorMessage: string = '';
  generalError: boolean = false;
  generalErrorMessage: string = '';
  isSubmitting: boolean = false;

  validateEmail(): void {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!this.formData.email) {
      this.emailError = true;
      this.emailErrorMessage = 'El email es obligatorio';
    } else if (!emailPattern.test(this.formData.email)) {
      this.emailError = true;
      this.emailErrorMessage = 'El formato del email no es válido';
    } else {
      this.emailError = false;
      this.emailErrorMessage = '';
    }
  }

  validatePassword(): void {
    if (!this.formData.password) {
      this.passwordError = true;
      this.passwordErrorMessage = 'La contraseña es obligatoria';
    } else if (this.formData.password.length < 8) {
      this.passwordError = true;
      this.passwordErrorMessage = 'La contraseña debe tener al menos 8 caracteres';
    } else {
      this.passwordError = false;
      this.passwordErrorMessage = '';
    }
  }

  onSubmit(): void {
    this.validateEmail();
    this.validatePassword();

    if (!this.emailError && !this.passwordError) {
      this.isSubmitting = true;
      this.generalError = false;

      // Emitir el evento con los datos del formulario
      this.submitForm.emit(this.formData);

      // Simular proceso de login
      setTimeout(() => {
        this.isSubmitting = false;
      }, 1000);
    } else {
      this.generalError = true;
      this.generalErrorMessage = 'Por favor, corrige los errores del formulario';
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}

