# 🏪 Comercializadora del Hogar - Guía de Mejoras y Mantenimiento

Bienvenido al repositorio mejorado de Comercializadora del Hogar. Este documento explica todas las mejoras realizadas y cómo mantener el proyecto.

## 📋 Tabla de Contenidos

1. [Mejoras Realizadas](#mejoras-realizadas)
2. [Estructura del Proyecto](#estructura-del-proyecto)
3. [Guía de Desarrollo](#guía-de-desarrollo)
4. [Procesamiento Automático de Imágenes](#procesamiento-automático-de-imágenes)
5. [Despliegue en Vercel](#despliegue-en-vercel)
6. [Troubleshooting](#troubleshooting)

---

## 🚀 Mejoras Realizadas

### ✅ **1. Estructura y Organización del Código**

El código ahora está completamente modularizado:

```
js/
├── productos.js                  # Base de datos de productos
├── utils/
│   └── helpers.js               # Funciones comunes y utilidades
└── modules/
    ├── slider.js               # Lógica del slider/carrusel
    ├── filters.js              # Búsqueda y filtros avanzados
    ├── cart.js                 # Carrito integrado con WhatsApp
    └── (futuros módulos)
```

**Beneficios:**
- Código más mantenible y escalable
- Funciones centralizadas evitan duplicación
- Fácil de agregar nuevas funcionalidades

### ✅ **2. Performance y Optimización**

- **Lazy Loading**: Las imágenes se cargan solo cuando son visibles
- **Optimización automática de imágenes**: Scripts PowerShell y Node.js para procesar imágenes mensuales
- **CSS profesional y minificado**: Transiciones fluidas, responsivo
- **Transiciones modernas**: Usando cubic-bezier para animaciones naturales

### ✅ **3. SEO y Accesibilidad**

- **Meta tags mejorados**: Description, Open Graph, Twitter Cards
- **Schema.org JSON-LD**: Datos estructurados para buscadores
- **ARIA labels**: Accesibilidad para lectores de pantalla
- **URLs canónicas**: Para evitar contenido duplicado
- **Títulos únicos**: Cada página tiene título descriptivo

### ✅ **4. Diseño Profesional (100/100)**

- **Colores premium**: Paleta marrón/dorado profesional
- **Tipografía moderna**: Sistema de fuentes mejorado
- **Espaciado y proporciones**: Usando variables CSS
- **Animaciones suaves**: Transiciones naturales
- **Responsive**: Funciona perfectamente en todos los dispositivos
- **Dark mode ready**: CSS preparado para tema oscuro

### ✅ **5. Funcionalidades**

- **Búsqueda global**: Buscador en tiempo real con debounce
- **Filtros avanzados**: Por categoría, precio, ordenamiento
- **Carrito persistente**: Usa localStorage
- **Integración WhatsApp**: Envía pedidos directamente al WhatsApp
- **Notificaciones**: Feedback visual de acciones

### ✅ **6. Seguridad**

- CSP headers listos (configurar en Vercel)
- Validación de datos en cliente
- URLs seguras de WhatsApp

---

## 📁 Estructura del Proyecto

```
COMERCIALIZADORA-DEL-HOGAR/
├── index.html                    # Página de inicio
├── catalogo.html                 # Página de catálogo
├── README.md                     # Este archivo
│
├── css/
│   ├── style.css                # Estilos principales (profesionales)
│   └── style-old.css            # Backup del CSS antiguo
│
├── js/
│   ├── productos.js             # Base de datos de productos
│   ├── index.js                 # Script de index.html
│   ├── catalogo.js              # Script de catalogo.html
│   ├── main.js                  # (Deprecado)
│   │
│   ├── utils/
│   │   └── helpers.js           # Funciones comunes
│   │
│   └── modules/
│       ├── slider.js            # Carrusel de banners
│       ├── filters.js           # Búsqueda y filtros
│       └── cart.js              # Carrito y WhatsApp
│
├── images/
│   ├── logo.jpeg                # Logo de la tienda
│   ├── banners/                 # Imágenes de banners
│   └── comercializadora/        # Imágenes de productos (organizadas por categoría)
│       ├── lavadoras/
│       ├── estufas/
│       ├── parrillas/
│       ├── pantallas/
│       ├── refrigeradores/
│       ├── cilindros/
│       ├── ventiladores/
│       ├── consolas/
│       └── promociones/
│
├── scripts/
│   ├── image-processor.ps1      # Script PowerShell para imágenes
│   ├── image-processor.js       # Script Node.js para imágenes
│   └── README.md                # Guía de scripts
│
└── bd.txt                       # (Deprecado - datos antiguos)
```

---

## 🛠️ Guía de Desarrollo

### Agregar un Nuevo Producto

1. Edita `js/productos.js`:

```javascript
{
    id: 100,                                    // ID único
    nombre: "Mi Nuevo Producto",               // Nombre mostrado
    categoria: "Lavadoras",                    // Categoría existente
    imagen: img("lavadoras", "mi-producto"),  // Ruta de imagen
    contado: 5999,                             // Precio contado
    total: 7299,                               // Precio normal
    enganche: 500,                             // Enganche
    financiado: 6499,                          // Precio financiado
    semanas: 18,                               // Semanas de financiamiento
    pago: 362,                                 // Pago por semana
    destacado: true                            // ¿Mostrar en inicio?
}
```

2. Coloca las imágenes en: `images/comercializadora/lavadoras/mi-producto/1.jpg`
3. Guarda y verifica en el navegador

### Agregar una Nueva Categoría

1. Edita `js/productos.js` y agrega productos con la nueva categoría
2. La categoría se generará automáticamente en los filtros

### Actualizar Precios

1. Edita `js/productos.js`
2. Modifica los valores de `contado`, `total`, `financiado`, etc.
3. Los cambios son inmediatos

### Cambiar Productos Destacados

En `js/productos.js`, cambia `destacado: true` o `destacado: false`

### Modificar Mensajes

Busca strings en los archivos `js/*.html` y `js/modules/*.js`

---

## 📸 Procesamiento Automático de Imágenes

### ¿Por qué?

Cada mes recibes carpetas con imágenes que tienen:
- Nombres UUID (`1193b868-32d0-4952-8634-39c3ba843f30.jpg`)
- Estructura desordenada
- Sin optimización

Los scripts automatizan todo esto.

### Opción 1: PowerShell (Recomendado en Windows)

```powershell
# Abre PowerShell en la carpeta del proyecto
cd C:\Users\Nichan\Desktop\COMERCIALIZADORA\COMERCIALIZADORA-DEL-HOGAR

# Ejecuta el script
powershell -ExecutionPolicy Bypass -File .\scripts\image-processor.ps1
```

### Opción 2: Node.js (Multiplataforma)

```bash
# Abre Terminal en la carpeta del proyecto
cd C:\Users\Nichan\Desktop\COMERCIALIZADORA\COMERCIALIZADORA-DEL-HOGAR

# Ejecuta el script
node scripts/image-processor.js
```

**Resultado:**
```
images/comercializadora/
├── lavadoras/
│   ├── hisense-11-kg/
│   │   ├── 1.jpg
│   │   └── 2.jpg
│   └── mirage-13-kg/
│       └── 1.jpg
└── ...
```

### Automatizar Mensualmente

**Windows (Tareas Programadas):**
1. Abre "Tareas Programadas"
2. Nueva tarea básica
3. Nombre: "Procesar Imágenes Comercializadora"
4. Trigger: Mensual (día específico)
5. Action: 
   ```
   powershell.exe -ExecutionPolicy Bypass -File C:\Users\Nichan\Desktop\COMERCIALIZADORA\COMERCIALIZADORA-DEL-HOGAR\scripts\image-processor.ps1
   ```

Ver más detalles en: `scripts/README.md`

---

## 🚀 Despliegue en Vercel

Tu sitio está desplegado en Vercel. Para actualizar:

### Actualizar desde GitHub

1. Haz cambios locales
2. Commit: `git add . && git commit -m "descripción"`
3. Push: `git push origin main`
4. Vercel automáticamente despliega

### Configurar Variable de Entorno (Opcional)

1. Ve a Vercel Dashboard
2. Project → Settings → Environment Variables
3. Agrega si necesitas en futuro

### Ver Logs de Despliegue

1. Vercel Dashboard
2. Project → Deployments
3. Click en el deployment para ver logs

---

## 📱 Características Principales

### 🛒 Carrito de Compras

**Uso:**
1. Click en botón "Consultar" en un producto
2. Se agrega al carrito
3. Click en ícono del carrito (arriba derecha)
4. Click en "Consultar por WhatsApp"

**Funcionalidades:**
- Carrito persistente (localStorage)
- Aumentar/disminuir cantidades
- Eliminar productos
- Resumen de totales
- Mensaje preformateado a WhatsApp

### 🔍 Búsqueda

1. Usa la barra de búsqueda (aparece en catalogo y con filtros)
2. Escribe nombre del producto
3. Resultados en tiempo real

### 🎯 Filtros

- Por categoría (Todos, Lavadoras, Estufas, etc.)
- Por rango de precio
- Ordenar por: Nombre, Precio, Más recientes
- Botón "Limpiar filtros"

### 📸 Lazy Loading

Las imágenes se cargan automáticamente cuando son visibles. Mejora mucho la performance en conexiones lentas.

---

## ⚙️ Variables CSS Personalizables

En `css/style.css`:

```css
:root {
    --brand: #1A1410;           /* Color principal (marrón)*/
    --accent: #D4A574;          /* Color acento (dorado) */
    --bg: #F5F3F0;              /* Fondo general */
    --card: #FFFFFF;            /* Fondo de tarjetas */
    /* ... más variables */
}
```

Cambiarlas aquí afecta todo el sitio.

---

## 🔒 Seguridad

### CSP Headers (Vercel)

En Vercel, agreggar en `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' cdnjs.cloudflare.com; img-src 'self' data:; font-src cdnjs.cloudflare.com"
        }
      ]
    }
  ]
}
```

### Validación de Datos

Todos los datos de formularios se validan en `js/utils/helpers.js`

---

## 🐛 Troubleshooting

### **Problema: Las imágenes no cargan**

✅ **Solución:**
- Verifica que están en `images/comercializadora/`
- Usa la función `img()` en productos.js
- Revisa la ruta en el navegador (F12 → Elements)

### **Problema: El carrito no guarda**

✅ **Solución:**
- Verifica localStorage en F12 → Application → Local Storage
- Limpia caché del navegador
- Intenta en modo anónimo

### **Problema: Los filtros no funcionan**

✅ **Solución:**
- Verifica que `productos.js` está cargado
- Abre F12 → Console y busca errores
- Recarga la página

### **Problema: El script de imágenes falla**

✅ **Soluciones:**
- Verifica que la ruta de origen existe: `C:\ARTICULOS NUEVOS`
- Ejecuta como Administrador en PowerShell
- Instala ImageMagick si quieres optimización
- Ver más en `scripts/README.md`

### **Problema: Cambios no aparecen en Vercel**

✅ **Soluciones:**
- Espera 1-2 minutos al deployment
- Abre en modo anónimo (no caché)
- Fuerza refres con Ctrl+Shift+R
- Verifica en Vercel Dashboard que el deployment terminó

---

## 📞 Contacto y Soporte

**WhatsApp:** +52-96510-00641  
**Facebook:** https://www.facebook.com/share/17PV3RjV2D/

---

## 📈 Próximas Mejoras Sugeridas

1. **Blog**: Agregar sección de noticias/promociones
2. **Reviews**: Reseñas de clientes
3. **Wishlist**: Productos favoritos
4. **Newsletter**: Suscripción a correo
5. **Dark Mode**: Tema oscuro automático
6. **Analytics**: Seguimiento de visitas
7. **Chatbot**: Asistente de compras
8. **Multi-idioma**: Soporte en inglés

---

## 📄 Licencia

© 2026 Comercializadora del Hogar. Todos los derechos reservados.

---

**¿Preguntas?** Revisa los archivos README en cada carpeta o contacta al equipo.

**Última actualización:** Agosto 2026
