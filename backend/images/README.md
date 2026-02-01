# Estructura de Imágenes

Este directorio contiene las imágenes de recetas e ingredientes del sistema Despiensa.

## Estructura de carpetas

```
images/
├── recetas/           # Imágenes de recetas
│   ├── {slug}-small.webp    # Thumbnail (150px)
│   ├── {slug}-medium.webp   # Cards (400px)
│   └── {slug}-large.webp    # Detalle (800px)
│
└── ingredientes/      # Imágenes de ingredientes
    ├── {slug}-small.webp    # Thumbnail (150px)
    ├── {slug}-medium.webp   # Cards (400px)
    └── {slug}-large.webp    # Detalle (800px)
```

## Nomenclatura

El `{slug}` corresponde al valor almacenado en el campo `imagenUrl` de la base de datos.

Por ejemplo, si una receta tiene `imagenUrl = "paella-valenciana"`, las imágenes serán:
- `recetas/paella-valenciana-small.webp`
- `recetas/paella-valenciana-medium.webp`
- `recetas/paella-valenciana-large.webp`

## Formato

- **Formato**: WebP (optimizado para web)
- **Tamaños**:
  - `small`: 150x150px (cuadrado, thumbnail)
  - `medium`: 400x300px (proporción 4:3, cards)
  - `large`: 800x600px (proporción 4:3, detalle)

## Acceso

Las imágenes se sirven desde:
```
http://localhost:8080/images/recetas/{slug}-{size}.webp
http://localhost:8080/images/ingredientes/{slug}-{size}.webp
```

## Generación de versiones

Para generar las versiones de una imagen, puedes usar ImageMagick:

```bash
# Ejemplo para una receta
convert original.jpg -resize 150x150^ -gravity center -extent 150x150 -quality 80 receta-small.webp
convert original.jpg -resize 400x300^ -gravity center -extent 400x300 -quality 85 receta-medium.webp
convert original.jpg -resize 800x600^ -gravity center -extent 800x600 -quality 90 receta-large.webp
```

O con un script batch para múltiples imágenes.
