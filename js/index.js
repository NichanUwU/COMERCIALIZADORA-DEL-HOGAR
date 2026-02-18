// Script para la página de inicio
document.addEventListener('DOMContentLoaded', function() {
    const categoriasFiltros = document.querySelector('.category-filters');
    const productsGrid = document.getElementById('products-grid');
    
    let categoriaActual = 'Todos';
    
    // Inicializar los filtros
    function inicializarFiltros() {
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
            });
            
            categoriasFiltros.appendChild(label);
        });
    }
    
    // Actualizar productos según la categoría seleccionada
    function actualizarProductos() {
        const productosFiletrados = obtenerProductosPorCategoria(categoriaActual);
        
        // Mostrar máximo 8 productos
        const productosAMostrar = productosFiletrados.slice(0, 8);
        
        // Limpiar grid
        productsGrid.innerHTML = '';
        
        // Agregar productos
        if (productosFiletrados.length === 0) {
            productsGrid.innerHTML = '<p class="no-products">No hay productos en esta categoría</p>';
        } else {
            productosAMostrar.forEach(producto => {
                const tarjeta = document.createElement('div');
                tarjeta.innerHTML = crearTarjetaProducto(producto);
                productsGrid.appendChild(tarjeta.firstElementChild);
            });
        }
        
        // Agregar efectos hover
        agregarEfectosHover();
    }
    
    // Efectos hover en las tarjetas
    function agregarEfectosHover() {
        const productCards = document.querySelectorAll('.product-card');
        productCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.15)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.08)';
            });
        });
    }
    
    // Inicializar
    inicializarFiltros();
    actualizarProductos();
});
