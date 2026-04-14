# Tema 6: Listas y tablas

## Objetivo

Organizar información en listas (desordenadas y ordenadas)
y en tablas con filas y columnas.

## Explicación

### Listas

- `<ul>` (unordered list): lista con viñetas. Los elementos no tienen
  un orden específico, como las opciones de un menú.
- `<ol>` (ordered list): lista numerada. El orden importa, como los
  pasos de una receta.
- `<li>`: cada elemento de la lista (list item). Siempre va dentro de
  `<ul>` o `<ol>`. Las listas se pueden anidar (poner una dentro de otra).

### Tablas

Las tablas organizan datos en filas y columnas, como una planilla.

- `<table>`: el contenedor de toda la tabla.
- `<thead>`: agrupa la fila de encabezados de columna.
- `<tbody>`: agrupa las filas de datos.
- `<tr>` (table row): una fila de la tabla.
- `<th>` (table header): celda de encabezado (texto en negrita por defecto).
- `<td>` (table data): celda de datos normal.

## Código de ejemplo

```html
<ul>
  <li>Elemento sin orden</li>
  <li>
    Otro elemento
    <ul>
      <li>Sublista anidada</li>
    </ul>
  </li>
</ul>

<ol>
  <li>Primer paso</li>
  <li>Segundo paso</li>
</ol>

<table>
  <thead>
    <tr>
      <th>Columna 1</th>
      <th>Columna 2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Dato 1</td>
      <td>Dato 2</td>
    </tr>
  </tbody>
</table>
```

El ejemplo ejecutable está en [tema6_listas_y_tablas.html](tema6_listas_y_tablas.html).
