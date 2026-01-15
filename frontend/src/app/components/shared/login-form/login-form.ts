import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormInput } from '../form-input/form-input';
import { FormCheckbox } from '../form-checkbox/form-checkbox';
import { Button } from '../button/button';
import { ToastService } from '../../../services/toast.service';
import { LoadingService } from '../../../services/loading.service';

/**
 * LoginForm Component
 * Formulario de login con validación reactiva.
 * Implementa validadores síncronos y feedback visual.
 */
@Component({
  selector: 'app-login-form',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FormInput, FormCheckbox, Button],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss',
})
export class LoginForm implements OnInit {
  @Output() submitForm = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  loginForm!: FormGroup;
  isSubmitting = false;
  generalError = '';

  constructor(
    private fb: FormBuilder,
    private toastService: ToastService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      rememberMe: [false]
    });
  }

  // Getters para acceso fácil a los controles
  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  /**
   * Obtiene mensaje de error para un control
   */
  getErrorMessage(controlName: string): string {
    const control = this.loginForm.get(controlName);
    if (!control || !control.errors || !control.touched) return '';

    const errors = control.errors;

    if (errors['required']) return 'Este campo es obligatorio';
    if (errors['email']) return 'Email inválido';
    if (errors['minlength']) return `Mínimo ${errors['minlength'].requiredLength} caracteres`;

    return 'Campo inválido';
  }

  /**
   * Envía el formulario
   */
  onSubmit(event?: Event): void {
    if (event) {
      event.preventDefault();
    }

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.toastService.error('Por favor, corrige los errores del formulario');
      return;
    }

    this.isSubmitting = true;
    this.generalError = '';
    this.loadingService.show();

    // Simular login
    setTimeout(() => {
      this.isSubmitting = false;
      this.loadingService.hide();
      this.toastService.success('Inicio de sesión exitoso');
      this.submitForm.emit(this.loginForm.value);
    }, 1500);
  }

  /**
   * Cancela el formulario
   */
  onCancel(event?: MouseEvent): void {
    if (event) {
      event.stopPropagation();
    }
    this.cancel.emit();
  }

  onSocialLogin(provider: 'google' | 'facebook' | 'x'): void {
    console.log('Social login with:', provider);
    this.toastService.info(`Iniciando sesión con ${provider}...`);
  }

  onFieldFocus(): void {
    this.generalError = '';
  }
}
