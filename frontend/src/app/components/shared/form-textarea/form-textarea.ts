import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

/**
 * Componente FormTextarea reutilizable
 * Similar a FormInput pero para áreas de texto multilinea
 */
@Component({
  selector: 'app-form-textarea',
  imports: [CommonModule, FormsModule],
  templateUrl: './form-textarea.html',
  styleUrl: './form-textarea.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormTextarea),
      multi: true
    }
  ]
})
export class FormTextarea implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() name: string = '';
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() rows: number = 4;
  @Input() maxLength: number = 500;
  @Input() helpText: string = '';
  @Input() errorMessage: string = '';
  @Input() successMessage: string = '';
  @Input() hasError: boolean = false;
  @Input() hasSuccess: boolean = false;
  @Input() showCharCount: boolean = true;

  @Output() blur = new EventEmitter<void>();
  @Output() inputChange = new EventEmitter<any>();

  private static idCounter = 0;
  textareaId: string = `form-textarea-${++FormTextarea.idCounter}`;

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

  onInput(event: any): void {
    this.value = event.target.value;
    this.onChange(this.value);
    this.inputChange.emit(this.value);
  }

  get ariaDescribedBy(): string {
    const ids: string[] = [];
    if (this.helpText && !this.hasError && !this.hasSuccess) {
      ids.push(`${this.textareaId}-help`);
    }
    if (this.hasError && this.errorMessage) {
      ids.push(`${this.textareaId}-error`);
    }
    if (this.hasSuccess && this.successMessage) {
      ids.push(`${this.textareaId}-success`);
    }
    return ids.join(' ') || '';
  }

  get characterCount(): number {
    return this.value?.length || 0;
  }

  get remainingCharacters(): number {
    return this.maxLength - this.characterCount;
  }
}
