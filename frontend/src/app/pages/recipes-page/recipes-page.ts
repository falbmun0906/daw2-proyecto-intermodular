import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormCheckbox } from '../../components/shared/form-checkbox/form-checkbox';
import { FormInput } from '../../components/shared/form-input/form-input';
import { Pagination } from '../../components/shared/pagination/pagination';
import { RecipeListItem } from '../../components/shared/recipe-list-item/recipe-list-item';

interface Recipe {
  id: number;
  title: string;
  imageUrl: string;
  rating: number;
  ratingCount: number;
  tags: string[];
}

interface FilterGroup {
  title: string;
  options: FilterOption[];
}

interface FilterOption {
  id: string;
  label: string;
  checked: boolean;
}

@Component({
  selector: 'app-recipes-page',
  standalone: true,
  imports: [CommonModule, FormsModule, FormCheckbox, FormInput, Pagination, RecipeListItem],
  templateUrl: './recipes-page.html',
  styleUrl: './recipes-page.scss'
})
export class RecipesPage {
  searchQuery: string = '';
  currentPage: number = 1;
  totalPages: number = 7;

  filters: FilterGroup[] = [
    {
      title: 'Disponible',
      options: [
        { id: 'in-pantry', label: 'En mi despensa', checked: false }
      ]
    },
    {
      title: 'Dificultad',
      options: [
        { id: 'easy', label: 'Fácil', checked: false },
        { id: 'normal', label: 'Normal', checked: false },
        { id: 'hard', label: 'Difícil', checked: false }
      ]
    },
    {
      title: 'Tiempo de preparación',
      options: [
        { id: 'time-0-10', label: '0–10 minutos', checked: false },
        { id: 'time-10-30', label: '10–30 minutos', checked: false },
        { id: 'time-30-60', label: '30–60 minutos', checked: false },
        { id: 'time-60-plus', label: 'Más de 60 minutos', checked: false }
      ]
    },
    {
      title: 'Restricciones o dietas',
      options: [
        { id: 'gluten-free', label: 'Sin gluten', checked: false },
        { id: 'low-fat', label: 'Baja en grasas', checked: false },
        { id: 'vegetarian', label: 'Vegetariana', checked: false },
        { id: 'vegan', label: 'Vegana', checked: false }
      ]
    },
    {
      title: 'Ingredientes principales',
      options: [
        { id: 'eggs', label: 'Huevos', checked: false },
        { id: 'chicken', label: 'Pollo', checked: false },
        { id: 'pasta', label: 'Pasta', checked: false },
        { id: 'vegetables', label: 'Vegetales', checked: false }
      ]
    }
  ];

  recipes: Recipe[] = [
    {
      id: 1,
      title: 'Huevos fritos',
      imageUrl: 'assets/recipes/eggs.jpg',
      rating: 0,
      ratingCount: 0,
      tags: ['Rápida', 'Económica']
    },
    {
      id: 2,
      title: 'Huevos fritos',
      imageUrl: 'assets/recipes/eggs.jpg',
      rating: 0,
      ratingCount: 0,
      tags: ['Rápida', 'Económica']
    },
    {
      id: 3,
      title: 'Huevos fritos',
      imageUrl: 'assets/recipes/eggs.jpg',
      rating: 0,
      ratingCount: 0,
      tags: ['Rápida', 'Económica']
    },
    {
      id: 4,
      title: 'Huevos fritos',
      imageUrl: 'assets/recipes/eggs.jpg',
      rating: 0,
      ratingCount: 0,
      tags: ['Rápida', 'Económica']
    }
  ];

  onSearch(): void {
    console.log('Search:', this.searchQuery);
  }

  onFilterChange(groupIndex: number, optionIndex: number): void {
    this.filters[groupIndex].options[optionIndex].checked =
      !this.filters[groupIndex].options[optionIndex].checked;
    console.log('Filter changed:', this.filters[groupIndex].options[optionIndex]);
  }

  onSaveRecipe(id: number): void {
    console.log('Save recipe:', id);
  }

  onViewRecipe(id: number): void {
    console.log('View recipe:', id);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    console.log('Page changed:', page);
  }
}

