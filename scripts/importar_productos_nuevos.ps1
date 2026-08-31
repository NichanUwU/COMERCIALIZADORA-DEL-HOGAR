param(
    [string]$JsonPath = (Join-Path $PSScriptRoot "..\..\NUEVOS PRODUCTOS 9-8-2026\ARTICULOS.json"),
    [string]$ArchiveRoot = (Join-Path $PSScriptRoot "..\..\NUEVOS PRODUCTOS 9-8-2026\Archive\ARTICULOS NUEVOS"),
    [string]$ImagesRoot = (Join-Path $PSScriptRoot "..\images\comercializadora"),
    [string]$ProductsJsPath = (Join-Path $PSScriptRoot "..\js\productos.js")
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

function Normalize-Text {
    param([string]$Text)

    if ([string]::IsNullOrWhiteSpace($Text)) {
        return ''
    }

    $normalized = $Text.ToLowerInvariant()
    $replacements = @(
        @('á', 'a'), @('à', 'a'), @('ä', 'a'), @('â', 'a'), @('ã', 'a'),
        @('é', 'e'), @('è', 'e'), @('ë', 'e'), @('ê', 'e'),
        @('í', 'i'), @('ì', 'i'), @('ï', 'i'), @('î', 'i'),
        @('ó', 'o'), @('ò', 'o'), @('ö', 'o'), @('ô', 'o'), @('õ', 'o'),
        @('ú', 'u'), @('ù', 'u'), @('ü', 'u'), @('û', 'u'),
        @('ñ', 'n'), @('ç', 'c'), @('°', ''), @('"', ''), @("'", '')
    )

    foreach ($pair in $replacements) {
        $normalized = $normalized.Replace($pair[0], $pair[1])
    }

    $normalized = $normalized -replace '[^a-z0-9\s-]', ''
    $normalized = $normalized -replace '\s+', '-'
    $normalized = $normalized -replace '-+', '-'
    return ($normalized.Trim('-'))
}

function Get-CategoryInfo {
    param([string]$Producto)

    $productoNorm = $Producto.ToUpperInvariant()

    if ($productoNorm -match 'COMEDOR') {
        return @{ Display = 'Comedores'; Folder = 'comedores' }
    }
    if ($productoNorm -match 'MICROONDAS|MICROONDA') {
        return @{ Display = 'Microondas'; Folder = 'microondas' }
    }
    if ($productoNorm -match 'LICUADORA') {
        return @{ Display = 'Licuadoras'; Folder = 'licuadoras' }
    }
    if ($productoNorm -match 'VENTILADOR') {
        return @{ Display = 'Ventiladores'; Folder = 'ventiladores' }
    }
    if ($productoNorm -match 'PANTALLA|AIWA|GHIA|ONN|TCL|LG|HISENSE') {
        return @{ Display = 'Pantallas'; Folder = 'pantalla' }
    }
    if ($productoNorm -match 'VANITY|GAVETA') {
        return @{ Display = 'Vanidades'; Folder = 'vanidades' }
    }
    if ($productoNorm -match 'COLCH') {
        return @{ Display = 'Colchones'; Folder = 'colchones' }
    }
    if ($productoNorm -match 'LAVADORA') {
        return @{ Display = 'Lavadoras'; Folder = 'lavadoras' }
    }
    if ($productoNorm -match 'ESTUFA') {
        return @{ Display = 'Estufas'; Folder = 'estufas' }
    }

    return @{ Display = 'General'; Folder = 'general' }
}

function Find-SourceDir {
    param(
        [string]$Producto,
        [string]$ArchiveRoot
    )

    if (-not (Test-Path $ArchiveRoot)) {
        return $null
    }

    $needle = Normalize-Text $Producto
    $productTokens = @($needle -split '-' | Where-Object { $_ })
    $matches = Get-ChildItem -Path $ArchiveRoot -Directory -Recurse |
        ForEach-Object {
            $found = Normalize-Text $_.Name
            $folderTokens = @($found -split '-' | Where-Object { $_ })
            $commonCount = @($productTokens | Where-Object { $folderTokens -contains $_ }).Count
            if ($commonCount -eq 0 -and $found -ne $needle) {
                return $null
            }

            [pscustomobject]@{
                FullName = $_.FullName
                Score = $commonCount
                Depth = ($_.FullName.Split('\\').Count)
            }
        } |
        Where-Object { $_ -ne $null } |
        Sort-Object -Property @{ Expression = 'Score'; Descending = $true }, @{ Expression = 'Depth'; Descending = $true } |
        Select-Object -First 1

    if ($matches) {
        return $matches.FullName
    }

    return $null
}

function Get-NextId {
    param([string]$ProductsJsPath)

    if (-not (Test-Path $ProductsJsPath)) {
        return 0
    }

    $content = Get-Content -Path $ProductsJsPath -Raw
    $matches = [regex]::Matches($content, '(?m)\s*id:\s*(\d+)')
    if ($matches.Count -eq 0) {
        return 0
    }

    $maxId = ($matches | ForEach-Object { [int]$_.Groups[1].Value } | Measure-Object -Maximum).Maximum
    return [int]$maxId
}

function To-JsString {
    param([string]$Text)

    $escaped = $Text.Replace('\\', '\\\\').Replace("'", "\\'")
    if ($escaped.Contains('"')) {
        return "'" + $escaped + "'"
    }

    $escaped = $escaped.Replace('"', '\\"')
    return '"' + $escaped + '"'
}

if (-not (Test-Path $JsonPath)) {
    throw "No se encontró el archivo JSON: $JsonPath"
}

$jsonItems = Get-Content -Raw -Path $JsonPath | ConvertFrom-Json
if ($null -eq $jsonItems) {
    throw "El archivo JSON está vacío o no tiene datos válidos."
}

$imagesRootPath = (Resolve-Path (Join-Path $PSScriptRoot "..\images\comercializadora")).Path
if (-not (Test-Path $imagesRootPath)) {
    New-Item -ItemType Directory -Path $imagesRootPath -Force | Out-Null
}

$lastId = Get-NextId -ProductsJsPath $ProductsJsPath
$entries = @()

foreach ($item in $jsonItems) {
    $productName = [string]$item.'PRODUCTO'
    $categoryInfo = Get-CategoryInfo -Producto $productName
    $sourceDir = Find-SourceDir -Producto $productName -ArchiveRoot $ArchiveRoot

    $folderName = if ($sourceDir) { Normalize-Text (Split-Path $sourceDir -Leaf) } else { Normalize-Text $productName }
    $targetDir = Join-Path $imagesRootPath $categoryInfo.Folder
    $targetDir = Join-Path $targetDir $folderName
    New-Item -ItemType Directory -Path $targetDir -Force | Out-Null

    $needsPlaceholder = $false
    if ($sourceDir -and (Test-Path $sourceDir)) {
        $images = @(Get-ChildItem -Path $sourceDir -File | Sort-Object Name)
        if ($images.Count -gt 0) {
            $index = 1
            foreach ($image in $images) {
                $destination = Join-Path $targetDir "$index.jpg"
                Copy-Item -Path $image.FullName -Destination $destination -Force
                $index++
            }

            while ($index -le 3) {
                $sourceCopy = Join-Path $targetDir "1.jpg"
                $destination = Join-Path $targetDir "$index.jpg"
                if (-not (Test-Path $destination)) {
                    Copy-Item -Path $sourceCopy -Destination $destination -Force
                }
                $index++
            }
        }
        else {
            $needsPlaceholder = $true
        }
    }
    else {
        $needsPlaceholder = $true
        Write-Warning "No se encontró una carpeta de imágenes para: $productName"
    }

    if ($needsPlaceholder) {
        $placeholder = Join-Path $targetDir "1.jpg"
        if (-not (Test-Path $placeholder)) {
            Add-Type -AssemblyName System.Drawing
            $bitmap = New-Object System.Drawing.Bitmap 800, 600
            $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
            $graphics.Clear([System.Drawing.Color]::FromArgb(245, 245, 245))
            $font = New-Object System.Drawing.Font('Arial', 22, [System.Drawing.FontStyle]::Bold)
            $brush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::DarkGray)
            $productShort = $productName
            if ($productShort.Length -gt 28) {
                $productShort = $productShort.Substring(0, 28) + '...'
            }
            $graphics.DrawString($productShort, $font, $brush, 30, 260)
            $graphics.Dispose()
            $bitmap.Save($placeholder, [System.Drawing.Imaging.ImageFormat]::Jpeg)
            $bitmap.Dispose()
        }

        for ($i = 2; $i -le 3; $i++) {
            $copyTarget = Join-Path $targetDir "$i.jpg"
            if (-not (Test-Path $copyTarget)) {
                Copy-Item -Path $placeholder -Destination $copyTarget -Force
            }
        }
    }

    $lastId++
    $contado = $item.'PRECIO CONTADO'
    if ($null -eq $contado -or [string]::IsNullOrWhiteSpace([string]$contado)) {
        $contado = [int]$item.'PRECIO VENTA FINANCIADO'
    }

    $total = [int]$item.'PRECIO VENTA FINANCIADO'
    $enganche = [int]$item.ENGANCHE
    $financiado = [int]$item.'PRECIO VENTA FINANCIADO'
    $semanas = [int]$item.SEMANAS
    $pago = [int]$item.'PAGO SEMANALES'

    $entries += @"
  {
    id: $lastId,
    nombre: $(To-JsString $productName),
    categoria: "$($categoryInfo.Display)",
    imagen: img("$($categoryInfo.Folder)", "$($folderName)"),
    contado: $contado,
    total: $total,
    enganche: $enganche,
    financiado: $financiado,
    semanas: $semanas,
    pago: $pago,
    destacado: false,
  },
"@
}

if ($entries.Count -eq 0) {
    Write-Host "No se generaron entradas nuevas."
    return
}

$contents = Get-Content -Path $ProductsJsPath -Raw
if ($contents.Contains('];')) {
    $replacement = ",`n" + ($entries -join "") + "`n];"
    $contents = $contents -replace '\];', $replacement
    Set-Content -Path $ProductsJsPath -Value $contents -Encoding UTF8
    Write-Host "Se agregaron $($entries.Count) productos nuevos al archivo $ProductsJsPath"
}
else {
    Write-Error "No se encontró el cierre del array de productos en $ProductsJsPath"
}
