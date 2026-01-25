import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { ProductsStore } from '../products.store';
import { Product } from '../models/product';
import { ToastService } from '../../../services/toast.service';

/**
 * TAREA 6.1: Componente de formulario que actualiza el store automáticamente
 * tras crear/editar productos, evitando recargas de página
 */
@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.html',
  styleUrls: ['./product-form.scss']
})
export class ProductFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private toastService = inject(ToastService);

  // TAREA 6.1: Inyectar el store para actualizar la lista automáticamente
  private productsStore = inject(ProductsStore);

  isEditMode = signal<boolean>(false);
  productId = signal<string | null>(null);
  loading = signal<boolean>(false);
  submitted = signal<boolean>(false);

  // TAREA 5.5: Signal para estado de guardado
  isSaving = signal<boolean>(false);

  form: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    price: [0, [Validators.required, Validators.min(0.01)]],
    imageUrl: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+/)]],
    category: ['', Validators.required],
    stock: [0, [Validators.required, Validators.min(0)]]
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEditMode.set(true);
      this.productId.set(id);
      this.loadProduct(id);
    }
  }

  loadProduct(id: string): void {
    this.loading.set(true);

    this.productService.getById(id).subscribe({
      next: (product) => {
        this.form.patchValue({
          name: product.name,
          description: product.description,
          price: product.price,
          imageUrl: product.imageUrl,
          category: product.category,
          stock: product.stock
        });
        this.loading.set(false);
      },
      error: (err) => {
        this.toastService.error(`Error al cargar producto: ${err.message}`);
        this.router.navigate(['/productos']);
      }
    });
  }

  /**
   * TAREA 6.1: Método save() que actualiza el store automáticamente
   * La lista de productos se actualiza sin recarga de página
   * Los contadores se recalculan al instante
   */
  onSubmit(): void {
    this.submitted.set(true);

    if (this.form.invalid) {
      return;
    }

    // Activar estado de guardado
    this.isSaving.set(true);

    const formValue = this.form.value;

    if (this.isEditMode()) {
      // Actualizar producto existente
      this.productService.update(this.productId()!, formValue).subscribe({
        next: (product) => {
          this.isSaving.set(false);
          console.log('✅ Producto actualizado:', product);

          // TAREA 6.1: Actualizar el store - La lista se actualiza automáticamente
          this.productsStore.update(product);

          // TAREA 5.5: Toast de éxito
          this.toastService.success('Producto actualizado correctamente');

          this.router.navigate(['/productos', product.id]);
        },
        error: (err) => {
          this.isSaving.set(false);

          // TAREA 5.5: Toast de error
          this.toastService.error(`Error al actualizar: ${err.message}`);
        }
      });
    } else {
      // Crear nuevo producto
      this.productService.create(formValue).subscribe({
        next: (product) => {
          this.isSaving.set(false);
          console.log('✅ Producto creado:', product);

          // TAREA 6.1: Agregar al store - La lista se actualiza automáticamente
          this.productsStore.add(product);

          // TAREA 5.5: Toast de éxito
          this.toastService.success('Producto creado correctamente');

          this.router.navigate(['/productos', product.id]);
        },
        error: (err) => {
          this.isSaving.set(false);

          // TAREA 5.5: Toast de error
          this.toastService.error(`Error al crear: ${err.message}`);
        }
      });
    }
  }

  onCancel(): void {
    if (this.isEditMode()) {
      this.router.navigate(['/productos', this.productId()]);
    } else {
      this.router.navigate(['/productos']);
    }
  }

  // Helpers para mostrar errores
  hasError(field: string, error: string): boolean {
    const control = this.form.get(field);
    return !!(control && control.hasError(error) && (control.touched || this.submitted()));
  }

  getErrorMessage(field: string): string {
    const control = this.form.get(field);
    if (!control) return '';

    if (control.hasError('required')) return 'Este campo es requerido';
    if (control.hasError('minlength')) {
      const minLength = control.getError('minlength').requiredLength;
      return `Mínimo ${minLength} caracteres`;
    }
    if (control.hasError('min')) {
      const min = control.getError('min').min;
      return `El valor mínimo es ${min}`;
    }
    if (control.hasError('pattern')) return 'URL inválida (debe empezar con http:// o https://)';

    return '';
  }
}

