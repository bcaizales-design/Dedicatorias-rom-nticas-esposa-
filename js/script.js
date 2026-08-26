// script.js - behavior moved out of index.html

// --- CONFIG ---
const STAR_COUNT = 140; // reduced for performance
const EMOJI_INTERVAL_MS = 350;
const MAX_FLOATING = 12;

// --- CREAR FONDO DE ESTRELLAS ---
function crearEstrellas() {
    const starfield = document.getElementById('starfield');
    if (!starfield) return;
    // limpiar por si acaso
    starfield.innerHTML = '';

    for (let i = 0; i < STAR_COUNT; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.width = (Math.random() * 2 + 0.5) + 'px';
        star.style.height = star.style.width;
        star.style.animationDelay = Math.random() * 3 + 's';
        star.setAttribute('aria-hidden', 'true');
        starfield.appendChild(star);
    }
}
crearEstrellas();

// --- CONTROL DE MÚSICA ---
const audio = document.getElementById('backgroundMusic');
const musicToggle = document.getElementById('musicToggle');
const musicOverlay = document.getElementById('musicOverlay');
const startButton = document.getElementById('startButton');
let musicaActiva = false;
let musicStartedByUserGesture = false;

// Diagnostics: log audio events and errors to console to help debugging
if (audio) {
    audio.addEventListener('error', () => console.error('Audio error:', audio.error));
    audio.addEventListener('play', () => console.log('Audio event: play'));
    audio.addEventListener('playing', () => console.log('Audio event: playing'));
    audio.addEventListener('pause', () => console.log('Audio event: pause'));
    audio.addEventListener('volumechange', () => console.log('Audio volume/muted change:', {muted: audio.muted, volume: audio.volume}));
}

function setMusicState(on) {
    musicaActiva = !!on;
    if (musicToggle) {
        musicToggle.textContent = musicaActiva ? '🎵 Música: ON' : '🎵 Música: OFF';
        musicToggle.setAttribute('aria-pressed', String(!!musicaActiva));
    }
}

async function iniciarMusica() {
    if (!audio) {
        // If there's no audio element, just hide overlay so user can interact
        if (musicOverlay) musicOverlay.classList.add('hidden');
        setMusicState(false);
        return;
    }

    // guard: only attempt once per user gesture to avoid repeated rejections
    if (musicStartedByUserGesture && musicaActiva && !audio.paused) return;

    try {
        // If audio was autoplayed muted, unmute now on user gesture so sound plays
        if (audio.muted) {
            audio.muted = false;
        }
        audio.volume = 0.5;

        // Some browsers require a user gesture to resume an existing autoplayed audio
        await audio.play();

        musicStartedByUserGesture = true;
        setMusicState(true);
        if (musicOverlay) musicOverlay.classList.add('hidden');
    } catch (error) {
        // playback blocked or failed (common with cross-origin or unsupported sources)
        console.warn('Error al reproducir música:', error);
        setMusicState(false);
        // allow interaction even if audio can't play: hide overlay after a short delay
        if (musicOverlay) setTimeout(() => musicOverlay.classList.add('hidden'), 300);
    }
}

// Event listener para el botón de inicio
if (startButton) {
    startButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        iniciarMusica();
        // move focus to envelope after starting
        const sobre = document.getElementById('sobre');
        if (sobre) sobre.focus();
    });
}

if (musicToggle) {
    musicToggle.addEventListener('click', async () => {
        if (!audio) return;
        if (musicaActiva) {
            audio.pause();
            setMusicState(false);
        } else {
            try {
                // ensure audio is unmuted before playing
                if (audio.muted) audio.muted = false;
                await audio.play();
                setMusicState(true);
            } catch (e) {
                console.warn('No se pudo reproducir audio:', e);
            }
        }
    });
}

// Fallback: algunos navegadores sólo permiten reproducir audio tras un gesto del usuario.
// Añadimos escuchas globales que, si la overlay todavía está visible, inicien la música
// con el primer gesto (click/touch/tecla). También permitimos cerrar la overlay con Escape.
(function addUserGestureFallback() {
    if (!musicOverlay) return;

    function onUserGesture(e) {
        // Si la overlay ya está oculta, no hacemos nada
        if (musicOverlay.classList.contains('hidden')) {
            removeListeners();
            return;
        }

        // Si el usuario pulsa Escape, cerramos la overlay sin intentar reproducir audio
        if (e.type === 'keydown' && e.key === 'Escape') {
            musicOverlay.classList.add('hidden');
            setMusicState(false);
            removeListeners();
            return;
        }

        // Aceptamos varios tipos de interacciones como gesto válido
        const valid = e.type === 'pointerdown' || e.type === 'touchstart' || (e.type === 'keydown' && e.key && e.key.length === 1) || e.type === 'click';
        if (valid) {
            iniciarMusica();
            removeListeners();
        }
    }

    function removeListeners() {
        window.removeEventListener('pointerdown', onUserGesture);
        window.removeEventListener('touchstart', onUserGesture);
        window.removeEventListener('keydown', onUserGesture);
        window.removeEventListener('click', onUserGesture);
    }

    window.addEventListener('pointerdown', onUserGesture, {passive: true});
    window.addEventListener('touchstart', onUserGesture, {passive: true});
    window.addEventListener('keydown', onUserGesture);
    window.addEventListener('click', onUserGesture, {passive: true});
})();

// --- EFECTO DE EMOJIS FLOTANTES ---
const emojis = ["❤️","💖","💕","💗","💞","👶","🍼","🧸","👣","🌸","✨","🐥"];
let floatingCount = 0;
const createFloating = () => {
    if (floatingCount >= MAX_FLOATING) return;
    const figura = document.createElement('div');
    figura.className = 'flotante';
    figura.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
    figura.style.left = Math.random() * 100 + 'vw';
    figura.style.fontSize = (18 + Math.random() * 26) + 'px';
    figura.style.animationDuration = (6 + Math.random() * 6) + 's';
    figura.setAttribute('aria-hidden', 'true');

    floatingCount++;
    document.body.appendChild(figura);

    figura.addEventListener('animationend', () => {
        figura.remove();
        floatingCount--;
    });
};

let emojiInterval = setInterval(createFloating, EMOJI_INTERVAL_MS);

// Pause animations when page is hidden to save CPU/mobile battery
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        clearInterval(emojiInterval);
    } else {
        emojiInterval = setInterval(createFloating, EMOJI_INTERVAL_MS);
    }
});

// --- INTERACCIÓN DEL SOBRE ---
const sobre = document.getElementById('sobre');

function abrirSobre() {
    if (!sobre) return;
    if (!sobre.classList.contains('open')) {
        sobre.classList.add('open');
    }
}

if (sobre) {
    sobre.addEventListener('click', function(e) {
        e.stopPropagation();
        abrirSobre();
    });

    sobre.addEventListener('touchstart', function(e) {
        e.stopPropagation();
        abrirSobre();
    }, {passive: true});

    // keyboard support: Enter/Space opens, Left/Right navigate pages, M toggles music
    sobre.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            abrirSobre();
        } else if (e.key === 'ArrowLeft') {
            cambiarPagina(-1);
        } else if (e.key === 'ArrowRight') {
            cambiarPagina(1);
        } else if (e.key.toLowerCase && e.key.toLowerCase() === 'm') {
            if (musicToggle) musicToggle.click();
        }
    });
}

// --- SISTEMA DE PÁGINAS DE LA CARTA ---
let paginaActual = 1;
const totalPaginas = 4;
const btnPrev = document.getElementById('btnPrev');
const btnNext = document.getElementById('btnNext');

function actualizarBotones() {
    if (btnPrev) btnPrev.disabled = (paginaActual === 1);
    if (btnNext) btnNext.disabled = (paginaActual === totalPaginas);
}

function cambiarPagina(direccion) {
    const prev = document.getElementById(`p${paginaActual}`);
    if (prev) prev.classList.remove('active');

    paginaActual += direccion;
    if (paginaActual < 1) paginaActual = 1;
    if (paginaActual > totalPaginas) paginaActual = totalPaginas;

    const current = document.getElementById(`p${paginaActual}`);
    if (current) current.classList.add('active');
    actualizarBotones();
}

// expose cambiarPagina globally for inline handlers compatibility
window.cambiarPagina = cambiarPagina;

if (btnPrev) btnPrev.addEventListener('click', (e) => { e.stopPropagation(); cambiarPagina(-1); });
if (btnNext) btnNext.addEventListener('click', (e) => { e.stopPropagation(); cambiarPagina(1); });

// enable left/right arrow navigation globally when envelope is open
document.addEventListener('keydown', (e) => {
    if (!document.querySelector('.envelope-wrapper.open')) return;
    if (e.key === 'ArrowLeft') cambiarPagina(-1);
    if (e.key === 'ArrowRight') cambiarPagina(1);
});

// initial button state
actualizarBotones();

// botón para continuar sin música (cierra la overlay sin intentar reproducir)
const continueNoMusic = document.getElementById('continueNoMusic');
if (continueNoMusic) {
  continueNoMusic.addEventListener('click', (e) => {
    e.stopPropagation();
    if (musicOverlay) musicOverlay.classList.add('hidden');
    setMusicState(false);
    // mover foco al sobre para accesibilidad
    const sobreEl = document.getElementById('sobre');
    if (sobreEl) sobreEl.focus();
  });
}

// cleanup on unload
window.addEventListener('beforeunload', () => {
    clearInterval(emojiInterval);
});
