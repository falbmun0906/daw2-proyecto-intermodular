import { inject } from '@angular/core';
import { ResolveFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RecipeService, Recipe } from '../services/recipe.service';
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
export const recipeResolver: ResolveFn<Recipe | null> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const recipeService = inject(RecipeService);
  const router = inject(Router);
  const id = route.paramMap.get('id')!;

  console.log(`📥 recipeResolver: Cargando receta con ID ${id}`);

  return recipeService.getRecipeById(id).pipe(
    catchError(error => {
      console.error(`❌ recipeResolver: Error cargando receta ${id}:`, error);

      // Redirigir a listado de recetas con mensaje de error
      router.navigate(['/recetas'], {
        state: {
          error: `No se pudo cargar la receta con ID ${id}. La receta no existe o ha ocurrido un error.`
        }
      });

      // Retornar null para que la navegación no falle completamente
      return of(null);
    })
  );
};

