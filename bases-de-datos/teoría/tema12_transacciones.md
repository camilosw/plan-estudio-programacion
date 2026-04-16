# TEMA 12: Transacciones

## OBJETIVO
Ejecutar varias operaciones SQL como una unidad atómica: o todas se completan, o ninguna.

## EXPLICACIÓN

¿Qué pasa si a mitad de un proceso el servidor se cae?

Imagina que registrar un préstamo implica dos pasos:
1. Insertar una fila en `prestamos`.
2. Actualizar `libros.disponible = FALSE`.

Si el sistema falla después del paso 1 pero antes del paso 2, el préstamo queda registrado pero el libro sigue apareciendo como disponible. Los datos quedan inconsistentes.

Una **transacción** agrupa varias operaciones en una unidad atómica. O todas tienen éxito (COMMIT), o todas se deshacen como si nunca hubieran ocurrido (ROLLBACK).

## Propiedades ACID

Las transacciones garantizan cuatro propiedades:

```
A — Atomicidad:   todas las operaciones pasan, o ninguna.
C — Consistencia: la base de datos pasa de un estado válido a otro estado válido.
I — Aislamiento:  las transacciones concurrentes no se ven entre sí hasta que hacen COMMIT.
D — Durabilidad:  una vez que el COMMIT se confirma, los datos persisten aunque se caiga el servidor.
```

## Sintaxis básica

```sql
START TRANSACTION;
-- instrucciones SQL...
COMMIT;          -- confirma todos los cambios
```

```sql
-- o si algo falla:
ROLLBACK;        -- deshace todos los cambios desde START TRANSACTION
```

## EJEMPLO

## Registrar un préstamo correctamente (ambos pasos en una transacción)

Primero verificamos el estado actual del libro que queremos prestar:

```sql
SELECT id, titulo, disponible FROM libros WHERE id = 1;
```

```
+----+----------------------+-----------+
| id | titulo               | disponible|
+----+----------------------+-----------+
|  1 | Cien años de soledad |         1 |
+----+----------------------+-----------+
```

Ahora registramos el préstamo en una transacción:

```sql
START TRANSACTION;
```

```sql
INSERT INTO prestamos (libro_id, socio_id, fecha_prestamo)
VALUES (1, 5, CURRENT_DATE);
```

```sql
UPDATE libros SET disponible = FALSE WHERE id = 1;
```

```
COMMIT;
```

```
Query OK, 0 rows affected (0.000 sec)
Query OK, 1 row affected (0.002 sec)
Query OK, 1 row affected (0.003 sec)
Query OK, 0 rows affected (0.008 sec)
```

Verificar que ambos cambios ocurrieron:

```sql
SELECT id, titulo, disponible FROM libros WHERE id = 1;
```

```
+----+----------------------+-----------+
| id | titulo               | disponible|
+----+----------------------+-----------+
|  1 | Cien años de soledad |         0 |
+----+----------------------+-----------+
```

```sql
SELECT * FROM prestamos WHERE libro_id = 1 ORDER BY id DESC LIMIT 1;
```

```
+----+----------+----------+----------------+------------------+
| id | libro_id | socio_id | fecha_prestamo | fecha_devolucion |
+----+----------+----------+----------------+------------------+
|  6 |        1 |        5 | 2024-03-15     | NULL             |
+----+----------+----------+----------------+------------------+
```

## Simular un error y usar ROLLBACK

```sql
START TRANSACTION;
```

```sql
INSERT INTO prestamos (libro_id, socio_id, fecha_prestamo)
VALUES (2, 3, CURRENT_DATE);
```

```sql
-- Simulamos que algo salió mal (ej: el libro ya estaba prestado,
-- o un error en la aplicación). Deshacemos todo:
ROLLBACK;
```

```
Query OK, 0 rows affected (0.001 sec)
```

Verificar que el préstamo NO se guardó:

```sql
SELECT * FROM prestamos WHERE libro_id = 2 AND socio_id = 3 ORDER BY id DESC LIMIT 1;
```

```
+----+----------+----------+----------------+------------------+
| id | libro_id | socio_id | fecha_prestamo | fecha_devolucion |
+----+----------+----------+----------------+------------------+
|  5 |        2 |        3 | 2024-03-10     | 2024-03-25       |
+----+----------+----------+----------------+------------------+
```

El único registro es el del préstamo anterior (que sí fue devuelto). El intento dentro del ROLLBACK no dejó rastro.

## Registrar una devolución (otro ejemplo con transacción)

Cuando un socio devuelve un libro, hay que:
1. Actualizar `prestamos.fecha_devolucion` con la fecha de hoy.
2. Actualizar `libros.disponible = TRUE`.

```sql
START TRANSACTION;
```

```sql
UPDATE prestamos
SET fecha_devolucion = CURRENT_DATE
WHERE libro_id = 9 AND socio_id = 2 AND fecha_devolucion IS NULL;
```

```sql
UPDATE libros SET disponible = TRUE WHERE id = 9;
```

```
COMMIT;
```

```
Query OK, 1 row affected (0.003 sec)
Query OK, 1 row affected (0.002 sec)
Query OK, 0 rows affected (0.007 sec)
```

## AUTOCOMMIT

Por defecto, MariaDB trabaja en modo **autocommit**: cada instrucción SQL que ejecutas es automáticamente una transacción que se confirma de inmediato. Por eso las instrucciones individuales (INSERT, UPDATE, DELETE) que usaste en temas anteriores se guardaron sin necesitar un COMMIT explícito.

Cuando usas `START TRANSACTION`, desactivas el autocommit solo para esa transacción.

Puedes ver el estado del autocommit:

```sql
SELECT @@autocommit;
```

```
+--------------+
| @@autocommit |
+--------------+
|            1 |
+--------------+
```

En PHP con PDO, las transacciones funcionan igual, pero las verás en el Tema 14.

## SAVEPOINTS — puntos intermedios

Los savepoints permiten hacer ROLLBACK a un punto intermedio dentro de una transacción, sin deshacer todo.

```sql
START TRANSACTION;
```

```sql
INSERT INTO categorias (nombre) VALUES ('Biografía');
SAVEPOINT sp1;
```

```sql
INSERT INTO categorias (nombre) VALUES ('Autobiografía');
SAVEPOINT sp2;
```

```sql
-- Algo salió mal con la segunda inserción, deshacer hasta sp1:
ROLLBACK TO SAVEPOINT sp1;
```

```
COMMIT;
```

Resultado: solo 'Biografía' se guardó; 'Autobiografía' fue deshecha.
