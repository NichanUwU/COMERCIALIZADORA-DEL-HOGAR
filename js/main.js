// Slider automático
document.addEventListener('DOMContentLoaded', function() {
    const slidesContainer = document.querySelector('.slides-container');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.control-dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentSlide = 0;
    const slideCount = slides.length;
    let slideInterval;
    
    // Función para cambiar de slide
    function goToSlide(n) {
        currentSlide = (n + slideCount) % slideCount;
        slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Actualizar dots
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentSlide].classList.add('active');
    }
    
    // Funciones para botones prev/next
    function nextSlide() {
        goToSlide(currentSlide + 1);
        resetInterval();
    }
    
    function prevSlide() {
        goToSlide(currentSlide - 1);
        resetInterval();
    }
    
    // Iniciar el slider automático
    function startInterval() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    // Reiniciar el intervalo cuando el usuario interactúa
    function resetInterval() {
        clearInterval(slideInterval);
        startInterval();
    }
    
    // Event listeners para botones
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Event listeners para dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
            resetInterval();
        });
    });
    
    // Iniciar el slider automático
    startInterval();
    
    // Efecto de hover en los productos
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
});