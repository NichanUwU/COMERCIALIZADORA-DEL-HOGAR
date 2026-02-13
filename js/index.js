// Script para la página de inicio
document.addEventListener('DOMContentLoaded', function() {
    const productsGrid = document.getElementById('products-grid');
    
    // Obtener productos destacados
    function cargarProductosDestacados() {
        const productosDestacados = obtenerProductosDestacados();
        
        // Limpiar grid
        productsGrid.innerHTML = '';
        
        // Agregar productos
        productosDestacados.forEach(producto => {
            const tarjeta = document.createElement('div');
            tarjeta.innerHTML = crearTarjetaProducto(producto);
            productsGrid.appendChild(tarjeta.firstElementChild);
        });
        
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
    
    // Cargar productos
    cargarProductosDestacados();
});
