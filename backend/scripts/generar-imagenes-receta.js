/**
 * Script para generar las 3 variantes de una imagen de receta usando Sharp
 *
 * Uso: node generar-imagenes-receta.js <ruta-imagen-original> <nombre-base>
 * Ejemplo: node generar-imagenes-receta.js paella.jpg paella-valenciana
 *
 * Requisitos:
 * npm install sharp
 */

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// Verifica argumentos
if (process.argv.length !== 4) {
  console.error('Uso: node generar-imagenes-receta.js <ruta-imagen-original> <nombre-base>');
  console.error('Ejemplo: node generar-imagenes-receta.js paella.jpg paella-valenciana');
  process.exit(1);
}

const originalPath = process.argv[2];
const nombreBase = process.argv[3];
const outputDir = path.join(__dirname, '..', '..', 'images', 'recetas');

// Verifica que existe el archivo original
if (!fs.existsSync(originalPath)) {
  console.error(`Error: No se encuentra el archivo ${originalPath}`);
  process.exit(1);
}

// Crea el directorio de salida si no existe
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log(`Generando imágenes para: ${nombreBase}`);
console.log(`Imagen original: ${originalPath}`);
console.log(`Directorio de salida: ${outputDir}`);
console.log('');

// Tamaños y configuración
const variants = [
  { name: 'small', width: 400, quality: 85 },
  { name: 'medium', width: 600, quality: 85 },
  { name: 'large', width: 800, quality: 85 }
];

// Genera las variantes
Promise.all(
  variants.map(async (variant) => {
    const outputPath = path.join(outputDir, `${nombreBase}-${variant.name}.webp`);

    console.log(`Generando ${nombreBase}-${variant.name}.webp (${variant.width}px)...`);

    await sharp(originalPath)
      .resize(variant.width, null, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({ quality: variant.quality })
      .toFile(outputPath);

    return variant.name;
  })
)
  .then((generated) => {
    console.log('');
    console.log('✅ Imágenes generadas correctamente:');
    generated.forEach((name) => {
      console.log(`   - ${nombreBase}-${name}.webp`);
    });
    console.log('');
    console.log('Ahora puedes crear/actualizar la receta con:');
    console.log(`   "imagenUrl": "${nombreBase}"`);
  })
  .catch((error) => {
    console.error('❌ Error al generar imágenes:', error.message);
    process.exit(1);
  });
