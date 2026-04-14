# Plan de Estudios: HTML y CSS

## Contexto

Aprender a crear páginas web desde cero. El plan va de lo más básico a un nivel intermedio. Se usa **La Cafetería de Sandra** como hilo conductor: desde una página simple con texto hasta un sitio completo, con estilos y diseño responsive.

---

## Estructura del plan

Cada tema sigue el formato:

1. **Explicación** breve del concepto, siempre con una analogía del mundo real
2. **Ejemplo de código** en el contexto de la cafetería
3. **Ejercicio práctico** para que la alumna resuelva

---

## Tema 1: Estructura básica de una página web

**Objetivo:** Entender que una página web es un archivo de texto con etiquetas HTML que el navegador interpreta.

**Explicación:** Una página web es como una carta: tiene un sobre con información que no se ve (el `<head>`, que incluye el título de la pestaña y la codificación de caracteres) y el contenido de la carta en sí (el `<body>`, lo que se muestra en pantalla). Las etiquetas HTML son instrucciones de formato que el navegador lee para saber cómo mostrar el contenido. Toda página necesita una estructura mínima para funcionar bien.

**Ejemplo:**

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>La Cafetería de Sandra</title>
</head>
<body>
    <p>Bienvenidos a La Cafetería de Sandra.</p>
</body>
</html>
```

**Ejercicio:**
Crear un archivo `ejercicio1_estructura_basica.html` con la estructura básica completa. Incluir un título visible en la pestaña del navegador y un párrafo de bienvenida. Abrirlo en el navegador y verificar que el título aparece en la pestaña y el texto en la página.

---

## Tema 2: Textos y encabezados

**Objetivo:** Aprender a estructurar el texto de una página usando encabezados y párrafos.

**Explicación:** Los encabezados son como los títulos de un libro: `<h1>` es el título principal del libro (solo debe haber uno por página), `<h2>` son los capítulos, `<h3>` las secciones dentro de cada capítulo. Esta jerarquía no solo organiza visualmente el contenido — también ayuda a los buscadores y a los lectores de pantalla a entender la estructura.

**Ejemplo:**

```html
<h1>La Cafetería de Sandra</h1>

<h2>Nuestra historia</h2>
<p>Desde 2010, ofrecemos el mejor café de la ciudad. Cada taza es preparada con <strong>granos seleccionados</strong> y mucho cariño.</p>

<h2>Horarios</h2>
<p>Lunes a viernes: 7:00 a 20:00<br>
Sábados y domingos: 8:00 a 22:00</p>

<hr>

<h2>Nuestra especialidad</h2>
<p>El café de temporada: <em>siempre diferente, siempre delicioso</em>.</p>
```

**Ejercicio:**
Crear `ejercicio2_textos_y_encabezados.html`. La página debe tener: un `<h1>` con el nombre de la cafetería, tres secciones con `<h2>` (historia, horarios, ubicación), párrafos con texto descriptivo en cada sección, al menos dos usos de `<strong>` y uno de `<em>`, y un `<hr>` entre secciones.

---

## Tema 3: Atributos HTML

**Objetivo:** Entender qué son los atributos, cómo se escriben dentro de las etiquetas y para qué sirven los más comunes.

**Explicación:** Los atributos son como las instrucciones adicionales que le das a una etiqueta. Si una etiqueta es una orden ("pon un enlace aquí"), el atributo es la especificación de esa orden ("...que vaya a esta dirección, y que se abra en una nueva pestaña"). Los atributos van siempre dentro de la etiqueta de apertura y tienen la forma `nombre="valor"`. Algunos atributos son globales (funcionan en cualquier etiqueta): `id` para identificar un elemento único, `class` para agrupar elementos con la misma etiqueta reutilizable, `title` para mostrar un globo de información al pasar el mouse. Otros atributos son propios de cada etiqueta: `href` en `<a>`, `src` y `alt` en `<img>`, `type` en `<input>`, etc.

**Ejemplo:**

```html
<!-- Atributo id: identificador único en la página -->
<h2 id="horarios">Horarios de atención</h2>

<!-- Atributo class: reutilizable en varios elementos -->
<p class="destacado">Café de temporada disponible.</p>
<p class="destacado">Croissants recién horneados.</p>

<!-- Atributo title: aparece como tooltip al pasar el mouse -->
<span title="Café cultivado a más de 1500 metros de altura">de especialidad</span>

<!-- Atributo booleano: su sola presencia activa la opción -->
<button disabled>Reservar mesa</button>

<!-- Varios atributos en una misma etiqueta -->
<img src="foto.jpg" alt="Interior del local" width="600" height="200">
```

**Ejercicio:**
Completar `ejercicio3_atributos.html`: agregar un `<h1>` con `id="nombre-cafeteria"`, dos párrafos de horarios con `class="horario"`, un `<span>` con `title` explicando qué es el "café de temporada", dos párrafos de novedades con `class="novedad"`, un botón desactivado con `disabled` y un botón activo, y una imagen con `src`, `alt`, `width` y `height`. Abrir en el navegador y verificar que el tooltip aparece al pasar el mouse sobre el span.

---

## Tema 4: Enlaces y navegación

**Objetivo:** Entender cómo conectar páginas entre sí y con sitios externos usando enlaces.

**Explicación:** Los enlaces son como las puertas de un edificio: algunas llevan a otra habitación del mismo edificio (enlaces internos, como `menu.html`) y otras llevan afuera a otro edificio (enlaces externos, como un mapa en Google Maps). El atributo `href` indica el destino. Con `target="_blank"` se abre en una nueva pestaña, útil para enlaces externos.

**Ejemplo:**

```html
<nav>
    <!-- Enlace interno: va a otra página del mismo sitio -->
    <a href="menu.html">Ver el menú</a>
    |
    <a href="contacto.html">Contacto</a>
</nav>

<p>Encuéntranos en <a href="https://maps.google.com" target="_blank">Google Maps</a>.</p>
```

**Ejercicio:**
Crear dos páginas: `ejercicio4_enlaces_y_navegacion.html` (la página principal) y una página de menú llamada `menu.html` en la misma carpeta. La página principal debe tener un enlace que lleve al menú y un enlace externo. La página del menú debe tener un enlace que regrese a la principal.

---

## Tema 5: Imágenes

**Objetivo:** Aprender a insertar imágenes y entender los atributos esenciales.

**Explicación:** Insertar una imagen es como pegar una foto en un álbum: hay que saber dónde está la foto (`src`) y escribir una descripción al pie para quien no puede verla (`alt`). El atributo `alt` es obligatorio: lo usan los lectores de pantalla para personas con discapacidad visual y los buscadores para entender el contenido. `<img>` es una etiqueta que no se cierra porque no envuelve contenido — solo referencia un archivo externo.

**Ejemplo:**

```html
<!-- Imagen con URL externa (placeholder) -->
<img src="https://placehold.co/800x300?text=La+Cafeteria" alt="Foto exterior de La Cafetería de Sandra" width="800" height="300">

<!-- Imagen de un producto del menú -->
<img src="https://placehold.co/300x200?text=Cappuccino" alt="Cappuccino con leche cremosa" width="300" height="200">
```

**Ejercicio:**
Agregar a la página del ejercicio anterior una imagen de encabezado con `src`, `alt`, `width` y `height`, y al menos dos imágenes de productos del menú. Cada imagen debe tener un `alt` descriptivo.

---

## Tema 6: Listas y tablas

**Objetivo:** Organizar información en listas y tablas.

**Explicación:** Una lista desordenada (`<ul>`) es como la lista de compras del supermercado: los elementos no tienen un orden específico. Una lista ordenada (`<ol>`) es como los pasos de una receta: el orden importa. Una tabla (`<table>`) es como una planilla de cálculo: organiza datos en filas y columnas. `<thead>` agrupa la fila de encabezados y `<tbody>` agrupa el contenido.

**Ejemplo:**

```html
<h2>Nuestras bebidas</h2>
<ul>
    <li>Cafés calientes
        <ul>
            <li>Espresso</li>
            <li>Cappuccino</li>
            <li>Latte</li>
        </ul>
    </li>
    <li>Bebidas frías
        <ul>
            <li>Café frappé</li>
            <li>Smoothie de frutas</li>
        </ul>
    </li>
</ul>

<h2>Lista de precios</h2>
<table>
    <thead>
        <tr>
            <th>Producto</th>
            <th>Tamaño</th>
            <th>Precio</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Espresso</td>
            <td>Simple</td>
            <td>$2.50</td>
        </tr>
        <tr>
            <td>Cappuccino</td>
            <td>Mediano</td>
            <td>$4.00</td>
        </tr>
    </tbody>
</table>
```

**Ejercicio:**
Crear `ejercicio6_listas_y_tablas.html` con: una lista ordenada de los 3 cafés más vendidos, una lista desordenada de todas las bebidas organizadas por categoría (con sublistas), y una tabla de precios con al menos 5 productos y las columnas: Producto, Tamaño, Precio.

---

## Tema 7: CSS — Primeros pasos

**Objetivo:** Entender que CSS es el lenguaje que controla la apariencia visual del HTML, y conocer las tres formas de agregarlo.

**Explicación:** Si HTML es la estructura de una casa (paredes, puertas, ventanas), CSS es la decoración (pintura, cortinas, muebles). Una misma estructura puede tener decoraciones muy diferentes. Las tres formas de agregar CSS son como: pintar directamente sobre un ladrillo (inline — no recomendado, difícil de mantener), tener las instrucciones de pintura dentro del plano de la casa (interno — útil para páginas únicas), o tener un documento separado con todas las instrucciones de decoración (externo — lo mejor, porque un solo archivo de estilos se aplica a todas las páginas).

**Ejemplo:**

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>La Cafetería de Sandra</title>

    <!-- Opción 2: CSS interno (en el head) -->
    <style>
        body {
            background-color: #f5f0eb;
        }
        h1 {
            color: #5c3317;
            font-size: 36px;
        }
        p {
            font-size: 16px;
        }
    </style>
</head>
<body>
    <!-- Opción 1: CSS inline (directamente en la etiqueta) -->
    <h2 style="color: green;">Horarios</h2>

    <h1>La Cafetería de Sandra</h1>
    <p>El mejor café de la ciudad.</p>

    <!-- Opción 3: CSS externo (se verá a partir del Tema 7) -->
    <!-- <link rel="stylesheet" href="estilos.css"> -->
</body>
</html>
```

**Ejercicio:**
Tomar la página del ejercicio anterior y agregarle estilos: un estilo inline en algún elemento, y un bloque `<style>` en el `<head>` que cambie el color de fondo del body, el color de los encabezados y el tamaño del texto de los párrafos.

---

## Tema 8: Selectores y colores

**Objetivo:** Aprender a seleccionar elementos específicos para darles estilo, y conocer las formas de definir colores en CSS.

**Explicación:** Los selectores son como dar instrucciones a un pintor. "Pinta todas las puertas de azul" es un selector de etiqueta (`a { color: blue }`). "Pinta las puertas que tienen un cartel de 'principal'" es un selector de clase (`.principal { color: red }`). "Pinta únicamente la puerta del salón número 5" es un selector de ID (`#salon5 { color: gold }`). Las clases se pueden repetir en múltiples elementos; el ID debe ser único en la página. Los colores se pueden escribir por nombre (`red`), en hexadecimal (`#FF0000`) o con RGB (`rgb(255, 0, 0)`).

**Ejemplo (HTML):**

```html
<link rel="stylesheet" href="estilos_tema7.css">

<h1 id="titulo-principal">La Cafetería de Sandra</h1>

<section class="seccion-historia">
    <h2>Nuestra historia</h2>
    <p>Desde 2010, ofrecemos el mejor café de la ciudad.</p>
</section>

<section class="seccion-menu">
    <h2>Nuestros productos</h2>
    <p class="destacado">¡Nuevo! Café de temporada disponible.</p>
</section>
```

**Ejemplo (estilos_tema7.css):**

```css
/* Selector de etiqueta: aplica a todos los elementos h2 */
h2 {
    color: #5c3317; /* Hexadecimal: marrón */
}

/* Selector de ID: aplica solo al elemento con id="titulo-principal" */
#titulo-principal {
    color: rgb(92, 51, 23); /* RGB: el mismo marrón */
    font-size: 40px;
}

/* Selector de clase: aplica a todos los elementos con class="destacado" */
.destacado {
    color: green;
    font-size: 18px;
}

/* Selector de clase: aplica a la sección del menú */
.seccion-menu {
    background-color: #fff8f0; /* Hexadecimal: crema muy suave */
}
```

**Ejercicio:**
Crear `ejercicio8_selectores_y_colores.html` con su archivo `estilos_ejercicio8.css`. El HTML debe tener al menos dos clases distintas y un ID. El CSS debe usar colores en los tres formatos (nombre, hexadecimal y RGB) y aplicar estilos diferentes a cada sección.

---

## Tema 9: Tipografía y estilos de texto

**Objetivo:** Controlar la apariencia del texto: fuente, tamaño, espaciado, alineación y decoración.

**Explicación:** La tipografía de una página web es como la caligrafía de un cartel: un cartel de cafetería elegante usa una letra diferente a un cartel de liquidación. La fuente, el tamaño y el espaciado cambian completamente cómo se percibe el mensaje. Con Google Fonts se pueden usar fuentes de diseño sin instalar nada — solo se agrega un `<link>` en el `<head>`. Las unidades de tamaño: `px` es un tamaño fijo en píxeles; `em` es relativo al tamaño del elemento padre; `rem` es relativo al tamaño base del documento (más predecible y recomendado).

**Ejemplo:**

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Lato:wght@400;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="estilos_tema8.css">
```

```css
/* Fuente elegante para títulos */
h1, h2 {
    font-family: 'Playfair Display', serif;
    text-align: center;
}

/* Fuente legible para el texto general */
body {
    font-family: 'Lato', sans-serif;
    font-size: 16px; /* tamaño base */
    line-height: 1.6;
}

p {
    font-size: 1rem; /* igual al tamaño base: 16px */
    text-align: justify;
    letter-spacing: 0.02em;
}

.precio {
    font-size: 1.25rem; /* 25% más grande que la base */
    font-weight: 700;
    text-decoration: none;
}
```

**Ejercicio:**
Crear `ejercicio9_tipografia_y_textos.html` con dos fuentes de Google Fonts: una para los títulos, otra para el texto. Aplicarlas con CSS externo. Centrar los títulos, justificar los párrafos, ajustar `line-height` a 1.6 y usar `rem` para los tamaños de fuente.

---

## Tema 10: El modelo de caja — margin, padding, border

**Objetivo:** Entender que todo elemento HTML es una caja con contenido, relleno, borde y margen.

**Explicación:** Cada elemento HTML es como un cuadro enmarcado en una exposición de arte: el contenido es la pintura, el `padding` es el espacio entre la pintura y el marco (el paspartú), el `border` es el marco, y el `margin` es la distancia entre el cuadro y la pared o entre un cuadro y el siguiente. Con `box-sizing: border-box` le indicamos al navegador que el `width` que definimos incluye el padding y el border — esto hace que los tamaños sean más predecibles.

**Ejemplo:**

```css
/* Buena práctica: aplicar a todos los elementos */
* {
    box-sizing: border-box;
}

.tarjeta-producto {
    width: 250px;
    padding: 20px;           /* espacio interno: 20px en los 4 lados */
    border: 1px solid #ccc;  /* borde de 1px */
    border-radius: 8px;      /* esquinas redondeadas */
    margin: 16px;            /* espacio externo: 16px en los 4 lados */
}

/* Padding y margin por lados: arriba, derecha, abajo, izquierda */
.encabezado {
    padding: 40px 20px 40px 20px;
    margin-bottom: 32px;
}
```

**Ejercicio:**
Crear `ejercicio10_modelo_de_caja.html` con tres tarjetas de producto. Cada tarjeta debe tener `border`, `border-radius`, `padding` interno y `margin` entre tarjetas. Aplicar `box-sizing: border-box` a todos los elementos. Inspeccionar una tarjeta con las DevTools del navegador (F12 → seleccionar el elemento) y verificar los valores del box model.

---

## Tema 11: Display y posición

**Objetivo:** Entender la diferencia entre elementos en bloque y en línea, y cómo cambiar su comportamiento.

**Explicación:** Los elementos en bloque (`display: block`) son como cajas de mudanza apiladas una encima de otra: cada una ocupa toda la fila aunque su contenido sea pequeño. Los elementos en línea (`display: inline`) son como palabras en un renglón: se ponen uno al lado del otro. `display: inline-block` combina ambos: se alinea al lado de otros elementos pero acepta `width` y `height`, como un libro en un estante. `display: none` oculta el elemento completamente, como si no existiera.

**Ejemplo:**

```css
/* Los <li> son block por defecto; los hacemos inline-block para un menú horizontal */
nav ul {
    list-style: none;
    padding: 0;
}

nav ul li {
    display: inline-block;
    margin-right: 16px;
}

/* Posicionamiento: el contenedor padre necesita position: relative */
.tarjeta {
    position: relative; /* referencia para el hijo absoluto */
    display: inline-block;
}

/* El badge se posiciona respecto al contenedor padre */
.badge-nuevo {
    position: absolute;
    top: 8px;
    right: 8px;
    background-color: red;
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.75rem;
}
```

**Ejercicio:**
Crear `ejercicio11_display_y_posicion.html` con: un menú de navegación horizontal usando `display: inline-block` en los ítems de una lista, y una tarjeta de producto con un badge "Nuevo" posicionado con `position: absolute` en una esquina. También incluir un párrafo oculto con `display: none`.

---

## Tema 12: Flexbox — Distribuir elementos fácilmente

**Objetivo:** Aprender a distribuir y alinear elementos con Flexbox, el sistema de layout moderno de CSS.

**Explicación:** Flexbox es como organizar productos en un estante: puedes elegir si van en fila o en columna (`flex-direction`), si se agrupan a la izquierda, al centro o se reparten equitativamente (`justify-content`), y si se alinean arriba, al medio o abajo (`align-items`). Con `gap` se pone espacio entre los elementos sin necesitar margins. Con `flex-wrap: wrap` los elementos que no caben en una fila pasan automáticamente a la siguiente.

**Ejemplo:**

```css
/* Header: logo a la izquierda, navegación a la derecha */
header {
    display: flex;
    justify-content: space-between; /* extremos opuestos */
    align-items: center;            /* centrado vertical */
    padding: 16px 32px;
}

/* Contenedor de tarjetas: fila, centrado, con espacio entre tarjetas */
.contenedor-productos {
    display: flex;
    flex-wrap: wrap;     /* pasa a la siguiente fila si no caben */
    justify-content: center;
    gap: 24px;
    padding: 32px;
}

/* Cada tarjeta: ancho fijo para que quepan 3 por fila en pantallas grandes */
.tarjeta-producto {
    flex: 0 0 280px; /* no crece, no encoge, base de 280px */
}
```

**Ejercicio:**
Rediseñar la página de la cafetería usando flexbox: un header con el nombre de la cafetería a la izquierda y la navegación a la derecha, una sección de productos con tres tarjetas en fila (que se reorganicen con `flex-wrap`), y un footer con información distribuida en tres columnas.

---

## Tema 13: Responsive design y media queries

**Objetivo:** Hacer que la página se adapte a diferentes tamaños de pantalla.

**Explicación:** El diseño responsive es como un mueble que se adapta al espacio: en un departamento pequeño los estantes se apilan verticalmente; en una casa grande se ponen uno al lado del otro. El contenido es el mismo, pero la organización cambia según el espacio disponible. El `<meta name="viewport">` es imprescindible para que los dispositivos móviles no reduzcan la página al tamaño de escritorio. Las media queries aplican estilos solo cuando se cumple una condición (como "la pantalla tiene menos de 600px").

**Ejemplo:**

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

```css
/* Estilos base (mobile first: primero el diseño para móvil) */
.contenedor-productos {
    display: flex;
    flex-direction: column; /* una tarjeta por fila en móvil */
    gap: 16px;
}

/* Tablet: 768px o más */
@media (min-width: 768px) {
    .contenedor-productos {
        flex-direction: row;
        flex-wrap: wrap;
    }
    .tarjeta-producto {
        flex: 0 0 calc(50% - 8px); /* 2 tarjetas por fila */
    }
}

/* Desktop: 1024px o más */
@media (min-width: 1024px) {
    .tarjeta-producto {
        flex: 0 0 calc(33.333% - 16px); /* 3 tarjetas por fila */
    }
}

/* Las imágenes siempre ocupan el 100% de su contenedor */
img {
    max-width: 100%;
    height: auto;
}
```

**Ejercicio:**
Agregar el meta `viewport` a la página y crear media queries para tres breakpoints: móvil (base, una columna), tablet (min-width: 768px, dos columnas) y desktop (min-width: 1024px, tres columnas). La navegación debe apilarse verticalmente en móvil. Probar redimensionando la ventana del navegador.

---

## Tema 14: Formularios

**Objetivo:** Crear formularios interactivos para que los usuarios envíen información.

**Explicación:** Un formulario web es como un formulario en papel: tiene campos para completar (`<input>`), opciones para elegir (`<select>`, `<radio>`, `<checkbox>`) y un botón para enviar (`<button type="submit">`). El `<label>` vincula la descripción al campo correspondiente, lo que mejora la accesibilidad. El atributo `required` marca el campo como obligatorio — el navegador lo valida antes de enviar.

**Ejemplo:**

```html
<form action="#" method="post">

    <label for="nombre">Nombre completo</label>
    <input type="text" id="nombre" name="nombre" placeholder="Sandra García" required>

    <label for="email">Correo electrónico</label>
    <input type="email" id="email" name="email" placeholder="sandra@ejemplo.com" required>

    <label for="consulta">Tipo de consulta</label>
    <select id="consulta" name="consulta">
        <option value="reserva">Reserva de mesa</option>
        <option value="catering">Catering para evento</option>
        <option value="otro">Otro</option>
    </select>

    <label for="mensaje">Mensaje</label>
    <textarea id="mensaje" name="mensaje" rows="4" placeholder="Escribe tu mensaje aquí..."></textarea>

    <label>
        <input type="checkbox" name="terminos" required>
        Acepto los términos y condiciones
    </label>

    <button type="submit">Enviar mensaje</button>

</form>
```

```css
input, select, textarea {
    width: 100%;
    padding: 10px 14px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 1rem;
    margin-bottom: 16px;
}

button[type="submit"] {
    background-color: #5c3317;
    color: white;
    padding: 12px 24px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
}

button[type="submit"]:hover {
    background-color: #7a4628;
}
```

**Ejercicio:**
Crear `ejercicio14_formularios.html` con una página de contacto para la cafetería. El formulario debe incluir: nombre y email (obligatorios), teléfono (opcional), selector de tipo de consulta, campo de mensaje, checkbox de términos y condiciones, y botón de enviar. Estilizar el formulario con CSS externo para que sea consistente con el diseño del sitio. El formulario debe ser responsive.

---

## Tema 15: Proyecto integrador — Sitio web completo de La Cafetería

**Objetivo:** Integrar todos los conceptos aprendidos en un sitio web completo de varias páginas.

**Ejercicio final:**
Construir el sitio completo de **La Cafetería de Sandra** con cuatro páginas y un archivo CSS externo compartido:

Páginas a crear:
1. `index.html` — Página principal con imagen de encabezado, bienvenida y sección de destacados
2. `menu.html` — Menú con listas de bebidas por categoría y tabla de precios
3. `nosotros.html` — Historia de la cafetería y el equipo
4. `contacto.html` — Formulario de contacto

Requisitos mínimos del sitio:
- Navegación funcional entre las cuatro páginas
- Un archivo CSS externo (`estilos.css`) compartido por todas las páginas
- Header y footer consistentes en todas las páginas
- Al menos tres imágenes con atributo `alt`
- Una tabla de precios en la página de menú
- Una lista de productos con sublistas
- El formulario de contacto completo
- Layout con flexbox en el header y en la sección de destacados
- Diseño responsive para móvil y desktop (media queries)
- Tipografía con Google Fonts
- Colores consistentes en todo el sitio

---

## Resumen de progresión

| Tema | Concepto clave          | Lo que aprende                                          |
| ---- | ----------------------- | ------------------------------------------------------- |
| 1    | Estructura HTML         | `<!DOCTYPE>`, `<html>`, `<head>`, `<body>`, abrir en el navegador |
| 2    | Textos y encabezados    | `<h1>`-`<h6>`, `<p>`, `<strong>`, `<em>`, jerarquía de contenido |
| 3    | Atributos HTML          | `id`, `class`, `title`, atributos booleanos, sintaxis `nombre="valor"` |
| 4    | Enlaces                 | `<a href>`, navegación entre páginas, `target="_blank"` |
| 5    | Imágenes                | `<img>`, `src`, `alt`, `width`, `height`                |
| 6    | Listas y tablas         | `<ul>`, `<ol>`, `<li>`, `<table>`, `<tr>`, `<th>`, `<td>` |
| 7    | CSS primeros pasos      | inline, interno, externo; `color`, `background-color`, `font-size` |
| 8    | Selectores y colores    | `.clase`, `#id`, colores en nombre/hex/RGB, archivo CSS externo |
| 9    | Tipografía              | `font-family`, Google Fonts, `px`/`em`/`rem`, `text-align`, `line-height` |
| 10   | Modelo de caja          | `margin`, `padding`, `border`, `box-sizing`, DevTools   |
| 11   | Display                 | `block`, `inline`, `inline-block`, `position: relative/absolute` |
| 12   | Flexbox                 | `display: flex`, `justify-content`, `align-items`, `gap`, `flex-wrap` |
| 13   | Responsive              | `@media`, breakpoints, `viewport`, `max-width`, mobile first |
| 14   | Formularios             | `<form>`, `<input>`, `<select>`, `<label>`, `required`  |
| 15   | Integración             | Sitio completo de cuatro páginas                        |

---

## Archivos a crear

**Teoría** (`html-y-css/teoría/`):
- `tema1_estructura_basica.html`
- `tema2_textos_y_encabezados.html`
- `tema3_atributos.html`
- `tema4_enlaces_y_navegacion.html`
- `tema5_imagenes.html`
- `tema6_listas_y_tablas.html`
- `tema7_css_primeros_pasos.html`
- `tema8_selectores_y_colores.html` + `estilos_tema8.css`
- `tema9_tipografia_y_textos.html` + `estilos_tema9.css`
- `tema10_modelo_de_caja.html` + `estilos_tema10.css`
- `tema11_display_y_posicion.html` + `estilos_tema11.css`
- `tema12_flexbox.html` + `estilos_tema12.css`
- `tema13_responsive_y_media_queries.html` + `estilos_tema13.css`
- `tema14_formularios.html` + `estilos_tema14.css`
- `tema15_proyecto_integrador.html` + `estilos_tema15.css`

**Ejercicios** (`html-y-css/ejercicios/`):
- `ejercicio1_estructura_basica.html`
- `ejercicio2_textos_y_encabezados.html`
- `ejercicio3_atributos.html`
- `ejercicio4_enlaces_y_navegacion.html`
- `ejercicio5_imagenes.html`
- `ejercicio6_listas_y_tablas.html`
- `ejercicio7_css_primeros_pasos.html`
- `ejercicio8_selectores_y_colores.html` + `estilos_ejercicio8.css`
- `ejercicio9_tipografia_y_textos.html` + `estilos_ejercicio9.css`
- `ejercicio10_modelo_de_caja.html` + `estilos_ejercicio10.css`
- `ejercicio11_display_y_posicion.html` + `estilos_ejercicio11.css`
- `ejercicio12_flexbox.html` + `estilos_ejercicio12.css`
- `ejercicio13_responsive_y_media_queries.html` + `estilos_ejercicio13.css`
- `ejercicio14_formularios.html` + `estilos_ejercicio14.css`
- `ejercicio15_proyecto_integrador/` (carpeta con index.html, menu.html, nosotros.html, contacto.html, estilos.css)

## Verificación

- Cada archivo HTML debe abrirse en el navegador sin errores y mostrar el resultado descrito en los comentarios
- A partir del Tema 7, el archivo CSS externo debe cargarse correctamente (verificar en las DevTools que no hay errores de red)
- El formulario del Tema 13 debe validar los campos requeridos antes de enviarse
- El proyecto integrador debe funcionar con navegación completa entre las cuatro páginas
