# Tema 5: Imágenes

## Objetivo

Aprender a insertar imágenes en una página web y entender
los atributos esenciales: `src`, `alt`, `width` y `height`.

## Explicación

Insertar una imagen es como pegar una foto en un álbum:
hay que saber dónde está la foto (`src`) y escribir una descripción
al pie para quien no puede verla (`alt`).

Atributos de `<img>`:

- `src`: ruta o URL de la imagen (obligatorio).
  Puede ser una ruta local (`imagen.jpg`) o una URL completa.
- `alt`: texto alternativo que describe la imagen (obligatorio).
  Lo usan los lectores de pantalla para personas con discapacidad
  visual, y los buscadores para entender el contenido. Si la imagen
  no carga, el navegador muestra este texto.
- `width` y `height`: dimensiones en píxeles.
  Conviene definirlos para que la página no "salte" mientras carga.

Nota importante: `<img>` es una etiqueta "vacía" o "auto-cerrante": no envuelve
contenido, solo referencia un archivo externo, por eso no tiene
etiqueta de cierre `</img>`.

En este tema se usan imágenes de placeholder (marcador de posición).
El servicio `https://placehold.co/` genera imágenes de ejemplo con el
tamaño y texto que se indique en la URL, sin necesitar archivos locales.

## Código de ejemplo

```html
<img
  src="ruta/imagen.jpg"
  alt="Descripción de la imagen"
  width="300"
  height="200"
/>

<!-- Con URL de placeholder -->
<img
  src="https://placehold.co/300x200?text=Cappuccino"
  alt="Cappuccino con espuma cremosa en taza blanca"
  width="300"
  height="200"
/>
```

El ejemplo ejecutable está en [tema5_imagenes.html](tema5_imagenes.html).
