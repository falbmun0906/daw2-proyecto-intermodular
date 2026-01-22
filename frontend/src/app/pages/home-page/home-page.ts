import { Component, ViewEncapsulation, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Card } from '../../components/shared/card/card';
import { Button } from '../../components/shared/button/button';
import { FormInput } from '../../components/shared/form-input/form-input';
import { CarouselNavButton } from '../../components/shared/carousel-nav-button/carousel-nav-button';

interface Recipe {
  id: number;
  title: string;
  imageUrl: string;
  rating: number;
  category: string;
  time: string;
  difficulty: string;
}

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, Card, Button, FormInput, CarouselNavButton],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
  encapsulation: ViewEncapsulation.None
})
export class HomePage implements AfterViewInit {
  @ViewChild('carouselTrack') carouselTrack!: ElementRef;

  newsletterEmail: string = '';
  private carouselScrollAmount = 600; // Scroll de 600px por click

  ngAfterViewInit(): void {
    // Inicialización si es necesaria
  }

  trendingRecipes: Recipe[] = [
    {
      id: 1,
      title: 'Hamburguesa',
      imageUrl: 'assets/recipes/burger.png',
      rating: 4.5,
      category: 'Almuerzo',
      time: '30 min',
      difficulty: 'Fácil'
    },
    {
      id: 2,
      title: 'Pizza',
      imageUrl: 'assets/recipes/pizza-margarita.png',
      rating: 5,
      category: 'Cena',
      time: '45 min',
      difficulty: 'Media'
    },
    {
      id: 3,
      title: 'Huevos fritos',
      imageUrl: 'assets/recipes/eggs.png',
      rating: 4,
      category: 'Desayuno',
      time: '10 min',
      difficulty: 'Fácil'
    },
    {
      id: 4,
      title: 'Ensalada César',
      imageUrl: 'assets/recipes/salad.png',
      rating: 4.2,
      category: 'Almuerzo',
      time: '15 min',
      difficulty: 'Fácil'
    },
    {
      id: 5,
      title: 'Pasta Carbonara',
      imageUrl: 'assets/recipes/pasta.png',
      rating: 4.8,
      category: 'Cena',
      time: '25 min',
      difficulty: 'Media'
    },
    {
      id: 6,
      title: 'Tortitas con sirope',
      imageUrl: 'assets/recipes/pancakes.png',
      rating: 4.6,
      category: 'Desayuno',
      time: '20 min',
      difficulty: 'Fácil'
    }
  ];

  mustSeeRecipes: Recipe[] = [
    {
      id: 4,
      title: 'Ensalada César',
      imageUrl: 'assets/recipes/salad.png',
      rating: 4.5,
      category: 'Almuerzo',
      time: '15 min',
      difficulty: 'Fácil'
    },
    {
      id: 5,
      title: 'Pasta Carbonara',
      imageUrl: 'assets/recipes/pasta.png',
      rating: 5,
      category: 'Cena',
      time: '25 min',
      difficulty: 'Media'
    },
    {
      id: 6,
      title: 'Tarta de chocolate',
      imageUrl: 'assets/recipes/cake.png',
      rating: 4.8,
      category: 'Postre',
      time: '60 min',
      difficulty: 'Difícil'
    },
    {
      id: 7,
      title: 'Sopa de tomate',
      imageUrl: 'assets/recipes/soup.avif',
      rating: 4.5,
      category: 'Almuerzo',
      time: '20 min',
      difficulty: 'Fácil'
    },
    {
      id: 8,
      title: 'Pechuga de pollo a la mostaza',
      imageUrl: 'assets/recipes/chicken.avif',
      rating: 5,
      category: 'Cena',
      time: '30 min',
      difficulty: 'Media'
    },
    {
      id: 9,
      title: 'Tiramisú',
      imageUrl: 'assets/recipes/tiramisu.avif',
      rating: 4.8,
      category: 'Postre',
      time: '45 min',
      difficulty: 'Media'
    },
    {
      id: 10,
      title: 'Ramen casero',
      imageUrl: 'assets/recipes/ramen.webp',
      rating: 4.5,
      category: 'Almuerzo',
      time: '40 min',
      difficulty: 'Media'
    },
    {
      id: 11,
      title: 'Salmón al horno',
      imageUrl: 'assets/recipes/salmon.webp',
      rating: 5,
      category: 'Cena',
      time: '35 min',
      difficulty: 'Media'
    },
    {
      id: 12,
      title: 'Brownies de chocolate',
      imageUrl: 'assets/recipes/brownies.avif',
      rating: 4.8,
      category: 'Postre',
      time: '50 min',
      difficulty: 'Media'
    },
    {
      id: 13,
      title: 'Tacos al pastor',
      imageUrl: 'assets/recipes/tacos.webp',
      rating: 4.5,
      category: 'Almuerzo',
      time: '25 min',
      difficulty: 'Media'
    },
    {
      id: 14,
      title: 'Filete con salsa de champiñones',
      imageUrl: 'assets/recipes/steak.avif',
      rating: 5,
      category: 'Cena',
      time: '40 min',
      difficulty: 'Difícil'
    },
    {
      id: 15,
      title: 'Macarons de frambuesa',
      imageUrl: 'assets/recipes/macarons.avif',
      rating: 4.8,
      category: 'Postre',
      time: '90 min',
      difficulty: 'Difícil'
    }
  ];

  onInspireClick(): void {
    console.log('Inspirar clicked');
  }

  onRecipeClick(id: number): void {
    console.log('Recipe clicked:', id);
  }

  onKitchenClick(): void {
    console.log('Kitchen clicked');
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

