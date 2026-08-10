/**
 * MÓDULO: CARRITO
 * Gestiona el carrito de compras y integración con WhatsApp
 */

class GestorCarrito {
  constructor() {
    this.carritoGlobal = carrito; // Usar instancia global
    this.init();
  }

  init() {
    this.crearIconoCarrito();
    this.crearModalCarrito();
    this.attachEventListeners();
    this.escucharCambiosCarrito();
  }

  crearIconoCarrito() {
    let iconoCarrito = document.querySelector('.cart-icon-container');
    
    if (!iconoCarrito) {
      iconoCarrito = document.createElement('div');
      iconoCarrito.className = 'cart-icon-container';
      iconoCarrito.innerHTML = `
        <button class="cart-btn" aria-label="Abrir carrito">
          <i class="fas fa-shopping-cart"></i>
          <span class="cart-count" data-count="0">0</span>
        </button>
      `;

      const headerNav = document.querySelector('nav');
      if (headerNav) {
        headerNav.parentNode.insertBefore(iconoCarrito, headerNav.nextSibling);
      }
    }

    this.cartBtn = document.querySelector('.cart-btn');
    this.cartCount = document.querySelector('.cart-count');

    if (this.cartBtn) {
      this.cartBtn.addEventListener('click', () => this.abrirCarrito());
    }
  }

  crearModalCarrito() {
    let modal = document.querySelector('.cart-modal');
    
    if (!modal) {
      modal = document.createElement('div');
      modal.className = 'cart-modal';
      modal.setAttribute('aria-hidden', 'true');
      modal.innerHTML = `
        <div class="cart-backdrop"></div>
        <div class="cart-panel">
          <div class="cart-header">
            <h2>Mi Carrito</h2>
            <button class="cart-close" aria-label="Cerrar carrito">
              <i class="fas fa-times"></i>
            </button>
          </div>
          
          <div class="cart-items" id="cart-items-container">
            <p class="cart-empty" style="text-align: center; padding: 40px 20px; color: #999;">
              <i class="fas fa-shopping-cart" style="font-size: 48px; margin-bottom: 10px; display: block;"></i>
              Tu carrito está vacío
            </p>
          </div>

          <div class="cart-footer">
            <div class="cart-summary">
              <div class="summary-row">
                <span>Subtotal:</span>
                <span id="cart-subtotal">$0</span>
              </div>
              <div class="summary-row">
                <strong>Total:</strong>
                <strong id="cart-total">$0</strong>
              </div>
            </div>
            <button class="cart-checkout-btn" id="cart-whatsapp-btn" style="display: none;">
              <i class="fab fa-whatsapp"></i> Consultar por WhatsApp
            </button>
            <button class="cart-clear-btn" id="cart-clear-btn" style="display: none;">
              <i class="fas fa-trash"></i> Vaciar carrito
            </button>
          </div>
        </div>
      `;

      document.body.appendChild(modal);
    }

    this.cartModal = modal;
    this.cartItemsContainer = document.getElementById('cart-items-container');
    this.cartSubtotal = document.getElementById('cart-subtotal');
    this.cartTotal = document.getElementById('cart-total');
    this.cartWhatsAppBtn = document.getElementById('cart-whatsapp-btn');
    this.cartClearBtn = document.getElementById('cart-clear-btn');

    const closeBtn = modal.querySelector('.cart-close');
    const backdrop = modal.querySelector('.cart-backdrop');

    if (closeBtn) closeBtn.addEventListener('click', () => this.cerrarCarrito());
    if (backdrop) backdrop.addEventListener('click', () => this.cerrarCarrito());

    if (this.cartWhatsAppBtn) {
      this.cartWhatsAppBtn.addEventListener('click', () => this.irAlWhatsApp());
    }

    if (this.cartClearBtn) {
      this.cartClearBtn.addEventListener('click', () => this.vaciarCarrito());
    }
  }

  attachEventListeners() {
    // Escuchar clicks en botones "Agregar al carrito"
    document.addEventListener('click', (e) => {
      if (e.target.closest('.btn-add-cart')) {
        const productId = e.target.closest('.btn-add-cart').dataset.productId;
        const producto = productos.find(p => p.id == productId);
        
        if (producto) {
          this.agregarAlCarrito(producto);
        }
      }
    });
  }

  agregarAlCarrito(producto) {
    this.carritoGlobal.agregar(producto);
    mostrarNotificacion(`${producto.nombre} agregado al carrito`, 'exito');
  }

  escucharCambiosCarrito() {
    window.addEventListener('carrito-actualizado', () => {
      this.actualizarVistaCarrito();
    });
    
    // Actualizar al cargar la página
    this.actualizarVistaCarrito();
  }

  actualizarVistaCarrito() {
    const items = this.carritoGlobal.obtener();
    const cantidad = this.carritoGlobal.contar();
    const total = this.carritoGlobal.obtenerTotal();

    // Actualizar contador
    if (this.cartCount) {
      this.cartCount.textContent = cantidad;
      this.cartCount.dataset.count = cantidad;
    }

    // Actualizar contenedor de items
    if (this.cartItemsContainer) {
      if (items.length === 0) {
        this.cartItemsContainer.innerHTML = `
          <p class="cart-empty" style="text-align: center; padding: 40px 20px; color: #999;">
            <i class="fas fa-shopping-cart" style="font-size: 48px; margin-bottom: 10px; display: block;"></i>
            Tu carrito está vacío
          </p>
        `;
        this.cartWhatsAppBtn.style.display = 'none';
        this.cartClearBtn.style.display = 'none';
      } else {
        this.cartItemsContainer.innerHTML = items.map((item, index) => `
          <div class="cart-item">
            <div class="cart-item-img">
              <img src="${item.imagen}" alt="${item.nombre}" loading="lazy">
            </div>
            <div class="cart-item-info">
              <h4>${item.nombre}</h4>
              <p class="cart-item-price">$${item.contado.toLocaleString()}</p>
            </div>
            <div class="cart-item-qty">
              <button class="qty-btn qty-minus" data-id="${item.id}" aria-label="Reducir cantidad">-</button>
              <input type="number" class="qty-input" value="${item.cantidad}" data-id="${item.id}" min="1">
              <button class="qty-btn qty-plus" data-id="${item.id}" aria-label="Aumentar cantidad">+</button>
            </div>
            <div class="cart-item-total">
              $${(item.contado * item.cantidad).toLocaleString()}
            </div>
            <button class="cart-item-remove" data-id="${item.id}" aria-label="Eliminar producto">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        `).join('');

        // Agregar event listeners a los botones de cantidad
        this.cartItemsContainer.querySelectorAll('.qty-minus').forEach(btn => {
          btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.dataset.id);
            const item = this.carritoGlobal.obtener().find(i => i.id === id);
            if (item) this.carritoGlobal.actualizar(id, item.cantidad - 1);
          });
        });

        this.cartItemsContainer.querySelectorAll('.qty-plus').forEach(btn => {
          btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.dataset.id);
            const item = this.carritoGlobal.obtener().find(i => i.id === id);
            if (item) this.carritoGlobal.actualizar(id, item.cantidad + 1);
          });
        });

        this.cartItemsContainer.querySelectorAll('.qty-input').forEach(input => {
          input.addEventListener('change', (e) => {
            const id = parseInt(e.target.dataset.id);
            const cantidad = parseInt(e.target.value) || 1;
            this.carritoGlobal.actualizar(id, cantidad);
          });
        });

        this.cartItemsContainer.querySelectorAll('.cart-item-remove').forEach(btn => {
          btn.addEventListener('click', (e) => {
            const id = parseInt(e.currentTarget.dataset.id);
            this.carritoGlobal.eliminar(id);
            mostrarNotificacion('Producto eliminado del carrito', 'info');
          });
        });

        this.cartWhatsAppBtn.style.display = 'block';
        this.cartClearBtn.style.display = 'block';
      }
    }

    // Actualizar totales
    if (this.cartSubtotal) {
      this.cartSubtotal.textContent = `$${total.toLocaleString()}`;
    }
    if (this.cartTotal) {
      this.cartTotal.textContent = `$${total.toLocaleString()}`;
    }
  }

  abrirCarrito() {
    if (this.cartModal) {
      this.cartModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  cerrarCarrito() {
    if (this.cartModal) {
      this.cartModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = 'auto';
    }
  }

  irAlWhatsApp() {
    const urlWhatsApp = this.carritoGlobal.generarMensajeWhatsApp();
    window.open(urlWhatsApp, '_blank');
  }

  vaciarCarrito() {
    if (confirm('¿Estás seguro de que deseas vaciar el carrito?')) {
      this.carritoGlobal.vaciar();
      mostrarNotificacion('Carrito vaciado', 'info');
    }
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  const gestorCarrito = new GestorCarrito();
});
