#!/usr/bin/env node

/**
 * Script de Procesamiento de Imágenes
 * Uso: node image-processor.js <ruta-origen> <ruta-destino>
 * Ejemplo: node image-processor.js "C:\ARTICULOS NUEVOS" ".\images\comercializadora"
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Colores para la consola
const colors = {
  reset: '\x1b[0m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m'
};

function log(mensaje, color = 'reset') {
  console.log(`${colors[color]}${mensaje}${colors.reset}`);
}

/**
 * Convierte un string a slug (URL-friendly)
 */
function convertirASlug(texto) {
  return texto
    .toLowerCase()
    .replace(/á/g, 'a')
    .replace(/é/g, 'e')
    .replace(/í/g, 'i')
    .replace(/ó/g, 'o')
    .replace(/ú/g, 'u')
    .replace(/ñ/g, 'n')
    .replace(/ü/g, 'u')
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Obtiene el tamaño de archivo en formato legible
 */
function formatearTamano(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Obtiene todas las carpetas recursivamente
 */
function obtenerCarpetas(ruta) {
  try {
    return fs.readdirSync(ruta)
      .map(nombre => ({
        nombre,
        ruta: path.join(ruta, nombre),
        esDirectorio: fs.statSync(path.join(ruta, nombre)).isDirectory()
      }))
      .filter(item => item.esDirectorio);
  } catch (e) {
    return [];
  }
}

/**
 * Obtiene todas las imágenes de una carpeta
 */
function obtenerImagenes(ruta) {
  try {
    return fs.readdirSync(ruta)
      .filter(archivo => /\.(jpg|jpeg|png)$/i.test(archivo))
      .map(archivo => path.join(ruta, archivo));
  } catch (e) {
    return [];
  }
}

/**
 * Copia y renombra imagen
 */
function copiarYRenombrar(rutaOrigen, rutaDestino, nuevoNombre) {
  try {
    fs.copyFileSync(rutaOrigen, rutaDestino);
    return true;
  } catch (e) {
    log(`Error: ${e.message}`, 'red');
    return false;
  }
}

/**
 * Intenta optimizar la imagen con ImageMagick
 */
function optimizarImagen(ruta) {
  try {
    // Intentar con ImageMagick
    execSync(`magick "${ruta}" -quality 80 -strip -interlace Plane "${ruta}"`, { stdio: 'ignore' });
    return true;
  } catch (e) {
    // ImageMagick no disponible o no instalado
    return false;
  }
}

// ====================MAIN====================

const rutaOrigen = process.argv[2] || './ARTICULOS NUEVOS';
const rutaDestino = process.argv[3] || './images/comercializadora';

// Validar rutas
if (!fs.existsSync(rutaOrigen)) {
  log(`❌ La carpeta de origen no existe: ${rutaOrigen}`, 'red');
  process.exit(1);
}

if (!fs.existsSync(rutaDestino)) {
  fs.mkdirSync(rutaDestino, { recursive: true });
  log(`✅ Carpeta destino creada: ${rutaDestino}`, 'green');
}

let totalProcesadas = 0;
let totalErrores = 0;
let totalBytes = 0;

log('\n🔄 Iniciando procesamiento de imágenes...', 'cyan');
log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'cyan');

// Procesar categorías
const categorias = obtenerCarpetas(rutaOrigen);

for (const categoria of categorias) {
  if (categoria.nombre === 'PROMOCIONES') continue;

  const slugCategoria = convertirASlug(categoria.nombre);
  log(`\n📁 Categoría: ${categoria.nombre}`, 'yellow');

  const subcategorias = obtenerCarpetas(categoria.ruta);

  for (const subcat of subcategorias) {
    const slugSubcategoria = convertirASlug(subcat.nombre);
    const rutaCarpetaDestino = path.join(rutaDestino, slugCategoria, slugSubcategoria);

    if (!fs.existsSync(rutaCarpetaDestino)) {
      fs.mkdirSync(rutaCarpetaDestino, { recursive: true });
    }

    const imagenes = obtenerImagenes(subcat.ruta);
    let contador = 1;

    for (const imagen of imagenes) {
      try {
        const extension = path.extname(imagen).toLowerCase();
        const nuevoNombre = `${contador}${extension}`;
        const rutaDestinacion = path.join(rutaCarpetaDestino, nuevoNombre);

        // Copiar imagen
        if (copiarYRenombrar(imagen, rutaDestinacion, nuevoNombre)) {
          const stats = fs.statSync(rutaDestinacion);
          const tamano = formatearTamano(stats.size);
          
          // Intentar optimizar
          optimizarImagen(rutaDestinacion);

          log(`  ✅ ${path.basename(imagen)} → ${nuevoNombre} (${tamano})`, 'green');
          contador++;
          totalProcesadas++;
          totalBytes += stats.size;
        }
      } catch (e) {
        log(`  ❌ Error: ${e.message}`, 'red');
        totalErrores++;
      }
    }
  }
}

// Procesar carpeta PROMOCIONES
const carpetaPromociones = path.join(rutaOrigen, 'PROMOCIONES');
if (fs.existsSync(carpetaPromociones)) {
  log(`\n📁 Categoría: PROMOCIONES`, 'yellow');

  const rutaCarpetaDestino = path.join(rutaDestino, 'promociones');
  if (!fs.existsSync(rutaCarpetaDestino)) {
    fs.mkdirSync(rutaCarpetaDestino, { recursive: true });
  }

  const imagenes = obtenerImagenes(carpetaPromociones);
  let contador = 1;

  for (const imagen of imagenes) {
    try {
      const extension = path.extname(imagen).toLowerCase();
      const nuevoNombre = `${contador}${extension}`;
      const rutaDestinacion = path.join(rutaCarpetaDestino, nuevoNombre);

      if (copiarYRenombrar(imagen, rutaDestinacion, nuevoNombre)) {
        const stats = fs.statSync(rutaDestinacion);
        const tamano = formatearTamano(stats.size);
        
        optimizarImagen(rutaDestinacion);

        log(`  ✅ ${path.basename(imagen)} → ${nuevoNombre} (${tamano})`, 'green');
        contador++;
        totalProcesadas++;
        totalBytes += stats.size;
      }
    } catch (e) {
      log(`  ❌ Error: ${e.message}`, 'red');
      totalErrores++;
    }
  }
}

// Resumen
log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'cyan');
log('📊 RESUMEN:', 'cyan');
log(`✅ Imágenes procesadas: ${totalProcesadas}`, 'green');
log(`📦 Tamaño total: ${formatearTamano(totalBytes)}`, 'cyan');
log(`❌ Errores: ${totalErrores}`, totalErrores > 0 ? 'red' : 'green');
log(`\n✨ ¡Procesamiento completado!`, 'cyan');
log(`Destino: ${rutaDestino}`, 'cyan');
