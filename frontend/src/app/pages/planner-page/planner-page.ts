import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Button } from '../../components/shared/button/button';
import { FormInput } from '../../components/shared/form-input/form-input';
import { MealPlanCard } from '../../components/shared/meal-plan-card/meal-plan-card';

interface CalendarDay {
  date: number;
  mealsCount: 0 | 1 | 2;
}

interface MealPlan {
  id: number;
  dateTime: string;
  title: string;
  imageUrl: string;
  tags: string[];
}

interface SidebarNavItem {
  id: string;
  label: string;
  icon: string;
  active: boolean;
}

@Component({
  selector: 'app-planner-page',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, Button, FormInput, MealPlanCard],
  templateUrl: './planner-page.html',
  styleUrl: './planner-page.scss'
})
export class PlannerPage {
  searchQuery: string = '';
  sidebarCollapsed: boolean = false;

  sidebarItems: SidebarNavItem[] = [
    { id: 'resumen', label: 'Resumen', icon: '📊', active: false },
    { id: 'despensa', label: 'Despensa', icon: '🏪', active: false },
    { id: 'planificador', label: 'Planificador', icon: '📅', active: true },
    { id: 'lista', label: 'Lista', icon: '📝', active: false }
  ];

  calendarDays: CalendarDay[] = [
    { date: 24, mealsCount: 2 }, { date: 25, mealsCount: 1 }, { date: 26, mealsCount: 0 },
    { date: 27, mealsCount: 2 }, { date: 28, mealsCount: 2 }, { date: 29, mealsCount: 1 },
    { date: 30, mealsCount: 1 }, { date: 1, mealsCount: 2 }, { date: 2, mealsCount: 0 },
    { date: 3, mealsCount: 1 }, { date: 4, mealsCount: 2 }, { date: 5, mealsCount: 0 },
    { date: 6, mealsCount: 1 }, { date: 7, mealsCount: 2 }
  ];

  mealPlans: MealPlan[] = [
    {
      id: 1,
      dateTime: 'Viernes 28 a las 21:00',
      title: 'Pizza margarita',
      imageUrl: 'assets/recipes/pizza.jpg',
      tags: ['Etiqueta', 'Etiqueta', 'Tiempo']
    },
    {
      id: 2,
      dateTime: 'Sábado 29 a las 13:30',
      title: 'Lasaña de carne',
      imageUrl: 'assets/recipes/lasagna.jpg',
      tags: ['Etiqueta', 'Etiqueta', 'Tiempo']
    },
    {
      id: 3,
      dateTime: 'Domingo 30 a las 20:00',
      title: 'Ensalada César',
      imageUrl: 'assets/recipes/salad.jpg',
      tags: ['Etiqueta', 'Etiqueta', 'Tiempo']
    },
    {
      id: 4,
      dateTime: 'Lunes 1 a las 17:00',
      title: 'Tarta de manzana',
      imageUrl: 'assets/recipes/apple-pie.jpg',
      tags: ['Etiqueta', 'Etiqueta', 'Tiempo']
    }
  ];

  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  onNavItemClick(itemId: string): void {
    this.sidebarItems.forEach(item => item.active = item.id === itemId);
    console.log('Navigate to:', itemId);
  }

  onAddMealPlan(): void {
    console.log('Add meal plan');
  }

  onSearch(): void {
    console.log('Search:', this.searchQuery);
  }

  onFilter(): void {
    console.log('Filter');
  }

  onViewPlan(id: number): void {
    console.log('View plan:', id);
  }

  onDeletePlan(id: number): void {
    console.log('Delete plan:', id);
  }

  onAddToList(id: number): void {
    console.log('Add to list:', id);
  }

  getCalendarClass(mealsCount: number): string {
    if (mealsCount === 2) return 'calendar-day--two-meals';
    if (mealsCount === 1) return 'calendar-day--one-meal';
    return 'calendar-day--no-meals';
  }
}

