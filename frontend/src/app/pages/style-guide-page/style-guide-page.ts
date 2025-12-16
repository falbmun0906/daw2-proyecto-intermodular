import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Button } from '../../components/shared/button/button';
import { Card } from '../../components/shared/card/card';
import { Alert } from '../../components/shared/alert/alert';
import { Badge } from '../../components/shared/badge/badge';
import { Breadcrumbs, BreadcrumbItem } from '../../components/shared/breadcrumbs/breadcrumbs';
import { FormInput } from '../../components/shared/form-input/form-input';
import { FormCheckbox } from '../../components/shared/form-checkbox/form-checkbox';
import { FormRadioGroup, RadioOption } from '../../components/shared/form-radio-group/form-radio-group';
import { FormSelect, SelectOption } from '../../components/shared/form-select/form-select';
import { FormTextarea } from '../../components/shared/form-textarea/form-textarea';
import { Modal } from '../../components/shared/modal/modal';
import { Notification } from '../../components/shared/notification/notification';
import { Pagination } from '../../components/shared/pagination/pagination';
import { Tabs, Tab } from '../../components/shared/tabs/tabs';

@Component({
  selector: 'app-style-guide-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    Button,
    Card,
    Alert,
    Badge,
    Breadcrumbs,
    FormInput,
    FormCheckbox,
    FormRadioGroup,
    FormSelect,
    FormTextarea,
    Modal,
    Notification,
    Pagination,
    Tabs
  ],
  templateUrl: './style-guide-page.html',
  styleUrl: './style-guide-page.scss'
})
export class StyleGuidePage {
  // Breadcrumbs
  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Inicio', url: '/' },
    { label: 'Componentes', url: '/style-guide' },
    { label: 'Style Guide', url: '/style-guide', isActive: true }
  ];

  // Tabs
  tabs: Tab[] = [
    { id: 'tab1', label: 'Recetas', icon: '🍽️' },
    { id: 'tab2', label: 'Ingredientes', icon: '🥗', badge: '5' },
    { id: 'tab3', label: 'Favoritos', icon: '❤️' },
    { id: 'tab4', label: 'Deshabilitado', icon: '🚫', disabled: true }
  ];
  activeTab: string = 'tab1';

  // Pagination
  currentPage: number = 1;
  totalPages: number = 10;
  totalItems: number = 95;

  // Modal
  showModal: boolean = false;
  showModalLarge: boolean = false;

  // Notifications
  notifications: any[] = [];

  // Form data
  emailValue: string = '';
  passwordValue: string = '';
  textareaValue: string = '';
  checkboxValue: boolean = false;
  radioValue: string = '';
  selectValue: string = '';
  emailError: boolean = false;
  emailSuccess: boolean = false;

  // Radio options
  radioOptions: RadioOption[] = [
    { value: 'facil', label: 'Fácil' },
    { value: 'media', label: 'Media' },
    { value: 'dificil', label: 'Difícil' }
  ];

  // Select options
  selectOptions: SelectOption[] = [
    { value: '', label: 'Selecciona una categoría', disabled: true },
    { value: 'italiana', label: 'Italiana' },
    { value: 'mexicana', label: 'Mexicana' },
    { value: 'china', label: 'China' },
    { value: 'española', label: 'Española' },
    { value: 'francesa', label: 'Francesa' }
  ];

  onButtonClick(variant: string): void {
    console.log(`Botón ${variant} clickeado`);
  }

  onCardClick(): void {
    console.log('Card clickeada');
  }

  onTabChanged(tabId: string): void {
    this.activeTab = tabId;
    console.log('Tab cambiada:', tabId);
  }

  onPageChanged(page: number): void {
    this.currentPage = page;
    console.log('Página cambiada:', page);
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  openModalLarge(): void {
    this.showModalLarge = true;
  }

  closeModalLarge(): void {
    this.showModalLarge = false;
  }

  showNotification(type: 'success' | 'error' | 'warning' | 'info'): void {
    const notification = {
      id: Date.now(),
      type: type,
      title: this.getNotificationTitle(type),
      message: this.getNotificationMessage(type),
      visible: true
    };
    this.notifications.push(notification);
  }

  removeNotification(id: number): void {
    this.notifications = this.notifications.filter(n => n.id !== id);
  }

  private getNotificationTitle(type: string): string {
    const titles: any = {
      success: '¡Éxito!',
      error: 'Error',
      warning: 'Advertencia',
      info: 'Información'
    };
    return titles[type] || 'Notificación';
  }

  private getNotificationMessage(type: string): string {
    const messages: any = {
      success: 'La operación se completó correctamente',
      error: 'Ocurrió un error al procesar la solicitud',
      warning: 'Esta acción requiere confirmación',
      info: 'Hay nuevas recetas disponibles'
    };
    return messages[type] || 'Mensaje de notificación';
  }

  validateEmail(): void {
    if (this.emailValue && this.emailValue.includes('@')) {
      this.emailError = false;
      this.emailSuccess = true;
    } else {
      this.emailError = true;
      this.emailSuccess = false;
    }
  }
}

