# Ejercicio 1: ¿Qué es una base de datos relacional?

## Objetivo

Reflexionar sobre el concepto de base de datos relacional y diseñar en papel el esquema de la biblioteca antes de crear nada en la computadora.

---

## Instrucciones

### Parte 1: Análisis de dominio

Imagina que tienes una biblioteca personal y necesitas organizar la información en una base de datos.

Responde estas preguntas (puedes escribir las respuestas en un cuaderno o en un archivo de texto):

1. ¿Qué tipos de "cosas" necesitas guardar en tu biblioteca? Lista al menos cuatro.
   (Pista: libros, autores, socios... ¿qué más?)

2. Para cada tipo, anota qué información necesitas guardar de cada uno.
   Por ejemplo: de un libro, ¿qué campos son importantes?

3. ¿Cuáles de esos tipos están relacionados entre sí? ¿Cómo?
   Por ejemplo: un libro tiene un autor. ¿Cuántos libros puede tener un autor?

### Parte 2: Diseño del esquema

Dibuja (en papel o en texto plano) las tablas que necesitaría tu biblioteca con:

- Nombre de la tabla
- Columnas con su tipo de dato aproximado
- Cuál sería la clave primaria de cada tabla
- Cómo se relacionan las tablas entre sí (dibuja una flecha entre ellas)

No hace falta que sea perfecto. El objetivo es pensar antes de escribir código.

### Parte 3: Comparar con el módulo

Compara tu diseño con el esquema que usaremos en el módulo:

    autores          (id, nombre, pais, anio_nacimiento)
    libros           (id, titulo, autor_id, anio_publicacion, paginas, disponible)
    categorias       (id, nombre)
    libros_categorias (libro_id, categoria_id)
    socios           (id, nombre, email, telefono, fecha_registro, activo)
    prestamos        (id, libro_id, socio_id, fecha_prestamo, fecha_devolucion)

Responde:

1. ¿Qué tablas coinciden con lo que diseñaste?
2. ¿Hay alguna tabla en el esquema del módulo que no se te había ocurrido? ¿Para qué sirve?
3. ¿Por qué crees que `libros_categorias` existe como tabla separada en vez de poner las categorías directamente en `libros`?

---

## Verificación

No hay comandos que ejecutar en este ejercicio. La verificación es conceptual:

- ¿Puedes explicar con tus palabras qué es una tabla, una fila y una columna?
- ¿Puedes dar un ejemplo de relación 1:N y uno de relación N:M usando el dominio de la biblioteca?
- ¿Puedes nombrar dos razones por las que elegimos MariaDB para este módulo?
