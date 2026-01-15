import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormCheckbox } from '../../components/shared/form-checkbox/form-checkbox';
import { FormInput } from '../../components/shared/form-input/form-input';
import { Pagination } from '../../components/shared/pagination/pagination';
import { Card } from '../../components/shared/card/card';
import { NavigationService } from '../../services/navigation.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  imports: [CommonModule, FormsModule, FormCheckbox, FormInput, Pagination, Card],
  templateUrl: './recipes-page.html',
  styleUrl: './recipes-page.scss'
})
export class RecipesPage implements OnInit {
  // Inyección del servicio de navegación
  private navigationService = inject(NavigationService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  // Mensaje de error desde el resolver (cuando falla la carga de una receta)
  errorMessage = signal<string | null>(null);

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

  /**
   * ngOnInit: Lee queryParams de la URL y mensajes de error del resolver
   * Ejemplo: /recetas?categoria=postres&dificultad=facil&page=2
   */
  ngOnInit(): void {
    // Leer mensaje de error del resolver (si hubo error al cargar una receta)
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state;
    if (state && state['error']) {
      this.errorMessage.set(state['error']);
      console.warn('⚠️ Error desde resolver:', state['error']);

      // Limpiar mensaje después de 5 segundos
      setTimeout(() => this.errorMessage.set(null), 5000);
    }

    // Leer queryParams de la URL
    this.route.queryParamMap.subscribe(queryParams => {
      const categoria = queryParams.get('categoria');
      const dificultad = queryParams.get('dificultad');
      const page = queryParams.get('page');

      console.log('Query params al cargar:', { categoria, dificultad, page });

      // Aplicar filtros si vienen en la URL
      if (page) {
        this.currentPage = parseInt(page, 10);
      }

      // Aquí podrías marcar los checkboxes según los filtros en la URL
    });
  }

  onSearch(): void {
    console.log('Search:', this.searchQuery);
    // Navegar con queryParams
    const activeFilters = this.getActiveFilters();
    this.navigationService.navigateWithFullExtras(
      ['/recetas'],
      {
        queryParams: {
          q: this.searchQuery || undefined,
          ...activeFilters,
          page: 1
        },
        queryParamsHandling: 'merge'
      }
    );
  }

  /**
   * Obtiene los filtros activos para pasarlos como queryParams
   */
  private getActiveFilters(): any {
    const active: any = {};
    this.filters.forEach(group => {
      const checkedOptions = group.options
        .filter(opt => opt.checked)
        .map(opt => opt.id);

      if (checkedOptions.length > 0) {
        active[group.title.toLowerCase().replace(/\s+/g, '_')] = checkedOptions.join(',');
      }
    });
    return active;
  }

  onFilterChange(groupIndex: number, optionIndex: number): void {
    this.filters[groupIndex].options[optionIndex].checked =
      !this.filters[groupIndex].options[optionIndex].checked;
    console.log('Filter changed:', this.filters[groupIndex].options[optionIndex]);

    // Aplicar filtros navegando con queryParams
    this.applyFilters();
  }

  /**
   * Aplica los filtros actualizando la URL con queryParams
   */
  private applyFilters(): void {
    const activeFilters = this.getActiveFilters();
    this.navigationService.navigateWithFullExtras(
      ['/recetas'],
      {
        queryParams: {
          ...activeFilters,
          page: 1
        },
        queryParamsHandling: 'merge'
      }
    );
  }

  onSaveRecipe(id: number): void {
    console.log('Save recipe:', id);
  }

  /**
   * Navega al detalle de una receta usando el servicio de navegación
   */
  onViewRecipe(id: number): void {
    console.log('View recipe:', id);
    // Ejemplo de navegación con parámetros de ruta
    this.navigationService.goToRecipeDetail(id);

    // Ejemplo de navegación con fragment (scroll a sección específica)
    // this.navigationService.goToRecipeSection(id, 'ingredientes');
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    console.log('Page changed:', page);

    // Actualizar queryParams con la nueva página
    this.navigationService.navigateWithFullExtras(
      ['/recetas'],
      {
        queryParams: { page },
        queryParamsHandling: 'merge' // Conserva otros queryParams existentes
      }
    );
  }
}

