# Comercializadora del Hogar

Sitio web estático para una tienda de electrodomésticos y artículos para el hogar, con una página de inicio, catálogo de productos, filtros por categoría y diseño responsivo.

## Descripción

Este proyecto es una landing page y catálogo de productos para una tienda local de electrodomésticos. La información de los productos se almacena en JavaScript, permitiendo actualizar precios, categorías, promociones y productos destacados sin necesidad de un backend.

## Características principales

- Página de inicio con banner promocional tipo slider
- Catálogo completo con filtros por categoría
- Productos destacados en la portada
- Diseño adaptable para desktop, tablet y móvil
- Estructura simple y fácil de mantener
- Integración de contacto por WhatsApp y enlaces sociales
- Base de datos de productos centralizada en un solo archivo

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript
- GitHub Pages / hosting estático (si se desea)

## Estructura del proyecto

```text
.
├── index.html                # Página principal
├── catalogo.html             # Catálogo completo
├── README.md                 # Documentación del proyecto
├── GUIA.md                  # Guía de uso y administración del catálogo
├── css/
│   └── style.css            # Estilos generales del sitio
├── js/
│   ├── productos.js         # Base de datos y funciones de productos
│   ├── index.js             # Lógica de la página principal
│   ├── catalogo.js          # Lógica del catálogo y filtros
│   └── ...
├── images/
│   ├── logo.jpeg
│   ├── banners/
│   └── comercializadora/
├── scripts/
├── favicon.ico
├── bd.txt
├── LISTA DE PRODUCTOS DESTACADOS EN prouctosJS.txt
└── ...
```

## Requisitos

Para ver el proyecto solo necesitas:

- Un navegador moderno
- Un servidor local opcional para ejecutar el sitio de forma más fluida

## Cómo ejecutar el proyecto

### Opción 1: abrir directamente

Simplemente abre el archivo `index.html` en tu navegador.

### Opción 2: usar un servidor local

Desde la raíz del proyecto ejecuta:

```bash
python -m http.server 8000
```

Luego abre en el navegador:

```text
http://localhost:8000
```

## Cómo modificar productos

Todos los productos están definidos en `js/productos.js`.

Ejemplo de estructura:

```javascript
{
  id: 1,
  nombre: "Lavadora 11 kg Hisense Semiautomática",
  categoria: "Lavadoras",
  imagen: "/images/comercializadora/lavadoras/hisense-11-kg/1.jpg",
  contado: 3599,
  total: 4299,
  enganche: 300,
  financiado: 3999,
  semanas: 16,
  pago: 250,
  destacado: false
}
```

### Campos principales

- `id`: identificador único del producto
- `nombre`: nombre visible del producto
- `categoria`: categoría del producto
- `imagen`: ruta de la imagen
- `contado`: precio de contado
- `total`: precio total / precio de referencia
- `enganche`: monto de entrada
- `financiado`: precio financiado
- `semanas`: plazo estimado de financiamiento
- `pago`: pago semanal o mensual estimado
- `destacado`: si el producto aparece en la portada

## Categorías

El catálogo puede incluir distintas categorías según el inventario, por ejemplo:

- Lavadoras
- Estufas
- Parrillas
- Cilindros
- Pantallas
- Ventiladores
- Refrigeradores
- Comedores
- Microondas
- Licuadoras
- Tocadores
- Colchones

## Personalización rápida

### Cambiar el nombre de la tienda
Busca el texto `COMERCIALIZADORA DEL HOGAR` en los archivos HTML y cámbialo por el nombre que prefieras.

### Cambiar el logo
Reemplaza el archivo `images/logo.jpeg` con tu nuevo logotipo.

### Cambiar colores generales
Modifica variables o estilos en `css/style.css` para ajustar paleta, botones, fondos y tarjetas.

## Nota importante

Este proyecto es un sitio estático; no incluye backend, autenticación ni base de datos real. Su administración se realiza principalmente modificando archivos JavaScript y recursos multimedia en la carpeta `images/`.

## Recomendaciones

- Mantén rutas de imágenes consistentes
- Revisa que cada producto tenga un `id` único
- Usa categorías exactas y consistentes para evitar duplicados en filtros
- Si agregas nuevos productos, asegúrate de incluir todos los campos necesarios

## Contribución

Si deseas mejorar el proyecto:

1. Haz un fork del repositorio
2. Crea una rama para tu cambio
3. Realiza tus ajustes
4. Envía un pull request con una descripción clara

## Licencia

Copyleft

---

Desarrollado para la comercializadora del hogar con catálogo digital y manejo de promociones.
