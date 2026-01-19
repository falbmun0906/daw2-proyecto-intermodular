import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Icon } from '../icon/icon';

/**
 * FormInput Component
 * Campo de entrada de formulario con manejo avanzado de eventos.
 * Implementa event binding para teclado, mouse, focus y blur.
 */
@Component({
  selector: 'app-form-input',
  imports: [CommonModule, FormsModule, Icon],
  templateUrl: './form-input.html',
  styleUrl: './form-input.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormInput),
      multi: true
    }
  ]
})
export class FormInput implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() showLabel: boolean = true;
  @Input() type: string = 'text';
  @Input() name: string = '';
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() icon: string = '';
  @Input() helpText: string = '';
  @Input() errorMessage: string = '';
  @Input() successMessage: string = '';
  @Input() hasError: boolean = false;
  @Input() hasSuccess: boolean = false;

  // Nueva propiedad: variant para estilos especiales (ej. 'search')
  @Input() variant: 'default' | 'search' = 'default';

  // Eventos estándar
  @Output() blur = new EventEmitter<void>();
  @Output() inputChange = new EventEmitter<any>();

  // Eventos de teclado
  @Output() keydown = new EventEmitter<KeyboardEvent>();
  @Output() keyup = new EventEmitter<KeyboardEvent>();
  @Output() enterPressed = new EventEmitter<string>();
  @Output() escapePressed = new EventEmitter<void>();

  // Eventos de foco
  @Output() focus = new EventEmitter<void>();

  // Eventos de mouse
  @Output() mouseenter = new EventEmitter<MouseEvent>();
  @Output() mouseleave = new EventEmitter<MouseEvent>();

  private static idCounter = 0;
  inputId: string = `form-input-${++FormInput.idCounter}`;

  value: any = '';
  isFocused: boolean = false;
  isHovered: boolean = false;

  // ControlValueAccessor implementation
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  /**
   * Maneja el evento blur
   * Marca el campo como touched y emite el evento
   */
  onBlur(): void {
    this.isFocused = false;
    this.onTouched();
    this.blur.emit();
  }

  /**
   * Maneja el evento focus
   * Actualiza el estado de foco y emite el evento
   */
  onFocus(): void {
    this.isFocused = true;
    this.focus.emit();
  }

  /**
   * Maneja el evento input
   * Actualiza el valor y emite cambios
   */
  onInput(event: any): void {
    this.value = event.target.value;
    this.onChange(this.value);
    this.inputChange.emit(this.value);
  }

  /**
   * Maneja eventos de teclado keydown
   * Emite el evento y controla teclas especiales
   */
  onKeyDown(event: KeyboardEvent): void {
    this.keydown.emit(event);

    // Detectar Enter
    if (event.key === 'Enter') {
      this.enterPressed.emit(this.value);
    }

    // Detectar Escape
    if (event.key === 'Escape') {
      this.escapePressed.emit();
    }
  }

  /**
   * Maneja eventos de teclado keyup
   */
  onKeyUp(event: KeyboardEvent): void {
    this.keyup.emit(event);
  }

  /**
   * Maneja el evento mouseenter
   * Actualiza el estado hover
   */
  onMouseEnter(event: MouseEvent): void {
    this.isHovered = true;
    this.mouseenter.emit(event);
  }

  /**
   * Maneja el evento mouseleave
   * Actualiza el estado hover
   */
  onMouseLeave(event: MouseEvent): void {
    this.isHovered = false;
    this.mouseleave.emit(event);
  }

  get ariaDescribedBy(): string {
    const ids: string[] = [];
    if (this.helpText && !this.hasError && !this.hasSuccess) {
      ids.push(`${this.inputId}-help`);
    }
    if (this.hasError && this.errorMessage) {
      ids.push(`${this.inputId}-error`);
    }
    if (this.hasSuccess && this.successMessage) {
      ids.push(`${this.inputId}-success`);
    }
    return ids.join(' ');
  }

  /**
   * Verifica si el icono es un nombre válido
   */
  isLucideIcon(iconName: string): boolean {
    const validIcons = [
      'search', 'filter', 'settings', 'heart', 'star', 'arrow-right',
      'chevron-right', 'home', 'user', 'menu', 'x', 'check',
      'alert-circle', 'info', 'trash2', 'edit', 'eye', 'plus',
      'mail', 'lock', 'google', 'facebook', 'x-icon', 'user-check']

    return validIcons.includes(iconName);
  }
}
