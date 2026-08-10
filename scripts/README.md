# 📸 Guía: Procesamiento Automático de Imágenes

Este directorio contiene scripts para automatizar el renombrado y procesamiento de imágenes.

## ¿Por qué se necesita?

Recibis imágenes con nombres UUID (ej: `1193b868-32d0-4952-8634-39c3ba843f30.jpg`) que necesitan ser:
1. **Renombradas** a números simples (1.jpg, 2.jpg, etc.)
2. **Organizadas** en la estructura correcta (`/images/comercializadora/categoria/subcategoria/`)
3. **Optimizadas** para web (reducir tamaño sin perder calidad)

## Opción 1: Script en PowerShell (Recomendado para Windows)

### Requisitos:
- Windows 10/11
- PowerShell (incluido)
- **Opcional**: ImageMagick para optimización (recomendado)

### Instalar ImageMagick:
1. Descargar desde: https://imagemagick.org/script/download.php#windows
2. Ejecutar el instalador
3. **Importante**: Marcar la opción "Install development headers"

### Usar el script:

```powershell
# En PowerShell (como Administrator si es necesario)
cd C:\Users\Nichan\Desktop\COMERCIALIZADORA\COMERCIALIZADORA-DEL-HOGAR

# Ejecutar con rutas por defecto
powershell -ExecutionPolicy Bypass -File .\scripts\image-processor.ps1

# O especificar rutas custom
powershell -ExecutionPolicy Bypass -File .\scripts\image-processor.ps1 -rutaOrigen "C:\ARTICULOS NUEVOS" -rutaDestino ".\images\comercializadora"
```

## Opción 2: Script en Node.js (Multiplataforma)

### Requisitos:
- Node.js instalado (desde https://nodejs.org)
- **Opcional**: ImageMagick para optimización

### Usar el script:

```bash
# En una terminal (cmd, PowerShell, bash, etc.)
cd C:\Users\Nichan\Desktop\COMERCIALIZADORA\COMERCIALIZADORA-DEL-HOGAR

# Ejecutar con rutas por defecto
node scripts/image-processor.js

# O especificar rutas custom
node scripts/image-processor.js "C:\ARTICULOS NUEVOS" ".\images\comercializadora"
```

## Estructura de carpetas generada

```
images/comercializadora/
├── comedor/
│   ├── comedor-4-puestos/
│   │   ├── 1.jpg
│   │   ├── 2.jpg
│   │   └── 3.jpg
│   ├── comedor-4-puestos-negro/
│   │   └── 1.jpg
│   └── comedor-6-puestos/
│       ├── 1.jpg
│       └── 2.jpg
├── horno-de-microondas/
│   ├── mabe-espejo-1-1/
│   │   ├── 1.jpg
│   │   ├── 2.jpg
│   │   └── 3.jpg
│   └── ...
└── ...
```

## Archivos renombrados en productos.js

El archivo `js/productos.js` usa la función `img()` que genera automáticamente las rutas:

```javascript
function img(categoria, carpeta) {
  return `/images/comercializadora/${categoria}/${carpeta}/1.jpg`;
}

// Ejemplo de uso
{
  id: 1,
  nombre: "Comedor 4 Puestos",
  categoria: "Comedores",
  imagen: img("comedores", "comedor-4-puestos"),
  // ... resto de datos
}
```

## Automatizar mensualmente

Para que sea completamente automático cada mes:

### Windows (Tareas Programadas):
1. Abrir "Tareas Programadas"
2. Crear tarea básica
3. Trigger: Mensual (el día que recibas imágenes)
4. Action: `powershell.exe -ExecutionPolicy Bypass -File C:\Users\Nichan\Desktop\COMERCIALIZADORA\COMERCIALIZADORA-DEL-HOGAR\scripts\image-processor.ps1`

### Mac/Linux:
Agregar a crontab:
```bash
0 0 1 * * cd ~/Desktop/COMERCIALIZADORA/COMERCIALIZADORA-DEL-HOGAR && node scripts/image-processor.js
```

## Optimización de imágenes

Si tienes ImageMagick instalado, el script automáticamente:
- Reduce la calidad a 80% (imperceptible al ojo pero gran reducción de tamaño)
- Elimina datos EXIF
- Usa compresión intercalada

Puedes ajustar estos parámetros editando la línea en el script:
```javascript
// En image-processor.js
// Busca: -quality 80
// Puedes cambiar 80 a otro valor (70 = más pequeño, 90 = más calidad)
```

## Troubleshooting

### Error: "El archivo o carpeta de origen no existe"
- Asegurate que la ruta en `C:\ARTICULOS NUEVOS` existe
- Verifica que escribiste correctamente la ruta

### Las imágenes no se optimizan
- ImageMagick no está instalado
- El script continúa funcionando sin él (solo copia/renombra)
- Es opcional pero recomendado

### Error de permisos en PowerShell
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

## Preguntas frecuentes

**¿Necesito hacer esto manualmente cada mes?**
No, puedes automatizarlo con las Tareas Programadas (Windows) o cron (Linux/Mac)

**¿Qué pasa con las imágenes antiguas?**
El script sobrescribe las carpetas existentes. Si quieres mantener historial, copia la carpeta antes.

**¿Puedo usar otro formato como WebP?**
Sí, puedes modificar el script, pero JPG es soportado por todos los navegadores sin problemas.

**¿Las imágenes se ven comprimidas?**
Con calidad 80, casi no se nota la diferencia pero el tamaño se reduce 50-70%.

---

**¿Preguntas o problemas?** Revisa la consola del script para mensajes de error específicos.
