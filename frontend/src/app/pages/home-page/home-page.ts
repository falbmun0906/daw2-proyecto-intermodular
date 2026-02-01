import { Component, ViewEncapsulation, ViewChild, ElementRef, AfterViewInit, inject, OnInit, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Card } from '../../components/shared/card/card';
import { Button } from '../../components/shared/button/button';
import { FormInput } from '../../components/shared/form-input/form-input';
import { CarouselNavButton } from '../../components/shared/carousel-nav-button/carousel-nav-button';
import { AuthService } from '../../services/auth.service';
import { RecipeService } from '../../services/recipe.service';
import { Receta } from '../../models/receta.model';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, Card, Button, FormInput, CarouselNavButton],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
  encapsulation: ViewEncapsulation.None
})
export class HomePage implements AfterViewInit, OnInit {
  @ViewChild('carouselTrack') carouselTrack!: ElementRef;

  private authService = inject(AuthService);
  private router = inject(Router);
  private recipeService = inject(RecipeService);

  newsletterEmail: string = '';
  private carouselScrollAmount = 600; // Scroll de 600px por click

  // Signals para las recetas reales
  trendingRecipes = signal<Receta[]>([]);
  mustSeeRecipes = signal<Receta[]>([]);
  isLoadingTrending = signal<boolean>(true);
  isLoadingMustSee = signal<boolean>(true);

  ngOnInit(): void {
    // Cargar recetas del carrusel (10 recetas)
    this.recipeService.getRecipesPaginated(0, 10).subscribe({
      next: (response) => {
        this.trendingRecipes.set(response.content);
        this.isLoadingTrending.set(false);
      },
      error: (err) => {
        console.error('Error cargando recetas del carrusel:', err);
        this.isLoadingTrending.set(false);
      }
    });

    // Cargar recetas de tendencias (10 recetas, de la página 1 para que sean diferentes)
    this.recipeService.getRecipesPaginated(1, 10).subscribe({
      next: (response) => {
        this.mustSeeRecipes.set(response.content);
        this.isLoadingMustSee.set(false);
      },
      error: (err) => {
        console.error('Error cargando recetas de tendencias:', err);
        this.isLoadingMustSee.set(false);
      }
    });
  }

  ngAfterViewInit(): void {
    // Inicialización si es necesaria
  }


  onInspireClick(): void {
    // Hacer scroll suave a la sección kitchen-control
    const kitchenSection = document.getElementById('kitchen-control');
    if (kitchenSection) {
      kitchenSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  onRecipeClick(id: number): void {
    this.router.navigate(['/recetas', id]);
  }

  /**
   * Formatea una etiqueta para mostrarla de forma legible
   */
  formatTag(tag: string): string {
    if (!tag) return '';
    return tag
      .replace(/_/g, ' ')
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  /**
   * Traduce la dificultad del backend al español
   */
  getDifficultyLabel(dificultad: string): string {
    const difficultyUpper = dificultad?.toUpperCase();
    if (difficultyUpper === 'BAJA') return 'Fácil';
    if (difficultyUpper === 'MEDIA') return 'Media';
    if (difficultyUpper === 'ALTA') return 'Difícil';
    return dificultad;
  }

  onKitchenClick(): void {
    // Si el usuario está logeado, ir al dashboard
    // Si no está logeado, ir al registro
    if (this.authService.isLoggedIn) {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/registro']);
    }
  }

  onNewsletterSubmit(event: Event): void {
    event.preventDefault();
    console.log('Newsletter submit:', this.newsletterEmail);
  }

  prevSlide(): void {
    if (this.carouselTrack) {
      this.carouselTrack.nativeElement.scrollBy({
        left: -this.carouselScrollAmount,
        behavior: 'smooth'
      });
    }
  }

  nextSlide(): void {
    if (this.carouselTrack) {
      this.carouselTrack.nativeElement.scrollBy({
        left: this.carouselScrollAmount,
        behavior: 'smooth'
      });
    }
  }
}

