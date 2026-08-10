/**
 * MÓDULO: SLIDER/CARRUSEL
 * Gestiona el banner slider automático
 */

class Slider {
  constructor(containerSelector = '.banner-slider') {
    this.container = document.querySelector(containerSelector);
    if (!this.container) return;

    this.slidesContainer = this.container.querySelector('.slides-container');
    this.slides = this.container.querySelectorAll('.slide');
    this.dots = this.container.querySelectorAll('.control-dot');
    this.prevBtn = this.container.querySelector('.prev-btn');
    this.nextBtn = this.container.querySelector('.next-btn');

    this.currentSlide = 0;
    this.slideCount = this.slides.length;
    this.slideInterval = null;
    this.intervalTime = 5000; // 5 segundos

    this.init();
  }

  init() {
    this.attachEventListeners();
    this.start();
  }

  attachEventListeners() {
    if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prev());
    if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.next());

    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => this.goTo(index));
    });

    // Pausar en hover
    this.container.addEventListener('mouseenter', () => this.pause());
    this.container.addEventListener('mouseleave', () => this.start());
  }

  goTo(n) {
    this.currentSlide = (n + this.slideCount) % this.slideCount;
    this.updateSlide();
  }

  next() {
    this.goTo(this.currentSlide + 1);
    this.reset();
  }

  prev() {
    this.goTo(this.currentSlide - 1);
    this.reset();
  }

  updateSlide() {
    this.slidesContainer.style.transform = `translateX(-${this.currentSlide * 100}%)`;

    this.dots.forEach(dot => dot.classList.remove('active'));
    if (this.dots[this.currentSlide]) {
      this.dots[this.currentSlide].classList.add('active');
    }
  }

  start() {
    this.slideInterval = setInterval(() => this.next(), this.intervalTime);
  }

  pause() {
    clearInterval(this.slideInterval);
  }

  reset() {
    this.pause();
    this.start();
  }

  destroy() {
    this.pause();
    if (this.prevBtn) this.prevBtn.removeEventListener('click', () => this.prev());
    if (this.nextBtn) this.nextBtn.removeEventListener('click', () => this.next());
  }
}

// Inicializar slider cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  const slider = new Slider('.banner-slider');
});
