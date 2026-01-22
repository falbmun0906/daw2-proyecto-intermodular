/**
 * Script Definitivo: Generar Variantes para TODAS las Imágenes
 *
 * Este script:
 * 1. Lee TODAS las imágenes en /recipes/
 * 2. Identifica archivos "fuente" (sin -small, -medium, -large)
 * 3. Para CADA archivo fuente, genera 3 variantes en WebP
 * 4. Genera variantes en todos los formatos necesarios
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const recipeDir = path.join(__dirname, 'src', 'assets', 'recipes');

// Tamaños a generar
const sizes = [
  { width: 400, suffix: '-small' },
  { width: 600, suffix: '-medium' },
  { width: 800, suffix: '-large' }
];

async function generateAllVariants() {
  console.log('🔨 Generando variantes para TODAS las imágenes de recetas...\n');

  // Obtener todos los archivos
  const allFiles = fs.readdirSync(recipeDir);

  // Filtrar solo archivos fuente (sin -small, -medium, -large)
  const sourceFiles = allFiles.filter(file =>
    /\.(png|jpg|jpeg|avif|webp)$/i.test(file) &&
    !file.includes('-small') &&
    !file.includes('-medium') &&
    !file.includes('-large') &&
    !file.includes('-optimized')
  );

  console.log(`📁 Imágenes fuente encontradas: ${sourceFiles.length}\n`);

  for (const sourceFile of sourceFiles) {
    const sourcePath = path.join(recipeDir, sourceFile);
    const baseName = path.parse(sourceFile).name;
    const ext = path.parse(sourceFile).ext.toLowerCase();

    console.log(`📸 Procesando: ${sourceFile}`);

    try {
      // Generar WebP en todos los tamaños (para compatibilidad)
      for (const size of sizes) {
        const outputFileName = `${baseName}${size.suffix}.webp`;
        const outputPath = path.join(recipeDir, outputFileName);

        // No regenerar si ya existe
        if (!fs.existsSync(outputPath)) {
          await sharp(sourcePath)
            .resize(size.width, null, { withoutEnlargement: true })
            .webp({ quality: 75 })
            .toFile(outputPath);

          const stats = fs.statSync(outputPath);
          console.log(`  ✓ ${outputFileName} (${(stats.size / 1024).toFixed(2)} KB)`);
        } else {
          console.log(`  ✓ ${outputFileName} (ya existe)`);
        }
      }
    } catch (err) {
      console.log(`  ✗ Error procesando ${sourceFile}: ${err.message}`);
    }

    console.log('');
  }

  console.log('✅ Generación completada!');
}

generateAllVariants().catch(err => {
  console.error('Error fatal:', err);
  process.exit(1);
});

