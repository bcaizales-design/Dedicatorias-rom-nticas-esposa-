# 💖 Dedicatoria Romántica Interactiva para Nancy

Una hermosa página web interactiva con un sobre 3D, música, galería de fotos y mensajes románticos.

## 🎯 Características Principales

✨ **Sobre 3D Interactivo** - Abre el sobre con animación suave  
🎵 **Control de Música** - Reproducción de audio con control ON/OFF  
📸 **Galería Automática** - Lightbox con desplazamiento automático de imágenes  
💫 **Emojis Flotantes** - Animaciones decorativas de emojis  
🌌 **Fondo de Galaxia** - Estrellas, nebulosas y planetas animados  
📱 **Responsive** - Funciona perfectamente en móvil y desktop  
♿ **Accesible** - Soporte para navegación por teclado  

## 📁 Estructura de Archivos

```
Dedicatorias-rom-nticas-esposa-/
├── index.html              # Página principal (HTML)
├── css/
│   └── styles.css         # Estilos completos (CSS)
└── js/
    ├── script.js          # Lógica principal (JavaScript)
    └── carousel.js        # Lightbox automático (JavaScript)
```

## 🚀 Cómo Usar

### 1. **Clonar o Descargar el Repositorio**
```bash
git clone https://github.com/bcaizales-design/Dedicatorias-rom-nticas-esposa-.git
cd Dedicatorias-rom-nticas-esposa-
```

### 2. **Abrir en Navegador**
- Simplemente abre `index.html` en tu navegador web
- O despliega en GitHub Pages (ya está habilitado)

### 3. **Personalizar el Contenido**

#### Cambiar el Nombre
En `index.html`, línea 54:
```html
<h1>Para mi hermosa esposa Nancy 💖</h1>
```

#### Agregar/Editar Páginas
En `index.html`, agregue una nueva página dentro de `<div class="pages-container">`:
```html
<div class="page" id="p7">
    <p>Tu mensaje aquí 💕</p>
</div>
```

#### Agregar Fotos a la Galería
En `index.html`, línea 85-90, agregue más líneas:
```html
<section id="auto-gallery-section" data-autoplay-interval="4000" style="display: none;">
    <img data-full="ruta/a/tu/imagen.jpg" alt="Descripción">
    <img data-full="otra-imagen.jpg" alt="Otra descripción">
</section>
```

#### Cambiar la Música
En `index.html`, línea 40-41, cambia la URL del archivo MP3:
```html
<source src="tu-archivo-de-audio.mp3" type="audio/mpeg">
```

## 🎨 Personalización de Estilos

### Colores Principales
En `css/styles.css`, busca y modifica:
- **Color Rosa**: `#ff1493`, `#ff69b4`
- **Fondo Gradiente**: Línea 14-15
- **Fondos de Planetas**: Línea 68-93

### Velocidades de Animación
- **Emojis Flotantes**: `EMOJI_INTERVAL_MS` en `js/script.js` (línea 5)
- **Galería Automática**: `data-autoplay-interval` en `index.html` (línea 85)

## ⌨️ Controles de Teclado

| Tecla | Acción |
|-------|--------|
| **Enter / Espacio** | Abre el sobre |
| **Flecha Izquierda** | Página anterior |
| **Flecha Derecha** | Página siguiente |
| **M** | Alterna música ON/OFF |
| **Escape** | Cierra overlay de música |

## 🖱️ Controles de Ratón/Táctil

- **Click en el sobre** - Abre la carta
- **Botones Anterior/Siguiente** - Navega entre páginas
- **Click en "Ver Fotos en Grande"** - Abre la galería automática
- **Swipe (móvil)** - Navega en la galería
- **Click en imagen de galería** - Cierra automáticamente

## 🔧 Estructura del Código

### `index.html`
- Estructura HTML semántica
- 6 páginas predefinidas (editable)
- Sección de galería automática (oculta)
- Referencias a archivos CSS y JS

### `css/styles.css`
- Estilos completos (sin JavaScript)
- Animaciones CSS puras
- Diseño responsive
- Soporte para accesibilidad

### `js/script.js`
- Lógica del sobre 3D
- Control de música
- Sistema de páginas
- Emojis flotantes
- Gestión de eventos

### `js/carousel.js`
- Lightbox automático
- Autoplay de imágenes
- Soporte para Swipe
- Controles de navegación

## ⚠️ Resolución de Problemas

### La música no se reproduce
- Algunos navegadores requieren interacción del usuario
- Presiona el botón "Presiona para empezar"
- Verifica la URL del archivo MP3

### Las imágenes no aparecen en la galería
- Asegúrate de que la ruta en `data-full` sea correcta
- Usa rutas absolutas si es necesario
- Verifica que las imágenes existan

### El sobre no se abre
- Verifica que JavaScript esté habilitado
- Abre la consola (F12) para ver errores
- Comprueba que `script.js` se cargue correctamente

### Problemas en móvil
- Asegúrate de que el viewport esté configurado
- Prueba en Safari e iOS si es posible
- Verifica que el Swipe funcione en la galería

## 📱 Compatibilidad

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ iOS Safari 14+
- ✅ Android Chrome 90+

## 🌐 Desplegar en GitHub Pages

1. Ve a Settings → Pages
2. Branch: main
3. Folder: / (root)
4. Save
5. Tu sitio estará disponible en: `https://bcaizales-design.github.io/Dedicatorias-rom-nticas-esposa-`

## 💝 Notas Importantes

- El proyecto contiene mensajes personalizados para Nancy
- Los mensajes y nombres pueden editarse fácilmente
- Toda la música y imágenes deben estar en el repositorio o tener URLs públicas
- Los estilos son completamente responsivos

## 📝 Licencia

Código personalizado con fines románticos. Siente libre de usar y modificar.

## 💌 Créditos

Desarrollado con ❤️ para Nancy

---

**¿Preguntas? Revisa la consola del navegador (F12) para mensajes de depuración.**
