import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Button } from '../../components/shared/button/button';
import { FormInput } from '../../components/shared/form-input/form-input';
import { MealCard } from '../../components/shared/meal-card/meal-card';
import { ShoppingItem } from '../../components/shared/shopping-item/shopping-item';
import {PendingProduct} from '../../components/shared/pending-product/pending-product';

interface Meal {
  id: number;
  time: string;
  title: string;
  imageUrl: string;
  rating: number;
  tags: string[];
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
  active: boolean;
}

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, Button, FormInput, MealCard, ShoppingItem, PendingProduct],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss'
})
export class DashboardPage {
  searchQuery: string = '';
  sidebarCollapsed: boolean = false;

  sidebarItems: SidebarNavItem[] = [
    { id: 'resumen', label: 'Resumen', icon: '', active: true },
    { id: 'despensa', label: 'Despensa', icon: '', active: false },
    { id: 'planificador', label: 'Planificador', icon: '', active: false },
    { id: 'lista', label: 'Lista', icon: '', active: false }
  ];

  todayMeals: Meal[] = [
    {
      id: 1,
      time: 'Para hoy a las 14:30',
      title: 'Patatas con carne',
      imageUrl: 'assets/meals/stew.jpg',
      rating: 4.5,
      tags: ['Etiqueta', 'Etiqueta', 'Etiqueta', 'Tiempo']
    },
    {
      id: 2,
      time: 'Para más tarde 21:00',
      title: 'Hamburguesa con queso',
      imageUrl: 'assets/meals/burger.jpg',
      rating: 5,
      tags: ['Tiempo']
    }
  ];

  pendingProducts: PendingProduct[] = [
    { name: 'Naranjas', urgency: 'Alta', daysRemaining: 2, color: '#FFB6C1' },
    { name: 'Leche', urgency: 'Baja', daysRemaining: 7, color: '#E6E6FA' },
    { name: 'Huevos', urgency: 'Media', daysRemaining: 4, color: '#FFFFE0' }
  ];

  shoppingList: ShoppingListItem[] = [
    { id: 1, name: 'Huevos', quantity: '12 unidades', imageUrl: 'assets/ingredients/eggs.jpg' },
    { id: 2, name: 'Leche', quantity: '1 litro', imageUrl: 'assets/ingredients/milk.jpg' },
    { id: 3, name: 'Bacon', quantity: '200g', imageUrl: 'assets/ingredients/bacon.jpg' },
    { id: 4, name: 'Pan', quantity: '1 barra', imageUrl: 'assets/ingredients/bread.jpg' },
    { id: 5, name: 'Yogures', quantity: '4 unidades', imageUrl: 'assets/ingredients/yogurt.jpg' },
    { id: 6, name: 'Pimientos', quantity: '3 unidades', imageUrl: 'assets/ingredients/peppers.jpg' },
    { id: 7, name: 'Nata', quantity: '200ml', imageUrl: 'assets/ingredients/cream.jpg' },
    { id: 8, name: 'Caldo', quantity: '1 litro', imageUrl: 'assets/ingredients/broth.jpg' },
    { id: 9, name: 'Avecrem', quantity: '1 caja', imageUrl: 'assets/ingredients/stock.jpg' },
    { id: 10, name: 'Cocacola', quantity: '2 litros', imageUrl: 'assets/ingredients/cola.jpg' }
  ];

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

  onSearch(): void {
    console.log('Search:', this.searchQuery);
  }

  onFilter(): void {
    console.log('Filter clicked');
  }

  onAddProduct(): void {
    console.log('Add product');
  }

  onShareList(): void {
    console.log('Share list');
  }
}

