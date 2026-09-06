// carousel.js - Funcionalidad del carrusel de diapositivas

class Carousel {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.carousel-slide');
        this.totalSlides = this.slides.length;
        this.wrapper = document.querySelector('.carousel-wrapper');
        this.indicatorsContainer = document.getElementById('carouselIndicators');
        this.prevBtn = document.getElementById('carouselPrev');
        this.nextBtn = document.getElementById('carouselNext');
        
        if (this.slides.length === 0) return;
        
        this.init();
    }

    init() {
        // Crear indicadores
        this.createIndicators();
        
        // Mostrar primera diapositiva
        this.showSlide(0);
        
        // Event listeners para botones
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prevSlide());
        }
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }
        
        // Soporte para teclado
        document.addEventListener('keydown', (e) => {
            if (this.isCarouselActive()) {
                if (e.key === 'ArrowLeft') this.prevSlide();
                if (e.key === 'ArrowRight') this.nextSlide();
            }
        });
        
        // Soporte para deslizar (swipe)
        this.initSwipe();
        
        // Iniciar indicadores clickeables
        this.initIndicators();
    }

    createIndicators() {
        if (!this.indicatorsContainer) return;
        
        for (let i = 0; i < this.totalSlides; i++) {
            const indicator = document.createElement('div');
            indicator.className = 'carousel-indicator';
            indicator.setAttribute('data-index', i);
            indicator.setAttribute('role', 'button');
            indicator.setAttribute('aria-label', `Ir a diapositiva ${i + 1}`);
            indicator.addEventListener('click', () => this.showSlide(i));
            this.indicatorsContainer.appendChild(indicator);
        }
    }

    initIndicators() {
        const indicators = document.querySelectorAll('.carousel-indicator');
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                this.showSlide(index);
            });
        });
    }

    updateIndicators() {
        const indicators = document.querySelectorAll('.carousel-indicator');
        indicators.forEach((indicator, index) => {
            if (index === this.currentSlide) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }

    showSlide(n) {
        if (n >= this.totalSlides) {
            this.currentSlide = this.totalSlides - 1;
        } else if (n < 0) {
            this.currentSlide = 0;
        } else {
            this.currentSlide = n;
        }

        // Ocultar todas las diapositivas
        this.slides.forEach(slide => {
            slide.classList.remove('active');
        });

        // Mostrar la diapositiva actual
        if (this.slides[this.currentSlide]) {
            this.slides[this.currentSlide].classList.add('active');
        }

        // Actualizar indicadores
        this.updateIndicators();

        // Actualizar estado de botones
        this.updateButtonStates();
    }

    nextSlide() {
        this.showSlide(this.currentSlide + 1);
    }

    prevSlide() {
        this.showSlide(this.currentSlide - 1);
    }

    updateButtonStates() {
        if (this.prevBtn) {
            this.prevBtn.disabled = this.currentSlide === 0;
        }
        if (this.nextBtn) {
            this.nextBtn.disabled = this.currentSlide === this.totalSlides - 1;
        }
    }

    isCarouselActive() {
        // Verificar si la página del carrusel está activa
        const carouselPage = document.getElementById('p5');
        return carouselPage && carouselPage.classList.contains('active');
    }

    // Soporte para deslizar (swipe) en dispositivos móviles
    initSwipe() {
        if (!this.wrapper) return;

        let startX = 0;
        let endX = 0;

        this.wrapper.addEventListener('touchstart', (e) => {
            startX = e.changedTouches[0].screenX;
        }, false);

        this.wrapper.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].screenX;
            this.handleSwipe();
        }, false);

        const handleSwipe = () => {
            const diff = startX - endX;
            const threshold = 50; // Distancia mínima para considerar un deslizamiento

            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    // Deslizar hacia la izquierda = siguiente
                    this.nextSlide();
                } else {
                    // Deslizar hacia la derecha = anterior
                    this.prevSlide();
                }
            }
        };

        this.handleSwipe = handleSwipe;
    }
}

// Inicializar carrusel cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const carousel = new Carousel();
    window.carousel = carousel; // Hacer disponible globalmente si es necesario
    console.log('Carrusel inicializado');
});

// Fallback si el DOM ya está listo antes de cargar este script
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (!window.carousel) {
            const carousel = new Carousel();
            window.carousel = carousel;
        }
    });
} else {
    if (!window.carousel) {
        const carousel = new Carousel();
        window.carousel = carousel;
    }
}
