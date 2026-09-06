/* =========================================================
   CONTROLADOR AUTO LIGHTBOX (js/carousel.js)
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

    const gallerySection = document.getElementById('auto-gallery-section');

    if (!gallerySection) return;


    // Obtener imágenes desde HTML
    const imagesData = Array.from(
        gallerySection.querySelectorAll('img')
    ).map(img => ({
        src: img.getAttribute('data-full') || img.src,
        alt: img.getAttribute('alt') || ''
    }));


    if (imagesData.length === 0) return;


    // Tiempo del cambio automático
    const intervalTime =
        parseInt(gallerySection.getAttribute('data-autoplay-interval')) || 4000;


    let currentIndex = 0;
    let autoPlayTimer = null;

    let overlay = null;
    let imgElement = null;
    let captionElement = null;



    /* =====================================================
       CREAR LIGHTBOX
       ===================================================== */

    function createLightbox() {


        // Si ya existe recuperamos referencias
        if (document.querySelector('.auto-lightbox-overlay')) {

            overlay = document.querySelector('.auto-lightbox-overlay');
            imgElement = document.getElementById('autoLightboxImg');
            captionElement = document.getElementById('autoCaption');

            return;
        }



        overlay = document.createElement('div');

        overlay.className =
            'auto-lightbox-overlay auto-lightbox-fade-in';



        overlay.innerHTML = `

            <button class="auto-close-btn" 
            id="autoCloseBtn">
            ✖
            </button>


            <button class="auto-nav-btn left"
            id="autoPrevBtn">
            ❮
            </button>


            <div class="auto-lightbox-content">

                <img id="autoLightboxImg"
                src=""
                alt="">

            </div>


            <button class="auto-nav-btn right"
            id="autoNextBtn">
            ❯
            </button>


            <div class="auto-caption"
            id="autoCaption">
            </div>

        `;



        document.body.appendChild(overlay);



        imgElement =
            document.getElementById('autoLightboxImg');


        captionElement =
            document.getElementById('autoCaption');



        // Botón cerrar

        document
        .getElementById('autoCloseBtn')
        .addEventListener('click', closeLightbox);



        // Anterior

        document
        .getElementById('autoPrevBtn')
        .addEventListener('click', ()=>{

            resetTimer();
            prevImage();

        });



        // Siguiente

        document
        .getElementById('autoNextBtn')
        .addEventListener('click', ()=>{

            resetTimer();
            nextImage();

        });



        // Cerrar haciendo clic fuera

        overlay.addEventListener('click',(e)=>{

            if(e.target === overlay){

                closeLightbox();

            }

        });



        // Swipe móvil

        let touchStartX = 0;


        overlay.addEventListener(
            'touchstart',
            (e)=>{

                touchStartX =
                e.changedTouches[0].screenX;

            },
            {passive:true}
        );



        overlay.addEventListener(
            'touchend',
            (e)=>{

                const touchEndX =
                e.changedTouches[0].screenX;



                if(touchStartX - touchEndX > 50){

                    resetTimer();
                    nextImage();

                }
                else if(touchEndX - touchStartX > 50){

                    resetTimer();
                    prevImage();

                }

            },
            {passive:true}
        );

    }





    /* =====================================================
       ACTUALIZAR IMAGEN
       ===================================================== */

    function updateImage(){


        if(!imgElement) return;


        const currentData =
        imagesData[currentIndex];



        imgElement.style.opacity = "0.3";



        setTimeout(()=>{


            imgElement.src =
            currentData.src;


            imgElement.alt =
            currentData.alt;



            captionElement.textContent =
            currentData.alt;



            imgElement.style.opacity = "1";


        },150);


    }





    function nextImage(){

        currentIndex =
        (currentIndex + 1) %
        imagesData.length;


        updateImage();

    }




    function prevImage(){

        currentIndex =
        (currentIndex - 1 + imagesData.length)
        %
        imagesData.length;


        updateImage();

    }





    /* =====================================================
       AUTOPLAY
       ===================================================== */


    function startAutoPlay(){

        stopAutoPlay();

        autoPlayTimer =
        setInterval(
            nextImage,
            intervalTime
        );

    }




    function stopAutoPlay(){

        if(autoPlayTimer){

            clearInterval(autoPlayTimer);

            autoPlayTimer=null;

        }

    }




    function resetTimer(){

        stopAutoPlay();

        startAutoPlay();

    }





    /* =====================================================
       ABRIR / CERRAR
       ===================================================== */


    function openLightbox(index=0){


        createLightbox();


        currentIndex=index;


        updateImage();



        overlay.classList.add("active");


        document.body
        .classList.add(
            "auto-lightbox-open"
        );


        startAutoPlay();


    }




    function closeLightbox(){


        if(!overlay) return;


        stopAutoPlay();


        overlay.classList.remove(
            "active"
        );


        document.body
        .classList.remove(
            "auto-lightbox-open"
        );


    }





    /* =====================================================
       TECLA ESC
       ===================================================== */


    document.addEventListener(
        "keydown",
        (e)=>{

            if(e.key==="Escape"){

                closeLightbox();

            }

        }
    );





    /* =====================================================
       BOTÓN GALERÍA PÁGINA 5
       ===================================================== */


    const openBtn =
    document.getElementById(
        'openGalleryBtn'
    );



    if(openBtn){

        openBtn.addEventListener(
            'click',
            ()=>openLightbox(0)
        );

    }



});


console.log(
"Carousel Lightbox automático cargado correctamente"
);
