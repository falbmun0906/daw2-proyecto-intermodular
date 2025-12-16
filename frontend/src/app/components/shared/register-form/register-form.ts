import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormInput } from '../form-input/form-input';

interface RegisterFormData {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  confirmPassword: string;
  newsletter: boolean;
}

@Component({
  selector: 'app-register-form',
  imports: [CommonModule, FormsModule, RouterModule, FormInput],
  templateUrl: './register-form.html',
  styleUrl: './register-form.scss',
})
export class RegisterForm {
  @Output() submitForm = new EventEmitter<RegisterFormData>();

  formData: RegisterFormData = {
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    confirmPassword: '',
    newsletter: false
  };

  nombreError: boolean = false;
  nombreErrorMessage: string = '';
  apellidoError: boolean = false;
  apellidoErrorMessage: string = '';
  emailError: boolean = false;
  emailErrorMessage: string = '';
  passwordError: boolean = false;
  passwordErrorMessage: string = '';
  confirmPasswordError: boolean = false;
  confirmPasswordErrorMessage: string = '';
  generalError: boolean = false;
  generalErrorMessage: string = '';
  isSubmitting: boolean = false;

  validateNombre(): void {
    if (!this.formData.nombre) {
      this.nombreError = true;
      this.nombreErrorMessage = 'El nombre es obligatorio';
    } else if (this.formData.nombre.length < 2) {
      this.nombreError = true;
      this.nombreErrorMessage = 'El nombre debe tener al menos 2 caracteres';
    } else {
      this.nombreError = false;
      this.nombreErrorMessage = '';
    }
  }

  validateApellido(): void {
    if (!this.formData.apellido) {
      this.apellidoError = true;
      this.apellidoErrorMessage = 'El apellido es obligatorio';
    } else if (this.formData.apellido.length < 2) {
      this.apellidoError = true;
      this.apellidoErrorMessage = 'El apellido debe tener al menos 2 caracteres';
    } else {
      this.apellidoError = false;
      this.apellidoErrorMessage = '';
    }
  }

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

    // Revalidar confirmación si ya hay algo escrito
    if (this.formData.confirmPassword) {
      this.validateConfirmPassword();
    }
  }

  validateConfirmPassword(): void {
    if (!this.formData.confirmPassword) {
      this.confirmPasswordError = true;
      this.confirmPasswordErrorMessage = 'Debes confirmar la contraseña';
    } else if (this.formData.password !== this.formData.confirmPassword) {
      this.confirmPasswordError = true;
      this.confirmPasswordErrorMessage = 'Las contraseñas no coinciden';
    } else {
      this.confirmPasswordError = false;
      this.confirmPasswordErrorMessage = '';
    }
  }

  onSubmit(): void {
    // Validar todos los campos
    this.validateNombre();
    this.validateApellido();
    this.validateEmail();
    this.validatePassword();
    this.validateConfirmPassword();

    // Verificar si hay errores
    if (
      this.nombreError ||
      this.apellidoError ||
      this.emailError ||
      this.passwordError ||
      this.confirmPasswordError
    ) {
      this.generalError = true;
      this.generalErrorMessage = 'Por favor, corrige los errores en el formulario';
      return;
    }

    this.isSubmitting = true;
    this.generalError = false;

    // Emitir el evento con los datos del formulario
    this.submitForm.emit(this.formData);

    // Simular proceso de envío
    setTimeout(() => {
      this.isSubmitting = false;
    }, 1000);
  }
}

