# Tema 11: Display y posición

## Objetivo

Entender la diferencia entre elementos en bloque y en línea,
y cómo cambiar su comportamiento con `display`.
Introducir `position: relative` y `position: absolute`.

## Explicación

### Display

- `block`: el elemento ocupa toda la fila. El siguiente elemento
  empieza debajo. Ejemplos: `<div>`, `<p>`, `<h1>`, `<ul>`, `<li>`.
- `inline`: el elemento solo ocupa el espacio de su contenido.
  Los elementos se colocan uno al lado del otro como palabras.
  No acepta `width` ni `height`. Ejemplos: `<span>`, `<a>`, `<strong>`.
- `inline-block`: se comporta como `inline` (se coloca al lado de otros)
  pero acepta `width`, `height`, `padding` y `margin` como `block`.
  Útil para botones o elementos en fila.
- `none`: oculta el elemento completamente. No ocupa espacio en la
  página, como si no existiera.

```css
nav ul li {
  display: inline-block;
  margin-right: 16px;
}
.oculto {
  display: none;
}
```

### Position

Por defecto todos los elementos tienen `position: static`, que significa
que siguen el flujo normal del documento.

- **`relative`**: el elemento permanece en el flujo normal, pero puedes
  moverlo usando `top`, `right`, `bottom`, `left` respecto a donde estaría
  normalmente. Además, se convierte en el "punto de referencia"
  para los hijos con `position: absolute`.

- **`absolute`**: el elemento sale del flujo normal y se posiciona
  respecto al ancestro más cercano con `position: relative` (o al
  `<body>` si no hay ninguno). Usar para badges, tooltips, etc.

```css
.tarjeta-producto {
  position: relative; /* referencia para el badge */
}

.badge-nuevo {
  position: absolute;
  top: 8px;
  right: 8px;
}
```

El ejemplo ejecutable está en [tema11_display_y_posicion.html](tema11_display_y_posicion.html)
y su CSS en [estilos_tema11.css](estilos_tema11.css).
