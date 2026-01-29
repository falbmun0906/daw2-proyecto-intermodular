/**
 * Modelos de Receta - Alineados con el backend (RecetaResponse.java)
 *
 * IMPORTANTE: Usa los nombres de campos del backend (Java/Spring Boot)
 */

/**
 * Respuesta paginada genérica de Spring Boot
 */
export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number; // página actual (0-based)
  first: boolean;
  last: boolean;
  empty: boolean;
}

/**
 * Modelo de imagen responsive con múltiples tamaños
 */
export interface ImagenResponsive {
  small: string;   // -small.webp (thumbnail, 150px)
  medium: string;  // -medium.webp (card, 400px)
  large: string;   // -large.webp (detalle, 800px)
  original?: string;
}

export interface Receta {
  id: number;
  nombre: string;
  descripcion: string;
  imagenUrl: string;
  tiempoPreparacion: number; // en minutos
  porciones: number;
  dificultad: 'BAJA' | 'MEDIA' | 'ALTA';
  fechaCreacion: string; // ISO-8601
  etiquetas: string[];
}

/**
 * Receta con ingredientes completa
 */
export interface RecetaCompleta extends Receta {
  ingredientes: RecetaIngrediente[];
  pasos?: PasoReceta[];
}

/**
 * Ingrediente dentro de una receta - Alineado con RecetaIngredienteResponse.java
 */
export interface RecetaIngrediente {
  id: number;
  ingrediente: {
    id: number;
    nombre: string;
    categoria: string;
    unidadDefecto: string;
    caloriasPorUnidad: number;
    imagenUrl: string;
  };
  cantidad: number;
  unidad: string;
  esOpcional: boolean;
}

/**
 * Paso de preparación de una receta
 */
export interface PasoReceta {
  id: number;
  numeroPaso: number;
  descripcion: string;
  duracionEstimada?: number; // en minutos
}

/**
 * DTO para crear una receta
 */
export interface RecetaCreateRequest {
  nombre: string;
  descripcion: string;
  imagenUrl?: string;
  tiempoPreparacion: number;
  porciones: number;
  dificultad: 'BAJA' | 'MEDIA' | 'ALTA';
  etiquetas?: string[];
}

