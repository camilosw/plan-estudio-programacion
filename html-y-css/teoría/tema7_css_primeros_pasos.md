# Tema 7: CSS — Primeros pasos

## Objetivo

Entender que CSS es el lenguaje que controla la apariencia visual
del HTML, y conocer las tres formas de agregarlo a una página.

## Explicación

Si HTML es la estructura de una casa (paredes, puertas, ventanas),
CSS es la decoración (pintura, cortinas, muebles). Una misma
estructura HTML puede tener decoraciones completamente distintas.

CSS significa "Cascading Style Sheets" (Hojas de estilo en cascada).
La sintaxis básica es:

```css
selector {
  propiedad: valor;
}
```

Por ejemplo:

```css
h1 {
  color: blue;
  font-size: 36px;
}
```

### Las tres formas de agregar CSS

**1. Inline (en la etiqueta)**

Se escribe directamente con el atributo `style=""`.
Problema: es difícil de mantener, mezcla estructura con presentación.
Uso: raramente, solo para pruebas rápidas o estilos muy específicos.

```html
<h2 style="color: #a0522d;">Horarios de atención</h2>
```

**2. Interno (en el `<head>`)**

Se escribe dentro de `<style>` en el `<head>` del documento.
Ventaja: todo en un solo archivo. Limitación: solo afecta a esa página.
Uso: páginas únicas o prototipos.

```html
<head>
  <style>
    body {
      background-color: #f5f0eb;
    }
    h1 {
      color: #5c3317;
      font-size: 36px;
    }
  </style>
</head>
```

**3. Externo (archivo `.css` separado)**

Se crea un archivo `.css` separado y se vincula con `<link>`.
Ventaja: un archivo de estilos se aplica a todas las páginas del sitio.
Uso: cualquier sitio con más de una página (lo recomendado).

```html
<link rel="stylesheet" href="estilos.css" />
```

A partir del Tema 7 se trabajará siempre con CSS externo.

### Propiedades introducidas en este tema

- `color`: color del texto
- `background-color`: color de fondo del elemento
- `font-size`: tamaño del texto (en píxeles o %)

El ejemplo ejecutable está en [tema7_css_primeros_pasos.html](tema7_css_primeros_pasos.html).
