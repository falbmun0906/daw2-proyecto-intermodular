import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

export interface SelectOption {
  value: any;
  label: string;
  disabled?: boolean;
}

/**
 * Componente FormSelect reutilizable
 * Dropdown con opciones dinámicas y label asociado
 */
@Component({
  selector: 'app-form-select',
  imports: [CommonModule, FormsModule],
  templateUrl: './form-select.html',
  styleUrl: './form-select.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormSelect),
      multi: true
    }
  ]
})
export class FormSelect implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() name: string = '';
  @Input() placeholder: string = 'Selecciona una opción';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() options: SelectOption[] = [];
  @Input() helpText: string = '';
  @Input() errorMessage: string = '';
  @Input() successMessage: string = '';
  @Input() hasError: boolean = false;
  @Input() hasSuccess: boolean = false;

  @Output() blur = new EventEmitter<void>();
  @Output() selectChange = new EventEmitter<any>();

  private static idCounter = 0;
  selectId: string = `form-select-${++FormSelect.idCounter}`;

  value: any = '';

  // ControlValueAccessor implementation
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: any): void {
    this.value = value || '';
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

  onBlur(): void {
    this.onTouched();
    this.blur.emit();
  }

  onSelect(event: any): void {
    this.value = event.target.value;
    this.onChange(this.value);
    this.selectChange.emit(this.value);
  }

  get ariaDescribedBy(): string {
    const ids: string[] = [];
    if (this.helpText && !this.hasError && !this.hasSuccess) {
      ids.push(`${this.selectId}-help`);
    }
    if (this.hasError && this.errorMessage) {
      ids.push(`${this.selectId}-error`);
    }
    if (this.hasSuccess && this.successMessage) {
      ids.push(`${this.selectId}-success`);
    }
    return ids.join(' ') || '';
  }
}
