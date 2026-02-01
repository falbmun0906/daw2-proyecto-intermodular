import { inject } from '@angular/core';
import { ResolveFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RecipeService } from '../services/recipe.service';
import { RecetaCompleta } from '../models/receta.model';
import { catchError, of } from 'rxjs';

/**
 * Resolver para precargar datos de receta antes de activar la ruta
 *
 * - Carga la receta por ID desde RecipeService
 * - En caso de error, redirige a /recetas con mensaje de error en state
 * - El componente recibe el dato ya resuelto desde route.data
 *
 * @example
 * {
 *   path: 'recetas/:id',
 *   component: RecipeDetailPage,
 *   resolve: { recipe: recipeResolver }
 * }
 */
export const recipeResolver: ResolveFn<RecetaCompleta | null> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const recipeService = inject(RecipeService);
  const router = inject(Router);
  const id = route.paramMap.get('id')!;

  return recipeService.getRecipeComplete(+id).pipe(
    catchError(error => {
      router.navigate(['/recetas'], {
        state: {
          error: `No se pudo cargar la receta con ID ${id}. La receta no existe o ha ocurrido un error.`
        }
      });

      return of(null);
    })
  );
};

