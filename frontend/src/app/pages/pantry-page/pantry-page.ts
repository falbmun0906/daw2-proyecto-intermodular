import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Button } from '../../components/shared/button/button';
import { FormInput } from '../../components/shared/form-input/form-input';
import { FormSelect } from '../../components/shared/form-select/form-select';
import { Icon } from '../../components/shared/icon/icon';
import { Sidebar } from '../../components/layout/sidebar/sidebar';
import { Modal } from '../../components/shared/modal/modal';
import { DespensaService } from '../../services/despensa.service';
import { IngredienteService } from '../../services/ingrediente.service';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';
import { DespensaItem, DespensaItemCreateRequest } from '../../models/despensa.model';
import { Ingrediente } from '../../models/ingrediente.model';

interface PantryLocation {
  id: string;
  name: string;
  active: boolean;
}

interface SidebarNavItem {
  id: string;
  label: string;
  icon: string;
  route: string;
  active: boolean;
}

@Component({
  selector: 'app-pantry-page',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, Button, FormInput, FormSelect, Icon, Sidebar, Modal],
  templateUrl: './pantry-page.html',
  styleUrl: './pantry-page.scss'
})
export class PantryPage implements OnInit {
  private despensaService = inject(DespensaService);
  private ingredienteService = inject(IngredienteService);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);

  searchQuery = signal<string>('');
  sidebarCollapsed = signal<boolean>(false);
  isLoading = signal<boolean>(false);

  // Items de la despensa por ubicación
  fridgeItems = signal<DespensaItem[]>([]);
  freezerItems = signal<DespensaItem[]>([]);
  pantryItems = signal<DespensaItem[]>([]);
  spicesItems = signal<DespensaItem[]>([]);

  // Modal de añadir producto
  isAddProductModalOpen = signal<boolean>(false);
  ingredientes = signal<Ingrediente[]>([]);
  selectedIngredienteId = signal<number | null>(null);
  newProductCantidad = signal<number>(1);
  newProductUnidad = signal<string>('unidad');
  newProductFechaCaducidad = signal<string>('');
  newProductUbicacion = signal<'NEVERA' | 'CONGELADOR' | 'DESPENSA' | 'ESPECIAS'>('NEVERA');

  // Modal de crear despensa
  isCreatePantryModalOpen = signal<boolean>(false);
  newPantryName = signal<string>('');

  ubicacionOptions = [
    { value: 'NEVERA', label: 'Nevera' },
    { value: 'CONGELADOR', label: 'Congelador' },
    { value: 'DESPENSA', label: 'Alacena' },
    { value: 'ESPECIAS', label: 'Especias' }
  ];

  sidebarItems: SidebarNavItem[] = [
    { id: 'resumen', label: 'Resumen', icon: 'lighthouse', route: '/dashboard', active: false },
    { id: 'despensa', label: 'Despensa', icon: 'package', route: '/despensa', active: true },
    { id: 'planificador', label: 'Planificador', icon: 'calendar', route: '/planificador', active: false },
    { id: 'lista', label: 'Lista de la compra', icon: 'shopping-cart', route: '/dashboard', active: false }
  ];

  pantryLocations: PantryLocation[] = [
    { id: 'mi-casa', name: 'Mi casa', active: true },
    { id: 'lo-de-abuela', name: 'Lo de abuela', active: false }
  ];

  ngOnInit(): void {
    this.loadDespensa();
    this.loadIngredientes();
  }

  private loadDespensa(): void {
    const userId = this.authService.getCurrentUserId();
    if (!userId) return;

    this.isLoading.set(true);

    this.despensaService.getPorUbicacion(userId, 'NEVERA').subscribe({
      next: (items) => this.fridgeItems.set(items),
      error: (err) => console.error('Error cargando nevera:', err)
    });

    this.despensaService.getPorUbicacion(userId, 'CONGELADOR').subscribe({
      next: (items) => this.freezerItems.set(items),
      error: (err) => console.error('Error cargando congelador:', err)
    });

    this.despensaService.getPorUbicacion(userId, 'DESPENSA').subscribe({
      next: (items) => {
        this.pantryItems.set(items);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error cargando despensa:', err);
        this.isLoading.set(false);
      }
    });

    this.despensaService.getPorUbicacion(userId, 'ESPECIAS').subscribe({
      next: (items) => this.spicesItems.set(items),
      error: (err) => console.error('Error cargando especias:', err)
    });
  }

  private loadIngredientes(): void {
    this.ingredienteService.getAll().subscribe({
      next: (ingredientes) => this.ingredientes.set(ingredientes),
      error: (err) => console.error('Error cargando ingredientes:', err)
    });
  }

  get ingredienteOptions() {
    return this.ingredientes().map(ing => ({
      value: ing.id.toString(),
      label: `${ing.nombre} (${ing.categoria})`
    }));
  }

  toggleSidebar(): void {
    this.sidebarCollapsed.update(v => !v);
  }

  onNavItemClick(itemId: string): void {
    this.sidebarItems.forEach(item => item.active = item.id === itemId);
  }

  onLocationChange(locationId: string): void {
    this.pantryLocations.forEach(loc => loc.active = loc.id === locationId);
  }

  // Abrir modal de añadir producto
  onAddProduct(): void {
    this.isAddProductModalOpen.set(true);
  }

  onCloseAddProductModal(): void {
    this.isAddProductModalOpen.set(false);
    this.resetProductForm();
  }

  private resetProductForm(): void {
    this.selectedIngredienteId.set(null);
    this.newProductCantidad.set(1);
    this.newProductUnidad.set('unidad');
    this.newProductFechaCaducidad.set('');
    this.newProductUbicacion.set('NEVERA');
  }

  onSaveProduct(): void {
    const userId = this.authService.getCurrentUserId();
    const ingredienteId = this.selectedIngredienteId();

    if (!userId || !ingredienteId) {
      this.toastService.error('Selecciona un ingrediente');
      return;
    }

    const dto: DespensaItemCreateRequest = {
      ingredienteId: ingredienteId,
      cantidadActual: this.newProductCantidad(),
      unidad: this.newProductUnidad(),
      fechaCaducidad: this.newProductFechaCaducidad(),
      ubicacion: this.newProductUbicacion()
    };

    this.despensaService.agregar(userId, dto).subscribe({
      next: () => {
        this.toastService.success('Producto añadido correctamente');
        this.onCloseAddProductModal();
        this.loadDespensa();
      },
      error: (err) => {
        console.error('Error añadiendo producto:', err);
        this.toastService.error('Error al añadir el producto');
      }
    });
  }

  // Modal de crear despensa
  onCreatePantry(): void {
    this.isCreatePantryModalOpen.set(true);
  }

  onCloseCreatePantryModal(): void {
    this.isCreatePantryModalOpen.set(false);
    this.newPantryName.set('');
  }

  onSaveNewPantry(): void {
    const name = this.newPantryName();
    if (!name.trim()) {
      this.toastService.error('Ingresa un nombre para la despensa');
      return;
    }

    // Añadir a la lista local de ubicaciones
    this.pantryLocations.push({
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name: name,
      active: false
    });

    this.toastService.success(`Despensa "${name}" creada`);
    this.onCloseCreatePantryModal();
  }

  onSearch(): void {
    const query = this.searchQuery();
    if (!query) {
      this.loadDespensa();
      return;
    }

    const userId = this.authService.getCurrentUserId();
    if (!userId) return;

    this.despensaService.buscarPorNombre(userId, query).subscribe({
      next: (items) => {
        this.fridgeItems.set(items.filter(i => i.ubicacion === 'NEVERA'));
        this.freezerItems.set(items.filter(i => i.ubicacion === 'CONGELADOR'));
        this.pantryItems.set(items.filter(i => i.ubicacion === 'DESPENSA'));
        this.spicesItems.set(items.filter(i => i.ubicacion === 'ESPECIAS'));
      },
      error: (err) => console.error('Error buscando:', err)
    });
  }

  getStatusClass(estado: string): string {
    switch (estado) {
      case 'CADUCADO': return 'pantry-item--expired';
      case 'PROXIMO_A_CADUCAR': return 'pantry-item--warning';
      default: return 'pantry-item--ok';
    }
  }

  getStatusLabel(estado: string): string {
    switch (estado) {
      case 'CADUCADO': return 'Caducado';
      case 'PROXIMO_A_CADUCAR': return 'Próximo a caducar';
      default: return 'OK';
    }
  }
}

