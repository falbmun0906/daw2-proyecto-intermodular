import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { passwordStrength, passwordMatch, telefono } from '../../../validators/custom.validators';
import { ValidationService } from '../../../services/validation.service';
import { ToastService } from '../../../services/toast.service';
import { LoadingService } from '../../../services/loading.service';

/**
 * RegisterForm Component
 * Formulario de registro con validación reactiva completa.
 * Implementa validadores síncronos, personalizados y asíncronos.
 */
@Component({
  selector: 'app-register-form',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register-form.html',
  styleUrl: './register-form.scss',
})
export class RegisterForm implements OnInit {
  @Output() submitForm = new EventEmitter<any>();

  registerForm!: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private validationService: ValidationService,
    private toastService: ToastService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', {
        validators: [Validators.required, Validators.email],
        asyncValidators: [this.validationService.emailUniqueValidator()],
        updateOn: 'blur'
      }],
      telefono: ['', [telefono()]],
      password: ['', [Validators.required, passwordStrength()]],
      confirmPassword: ['', [Validators.required]],
      newsletter: [false]
    }, {
      validators: [passwordMatch('password', 'confirmPassword')]
    });
  }

  // Getters para acceso fácil a los controles
  get nombre() { return this.registerForm.get('nombre'); }
  get apellido() { return this.registerForm.get('apellido'); }
  get email() { return this.registerForm.get('email'); }
  get telefonoControl() { return this.registerForm.get('telefono'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }

  /**
   * Obtiene mensaje de error para un control
   */
  getErrorMessage(controlName: string): string {
    const control = this.registerForm.get(controlName);
    if (!control || !control.errors || !control.touched) return '';

    const errors = control.errors;

    if (errors['required']) return 'Este campo es obligatorio';
    if (errors['minlength']) return `Mínimo ${errors['minlength'].requiredLength} caracteres`;
    if (errors['email']) return 'Email inválido';
    if (errors['emailTaken']) return 'Este email ya está registrado';
    if (errors['invalidTelefono']) return 'Teléfono inválido (ej: 612345678)';
    if (errors['noUppercase']) return 'Debe contener mayúsculas';
    if (errors['noLowercase']) return 'Debe contener minúsculas';
    if (errors['noNumber']) return 'Debe contener números';
    if (errors['noSpecial']) return 'Debe contener caracteres especiales (!@#$...)';
    if (errors['minLength']) return 'Mínimo 8 caracteres';

    return 'Campo inválido';
  }

  /**
   * Obtiene errores de contraseña para mostrar lista
   */
  getPasswordErrors(): string[] {
    const errors = this.password?.errors;
    if (!errors) return [];

    const messages: string[] = [];
    if (errors['noUppercase']) messages.push('Mayúsculas');
    if (errors['noLowercase']) messages.push('Minúsculas');
    if (errors['noNumber']) messages.push('Números');
    if (errors['noSpecial']) messages.push('Caracteres especiales');
    if (errors['minLength']) messages.push('8+ caracteres');

    return messages;
  }

  /**
   * Verifica si hay error de contraseñas no coincidentes
   */
  hasPasswordMismatch(): boolean {
    return this.registerForm.hasError('mismatch') &&
           this.confirmPassword?.touched === true;
  }

  /**
   * Envía el formulario
   */
  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      this.toastService.error('Por favor, corrige los errores del formulario');
      return;
    }

    this.isSubmitting = true;
    this.loadingService.show();

    // Simular envío
    setTimeout(() => {
      this.isSubmitting = false;
      this.loadingService.hide();
      this.toastService.success('Registro completado correctamente');
      this.submitForm.emit(this.registerForm.value);
    }, 1500);
  }
}
