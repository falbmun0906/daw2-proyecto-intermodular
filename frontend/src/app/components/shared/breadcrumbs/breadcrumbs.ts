import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

export interface BreadcrumbItem {
  label: string;
  url: string;
  isActive?: boolean;
}

@Component({
  selector: 'app-breadcrumbs',
  imports: [RouterModule],
  templateUrl: './breadcrumbs.html',
  styleUrl: './breadcrumbs.scss',
})
export class Breadcrumbs {
  @Input() items: BreadcrumbItem[] = [];

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
