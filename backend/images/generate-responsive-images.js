#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

let sharp;
try {
  sharp = require('sharp');
} catch (e) {
  console.error('❌ Error: sharp no está instalado. Ejecuta: npm install sharp');
  process.exit(1);
}

const originalesDir = path.join(__dirname, 'ingredientes-originales');
const destinoDir = path.join(__dirname, 'ingredientes');

const nombreSlugMap = {
  'aceite-de-oliva.jpg': 'aceite-de-oliva',
  'almeja.jpg': 'almeja',
  'almendra-cruda.jpg': 'almendra',
  'almendra-molida.webp': 'almendra-molida',
  'almendra-tostada.jpg': 'almendra-tostada',
  'arroz.jpg': 'arroz',
  'atun-en-conserva.png': 'atun',
  'berenjena.jpg': 'berenjena',
  'bonito-del-norte.jpg': 'bonito',
  'calamar.jpeg': 'calamar',
  'callos-de-ternera.webp': 'callos',
  'canela-molida.jpg': 'canela-molida',
  'carne-picada.webp': 'carne-picada',
  'cayena.jpg': 'cayena',
  'cebolla.jpg': 'cebolla',
  'chipiron.webp': 'chipirón',
  'chorizo-riojano.webp': 'chorizo-riojano',
  'cordero.jpg': 'cordero',
  'fruta-confitada.jpg': 'fruta-confitada',
  'gamba.jpg': 'gamba',
  'gisante.jpg': 'guisantes',
  'guisantes.jpg': 'guisantes',
  'hoja-de-laurel.jpg': 'laurel',
  'huevos.jpg': 'huevo',
  'jamon.jpg': 'jamon',
  'lechazo.jpg': 'lechazo',
  'leche.avif': 'leche',
  'lechuga.jpg': 'lechuga',
  'manteca-de-cerdo.webp': 'manteca',
  'manzana.jpg': 'manzana',
  'mayonesa.jpg': 'mayonesa',
  'mejillon.jpg': 'mejillon',
  'merluza.jpg': 'merluza',
  'morro-de-ternera.webp': 'morro',
  'naranja.jpg': 'naranja',
  'nata-liquida.jpg': 'nata',
  'pan.jpg': 'pan',
  'panceta.webp': 'panceta',
  'pasta.webp': 'pasta',
  'pata-de-ternera.webp': 'pata',
  'perejil_fresco.jpg': 'perejil',
  'pescado.webp': 'pescado',
  'pimiento-choricero.jpg': 'pimiento-choricero',
  'pimiento-del-piquillo.jpg': 'pimiento-piquillo',
  'pimiento.webp': 'pimiento',
  'piñon.jpg': 'pinon',
  'pochas-frescas.jpg': 'pochas',
  'puerro.jpg': 'puerro',
  'pulpo-cocido.webp': 'pulpo',
  'queso.jpg': 'queso',
  'rabo-de-toro.jpg': 'rabo',
  'rape.jpg': 'rape',
  'sal.webp': 'sal',
  'secreto-iberico.avif': 'secreto',
  'sepia.jpg': 'sepia',
  'tinta-de-calamar.jpg': 'tinta',
  'uva.webp': 'uva',
  'vino-blanco.jpg': 'vino-blanco',
  'vino-tinto.jpg': 'vino-tinto',
  'yogur.webp': 'yogur',
};

if (!fs.existsSync(destinoDir)) {
  fs.mkdirSync(destinoDir, { recursive: true });
}

(async () => {
  console.log('Iniciando generación de imágenes responsive...\n');

  let contador = 0;
  let errores = 0;

  try {
    const archivos = fs.readdirSync(originalesDir);
    console.log(`Encontrados ${archivos.length} archivos originales\n`);

    for (const archivo of archivos) {
      const slug = nombreSlugMap[archivo];

      if (!slug) {
        console.log(`⚠️  Saltando: ${archivo} (sin mapeo)`);
        continue;
      }

      try {
        const rutaOrigen = path.join(originalesDir, archivo);
        const stats = fs.statSync(rutaOrigen);
        console.log(`Procesando: ${archivo} (${(stats.size / 1024).toFixed(2)} KB)`);

        // Small
        await sharp(rutaOrigen)
          .resize(200, 200, { fit: 'inside', withoutEnlargement: true })
          .webp({ quality: 80 })
          .toFile(path.join(destinoDir, `${slug}-small.webp`));

        // Medium
        await sharp(rutaOrigen)
          .resize(400, 400, { fit: 'inside', withoutEnlargement: true })
          .webp({ quality: 85 })
          .toFile(path.join(destinoDir, `${slug}-medium.webp`));

        // Large
        await sharp(rutaOrigen)
          .resize(600, 600, { fit: 'inside', withoutEnlargement: true })
          .webp({ quality: 90 })
          .toFile(path.join(destinoDir, `${slug}-large.webp`));

        console.log(`✅ Generadas 3 versiones: ${slug}\n`);
        contador++;
      } catch (error) {
        console.error(`❌ Error procesando ${archivo}: ${error.message}\n`);
        errores++;
      }
    }
  } catch (error) {
    console.error(`❌ Error general: ${error.message}`);
    process.exit(1);
  }

  console.log(`\n✅ Generación completada: ${contador} ingredientes procesados, ${errores} errores`);
  process.exit(0);
})();

