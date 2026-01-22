const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, 'src', 'assets');
const recipeDir = path.join(assetsDir, 'recipes');

// Imágenes de recetas (todas las que fueron optimizadas)
const recipeImages = fs.readdirSync(recipeDir)
  .filter(file => /\.(png|jpg|jpeg)$/i.test(file) && !file.includes('-small') && !file.includes('-medium') && !file.includes('-large') && !file.includes('-optimized'));

async function generateRecipeVariants() {
  console.log('Generando variantes responsivas para imágenes de recetas...\n');

  // Tamaños a generar para recetas
  const sizes = [
    { width: 400, suffix: '-small' },
    { width: 600, suffix: '-medium' },
    { width: 800, suffix: '-large' }
  ];

  for (const image of recipeImages) {
    const inputPath = path.join(recipeDir, image);
    const baseName = path.parse(image).name;

    console.log(`Procesando: ${image}`);

    // Generar WebP en múltiples tamaños
    for (const size of sizes) {
      const outputFileName = `${baseName}${size.suffix}.webp`;
      const outputPath = path.join(recipeDir, outputFileName);

      await sharp(inputPath)
        .resize(size.width, null, { withoutEnlargement: true })
        .webp({ quality: 75 })
        .toFile(outputPath);

      const stats = fs.statSync(outputPath);
      console.log(`  ✓ ${outputFileName} (${(stats.size / 1024).toFixed(2)} KB)`);
    }

    console.log('');
  }

  console.log('✓ Generación de variantes completada!');
}

generateRecipeVariants().catch(err => {
  console.error('Error durante la generación:', err);
  process.exit(1);
});

