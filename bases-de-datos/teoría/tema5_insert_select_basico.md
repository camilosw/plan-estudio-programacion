# TEMA 5: INSERT y SELECT básico

## OBJETIVO
Insertar datos en las tablas y consultarlos con SELECT.

## EXPLICACIÓN

Con las tablas creadas, el siguiente paso es poblarlas con datos. En SQL esto se hace con dos instrucciones del DML (Data Manipulation Language):

- **INSERT INTO** — agrega nuevas filas a una tabla
- **SELECT** — consulta y devuelve filas de una tabla

## INSERT INTO

Sintaxis básica:

```sql
INSERT INTO nombre_tabla (columna1, columna2, ...)
VALUES (valor1, valor2, ...);
```

No es necesario escribir el valor del campo `id` cuando tiene AUTO_INCREMENT: MariaDB lo asigna automáticamente.

## SELECT

Sintaxis básica:

```sql
SELECT columna1, columna2 FROM nombre_tabla;
SELECT * FROM nombre_tabla;           -- el asterisco trae todas las columnas
SELECT * FROM nombre_tabla ORDER BY columna ASC;   -- ordenar de menor a mayor
SELECT * FROM nombre_tabla ORDER BY columna DESC;  -- ordenar de mayor a menor
SELECT * FROM nombre_tabla LIMIT 5;   -- traer solo los primeros 5 registros
```

## EJEMPLO

Asegurarse de estar en la base de datos correcta:

```sql
USE biblioteca;
```

## Insertar autores

```sql
INSERT INTO autores (nombre, pais, anio_nacimiento)
VALUES ('Gabriel García Márquez', 'Colombia', 1927);
```

```
Query OK, 1 row affected (0.007 sec)
```

```sql
INSERT INTO autores (nombre, pais, anio_nacimiento)
VALUES ('Umberto Eco', 'Italia', 1932);
```

```sql
INSERT INTO autores (nombre, pais, anio_nacimiento)
VALUES ('Jorge Luis Borges', 'Argentina', 1899);
```

```sql
INSERT INTO autores (nombre, pais, anio_nacimiento)
VALUES ('Isabel Allende', 'Chile', 1942);
```

```sql
INSERT INTO autores (nombre, pais, anio_nacimiento)
VALUES ('Franz Kafka', 'República Checa', 1883);
```

## Insertar varios registros en una sola instrucción

```sql
INSERT INTO autores (nombre, pais, anio_nacimiento) VALUES
    ('Antoine de Saint-Exupéry', 'Francia', 1900),
    ('Fiódor Dostoyevski',       'Rusia',   1821);
```

```
Query OK, 2 rows affected (0.005 sec)
Records: 2  Duplicates: 0  Warnings: 0
```

## Consultar todos los autores

```sql
SELECT * FROM autores;
```

```
+----+--------------------------+-----------------+-----------------+
| id | nombre                   | pais            | anio_nacimiento |
+----+--------------------------+-----------------+-----------------+
|  1 | Gabriel García Márquez   | Colombia        |            1927 |
|  2 | Umberto Eco              | Italia          |            1932 |
|  3 | Jorge Luis Borges        | Argentina       |            1899 |
|  4 | Isabel Allende           | Chile           |            1942 |
|  5 | Franz Kafka              | República Checa |            1883 |
|  6 | Antoine de Saint-Exupéry | Francia         |            1900 |
|  7 | Fiódor Dostoyevski       | Rusia           |            1821 |
+----+--------------------------+-----------------+-----------------+
7 rows in set (0.001 sec)
```

## Consultar solo algunas columnas

```sql
SELECT nombre, pais FROM autores;
```

```
+--------------------------+-----------------+
| nombre                   | pais            |
+--------------------------+-----------------+
| Gabriel García Márquez   | Colombia        |
| Umberto Eco              | Italia          |
| Jorge Luis Borges        | Argentina       |
| Isabel Allende           | Chile           |
| Franz Kafka              | República Checa |
| Antoine de Saint-Exupéry | Francia         |
| Fiódor Dostoyevski       | Rusia           |
+--------------------------+-----------------+
```

## Ordenar los resultados

```sql
SELECT nombre, anio_nacimiento FROM autores ORDER BY anio_nacimiento ASC;
```

```
+--------------------------+-----------------+
| nombre                   | anio_nacimiento |
+--------------------------+-----------------+
| Fiódor Dostoyevski       |            1821 |
| Franz Kafka              |            1883 |
| Jorge Luis Borges        |            1899 |
| Antoine de Saint-Exupéry |            1900 |
| Gabriel García Márquez   |            1927 |
| Umberto Eco              |            1932 |
| Isabel Allende           |            1942 |
+--------------------------+-----------------+
```

## Limitar la cantidad de resultados

```sql
SELECT nombre FROM autores ORDER BY nombre ASC LIMIT 3;
```

```
+--------------------------+
| nombre                   |
+--------------------------+
| Antoine de Saint-Exupéry |
| Fiódor Dostoyevski       |
| Franz Kafka              |
+--------------------------+
```

## Insertar libros

```sql
INSERT INTO libros (titulo, autor_id, anio_publicacion, paginas) VALUES
    ('Cien años de soledad',     1, 1967, 471),
    ('El amor en los tiempos del cólera', 1, 1985, 468),
    ('El nombre de la rosa',     2, 1980, 502),
    ('Ficciones',                3, 1944, 174),
    ('El Aleph',                 3, 1949, 191),
    ('La casa de los espíritus', 4, 1982, 433),
    ('La metamorfosis',          5, 1915, 96),
    ('El proceso',               5, 1925, 255),
    ('El principito',            6, 1943, 96),
    ('Crimen y castigo',         7, 1866, 672);
```

```
Query OK, 10 rows affected (0.008 sec)
Records: 10  Duplicates: 0  Warnings: 0
```

## Consultar todos los libros ordenados por año

```sql
SELECT titulo, anio_publicacion, paginas FROM libros ORDER BY anio_publicacion ASC;
```

```
+-----------------------------------+-----------------+--------+
| titulo                            | anio_publicacion| paginas|
+-----------------------------------+-----------------+--------+
| Crimen y castigo                  |            1866 |    672 |
| La metamorfosis                   |            1915 |     96 |
| El proceso                        |            1925 |    255 |
| Ficciones                         |            1944 |    174 |
| El principito                     |            1943 |     96 |
| El Aleph                          |            1949 |    191 |
| Cien años de soledad              |            1967 |    471 |
| El nombre de la rosa              |            1980 |    502 |
| La casa de los espíritus          |            1982 |    433 |
| El amor en los tiempos del cólera |            1985 |    468 |
+-----------------------------------+-----------------+--------+
```

## Los 5 libros más cortos

```sql
SELECT titulo, paginas FROM libros ORDER BY paginas ASC LIMIT 5;
```

```
+------------------------+--------+
| titulo                 | paginas|
+------------------------+--------+
| La metamorfosis        |     96 |
| El principito          |     96 |
| Ficciones              |    174 |
| El Aleph               |    191 |
| El proceso             |    255 |
+------------------------+--------+
```

## NOTA SOBRE TILDES Y CARACTERES ESPECIALES

Si los textos con tildes (é, ó, ñ) no se muestran correctamente en la terminal, es un problema de encoding de la terminal, no de la base de datos. Para verificar que la base de datos los almacena bien, abre HeidiSQL y revisa los datos desde ahí.

Para asegurarte de que el cliente de línea de comandos use utf8mb4:

```bash
mariadb --default-character-set=utf8mb4 -u sandra -p biblioteca
```
