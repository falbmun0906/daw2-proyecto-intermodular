import { Injectable, signal } from '@angular/core';
import { Observable, of, delay, throwError } from 'rxjs';

export interface Recipe {
  id: number;
  title: string;
  rating: number;
  ratingCount: number;
  tags: string[];
  imageUrl: string;
  description: string;
  servings: number;
  prepTime: string;
  cookTime: string;
  difficulty: string;
  ingredients: Ingredient[];
  steps: RecipeStep[];
}

export interface Ingredient {
  id: number;
  name: string;
  quantity: string;
  imageUrl: string;
}

export interface RecipeStep {
  id: number;
  stepNumber: number;
  totalSteps: number;
  duration: string;
  description: string;
}

/**
 * Servicio de recetas (simulado con datos mock)
 * En producción, esto haría llamadas HTTP a un backend real
 */
@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: Recipe[] = [
    {
      id: 1,
      title: 'Pizza Margarita',
      rating: 4.5,
      ratingCount: 125,
      tags: ['Italiana', 'Fácil', 'Rápida'],
      imageUrl: 'assets/recipes/pizza.png',
      description: 'La pizza Margarita es un clásico de la cocina italiana que nunca pasa de moda.',
      servings: 4,
      prepTime: '15 min',
      cookTime: '20 min',
      difficulty: 'Fácil',
      ingredients: [
        { id: 1, name: 'Harina', quantity: '300g', imageUrl: 'assets/ingredients/flour.jpg' },
        { id: 2, name: 'Sal', quantity: '1 cucharadita', imageUrl: 'assets/ingredients/salt.jpg' },
        { id: 3, name: 'Levadura', quantity: '1 sobre', imageUrl: 'assets/ingredients/yeast.jpg' },
        { id: 4, name: 'Agua tibia', quantity: '200ml', imageUrl: 'assets/ingredients/water.jpg' },
        { id: 5, name: 'Aceite de oliva', quantity: '2 cucharadas', imageUrl: 'assets/ingredients/oil.jpg' },
        { id: 6, name: 'Tomate triturado', quantity: '200g', imageUrl: 'assets/ingredients/tomato.jpg' },
        { id: 7, name: 'Queso mozzarella', quantity: '200g', imageUrl: 'assets/ingredients/mozzarella.jpg' },
        { id: 8, name: 'Albahaca fresca', quantity: '1 manojo', imageUrl: 'assets/ingredients/basil.jpg' }
      ],
      steps: [
        {
          id: 1,
          stepNumber: 1,
          totalSteps: 4,
          duration: '10 minutos',
          description: 'Mezcla la harina con la sal en un bol grande. Disuelve la levadura en el agua tibia y añádela a la harina junto con el aceite.'
        },
        {
          id: 2,
          stepNumber: 2,
          totalSteps: 4,
          duration: '5 minutos',
          description: 'Precalienta el horno a 220°C. Extiende la masa sobre una superficie enharinada.'
        },
        {
          id: 3,
          stepNumber: 3,
          totalSteps: 4,
          duration: '15 minutos',
          description: 'Extiende el tomate triturado sobre la base. Distribuye el queso mozzarella y hornea 12-15 minutos.'
        },
        {
          id: 4,
          stepNumber: 4,
          totalSteps: 4,
          duration: '2 minutos',
          description: 'Retira del horno y decora con albahaca fresca. Sirve caliente.'
        }
      ]
    },
    {
      id: 2,
      title: 'Paella Valenciana',
      rating: 4.8,
      ratingCount: 89,
      tags: ['Española', 'Tradicional', 'Arroz'],
      imageUrl: 'assets/recipes/paella.jpg',
      description: 'La auténtica paella valenciana con pollo, conejo y judías verdes.',
      servings: 6,
      prepTime: '20 min',
      cookTime: '40 min',
      difficulty: 'Media',
      ingredients: [],
      steps: []
    },
    {
      id: 3,
      title: 'Tarta de Chocolate',
      rating: 4.9,
      ratingCount: 234,
      tags: ['Postre', 'Chocolate', 'Fácil'],
      imageUrl: 'assets/recipes/chocolate-cake.jpg',
      description: 'Deliciosa tarta de chocolate perfecta para cualquier ocasión.',
      servings: 8,
      prepTime: '25 min',
      cookTime: '35 min',
      difficulty: 'Fácil',
      ingredients: [],
      steps: []
    }
  ];

  /**
   * Obtiene una receta por ID
   * Simula delay de red (500ms) para mostrar loading
   *
   * @param id ID de la receta
   * @returns Observable<Recipe> o error si no existe
   */
  getRecipeById(id: string | number): Observable<Recipe> {
    const recipeId = typeof id === 'string' ? parseInt(id, 10) : id;

    // Simular delay de red
    return of(recipeId).pipe(
      delay(500), // Simula latencia de red
      // Buscar receta
      // Si no existe, lanzar error
      (source) => {
        const recipe = this.recipes.find(r => r.id === recipeId);
        if (!recipe) {
          return throwError(() => new Error(`Receta con ID ${recipeId} no encontrada`));
        }
        return of(recipe);
      }
    );
  }

  /**
   * Obtiene todas las recetas
   */
  getAllRecipes(): Observable<Recipe[]> {
    return of(this.recipes).pipe(delay(300));
  }
}

