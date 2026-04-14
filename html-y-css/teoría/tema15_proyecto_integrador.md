# Tema 15: Proyecto integrador — Sitio web completo de La Cafetería

## Objetivo

Integrar todos los conceptos aprendidos en un sitio web
completo de varias páginas.

## Conceptos integrados

- Estructura HTML básica (Tema 1)
- Textos, encabezados y listas (Temas 2, 5)
- Navegación entre páginas (Tema 3)
- Imágenes con alt (Tema 4)
- CSS externo con selectores, ID y clases (Tema 7)
- Tipografía con Google Fonts (Tema 8)
- Modelo de caja: padding, margin, border (Tema 9)
- Display inline-block y position (Tema 10)
- Flexbox para layout (Tema 11)
- Responsive con media queries (Tema 12)
- Formulario de contacto (Tema 13)

## Estructura del proyecto integrador

El proyecto completo vive en la carpeta
`html-y-css/ejercicios/ejercicio14_proyecto_integrador/`
y tiene la siguiente estructura:

```
ejercicio14_proyecto_integrador/
    index.html      → Página principal
    menu.html       → Menú con lista de bebidas y tabla de precios
    nosotros.html   → Historia del local y el equipo
    contacto.html   → Formulario de contacto
    estilos.css     → Un único CSS compartido por todas las páginas
```

La clave es que `estilos.css` es compartido: todas las páginas lo
incluyen con la misma línea `<link>`, por lo que los estilos son
consistentes en todo el sitio.

## Ejemplo de referencia

Este archivo de teoría muestra una versión de la página principal
(`index.html`) para tener como referencia visual al construir el ejercicio.

El ejemplo ejecutable está en [tema15_proyecto_integrador.html](tema15_proyecto_integrador.html)
y su CSS en [estilos_tema15.css](estilos_tema15.css).
