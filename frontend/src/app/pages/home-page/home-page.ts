import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Card } from '../../components/shared/card/card';
import { Button } from '../../components/shared/button/button';
import { FormInput } from '../../components/shared/form-input/form-input';

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
  imports: [RouterModule, CommonModule, FormsModule, Card, Button, FormInput],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
  encapsulation: ViewEncapsulation.None
})
export class HomePage {
  newsletterEmail: string = '';

  // Iconos
  prevIcon: string = 'chevron-right';
  nextIcon: string = 'chevron-right';
  searchIcon: string = 'search';

  trendingRecipes: Recipe[] = [
    {
      id: 1,
      title: 'Hamburguesa',
      imageUrl: 'assets/recipes/burger.jpg',
      rating: 4.5,
      category: 'Almuerzo',
      time: '30 min',
      difficulty: 'Fácil'
    },
    {
      id: 2,
      title: 'Pizza',
      imageUrl: 'assets/recipes/pizza.jpg',
      rating: 5,
      category: 'Cena',
      time: '45 min',
      difficulty: 'Media'
    },
    {
      id: 3,
      title: 'Huevos fritos',
      imageUrl: 'assets/recipes/eggs.jpg',
      rating: 4,
      category: 'Desayuno',
      time: '10 min',
      difficulty: 'Fácil'
    }
  ];

  mustSeeRecipes: Recipe[] = [
    {
      id: 4,
      title: 'Ensalada César',
      imageUrl: 'assets/recipes/salad.jpg',
      rating: 4.5,
      category: 'Almuerzo',
      time: '15 min',
      difficulty: 'Fácil'
    },
    {
      id: 5,
      title: 'Pasta Carbonara',
      imageUrl: 'assets/recipes/pasta.jpg',
      rating: 5,
      category: 'Cena',
      time: '25 min',
      difficulty: 'Media'
    },
    {
      id: 6,
      title: 'Tarta de chocolate',
      imageUrl: 'assets/recipes/cake.jpg',
      rating: 4.8,
      category: 'Postre',
      time: '60 min',
      difficulty: 'Difícil'
    },
    {
      id: 4,
      title: 'Ensalada César',
      imageUrl: 'assets/recipes/salad.jpg',
      rating: 4.5,
      category: 'Almuerzo',
      time: '15 min',
      difficulty: 'Fácil'
    },
    {
      id: 5,
      title: 'Pasta Carbonara',
      imageUrl: 'assets/recipes/pasta.jpg',
      rating: 5,
      category: 'Cena',
      time: '25 min',
      difficulty: 'Media'
    },
    {
      id: 6,
      title: 'Tarta de chocolate',
      imageUrl: 'assets/recipes/cake.jpg',
      rating: 4.8,
      category: 'Postre',
      time: '60 min',
      difficulty: 'Difícil'
    },
    {
      id: 4,
      title: 'Ensalada César',
      imageUrl: 'assets/recipes/salad.jpg',
      rating: 4.5,
      category: 'Almuerzo',
      time: '15 min',
      difficulty: 'Fácil'
    },
    {
      id: 5,
      title: 'Pasta Carbonara',
      imageUrl: 'assets/recipes/pasta.jpg',
      rating: 5,
      category: 'Cena',
      time: '25 min',
      difficulty: 'Media'
    },
    {
      id: 6,
      title: 'Tarta de chocolate',
      imageUrl: 'assets/recipes/cake.jpg',
      rating: 4.8,
      category: 'Postre',
      time: '60 min',
      difficulty: 'Difícil'
    },
    {
      id: 4,
      title: 'Ensalada César',
      imageUrl: 'assets/recipes/salad.jpg',
      rating: 4.5,
      category: 'Almuerzo',
      time: '15 min',
      difficulty: 'Fácil'
    },
    {
      id: 5,
      title: 'Pasta Carbonara',
      imageUrl: 'assets/recipes/pasta.jpg',
      rating: 5,
      category: 'Cena',
      time: '25 min',
      difficulty: 'Media'
    },
    {
      id: 6,
      title: 'Tarta de chocolate',
      imageUrl: 'assets/recipes/cake.jpg',
      rating: 4.8,
      category: 'Postre',
      time: '60 min',
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
    console.log('Previous slide');
  }

  nextSlide(): void {
    console.log('Next slide');
  }
}

