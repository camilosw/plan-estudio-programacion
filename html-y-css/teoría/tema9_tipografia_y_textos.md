# Tema 9: Tipografía y estilos de texto

## Objetivo

Controlar la apariencia del texto: fuente, tamaño, peso,
espaciado, alineación y decoración.

## Explicación

La tipografía de una página web es como la caligrafía de un cartel:
un cartel de cafetería elegante usa una letra diferente a un cartel
de liquidación. La fuente, el tamaño y el espaciado cambian
completamente cómo se percibe el mensaje.

### Google Fonts

Google Fonts permite usar fuentes de diseño sin instalar nada:
solo se agrega un `<link>` en el `<head>` y la fuente está disponible.

1. Ir a `fonts.google.com` y elegir una fuente.
2. Copiar el `<link>` que Google proporciona.
3. En el CSS, usar `font-family: 'Nombre de la fuente', fallback;`

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link
  href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap"
  rel="stylesheet"
/>
```

```css
h1 {
  font-family: "Playfair Display", serif;
}
```

### Unidades de tamaño de texto

- `px`: tamaño fijo en píxeles. Independiente del contexto.
  Ejemplo: `font-size: 16px`
- `em`: relativo al tamaño del elemento padre.
  Si el padre tiene 16px, `1.5em` = 24px.
  Puede volverse confuso cuando se anidan elementos.
- `rem` (root em): relativo al tamaño base del `<html>`.
  Si el html tiene 16px, `1.5rem` = 24px siempre.
  Más predecible y recomendado para tamaños de texto.

### Propiedades de tipografía

```css
p {
  font-family: "Lato", sans-serif;
  font-size: 1rem;
  font-weight: 400; /* 400 = normal, 700 = negrita */
  font-style: italic;
  text-align: justify; /* left | center | right | justify */
  text-decoration: none; /* none | underline | line-through */
  line-height: 1.6; /* espaciado entre líneas */
  letter-spacing: 0.05em; /* espaciado entre letras */
}
```

El ejemplo ejecutable está en [tema9_tipografia_y_textos.html](tema9_tipografia_y_textos.html)
y su CSS en [estilos_tema9.css](estilos_tema9.css).
