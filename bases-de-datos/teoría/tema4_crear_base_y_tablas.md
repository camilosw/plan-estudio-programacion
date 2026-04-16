# TEMA 4: Crear base de datos y primeras tablas

## OBJETIVO
Crear la base de datos `biblioteca` y las primeras tablas con los tipos de datos más comunes.

## EXPLICACIÓN

Antes de guardar datos, necesitamos definir la estructura que los va a contener. Es como diseñar la ficha antes de empezar a llenarla: primero decides qué campos va a tener cada tipo de registro.

En SQL este proceso se llama DDL (Data Definition Language): las instrucciones que definen la estructura de la base de datos.

## Tipos de datos básicos

```
INT          — número entero (ej: 42, -5, 1000)
BIGINT       — número entero grande (para IDs con millones de registros)
DECIMAL(p,s) — número con decimales exactos (ej: DECIMAL(10,2) para precios)
VARCHAR(n)   — texto de longitud variable, máximo n caracteres (ej: VARCHAR(150))
TEXT         — texto largo sin límite práctico (ej: sinopsis de un libro)
DATE         — fecha sin hora (ej: 2024-03-15)
DATETIME     — fecha y hora (ej: 2024-03-15 14:30:00)
BOOLEAN      — verdadero o falso (internamente es TINYINT(1): 0 o 1)
```

## Atributos especiales

Al definir una columna se pueden agregar modificadores que cambian su comportamiento. Los más comunes son:

```
PRIMARY KEY      — identifica de forma única cada fila; solo puede haber una por tabla
AUTO_INCREMENT   — MariaDB asigna automáticamente el siguiente número (1, 2, 3...)
NOT NULL         — el campo es obligatorio; no puede estar vacío
UNSIGNED         — para INT: solo números positivos (0 en adelante)
```

## EJEMPLO

Conectarse como `sandra`:

```bash
mariadb -u sandra -p biblioteca
```

Crear la base de datos (si no existe todavía):

```sql
CREATE DATABASE IF NOT EXISTS biblioteca
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;
```

```sql
USE biblioteca;
```

`utf8mb4` es el encoding correcto para soportar tildes, ñ y emojis en español.

## Crear la tabla de autores

```sql
CREATE TABLE autores (
    id               INT UNSIGNED NOT NULL AUTO_INCREMENT,
    nombre           VARCHAR(150) NOT NULL,
    pais             VARCHAR(100),
    anio_nacimiento  YEAR,
    PRIMARY KEY (id)
);
```

```
Query OK, 0 rows affected (0.032 sec)
```

Verificar que la tabla se creó correctamente:

```sql
DESCRIBE autores;
```

```
+------------------+------------------+------+-----+---------+----------------+
| Field            | Type             | Null | Key | Default | Extra          |
+------------------+------------------+------+-----+---------+----------------+
| id               | int(10) unsigned | NO   | PRI | NULL    | auto_increment |
| nombre           | varchar(150)     | NO   |     | NULL    |                |
| pais             | varchar(100)     | YES  |     | NULL    |                |
| anio_nacimiento  | year(4)          | YES  |     | NULL    |                |
+------------------+------------------+------+-----+---------+----------------+
4 rows in set (0.001 sec)
```

## Crear la tabla de libros

```sql
CREATE TABLE libros (
    id               INT UNSIGNED NOT NULL AUTO_INCREMENT,
    titulo           VARCHAR(255) NOT NULL,
    autor_id         INT UNSIGNED NOT NULL,
    anio_publicacion YEAR,
    paginas          SMALLINT UNSIGNED,
    disponible       BOOLEAN NOT NULL DEFAULT TRUE,
    PRIMARY KEY (id)
);
```

```
Query OK, 0 rows affected (0.028 sec)
```

```sql
DESCRIBE libros;
```

```
+-----------------+----------------------+------+-----+---------+----------------+
| Field           | Type                 | Null | Key | Default | Extra          |
+-----------------+----------------------+------+-----+---------+----------------+
| id              | int(10) unsigned     | NO   | PRI | NULL    | auto_increment |
| titulo          | varchar(255)         | NO   |     | NULL    |                |
| autor_id        | int(10) unsigned     | NO   |     | NULL    |                |
| anio_publicacion| year(4)              | YES  |     | NULL    |                |
| paginas         | smallint(5) unsigned | YES  |     | NULL    |                |
| disponible      | tinyint(1)           | NO   |     | 1       |                |
+-----------------+----------------------+------+-----+---------+----------------+
6 rows in set (0.001 sec)
```

Nota: todavía no declaramos `autor_id` como clave foránea; eso lo hacemos en el Tema 10. Por ahora es un número entero normal.

## Ver todas las tablas de la base de datos

```sql
SHOW TABLES;
```

```
+----------------------+
| Tables_in_biblioteca |
+----------------------+
| autores              |
| libros               |
+----------------------+
2 rows in set (0.001 sec)
```

## Eliminar una tabla (si te equivocaste y quieres empezar de nuevo)

```sql
DROP TABLE IF EXISTS libros;
```

```sql
-- Luego la vuelves a crear con CREATE TABLE
```

NOTA IMPORTANTE: DROP TABLE borra la tabla y todos sus datos de forma permanente.
Úsalo solo en desarrollo, nunca en producción sin un backup previo.

## Ver el SQL que generó una tabla existente

```sql
SHOW CREATE TABLE autores\G
```

```
*************************** 1. row ***************************
       Table: autores
Create Table: CREATE TABLE `autores` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) NOT NULL,
  `pais` varchar(100) DEFAULT NULL,
  `anio_nacimiento` year(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
1 row in set (0.000 sec)
```

El `\G` al final muestra la salida en formato vertical (más legible para textos largos).
