import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormCheckbox } from '../../components/shared/form-checkbox/form-checkbox';
import { Pagination } from '../../components/shared/pagination/pagination';
import { Card } from '../../components/shared/card/card';
import { RecipesHero } from '../../components/shared/recipes-hero/recipes-hero';
import { NavigationService } from '../../services/navigation.service';
import { RecipeService } from '../../services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Receta } from '../../models/receta.model';

interface FilterGroup {
  title: string;
  key: string;
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
  imports: [CommonModule, FormsModule, FormCheckbox, Pagination, Card, RecipesHero],
  templateUrl: './recipes-page.html',
  styleUrl: './recipes-page.scss'
})
export class RecipesPage implements OnInit {
  private navigationService = inject(NavigationService);
  recipeService = inject(RecipeService); // Público para usar en template
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  errorMessage = signal<string | null>(null);
  isLoading = signal<boolean>(false);
  recipes = signal<Receta[]>([]);

  breadcrumbItems = [
    { label: 'Inicio', url: '/' },
    { label: 'Recetas', url: '/recetas', isActive: true }
  ];

  searchQuery: string = '';
  currentPage: number = 1;
  totalPages: number = 1;
  pageSize: number = 5; // 5 recetas por página
  totalItems: number = 0;

  // Filtros basados en el backend - TipoDieta enum y dificultad
  filters: FilterGroup[] = [
    {
      title: 'Dificultad',
      key: 'dificultad',
      options: [
        { id: 'BAJA', label: 'Fácil', checked: false },
        { id: 'MEDIA', label: 'Media', checked: false },
        { id: 'ALTA', label: 'Difícil', checked: false }
      ]
    },
    {
      title: 'Tiempo de preparación',
      key: 'tiempoMaximo',
      options: [
        { id: '15', label: 'Hasta 15 minutos', checked: false },
        { id: '30', label: 'Hasta 30 minutos', checked: false },
        { id: '60', label: 'Hasta 60 minutos', checked: false },
        { id: '120', label: 'Hasta 2 horas', checked: false }
      ]
    },
    {
      title: 'Tipo de dieta',
      key: 'dieta',
      options: [
        { id: 'VEGANO', label: 'Vegano', checked: false },
        { id: 'VEGETARIANO', label: 'Vegetariano', checked: false },
        { id: 'SIN_GLUTEN', label: 'Sin Gluten', checked: false },
        { id: 'KETO', label: 'Keto', checked: false },
        { id: 'BAJO_EN_CARBOS', label: 'Bajo en Carbos', checked: false },
        { id: 'ALTO_EN_PROTEINA', label: 'Alto en Proteína', checked: false },
        { id: 'BAJO_EN_CALORIAS', label: 'Bajo en Calorías', checked: false },
        { id: 'LACTOSA_FREE', label: 'Sin Lactosa', checked: false },
        { id: 'DIETA_MEDITERRANEA', label: 'Mediterránea', checked: false }
      ]
    }
  ];

  /**
   * ngOnInit: Carga inicial de recetas y lectura de queryParams
   */
  ngOnInit(): void {
    // Leer mensaje de error del resolver
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state;
    if (state && state['error']) {
      this.errorMessage.set(state['error']);
      setTimeout(() => this.errorMessage.set(null), 5000);
    }

    // Leer queryParams y cargar recetas
    this.route.queryParamMap.subscribe(queryParams => {
      const page = queryParams.get('page');
      const dificultad = queryParams.get('dificultad');
      const tiempoMaximo = queryParams.get('tiempoMaximo');
      const dieta = queryParams.get('dieta');
      const q = queryParams.get('q');

      if (page) {
        this.currentPage = parseInt(page, 10);
      } else {
        this.currentPage = 1;
      }

      if (q) {
        this.searchQuery = q;
      }

      // Restaurar estado de filtros desde URL
      this.restoreFiltersFromUrl(dificultad, tiempoMaximo, dieta);

      // Cargar recetas con filtros o paginación
      this.loadRecipes(dificultad, tiempoMaximo, dieta, q);
    });
  }

  private restoreFiltersFromUrl(dificultad: string | null, tiempoMaximo: string | null, dieta: string | null): void {
    this.filters.forEach(group => {
      group.options.forEach(opt => {
        if (group.key === 'dificultad' && dificultad) {
          opt.checked = dificultad.split(',').includes(opt.id);
        } else if (group.key === 'tiempoMaximo' && tiempoMaximo) {
          opt.checked = opt.id === tiempoMaximo;
        } else if (group.key === 'dieta' && dieta) {
          opt.checked = dieta.split(',').includes(opt.id);
        } else {
          opt.checked = false;
        }
      });
    });
  }

  private loadRecipes(dificultad?: string | null, tiempoMaximo?: string | null, dieta?: string | null, nombre?: string | null): void {
    this.isLoading.set(true);

    // Si hay búsqueda por nombre, usar endpoint de búsqueda
    if (nombre) {
      this.recipeService.buscarPorNombre(nombre, this.currentPage - 1, this.pageSize).subscribe({
        next: (response) => {
          if (Array.isArray(response)) {
            // Respuesta sin paginación
            this.recipes.set(response);
            this.totalItems = response.length;
            this.totalPages = Math.ceil(response.length / this.pageSize);
          } else {
            // Respuesta paginada
            this.recipes.set(response.content);
            this.totalItems = response.totalElements;
            this.totalPages = response.totalPages;
          }
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error('Error buscando recetas:', err);
          this.isLoading.set(false);
        }
      });
      return;
    }

    // Si hay filtros activos, usar endpoint de filtros
    if (dificultad || tiempoMaximo || dieta) {
      const tiempo = tiempoMaximo ? parseInt(tiempoMaximo, 10) : undefined;
      this.recipeService.filtrar(dificultad || undefined, tiempo, dieta || undefined).subscribe({
        next: (recetas) => {
          // Paginación en cliente para filtros (el backend no soporta paginación en filtrar)
          this.totalItems = recetas.length;
          this.totalPages = Math.ceil(recetas.length / this.pageSize);
          const start = (this.currentPage - 1) * this.pageSize;
          this.recipes.set(recetas.slice(start, start + this.pageSize));
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error('Error filtrando recetas:', err);
          this.isLoading.set(false);
        }
      });
      return;
    }

    // Sin filtros: usar endpoint paginado del backend
    this.recipeService.getRecipesPaginated(this.currentPage - 1, this.pageSize).subscribe({
      next: (response) => {
        this.recipes.set(response.content);
        this.totalItems = response.totalElements;
        this.totalPages = response.totalPages;
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error cargando recetas:', err);
        this.isLoading.set(false);
      }
    });
  }


  onSearch(): void {
    this.currentPage = 1;
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
  private getActiveFilters(): Record<string, string | undefined> {
    const active: Record<string, string | undefined> = {};

    this.filters.forEach(group => {
      const checkedOptions = group.options
        .filter(opt => opt.checked)
        .map(opt => opt.id);

      if (checkedOptions.length > 0) {
        // Para tiempo, solo tomamos el primer valor (radio behavior)
        if (group.key === 'tiempoMaximo') {
          active[group.key] = checkedOptions[0];
        } else {
          active[group.key] = checkedOptions.join(',');
        }
      }
    });

    return active;
  }

  onFilterChange(groupIndex: number, optionIndex: number): void {
    this.filters[groupIndex].options[optionIndex].checked =
      !this.filters[groupIndex].options[optionIndex].checked;

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
          q: undefined, // Limpiar búsqueda al aplicar filtros
          page: 1
        }
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
    this.navigationService.goToRecipeDetail(id);
  }

  onPageChange(page: number): void {
    this.currentPage = page;

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

