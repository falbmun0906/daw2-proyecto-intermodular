import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string; // ej: '100px', '20%', 'auto'
}

export interface TableRow {
  [key: string]: any;
}

export type SortDirection = 'asc' | 'desc' | null;

@Component({
  selector: 'app-data-table',
  imports: [],
  templateUrl: './data-table.html',
  styleUrl: './data-table.scss',
})
export class DataTable {
  @Input() columns: TableColumn[] = [];
  @Input() data: TableRow[] = [];
  @Input() loading: boolean = false;
  @Input() emptyMessage: string = 'No hay datos disponibles';
  @Input() striped: boolean = true; // Filas alternadas
  @Input() hoverable: boolean = true; // Hover en filas
  @Input() responsive: boolean = true; // Modo responsive (cards en mobile)
  @Output() rowClicked = new EventEmitter<TableRow>();
  @Output() sortChanged = new EventEmitter<{ column: string; direction: SortDirection }>();

  sortColumn: string | null = null;
  sortDirection: SortDirection = null;

  onRowClick(row: TableRow): void {
    this.rowClicked.emit(row);
  }

  onSort(column: TableColumn): void {
    if (!column.sortable) {
      return;
    }

    // Alternar dirección de ordenamiento
    if (this.sortColumn === column.key) {
      if (this.sortDirection === 'asc') {
        this.sortDirection = 'desc';
      } else if (this.sortDirection === 'desc') {
        this.sortDirection = null;
        this.sortColumn = null;
      } else {
        this.sortDirection = 'asc';
      }
    } else {
      this.sortColumn = column.key;
      this.sortDirection = 'asc';
    }

    this.sortChanged.emit({
      column: this.sortColumn || '',
      direction: this.sortDirection,
    });
  }

  getSortIcon(column: TableColumn): string {
    if (!column.sortable || this.sortColumn !== column.key) {
      return '↕';
    }
    return this.sortDirection === 'asc' ? '↑' : '↓';
  }
}
