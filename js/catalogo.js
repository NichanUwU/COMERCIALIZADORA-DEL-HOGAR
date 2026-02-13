// Script para la página de catálogo
document.addEventListener('DOMContentLoaded', function() {
    const categoriasFiltros = document.querySelector('.category-filters');
    const productsGrid = document.getElementById('products-grid');
    const categoryTitle = document.getElementById('category-title');
    const productCount = document.getElementById('product-count');
    
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
        
        // Actualizar título
        const nombreCategoria = categoriaActual === 'Todos' ? 'Todos los Productos' : categoriaActual;
        categoryTitle.textContent = nombreCategoria;
        
        // Actualizar contador
        productCount.textContent = `Mostrando ${productosFiletrados.length} producto${productosFiletrados.length !== 1 ? 's' : ''}`;
        
        // Limpiar grid
        productsGrid.innerHTML = '';
        
        // Agregar productos
        if (productosFiletrados.length === 0) {
            productsGrid.innerHTML = '<p class="no-products">No hay productos en esta categoría</p>';
        } else {
            productosFiletrados.forEach(producto => {
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
            
            // Abrir galería al hacer click en la tarjeta
            card.addEventListener('click', function(e) {
                // evitar abrir cuando se hace click en botones internos (si los hay)
                if (e.target.tagName.toLowerCase() === 'button' || e.target.closest('a')) return;
                const productoId = card.querySelector('.product-title')?.dataset?.id || null;
                // obtener producto por nombre o por id
                const nombre = card.querySelector('.product-title')?.textContent || null;
                let productoObj = null;
                if (productoId) {
                    productoObj = obtenerProductosPorCategoria('Todos').find(p => p.id == productoId);
                }
                if (!productoObj && nombre) {
                    productoObj = obtenerProductosPorCategoria('Todos').find(p => p.nombre === nombre);
                }
                if (productoObj) {
                    abrirGaleriaProducto(productoObj);
                }
            });
        });
    }

    // ---------------- Gallery modal functions ----------------
    const galleryModal = document.getElementById('gallery-modal');
    const galleryImage = document.getElementById('gallery-image');
    const galleryThumbs = document.getElementById('gallery-thumbs');
    const galleryClose = () => {
        if (!galleryModal) return;
        galleryModal.setAttribute('aria-hidden', 'true');
    };

    function abrirGaleriaProducto(producto) {
        if (!galleryModal) return;
        // derivar base path eliminando /1.jpg
        const imgPath = producto.imagen || '';
        const base = imgPath.replace(/\/1\.jpg$|\/1\.jpeg$|\/1\.png$|\/1\.webp$/i, '');
        const imgs = [1,2,3].map(n => `${base}/${n}.jpg`);
        let current = 0;

        function mostrarIndice(i) {
            current = (i + imgs.length) % imgs.length;
            galleryImage.src = imgs[current];
            // actualizar thumbnails
            Array.from(galleryThumbs.children).forEach((t, idx) => {
                t.classList.toggle('active', idx === current);
            });
        }

        // limpiar thumbs
        galleryThumbs.innerHTML = '';
        imgs.forEach((src, idx) => {
            const t = document.createElement('img');
            t.src = src;
            t.alt = `${producto.nombre} - imagen ${idx+1}`;
            t.addEventListener('click', () => mostrarIndice(idx));
            galleryThumbs.appendChild(t);
        });

        // set initial image
        mostrarIndice(0);
        galleryModal.setAttribute('aria-hidden', 'false');

        // prev/next handlers
        const prevBtn = galleryModal.querySelector('.gallery-prev');
        const nextBtn = galleryModal.querySelector('.gallery-next');
        const closeBtn = galleryModal.querySelector('.gallery-close');
        const backdrop = galleryModal.querySelector('.gallery-backdrop');

        const onPrev = () => mostrarIndice(current - 1);
        const onNext = () => mostrarIndice(current + 1);
        const onClose = () => {
            galleryModal.setAttribute('aria-hidden', 'true');
            prevBtn.removeEventListener('click', onPrev);
            nextBtn.removeEventListener('click', onNext);
            closeBtn.removeEventListener('click', onClose);
            backdrop.removeEventListener('click', onClose);
            document.removeEventListener('keydown', onKey);
        };

        function onKey(e) {
            if (e.key === 'ArrowLeft') onPrev();
            if (e.key === 'ArrowRight') onNext();
            if (e.key === 'Escape') onClose();
        }

        prevBtn.addEventListener('click', onPrev);
        nextBtn.addEventListener('click', onNext);
        closeBtn.addEventListener('click', onClose);
        backdrop.addEventListener('click', onClose);
        document.addEventListener('keydown', onKey);
    }
    
    // Inicializar
    inicializarFiltros();
    actualizarProductos();
});
