# Tema 8: Selectores y colores

## Objetivo

Aprender a seleccionar elementos específicos para darles estilo,
y conocer las formas de definir colores en CSS.

## Explicación

Los selectores son como instrucciones a un pintor:

**Selector de etiqueta**: "pinta todas las puertas de azul"

```css
h2 {
  color: blue;
}
```

Afecta a todos los elementos de ese tipo.

**Selector de clase**: "pinta las puertas que tienen el cartel 'especial'"

```css
.especial {
  color: red;
}
```

```html
<p class="especial">...</p>
```

Una clase se puede aplicar a múltiples elementos.

**Selector de ID**: "pinta únicamente la puerta del salón #5"

```css
#titulo-principal {
  font-size: 40px;
}
```

```html
<h1 id="titulo-principal">...</h1>
```

El ID debe ser único en toda la página (solo un elemento puede tener ese ID).

### Colores en CSS — tres formas equivalentes

```css
color: brown; /* Por nombre */
color: #5c3317; /* Hexadecimal: # + 6 dígitos */
color: rgb(92, 51, 23); /* RGB: rojo, verde, azul de 0 a 255 */
```

### CSS externo

A partir de este tema se usa siempre un archivo CSS externo, vinculado con:

```html
<link rel="stylesheet" href="estilos_tema7.css" />
```

El ejemplo ejecutable está en [tema8_selectores_y_colores.html](tema8_selectores_y_colores.html)
y su CSS en [estilos_tema8.css](estilos_tema8.css).
