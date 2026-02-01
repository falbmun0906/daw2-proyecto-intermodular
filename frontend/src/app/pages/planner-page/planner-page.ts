import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Button } from '../../components/shared/button/button';
import { FormInput } from '../../components/shared/form-input/form-input';
import { MealPlanCard } from '../../components/shared/meal-plan-card/meal-plan-card';
import { Sidebar } from '../../components/layout/sidebar/sidebar';
import { ListaCompraService } from '../../services/lista-compra.service';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';

interface SidebarNavItem {
  id: string;
  label: string;
  icon: string;
  route: string;
  active: boolean;
}

interface CalendarDay {
  date: number;
  mealsCount: 0 | 1 | 2;
}

interface MealPlan {
  id: number;
  recetaId: number;
  dateTime: string;
  title: string;
  imageUrl: string;
  tags: string[];
}

@Component({
  selector: 'app-planner-page',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, Button, FormInput, MealPlanCard, Sidebar],
  templateUrl: './planner-page.html',
  styleUrl: './planner-page.scss'
})
export class PlannerPage implements OnInit {
  private listaCompraService = inject(ListaCompraService);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);

  searchQuery: string = '';
  sidebarCollapsed: boolean = false;
  defaultListaId = signal<number | null>(null);

  sidebarItems: SidebarNavItem[] = [
    { id: 'resumen', label: 'Resumen', icon: 'lighthouse', route: '/dashboard', active: false },
    { id: 'despensa', label: 'Despensa', icon: 'package', route: '/despensa', active: false },
    { id: 'planificador', label: 'Planificador', icon: 'calendar', route: '/planificador', active: true },
    { id: 'lista', label: 'Lista de la compra', icon: 'shopping-cart', route: '/dashboard', active: false }
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
      recetaId: 1,
      dateTime: 'Viernes 28 a las 21:00',
      title: 'Pizza margarita',
      imageUrl: 'assets/recipes/pizza.jpg',
      tags: ['Italiana', 'Fácil', '45 min']
    },
    {
      id: 2,
      recetaId: 2,
      dateTime: 'Sábado 29 a las 13:30',
      title: 'Lasaña de carne',
      imageUrl: 'assets/recipes/lasagna.jpg',
      tags: ['Italiana', 'Media', '90 min']
    },
    {
      id: 3,
      recetaId: 3,
      dateTime: 'Domingo 30 a las 20:00',
      title: 'Ensalada César',
      imageUrl: 'assets/recipes/salad.jpg',
      tags: ['Saludable', 'Fácil', '15 min']
    },
    {
      id: 4,
      recetaId: 4,
      dateTime: 'Lunes 1 a las 17:00',
      title: 'Tarta de manzana',
      imageUrl: 'assets/recipes/apple-pie.jpg',
      tags: ['Postre', 'Media', '60 min']
    }
  ];

  ngOnInit(): void {
    this.loadDefaultLista();
  }

  private loadDefaultLista(): void {
    const userId = this.authService.getCurrentUserId();
    if (!userId) return;

    this.listaCompraService.getListasPendientes(userId).subscribe({
      next: (listas) => {
        if (listas.length > 0) {
          this.defaultListaId.set(listas[0].id);
        }
      },
      error: (err) => console.error('Error cargando listas:', err)
    });
  }

  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  onNavItemClick(itemId: string): void {
    this.sidebarItems.forEach(item => item.active = item.id === itemId);
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

  onAddToList(planId: number): void {
    const userId = this.authService.getCurrentUserId();
    const listaId = this.defaultListaId();
    const plan = this.mealPlans.find(p => p.id === planId);

    if (!userId) {
      this.toastService.error('Debes iniciar sesión');
      return;
    }

    if (!listaId) {
      this.toastService.warning('No tienes una lista de compra. Crea una primero.');
      return;
    }

    if (!plan) {
      this.toastService.error('Plan no encontrado');
      return;
    }

    this.listaCompraService.agregarIngredientesDeReceta(userId, listaId, plan.recetaId).subscribe({
      next: () => {
        this.toastService.success(`Ingredientes de "${plan.title}" añadidos a la lista`);
      },
      error: (err) => {
        console.error('Error añadiendo a la lista:', err);
        this.toastService.error('Error al añadir ingredientes a la lista');
      }
    });
  }

  getCalendarClass(mealsCount: number): string {
    if (mealsCount === 2) return 'calendar-day--two-meals';
    if (mealsCount === 1) return 'calendar-day--one-meal';
    return 'calendar-day--no-meals';
  }
}
