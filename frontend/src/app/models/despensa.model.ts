/**
 * Modelos de Despensa - Alineados con DespensaItemResponse.java
 */

export interface DespensaItem {
  id: number;
  ingrediente: {
    id: number;
    nombre: string;
    categoria: string;
    unidadDefecto: string;
    caloriasPorUnidad: number;
    imagenUrl: string;
  };
  cantidadActual: number;
  unidad: string;
  fechaCaducidad: string; // ISO-8601 LocalDate
  diasRestantes: number | null; // Calculado en el backend
  ubicacion: 'NEVERA' | 'CONGELADOR' | 'DESPENSA' | 'ESPECIAS';
  estado: 'OK' | 'PROXIMO_A_CADUCAR' | 'CADUCADO';
}

/**
 * DTO para crear un item de despensa
 */
export interface DespensaItemCreateRequest {
  ingredienteId: number;
  cantidadActual: number;
  unidad: string;
  fechaCaducidad: string; // ISO-8601 format "YYYY-MM-DD"
  ubicacion: 'NEVERA' | 'CONGELADOR' | 'DESPENSA' | 'ESPECIAS';
}

/**
 * DTO para actualizar un item de despensa
 */
export interface DespensaItemUpdateRequest {
  cantidadActual?: number;
  unidad?: string;
  fechaCaducidad?: string;
  ubicacion?: 'NEVERA' | 'CONGELADOR' | 'DESPENSA' | 'ESPECIAS';
  estado?: 'OK' | 'PROXIMO_A_CADUCAR' | 'CADUCADO';
}

