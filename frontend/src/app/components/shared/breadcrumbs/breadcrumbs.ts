import { Component, Input, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BreadcrumbService, Breadcrumb } from '../../../services/breadcrumb.service';
import { CommonModule } from '@angular/common';

export interface BreadcrumbItem {
  label: string;
  url: string;
  isActive?: boolean;
}

@Component({
  selector: 'app-breadcrumbs',
  imports: [RouterModule, CommonModule],
  templateUrl: './breadcrumbs.html',
  styleUrl: './breadcrumbs.scss',
})
export class Breadcrumbs implements OnInit {
  // Si se pasan items manualmente, se usan esos; si no, se obtienen del servicio
  @Input() items: BreadcrumbItem[] = [];
  @Input() autoUpdate: boolean = true; // Activar actualización automática desde rutas
  @Input() variant: 'default' | 'hero' = 'default'; // Variante de estilo

  private breadcrumbService = inject(BreadcrumbService);

  ngOnInit(): void {
    if (this.autoUpdate && this.items.length === 0) {
      // Suscribirse al servicio de breadcrumbs dinámicos
      this.breadcrumbService.breadcrumbs$.subscribe(breadcrumbs => {
        this.items = breadcrumbs.map((crumb, index, array) => ({
          label: crumb.label,
          url: crumb.url,
          isActive: index === array.length - 1
        }));
      });
    }
  }

  get level(): number {
    return this.items.length;
  }

  get isLevel1(): boolean {
    return this.level === 1;
  }

  get isLevel2(): boolean {
    return this.level === 2;
  }

  get isLevel3Plus(): boolean {
    return this.level >= 3;
  }
}
