import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { telefono, codigoPostal } from '../../../validators/custom.validators';
import { ToastService } from '../../../services/toast.service';

/**
 * ContactForm Component
 * Formulario de contacto con FormArray para múltiples teléfonos y direcciones.
 * Demuestra creación y eliminación dinámica de elementos en formularios reactivos.
 */
@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.scss'
})
export class ContactForm implements OnInit {
  contactForm!: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      // FormArray para múltiples teléfonos
      telefonos: this.fb.array([]),
      // FormArray para múltiples direcciones
      direcciones: this.fb.array([]),
      mensaje: ['', [Validators.required, Validators.minLength(10)]]
    });

    // Añadir un teléfono y una dirección por defecto
    this.addTelefono();
    this.addDireccion();
  }

  // === GETTERS PARA ACCESO A FORMARRAY ===

  get telefonos(): FormArray {
    return this.contactForm.get('telefonos') as FormArray;
  }

  get direcciones(): FormArray {
    return this.contactForm.get('direcciones') as FormArray;
  }

  get nombre() { return this.contactForm.get('nombre'); }
  get email() { return this.contactForm.get('email'); }
  get mensaje() { return this.contactForm.get('mensaje'); }

  // === MÉTODOS PARA TELÉFONOS ===

  /**
   * Crea un nuevo FormGroup para un teléfono
   */
  private createTelefonoGroup(): FormGroup {
    return this.fb.group({
      numero: ['', [Validators.required, telefono()]],
      tipo: ['movil', Validators.required]
    });
  }

  /**
   * Añade un nuevo teléfono al FormArray
   */
  addTelefono(): void {
    this.telefonos.push(this.createTelefonoGroup());
  }

  /**
   * Elimina un teléfono del FormArray por índice
   */
  removeTelefono(index: number): void {
    if (this.telefonos.length > 1) {
      this.telefonos.removeAt(index);
    } else {
      this.toastService.warning('Debe haber al menos un teléfono');
    }
  }

  // === MÉTODOS PARA DIRECCIONES ===

  /**
   * Crea un nuevo FormGroup para una dirección
   */
  private createDireccionGroup(): FormGroup {
    return this.fb.group({
      calle: ['', Validators.required],
      ciudad: ['', Validators.required],
      codigoPostal: ['', [Validators.required, codigoPostal()]],
      tipo: ['principal', Validators.required]
    });
  }

  /**
   * Añade una nueva dirección al FormArray
   */
  addDireccion(): void {
    this.direcciones.push(this.createDireccionGroup());
  }

  /**
   * Elimina una dirección del FormArray por índice
   */
  removeDireccion(index: number): void {
    if (this.direcciones.length > 1) {
      this.direcciones.removeAt(index);
    } else {
      this.toastService.warning('Debe haber al menos una dirección');
    }
  }

  // === HELPERS PARA ERRORES ===

  /**
   * Obtiene mensaje de error para un control específico
   */
  getErrorMessage(controlName: string): string {
    const control = this.contactForm.get(controlName);
    if (!control?.errors || !control.touched) return '';

    if (control.errors['required']) return 'Este campo es obligatorio';
    if (control.errors['minlength']) return `Mínimo ${control.errors['minlength'].requiredLength} caracteres`;
    if (control.errors['email']) return 'Email inválido';

    return 'Campo inválido';
  }

  /**
   * Obtiene mensaje de error para un control dentro de un FormArray
   */
  getArrayControlError(arrayName: string, index: number, controlName: string): string {
    const array = this.contactForm.get(arrayName) as FormArray;
    const group = array.at(index) as FormGroup;
    const control = group.get(controlName);

    if (!control?.errors || !control.touched) return '';

    if (control.errors['required']) return 'Campo obligatorio';
    if (control.errors['invalidTelefono']) return 'Teléfono inválido (ej: 612345678)';
    if (control.errors['invalidCP']) return 'Código postal inválido (5 dígitos)';

    return 'Campo inválido';
  }

  /**
   * Verifica si un control del FormArray tiene error
   */
  hasArrayControlError(arrayName: string, index: number, controlName: string): boolean {
    const array = this.contactForm.get(arrayName) as FormArray;
    const group = array.at(index) as FormGroup;
    const control = group.get(controlName);

    return !!(control?.invalid && control?.touched);
  }

  // === SUBMIT ===

  /**
   * Envía el formulario
   */
  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      this.toastService.error('Por favor, corrige los errores del formulario');
      return;
    }

    this.isSubmitting = true;

    // Simular envío
    setTimeout(() => {
      this.isSubmitting = false;
      this.toastService.success('Formulario de contacto enviado correctamente');
      console.log('Datos del formulario:', this.contactForm.value);
    }, 1500);
  }
}

