/**
 * Modelo de Ingrediente - Alineado con IngredienteResponse.java del backend
 *
 * IMPORTANTE: Usa los nombres de campos del backend (Java/Spring Boot)
 * Los ingredientes son catálogo de ingredientes, NO productos a la venta.
 */
export interface Ingrediente {
  id: number;
  nombre: string;
  categoria: string;
  unidadDefecto: string;
  caloriasPorUnidad: number;
  imagenUrl: string;
}

/**
 * DTO para crear un ingrediente - Alineado con IngredienteCreateRequest.java
 */
export interface IngredienteCreateRequest {
  nombre: string;
  categoria: string;
  unidadDefecto: string;
  caloriasPorUnidad?: number;
  imagenUrl?: string;
}

/**
 * DTO para actualizar un ingrediente
 */
export interface IngredienteUpdateRequest {
  nombre?: string;
  categoria?: string;
  unidadDefecto?: string;
  caloriasPorUnidad?: number;
  imagenUrl?: string;
}

