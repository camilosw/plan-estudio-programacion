# TEMA 6: UPDATE, DELETE y WHERE

## OBJETIVO
Modificar y eliminar datos existentes, y filtrar resultados con condiciones.

## EXPLICACIÓN

Hasta ahora insertamos y consultamos datos. El siguiente paso es modificarlos y eliminarlos. Pero casi nunca queremos afectar TODOS los registros: queremos modificar o eliminar solo los que cumplen una condición. Para eso existe la cláusula WHERE.

## WHERE

WHERE filtra las filas antes de que SELECT, UPDATE o DELETE las procese. Solo las filas que cumplen la condición son afectadas.

Operadores de comparación:

```
=       igual
!= o <> distinto
>       mayor que
<       menor que
>=      mayor o igual
<=      menor o igual
```

Operadores lógicos:

```
AND     ambas condiciones deben ser verdaderas
OR      al menos una condición debe ser verdadera
NOT     niega la condición
```

Operadores especiales:

```
LIKE 'patrón'         — texto que coincide con un patrón (% = cualquier cantidad de caracteres)
IN (v1, v2, ...)      — el valor está en la lista
BETWEEN v1 AND v2     — el valor está en el rango (inclusivo)
IS NULL               — el valor es NULL (vacío)
IS NOT NULL           — el valor no es NULL
```

## UPDATE

Sintaxis:

```sql
UPDATE nombre_tabla
SET columna1 = nuevo_valor1, columna2 = nuevo_valor2
WHERE condición;
```

## DELETE

Sintaxis:

```sql
DELETE FROM nombre_tabla
WHERE condición;
```

## EJEMPLO

## Usar WHERE con SELECT

Libros con más de 400 páginas:

```sql
SELECT titulo, paginas FROM libros WHERE paginas > 400;
```

```
+-----------------------------------+--------+
| titulo                            | paginas|
+-----------------------------------+--------+
| Cien años de soledad              |    471 |
| El amor en los tiempos del cólera |    468 |
| El nombre de la rosa              |    502 |
| La casa de los espíritus          |    433 |
| Crimen y castigo                  |    672 |
+-----------------------------------+--------+
```

Autores de Colombia o Argentina:

```sql
SELECT nombre, pais FROM autores WHERE pais IN ('Colombia', 'Argentina');
```

```
+------------------------+-----------+
| nombre                 | pais      |
+------------------------+-----------+
| Gabriel García Márquez | Colombia  |
| Jorge Luis Borges      | Argentina |
+------------------------+-----------+
```

Autores nacidos entre 1880 y 1930:

```sql
SELECT nombre, anio_nacimiento FROM autores
WHERE anio_nacimiento BETWEEN 1880 AND 1930
ORDER BY anio_nacimiento;
```

```
+--------------------------+-----------------+
| nombre                   | anio_nacimiento |
+--------------------------+-----------------+
| Franz Kafka              |            1883 |
| Jorge Luis Borges        |            1899 |
| Antoine de Saint-Exupéry |            1900 |
| Gabriel García Márquez   |            1927 |
+--------------------------+-----------------+
```

## Buscar por texto con LIKE

El signo `%` es un comodín que representa cualquier cantidad de caracteres.

Libros cuyo título contiene la palabra "El":

```sql
SELECT titulo FROM libros WHERE titulo LIKE '%El%';
```

```
+----------------------+
| titulo               |
+----------------------+
| El amor en los ...   |
| El nombre de la rosa |
| El Aleph             |
| El proceso           |
| El principito        |
+----------------------+
```

Autores cuyo nombre empieza con "F":

```sql
SELECT nombre FROM autores WHERE nombre LIKE 'F%';
```

```
+--------------------+
| nombre             |
+--------------------+
| Franz Kafka        |
| Fiódor Dostoyevski |
+--------------------+
```

Libros disponibles para préstamo:

```sql
SELECT titulo, disponible FROM libros WHERE disponible = TRUE;
```

## UPDATE — Modificar datos

Marcar el libro "El principito" como no disponible (fue prestado):

Primero, buscar su id:

```sql
SELECT id, titulo FROM libros WHERE titulo LIKE '%principito%';
```

```
+----+---------------+
| id | titulo        |
+----+---------------+
|  9 | El principito |
+----+---------------+
```

Actualizar el campo `disponible`:

```sql
UPDATE libros SET disponible = FALSE WHERE id = 9;
```

```
Query OK, 1 row affected (0.006 sec)
Rows matched: 1  Changed: 1  Warnings: 0
```

Verificar el cambio:

```sql
SELECT titulo, disponible FROM libros WHERE id = 9;
```

```
+---------------+-----------+
| titulo        | disponible|
+---------------+-----------+
| El principito |         0 |
+---------------+-----------+
```

Corregir un dato mal escrito:

```sql
UPDATE autores SET pais = 'Rusia (Imperio Ruso)' WHERE id = 7;
```

```
Query OK, 1 row affected (0.004 sec)
```

Volver a marcar el libro como disponible:

```sql
UPDATE libros SET disponible = TRUE WHERE id = 9;
```

## DELETE — Eliminar datos

Primero, insertar un autor de prueba para poder eliminarlo:

```sql
INSERT INTO autores (nombre, pais) VALUES ('Autor de Prueba', 'Ningún país');
```

```
Query OK, 1 row affected (0.005 sec)
```

Verificar qué id le asignó MariaDB:

```sql
SELECT id, nombre FROM autores ORDER BY id DESC LIMIT 1;
```

```
+----+-----------------+
| id | nombre          |
+----+-----------------+
|  8 | Autor de Prueba |
+----+-----------------+
```

Eliminar ese autor:

```sql
DELETE FROM autores WHERE id = 8;
```

```
Query OK, 1 row affected (0.005 sec)
```

## ADVERTENCIA MUY IMPORTANTE

Si ejecutas DELETE o UPDATE sin la cláusula WHERE, la operación afecta
TODOS los registros de la tabla.

```sql
-- Esto elimina TODOS los libros sin confirmar:
DELETE FROM libros;
```

```sql
-- Esto pone paginas = 0 en TODOS los libros:
UPDATE libros SET paginas = 0;
```

MariaDB ejecuta estas instrucciones sin pedir confirmación. No hay papelera de reciclaje. Los datos se pierden.

Buenas prácticas:
- Siempre escribe el WHERE antes de ejecutar un UPDATE o DELETE.
- Antes de ejecutar un DELETE, corre primero un SELECT con la misma condición WHERE para ver exactamente qué vas a eliminar.
- En proyectos reales, los datos rara vez se eliminan físicamente: se usa una columna `activo` o `eliminado_en` para marcar el registro sin borrarlo.
