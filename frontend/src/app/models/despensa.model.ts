/**
 * Modelos de Despensa - Alineados con DespensaItemResponse.java
 */

import { Ingrediente } from './ingrediente.model';

export interface DespensaItem {
  id: number;
  ingrediente: Ingrediente;
  cantidadActual: number;
  unidad: string;
  fechaCaducidad: string; // ISO-8601 LocalDate
  diasRestantes: number | null; // Calculado en el backend
  ubicacion: string; // Ahora permite cualquier texto personalizado
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
  ubicacion: string; // Ahora permite cualquier texto personalizado
}

/**
 * DTO para actualizar un item de despensa
 */
export interface DespensaItemUpdateRequest {
  cantidadActual?: number;
  unidad?: string;
  fechaCaducidad?: string;
  ubicacion?: string; // Ahora permite cualquier texto personalizado
  estado?: 'OK' | 'PROXIMO_A_CADUCAR' | 'CADUCADO';
}

