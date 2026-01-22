const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, 'src', 'assets');
const heroImages = [
  'hero-img-1.png',
  'hero-img-2.png',
  'hero-img-3.png',
  'hero-img-4.png'
];

// Tamaños para generar
const sizes = [
  { width: 400, suffix: '-small' },
  { width: 800, suffix: '-medium' },
  { width: 1200, suffix: '-large' }
];

// Formatos a generar
const formats = ['webp', 'avif'];

async function optimizeHeroImages() {
  console.log('Iniciando optimización de imágenes del hero...\n');

  for (const image of heroImages) {
    const inputPath = path.join(assetsDir, image);
    const baseName = path.parse(image).name;

    console.log(`Procesando ${image}...`);

    // Optimizar PNG original
    const optimizedPng = path.join(assetsDir, `${baseName}-optimized.png`);
    await sharp(inputPath)
      .png({ quality: 80, progressive: true })
      .toFile(optimizedPng);
    console.log(`  ✓ PNG optimizado: ${optimizedPng}`);

    // Generar múltiples tamaños en WebP y AVIF
    for (const size of sizes) {
      for (const format of formats) {
        const outputFileName = `${baseName}${size.suffix}.${format}`;
        const outputPath = path.join(assetsDir, outputFileName);

        await sharp(inputPath)
          .resize(size.width, null, { withoutEnlargement: true })
          [format]({ quality: 75 })
          .toFile(outputPath);

        const stats = fs.statSync(outputPath);
        console.log(`  ✓ ${outputFileName} (${(stats.size / 1024).toFixed(2)} KB)`);
      }

      // También generar PNG en múltiples tamaños
      const outputFileName = `${baseName}${size.suffix}.png`;
      const outputPath = path.join(assetsDir, outputFileName);

      await sharp(inputPath)
        .resize(size.width, null, { withoutEnlargement: true })
        .png({ quality: 80 })
        .toFile(outputPath);

      const stats = fs.statSync(outputPath);
      console.log(`  ✓ ${outputFileName} (${(stats.size / 1024).toFixed(2)} KB)`);
    }

    console.log('');
  }

  console.log('✓ Optimización completada!');
}

optimizeHeroImages().catch(err => {
  console.error('Error durante la optimización:', err);
  process.exit(1);
});

