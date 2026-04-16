# Ejercicio 9: Tipos de datos y constraints

## Dominio

Tienda de música. Vamos a agregar la tabla `clientes` y la tabla `canciones` a `tienda_musica`, y a probar que los constraints funcionan correctamente.

---

## Objetivo

Crea dos tablas nuevas con los tipos de datos y constraints apropiados, luego verifica que MariaDB rechaza datos que los violan.

**Tabla `clientes`:**
- `id` — identificador único, autoincremental
- `nombre` — texto, obligatorio
- `email` — texto, obligatorio, único entre todos los clientes
- `telefono` — texto, opcional
- `fecha_registro` — fecha, obligatoria, por defecto la fecha actual
- `activo` — booleano, obligatorio, verdadero por defecto

**Tabla `canciones`:**
- `id` — identificador único, autoincremental
- `titulo` — texto, obligatorio
- `album_id` — entero sin signo, obligatorio (aún no como clave foránea)
- `duracion_segundos` — entero sin signo, opcional, debe ser mayor a 0 si se ingresa (usa CHECK)
- `numero_pista` — número de pista dentro del álbum, entero pequeño sin signo, opcional

Luego inserta estos clientes:

| nombre | email | telefono |
|---|---|---|
| Laura Sánchez | laura@ejemplo.com | 11-2345-6789 |
| Marcos Díaz | marcos@ejemplo.com | NULL |
| Paula Vega | paula@ejemplo.com | 11-9876-5432 |

Y estas canciones del álbum "Abbey Road" (album_id = 1):

| titulo | duracion_segundos | numero_pista |
|---|---|---|
| Come Together | 259 | 1 |
| Something | 182 | 2 |
| Here Comes the Sun | 185 | 7 |

Por último, verifica los constraints intentando estas operaciones que deben fallar:
1. Insertar un cliente con el mismo email que uno existente
2. Insertar una canción con `duracion_segundos = 0`
3. Insertar un cliente sin email (campo NOT NULL)

---

## Tu turno

Define las tablas con los tipos y constraints adecuados, inserta los datos, y ejecuta las tres operaciones que deben fallar. Anota el mensaje de error que genera cada una.

---

## Solución

```sql
USE tienda_musica;

-- Crear tabla clientes
CREATE TABLE clientes (
    id             INT UNSIGNED NOT NULL AUTO_INCREMENT,
    nombre         VARCHAR(150) NOT NULL,
    email          VARCHAR(200) NOT NULL UNIQUE,
    telefono       VARCHAR(20),
    fecha_registro DATE NOT NULL DEFAULT (CURRENT_DATE),
    activo         BOOLEAN NOT NULL DEFAULT TRUE,
    PRIMARY KEY (id)
);

-- Crear tabla canciones
CREATE TABLE canciones (
    id                 INT UNSIGNED NOT NULL AUTO_INCREMENT,
    titulo             VARCHAR(200) NOT NULL,
    album_id           INT UNSIGNED NOT NULL,
    duracion_segundos  INT UNSIGNED CHECK (duracion_segundos > 0),
    numero_pista       TINYINT UNSIGNED,
    PRIMARY KEY (id)
);

-- Insertar clientes
INSERT INTO clientes (nombre, email, telefono) VALUES
    ('Laura Sánchez', 'laura@ejemplo.com',  '11-2345-6789'),
    ('Marcos Díaz',   'marcos@ejemplo.com', NULL),
    ('Paula Vega',    'paula@ejemplo.com',  '11-9876-5432');

-- Insertar canciones
INSERT INTO canciones (titulo, album_id, duracion_segundos, numero_pista) VALUES
    ('Come Together',       1, 259, 1),
    ('Something',           1, 182, 2),
    ('Here Comes the Sun',  1, 185, 7);

-- Verificar constraints (estas deben fallar):

-- 1. Email duplicado → ERROR 1062: Duplicate entry
INSERT INTO clientes (nombre, email) VALUES ('Otra Laura', 'laura@ejemplo.com');

-- 2. Duración = 0 → ERROR 4025: CONSTRAINT `canciones.duracion_segundos` failed
INSERT INTO canciones (titulo, album_id, duracion_segundos) VALUES ('Canción rara', 1, 0);

-- 3. Sin email → ERROR 1364: Field 'email' doesn't have a default value
INSERT INTO clientes (nombre) VALUES ('Cliente sin email');
```

**Puntos a comparar con tu solución:**
- `UNIQUE` sobre `email` garantiza que no haya dos clientes con el mismo correo
- `CHECK (duracion_segundos > 0)` rechaza duraciones inválidas; `NULL` sí se permite porque el campo no es `NOT NULL`
- `TINYINT UNSIGNED` para `numero_pista` — los álbumes raramente tienen más de 20 pistas; usar `INT` funcionaría pero sería un desperdicio de espacio
- `DEFAULT (CURRENT_DATE)` (con paréntesis) es la sintaxis correcta en MariaDB 10.x para expresiones como valor por defecto
