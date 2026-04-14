# Tema 12: Flexbox — Distribuir elementos fácilmente

## Objetivo

Aprender a distribuir y alinear elementos en una fila o columna
usando el sistema de layout Flexbox de CSS.

## Explicación

Flexbox es como organizar productos en un estante:

- Puedes elegir si van en fila o en columna (`flex-direction`).
- Puedes repartirlos: juntos a la izquierda, al centro, a la derecha,
  o con espacio equitativo entre ellos (`justify-content`).
- Puedes alinearlos verticalmente: al tope, al centro, abajo (`align-items`).
- Si no caben en una fila, pueden pasar a la siguiente (`flex-wrap: wrap`).
- Con `gap` defines el espacio entre elementos sin necesitar margins.

Para usar flexbox, se aplica `display: flex` al contenedor (el padre).
Los hijos se convierten automáticamente en "flex items".

### Propiedades del contenedor flex

```css
.contenedor {
  display: flex;
  flex-direction: row; /* row (por defecto) | column */
  justify-content: space-between; /* flex-start | center | flex-end | space-between | space-around */
  align-items: center; /* stretch | flex-start | center | flex-end */
  flex-wrap: wrap; /* nowrap (por defecto) | wrap */
  gap: 24px; /* espacio entre filas y columnas */
}
```

### Propiedades de los flex items (hijos)

```css
.tarjeta-producto {
  flex: 0 0 260px;
} /* no crece, no encoge, base de 260px */
.columna {
  flex: 1;
} /* crece y encoge, tamaño flexible */
```

### Ejemplo: header con logo y nav

```css
header {
  display: flex;
  justify-content: space-between; /* logo a la izquierda, nav a la derecha */
  align-items: center;
}
```

El ejemplo ejecutable está en [tema12_flexbox.html](tema12_flexbox.html)
y su CSS en [estilos_tema12.css](estilos_tema12.css).
