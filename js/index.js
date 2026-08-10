/**
 * Script principal para la página de inicio (index.html)
 */

document.addEventListener('DOMContentLoaded', function() {
  // Cargar productos destacados
  cargarProductosDestacados();
  
  // Inicializar filtros de categorías
  inicializarFiltrosCategor();
  
  // Actualizar productos según categoría seleccionada
  actualizarProductos();
  
  // Escuchar cambios de filtros
  escucharCambiosFiltros();
});

let categoriaActual = 'Todos';

/**
 * Carga y muestra los productos destacados
 */
function cargarProductosDestacados() {
  const productosDestacados = obtenerProductosDestacados();
  const featuredGrid = document.getElementById('featured-products-grid');
  
  if (!featuredGrid) return;
  
  featuredGrid.innerHTML = '';
  
  if (productosDestacados.length === 0) {
    featuredGrid.innerHTML = '<p class="no-products" style="grid-column: 1/-1; text-align: center;">No hay productos destacados</p>';
  } else {
    productosDestacados.forEach(producto => {
      const tarjeta = document.createElement('div');
      tarjeta.innerHTML = crearTarjetaProducto(producto);
      featuredGrid.appendChild(tarjeta.firstElementChild);
    });
  }
  
  agregarEfectosHover();
  implementarLazyLoading();
}

/**
 * Inicializa los filtros de categorías
 */
function inicializarFiltrosCategor() {
  const categoriasFiltros = document.querySelector('.category-filters');
  if (!categoriasFiltros) return;
  
  const categorias = obtenerCategorias();
  
  categorias.forEach(categoria => {
    const label = document.createElement('label');
    label.className = 'filter-label';
    label.innerHTML = `
      <input type="radio" name="categoria" value="${categoria}" ${categoria === 'Todos' ? 'checked' : ''}>
      <span>${categoria}</span>
    `;
    
    label.querySelector('input').addEventListener('change', function() {
      categoriaActual = categoria;
      actualizarProductos();
      
      // Disparar evento para otros módulos
      const evento = new CustomEvent('categoria-cambiada', {
        detail: { categoria }
      });
      window.dispatchEvent(evento);
    });
    
    categoriasFiltros.appendChild(label);
  });
}

/**
 * Actualiza la visualización de productos según la categoría
 */
function actualizarProductos() {
  const productosFiletrados = obtenerProductosPorCategoria(categoriaActual);
  const productosAMostrar = productosFiletrados.slice(0, 8);
  const productsGrid = document.getElementById('products-grid');
  
  if (!productsGrid) return;
  
  productsGrid.innerHTML = '';
  
  if (productosFiletrados.length === 0) {
    productsGrid.innerHTML = '<p class="no-products" style="grid-column: 1/-1; text-align: center;">No hay productos en esta categoría</p>';
  } else {
    productosAMostrar.forEach(producto => {
      const tarjeta = document.createElement('div');
      tarjeta.innerHTML = crearTarjetaProducto(producto);
      productsGrid.appendChild(tarjeta.firstElementChild);
    });
  }
  
  agregarEfectosHover();
  implementarLazyLoading();
}

/**
 * Escucha cambios en los filtros aplicados por el módulo de filtros
 */
function escucharCambiosFiltros() {
  window.addEventListener('filtros-aplicados', (e) => {
    const { productos: productosFiletrados } = e.detail;
    const productsGrid = document.getElementById('products-grid');
    
    if (!productsGrid) return;
    
    productsGrid.innerHTML = '';
    
    if (productosFiletrados.length === 0) {
      productsGrid.innerHTML = '<p class="no-products" style="grid-column: 1/-1; text-align: center;">No hay productos que coincidan con los filtros</p>';
    } else {
      productosFiletrados.forEach(producto => {
        const tarjeta = document.createElement('div');
        tarjeta.innerHTML = crearTarjetaProducto(producto);
        productsGrid.appendChild(tarjeta.firstElementChild);
      });
    }
    
    agregarEfectosHover();
    implementarLazyLoading();
  });
}

