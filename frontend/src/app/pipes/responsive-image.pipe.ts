import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe para generar srcset y sizes automáticamente basado en el nombre de la imagen
 * Uso: {{ 'assets/recipes/burger.png' | responsiveImage:'srcset' }}
 */
@Pipe({
  name: 'responsiveImage',
  standalone: true
})
export class ResponsiveImagePipe implements PipeTransform {
  transform(imageUrl: string, type: 'srcset' | 'sizes' = 'srcset'): string {
    if (!imageUrl) return '';

    // Extraer nombre del archivo sin extensión
    const fileName = imageUrl.split('/').pop()?.replace(/\.[^/.]+$/, '') || '';

    if (type === 'srcset') {
      // Generar srcset con WebP (primero intenta WebP, fallback a PNG)
      return `
        assets/recipes/${fileName}-small.webp 400w,
        assets/recipes/${fileName}-medium.webp 600w,
        assets/recipes/${fileName}-large.webp 800w
      `.trim().replace(/\s+/g, ' ');
    } else if (type === 'sizes') {
      // Sizes optimizado para tarjetas
      return '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';
    }

    return '';
  }
}

