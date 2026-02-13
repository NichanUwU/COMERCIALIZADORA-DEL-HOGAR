# GUÍA DE GESTIÓN DEL CATÁLOGO

## Estructura del Sistema

Tu sitio ahora está organizado en dos páginas principales:

### 1. **PÁGINA DE INICIO (index.html)**
- Muestra solo los **productos destacados** (seleccionados)
- Ideal para promociones y productos en descuento
- Incluye slider de banners y ofertas especiales

### 2. **PÁGINA DE CATÁLOGO (catalogo.html)**
- Muestra **todos los productos**
- Permite filtrar por **categorías**
- Filtros: Electrónica, Ropa y Moda, Hogar, Deportes, Todos

---

## Cómo AGREGAR o MODIFICAR PRODUCTOS

Todos los productos se encuentran en: **js/productos.js**

### Estructura de un Producto:
```javascript
{
    id: 1,                              // ID único del producto
    nombre: "Reloj Inteligente",       // Nombre que aparece en la tienda
    categoria: "Electronica",          // Categoría (Electronica, Ropa, Hogar, Deportes)
    imagen: "URL_DE_LA_IMAGEN",        // URL de la imagen
    precioOriginal: 3199,              // Precio sin descuento
    precioActual: 2499,                // Precio con descuento (si no hay descuento, igual al original)
    destacado: true                    // true: aparece en la página principal
}
```

### Ejemplo - Cómo AGREGAR un nuevo producto:
1. Abre **js/productos.js**
2. Ve al array `productos = [...]`
3. Agrega un nuevo objeto al final:
```javascript
{
    id: 15,
    nombre: "Mi Nuevo Producto",
    categoria: "Ropa",
    imagen: "https://ejemplo.com/imagen.jpg",
    precioOriginal: 1000,
    precioActual: 750,
    destacado: true    // Si deseas que aparezca en la página principal
}
```

### Ejemplo - Cómo CAMBIAR un producto a "DESTACADO":
Solo cambia `destacado: false` a `destacado: true`

### Ejemplo - Cómo AGREGAR una nueva CATEGORÍA:
1. Abre **js/productos.js**
2. En el parámetro `categoria`, usa el nuevo nombre (ej: "Electrónica", "Joyería", etc.)
3. Los filtros se generarán automáticamente

---

## CATEGORÍAS ACTUALES

- **Electronica** - Productos electrónicos
- **Ropa** - Ropa y moda
- **Hogar** - Artículos del hogar
- **Deportes** - Equipo deportivo

---

## FUNCIONALIDADES

✅ **Descuentos automáticos**: El sistema calcula el % de descuento automáticamente
✅ **Badge de descuento**: Aparece automáticamente si hay descuento
✅ **Filtros dinámicos**: Se generan automáticamente según las categorías
✅ **Diseño responsivo**: Funciona en móvil, tablet y desktop
✅ **Efectos hover**: Las tarjetas tienen animaciones suaves

---

## ARCHIVOS CLAVE

- **index.html** - Página principal
- **catalogo.html** - Página de catálogo con filtros
- **js/productos.js** - Base de datos de productos (EDITA AQUÍ)
- **js/index.js** - Lógica de la página principal
- **js/catalogo.js** - Lógica de filtros y catálogo
- **css/style.css** - Estilos (ya incluye responsive)

---

## NOTAS IMPORTANTES

1. **Los precios** deben ser números sin "$" ni comas
   - ✅ Correcto: `precioActual: 1299`
   - ❌ Incorrecto: `precioActual: "$1,299"`

2. **Las categorías** deben ser exactamente iguales en cada producto (respeta mayúsculas)
   - ✅ Correcto: `categoria: "Electronica"`
   - ❌ Incorrecto: `categoria: "electronica"`

3. **Las imágenes** deben ser URLs completas de internet o rutas relativas
   - ✅ Correcto: `https://ejemplo.com/imagen.jpg`
   - ✅ Correcto: `images/producto.jpg`

4. **El ID** debe ser único para cada producto

---

## PERSONALIZACIONES RÁPIDAS

### Cambiar color principal del sitio (de Rosa a otro color):
1. Abre **css/style.css**
2. Busca `#E91E63` (color rosa)
3. Reemplaza con tu color (ej: `#2196F3` para azul)

### Cambiar nombre de la tienda:
Busca "CatálogoOnline" en los archivos HTML y reemplaza

---

## PREGUNTAS FRECUENTES

**P: ¿Puedo eliminar una categoría?**
R: Sí, simplemente no uses esa categoría en ningún producto.

**P: ¿Puedo tener productos sin descuento?**
R: Sí, pon `precioOriginal` igual a `precioActual`

**P: ¿Cómo cambio el logotipo?**
R: Reemplaza **images/logo.png** con tu logotipo

**P: ¿Puedo agregar más de 4 categorías?**
R: Sí, simplemente agrega productos con nuevas categorías.

---

¡Listo! Tu sitio está completamente funcional y personalizable.
