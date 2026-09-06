/* =========================================================
   CONTROLADOR AUTO LIGHTBOX (js/carousel.js)
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
    const gallerySection = document.getElementById('auto-gallery-section');
    if (!gallerySection) return;

    // Extraer rutas de imágenes y descripciones desde el HTML
    const imagesData = Array.from(gallerySection.querySelectorAll('img')).map(img => ({
        src: img.getAttribute('data-full') || img.src,
        alt: img.getAttribute('alt') || ''
    }));

    if (imagesData.length === 0) return;

    // Configuración del intervalo automático (4 segundos por defecto)
    const intervalTime = parseInt(gallerySection.getAttribute('data-autoplay-interval')) || 4000;
    
    let currentIndex = 0;
    let autoPlayTimer = null;
    let overlay, imgElement, captionElement;

    // Crear la estructura DOM del Lightbox dinámicamente
    function createLightbox() {
        if (document.querySelector('.auto-lightbox-overlay')) return;

        overlay = document.createElement('div');
        overlay.className = 'auto-lightbox-overlay auto-lightbox-fade-in';
        overlay.style.display = 'none';

        overlay.innerHTML = `
            <button class="auto-close-btn" id="autoCloseBtn" aria-label="Cerrar visor">✖</button>
            <button class="auto-nav-btn left" id="autoPrevBtn" aria-label="Imagen anterior">❮</button>
            
            <div class="auto-lightbox-content">
                <img id="autoLightboxImg" src="" alt="">
            </div>
            
            <button class="auto-nav-btn right" id="autoNextBtn" aria-label="Imagen siguiente">❯</button>
            <div class="auto-caption" id="autoCaption"></div>
        `;

        document.body.appendChild(overlay);

        imgElement = document.getElementById('autoLightboxImg');
        captionElement = document.getElementById('autoCaption');

        // Eventos de botones
        document.getElementById('autoCloseBtn').addEventListener('click', closeLightbox);
        document.getElementById('autoPrevBtn').addEventListener('click', () => {
            resetTimer();
            prevImage();
        });
        document.getElementById('autoNextBtn').addEventListener('click', () => {
            resetTimer();
            nextImage();
        });

        // Soporte para gestos táctiles (Swipe en móviles)
        let touchStartX = 0;
        overlay.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        overlay.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].screenX;
            if (touchStartX - touchEndX > 50) {
                resetTimer();
                nextImage(); // Swipe izquierda -> Siguiente
            } else if (touchEndX - touchStartX > 50) {
                resetTimer();
                prevImage(); // Swipe derecha -> Anterior
            }
        }, { passive: true });
    }

    // Mostrar imagen según el índice
    function updateImage() {
        if (!imgElement) return;
        const currentData = imagesData[currentIndex];
        
        // Transición suave
        imgElement.style.opacity = '0.3';
        setTimeout(() => {
            imgElement.src = currentData.src;
            imgElement.alt = currentData.alt;
            captionElement.textContent = currentData.alt;
            imgElement.style.opacity = '1';
        }, 150);
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % imagesData.length;
        updateImage();
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + imagesData.length) % imagesData.length;
        updateImage();
    }

    function startAutoPlay() {
        stopAutoPlay();
        autoPlayTimer = setInterval(nextImage, intervalTime);
    }

    function stopAutoPlay() {
        if (autoPlayTimer) clearInterval(autoPlayTimer);
    }

    function resetTimer() {
        stopAutoPlay();
        startAutoPlay();
    }

    function openLightbox(index = 0) {
        createLightbox();
        currentIndex = index;
        updateImage();
        overlay.style.display = 'flex';
        document.body.classList.add('auto-lightbox-open');
        startAutoPlay();
    }

    function closeLightbox() {
        if (!overlay) return;
        stopAutoPlay();
        overlay.style.display = 'none';
        document.body.classList.remove('auto-lightbox-open');
    }

    // Vincular al botón "Ver Fotos en Grande 💖" de la página 5
    const openBtn = document.getElementById('openGalleryBtn');
    if (openBtn) {
        openBtn.addEventListener('click', () => openLightbox(0));
    }
});
