import { CanDeactivateFn } from '@angular/router';
import { FormGroup } from '@angular/forms';

/**
 * Interfaz que deben implementar los componentes con formularios
 * que quieran usar el pendingChangesGuard
 */
export interface FormComponent {
  form: FormGroup;
}

/**
 * Guard funcional para prevenir navegación cuando hay cambios sin guardar
 *
 * Muestra un diálogo de confirmación nativo si el formulario tiene cambios (dirty)
 * El usuario puede:
 * - Aceptar: abandona la página perdiendo cambios
 * - Cancelar: permanece en la página
 *
 * @example
 * {
 *   path: 'perfil/editar',
 *   component: ProfileFormComponent,
 *   canDeactivate: [pendingChangesGuard]
 * }
 */
export const pendingChangesGuard: CanDeactivateFn<FormComponent> = (
  component,
  currentRoute,
  currentState,
  nextState
) => {
  // Si el formulario no tiene cambios, permite navegar
  if (!component.form || !component.form.dirty) {
    return true;
  }

  // Muestra diálogo de confirmación
  const confirmed = confirm(
    '⚠️ Hay cambios sin guardar.\n\n¿Estás seguro de que quieres salir?\n\nLos cambios se perderán.'
  );

  if (confirmed) {
    console.log('✅ pendingChangesGuard: Usuario confirmó salir sin guardar');
  } else {
    console.log('🚫 pendingChangesGuard: Usuario canceló, permanece en formulario');
  }

  return confirmed;
};

