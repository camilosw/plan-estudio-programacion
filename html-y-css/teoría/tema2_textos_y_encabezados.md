# Tema 2: Textos y encabezados

## Objetivo

Aprender a estructurar el texto de una página usando encabezados
y párrafos, y entender la jerarquía de encabezados.

## Explicación

Los encabezados son como los títulos de un libro:

- `<h1>` es el título principal del libro. Debe haber solo uno por página.
- `<h2>` son los capítulos dentro del libro.
- `<h3>` son las secciones dentro de cada capítulo.
- `<h4>`, `<h5>`, `<h6>` siguen la misma lógica, pero se usan poco.

Esta jerarquía no solo organiza visualmente el contenido: también
ayuda a los buscadores (Google) y a los lectores de pantalla
para personas con discapacidad visual.

Otras etiquetas de texto:

- `<p>`: párrafo. Cada `<p>` agrega espacio antes y después.
- `<strong>`: texto importante (se muestra en negrita).
- `<em>`: texto con énfasis (se muestra en cursiva).
- `<br>`: salto de línea dentro de un párrafo.
- `<hr>`: línea horizontal divisoria.

## Código de ejemplo

```html
<h1>Título principal</h1>
<h2>Subtítulo</h2>
<p>
  Este es un párrafo con texto <strong>en negrita</strong> y
  <em>en cursiva</em>.
</p>
<br />
<hr />
```

El ejemplo ejecutable está en [tema2_textos_y_encabezados.html](tema2_textos_y_encabezados.html).
