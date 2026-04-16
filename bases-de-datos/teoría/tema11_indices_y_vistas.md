# TEMA 11: Índices y vistas

## OBJETIVO
Acelerar consultas con índices y simplificar consultas complejas con vistas.

## EXPLICACIÓN — ÍNDICES

Imagina buscar un libro en una biblioteca sin catálogo: tendrías que revisar cada estante, uno por uno. Un catálogo (ordenado por autor o por título) te lleva directamente a la ubicación correcta.

Un **índice** hace lo mismo en una base de datos. MariaDB mantiene una estructura de datos auxiliar (un B-Tree) que permite encontrar filas por el valor de una columna sin recorrer toda la tabla.

Sin índice, MariaDB hace un "full table scan": revisa cada fila. Con 10 libros no se nota. Con 1,000,000 de libros, la diferencia es de segundos a milisegundos.

Cuándo crear un índice
......................

```
SÍ crear índice en:
- Columnas que usas frecuentemente en WHERE (ej: email al autenticar usuarios)
- Columnas que usas en JOIN (las claves foráneas ya tienen índice implícito al declararlas)
- Columnas que usas en ORDER BY en consultas lentas
```

```
NO crear índice en:
- Tablas pequeñas (menos de unos miles de filas): el índice no ayuda y ocupa espacio
- Columnas que se actualizan muy frecuentemente: el índice se recalcula en cada UPDATE
- Columnas con muy poca variedad de valores (ej: una columna booleana): no acelera casi nada
```

Índices implícitos
..................

MariaDB crea índices automáticamente en:
- La columna PRIMARY KEY
- Las columnas con UNIQUE
- Las columnas FOREIGN KEY

No necesitas crearlos manualmente.

## EXPLICACIÓN — VISTAS

Una **vista** es una consulta guardada con nombre. Se comporta como una tabla virtual: puedes hacer SELECT sobre ella, pero no almacena datos propios (los trae de las tablas reales cada vez que la consultas).

Las vistas son útiles para:
- Encapsular consultas complejas y reutilizarlas con un nombre simple.
- Presentar solo las columnas necesarias (por seguridad o claridad).
- Simplificar el código PHP que consulta la base de datos.

## EJEMPLO — ÍNDICES

## Verificar si una consulta usa índice con EXPLAIN

Antes de crear un índice, usa EXPLAIN para ver cómo MariaDB planea ejecutar la consulta:

```sql
EXPLAIN SELECT * FROM libros WHERE autor_id = 1\G
```

```
*************************** 1. row ***************************
           id: 1
  select_type: SIMPLE
        table: libros
         type: ref
possible_keys: fk_libros_autor
          key: fk_libros_autor
      key_len: 4
          ref: const
         rows: 2
        Extra:
```

`type: ref` y `key: fk_libros_autor` indican que MariaDB usa el índice de la clave foránea. Bien.

Ahora una consulta sin índice:

```sql
EXPLAIN SELECT * FROM socios WHERE nombre = 'María García'\G
```

```
*************************** 1. row ***************************
           id: 1
  select_type: SIMPLE
        table: socios
         type: ALL
possible_keys: NULL
          key: NULL
         rows: 5
        Extra: Using where
```

`type: ALL` indica "full table scan": revisa todas las filas. Si hubiera millones de socios, esto sería lento.

## Crear un índice en la columna `nombre` de `socios`

```sql
CREATE INDEX idx_socios_nombre ON socios(nombre);
```

```
Query OK, 0 rows affected (0.018 sec)
```

Verificar con EXPLAIN nuevamente:

```sql
EXPLAIN SELECT * FROM socios WHERE nombre = 'María García'\G
```

```
*************************** 1. row ***************************
          type: ref
possible_keys: idx_socios_nombre
          key: idx_socios_nombre
         rows: 1
```

Ahora usa el índice: en lugar de revisar todas las filas, va directo.

## Ver los índices de una tabla

```sql
SHOW INDEX FROM socios;
```

```
+--------+------------+-------------------+...+--------+
| Table  | Non_unique | Key_name          |...| Column |
+--------+------------+-------------------+...+--------+
| socios |          0 | PRIMARY           |...| id     |
| socios |          0 | email             |...| email  |
| socios |          1 | idx_socios_nombre |...| nombre |
+--------+------------+-------------------+...+--------+
```

## Eliminar un índice

```sql
DROP INDEX idx_socios_nombre ON socios;
```

## EJEMPLO — VISTAS

## Crear una vista con libros y sus autores

```sql
CREATE VIEW libros_con_autor AS
SELECT
    l.id,
    l.titulo,
    a.nombre AS autor,
    a.pais AS pais_autor,
    l.anio_publicacion,
    l.paginas,
    l.disponible
FROM libros l
INNER JOIN autores a ON l.autor_id = a.id;
```

```
Query OK, 0 rows affected (0.012 sec)
```

## Consultar la vista como si fuera una tabla

```sql
SELECT titulo, autor, anio_publicacion FROM libros_con_autor
WHERE pais_autor = 'Argentina';
```

```
+-------------------+--------------------------+-----------------+
| titulo            | autor                    | anio_publicacion|
+-------------------+--------------------------+-----------------+
| Ficciones         | Jorge Luis Borges        |            1944 |
| El Aleph          | Jorge Luis Borges        |            1949 |
+-------------------+--------------------------+-----------------+
```

No necesitas escribir el JOIN cada vez. La lógica está encapsulada en la vista.

## Crear una vista de libros disponibles para préstamo

```sql
CREATE VIEW libros_disponibles AS
SELECT id, titulo, autor_id, paginas
FROM libros
WHERE disponible = TRUE;
```

```sql
SELECT * FROM libros_disponibles;
```

```
+----+-----------------------------------+----------+--------+
| id | titulo                            | autor_id | paginas|
+----+-----------------------------------+----------+--------+
|  1 | Cien años de soledad              |        1 |    471 |
|  2 | El amor en los tiempos del cólera |        1 |    468 |
...
```

(El principito no aparece porque lo marcamos como no disponible en el Tema 6.)

## Ver todas las vistas de la base de datos

```sql
SHOW FULL TABLES WHERE Table_type = 'VIEW';
```

```
+----------------------+------------+
| Tables_in_biblioteca | Table_type |
+----------------------+------------+
| libros_con_autor     | VIEW       |
| libros_disponibles   | VIEW       |
+----------------------+------------+
```

## Eliminar una vista

```sql
DROP VIEW IF EXISTS libros_disponibles;
```

NOTA: eliminar una vista no afecta los datos. Solo borra la consulta guardada.
