# Tema 1: Estructura básica de una página web

## Objetivo

Entender que una página web es un archivo de texto con etiquetas HTML
que el navegador interpreta y convierte en contenido visual.

## Explicación

Una página web es como una carta: tiene un sobre con información que
no se ve directamente (el `<head>`, que contiene el título de la pestaña
y la codificación de caracteres) y el contenido de la carta en sí
(el `<body>`, lo que aparece en pantalla).

Las etiquetas HTML son instrucciones que el navegador lee:

- `<!DOCTYPE html>` le dice al navegador que este archivo sigue el
  estándar HTML5 (la versión moderna de HTML).
- `<html lang="es">` es la raíz del documento. El atributo `lang="es"`
  le indica al navegador que el contenido está en español.
- `<head>` contiene metadatos: información sobre la página que el
  navegador necesita pero que el usuario no ve.
- `<meta charset="UTF-8">` define la codificación de caracteres.
  Sin esto, las tildes y la ñ pueden verse mal.
- `<title>` define el texto que aparece en la pestaña del navegador.
- `<body>` contiene todo lo que se muestra en pantalla.

## Código de ejemplo

Esta es la estructura mínima de una página HTML:

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <!-- Codificación de caracteres: necesaria para tildes y ñ -->
    <meta charset="UTF-8" />

    <!-- Título que aparece en la pestaña del navegador -->
    <title>La Cafetería de Sandra</title>
  </head>
  <body>
    <!-- Todo lo que está aquí se muestra en pantalla -->
    <p>Bienvenidos a La Cafetería de Sandra.</p>
    <p>Estamos ubicados en el centro de la ciudad.</p>
  </body>
</html>
```

El ejemplo ejecutable está en [tema1_estructura_basica.html](tema1_estructura_basica.html).
