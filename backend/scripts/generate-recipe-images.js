const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ORIGIN_DIR = path.join(__dirname, '../images/originales');
const OUTPUT_DIR = path.join(__dirname, '../images/recetas');

// Tamaños de las imágenes
const SIZES = [
  { name: 'small', width: 400 },
  { name: 'medium', width: 600 },
  { name: 'large', width: 800 }
];

const QUALITY = 85;

// Crear el directorio de salida si no existe
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  console.log(`✓ Directorio de salida creado: ${OUTPUT_DIR}`);
}

// Obtener todas las imágenes del directorio original
const files = fs.readdirSync(ORIGIN_DIR).filter(file => {
  const ext = path.extname(file).toLowerCase();
  return ['.jpg', '.jpeg', '.png', '.webp'].includes(ext);
});

if (files.length === 0) {
  console.log('⚠ No se encontraron imágenes en el directorio original');
  process.exit(0);
}

console.log(`\n📸 Procesando ${files.length} imagen(es)...\n`);

let processedCount = 0;
let errorCount = 0;

// Procesar cada imagen
const processImages = async () => {
  for (const file of files) {
    const inputPath = path.join(ORIGIN_DIR, file);
    const nameWithoutExt = path.parse(file).name;

    try {
      console.log(`▶ Procesando: ${file}`);

      // Generar las 3 versiones
      for (const size of SIZES) {
        const outputFile = `${nameWithoutExt}-${size.name}.webp`;
        const outputPath = path.join(OUTPUT_DIR, outputFile);

        await sharp(inputPath)
          .resize(size.width, null, {
            withoutEnlargement: true,
            fit: 'inside'
          })
          .webp({ quality: QUALITY })
          .toFile(outputPath);

        console.log(`  ✓ ${outputFile} (${size.width}px)`);
      }

      processedCount++;
      console.log(`  ✅ Completada: ${nameWithoutExt}\n`);
    } catch (error) {
      errorCount++;
      console.error(`  ❌ Error procesando ${file}: ${error.message}\n`);
    }
  }

  // Resumen final
  console.log('\n' + '='.repeat(50));
  console.log(`📊 RESUMEN`);
  console.log('='.repeat(50));
  console.log(`✓ Imágenes procesadas: ${processedCount}`);
  console.log(`✗ Errores: ${errorCount}`);
  console.log(`📁 Ubicación de salida: ${OUTPUT_DIR}`);
  console.log(`📐 Tamaños generados: ${SIZES.map(s => s.width + 'px').join(', ')}`);
  console.log(`⚙️  Calidad: ${QUALITY}`);
  console.log(`📦 Formato: WebP`);
  console.log('='.repeat(50) + '\n');

  if (errorCount === 0) {
    console.log('✨ ¡Todas las imágenes se han procesado correctamente!');
  }
};

processImages().catch(error => {
  console.error('Error fatal:', error);
  process.exit(1);
});

