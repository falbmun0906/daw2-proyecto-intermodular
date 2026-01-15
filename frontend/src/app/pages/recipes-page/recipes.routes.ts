import { Routes } from '@angular/router';
import { RecipesPage } from './recipes-page';
import { RecipeDetailPage } from '../recipe-detail-page/recipe-detail-page';
import { recipeResolver } from '../../resolvers/recipe.resolver';

/**
 * Rutas del módulo de recetas (lazy-loaded)
 * Se cargan solo cuando el usuario navega a /recetas
 */
export const RECIPES_ROUTES: Routes = [
  {
    path: '',
    component: RecipesPage,
    data: { breadcrumb: 'Recetas' }
  },
  {
    path: ':id',
    component: RecipeDetailPage,
    resolve: { recipe: recipeResolver }, // Precarga datos antes de activar componente
    data: { breadcrumb: 'Detalle' }
  }
];

