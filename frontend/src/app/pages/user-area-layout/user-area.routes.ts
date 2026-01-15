import { Routes } from '@angular/router';
import { UserAreaLayout } from './user-area-layout';
import { DashboardPage } from '../dashboard-page/dashboard-page';
import { PantryPage } from '../pantry-page/pantry-page';
import { PlannerPage } from '../planner-page/planner-page';
import { ProfileEditPage } from '../profile-edit-page/profile-edit-page';
import { authGuard } from '../../guards/auth.guard';
import { pendingChangesGuard } from '../../guards/pending-changes.guard';

/**
 * Rutas del área de usuario (lazy-loaded y protegidas)
 * Requieren autenticación mediante authGuard
 */
export const USER_AREA_ROUTES: Routes = [
  {
    path: '',
    component: UserAreaLayout,
    canActivate: [authGuard], // Protege todo el módulo
    data: { breadcrumb: 'Mi Cocina' },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      },
      {
        path: 'dashboard',
        component: DashboardPage,
        data: { breadcrumb: 'Dashboard' }
      },
      {
        path: 'despensa',
        component: PantryPage,
        data: { breadcrumb: 'Despensa' }
      },
      {
        path: 'planificador',
        component: PlannerPage,
        data: { breadcrumb: 'Planificador' }
      },
      {
        path: 'perfil/editar',
        component: ProfileEditPage,
        canDeactivate: [pendingChangesGuard], // Protege formulario con cambios
        data: { breadcrumb: 'Editar Perfil' }
      }
    ]
  }
];
