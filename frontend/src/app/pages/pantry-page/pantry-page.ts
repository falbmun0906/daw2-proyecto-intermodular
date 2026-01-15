import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Button } from '../../components/shared/button/button';
import { Card } from '../../components/shared/card/card';
import { FormInput } from '../../components/shared/form-input/form-input';

interface PantryLocation {
  id: string;
  name: string;
  active: boolean;
}

interface PantryItem {
  id: number;
  name: string;
  units: number;
  initialQuantity: number;
  dateAdded: string;
  expirationDate: string;
}

interface SidebarNavItem {
  id: string;
  label: string;
  icon: string;
  active: boolean;
}

@Component({
  selector: 'app-pantry-page',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, Button, Card, FormInput],
  templateUrl: './pantry-page.html',
  styleUrl: './pantry-page.scss'
})
export class PantryPage {
  searchQueryFridge: string = '';
  searchQueryCupboard: string = '';
  sidebarCollapsed: boolean = false;

  sidebarItems: SidebarNavItem[] = [
    { id: 'resumen', label: 'Resumen', icon: '📊', active: false },
    { id: 'despensa', label: 'Despensa', icon: '🏪', active: true },
    { id: 'planificador', label: 'Planificador', icon: '📅', active: false },
    { id: 'lista', label: 'Lista', icon: '📝', active: false }
  ];

  pantryLocations: PantryLocation[] = [
    { id: 'mi-casa', name: 'Mi casa', active: true },
    { id: 'lo-de-abuela', name: 'Lo de abuela', active: false }
  ];

  fridgeItems: PantryItem[] = [
    { id: 1, name: 'Leche', units: 2, initialQuantity: 2, dateAdded: '2026-01-10', expirationDate: '2026-01-20' },
    { id: 2, name: 'Yogur', units: 6, initialQuantity: 8, dateAdded: '2026-01-09', expirationDate: '2026-01-25' },
    { id: 3, name: 'Queso', units: 1, initialQuantity: 1, dateAdded: '2026-01-08', expirationDate: '2026-02-01' },
    { id: 4, name: 'Jamón cocido', units: 200, initialQuantity: 300, dateAdded: '2026-01-07', expirationDate: '2026-01-22' },
    { id: 5, name: 'Pollo fresco', units: 500, initialQuantity: 1000, dateAdded: '2026-01-12', expirationDate: '2026-01-15' },
    { id: 6, name: 'Mantequilla', units: 1, initialQuantity: 1, dateAdded: '2026-01-05', expirationDate: '2026-02-05' }
  ];

  cupboardItems: PantryItem[] = [
    { id: 7, name: 'Arroz', units: 1000, initialQuantity: 1000, dateAdded: '2026-01-01', expirationDate: '2027-01-01' },
    { id: 8, name: 'Pasta', units: 500, initialQuantity: 1000, dateAdded: '2026-01-02', expirationDate: '2027-01-02' },
    { id: 9, name: 'Harina', units: 800, initialQuantity: 1000, dateAdded: '2026-01-03', expirationDate: '2026-07-01' },
    { id: 10, name: 'Azúcar', units: 500, initialQuantity: 1000, dateAdded: '2026-01-04', expirationDate: '2027-01-04' },
    { id: 11, name: 'Sal', units: 1, initialQuantity: 1, dateAdded: '2025-12-01', expirationDate: '2028-01-01' },
    { id: 12, name: 'Aceite de oliva', units: 1, initialQuantity: 1, dateAdded: '2026-01-05', expirationDate: '2027-01-05' },
    { id: 13, name: 'Galletas', units: 2, initialQuantity: 3, dateAdded: '2026-01-06', expirationDate: '2026-03-01' },
    { id: 14, name: 'Chocolate', units: 3, initialQuantity: 5, dateAdded: '2026-01-07', expirationDate: '2026-06-01' },
    { id: 15, name: 'Café', units: 250, initialQuantity: 500, dateAdded: '2026-01-08', expirationDate: '2026-12-01' },
    { id: 16, name: 'Lentejas', units: 500, initialQuantity: 1000, dateAdded: '2026-01-09', expirationDate: '2027-01-09' },
    { id: 17, name: 'Frijoles', units: 400, initialQuantity: 500, dateAdded: '2026-01-10', expirationDate: '2027-01-10' },
    { id: 18, name: 'Pan de molde', units: 1, initialQuantity: 1, dateAdded: '2026-01-11', expirationDate: '2026-01-18' },
    { id: 19, name: 'Atún', units: 4, initialQuantity: 6, dateAdded: '2026-01-12', expirationDate: '2027-01-12' },
    { id: 20, name: 'Tomate frito', units: 2, initialQuantity: 3, dateAdded: '2026-01-13', expirationDate: '2027-01-13' },
    { id: 21, name: 'Maíz en lata', units: 3, initialQuantity: 4, dateAdded: '2026-01-14', expirationDate: '2027-01-14' }
  ];

  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  onNavItemClick(itemId: string): void {
    this.sidebarItems.forEach(item => item.active = item.id === itemId);
    console.log('Navigate to:', itemId);
  }

  onLocationChange(locationId: string): void {
    this.pantryLocations.forEach(loc => loc.active = loc.id === locationId);
    console.log('Switch to location:', locationId);
  }

  onAddProduct(): void {
    console.log('Add product');
  }

  onCreatePantry(): void {
    console.log('Create new pantry');
  }

  onSearchFridge(): void {
    console.log('Search fridge:', this.searchQueryFridge);
  }

  onSearchCupboard(): void {
    console.log('Search cupboard:', this.searchQueryCupboard);
  }

  onFilterFridge(): void {
    console.log('Filter fridge');
  }

  onFilterCupboard(): void {
    console.log('Filter cupboard');
  }
}

