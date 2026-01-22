const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, 'src', 'assets');

// Imágenes a optimizar (excepto hero que ya están procesadas)
const imagesToOptimize = [
  '404-error.png',
  'contact-2-nobg.png',
  'contact-nobg.png',
  'cookies-nobg.png',
  'cta-image.png',
  'faq-2-nobg.png',
  'faq-3-nobg.png',
  'faq-nobg.png',
  'login-image.png',
  'newsletter-image.png',
  'privacy-nobg.png',
  'recipes-hero-bg.png',
  'register-image.png',
  'terms-nobg.png'
];

// Imágenes de recetas a optimizar
const recipeDir = path.join(assetsDir, 'recipes');
const recipeImages = fs.readdirSync(recipeDir)
  .filter(file => /\.(png|jpg|jpeg|avif)$/i.test(file));

async function optimizeImage(inputPath, outputDir = null) {
  const dir = outputDir || assetsDir;
  const fileName = path.basename(inputPath);
  const baseName = path.parse(fileName).name;
  const ext = path.parse(fileName).ext.toLowerCase();

  try {
    // Optimizar original
    const stats = fs.statSync(inputPath);
    const originalSize = stats.size;

    // Solo optimizar PNG/JPG
    if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
      const optimizedPath = inputPath.replace(ext, `-optimized${ext}`);

      if (ext === '.png') {
        await sharp(inputPath)
          .png({ quality: 80, progressive: true })
          .toFile(optimizedPath);
      } else {
        await sharp(inputPath)
          .jpeg({ quality: 75, progressive: true })
          .toFile(optimizedPath);
      }

      const optimizedStats = fs.statSync(optimizedPath);
      const savedSize = originalSize - optimizedStats.size;
      const percentage = ((savedSize / originalSize) * 100).toFixed(2);

      console.log(`  ✓ ${fileName} -> ${(optimizedStats.size / 1024).toFixed(2)} KB (reducción: ${percentage}%)`);
    }
  } catch (err) {
    console.error(`  ✗ Error optimizando ${fileName}:`, err.message);
  }
}

async function optimizeAllImages() {
  console.log('Iniciando optimización de todas las imágenes...\n');

  console.log('Optimizando imágenes generales:');
  for (const image of imagesToOptimize) {
    const inputPath = path.join(assetsDir, image);
    if (fs.existsSync(inputPath)) {
      await optimizeImage(inputPath);
    }
  }

  console.log('\nOptimizando imágenes de recetas:');
  for (const image of recipeImages) {
    const inputPath = path.join(recipeDir, image);
    await optimizeImage(inputPath, recipeDir);
  }

  console.log('\n✓ Optimización completada!');
}

optimizeAllImages().catch(err => {
  console.error('Error durante la optimización:', err);
  process.exit(1);
});

