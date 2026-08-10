/**
 * UTILIDADES Y FUNCIONES COMUNES
 * Centralizadas para evitar duplicación de código
 */

// ==================== GESTIÓN DE PRODUCTOS ====================

/**
 * Obtiene todas las categorías únicas de los productos
 */
function obtenerCategorias() {
  const categoriasSet = new Set(productos.map(p => p.categoria));
  return ['Todos', ...Array.from(categoriasSet).sort()];
}

/**
 * Obtiene productos destacados
 */
function obtenerProductosDestacados() {
  return productos.filter(p => p.destacado);
}

/**
 * Obtiene productos por categoría
 */
function obtenerProductosPorCategoria(categoria) {
  if (categoria === 'Todos') return productos;
  return productos.filter(p => p.categoria === categoria);
}

/**
 * Busca productos por nombre o descripción
 */
function buscarProductos(query) {
  if (!query.trim()) return [];
  const searchTerm = query.toLowerCase();
  return productos.filter(p =>
    p.nombre.toLowerCase().includes(searchTerm)
  );
}

/**
 * Filtra productos por múltiples criterios
 */
function filtrarProductosAvanzado(filtros) {
  return productos.filter(p => {
    // Filtro por categoría
    if (filtros.categoria && filtros.categoria !== 'Todos' && p.categoria !== filtros.categoria) {
      return false;
    }

    // Filtro por rango de precio
    if (filtros.precioMin !== undefined && p.contado < filtros.precioMin) {
      return false;
    }
    if (filtros.precioMax !== undefined && p.contado > filtros.precioMax) {
      return false;
    }

    // Filtro por búsqueda de texto
    if (filtros.busqueda) {
      const searchTerm = filtros.busqueda.toLowerCase();
      if (!p.nombre.toLowerCase().includes(searchTerm)) {
        return false;
      }
    }

    return true;
  });
}

/**
 * Ordena productos por diferentes criterios
 */
function ordenarProductos(productosList, ordenPor = 'nombre') {
  const copia = [...productosList];
  
  switch(ordenPor) {
    case 'precio-asc':
      return copia.sort((a, b) => a.contado - b.contado);
    case 'precio-desc':
      return copia.sort((a, b) => b.contado - a.contado);
    case 'nombre-asc':
      return copia.sort((a, b) => a.nombre.localeCompare(b.nombre));
    case 'nombre-desc':
      return copia.sort((a, b) => b.nombre.localeCompare(a.nombre));
    case 'nuevo':
      return copia.sort((a, b) => b.id - a.id);
    default:
      return copia;
  }
}

// ==================== GESTIÓN DEL CARRITO ====================

class Carrito {
  constructor() {
    this.items = this.cargarDelLocalStorage();
  }

  agregar(producto) {
    const existe = this.items.find(item => item.id === producto.id);
    
    if (existe) {
      existe.cantidad += 1;
    } else {
      this.items.push({
        ...producto,
        cantidad: 1
      });
    }
    
    this.guardarEnLocalStorage();
    this.dispatchEvent('carrito-actualizado');
  }

  eliminar(productoId) {
    this.items = this.items.filter(item => item.id !== productoId);
    this.guardarEnLocalStorage();
    this.dispatchEvent('carrito-actualizado');
  }

  actualizar(productoId, cantidad) {
    const item = this.items.find(item => item.id === productoId);
    if (item) {
      item.cantidad = cantidad;
      if (item.cantidad <= 0) {
        this.eliminar(productoId);
      } else {
        this.guardarEnLocalStorage();
        this.dispatchEvent('carrito-actualizado');
      }
    }
  }

  obtener() {
    return this.items;
  }

  contar() {
    return this.items.reduce((total, item) => total + item.cantidad, 0);
  }

  obtenerTotal() {
    return this.items.reduce((total, item) => total + (item.contado * item.cantidad), 0);
  }

  vaciar() {
    this.items = [];
    this.guardarEnLocalStorage();
    this.dispatchEvent('carrito-actualizado');
  }

  guardarEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(this.items));
  }

  cargarDelLocalStorage() {
    const datos = localStorage.getItem('carrito');
    return datos ? JSON.parse(datos) : [];
  }

  dispatchEvent(nombreEvento) {
    const evento = new CustomEvent(nombreEvento, {
      detail: { carrito: this }
    });
    window.dispatchEvent(evento);
  }

  generarMensajeWhatsApp() {
    const numeroWhatsApp = '529651000641';
    let mensaje = '¡Hola! Me interesan los siguientes productos:\n\n';
    
    this.items.forEach((item, index) => {
      mensaje += `${index + 1}. ${item.nombre}\n`;
      mensaje += `   Cantidad: ${item.cantidad}\n`;
      mensaje += `   Precio: $${item.contado.toLocaleString()}\n\n`;
    });
    
    mensaje += `Total: $${this.obtenerTotal().toLocaleString()}\n`;
    mensaje += '\n¿Están disponibles? ¿Cuál sería el envío?';
    
    const mensajeEncoded = encodeURIComponent(mensaje);
    return `https://api.whatsapp.com/send/?phone=${numeroWhatsApp}&text=${mensajeEncoded}&type=phone_number&app_absent=0`;
  }
}

// ==================== UTILIDADES DE DOM ====================

/**
 * Crea una tarjeta de producto HTML
 */
function crearTarjetaProducto(producto) {
  const descuento = producto.total > producto.contado 
    ? Math.round(((producto.total - producto.contado) / producto.total) * 100)
    : 0;

  const etiquetaDescuento = descuento > 0 && DESCUENTOS_ACTIVOS
    ? `<span class="discount-badge">${descuento}%</span>`
    : '';

  return `
    <div class="product-card" data-product-id="${producto.id}">
      ${etiquetaDescuento}
      <div class="product-img-wrapper">
        <img 
          class="product-img" 
          src="${producto.imagen}" 
          alt="${producto.nombre}"
          loading="lazy"
          data-src="${producto.imagen}"
        >
      </div>
      <div class="product-info">
        <h3 class="product-title" data-id="${producto.id}">${producto.nombre}</h3>
        <div class="product-price">
          <span class="current-price">$${producto.contado.toLocaleString()}</span>
          ${producto.total > producto.contado ? `<span class="old-price">$${producto.total.toLocaleString()}</span>` : ''}
        </div>
        <div class="product-financing" style="font-size: 12px; color: #666; margin-bottom: 10px;">
          <small>${producto.semanas} sem × $${producto.pago.toLocaleString()}</small>
        </div>
        <button class="product-btn btn-add-cart" data-product-id="${producto.id}" aria-label="Agregar ${producto.nombre} al carrito">
          <svg class="icon icon-cart" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 6h15l-2 9H8L6 6z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
            <circle cx="9" cy="20" r="1.5" fill="currentColor" />
            <circle cx="18" cy="20" r="1.5" fill="currentColor" />
            <path d="M6 6l1-3h3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg> Consultar
        </button>
      </div>
    </div>
  `;
}

/**
 * Agrega efectos hover a las tarjetas
 */
function agregarEfectosHover() {
  const productCards = document.querySelectorAll('.product-card');
  
  productCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px)';
      this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
    });

    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.08)';
    });
  });
}

/**
 * Implementa Lazy Loading para imágenes
 */
function implementarLazyLoading() {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

/**
 * Muestra un mensaje de notificación
 */
function mostrarNotificacion(mensaje, tipo = 'info') {
  const notificacion = document.createElement('div');
  notificacion.className = `notificacion notificacion-${tipo}`;
  notificacion.setAttribute('role', 'alert');
  notificacion.textContent = mensaje;
  notificacion.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: ${tipo === 'exito' ? '#4CAF50' : tipo === 'error' ? '#f44336' : '#2196F3'};
    color: white;
    padding: 16px 24px;
    border-radius: 4px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    z-index: 3000;
    animation: slideIn 0.3s ease;
  `;

  document.body.appendChild(notificacion);

  setTimeout(() => {
    notificacion.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notificacion.remove(), 300);
  }, 3000);
}

/**
 * Valida si un email es válido
 */
function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Formatea un número como moneda
 */
function formatoMoneda(numero, moneda = 'USD') {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: moneda
  }).format(numero);
}

/**
 * Debounce para optimizar búsquedas
 */
function debounce(func, espera) {
  let timeout;
  return function ejecutar(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), espera);
  };
}

/**
 * Throttle para optimizar eventos frecuentes
 */
function throttle(func, limite) {
  let enEspera;
  return function(...args) {
    if (!enEspera) {
      func.apply(this, args);
      enEspera = true;
      setTimeout(() => enEspera = false, limite);
    }
  };
}

// Agregar animación keyframes al documento
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Crear instancia global del carrito
const carrito = new Carrito();
