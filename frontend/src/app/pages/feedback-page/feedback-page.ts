import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Button } from '../../components/shared/button/button';
import { FormInput } from '../../components/shared/form-input/form-input';
import { SugerenciaService } from '../../services/sugerencia-service';

@Component({
  selector: 'app-feedback-page',
  imports: [
    FormInput,
    FormsModule,
    Button,
    RouterLink
  ],
  templateUrl: './feedback-page.html',
  styleUrl: './feedback-page.scss',
})
export class FeedbackPage {
  private sugerenciaService = inject(SugerenciaService);

  isSubmitting = false;
  submitSuccess = false;
  submitError = false;
  errorMessage = '';
  formData = { asunto: '', descripcion: ''};
  fieldErrors = {
    asunto: '',
    descripcion: '',

  }

  onSubmit() {
    if (this.isFormValid()) {
      this.isSubmitting = true;
      this.submitError = false;
      this.errorMessage = '';

      this.sugerenciaService.create(this.formData).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.submitSuccess = true;
          this.formData = { asunto: '', descripcion: '' };
          this.fieldErrors = { asunto: '', descripcion: '' };

          // Ocultar mensaje de éxito después de 5 segundos
          setTimeout(() => {
            this.submitSuccess = false;
          }, 5000);
        },
        error: (error) => {
          this.isSubmitting = false;
          this.submitError = true;
          this.errorMessage = error.message || 'Ocurrió un error al enviar la sugerencia. Por favor, inténtalo de nuevo más tarde.';

          // Ocultar mensaje de error después de 5 segundos
          setTimeout(() => {
            this.submitError = false;
          }, 5000);
        }
      });
    }
  }

  private isFormValid(): boolean {
    return this.isFieldValid('asunto') && this.isFieldValid('descripcion');
  }

  private isFieldValid(field: 'asunto' | 'descripcion' ): boolean {
    const value = this.formData[field];

    if (!value || value.trim() === '') {
      return false;
    }

    if (field === 'asunto' && value.length < 2) {
      return false;
    }

    if (field === 'descripcion' && (value.length < 10 || value.length > 500)) {
      return false;
    }

    return true;
  }

  hasError(field: string): boolean {
    return this.fieldErrors[field as keyof typeof this.fieldErrors] !== '';
  }

  getErrorMessage(field: string): string {
    const value = this.formData[field as keyof typeof this.formData];

    if (!value || value.trim() === '') {
      return 'Este campo es obligatorio';
    }

    if (field === 'asunto' && value.length < 10) {
      return 'Mínimo 10 caracteres';
    }

    if (field === 'descripcion') {
      if (value.length < 40) {
        return 'Mínimo 40 caracteres';
      }
      if (value.length > 500) {
        return 'Máximo 500 caracteres';
      }
    }

    return '';
  }

}
