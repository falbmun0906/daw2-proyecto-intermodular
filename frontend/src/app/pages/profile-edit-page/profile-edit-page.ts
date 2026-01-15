import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FormComponent } from '../../guards/pending-changes.guard';

@Component({
  selector: 'app-profile-edit-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile-edit-page.html',
  styleUrls: ['./profile-edit-page.scss']
})
export class ProfileEditPage implements OnInit, FormComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  // Formulario reactivo (required por FormComponent interface)
  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    bio: ['']
  });

  ngOnInit(): void {
    // Cargar datos del perfil (simulado)
    this.form.patchValue({
      name: 'Usuario Demo',
      email: 'usuario@example.com',
      bio: 'Amante de la cocina y las recetas saludables'
    });

    // Marcar como pristine después de cargar datos
    setTimeout(() => this.form.markAsPristine(), 0);
  }

  onSave(): void {
    if (this.form.valid) {
      console.log('💾 Guardando perfil:', this.form.value);

      // Simular guardado
      this.form.markAsPristine();

      // Navegar de vuelta
      this.router.navigate(['/mi-cocina/dashboard']);
    }
  }

  onCancel(): void {
    // Si hay cambios, el guard preguntará antes de salir
    this.router.navigate(['/mi-cocina/dashboard']);
  }
}

