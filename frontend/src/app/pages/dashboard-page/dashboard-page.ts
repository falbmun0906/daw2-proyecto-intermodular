import { Component, HostListener, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Button } from '../../components/shared/button/button';
import { FormInput } from '../../components/shared/form-input/form-input';
import { MealCard } from '../../components/shared/meal-card/meal-card';
import { ShoppingItem } from '../../components/shared/shopping-item/shopping-item';
import { PendingProduct } from '../../components/shared/pending-product/pending-product';
import { Sidebar } from '../../components/layout/sidebar/sidebar';
import { AuthService } from '../../services/auth.service';
import { DespensaService } from '../../services/despensa.service';
import { PlanificacionService, PlanificacionDia } from '../../services/planificacion.service';
import { ListaCompraService } from '../../services/lista-compra.service';
import { DespensaItem } from '../../models/despensa.model';
import { ListaItem } from '../../models/lista-compra.model';
import { forkJoin } from 'rxjs';

interface Meal {
  id: number;
  recipeId?: number;
  time: string;
  title: string;
  imageUrl: string;
  imagenUrlSmall?: string;
  imagenUrlMedium?: string;
  imagenUrlLarge?: string;
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
  imports: [CommonModule, RouterModule, FormsModule, Button, FormInput, MealCard, ShoppingItem, PendingProduct, Sidebar],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss'
})
export class DashboardPage implements OnInit {
  private authService = inject(AuthService);
  private despensaService = inject(DespensaService);
  private planificacionService = inject(PlanificacionService);
  private listaCompraService = inject(ListaCompraService);
  private router = inject(Router);

  searchQuery: string = '';
  sidebarCollapsed: boolean = false;
  currentCarouselIndex: number = 0;
  visibleSlides: number = 3;

  // Signals para datos reales
  todayMeals = signal<Meal[]>([]);
  pendingProducts = signal<PendingProductItem[]>([]);
  shoppingList = signal<ShoppingListItem[]>([]);
  isLoading = signal<boolean>(true);
  allPendingCompleted = signal<boolean>(false);

  sidebarItems: SidebarNavItem[] = [
    { id: 'resumen', label: 'Resumen', icon: 'lighthouse', route: '/dashboard', active: true },
    { id: 'despensa', label: 'Despensa', icon: 'package', route: '/despensa', active: false },
    { id: 'planificador', label: 'Planificador', icon: 'calendar', route: '/planificador', active: false },
    { id: 'lista', label: 'Lista de la compra', icon: 'shopping-cart', route: '/lista-compra', active: false }
  ];

  ngOnInit(): void {
    this.updateVisibleSlides();
    this.loadDashboardData();
  }

  private loadDashboardData(): void {
    const userId = this.authService.currentUser$()?.id;
    if (!userId) {
      this.isLoading.set(false);
      return;
    }

    // Cargar datos de despensa (productos próximos a caducar)
    forkJoin({
      proximoCaducar: this.despensaService.getProximoCaducar(userId),
      caducados: this.despensaService.getCaducados(userId)
    }).subscribe({
      next: ({ proximoCaducar, caducados }) => {
        const allItems = [...caducados, ...proximoCaducar];
        this.pendingProducts.set(this.mapDespensaToPending(allItems));
        this.checkAllCompleted();
      },
      error: (err) => {
        console.error('Error cargando despensa:', err);
      }
    });

    // Cargar planificación de hoy
    this.planificacionService.getPlanificacionReciente(userId).subscribe({
      next: (planificacion) => {
        if (planificacion?.id) {
          const hoy = new Date().toISOString().split('T')[0];
          this.planificacionService.getComidasDelDia(userId, planificacion.id, hoy).subscribe({
            next: (dias) => {
              this.todayMeals.set(this.mapPlanificacionToMeals(dias));
              this.isLoading.set(false);
            },
            error: () => {
              this.todayMeals.set([]);
              this.isLoading.set(false);
            }
          });
        } else {
          this.isLoading.set(false);
        }
      },
      error: () => {
        this.isLoading.set(false);
      }
    });

    // Cargar lista de la compra
    this.listaCompraService.getListasPendientes(userId).subscribe({
      next: (listas) => {
        if (listas.length > 0) {
          // Tomar la primera lista pendiente
          const lista = listas[0];
          if (lista.items) {
            this.shoppingList.set(this.mapListaToShopping(lista.items));
          }
        }
      },
      error: (err) => {
        console.error('Error cargando lista de compra:', err);
      }
    });
  }

  private mapDespensaToPending(items: DespensaItem[]): PendingProductItem[] {
    const hoy = new Date();
    return items.map(item => {
      const caducidad = item.fechaCaducidad ? new Date(item.fechaCaducidad) : null;
      const diasRestantes = caducidad
        ? Math.ceil((caducidad.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24))
        : 999;

      let urgency: 'Alta' | 'Media' | 'Baja' = 'Baja';
      let color = '#E6E6FA';

      if (diasRestantes <= 2) {
        urgency = 'Alta';
        color = '#FFB6C1';
      } else if (diasRestantes <= 5) {
        urgency = 'Media';
        color = '#FFFFE0';
      }

      return {
        id: item.id,
        name: item.ingrediente?.nombre || 'Producto',
        urgency,
        daysRemaining: Math.max(0, diasRestantes),
        color,
        completed: false
      };
    });
  }

  private mapPlanificacionToMeals(dias: PlanificacionDia[]): Meal[] {
    return dias
      .filter(dia => dia.receta)
      .map(dia => {
        const tipoComidaLabel = this.getTipoComidaLabel(dia.tipoComida);
        const hora = this.getTipoComidaHora(dia.tipoComida);

        return {
          id: dia.id,
          recipeId: dia.receta?.id,
          time: `${tipoComidaLabel} a las ${hora}`,
          title: dia.receta?.nombre || 'Sin receta',
          imageUrl: dia.receta?.imagenUrlMedium || '',
          imagenUrlSmall: dia.receta?.imagenUrlSmall,
          imagenUrlMedium: dia.receta?.imagenUrlMedium,
          imagenUrlLarge: dia.receta?.imagenUrlLarge,
          rating: 4.5,
          tags: [
            dia.receta?.dificultad || 'Media',
            `${dia.receta?.tiempoPreparacion || 30} min`
          ]
        };
      });
  }

  private getTipoComidaLabel(tipo: string): string {
    const labels: Record<string, string> = {
      'DESAYUNO': 'Desayuno',
      'ALMUERZO': 'Almuerzo',
      'COMIDA': 'Comida',
      'MERIENDA': 'Merienda',
      'CENA': 'Cena'
    };
    return labels[tipo] || tipo;
  }

  private getTipoComidaHora(tipo: string): string {
    const horas: Record<string, string> = {
      'DESAYUNO': '8:00',
      'ALMUERZO': '11:00',
      'COMIDA': '14:00',
      'MERIENDA': '17:30',
      'CENA': '21:00'
    };
    return horas[tipo] || '12:00';
  }

  private mapListaToShopping(items: ListaItem[]): ShoppingListItem[] {
    return items
      .filter(item => !item.comprado)
      .map(item => {
        const cantidad = item.cantidad ?? 0;
        const unidad = item.unidad || 'unidades';
        return {
          id: item.id,
          name: item.ingrediente?.nombre || 'Producto',
          quantity: `${cantidad} ${unidad}`,
          imageUrl: item.ingrediente?.imagenUrl || 'assets/icons/ingredient-default.svg'
        };
      });
  }

  private checkAllCompleted(): void {
    const products = this.pendingProducts();
    const allCompleted = products.length === 0 || products.every(p => p.completed);
    this.allPendingCompleted.set(allCompleted);
  }

  @HostListener('window:resize')
  onResize(): void {
    this.updateVisibleSlides();
    const maxIndex = this.getMaxCarouselIndex();
    if (this.currentCarouselIndex > maxIndex) {
      this.currentCarouselIndex = maxIndex;
    }
  }

  private updateVisibleSlides(): void {
    const width = window.innerWidth;
    if (width < 768) {
      this.visibleSlides = 1;
    } else if (width < 1024) {
      this.visibleSlides = 2;
    } else {
      this.visibleSlides = 3;
    }
  }

  get filteredShoppingList() {
    const list = this.shoppingList();
    if (!this.searchQuery) return list;
    return list.filter(item =>
      item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  get visiblePendingProducts() {
    return this.pendingProducts().filter(p => !p.completed);
  }

  getCarouselTransform(): string {
    if (window.innerWidth >= 769) {
      return 'translateX(0)';
    }
    const slideWidth = 100 / this.visibleSlides;
    const translateX = -(this.currentCarouselIndex * slideWidth);
    return `translateX(${translateX}%)`;
  }

  getMaxCarouselIndex(): number {
    if (window.innerWidth >= 769) {
      return 0;
    }
    return Math.max(0, this.visiblePendingProducts.length - this.visibleSlides);
  }

  canGoNext(): boolean {
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
  }

  onViewRecipe(mealId: number): void {
    const meal = this.todayMeals().find(m => m.id === mealId);
    if (meal?.recipeId) {
      this.router.navigate(['/recetas', meal.recipeId]);
    }
  }

  onMarkProductDone(productId: number): void {
    const products = this.pendingProducts();
    const updatedProducts = products.map(p =>
      p.id === productId ? { ...p, completed: true } : p
    );
    this.pendingProducts.set(updatedProducts);
    this.checkAllCompleted();

    const maxIndex = this.getMaxCarouselIndex();
    if (this.currentCarouselIndex > maxIndex) {
      this.currentCarouselIndex = maxIndex;
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
    this.router.navigate(['/lista-compra']);
  }

  navigateToPlanificador(): void {
    this.router.navigate(['/planificador']);
  }

  onSearch(): void {
    // Filtrado reactivo ya implementado
  }
}
