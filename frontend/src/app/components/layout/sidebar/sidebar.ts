import { Component, EventEmitter, Input, Output, ViewChild, ElementRef, OnChanges, SimpleChanges, AfterViewInit, HostListener, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Icon } from '../../shared/icon/icon';
import { AuthService } from '../../../services/auth.service';

interface SidebarItem {
  id: string;
  label: string;
  icon: string;
  route: string;
  active: boolean;
}

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule, Icon],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar implements OnChanges, AfterViewInit {
  @Input() isCollapsed: boolean = false;
  @Input() items: SidebarItem[] = [];
  @Output() toggle = new EventEmitter<void>();
  @Output() itemClick = new EventEmitter<string>();

  @ViewChild('sidebarElement', { static: false }) sidebarElement!: ElementRef;

  isMobile: boolean = false;
  private authService = inject(AuthService);

  ngAfterViewInit(): void {
    this.checkIfMobile();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.checkIfMobile();
  }

  private checkIfMobile(): void {
    this.isMobile = window.innerWidth < 768;
  }

  ngOnChanges(changes: SimpleChanges): void {
    // NO bloquear scroll del body - el sidebar no es overlay
    // Simplemente removemos toda la lógica de bloqueo de scroll
  }

  onLinkClick(itemId: string) {
    this.itemClick.emit(itemId);
  }

  onNavToShoppingList(): void {
    this.itemClick.emit('lista');
    document.querySelector('.dashboard__shopping')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  onToggle() {
    if (this.isMobile) {
      return;
    }
    this.toggle.emit();
  }

  onLogout(): void {
    this.authService.logout();
  }
}
