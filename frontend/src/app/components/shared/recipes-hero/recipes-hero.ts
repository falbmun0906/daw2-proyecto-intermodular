import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Breadcrumbs } from '../breadcrumbs/breadcrumbs';
import { FormInput } from '../form-input/form-input';

interface HeroConfig {
  breadcrumbItems: any[];
  title: string;
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
  searchValue?: string;
}

@Component({
  selector: 'app-recipes-hero',
  standalone: true,
  imports: [CommonModule, FormsModule, Breadcrumbs, FormInput],
  templateUrl: './recipes-hero.html',
  styleUrl: './recipes-hero.scss'
})
export class RecipesHero {
  @Input() config: HeroConfig = {
    breadcrumbItems: [],
    title: '',
    searchPlaceholder: 'Buscar receta',
    searchValue: ''
  };

  searchQuery: string = '';

  onSearchChange(): void {
    if (this.config.onSearch) {
      this.config.onSearch(this.searchQuery);
    }
  }
}

