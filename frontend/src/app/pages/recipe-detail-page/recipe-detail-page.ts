import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { Badge } from '../../components/shared/badge/badge';
import { Button } from '../../components/shared/button/button';
import { Breadcrumbs } from '../../components/shared/breadcrumbs/breadcrumbs';
import { IngredientCard } from '../../components/shared/ingredient-card/ingredient-card';
import { Recipe } from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-detail-page',
  standalone: true,
  imports: [CommonModule, RouterModule, Badge, Button, Breadcrumbs, IngredientCard],
  templateUrl: './recipe-detail-page.html',
  styleUrl: './recipe-detail-page.scss'
})
export class RecipeDetailPage implements OnInit {
  // Inyección de dependencias con inject()
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  // Signals para datos reactivos
  recipeId = signal<string | null>(null);
  recipe = signal<Recipe | null>(null);
  loading = signal<boolean>(true);

  // Lectura de queryParams y fragment (ejemplo)
  categoria = signal<string | null>(null);
  fragment = signal<string | null>(null);

  // Estado pasado por navegación programática
  navigationState = signal<any>(null);

  servings: number = 4;
  userRating: number = 0;

  breadcrumbItems = [
    { label: 'Inicio', url: '/' },
    { label: 'Recetas', url: '/recetas' },
    { label: 'Cargando...', url: '' }
  ];

  /**
   * ngOnInit: Lee datos resueltos del resolver y parámetros de ruta
   *
   * TAREA 4.5 - Resolvers:
   * - Lee receta precargada desde route.data (resuelto por recipeResolver)
   * - Maneja estado de loading mientras el resolver trabaja
   * - El componente recibe datos listos para mostrar
   */
  ngOnInit(): void {
    // LEER DATOS DEL RESOLVER
    // El resolver precarga los datos antes de activar el componente
    this.route.data.subscribe(({ recipe }) => {
      console.log('📦 RecipeDetailPage: Datos recibidos del resolver:', recipe);

      if (recipe) {
        this.recipe.set(recipe);
        this.servings = recipe.servings || 4;

        // Actualizar breadcrumb con el título real
        this.breadcrumbItems[2].label = recipe.title;

        this.loading.set(false);
        console.log('✅ Receta cargada:', recipe.title);
      } else {
        // Si recipe es null, el resolver manejó un error y redirigió
        console.warn('⚠️ No se recibió receta del resolver (error manejado)');
        this.loading.set(false);
      }
    });

    // Leer parámetro de ruta :id
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.recipeId.set(id);
    });

    // Leer queryParams (ej: /recetas/1?categoria=postres&page=2)
    this.route.queryParamMap.subscribe(queryParams => {
      const categoria = queryParams.get('categoria');
      this.categoria.set(categoria);
    });

    // Leer fragment (ej: /recetas/1#comentarios)
    this.route.fragment.subscribe(fragment => {
      this.fragment.set(fragment);

      // Scroll automático a la sección
      if (fragment) {
        setTimeout(() => {
          const element = document.getElementById(fragment);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    });

    // Leer estado de navegación
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state;
    if (state) {
      this.navigationState.set(state);
    }
  }

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

