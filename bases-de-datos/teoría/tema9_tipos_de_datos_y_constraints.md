# TEMA 9: Tipos de datos y constraints

## OBJETIVO
Elegir el tipo de dato correcto para cada columna y usar constraints para proteger la integridad de los datos.

## EXPLICACIÓN

¿Por qué importa el tipo de dato?

Guardar un número como texto funciona, pero con el tiempo crea problemas: no puedes sumar, no puedes ordenar numéricamente, ocupa más espacio. El tipo de dato le dice a MariaDB qué clase de información esperar y cómo almacenarla de manera eficiente.

## TIPOS DE DATOS

Números enteros
...............

```
TINYINT    — de -128 a 127 (o 0 a 255 con UNSIGNED). Para booleanos o edades.
SMALLINT   — de -32,768 a 32,767. Para cantidades pequeñas como páginas de un libro.
INT        — de -2,147,483,648 a 2,147,483,647. El más común para IDs.
BIGINT     — números muy grandes. Úsalo cuando INT se queda corto (millones de filas).
```

```
UNSIGNED   — agrega este modificador para no usar negativos y duplicar el máximo positivo.
             INT UNSIGNED va de 0 a 4,294,967,295.
```

Números decimales
.................

```
DECIMAL(p, s) — precisión exacta. p = total de dígitos, s = dígitos decimales.
                DECIMAL(10, 2) guarda hasta 99,999,999.99 — ideal para precios o cantidades monetarias.
FLOAT / DOUBLE — aproximados. Rápidos, pero pueden tener errores de redondeo.
                Evítalos para dinero; úsalos para coordenadas geográficas o métricas científicas.
```

Texto
.....

```
CHAR(n)       — texto de longitud fija. Siempre ocupa n caracteres aunque el valor sea más corto.
                Útil para códigos fijos (ej: 'AR', 'CO', 'MX' para países, siempre 2 caracteres).
VARCHAR(n)    — texto de longitud variable, hasta n caracteres. El más común.
                Úsalo para nombres, títulos, correos.
TEXT          — texto largo sin límite práctico (~65,000 caracteres).
                Úsalo para sinopsis, descripciones, notas. No uses TEXT si el valor puede ser
                un VARCHAR de 255: TEXT es más lento de indexar.
```

```
Regla práctica:
- ¿El texto tiene un largo máximo conocido y razonable? → VARCHAR(n)
- ¿Es texto libre y largo (descripción, comentario)? → TEXT
```

Fechas y horas
..............

```
DATE          — solo fecha: '2024-03-15'. Rango: año 1000 a 9999.
TIME          — solo hora: '14:30:00'.
DATETIME      — fecha y hora: '2024-03-15 14:30:00'. Úsalo para registrar cuándo ocurrió algo.
TIMESTAMP     — como DATETIME, pero se actualiza automáticamente si configuras ON UPDATE CURRENT_TIMESTAMP.
                Útil para columnas como `ultima_modificacion`.
YEAR          — solo el año: 2024.
```

Booleanos
.........

```
BOOLEAN (o BOOL) — equivale a TINYINT(1). Valores: TRUE (1) o FALSE (0).
```

## CONSTRAINTS

Un constraint es una regla que MariaDB aplica automáticamente para proteger la integridad de los datos.

```
NOT NULL
........
El campo es obligatorio. Si intentas insertar un registro sin ese valor, MariaDB rechaza la operación.
```

```
    nombre VARCHAR(150) NOT NULL
```

```
UNIQUE
......
No pueden existir dos filas con el mismo valor en esa columna.
```

```
    email VARCHAR(200) UNIQUE
```

```
DEFAULT
.......
Si no se especifica un valor al insertar, usa este valor por defecto.
```

```
    disponible BOOLEAN NOT NULL DEFAULT TRUE
    fecha_registro DATE DEFAULT (CURRENT_DATE)
```

```
CHECK
.....
Valida que el valor cumpla una condición. Si no la cumple, la inserción o actualización falla.
```

```
    paginas SMALLINT UNSIGNED CHECK (paginas > 0)
    anio_publicacion YEAR CHECK (anio_publicacion >= 1450)
```

```
(El año 1450 es aproximadamente cuando Gutenberg inventó la imprenta)
```

## EJEMPLO

Crear la tabla `socios` con tipos y constraints bien definidos:

```sql
CREATE TABLE socios (
    id             INT UNSIGNED NOT NULL AUTO_INCREMENT,
    nombre         VARCHAR(150) NOT NULL,
    email          VARCHAR(200) NOT NULL UNIQUE,
    telefono       VARCHAR(20),
    fecha_registro DATE NOT NULL DEFAULT (CURRENT_DATE),
    activo         BOOLEAN NOT NULL DEFAULT TRUE,
    PRIMARY KEY (id)
);
```

```
Query OK, 0 rows affected (0.030 sec)
```

Crear la tabla `categorias`:

```sql
CREATE TABLE categorias (
    id     INT UNSIGNED NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    PRIMARY KEY (id)
);
```

```
Query OK, 0 rows affected (0.025 sec)
```

## Agregar columnas a una tabla existente con ALTER TABLE

Si ya creaste la tabla `libros` y quieres agregar la sinopsis:

```sql
ALTER TABLE libros ADD COLUMN sinopsis TEXT;
```

```
Query OK, 0 rows affected (0.028 sec)
```

También puedes modificar el tipo de una columna existente:

```sql
ALTER TABLE libros MODIFY COLUMN paginas SMALLINT UNSIGNED CHECK (paginas > 0);
```

O eliminar una columna:

```sql
ALTER TABLE libros DROP COLUMN sinopsis;
```

## Intentar violar un constraint

Insertar un socio con un email que ya existe:

```sql
INSERT INTO socios (nombre, email) VALUES ('María García', 'contacto@biblioteca.com');
INSERT INTO socios (nombre, email) VALUES ('Carlos Ruiz',  'contacto@biblioteca.com');
```

```
ERROR 1062 (23000): Duplicate entry 'contacto@biblioteca.com' for key 'email'
```

El segundo INSERT falla. MariaDB rechaza el dato porque viola el constraint UNIQUE.

Insertar un socio sin nombre (campo NOT NULL):

```sql
INSERT INTO socios (email) VALUES ('otro@email.com');
```

```
ERROR 1364 (HY000): Field 'nombre' doesn't have a default value
```

## Insertar socios válidos

```sql
INSERT INTO socios (nombre, email, telefono) VALUES
    ('María García',   'maria@ejemplo.com',  '11-2345-6789'),
    ('Carlos Ruiz',    'carlos@ejemplo.com', '11-8765-4321'),
    ('Ana Martínez',   'ana@ejemplo.com',    NULL),
    ('Luis Torres',    'luis@ejemplo.com',   '11-5555-1234'),
    ('Sofía Herrera',  'sofia@ejemplo.com',  '11-9999-8888');
```

```
Query OK, 5 rows affected (0.007 sec)
```

```sql
SELECT nombre, email, fecha_registro, activo FROM socios;
```

```
+-----------------+----------------------+----------------+--------+
| nombre          | email                | fecha_registro | activo |
+-----------------+----------------------+----------------+--------+
| María García    | maria@ejemplo.com    | 2024-03-15     |      1 |
| Carlos Ruiz     | carlos@ejemplo.com   | 2024-03-15     |      1 |
| Ana Martínez    | ana@ejemplo.com      | 2024-03-15     |      1 |
| Luis Torres     | luis@ejemplo.com     | 2024-03-15     |      1 |
| Sofía Herrera   | sofia@ejemplo.com    | 2024-03-15     |      1 |
+-----------------+----------------------+----------------+--------+
```

El campo `fecha_registro` se completó automáticamente con la fecha actual (DEFAULT).
