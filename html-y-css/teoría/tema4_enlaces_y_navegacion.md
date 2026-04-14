# Tema 4: Enlaces y navegación

## Objetivo

Entender cómo conectar páginas entre sí y con sitios externos
usando la etiqueta `<a>`.

## Explicación

Los enlaces son como las puertas de un edificio:

- Las puertas internas llevan a otra habitación del mismo edificio.
  En HTML: `<a href="menu.html">Ver el menú</a>`
  El navegador busca el archivo `menu.html` en la misma carpeta.
- Las puertas externas llevan afuera, a otro edificio.
  En HTML: `<a href="https://maps.google.com">Ver mapa</a>`
  El navegador abre esa dirección web.

Atributos importantes de `<a>`:

- `href`: la dirección a donde lleva el enlace (obligatorio).
- `target="_blank"`: abre el enlace en una nueva pestaña.
  Útil para enlaces externos, para no sacar al usuario del sitio.

Tipos de `href`:

- **Ruta relativa simple**: `href="menu.html"` → busca el archivo en la misma carpeta que el HTML actual.
- **Ruta con subcarpeta**: `href="paginas/menu.html"` → busca el archivo dentro de una carpeta llamada `paginas/`, que está en la misma carpeta que el HTML actual.
  Es como decir: "entra a la carpeta `paginas` y abre `menu.html`".
- **Ruta desde la raíz**: `href="/menu.html"` → la barra `/` al inicio significa "desde la raíz del sitio web", sin importar en qué carpeta esté el HTML actual.
  Funciona correctamente cuando el sitio está en un servidor; no aplica al abrir archivos directamente desde la computadora.
- **URL completa**: `href="https://www.ejemplo.com"` → dirección externa con protocolo incluido. Lleva a otro sitio web.
- **Ancla**: `href="#horarios"` → el `#` seguido de un nombre desplaza la página hasta el elemento que tenga ese `id`.
  Por ejemplo, si existe `<section id="horarios">`, el enlace lleva directamente a esa sección sin cambiar de página.

## Código de ejemplo

```html
<a href="destino.html">Texto del enlace</a>
<a href="https://sitio.com" target="_blank">Sitio externo</a>
<a href="#seccion">Ir a una sección de esta página</a>
```

El ejemplo ejecutable está en [tema4_enlaces_y_navegacion.html](tema4_enlaces_y_navegacion.html).
