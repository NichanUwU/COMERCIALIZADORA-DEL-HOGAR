# 🏪 Comercializadora del Hogar

Tienda de electrodomésticos y línea blanca con catálogo completo, búsqueda avanzada e integración con WhatsApp.

**🌐 Sitio Web:** https://comercializadora-del-hogar.vercel.app/  
**📞 WhatsApp:** [+52-96510-00641](https://api.whatsapp.com/send/?phone=529651000641)  
**👍 Facebook:** [Comercializadora del Hogar](https://www.facebook.com/share/17PV3RjV2D/)

---

## ✨ Características Principales

### 🛍️ Catálogo Completo
- 50+ productos en diferentes categorías
- Búsqueda en tiempo real
- Filtros avanzados (categoría, precio, ordenamiento)
- Imágenes optimizadas con lazy loading

### 🛒 Carrito Inteligente
- Carrito persistente (guarda en localStorage)
- Integración directa con WhatsApp
- Envía pedidos preformateados
- Cálculo automático de totales

### 📱 Diseño Profesional
- Completamente responsive
- Diseño moderno y elegante
- Animaciones suaves
- Accesible para lectores de pantalla

### ⚡ Rendimiento
- Lazy loading de imágenes
- Optimización automática
- CSS minificado
- Carga rápida en todos los dispositivos

### 🔍 SEO Optimizado
- Meta tags completos
- Datos estructurados (Schema.org)
- URLs canónicas
- Títulos y descripciones únicos

---

## 📋 Mejoras Realizadas (v2.0)

### ✅ Estructura y Código
- ✓ Modularización completa de JavaScript
- ✓ Funciones centralizadas en helpers
- ✓ Fácil de mantener y escalar

### ✅ Performance
- ✓ Lazy loading de imágenes
- ✓ Scripts automáticos para optimizar imágenes
- ✓ CSS profesional y eficiente
- ✓ Compresión y caché inteligente

### ✅ Funcionalidades
- ✓ Búsqueda global con debounce
- ✓ Filtros avanzados
- ✓ Carrito integrado
- ✓ Notificaciones visuales
- ✓ Integración WhatsApp

### ✅ Diseño (100/100)
- ✓ Paleta de colores premium
- ✓ Tipografía moderna
- ✓ Espaciado profesional
- ✓ Animaciones naturales
- ✓ Responsivo en todos los tamaños

### ✅ SEO y Accesibilidad
- ✓ Meta tags mejorados
- ✓ Schema.org JSON-LD
- ✓ ARIA labels
- ✓ Títulos descriptivos

---

## 🚀 Inicio Rápido

### Clonar el Repositorio
```bash
git clone https://github.com/tuusuario/comercializadora-del-hogar.git
cd comercializadora-del-hogar
```

### Abrir Localmente
```bash
# Con Python 3
python -m http.server 8000

# O con Node.js
npx http-server
```

Luego abre: http://localhost:8000

### Despliegue en Vercel
```bash
npm install -g vercel
vercel
```

---

## 📁 Estructura del Proyecto

```
├── index.html              # Página de inicio
├── catalogo.html           # Catálogo completo
├── package.json            # Configuración del proyecto
├── vercel.json            # Config de Vercel (headers, caché)
│
├── css/
│   └── style.css          # Estilos profesionales (v2.0)
│
├── js/
│   ├── productos.js       # Base de datos de productos
│   ├── index.js           # Script inicio
│   ├── catalogo.js        # Script catálogo
│   ├── utils/
│   │   └── helpers.js     # Funciones comunes
│   └── modules/
│       ├── slider.js      # Carrusel de banners
│       ├── filters.js     # Búsqueda y filtros
│       └── cart.js        # Carrito y WhatsApp
│
├── images/
│   ├── comercializadora/  # Imágenes de productos
│   └── banners/          # Imágenes de banners
│
└── scripts/
    ├── image-processor.ps1    # Procesador de imágenes (PowerShell)
    ├── image-processor.js     # Procesador de imágenes (Node.js)
    └── README.md              # Guía de scripts
```

---

## 🎯 Funcionalidades Detalladas

### Búsqueda
1. Usa la barra de búsqueda
2. Escribe nombre del producto
3. Los resultados aparecen en tiempo real

### Filtros
- **Por Categoría**: Lavadoras, Estufas, Parrillas, etc.
- **Por Precio**: Rango mínimo y máximo
- **Ordenamiento**: Nombre, Precio, Más recientes

### Carrito
1. Click en "Consultar" en cualquier producto
2. Se agrega al carrito
3. Aumenta/disminuye cantidades
4. Click en el ícono del carrito
5. "Consultar por WhatsApp" envía tu pedido

### Productos Destacados
En la página de inicio ves las mejores ofertas. En `js/productos.js`:
```javascript
destacado: true  // Aparece en inicio
destacado: false // Solo en catálogo
```

---

## 🖼️ Procesamiento Automático de Imágenes

Recibis imágenes cada mes con nombres UUID. Los scripts automatizan su procesamiento:

### PowerShell (Windows)
```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\image-processor.ps1
```

### Node.js (Multiplataforma)
```bash
node scripts/image-processor.js
```

**Hace:**
- ✓ Renombra imágenes (1.jpg, 2.jpg, etc.)
- ✓ Organiza en carpetas por categoría
- ✓ Optimiza tamaño (si tienes ImageMagick)

Detalles en: `scripts/README.md`

---

## 🛠️ Cómo Agregar Productos

### Editar `js/productos.js`:

```javascript
{
    id: 100,
    nombre: "Lavadora 15 kg Samsung",
    categoria: "Lavadoras",
    imagen: img("lavadoras", "samsung-15-kg"),
    contado: 8999,
    total: 10499,
    enganche: 800,
    financiado: 9299,
    semanas: 24,
    pago: 388,
    destacado: true
}
```

### Agregar Imágenes:

```
images/comercializadora/lavadoras/samsung-15-kg/
├── 1.jpg
├── 2.jpg
└── 3.jpg
```

---

## 📊 Variables CSS Personalizables

En `css/style.css`:

```css
:root {
    --brand: #1A1410;           /* Color principal */
    --accent: #D4A574;          /* Color acento */
    --bg: #F5F3F0;              /* Fondo */
    --card: #FFFFFF;            /* Tarjetas */
    --success: #4CAF50;         /* Éxito */
    --error: #F44336;           /* Error */
}
```

---

## 🔒 Seguridad

- ✓ Headers de seguridad en Vercel
- ✓ Validación de datos en cliente
- ✓ URLs HTTPS forzadas
- ✓ Sin exposición de datos sensibles

---

## ⚙️ Configuración en Vercel

El archivo `vercel.json` configura:
- Headers de seguridad
- Caché de recursos
- Redirects y reescrituras

**No requiere cambios por defecto.**

---

## 🧪 Testing Local

### Verificar Performance
1. Abre DevTools (F12)
2. Tab "Lighthouse"
3. "Analyze page load"

### Verificar SEO
1. Lighthouse → SEO
2. Verifica que todo esté ✓

### Verificar Accesibilidad
1. Lighthouse → Accessibility
2. Prueba con lector de pantalla (NVDA/JAWS)

---

## 🐛 Troubleshooting

| Problema | Solución |
|----------|----------|
| Imágenes no cargan | Verifica ruta en `images/comercializadora/` |
| Filtros no funcionan | Limpia caché (Ctrl+Shift+R) |
| Carrito vacío al recargar | Verifica localStorage en DevTools |
| Script de imágenes falla | Ver `scripts/README.md` |
| Cambios no en Vercel | Espera 1-2 min, verifica deployment |

---

## 📈 Próximas Mejoras

- [ ] Blog con noticias/promociones
- [ ] Reseñas de clientes
- [ ] Wishlist (favoritos)
- [ ] Newsletter
- [ ] Dark mode automático
- [ ] Analytics mejorado
- [ ] Chatbot de asistencia
- [ ] Multi-idioma (English)

---

## 📚 Documentación Adicional

- **Mejoras Detalladas**: Ver `GUIA-MEJORAS.md`
- **Scripts de Imágenes**: Ver `scripts/README.md`
- **Guía de Desarrollo**: Ver `GUIA-MEJORAS.md`

---

## 📄 Licencia

© 2026 Comercializadora del Hogar. Todos los derechos reservados.

---

## 👥 Contacto

- **WhatsApp**: +52-96510-00641
- **Facebook**: [Comunidad](https://www.facebook.com/share/17PV3RjV2D/)
- **Email**: Contacta por WhatsApp

---

**Desarrollado con ❤️ por Nichan**  
*Última actualización: Agosto 2026*

