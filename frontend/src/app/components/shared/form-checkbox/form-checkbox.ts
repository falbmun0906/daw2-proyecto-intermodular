import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

/**
 * Componente FormCheckbox reutilizable
 * Input tipo checkbox con label asociado
 */
@Component({
  selector: 'app-form-checkbox',
  imports: [CommonModule, FormsModule],
  templateUrl: './form-checkbox.html',
  styleUrl: './form-checkbox.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormCheckbox),
      multi: true
    }
  ]
})
export class FormCheckbox implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() name: string = '';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() helpText: string = '';
  @Input() errorMessage: string = '';
  @Input() hasError: boolean = false;

  @Output() checkboxChange = new EventEmitter<boolean>();

  private static idCounter = 0;
  checkboxId: string = `form-checkbox-${++FormCheckbox.idCounter}`;

  value: boolean = false;

  // ControlValueAccessor implementation
  private onChange: (value: boolean) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: boolean): void {
    this.value = value || false;
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

  onCheck(event: any): void {
    this.value = event.target.checked;
    this.onChange(this.value);
    this.onTouched();
    this.checkboxChange.emit(this.value);
  }

  get ariaDescribedBy(): string {
    const ids: string[] = [];
    if (this.helpText && !this.hasError) {
      ids.push(`${this.checkboxId}-help`);
    }
    if (this.hasError && this.errorMessage) {
      ids.push(`${this.checkboxId}-error`);
    }
    return ids.join(' ') || '';
  }
}
