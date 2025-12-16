import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

export interface RadioOption {
  value: any;
  label: string;
  disabled?: boolean;
}

/**
 * Componente FormRadioGroup reutilizable
 * Grupo de radio buttons con el mismo name
 */
@Component({
  selector: 'app-form-radio-group',
  imports: [CommonModule, FormsModule],
  templateUrl: './form-radio-group.html',
  styleUrl: './form-radio-group.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormRadioGroup),
      multi: true
    }
  ]
})
export class FormRadioGroup implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() name: string = '';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() options: RadioOption[] = [];
  @Input() inline: boolean = false; // Display inline or stacked
  @Input() helpText: string = '';
  @Input() errorMessage: string = '';
  @Input() hasError: boolean = false;

  @Output() radioChange = new EventEmitter<any>();

  private static idCounter = 0;
  groupId: string = `form-radio-group-${++FormRadioGroup.idCounter}`;

  value: any = null;

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

  onRadioChange(event: any): void {
    this.value = event.target.value;
    this.onChange(this.value);
    this.onTouched();
    this.radioChange.emit(this.value);
  }

  getRadioId(index: number): string {
    return `${this.groupId}-${index}`;
  }

  get ariaDescribedBy(): string {
    const ids: string[] = [];
    if (this.helpText && !this.hasError) {
      ids.push(`${this.groupId}-help`);
    }
    if (this.hasError && this.errorMessage) {
      ids.push(`${this.groupId}-error`);
    }
    return ids.join(' ') || '';
  }
}
