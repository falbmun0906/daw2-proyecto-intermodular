import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Button } from '../../components/shared/button/button';
import { FormInput } from '../../components/shared/form-input/form-input';
import { MealCard } from '../../components/shared/meal-card/meal-card';
import { ShoppingItem } from '../../components/shared/shopping-item/shopping-item';
import { PendingProduct } from '../../components/shared/pending-product/pending-product';
import { Icon } from '../../components/shared/icon/icon';
import { Sidebar } from '../../components/layout/sidebar/sidebar';

interface Meal {
  id: number;
  time: string;
  title: string;
  imageUrl: string;
  rating: number;
  tags: string[];
}

interface PendingProductItem {
  id: number;
  name: string;
  urgency: 'Alta' | 'Media' | 'Baja';
  daysRemaining: number;
  color: string;
  completed: boolean;
}

interface ShoppingListItem {
  id: number;
  name: string;
  quantity: string;
  imageUrl: string;
}

interface SidebarNavItem {
  id: string;
  label: string;
  icon: string;
  route: string;
  active: boolean;
}

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, Button, FormInput, MealCard, ShoppingItem, PendingProduct, Icon, Sidebar],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss'
})
export class DashboardPage {
  searchQuery: string = '';
  sidebarCollapsed: boolean = false;
  currentCarouselIndex: number = 0;
  visibleSlides: number = 3;

  sidebarItems: SidebarNavItem[] = [
    { id: 'resumen', label: 'Resumen', icon: 'house', route: '/dashboard', active: true },
    { id: 'despensa', label: 'Despensa', icon: 'package', route: '/despensa', active: false },
    { id: 'planificador', label: 'Planificador', icon: 'calendar', route: '/planificador', active: false },
    { id: 'lista', label: 'Lista de la compra', icon: 'shopping-cart', route: '/dashboard', active: false }
  ];

  todayMeals: Meal[] = [
    {
      id: 1,
      time: 'Para hoy a las 14:30',
      title: 'Patatas con carne',
      imageUrl: 'assets/recipes/pasta.png',
      rating: 4.5,
      tags: ['Casera', 'Caliente', '45min']
    },
    {
      id: 2,
      time: 'Para más tarde 21:00',
      title: 'Hamburguesa con queso',
      imageUrl: 'assets/recipes/burger.png',
      rating: 5,
      tags: ['Rápida']
    }
  ];

  pendingProducts: PendingProductItem[] = [
    { id: 1, name: 'Naranjas', urgency: 'Alta', daysRemaining: 2, color: '#FFB6C1', completed: false },
    { id: 2, name: 'Leche', urgency: 'Baja', daysRemaining: 7, color: '#E6E6FA', completed: false },
    { id: 3, name: 'Huevos', urgency: 'Media', daysRemaining: 4, color: '#FFFFE0', completed: false },
    { id: 4, name: 'Pan', urgency: 'Alta', daysRemaining: 1, color: '#FFD4B2', completed: false },
    { id: 5, name: 'Tomates', urgency: 'Media', daysRemaining: 3, color: '#FFE4E1', completed: false },
    { id: 6, name: 'Yogur', urgency: 'Baja', daysRemaining: 5, color: '#F0E68C', completed: false }
  ];

  shoppingList: ShoppingListItem[] = [
    { id: 1, name: 'Huevos', quantity: '12 unidades', imageUrl: 'assets/recipes/eggs.png' },
    { id: 2, name: 'Leche', quantity: '1 litro', imageUrl: 'assets/recipes/salad.png' },
    { id: 3, name: 'Bacon', quantity: '200g', imageUrl: 'assets/recipes/pancakes.png' },
    { id: 4, name: 'Pan', quantity: '1 barra', imageUrl: 'assets/recipes/pizza.png' },
    { id: 5, name: 'Yogures', quantity: '4 unidades', imageUrl: 'assets/recipes/cake.png' },
    { id: 6, name: 'Pimientos', quantity: '3 unidades', imageUrl: 'assets/recipes/salad.png' }
  ];

  ngOnInit(): void {
    this.updateVisibleSlides();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.updateVisibleSlides();
    // Ajustar índice si es necesario
    const maxIndex = this.getMaxCarouselIndex();
    if (this.currentCarouselIndex > maxIndex) {
      this.currentCarouselIndex = maxIndex;
    }
  }

  private updateVisibleSlides(): void {
    const width = window.innerWidth;
    if (width < 768) {
      this.visibleSlides = 1; // Móvil: carousel de 1 item
    } else if (width < 1024) {
      this.visibleSlides = 2; // Tablet: mostrar todos (grid de 2)
    } else {
      this.visibleSlides = 3; // Desktop: mostrar todos (grid de 3)
    }
  }

  get filteredShoppingList() {
    if (!this.searchQuery) return this.shoppingList;
    return this.shoppingList.filter(item =>
      item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  get visiblePendingProducts() {
    const products = this.pendingProducts.filter(p => !p.completed);

    // En móvil (< 768px), mostrar todos
    if (window.innerWidth < 768) {
      return products;
    }

    // En desktop/tablet, mantener lógica de carousel
    return products;
  }

  getCarouselTransform(): string {
    // Solo aplicar transform en móvil
    if (window.innerWidth >= 769) {
      return 'translateX(0)';
    }

    const slideWidth = 100 / this.visibleSlides;
    const translateX = -(this.currentCarouselIndex * slideWidth);
    return `translateX(${translateX}%)`;
  }

  getMaxCarouselIndex(): number {
    // Solo en móvil hay carousel
    if (window.innerWidth >= 769) {
      return 0;
    }
    return Math.max(0, this.visiblePendingProducts.length - this.visibleSlides);
  }

  canGoNext(): boolean {
    // Solo en móvil
    if (window.innerWidth >= 769) {
      return false;
    }
    return this.currentCarouselIndex < this.getMaxCarouselIndex();
  }

  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  onNavItemClick(itemId: string): void {
    this.sidebarItems.forEach(item => item.active = item.id === itemId);
    console.log('Navigate to:', itemId);
  }

  onViewRecipe(mealId: number): void {
    console.log('View recipe:', mealId);
  }

  onMarkProductDone(productId: number): void {
    const product = this.pendingProducts.find(p => p.id === productId);
    if (product) {
      product.completed = true;
      // Ajustar índice si eliminamos el último visible
      const maxIndex = this.getMaxCarouselIndex();
      if (this.currentCarouselIndex > maxIndex) {
        this.currentCarouselIndex = maxIndex;
      }
    }
  }

  prevCarousel(): void {
    if (this.currentCarouselIndex > 0) {
      this.currentCarouselIndex--;
    }
  }

  nextCarousel(): void {
    if (this.canGoNext()) {
      this.currentCarouselIndex++;
    }
  }

  onAddProduct(): void {
    console.log('Add product to shopping list');
  }

  onSearch(): void {
    console.log('Search:', this.searchQuery);
  }
}
