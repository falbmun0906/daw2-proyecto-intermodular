import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Badge } from '../../components/shared/badge/badge';
import { Button } from '../../components/shared/button/button';
import { Breadcrumbs } from '../../components/shared/breadcrumbs/breadcrumbs';
import { IngredientCard } from '../../components/shared/ingredient-card/ingredient-card';

interface Ingredient {
  id: number;
  name: string;
  quantity: string;
  imageUrl: string;
}

interface RecipeStep {
  id: number;
  stepNumber: number;
  totalSteps: number;
  duration: string;
  description: string;
}

@Component({
  selector: 'app-recipe-detail-page',
  standalone: true,
  imports: [CommonModule, RouterModule, Badge, Button, Breadcrumbs, IngredientCard],
  templateUrl: './recipe-detail-page.html',
  styleUrl: './recipe-detail-page.scss'
})
export class RecipeDetailPage {
  recipe = {
    id: 1,
    title: 'Pizza margarita',
    rating: 0,
    ratingCount: 0,
    tags: ['Italiana', 'Fácil', 'Rápida'],
    imageUrl: 'assets/recipes/pizza.jpg',
    description: `La pizza Margarita es un clásico de la cocina italiana que nunca pasa de moda.
    Con una base crujiente de masa casera, salsa de tomate fresca, queso mozzarella fundido y
    hojas de albahaca, esta receta es perfecta para una cena familiar o con amigos.
    La combinación de sabores es simple pero deliciosa, representando los colores de la bandera italiana.`
  };

  servings: number = 4;

  ingredients: Ingredient[] = [
    { id: 1, name: 'Harina', quantity: '300g', imageUrl: 'assets/ingredients/flour.jpg' },
    { id: 2, name: 'Sal', quantity: '1 cucharadita', imageUrl: 'assets/ingredients/salt.jpg' },
    { id: 3, name: 'Levadura', quantity: '1 sobre', imageUrl: 'assets/ingredients/yeast.jpg' },
    { id: 4, name: 'Agua tibia', quantity: '200ml', imageUrl: 'assets/ingredients/water.jpg' },
    { id: 5, name: 'Aceite de oliva', quantity: '2 cucharadas', imageUrl: 'assets/ingredients/oil.jpg' },
    { id: 6, name: 'Tomate triturado', quantity: '200g', imageUrl: 'assets/ingredients/tomato.jpg' },
    { id: 7, name: 'Queso mozzarella', quantity: '200g', imageUrl: 'assets/ingredients/mozzarella.jpg' },
    { id: 8, name: 'Albahaca fresca', quantity: '1 manojo', imageUrl: 'assets/ingredients/basil.jpg' }
  ];

  steps: RecipeStep[] = [
    {
      id: 1,
      stepNumber: 1,
      totalSteps: 4,
      duration: '10 minutos',
      description: `Mezcla la harina con la sal en un bol grande. Disuelve la levadura en el agua tibia
      y añádela a la harina junto con el aceite. Amasa durante 10 minutos hasta obtener una masa elástica
      y homogénea. Cubre con un paño y deja reposar en un lugar cálido durante 1 hora.`
    },
    {
      id: 2,
      stepNumber: 2,
      totalSteps: 4,
      duration: '5 minutos',
      description: `Precalienta el horno a 220°C. Extiende la masa sobre una superficie enharinada hasta
      obtener el grosor deseado. Colócala sobre una bandeja de horno con papel de hornear.`
    },
    {
      id: 3,
      stepNumber: 3,
      totalSteps: 4,
      duration: '15 minutos',
      description: `Extiende el tomate triturado sobre la base de masa. Distribuye el queso mozzarella
      cortado en rodajas o desmenuzado por encima. Hornea durante 12-15 minutos hasta que los bordes
      estén dorados y el queso burbujeante.`
    },
    {
      id: 4,
      stepNumber: 4,
      totalSteps: 4,
      duration: '2 minutos',
      description: `Retira la pizza del horno y decora con hojas frescas de albahaca.
      Añade un chorrito de aceite de oliva virgen extra y sirve caliente. ¡Buon appetito!`
    }
  ];

  userRating: number = 0;

  breadcrumbItems = [
    { label: 'Inicio', url: '/' },
    { label: 'Recetas', url: '/recetas' },
    { label: 'Pizza Margarita', url: '' }
  ];

  decreaseServings(): void {
    if (this.servings > 1) {
      this.servings--;
    }
  }

  increaseServings(): void {
    this.servings++;
  }

  onAddToList(): void {
    console.log('Añadir ingredientes a la lista');
  }

  onRate(stars: number): void {
    this.userRating = stars;
    console.log('Rating:', stars);
  }

  onAddToFavorites(): void {
    console.log('Añadir a favoritos');
  }

  onSave(): void {
    console.log('Guardar receta');
  }
}

