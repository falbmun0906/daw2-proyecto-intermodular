import { Component, EventEmitter, Input, Output, ViewChild, ElementRef, Renderer2, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Icon } from '../../shared/icon/icon';

interface SidebarItem {
  id: string;
  label: string;
  icon: string;
  route: string;
  active: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
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

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.updateAccessibility();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isCollapsed']) {
      this.updateAccessibility();
    }
  }

  private updateAccessibility(): void {
    if (this.sidebarElement) {
      // El sidebar siempre está visible, solo cambia si está expandido o no
      this.renderer.setAttribute(
        this.sidebarElement.nativeElement,
        'aria-expanded',
        (!this.isCollapsed).toString()
      );
    }
  }

  onLinkClick(itemId: string) {
    this.itemClick.emit(itemId);
  }

  onToggle() {
    this.toggle.emit();
  }
}
