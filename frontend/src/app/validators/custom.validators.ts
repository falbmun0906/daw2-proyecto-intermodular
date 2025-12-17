import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Validador de contraseña fuerte
 * Requiere: mayúscula, minúscula, número, carácter especial y mínimo 8 caracteres
 */
export function passwordStrength(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;

    const errors: ValidationErrors = {};

    if (!/[A-Z]/.test(value)) errors['noUppercase'] = true;
    if (!/[a-z]/.test(value)) errors['noLowercase'] = true;
    if (!/\d/.test(value)) errors['noNumber'] = true;
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) errors['noSpecial'] = true;
    if (value.length < 8) errors['minLength'] = true;

    return Object.keys(errors).length ? errors : null;
  };
}

/**
 * Validador de confirmación de contraseña (cross-field)
 * Verifica que dos campos coincidan
 */
export function passwordMatch(controlName: string, matchControlName: string): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const control = group.get(controlName);
    const matchControl = group.get(matchControlName);

    if (!control || !matchControl) return null;
    if (!control.value || !matchControl.value) return null;

    return control.value === matchControl.value ? null : { mismatch: true };
  };
}

/**
 * Validador de NIF español
 * Formato: 8 dígitos + letra de control
 */
export function nif(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value?.toUpperCase();
    if (!value) return null;

    const nifRegex = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/;
    if (!nifRegex.test(value)) return { invalidNif: true };

    const letters = 'TRWAGMYFPDXBNJZSQVHLCKE';
    const number = parseInt(value.substring(0, 8), 10);
    const expectedLetter = letters[number % 23];

    return value[8] === expectedLetter ? null : { invalidNif: true };
  };
}

/**
 * Validador de teléfono móvil español
 * Formato: 6 o 7 seguido de 8 dígitos
 */
export function telefono(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;

    return /^[67]\d{8}$/.test(value) ? null : { invalidTelefono: true };
  };
}

/**
 * Validador de código postal español
 * Formato: 5 dígitos
 */
export function codigoPostal(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;

    return /^\d{5}$/.test(value) ? null : { invalidCP: true };
  };
}

/**
 * Validador de al menos uno requerido (cross-field)
 * Al menos uno de los campos especificados debe tener valor
 */
export function atLeastOneRequired(...fields: string[]): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const hasOne = fields.some(field => {
      const control = group.get(field);
      return control && control.value && control.value.toString().trim() !== '';
    });

    return hasOne ? null : { atLeastOneRequired: { fields } };
  };
}

/**
 * Validador de rango de edad
 * La edad debe estar entre min y max
 */
export function ageRange(min: number, max: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;

    const age = parseInt(value, 10);
    if (isNaN(age)) return { invalidAge: true };
    if (age < min) return { minAge: { min, actual: age } };
    if (age > max) return { maxAge: { max, actual: age } };

    return null;
  };
}

