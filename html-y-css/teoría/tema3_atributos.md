# Tema 3: Atributos HTML

## Objetivo

Entender qué son los atributos, cómo se escriben dentro de las etiquetas
y para qué sirven los más comunes.

## Explicación

Los atributos son pares `nombre="valor"` que se escriben dentro de la etiqueta
de apertura para configurar o describir el elemento. La etiqueta define *qué*
es el elemento; los atributos definen *cómo* se comporta o *qué información
adicional* lleva.

Por ejemplo, `<a>` define un enlace, pero sin el atributo `href` no sabría
a dónde llevar al usuario. `<img>` define una imagen, pero necesita `src`
para saber qué archivo mostrar y `alt` para describir su contenido.

### Sintaxis general

```html
<etiqueta atributo="valor">Contenido</etiqueta>
```

- Los atributos van **dentro de la etiqueta de apertura**, después del nombre de la etiqueta.
- Siempre tienen la forma `nombre="valor"`, con el valor entre comillas.
- Una misma etiqueta puede tener **varios atributos** a la vez.

### Atributos globales (funcionan en cualquier etiqueta)

- `id`: identificador único en la página. Solo puede haber un elemento con ese valor de `id`.
  Se usa para anclas (`href="#seccion"`), CSS (`#titulo`) y JavaScript.
  ```html
  <h2 id="horarios">Horarios de atención</h2>
  ```

- `class`: etiqueta reutilizable para grupos de elementos.
  Varios elementos pueden compartir la misma clase.
  Se usa principalmente para aplicar estilos CSS.
  ```html
  <p class="destacado">¡Nuevo! Café de temporada.</p>
  <p class="destacado">Croissants recién horneados.</p>
  ```

- `lang`: indica el idioma del contenido de ese elemento.
  Útil para lectores de pantalla y buscadores.
  ```html
  <p lang="en">Welcome to La Cafetería de Sandra.</p>
  ```

- `title`: texto que aparece como globo de información (tooltip)
  al pasar el mouse por encima del elemento.
  ```html
  <span title="Café cultivado a más de 1500m de altura">de especialidad</span>
  ```

- `style`: estilos CSS escritos directamente en el elemento (uso inline).
  Se usa solo en casos puntuales; lo veremos más adelante.

### Atributos sin valor (booleanos)

Algunos atributos no necesitan valor: su sola presencia activa la opción.

```html
<button disabled>Reservar mesa</button>
<!-- "disabled" desactiva el botón; no hace falta escribir disabled="disabled" -->

<input type="checkbox" checked>
<!-- "checked" marca el checkbox por defecto -->
```

### Atributos propios de cada etiqueta

Además de los atributos globales, cada etiqueta tiene los suyos:

| Etiqueta | Atributo | Para qué sirve |
|----------|----------|----------------|
| `<a>`    | `href`   | Destino del enlace |
| `<a>`    | `target` | Cómo abrir el enlace (`_blank` = nueva pestaña) |
| `<img>`  | `src`    | Ruta de la imagen |
| `<img>`  | `alt`    | Texto alternativo de la imagen |
| `<img>`  | `width`, `height` | Dimensiones en píxeles |
| `<input>` | `type`  | Tipo de campo (`text`, `email`, `checkbox`...) |
| `<input>` | `placeholder` | Texto de guía dentro del campo |
| `<input>` | `required` | Hace el campo obligatorio |

Estos se verán en detalle en sus temas correspondientes.

## Código de ejemplo

```html
<!-- Atributo id: identificador único -->
<h2 id="bienvenida">Bienvenidos</h2>

<!-- Atributo class: reutilizable en varios elementos -->
<p class="destacado">Café de temporada disponible.</p>
<p class="destacado">Croissants recién horneados.</p>

<!-- Atributo title: tooltip al pasar el mouse -->
<span title="Café cultivado a más de 1500 metros de altura">de especialidad</span>

<!-- Atributo booleano: solo su presencia activa la opción -->
<button disabled>Reservar mesa</button>

<!-- Varios atributos en una misma etiqueta -->
<img src="foto.jpg" alt="Interior del local" width="600" height="200">
```

El ejemplo ejecutable está en [tema3_atributos.html](tema3_atributos.html).
