/**
 * Script de Validación de Variantes Responsive
 *
 * Propósito: Garantizar que CADA imagen PNG de receta tenga sus variantes WebP
 * Si falta alguna variante, genera un error y lista cuáles faltan
 *
 * Ejecución: npm run validate-images (añadir a package.json scripts)
 */

const fs = require('fs');
const path = require('path');

const recipeDir = path.join(__dirname, 'src', 'assets', 'recipes');

function validateRecipeImages() {
  console.log('🔍 Validando variantes de imágenes de recetas...\n');

  const pngFiles = fs.readdirSync(recipeDir)
    .filter(file =>
      /\.(png|jpg|jpeg|avif|webp)$/i.test(file) &&
      !file.includes('-small') &&
      !file.includes('-medium') &&
      !file.includes('-large') &&
      !file.includes('-optimized')
    );

  let allValid = true;
  const results = [];

  for (const sourceFile of pngFiles) {
    const fileName = sourceFile.replace(/\.[^/.]+$/, '');
    const requiredVariants = [
      `${fileName}-small.webp`,
      `${fileName}-medium.webp`,
      `${fileName}-large.webp`
    ];

    const missingVariants = requiredVariants.filter(variant => !fs.existsSync(path.join(recipeDir, variant)));

    if (missingVariants.length > 0) {
      allValid = false;
      results.push({
        image: sourceFile,
        missing: missingVariants,
        status: '❌ FALTA'
      });
      console.log(`❌ ${sourceFile}`);
      missingVariants.forEach(variant => console.log(`   → ${variant}`));
    } else {
      results.push({
        image: sourceFile,
        missing: [],
        status: '✅ OK'
      });
      console.log(`✅ ${sourceFile}`);
    }
  }

  console.log('\n' + '='.repeat(60));

  if (allValid) {
    console.log('✅ TODAS LAS IMÁGENES TIENEN SUS VARIANTES\n');
    console.log('Imágenes validadas: ' + pngFiles.length);
    return 0;
  } else {
    const missing = results.filter(r => r.missing.length > 0);
    console.log(`\n❌ FALTAN VARIANTES EN ${missing.length} IMAGEN(ES)\n`);

    missing.forEach(result => {
      console.log(`${result.image}:`);
      result.missing.forEach(v => console.log(`  - ${v}`));
    });

    console.log('\n💡 Ejecuta: node generate-recipe-variants.js\n');
    return 1;
  }
}

const exitCode = validateRecipeImages();
process.exit(exitCode);

