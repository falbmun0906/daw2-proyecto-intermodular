import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-form-input',
  imports: [CommonModule, FormsModule],
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

  @Output() blur = new EventEmitter<void>();
  @Output() inputChange = new EventEmitter<any>();

  private static idCounter = 0;
  inputId: string = `form-input-${++FormInput.idCounter}`;

  value: any = '';

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
      ids.push(`${this.inputId}-help`);
    }
    if (this.hasError && this.errorMessage) {
      ids.push(`${this.inputId}-error`);
    }
    if (this.hasSuccess && this.successMessage) {
      ids.push(`${this.inputId}-success`);
    }
    return ids.join(' ') || '';
  }
}
