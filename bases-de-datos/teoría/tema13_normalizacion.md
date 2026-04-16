# TEMA 13: Normalización

## OBJETIVO
Diseñar tablas sin datos duplicados ni dependencias incorrectas, aplicando las tres primeras formas normales.

## EXPLICACIÓN

La normalización es un proceso de diseño que reduce la redundancia en las tablas. Una tabla mal diseñada repite información, lo que genera problemas:

- **Anomalía de inserción:** para agregar un libro necesitas repetir todos los datos del autor.
- **Anomalía de actualización:** si el país del autor cambia, hay que actualizarlo en cada fila del libro.
- **Anomalía de eliminación:** si eliminas el único libro de un autor, pierdes los datos del autor.

Las formas normales son reglas progresivas: 2FN incluye 1FN, 3FN incluye 2FN.

## EJEMPLO ANTES DE NORMALIZAR

Imagina que alguien diseña la tabla `libros_mal` así:

```
+--------+-----------+---------+----------+-----------+-------------------+------------------+
| titulo | pag | año | autor    | autor_pais | categoria1        | categoria2       |
+--------+-----------+---------+----------+-----------+-------------------+------------------+
| Cien años de soledad | 471 | 1967 | García M.| Colombia   | Novela | Lit. latinoamericana |
| El amor en... | 468 | 1985 | García M.| Colombia | Novela | NULL                 |
| Ficciones | 174 | 1944 | Borges   | Argentina  | Cuento            | Lit. latinoamericana |
+--------+-----------+---------+----------+-----------+-------------------+------------------+
```

Problemas evidentes:
- "García M." y "Colombia" se repiten en cada libro del mismo autor.
- Las categorías están en columnas fijas (categoria1, categoria2): ¿qué pasa si un libro tiene 4?
- No hay un identificador único para cada fila.

## PRIMERA FORMA NORMAL (1FN)

Reglas:
1. Cada columna contiene un único valor atómico (no listas ni grupos repetidos).
2. No hay columnas repetidas del mismo tipo (categoria1, categoria2...).
3. Hay una clave primaria que identifica de forma única cada fila.

La tabla `libros_mal` viola la 1FN porque tiene `categoria1` y `categoria2` (columnas repetidas).

Solución: una fila por cada combinación libro-categoría, con clave primaria.

```
libros_sin_normalizar_1fn:
+----+-----------------------+-----+------+-----------+-----------+-------------------+
| id | titulo                | pag | anio | autor     | autor_pais| categoria         |
+----+-----------------------+-----+------+-----------+-----------+-------------------+
|  1 | Cien años de soledad  | 471 | 1967 | García M. | Colombia  | Novela            |
|  2 | Cien años de soledad  | 471 | 1967 | García M. | Colombia  | Lit. latinoam.    |
|  3 | Ficciones             | 174 | 1944 | Borges    | Argentina | Cuento            |
|  4 | Ficciones             | 174 | 1944 | Borges    | Argentina | Lit. latinoam.    |
+----+-----------------------+-----+------+-----------+-----------+-------------------+
```

Ya cumple 1FN: no hay columnas repetidas y hay un id. Pero ahora el título, el autor y el país se repiten todavía más.

## SEGUNDA FORMA NORMAL (2FN)

Regla: cumplir 1FN y que cada columna no-clave dependa de TODA la clave primaria.

(Solo es relevante cuando la clave primaria es compuesta, es decir, formada por varias columnas.)

En la tabla anterior, si la clave primaria fuera (id_libro, id_categoria), el título, el autor y las páginas dependerían solo de id_libro, no de la combinación completa. Eso viola la 2FN.

Solución: separar en tablas independientes.

```
autores:
+----+-----------+-----------+
| id | nombre    | pais      |
+----+-----------+-----------+
|  1 | García M. | Colombia  |
|  2 | Borges    | Argentina |
+----+-----------+-----------+
```

```
libros:
+----+-----------------------+-----+------+----------+
| id | titulo                | pag | anio | autor_id |
+----+-----------------------+-----+------+----------+
|  1 | Cien años de soledad  | 471 | 1967 |        1 |
|  2 | Ficciones             | 174 | 1944 |        2 |
+----+-----------------------+-----+------+----------+
```

```
categorias:
+----+----------------+
| id | nombre         |
+----+----------------+
|  1 | Novela         |
|  2 | Lit. latinoam. |
|  3 | Cuento         |
+----+----------------+
```

```
libros_categorias:
+----------+-------------+
| libro_id | categoria_id|
+----------+-------------+
|        1 |           1 |
|        1 |           2 |
|        2 |           3 |
|        2 |           2 |
+----------+-------------+
```

Ahora cada tabla tiene un propósito claro. La información del autor no se repite para cada libro.

## TERCERA FORMA NORMAL (3FN)

Regla: cumplir 2FN y que ninguna columna no-clave dependa de otra columna no-clave (no hay dependencias transitivas).

Ejemplo de violación de 3FN:

```
libros_con_editorial:
+----+---------------+----------+-----------------------+---------------------+
| id | titulo        | autor_id | editorial             | pais_editorial      |
+----+---------------+----------+-----------------------+---------------------+
|  1 | Libro A       |        1 | Sudamericana          | Argentina           |
|  2 | Libro B       |        2 | Sudamericana          | Argentina           |
|  3 | Libro C       |        1 | Planeta               | España              |
+----+---------------+----------+-----------------------+---------------------+
```

`pais_editorial` depende de `editorial`, no de `id` del libro. Si Sudamericana cambia de país, habría que actualizarlo en múltiples filas.

Solución: separar editoriales en su propia tabla.

```
editoriales:
+----+---------------+-----------+
| id | nombre        | pais      |
+----+---------------+-----------+
|  1 | Sudamericana  | Argentina |
|  2 | Planeta       | España    |
+----+---------------+-----------+
```

```
libros:
+----+---------------+----------+--------------+
| id | titulo        | autor_id | editorial_id |
+----+---------------+----------+--------------+
|  1 | Libro A       |        1 |            1 |
|  2 | Libro B       |        2 |            1 |
|  3 | Libro C       |        1 |            2 |
+----+---------------+----------+--------------+
```

Ahora si Sudamericana cambia de país, solo se actualiza una fila en `editoriales`.

## ¿CUÁNDO NO NORMALIZAR?

La normalización es la práctica estándar y el punto de partida correcto. Pero en algunos casos muy específicos (aplicaciones de análisis con millones de filas donde la velocidad importa más que la integridad) se usa "desnormalización" intencional: duplicar datos a propósito para evitar JOINs costosos.

Para el 99% de las aplicaciones web, diseñar en 3FN es la decisión correcta.

## RESUMEN

```
1FN — sin columnas repetidas, sin listas en una celda, con clave primaria.
2FN — sin dependencias parciales de la clave primaria compuesta.
3FN — sin dependencias transitivas (columna A → columna B → clave primaria).
```

La base de datos `biblioteca` que construimos en este módulo ya está en 3FN:
- `libros` depende solo de su propio `id`.
- El autor, la editorial, la categoría y el socio tienen sus propias tablas.
- La relación N:M entre libros y categorías usa una tabla puente.
