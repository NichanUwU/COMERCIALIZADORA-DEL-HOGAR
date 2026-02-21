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

        // --- Panel de información del producto (lado derecho) ---
        const panelEl = galleryModal.querySelector('.gallery-panel');
        if (panelEl) {
            // usar layout horizontal en pantallas anchas
            panelEl.style.display = 'flex';
            panelEl.style.gap = '18px';
            panelEl.style.alignItems = 'flex-start';

            const mainEl = panelEl.querySelector('.gallery-main');
            if (mainEl) {
                mainEl.style.flex = '1 1 0%';
                mainEl.style.maxWidth = '720px';
            }

            let infoEl = panelEl.querySelector('.gallery-info');
            if (!infoEl) {
                infoEl = document.createElement('div');
                infoEl.className = 'gallery-info';
                panelEl.appendChild(infoEl);
            }

            // contenido de información
            infoEl.innerHTML = `
                <h3 style="margin:0 0 8px 0;font-size:18px;">${producto.nombre}</h3>
                <p style="margin:0 0 8px 0;color:#666;"><strong>Categoría:</strong> ${producto.categoria}</p>
                <div style="margin:6px 0;padding:8px;background:#fafafa;border:1px solid #eee;border-radius:6px">
                    <p style="margin:0 0 6px 0"><strong>Precio contado:</strong> $${producto.contado.toLocaleString()}</p>
                    ${producto.total > producto.contado ? `<p style="margin:0 0 6px 0;color:#888"><strong>Precio financiado:</strong> $${producto.total.toLocaleString()}</p>` : ''}
                    <p style="margin:0 0 6px 0"><strong>Enganche:</strong> $${producto.enganche.toLocaleString()}</p>
                    <p style="margin:0 0 6px 0"><strong>Pago semanal:</strong> $${producto.pago.toLocaleString()}</p>
                    <p style="margin:0"><strong>Plazo:</strong> ${producto.semanas} semanas</p>
                </div>
                <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:10px">
                    <a href="https://api.whatsapp.com/send/?phone=529651000641&text=Estoy%20interesado%20en%20el%20producto%20${encodeURIComponent(producto.nombre)}" target="_blank" rel="noopener noreferrer" style="background:#25D366;color:#fff;padding:8px 10px;border-radius:6px;text-decoration:none">Contactar</a>
                    <button class="gallery-close-btn" style="background:#0077cc;color:#fff;border:none;padding:8px 10px;border-radius:6px;cursor:pointer">Cerrar</button>
                </div>
            `;

            // estilos responsivos mínimos
            infoEl.style.width = '320px';
            infoEl.style.boxSizing = 'border-box';
            infoEl.style.padding = '6px 0 0 0';

            // ajustar layout en pantallas pequeñas
            if (window.innerWidth < 600) {
                panelEl.style.flexDirection = 'column';
                infoEl.style.width = '100%';
            } else {
                panelEl.style.flexDirection = 'row';
            }

            // manejar botón Cerrar dentro del info panel
            const closeInside = infoEl.querySelector('.gallery-close-btn');
            if (closeInside) {
                const modalCloseBtn = galleryModal.querySelector('.gallery-close');
                closeInside.addEventListener('click', () => { if (modalCloseBtn) modalCloseBtn.click(); else galleryModal.setAttribute('aria-hidden', 'true'); });
            }
        }

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
