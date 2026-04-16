# Ejercicio 9: JOINs

## Dominio

Tienda de música. Usamos `tienda_musica` con todas las tablas creadas hasta el Ejercicio 8.

---

## Objetivo

Escribe las siguientes consultas que combinan varias tablas de la tienda de música.

**Consulta 1:** Todos los álbumes con el nombre de su artista al lado, ordenados por nombre del artista y luego por año de lanzamiento.
Columnas esperadas: `titulo`, `artista`, `anio_lanzamiento`

**Consulta 2:** Todos los álbumes que tienen al menos un género asignado, junto con sus géneros.
Columnas esperadas: `titulo`, `genero`

**Consulta 3:** Artistas que NO tienen ningún álbum en la base de datos.
(Pista: usa LEFT JOIN y filtra por NULL)

**Consulta 4:** Compras realizadas, mostrando el nombre del cliente, el título del álbum y el precio pagado. Ordenar por fecha de compra.
Columnas esperadas: `cliente`, `album`, `precio_pagado`, `fecha_compra`

**Consulta 5:** Todos los clientes con la cantidad de compras que han realizado, incluyendo clientes con 0 compras.
Columnas esperadas: `nombre`, `total_compras`

**Consulta 6:** Álbumes de artistas del Reino Unido, con el nombre del artista y el país.

**Consulta 7:** Cada álbum con todos sus géneros en una sola columna, separados por coma. Usa `GROUP_CONCAT`.
Columnas esperadas: `titulo`, `generos`

---

## Tu turno

Escribe las siete consultas. Para la consulta 3 inserta primero un artista sin álbumes para poder verificarla:

```sql
INSERT INTO artistas (nombre, pais) VALUES ('Artista Sin Álbumes', 'España');
```

---

## Solución

```sql
USE tienda_musica;

-- Artista de prueba para la consulta 3
INSERT INTO artistas (nombre, pais) VALUES ('Artista Sin Álbumes', 'España');

-- 1. Álbumes con nombre de artista
SELECT a.titulo, ar.nombre AS artista, a.anio_lanzamiento
FROM albumes a
INNER JOIN artistas ar ON a.artista_id = ar.id
ORDER BY ar.nombre, a.anio_lanzamiento;

-- 2. Álbumes con sus géneros
SELECT a.titulo, g.nombre AS genero
FROM albumes a
INNER JOIN albumes_generos ag ON a.id = ag.album_id
INNER JOIN generos g ON ag.genero_id = g.id
ORDER BY a.titulo;

-- 3. Artistas sin álbumes
SELECT ar.nombre
FROM artistas ar
LEFT JOIN albumes a ON ar.id = a.artista_id
WHERE a.id IS NULL;

-- 4. Compras con datos del cliente y álbum
SELECT cl.nombre AS cliente, a.titulo AS album,
       c.precio_pagado, c.fecha_compra
FROM compras c
INNER JOIN clientes cl ON c.cliente_id = cl.id
INNER JOIN albumes a   ON c.album_id   = a.id
ORDER BY c.fecha_compra;

-- 5. Clientes con total de compras (incluyendo 0)
SELECT cl.nombre, COUNT(c.id) AS total_compras
FROM clientes cl
LEFT JOIN compras c ON cl.id = c.cliente_id
GROUP BY cl.id, cl.nombre
ORDER BY total_compras DESC;

-- 6. Álbumes de artistas del Reino Unido
SELECT a.titulo, ar.nombre AS artista, ar.pais
FROM albumes a
INNER JOIN artistas ar ON a.artista_id = ar.id
WHERE ar.pais = 'Reino Unido';

-- 7. Álbumes con todos sus géneros concatenados
SELECT a.titulo, GROUP_CONCAT(g.nombre ORDER BY g.nombre SEPARATOR ', ') AS generos
FROM albumes a
INNER JOIN albumes_generos ag ON a.id = ag.album_id
INNER JOIN generos g          ON ag.genero_id = g.id
GROUP BY a.id, a.titulo
ORDER BY a.titulo;
```

**Puntos a comparar con tu solución:**
- `INNER JOIN` en la consulta 2 excluye álbumes sin géneros asignados — si quisieras incluirlos, necesitarías `LEFT JOIN`
- `LEFT JOIN ... WHERE a.id IS NULL` en la consulta 3 es el patrón clásico para encontrar filas huérfanas
- `COUNT(c.id)` en la consulta 5 cuenta solo compras reales (NULL no se cuenta); `COUNT(*)` contaría la fila aunque todos los campos de `compras` sean NULL
- `GROUP_CONCAT` es específica de MySQL/MariaDB — en PostgreSQL se usa `STRING_AGG`
