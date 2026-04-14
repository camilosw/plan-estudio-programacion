# Tema 13: Responsive design y media queries

## Objetivo

Hacer que la página se adapte a diferentes tamaños de pantalla
(celular, tablet, escritorio) usando media queries.

## Explicación

El diseño responsive es como un mueble que se adapta al espacio:
en un departamento pequeño los estantes se apilan verticalmente;
en una casa grande se ponen uno al lado del otro. El contenido es
el mismo, pero la organización cambia según el espacio disponible.

### Meta viewport

Sin la etiqueta meta viewport, los dispositivos móviles muestran la
página a escala de escritorio (muy pequeña). El meta viewport le dice
al navegador que use el ancho real del dispositivo:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

### Media queries

Las media queries aplican estilos solo cuando se cumple una condición:

```css
@media (min-width: 768px) { ... }  /* aplica si la pantalla tiene 768px o más */
```

### Estrategia "mobile first"

Primero se escribe el CSS para móvil (pantallas pequeñas).
Luego se usa `@media (min-width: ...)` para agregar estilos para pantallas
más grandes. Es más fácil "agregar" complejidad que "quitar".

### Breakpoints comunes

```css
/* BASE (móvil): CSS sin media query */
.contenedor-tarjetas {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* TABLET: 768px o más */
@media (min-width: 768px) {
  .contenedor-tarjetas {
    flex-direction: row;
    flex-wrap: wrap;
  }
  .tarjeta-producto {
    flex: 0 0 calc(50% - 8px); /* 2 por fila */
  }
}

/* DESKTOP: 1024px o más */
@media (min-width: 1024px) {
  .tarjeta-producto {
    flex: 0 0 calc(33.333% - 16px); /* 3 por fila */
  }
}
```

### Imágenes fluidas

```css
img {
  max-width: 100%;
  height: auto;
}
```

El ejemplo ejecutable está en [tema13_responsive_y_media_queries.html](tema13_responsive_y_media_queries.html)
y su CSS en [estilos_tema13.css](estilos_tema13.css).
