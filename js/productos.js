// Función para construir rutas de imágenes
function img(categoria, carpeta) {
  return `/images/comercializadora/${categoria}/${carpeta}/1.jpg`;
}

// Base de datos de productos centralizada
const productos = [
    // ================= LAVADORAS =================
    {
        id: 1,
        nombre: "Lavadora 11 kg Hisense Semiautomática",
        categoria: "Lavadoras",
        imagen: img("lavadoras", "hisense-11-kg"),
        contado: 3399,
        total: 4299,
        enganche: 300,
        financiado: 3999,
        semanas: 16,
        pago: 250,
        destacado: true
    },
    {
        id: 2,
        nombre: "Lavadora 13 kg Mirage Semiautomática",
        categoria: "Lavadoras",
        imagen: img("lavadoras", "mirage-13-kg"),
        contado: 4299,
        total: 4999,
        enganche: 300,
        financiado: 4699,
        semanas: 18,
        pago: 261,
        destacado: false
    },
    {
        id: 3,
        nombre: "Lavadora 16 kg Mirage Semiautomática",
        categoria: "Lavadoras",
        imagen: img("lavadoras", "mirage-16-kg"),
        contado: 5199,
        total: 5799,
        enganche: 500,
        financiado: 5299,
        semanas: 18,
        pago: 294,
        destacado: false
    },
    {
        id: 4,
        nombre: "Lavadora 22 kg Mirage Semiautomática",
        categoria: "Lavadoras",
        imagen: img("lavadoras", "mirage-22-kg"),
        contado: 6499,
        total: 7299,
        enganche: 700,
        financiado: 6599,
        semanas: 18,
        pago: 367,
        destacado: true
    },
    {
        id: 5,
        nombre: "Lavadora 19 kg LG Automática",
        categoria: "Lavadoras",
        imagen: img("lavadoras", "lg-19-kg"),
        contado: 10499,
        total: 12499,
        enganche: 1000,
        financiado: 11499,
        semanas: 30,
        pago: 383,
        destacado: false
    },
    {
        id: 6,
        nombre: "Lavadora 20 kg Koblenz Automática",
        categoria: "Lavadoras",
        imagen: img("lavadoras", "koblenz-20-kg"),
        contado: 10799,
        total: 12799,
        enganche: 1000,
        financiado: 11799,
        semanas: 30,
        pago: 393,
        destacado: false
    },

    // ================= ESTUFAS =================
    {
        id: 7,
        nombre: "Estufa Acros 30\" Manual",
        categoria: "Estufas",
        imagen: img("estufas", "estufa-acros-30-manual"),
        contado: 5999,
        total: 6999,
        enganche: 600,
        financiado: 6399,
        semanas: 22,
        pago: 291,
        destacado: true
    },
    {
        id: 8,
        nombre: "Estufa Acros 30\" Electrónico",
        categoria: "Estufas",
        imagen: img("estufas", "estufa-acros-30-electronico"),
        contado: 7599,
        total: 8499,
        enganche: 600,
        financiado: 7899,
        semanas: 22,
        pago: 359,
        destacado: false
    },
    {
        id: 9,
        nombre: "Estufa Mabe 20\" Gris",
        categoria: "Estufas",
        imagen: img("estufas", "estufa-mabe-20-gris"),
        contado: 5699,
        total: 6199,
        enganche: 500,
        financiado: 5699,
        semanas: 20,
        pago: 285,
        destacado: false
    },
    {
        id: 10,
        nombre: "Estufa Midea 20\" Negra/Gris",
        categoria: "Estufas",
        imagen: img("estufas", "estufa-midea-20-negra-gris"),
        contado: 5399,
        total: 6099,
        enganche: 450,
        financiado: 5649,
        semanas: 20,
        pago: 282,
        destacado: false
    },
    {
        id: 11,
        nombre: "Estufa Garell 20\" con Gabinete",
        categoria: "Estufas",
        imagen: img("estufas", "estufa-de-gabinete-garell-20"),
        contado: 3300,
        total: 3999,
        enganche: 400,
        financiado: 3599,
        semanas: 18,
        pago: 200,
        destacado: true
    },

    // ================= PARRILLAS =================
    {
        id: 12,
        nombre: "Parrilla de Mesa 4Q",
        categoria: "Parrillas",
        imagen: img("parrillas", "parrilla-de-mesa"),
        contado: 849,
        total: 1099,
        enganche: 200,
        financiado: 899,
        semanas: 9,
        pago: 100,
        destacado: true
    },
    {
        id: 13,
        nombre: "Parrilla Empotrable 4Q Cristal",
        categoria: "Parrillas",
        imagen: img("parrillas", "parrilla-empotrable-cristal-templado-4-quemadores"),
        contado: 2899,
        total: 3349,
        enganche: 300,
        financiado: 3049,
        semanas: 16,
        pago: 191,
        destacado: false
    },
    {
        id: 14,
        nombre: "Parrilla Empotrable 4Q Acero",
        categoria: "Parrillas",
        imagen: img("parrillas", "parrilla-empotrable-acero-inoxidable-4-quemadores"),
        contado: 2599,
        total: 2999,
        enganche: 275,
        financiado: 2724,
        semanas: 16,
        pago: 170,
        destacado: false
    },
    {
        id: 15,
        nombre: "Parrilla Empotrable 5Q Cristal",
        categoria: "Parrillas",
        imagen: img("parrillas", "parrilla-5-quemadores-cristal-templado"),
        contado: 3399,
        total: 3699,
        enganche: 400,
        financiado: 3299,
        semanas: 16,
        pago: 206,
        destacado: false
    },
    {
        id: 16,
        nombre: "Parrilla Empotrable 5Q Acero",
        categoria: "Parrillas",
        imagen: img("parrillas", "parrilla-5-quemadores-acero-inoxidable"),
        contado: 3099,
        total: 3499,
        enganche: 400,
        financiado: 3099,
        semanas: 16,
        pago: 194,
        destacado: false
    },

    // ================= CILINDROS =================
    {
        id: 17,
        nombre: "Cilindro de Gas 9 kg",
        categoria: "Cilindros",
        imagen: img("cilindros", "cilindro-de-gas-9-kg"),
        contado: 1650,
        total: 1999,
        enganche: 200,
        financiado: 1799,
        semanas: 12,
        pago: 150,
        destacado: true
    },
    {
        id: 18,
        nombre: "Cilindro de Gas 20 kg",
        categoria: "Cilindros",
        imagen: img("cilindros", "cilindro-de-gas-20-kg"),
        contado: 2399,
        total: 2949,
        enganche: 300,
        financiado: 2649,
        semanas: 14,
        pago: 189,
        destacado: false
    },

    // ================= PANTALLAS =================
    {
        id: 19,
        nombre: "LG 55\"",
        categoria: "Pantallas",
        imagen: img("pantalla", "lg-55-pulgadas"),
        contado: 9699,
        total: 10899,
        enganche: 800,
        financiado: 10099,
        semanas: 24,
        pago: 421,
        destacado: false
    },
    {
        id: 20,
        nombre: "LG 50\"",
        categoria: "Pantallas",
        imagen: img("pantalla", "lg-50-pulgadas"),
        contado: 9399,
        total: 10299,
        enganche: 750,
        financiado: 9549,
        semanas: 24,
        pago: 398,
        destacado: false
    },
    {
        id: 21,
        nombre: "Hisense 65\"",
        categoria: "Pantallas",
        imagen: img("pantalla", "hisense-65-pulgadas"),
        contado: 11199,
        total: 12299,
        enganche: 800,
        financiado: 11499,
        semanas: 24,
        pago: 479,
        destacado: true
    },
    {
        id: 22,
        nombre: "Hisense 55\"",
        categoria: "Pantallas",
        imagen: img("pantalla", "hisense-55-pulgadas"),
        contado: 8599,
        total: 9499,
        enganche: 650,
        financiado: 8849,
        semanas: 24,
        pago: 369,
        destacado: false
    },
    {
        id: 23,
        nombre: "Hisense 50\"",
        categoria: "Pantallas",
        imagen: img("pantalla", "hisense-50-pulgadas"),
        contado: 7899,
        total: 8899,
        enganche: 650,
        financiado: 8249,
        semanas: 24,
        pago: 344,
        destacado: false
    },
    {
        id: 24,
        nombre: "Hisense 43\"",
        categoria: "Pantallas",
        imagen: img("pantalla", "hisense-43-pulgadas"),
        contado: 6899,
        total: 7599,
        enganche: 650,
        financiado: 6949,
        semanas: 24,
        pago: 290,
        destacado: false
    },
    {
        id: 25,
        nombre: "TCL 50\"",
        categoria: "Pantallas",
        imagen: img("pantalla", "tcl-50-pulgadas"),
        contado: 7599,
        total: 8199,
        enganche: 650,
        financiado: 7549,
        semanas: 24,
        pago: 315,
        destacado: false
    },
    {
        id: 26,
        nombre: "TCL 43\"",
        categoria: "Pantallas",
        imagen: img("pantalla", "tcl-43-pulgadas"),
        contado: 6299,
        total: 7099,
        enganche: 500,
        financiado: 6599,
        semanas: 24,
        pago: 275,
        destacado: false
    },
    {
        id: 27,
        nombre: "TCL 40\"",
        categoria: "Pantallas",
        imagen: img("pantalla", "tcl-40-pulgadas"),
        contado: 4999,
        total: 5799,
        enganche: 400,
        financiado: 5399,
        semanas: 24,
        pago: 225,
        destacado: false
    },
    {
        id: 28,
        nombre: "TCL 32\"",
        categoria: "Pantallas",
        imagen: img("pantalla", "tcl-32-pulgadas"),
        contado: 4499,
        total: 4699,
        enganche: 350,
        financiado: 4349,
        semanas: 22,
        pago: 198,
        destacado: false
    },
    {
        id: 29,
        nombre: "ONN 65\"",
        categoria: "Pantallas",
        imagen: img("pantalla", "onn-65-pulgadas"),
        contado: 9999,
        total: 10799,
        enganche: 800,
        financiado: 9999,
        semanas: 24,
        pago: 417,
        destacado: true
    },
    {
        id: 30,
        nombre: "ONN 50\"",
        categoria: "Pantallas",
        imagen: img("pantalla", "onn-50-pulgadas"),
        contado: 7199,
        total: 7999,
        enganche: 800,
        financiado: 7199,
        semanas: 24,
        pago: 300,
        destacado: false
    },
    {
        id: 31,
        nombre: "AIWA 43\"",
        categoria: "Pantallas",
        imagen: img("pantalla", "aiwa-43-pulgadas"),
        contado: 5399,
        total: 6199,
        enganche: 400,
        financiado: 5799,
        semanas: 24,
        pago: 242,
        destacado: false
    },
    {
        id: 32,
        nombre: "AIWA 40\"",
        categoria: "Pantallas",
        imagen: img("pantalla", "aiwa-40-pulgadas"),
        contado: 3699,
        total: 5199,
        enganche: 400,
        financiado: 4799,
        semanas: 24,
        pago: 200,
        destacado: false
    },
    {
        id: 33,
        nombre: "AIWA 32\"",
        categoria: "Pantallas",
        imagen: img("pantalla", "aiwa-32-pulgadas"),
        contado: 3899,
        total: 4399,
        enganche: 350,
        financiado: 4049,
        semanas: 22,
        pago: 184,
        destacado: false
    },
    {
        id: 34,
        nombre: "GHIA 32\"",
        categoria: "Pantallas",
        imagen: img("pantalla", "ghia-32-pulgadas"),
        contado: 3299,
        total: 3949,
        enganche: 250,
        financiado: 3699,
        semanas: 18,
        pago: 206,
        destacado: false
    }
];

// Función para obtener productos destacados
function obtenerProductosDestacados() {
    return productos.filter(p => p.destacado);
}

// Función para obtener productos por categoría
function obtenerProductosPorCategoria(categoria) {
    if (categoria === 'Todos') {
        return productos;
    }
    return productos.filter(p => p.categoria === categoria);
}

// Función para obtener todas las categorías
function obtenerCategorias() {
    const categorias = [...new Set(productos.map(p => p.categoria))];
    return ['Todos', ...categorias];
}

// Función para crear una tarjeta de producto HTML
function crearTarjetaProducto(producto) {
    const descuento = Math.round(((producto.total - producto.contado) / producto.total) * 100);
    
    return `
        <div class="product-card">
            <div class="product-image-container">
                <img src="${producto.imagen}" alt="${producto.nombre}" class="product-img">
                ${descuento > 0 ? `<span class="discount-badge">-${descuento}%</span>` : ''}
            </div>
            <div class="product-info">
                <h3 class="product-title">${producto.nombre}</h3>
                <p class="product-category">${producto.categoria}</p>
                <div class="product-price">
                    <span class="current-price">$${producto.contado.toLocaleString()}</span>
                    ${producto.total > producto.contado ? `<span class="old-price">$${producto.total.toLocaleString()}</span>` : ''}
                </div>
                <div class="product-financing">
                    <small>O ${producto.semanas} semanas de $${producto.pago}</small>
                </div>
            </div>
        </div>
    `;
}
