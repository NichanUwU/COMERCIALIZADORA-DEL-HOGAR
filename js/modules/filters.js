/**
 * MÓDULO: BÚSQUEDA Y FILTROS
 * Gestiona búsqueda avanzada y filtros de productos
 */

class FiltrosYBusqueda {
  constructor() {
    this.filtrosActuales = {
      categoria: 'Todos',
      busqueda: '',
      precioMin: 0,
      precioMax: Infinity,
      orden: 'nombre-asc'
    };

    this.init();
  }

  init() {
    this.crearBarraBusqueda();
    this.crearFiltrosAdicionales();
    this.attachEventListeners();
  }

  crearBarraBusqueda() {
    // Buscar o crear contenedor de búsqueda
    let barraBusqueda = document.querySelector('.search-bar');
    
    if (!barraBusqueda) {
      barraBusqueda = document.createElement('div');
      barraBusqueda.className = 'search-bar';
      barraBusqueda.innerHTML = `
        <div class="container">
          <div class="search-input-wrapper">
            <input 
              type="text" 
              id="search-input" 
              class="search-input"
              placeholder="Buscar productos..."
              aria-label="Buscar productos"
            >
            <button class="search-btn" aria-label="Buscar">
              <svg class="icon icon-search" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="2" />
                <line x1="16.5" y1="16.5" x2="21" y2="21" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
              </svg>
            </button>
          </div>
        </div>
      `;

      // Insertar después del slider si existe, o después del header
      const slider = document.querySelector('.banner-slider');
      if (slider) {
        slider.parentNode.insertBefore(barraBusqueda, slider.nextSibling);
      } else {
        const header = document.querySelector('header');
        if (header) header.parentNode.insertBefore(barraBusqueda, header.nextSibling);
      }
    }

    this.searchInput = document.getElementById('search-input');
    this.searchBtn = document.querySelector('.search-btn');
  }

  crearFiltrosAdicionales() {
    // Crear contenedor de filtros avanzados si no existe
    let filtrosAvanzados = document.querySelector('.advanced-filters');
    
    if (!filtrosAvanzados) {
      filtrosAvanzados = document.createElement('div');
      filtrosAvanzados.className = 'advanced-filters';
      filtrosAvanzados.innerHTML = `
        <div class="container">
          <div class="filter-controls">
            <div class="filter-group">
              <label for="price-range-min">Precio mínimo:</label>
              <input 
                type="number" 
                id="price-range-min" 
                class="price-input" 
                value="0"
                min="0"
                placeholder="Mín"
              >
            </div>
            <div class="filter-group">
              <label for="price-range-max">Precio máximo:</label>
              <input 
                type="number" 
                id="price-range-max" 
                class="price-input" 
                value="999999"
                min="0"
                placeholder="Máx"
              >
            </div>
            <div class="filter-group">
              <label for="sort-select">Ordenar por:</label>
              <select id="sort-select" class="sort-select">
                <option value="nombre-asc">Nombre (A-Z)</option>
                <option value="nombre-desc">Nombre (Z-A)</option>
                <option value="precio-asc">Precio (menor a mayor)</option>
                <option value="precio-desc">Precio (mayor a menor)</option>
                <option value="nuevo">Más recientes</option>
              </select>
            </div>
            <button class="filter-reset-btn" aria-label="Limpiar filtros">
              <svg class="icon icon-redo" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12a7 7 0 0 1 7-7h5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                <polyline points="19 5 15 9 19 13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg> Limpiar filtros
            </button>
          </div>
        </div>
      `;

      const mainContent = document.querySelector('main');
      if (mainContent) {
        mainContent.parentNode.insertBefore(filtrosAvanzados, mainContent);
      }
    }

    this.priceMin = document.getElementById('price-range-min');
    this.priceMax = document.getElementById('price-range-max');
    this.sortSelect = document.getElementById('sort-select');
    this.resetBtn = document.querySelector('.filter-reset-btn');
  }

  attachEventListeners() {
    if (this.searchInput) {
      this.searchInput.addEventListener('input', debounce(() => this.aplicarFiltros(), 300));
    }

    if (this.searchBtn) {
      this.searchBtn.addEventListener('click', () => this.aplicarFiltros());
    }

    if (this.priceMin && this.priceMax) {
      this.priceMin.addEventListener('change', () => this.aplicarFiltros());
      this.priceMax.addEventListener('change', () => this.aplicarFiltros());
    }

    if (this.sortSelect) {
      this.sortSelect.addEventListener('change', () => this.aplicarFiltros());
    }

    if (this.resetBtn) {
      this.resetBtn.addEventListener('click', () => this.limpiarFiltros());
    }

    // Escuchar cambios de categoría
    window.addEventListener('categoria-cambiada', (e) => {
      this.filtrosActuales.categoria = e.detail.categoria;
      this.aplicarFiltros();
    });
  }

  aplicarFiltros() {
    this.filtrosActuales.busqueda = this.searchInput?.value || '';
    this.filtrosActuales.precioMin = parseInt(this.priceMin?.value || 0);
    this.filtrosActuales.precioMax = parseInt(this.priceMax?.value || 999999);
    this.filtrosActuales.orden = this.sortSelect?.value || 'nombre-asc';

    const productosFiletrados = filtrarProductosAvanzado(this.filtrosActuales);
    const productosOrdenados = ordenarProductos(productosFiletrados, this.filtrosActuales.orden);

    // Disparar evento con resultados
    const evento = new CustomEvent('filtros-aplicados', {
      detail: { 
        productos: productosOrdenados,
        filtros: this.filtrosActuales,
        cantidad: productosOrdenados.length
      }
    });
    window.dispatchEvent(evento);
  }

  limpiarFiltros() {
    if (this.searchInput) this.searchInput.value = '';
    if (this.priceMin) this.priceMin.value = 0;
    if (this.priceMax) this.priceMax.value = 999999;
    if (this.sortSelect) this.sortSelect.value = 'nombre-asc';

    this.filtrosActuales = {
      categoria: 'Todos',
      busqueda: '',
      precioMin: 0,
      precioMax: 999999,
      orden: 'nombre-asc'
    };

    this.aplicarFiltros();
    mostrarNotificacion('Filtros limpios', 'info');
  }

  obtenerFiltros() {
    return this.filtrosActuales;
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  const filtros = new FiltrosYBusqueda();
});
