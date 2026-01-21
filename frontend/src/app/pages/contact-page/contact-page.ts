import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Button } from '../../components/shared/button/button';
import { Breadcrumbs } from '../../components/shared/breadcrumbs/breadcrumbs';
import { FormInput } from '../../components/shared/form-input/form-input';
import { FormTextarea } from '../../components/shared/form-textarea/form-textarea';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [RouterLink, Button, Breadcrumbs, FormInput, FormTextarea, ReactiveFormsModule, FormsModule],
  templateUrl: './contact-page.html',
  styleUrls: ['./contact-page.scss']
})
export class ContactPage {
  contactForm: FormGroup;
  isSubmitting = false;
  submitSuccess = false;
  formData = { name: '', email: '', subject: '', message: '' };

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required, Validators.minLength(5)]],
      message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]]
    });
  }

  onSubmit() {
    // Sincronizar formData con contactForm antes de validar
    this.contactForm.patchValue(this.formData);

    if (this.contactForm.valid) {
      this.isSubmitting = true;

      // Simular envío de formulario
      setTimeout(() => {
        this.isSubmitting = false;
        this.submitSuccess = true;
        this.contactForm.reset();
        this.formData = { name: '', email: '', subject: '', message: '' };

        // Ocultar mensaje de éxito después de 5 segundos
        setTimeout(() => {
          this.submitSuccess = false;
        }, 5000);
      }, 1500);
    }
  }

  hasError(field: string): boolean {
    const control = this.contactForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  getErrorMessage(field: string): string {
    const control = this.contactForm.get(field);

    if (control?.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if (control?.hasError('email')) {
      return 'Introduce un correo electrónico válido';
    }
    if (control?.hasError('minlength')) {
      const minLength = control.errors?.['minlength'].requiredLength;
      return `Mínimo ${minLength} caracteres`;
    }
    if (control?.hasError('maxlength')) {
      const maxLength = control.errors?.['maxlength'].requiredLength;
      return `Máximo ${maxLength} caracteres`;
    }

    return '';
  }
}
