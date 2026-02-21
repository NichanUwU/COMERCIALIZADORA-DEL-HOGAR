// Función para construir rutas de imágenes
function img(categoria, carpeta) {
  return `/images/comercializadora/${categoria}/${carpeta}/1.jpg`;
}

// Toggle para activar/desactivar etiquetas de descuento en las tarjetas
// Cambia a `true` cuando quieras volver a mostrarlas.
const DESCUENTOS_ACTIVOS = false;

// Base de datos de productos centralizada
const productos = [
    // ================= LAVADORAS =================
    {
        id: 1,
        nombre: "Lavadora 11 kg Hisense Semiautomática",
        categoria: "Lavadoras",
        imagen: img("lavadoras", "hisense-11-kg"),
        contado: 3599,
        total: 4299,
        enganche: 300,
        financiado: 3999,
        semanas: 16,
        pago: 250,
        destacado: false
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
        destacado: false
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
        destacado: false
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
        destacado: false
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
        destacado: false
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
        destacado: false
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
        destacado: false
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
        destacado: false
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
    },

    // ================= VENTILADORES ============
    {
        id: 35,
        nombre: "VENTILADOR MAN",
        categoria: "Ventiladores", 
        imagen: img("ventiladores", "ventilador-man"),
        contado: 1399,
        total: 1799,
        enganche: 200,
        financiado: 1599,
        semanas: 10,
        pago: 140,
        destacado: true  
    },

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
                ${DESCUENTOS_ACTIVOS && descuento > 0 ? `<span class="discount-badge">-${descuento}%</span>` : ''}
            </div>
            <div class="product-info">
                <h3 class="product-title" data-id="${producto.id}">${producto.nombre}</h3>
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

// --------------------------------------------------
// Modal de información de producto (enganche, pagos)
// Se abre al hacer click sobre la imagen de cualquier producto
// --------------------------------------------------
function abrirInfoProducto(producto) { //cambiar product por porducto para que la funcion del mensajito vuelva a funcionar
    if (!producto) return;

    // Crear overlay
    const overlay = document.createElement('div');
    overlay.className = 'product-info-overlay';
    Object.assign(overlay.style, {
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        background: 'rgba(0,0,0,0.6)', display: 'flex',
        alignItems: 'center', justifyContent: 'center', zIndex: 9999
    });

    // Panel
    const panel = document.createElement('div');
    Object.assign(panel.style, {
        background: '#fff', color: '#111', padding: '18px', borderRadius: '8px',
        maxWidth: '420px', width: '90%', boxSizing: 'border-box', boxShadow: '0 10px 30px rgba(0,0,0,0.25)'
    });

    panel.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
            <h3 style="margin:0;font-size:18px;">${producto.nombre}</h3>
            <button class="product-info-close" aria-label="Cerrar" style="background:transparent;border:none;font-size:22px;line-height:1;cursor:pointer">&times;</button>
        </div>
        <div style="display:flex;gap:12px;align-items:center;margin-bottom:12px;">
            <img src="${producto.imagen}" alt="${producto.nombre}" style="width:250px;height:250px;object-fit:cover;border-radius:6px;border:1px solid #eee">
            <div style="flex:1">
                <p style="margin:0 0 6px 0"><strong>Enganche:</strong> $${producto.enganche.toLocaleString()}</p>
                <p style="margin:0 0 6px 0"><strong>Pago semanal:</strong> $${producto.pago.toLocaleString()}</p>
                <p style="margin:0"><strong>Plazo:</strong> ${producto.semanas} semanas</p>
            </div>
        </div>
        <div style="display:flex;justify-content:flex-end;margin-top:8px;">
            <button class="product-info-ok" style="background:#0077cc;color:#fff;border:none;padding:8px 12px;border-radius:6px;cursor:pointer">Aceptar</button>
        </div>
    `;

    overlay.appendChild(panel);
    document.body.appendChild(overlay);

    const cerrar = () => {
        if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
        document.removeEventListener('keydown', onKey);
    };

    panel.querySelector('.product-info-close').addEventListener('click', cerrar);
    panel.querySelector('.product-info-ok').addEventListener('click', cerrar);
    overlay.addEventListener('click', function(e) { if (e.target === overlay) cerrar(); });

    function onKey(e) { if (e.key === 'Escape') cerrar(); }
    document.addEventListener('keydown', onKey);
}

// Delegación: abrir modal al hacer click sobre la imagen del producto
document.addEventListener('click', function(e) {
    const img = e.target.closest && e.target.closest('.product-img');
    if (!img) return;

    const card = img.closest('.product-card');
    const id = card?.querySelector('.product-title')?.dataset?.id;
    let productoObj = null;

    if (id) {
        productoObj = productos.find(p => String(p.id) === String(id));
    }

    if (!productoObj) {
        // fallback por coincidencia de path de imagen
        productoObj = productos.find(p => {
            try { return img.src && img.src.indexOf(p.imagen) !== -1; } catch { return false; }
        });
    }

    if (productoObj) {
        abrirInfoProducto(productoObj);
    }
});
