import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Button } from '../../components/shared/button/button';
import { Breadcrumbs } from '../../components/shared/breadcrumbs/breadcrumbs';
import { FormInput } from '../../components/shared/form-input/form-input';
import { FormTextarea } from '../../components/shared/form-textarea/form-textarea';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [RouterLink, Button, Breadcrumbs, FormInput, FormTextarea, FormsModule],
  templateUrl: './contact-page.html',
  styleUrls: ['./contact-page.scss']
})
export class ContactPage {
  isSubmitting = false;
  submitSuccess = false;
  formData = { name: '', email: '', subject: '', message: '' };
  fieldErrors = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  onSubmit() {
    if (this.isFormValid()) {
      this.isSubmitting = true;

      // Simular envío de formulario
      setTimeout(() => {
        this.isSubmitting = false;
        this.submitSuccess = true;
        this.formData = { name: '', email: '', subject: '', message: '' };
        this.fieldErrors = { name: '', email: '', subject: '', message: '' };

        // Ocultar mensaje de éxito después de 5 segundos
        setTimeout(() => {
          this.submitSuccess = false;
        }, 5000);
      }, 1500);
    }
  }

  private isFormValid(): boolean {
    return this.isFieldValid('name') && this.isFieldValid('email') && this.isFieldValid('subject') && this.isFieldValid('message');
  }

  private isFieldValid(field: 'name' | 'email' | 'subject' | 'message'): boolean {
    const value = this.formData[field];

    if (!value || value.trim() === '') {
      return false;
    }

    if (field === 'name' && value.length < 2) {
      return false;
    }

    if (field === 'email' && !this.isValidEmail(value)) {
      return false;
    }

    if (field === 'subject' && value.length < 5) {
      return false;
    }

    if (field === 'message' && (value.length < 10 || value.length > 500)) {
      return false;
    }

    return true;
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  hasError(field: string): boolean {
    return this.fieldErrors[field as keyof typeof this.fieldErrors] !== '';
  }

  getErrorMessage(field: string): string {
    const value = this.formData[field as keyof typeof this.formData];

    if (!value || value.trim() === '') {
      return 'Este campo es obligatorio';
    }

    if (field === 'email' && !this.isValidEmail(value)) {
      return 'Introduce un correo electrónico válido';
    }

    if (field === 'name' && value.length < 2) {
      return 'Mínimo 2 caracteres';
    }

    if (field === 'subject' && value.length < 5) {
      return 'Mínimo 5 caracteres';
    }

    if (field === 'message') {
      if (value.length < 10) {
        return 'Mínimo 10 caracteres';
      }
      if (value.length > 500) {
        return 'Máximo 500 caracteres';
      }
    }

    return '';
  }
}
