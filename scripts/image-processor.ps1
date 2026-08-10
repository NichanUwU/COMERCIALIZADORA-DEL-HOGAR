# Script de Procesamiento Automático de Imágenes
# Este script procesa las carpetas de imágenes, las renombra y las optimiza

# Parámetros
param(
    [string]$rutaOrigen = "C:\ARTICULOS NUEVOS",
    [string]$rutaDestino = ".\images\comercializadora"
)

# Función para convertir a slug (nombre URL-friendly)
function ConvertirASlug {
    param([string]$texto)
    
    # Convertir a minúsculas
    $slug = $texto.ToLower()
    
    # Reemplazar espacios y caracteres especiales
    $slug = $slug -replace 'á', 'a'
    $slug = $slug -replace 'é', 'e'
    $slug = $slug -replace 'í', 'i'
    $slug = $slug -replace 'ó', 'o'
    $slug = $slug -replace 'ú', 'u'
    $slug = $slug -replace 'ñ', 'n'
    $slug = $slug -replace 'ü', 'u'
    $slug = $slug -replace '[^a-z0-9]', '-'
    $slug = $slug -replace '-+', '-'
    $slug = $slug -replace '^-|-$', ''
    
    return $slug
}

# Verificar que ImageMagick esté instalado
Write-Host "Verificando ImageMagick..." -ForegroundColor Cyan
$imageMagickPath = "C:\Program Files\ImageMagick-7*\magick.exe" | Get-Item -ErrorAction SilentlyContinue | Select-Object -First 1
if (-not $imageMagickPath) {
    Write-Host "⚠️  ImageMagick no está instalado." -ForegroundColor Yellow
    Write-Host "Descargar desde: https://imagemagick.org/script/download.php#windows" -ForegroundColor Yellow
    Write-Host "Se continuará sin optimización de imágenes." -ForegroundColor Yellow
}

# Verificar rutas
if (-not (Test-Path $rutaOrigen)) {
    Write-Host "❌ La carpeta de origen no existe: $rutaOrigen" -ForegroundColor Red
    exit 1
}

if (-not (Test-Path $rutaDestino)) {
    New-Item -Path $rutaDestino -ItemType Directory -Force | Out-Null
    Write-Host "✅ Carpeta destino creada: $rutaDestino" -ForegroundColor Green
}

# Procesar categorías
$categorias = Get-ChildItem -Path $rutaOrigen -Directory | Where-Object { $_.Name -ne "PROMOCIONES" }
$promociones = Join-Path $rutaOrigen "PROMOCIONES"

$totalProcesadas = 0
$totalErrores = 0

Write-Host "`n🔄 Iniciando procesamiento de imágenes..." -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan

# Procesar cada categoría
foreach ($categoria in $categorias) {
    $slugCategoria = ConvertirASlug $categoria.Name
    $subcategorias = Get-ChildItem -Path $categoria.FullName -Directory
    
    Write-Host "`n📁 Categoría: $($categoria.Name)" -ForegroundColor Yellow
    
    foreach ($subcat in $subcategorias) {
        $slugSubcategoria = ConvertirASlug $subcat.Name
        $rutaCarpetaDestino = Join-Path $rutaDestino $slugCategoria $slugSubcategoria
        
        if (-not (Test-Path $rutaCarpetaDestino)) {
            New-Item -Path $rutaCarpetaDestino -ItemType Directory -Force | Out-Null
        }
        
        $imagenes = Get-ChildItem -Path $subcat.FullName -Include @("*.jpg", "*.jpeg", "*.png") -File
        $contador = 1
        
        foreach ($imagen in $imagenes) {
            try {
                $extension = $imagen.Extension.ToLower()
                $nuevoNombre = "$contador$extension"
                $rutaDestinacion = Join-Path $rutaCarpetaDestino $nuevoNombre
                
                # Copiar imagen
                Copy-Item -Path $imagen.FullName -Destination $rutaDestinacion -Force
                
                # Intentar optimizar con ImageMagick si está disponible
                if ($imageMagickPath) {
                    & $imageMagickPath.FullName $rutaDestinacion -quality 80 -strip -interlace Plane $rutaDestinacion 2>$null
                }
                
                Write-Host "  ✅ $($imagen.Name) → $nuevoNombre" -ForegroundColor Green
                $contador++
                $totalProcesadas++
            }
            catch {
                Write-Host "  ❌ Error procesando $($imagen.Name): $_" -ForegroundColor Red
                $totalErrores++
            }
        }
    }
}

# Procesar carpeta PROMOCIONES
if (Test-Path $promociones) {
    Write-Host "`n📁 Categoría: PROMOCIONES" -ForegroundColor Yellow
    
    $rutaCarpetaDestino = Join-Path $rutaDestino "promociones"
    if (-not (Test-Path $rutaCarpetaDestino)) {
        New-Item -Path $rutaCarpetaDestino -ItemType Directory -Force | Out-Null
    }
    
    $imagenes = Get-ChildItem -Path $promociones -Include @("*.jpg", "*.jpeg", "*.png") -File
    $contador = 1
    
    foreach ($imagen in $imagenes) {
        try {
            $extension = $imagen.Extension.ToLower()
            $nuevoNombre = "$contador$extension"
            $rutaDestinacion = Join-Path $rutaCarpetaDestino $nuevoNombre
            
            Copy-Item -Path $imagen.FullName -Destination $rutaDestinacion -Force
            
            if ($imageMagickPath) {
                & $imageMagickPath.FullName $rutaDestinacion -quality 80 -strip -interlace Plane $rutaDestinacion 2>$null
            }
            
            Write-Host "  ✅ $($imagen.Name) → $nuevoNombre" -ForegroundColor Green
            $contador++
            $totalProcesadas++
        }
        catch {
            Write-Host "  ❌ Error procesando $($imagen.Name): $_" -ForegroundColor Red
            $totalErrores++
        }
    }
}

# Resumen
Write-Host "`n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "📊 RESUMEN:" -ForegroundColor Cyan
Write-Host "✅ Imágenes procesadas: $totalProcesadas" -ForegroundColor Green
Write-Host "❌ Errores: $totalErrores" -ForegroundColor $(if ($totalErrores -gt 0) { "Red" } else { "Green" })
Write-Host "`n✨ ¡Procesamiento completado!" -ForegroundColor Cyan
Write-Host "Destino: $rutaDestino" -ForegroundColor Cyan
