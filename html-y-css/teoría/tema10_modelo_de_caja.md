# Tema 10: El modelo de caja — margin, padding, border

## Objetivo

Entender que todo elemento HTML es una caja con contenido,
relleno, borde y margen exterior.

## Explicación

Cada elemento HTML es como un cuadro enmarcado en una exposición:

- El **contenido** es la pintura (el texto, la imagen).
- El **padding** es el paspartú: el espacio entre la pintura y el marco.
- El **border** es el marco que rodea el contenido.
- El **margin** es la distancia entre el cuadro y la pared o entre
  un cuadro y el siguiente.

### box-sizing: border-box

Por defecto, cuando defines `width: 250px`, solo mides el contenido.
El padding y el border se suman por fuera, haciendo que el elemento
sea más grande de lo esperado. Con `box-sizing: border-box` le dices
al navegador que el `width` incluya el padding y el border, lo que
hace que los tamaños sean predecibles.

```css
* {
  box-sizing: border-box;
}
```

### Sintaxis de margin y padding

```css
margin: 16px; /* igual en los 4 lados */
margin: 16px 8px; /* arriba/abajo | izquierda/derecha */
margin: 16px 8px 16px 8px; /* arriba | derecha | abajo | izquierda */
```

### Propiedades del modelo de caja

```css
.tarjeta-producto {
  width: 260px;
  padding: 16px;
  border: 1px solid #d4a07a;
  border-radius: 8px; /* esquinas redondeadas */
  margin: 16px;
  box-sizing: border-box;
}
```

**Tip:** Para inspeccionar el box model, abre las DevTools (F12),
selecciona un elemento y busca el diagrama de caja en la pestaña
"Computed" o en la parte inferior del panel "Styles".

El ejemplo ejecutable está en [tema10_modelo_de_caja.html](tema10_modelo_de_caja.html)
y su CSS en [estilos_tema10.css](estilos_tema10.css).
