/**
 * Modelo de Product (entidad completa)
 */
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  stock: number;
  createdAt: string;
}

/**
 * DTO para crear un producto (sin id ni createdAt)
 */
export interface CreateProductDto {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  stock: number;
}

/**
 * DTO para actualizar un producto (todos los campos opcionales excepto los que se quieran modificar)
 */
export interface UpdateProductDto {
  name?: string;
  description?: string;
  price?: number;
  imageUrl?: string;
  category?: string;
  stock?: number;
}

