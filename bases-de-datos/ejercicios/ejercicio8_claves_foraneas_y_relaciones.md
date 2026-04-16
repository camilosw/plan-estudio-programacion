# Ejercicio 8: Claves foráneas y relaciones

## Dominio

Tienda de música. Vamos a formalizar las relaciones entre las tablas de `tienda_musica` y a crear las tablas que faltan para completar el esquema.

---

## Objetivo

El esquema de `tienda_musica` tiene columnas como `artista_id` y `album_id` que ya existen pero no tienen restricciones formales de clave foránea. Tu tarea es:

1. Agregar claves foráneas a `albumes` (referenciando `artistas`) y a `canciones` (referenciando `albumes`)
2. Crear la tabla `generos` con los géneros musicales
3. Crear la tabla puente `albumes_generos` para la relación N:M entre álbumes y géneros
4. Crear la tabla `compras` que registra qué cliente compró qué álbum y cuándo

**Estructura esperada de las tablas nuevas:**

`generos`: id autoincremental, nombre único y obligatorio

`albumes_generos`: clave compuesta por album_id + genero_id (ambos claves foráneas con CASCADE en update y delete)

`compras`: id autoincremental, cliente_id y album_id (ambos claves foráneas con RESTRICT en delete), fecha_compra con valor por defecto de hoy, precio_pagado decimal obligatorio

**Datos a insertar:**

En `generos`: Rock, Pop, Rock Alternativo, Britpop, Rock Latinoamericano, Rock Mexicano

En `albumes_generos`, asigna géneros a estos álbumes:
- Abbey Road → Rock, Pop
- Sgt. Pepper's → Rock, Pop
- Signos → Rock, Rock Latinoamericano
- Dynamo → Rock Latinoamericano
- Re → Rock, Rock Mexicano
- OK Computer → Rock, Rock Alternativo

En `compras`, inserta al menos tres compras usando los clientes y álbumes que ya tienes.

Por último, verifica que las claves foráneas funcionan intentando:
- Insertar un álbum con un `artista_id` que no existe
- Eliminar un artista que tiene álbumes registrados

---

## Tu turno

Escribe las sentencias `ALTER TABLE`, `CREATE TABLE` e `INSERT` necesarias. Define los tipos de datos correctos y nombra los constraints de forma descriptiva (por ejemplo, `fk_albumes_artista`).

---

## Solución

```sql
USE tienda_musica;

-- 1. Clave foránea en albumes → artistas
ALTER TABLE albumes
ADD CONSTRAINT fk_albumes_artista
FOREIGN KEY (artista_id) REFERENCES artistas(id)
ON DELETE RESTRICT
ON UPDATE CASCADE;

-- 2. Clave foránea en canciones → albumes
ALTER TABLE canciones
ADD CONSTRAINT fk_canciones_album
FOREIGN KEY (album_id) REFERENCES albumes(id)
ON DELETE CASCADE
ON UPDATE CASCADE;

-- 3. Tabla generos
CREATE TABLE generos (
    id     INT UNSIGNED NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(80) NOT NULL UNIQUE,
    PRIMARY KEY (id)
);

-- 4. Tabla puente albumes_generos
CREATE TABLE albumes_generos (
    album_id  INT UNSIGNED NOT NULL,
    genero_id INT UNSIGNED NOT NULL,
    PRIMARY KEY (album_id, genero_id),
    CONSTRAINT fk_ag_album
        FOREIGN KEY (album_id) REFERENCES albumes(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_ag_genero
        FOREIGN KEY (genero_id) REFERENCES generos(id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- 5. Tabla compras
CREATE TABLE compras (
    id           INT UNSIGNED NOT NULL AUTO_INCREMENT,
    cliente_id   INT UNSIGNED NOT NULL,
    album_id     INT UNSIGNED NOT NULL,
    fecha_compra DATE NOT NULL DEFAULT (CURRENT_DATE),
    precio_pagado DECIMAL(8,2) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_compras_cliente
        FOREIGN KEY (cliente_id) REFERENCES clientes(id)
        ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_compras_album
        FOREIGN KEY (album_id) REFERENCES albumes(id)
        ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Insertar géneros
INSERT INTO generos (nombre) VALUES
    ('Rock'),
    ('Pop'),
    ('Rock Alternativo'),
    ('Britpop'),
    ('Rock Latinoamericano'),
    ('Rock Mexicano');

-- Asignar géneros a álbumes
INSERT INTO albumes_generos (album_id, genero_id) VALUES
    (1, 1), (1, 2),  -- Abbey Road: Rock, Pop
    (2, 1), (2, 2),  -- Sgt. Pepper's: Rock, Pop
    (3, 1), (3, 5),  -- Signos: Rock, Rock Latinoamericano
    (4, 5),          -- Dynamo: Rock Latinoamericano
    (5, 1), (5, 6),  -- Re: Rock, Rock Mexicano
    (6, 1), (6, 3);  -- OK Computer: Rock, Rock Alternativo

-- Insertar compras
INSERT INTO compras (cliente_id, album_id, precio_pagado) VALUES
    (1, 1,  9.99),   -- Laura compra Abbey Road
    (1, 6, 11.99),   -- Laura compra OK Computer
    (3, 5,  8.99);   -- Paula compra Re

-- Verificar claves foráneas (deben fallar):

-- Álbum con artista inexistente → ERROR 1452: Cannot add or update a child row
INSERT INTO albumes (titulo, artista_id) VALUES ('Álbum fantasma', 999);

-- Eliminar artista con álbumes → ERROR 1451: Cannot delete or update a parent row
DELETE FROM artistas WHERE id = 1;
```

**Puntos a comparar con tu solución:**
- `ON DELETE CASCADE` en `canciones → albumes` significa que si eliminas un álbum, sus canciones se borran automáticamente. Tiene sentido porque una canción sin álbum no existe.
- `ON DELETE RESTRICT` en `compras → albumes` protege el historial de compras: no se puede eliminar un álbum que ya fue comprado.
- La clave primaria compuesta `PRIMARY KEY (album_id, genero_id)` en la tabla puente garantiza que la misma combinación no se repita.
- Los ids de géneros dependen del orden en que los insertaste. Si tu INSERT de géneros fue en orden diferente, tus ids serán distintos — ajusta el INSERT de `albumes_generos` según corresponda.
