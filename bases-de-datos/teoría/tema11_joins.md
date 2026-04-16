# TEMA 11: JOINs — Consultar varias tablas a la vez

## OBJETIVO
Combinar datos de varias tablas en una sola consulta con JOIN.

## EXPLICACIÓN

Hasta ahora cada SELECT consulta una sola tabla. Pero la información útil suele estar distribuida en varias: el título de un libro está en `libros`, el nombre del autor está en `autores`, las categorías en `categorias`.

Un **JOIN** combina filas de dos o más tablas basándose en una condición de enlace, normalmente una clave foránea.

## Tipos de JOIN

```
INNER JOIN
    Devuelve solo las filas que tienen coincidencia en ambas tablas.
    Si un libro no tiene autor_id válido, no aparece. Si un autor no tiene libros, no aparece.
```

```
LEFT JOIN
    Devuelve todas las filas de la tabla de la izquierda, más las coincidencias de la derecha.
    Si una fila de la izquierda no tiene coincidencia, las columnas de la derecha aparecen como NULL.
```

```
RIGHT JOIN
    Devuelve todas las filas de la tabla de la derecha, más las coincidencias de la izquierda.
    (Menos usado; generalmente se prefiere reescribir como LEFT JOIN invirtiendo el orden.)
```

Analogía de la biblioteca:
```
- INNER JOIN es como cruzar dos listas: solo aparece lo que está en ambas.
- LEFT JOIN es como decir "quiero todos los socios, y si tienen préstamos activos, muéstrame cuáles".
```

## EJEMPLO

Para estos ejemplos necesitamos datos de préstamos. Insertamos algunos:

```sql
INSERT INTO prestamos (libro_id, socio_id, fecha_prestamo, fecha_devolucion) VALUES
    (1, 1, '2024-02-01', '2024-02-15'),
    (9, 2, '2024-02-10', NULL),
    (3, 1, '2024-03-01', '2024-03-20'),
    (7, 4, '2024-03-05', NULL),
    (2, 3, '2024-03-10', '2024-03-25');
```

## INNER JOIN — libros con el nombre de su autor

```sql
SELECT
    libros.titulo,
    autores.nombre AS autor,
    libros.anio_publicacion
FROM libros
INNER JOIN autores ON libros.autor_id = autores.id
ORDER BY autores.nombre, libros.anio_publicacion;
```

```
+-----------------------------------+------------------------+-----------------+
| titulo                            | autor                  | anio_publicacion|
+-----------------------------------+------------------------+-----------------+
| El principito                     | Antoine de Saint-Exup. |            1943 |
| Crimen y castigo                  | Fiódor Dostoyevski     |            1866 |
| La metamorfosis                   | Franz Kafka            |            1915 |
| El proceso                        | Franz Kafka            |            1925 |
| El amor en los tiempos del cólera | Gabriel García Márquez |            1985 |
| Cien años de soledad              | Gabriel García Márquez |            1967 |
| La casa de los espíritus          | Isabel Allende         |            1982 |
| El Aleph                          | Jorge Luis Borges      |            1949 |
| Ficciones                         | Jorge Luis Borges      |            1944 |
| El nombre de la rosa              | Umberto Eco            |            1980 |
+-----------------------------------+------------------------+-----------------+
```

El alias `AS autor` le da un nombre más legible a la columna en el resultado.

## JOIN con tres tablas — libros con sus categorías

```sql
SELECT
    libros.titulo,
    categorias.nombre AS categoria
FROM libros
INNER JOIN libros_categorias ON libros.id = libros_categorias.libro_id
INNER JOIN categorias ON libros_categorias.categoria_id = categorias.id
ORDER BY libros.titulo, categorias.nombre;
```

```
+----------------------+---------------------------+
| titulo               | categoria                 |
+----------------------+---------------------------+
| Cien años de soledad | Literatura latinoamericana|
| Cien años de soledad | Novela                    |
| El nombre de la rosa | Literatura europea        |
| El nombre de la rosa | Novela                    |
| El nombre de la rosa | Policial                  |
| El principito        | Clásicos                  |
| El principito        | Novela                    |
| Ficciones            | Cuento                    |
| Ficciones            | Literatura latinoamericana|
| La metamorfosis      | Clásicos                  |
| La metamorfosis      | Cuento                    |
| La metamorfosis      | Literatura europea        |
+----------------------+---------------------------+
```

## LEFT JOIN — todos los autores, tengan libros o no

Primero, insertar un autor sin libros:

```sql
INSERT INTO autores (nombre, pais) VALUES ('Autor Sin Libros', 'España');
```

```sql
SELECT
    autores.nombre AS autor,
    libros.titulo
FROM autores
LEFT JOIN libros ON autores.id = libros.autor_id
ORDER BY autores.nombre;
```

```
+------------------------+-----------------------------------+
| autor                  | titulo                            |
+------------------------+-----------------------------------+
| Antoine de Saint-Exup. | El principito                     |
| Autor Sin Libros       | NULL                              |
| Fiódor Dostoyevski     | Crimen y castigo                  |
| Franz Kafka            | El proceso                        |
| Franz Kafka            | La metamorfosis                   |
| Gabriel García Márquez | Cien años de soledad              |
| Gabriel García Márquez | El amor en los tiempos del cólera |
| Isabel Allende         | La casa de los espíritus          |
| Jorge Luis Borges      | El Aleph                          |
| Jorge Luis Borges      | Ficciones                         |
| Umberto Eco            | El nombre de la rosa              |
+------------------------+-----------------------------------+
```

"Autor Sin Libros" aparece con `NULL` en la columna `titulo` porque no tiene libros.

## LEFT JOIN — autores SIN libros (filtrar los NULL)

```sql
SELECT autores.nombre
FROM autores
LEFT JOIN libros ON autores.id = libros.autor_id
WHERE libros.id IS NULL;
```

```
+------------------+
| nombre           |
+------------------+
| Autor Sin Libros |
+------------------+
```

El filtro `WHERE libros.id IS NULL` selecciona solo los autores que no tienen ningún libro.

## LEFT JOIN — socios con sus préstamos activos

Un préstamo "activo" es aquel donde `fecha_devolucion` es NULL (el libro no fue devuelto todavía).

```sql
SELECT
    socios.nombre AS socio,
    libros.titulo AS libro_prestado,
    prestamos.fecha_prestamo
FROM socios
LEFT JOIN prestamos ON socios.id = prestamos.socio_id
                   AND prestamos.fecha_devolucion IS NULL
LEFT JOIN libros ON prestamos.libro_id = libros.id
ORDER BY socios.nombre;
```

```
+-----------------+------------------+----------------+
| socio           | libro_prestado   | fecha_prestamo |
+-----------------+------------------+----------------+
| Ana Martínez    | NULL             | NULL           |
| Carlos Ruiz     | El principito    | 2024-02-10     |
| Luis Torres     | La metamorfosis  | 2024-03-05     |
| María García    | NULL             | NULL           |
| Sofía Herrera   | NULL             | NULL           |
+-----------------+------------------+----------------+
```

María García, Ana Martínez y Sofía Herrera aparecen porque el LEFT JOIN incluye todos los socios, aunque no tengan préstamos activos.

## Usar alias para tablas (hace las consultas más legibles)

```sql
SELECT
    l.titulo,
    a.nombre AS autor,
    l.anio_publicacion
FROM libros l
INNER JOIN autores a ON l.autor_id = a.id
WHERE a.pais = 'Argentina'
   OR a.pais = 'Colombia';
```

```
+-----------------------------------+------------------------+-----------------+
| titulo                            | autor                  | anio_publicacion|
+-----------------------------------+------------------------+-----------------+
| Cien años de soledad              | Gabriel García Márquez |            1967 |
| El amor en los tiempos del cólera | Gabriel García Márquez |            1985 |
| Ficciones                         | Jorge Luis Borges      |            1944 |
| El Aleph                          | Jorge Luis Borges      |            1949 |
+-----------------------------------+------------------------+-----------------+
```

El alias `l` representa `libros` y `a` representa `autores`, haciendo la consulta más corta y legible.
