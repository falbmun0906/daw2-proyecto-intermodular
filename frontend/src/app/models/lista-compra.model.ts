/**
 * Modelos de Lista de Compra - Alineados con el backend Spring Boot
 */

export interface ListaCompra {
  id: number;
  nombre: string;
  fechaCreacion: string;
  completada: boolean;
  items: ListaItem[];
}

export interface ListaItem {
  id: number;
  ingrediente: {
    id: number;
    nombre: string;
    categoria: string;
    unidadDefecto: string;
    imagenUrl: string;
  };
  cantidad: number;
  unidad: string;
  comprado: boolean;
}

export interface ListaCompraCreateRequest {
  nombre: string;
}

export interface ListaItemCreateRequest {
  ingredienteId: number;
  cantidad: number;
  unidad: string;
}

export interface ListaItemUpdateRequest {
  cantidad?: number;
  unidad?: string;
  comprado?: boolean;
}
