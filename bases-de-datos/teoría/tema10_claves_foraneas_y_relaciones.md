# TEMA 10: Claves foráneas y relaciones

## OBJETIVO
Relacionar tablas entre sí con claves foráneas y entender cómo MariaDB protege la integridad referencial.

## EXPLICACIÓN

Hasta ahora la tabla `libros` tiene una columna `autor_id`, pero MariaDB no sabe que ese número debe corresponder a un `id` real en la tabla `autores`. Podrías insertar un libro con `autor_id = 9999` sin que exista ningún autor con ese id. Eso rompe la consistencia de los datos.

Una **clave foránea** (FOREIGN KEY) le dice a MariaDB: "esta columna debe contener un valor que exista en tal columna de tal tabla". Si no existe, MariaDB rechaza la operación.

## Tipos de relaciones

```
1:N (uno a muchos)
    Un autor puede tener muchos libros.
    Un libro pertenece a un solo autor.
    → La clave foránea va en el lado "muchos": en `libros.autor_id`.
```

```
N:M (muchos a muchos)
    Un libro puede tener muchas categorías.
    Una categoría puede tener muchos libros.
    → Se necesita una tabla intermedia (o "tabla puente") con dos claves foráneas.
```

```
1:1 (uno a uno)
    Menos común. Un socio tiene un único perfil extendido.
    → La clave foránea va en la tabla secundaria.
```

## ON DELETE y ON UPDATE

Cuando eliminas o actualizas un registro referenciado, ¿qué pasa con los que dependen de él?
Hay cuatro opciones:

```
RESTRICT (o NO ACTION) — rechaza la operación si hay dependientes. Es la más segura.
CASCADE                — elimina o actualiza los dependientes automáticamente.
SET NULL               — pone NULL en la clave foránea de los dependientes.
SET DEFAULT            — pone el valor DEFAULT en la clave foránea de los dependientes.
```

## EJEMPLO

## Recrear la tabla `libros` con la clave foránea real

Como ya existe `libros`, la alteramos para agregar la restricción:

```sql
ALTER TABLE libros
ADD CONSTRAINT fk_libros_autor
FOREIGN KEY (autor_id) REFERENCES autores(id)
ON DELETE RESTRICT
ON UPDATE CASCADE;
```

```
Query OK, 0 rows affected (0.082 sec)
```

`ON DELETE RESTRICT` — si intentas eliminar un autor que tiene libros, MariaDB lo rechaza.
`ON UPDATE CASCADE` — si cambias el id de un autor (algo que no ocurre en la práctica con AUTO_INCREMENT, pero por completitud), el cambio se propaga a `libros.autor_id`.

## Verificar que la clave foránea funciona

Intentar insertar un libro con un autor que no existe:

```sql
INSERT INTO libros (titulo, autor_id, anio_publicacion, paginas)
VALUES ('Libro fantasma', 99, 2020, 100);
```

```
ERROR 1452 (23000): Cannot add or update a child row: a foreign key constraint fails
(`biblioteca`.`libros`, CONSTRAINT `fk_libros_autor` FOREIGN KEY (`autor_id`)
REFERENCES `autores` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE)
```

MariaDB rechaza el INSERT porque el autor con id 99 no existe.

Intentar eliminar un autor que tiene libros:

```sql
DELETE FROM autores WHERE id = 1;
```

```
ERROR 1451 (23000): Cannot delete or update a parent row: a foreign key constraint fails
(`biblioteca`.`libros`, CONSTRAINT `fk_libros_autor` FOREIGN KEY (`autor_id`)
REFERENCES `autores` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE)
```

El autor 1 (García Márquez) tiene libros, así que MariaDB protege la consistencia.

## Relación N:M — libros y categorías

Primero, insertar algunas categorías:

```sql
INSERT INTO categorias (nombre) VALUES
    ('Novela'),
    ('Cuento'),
    ('Ciencia ficción'),
    ('Policial'),
    ('Literatura latinoamericana'),
    ('Literatura europea'),
    ('Clásicos');
```

Luego, crear la tabla puente:

```sql
CREATE TABLE libros_categorias (
    libro_id    INT UNSIGNED NOT NULL,
    categoria_id INT UNSIGNED NOT NULL,
    PRIMARY KEY (libro_id, categoria_id),
    CONSTRAINT fk_lc_libro
        FOREIGN KEY (libro_id) REFERENCES libros(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_lc_categoria
        FOREIGN KEY (categoria_id) REFERENCES categorias(id)
        ON DELETE CASCADE ON UPDATE CASCADE
);
```

```
Query OK, 0 rows affected (0.035 sec)
```

La PRIMARY KEY es compuesta: la combinación de `libro_id` + `categoria_id` debe ser única, pero cada uno puede repetirse individualmente.

`ON DELETE CASCADE` — si se elimina un libro o una categoría, se eliminan automáticamente las filas relacionadas en `libros_categorias`.

## Asignar categorías a libros

```sql
-- Cien años de soledad: Novela, Literatura latinoamericana
INSERT INTO libros_categorias (libro_id, categoria_id) VALUES (1, 1), (1, 5);
```

```sql
-- El nombre de la rosa: Novela, Policial, Literatura europea
INSERT INTO libros_categorias (libro_id, categoria_id) VALUES (2, 1), (2, 4), (2, 6);
```

```sql
-- Ficciones: Cuento, Literatura latinoamericana
INSERT INTO libros_categorias (libro_id, categoria_id) VALUES (3, 2), (3, 5);
```

```sql
-- La metamorfosis: Cuento, Literatura europea, Clásicos
INSERT INTO libros_categorias (libro_id, categoria_id) VALUES (7, 2), (7, 6), (7, 7);
```

```sql
-- El principito: Novela, Clásicos
INSERT INTO libros_categorias (libro_id, categoria_id) VALUES (9, 1), (9, 7);
```

```
Query OK, 2 rows affected (0.005 sec)
... (por cada INSERT)
```

## Crear la tabla `prestamos` con dos claves foráneas

```sql
CREATE TABLE prestamos (
    id                INT UNSIGNED NOT NULL AUTO_INCREMENT,
    libro_id          INT UNSIGNED NOT NULL,
    socio_id          INT UNSIGNED NOT NULL,
    fecha_prestamo    DATE NOT NULL DEFAULT (CURRENT_DATE),
    fecha_devolucion  DATE,
    PRIMARY KEY (id),
    CONSTRAINT fk_prestamos_libro
        FOREIGN KEY (libro_id) REFERENCES libros(id)
        ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_prestamos_socio
        FOREIGN KEY (socio_id) REFERENCES socios(id)
        ON DELETE RESTRICT ON UPDATE CASCADE
);
```

```
Query OK, 0 rows affected (0.040 sec)
```

## Ver todas las claves foráneas de la base de datos

```sql
SELECT
    TABLE_NAME,
    CONSTRAINT_NAME,
    REFERENCED_TABLE_NAME
FROM information_schema.KEY_COLUMN_USAGE
WHERE TABLE_SCHEMA = 'biblioteca'
  AND REFERENCED_TABLE_NAME IS NOT NULL;
```

```
+-------------------+--------------------+-----------------------+
| TABLE_NAME        | CONSTRAINT_NAME    | REFERENCED_TABLE_NAME |
+-------------------+--------------------+-----------------------+
| libros            | fk_libros_autor    | autores               |
| libros_categorias | fk_lc_libro        | libros                |
| libros_categorias | fk_lc_categoria    | categorias            |
| prestamos         | fk_prestamos_libro | libros                |
| prestamos         | fk_prestamos_socio | socios                |
+-------------------+--------------------+-----------------------+
```

El esquema completo de la biblioteca ya está en su lugar.
