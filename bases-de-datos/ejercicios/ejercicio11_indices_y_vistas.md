# Ejercicio 11: Índices y vistas

## Dominio

Tienda de música. Usamos `tienda_musica` con los datos de los ejercicios anteriores.

---

## Objetivo

Crea índices en las columnas que se consultan frecuentemente y crea vistas que simplifiquen las consultas más usadas de la tienda.

**Índices a crear:**

1. Un índice en `albumes.anio_lanzamiento` — la tienda filtra álbumes por año con frecuencia
2. Un índice en `compras.fecha_compra` — los reportes de ventas buscan por fecha
3. Antes de crear el índice en `albumes.anio_lanzamiento`, ejecuta `EXPLAIN` para ver si la consulta hace full scan, luego vuelve a ejecutarlo después de crear el índice y compara el campo `type`

También reflexiona: ¿tiene sentido crear un índice en `albumes.disponible`? ¿Por qué sí o por qué no?

**Vistas a crear:**

**Vista 1 — `albumes_con_artista`:** muestra todos los álbumes con el nombre de su artista, el país del artista, el año de lanzamiento y si está disponible.

**Vista 2 — `compras_detalle`:** muestra todas las compras con el nombre del cliente, el título del álbum, el nombre del artista, la fecha de compra y el precio pagado.

**Vista 3 — `resumen_clientes`:** muestra para cada cliente su nombre, email y la cantidad total de compras que realizó (incluye clientes con 0 compras).

---

## Tu turno

Escribe los `CREATE INDEX` y los `CREATE VIEW` necesarios. Luego consulta cada vista con un `SELECT` para verificar que devuelve los datos esperados.

---

## Solución

```sql
USE tienda_musica;

-- Índices

-- Ver estado antes del índice
EXPLAIN SELECT * FROM albumes WHERE anio_lanzamiento = 1969\G

-- Crear índice en año de lanzamiento
CREATE INDEX idx_albumes_anio ON albumes(anio_lanzamiento);

-- Ver estado después del índice (type debería cambiar de ALL a range o ref)
EXPLAIN SELECT * FROM albumes WHERE anio_lanzamiento = 1969\G

-- Índice en fecha de compra
CREATE INDEX idx_compras_fecha ON compras(fecha_compra);

-- Verificar los índices creados
SHOW INDEX FROM albumes;
SHOW INDEX FROM compras;
```

Sobre `albumes.disponible`: **no tiene sentido** crear un índice en una columna booleana. Los índices son útiles cuando hay muchos valores distintos (alta cardinalidad). Con solo dos valores posibles (0 y 1), el motor probablemente igualará o superará el 50% de las filas con cualquier condición — en ese caso es más eficiente hacer un full scan.

```sql
-- Vista 1: álbumes con datos del artista
CREATE VIEW albumes_con_artista AS
SELECT
    a.id,
    a.titulo,
    ar.nombre  AS artista,
    ar.pais    AS pais_artista,
    a.anio_lanzamiento,
    a.precio,
    a.disponible
FROM albumes a
INNER JOIN artistas ar ON a.artista_id = ar.id;

-- Consultar la vista
SELECT titulo, artista, anio_lanzamiento FROM albumes_con_artista
WHERE disponible = TRUE
ORDER BY artista, anio_lanzamiento;

-- Vista 2: compras con detalle completo
CREATE VIEW compras_detalle AS
SELECT
    c.id          AS compra_id,
    cl.nombre     AS cliente,
    a.titulo      AS album,
    ar.nombre     AS artista,
    c.fecha_compra,
    c.precio_pagado
FROM compras c
INNER JOIN clientes cl ON c.cliente_id = cl.id
INNER JOIN albumes  a  ON c.album_id   = a.id
INNER JOIN artistas ar ON a.artista_id = ar.id;

-- Consultar la vista
SELECT * FROM compras_detalle ORDER BY fecha_compra DESC;

-- Vista 3: resumen por cliente
CREATE VIEW resumen_clientes AS
SELECT
    cl.id,
    cl.nombre,
    cl.email,
    COUNT(c.id) AS total_compras
FROM clientes cl
LEFT JOIN compras c ON cl.id = c.cliente_id
GROUP BY cl.id, cl.nombre, cl.email;

-- Consultar la vista
SELECT nombre, total_compras FROM resumen_clientes ORDER BY total_compras DESC;

-- Verificar que las vistas existen
SHOW FULL TABLES WHERE Table_type = 'VIEW';
```

**Puntos a comparar con tu solución:**
- `EXPLAIN` muestra el campo `type`: `ALL` significa full scan (lento en tablas grandes), `range` o `ref` significa que usa el índice
- Las vistas son solo consultas guardadas — no almacenan datos. Cada `SELECT` sobre la vista ejecuta el `JOIN` en tiempo real
- `LEFT JOIN` en `resumen_clientes` es esencial para incluir clientes sin compras; con `INNER JOIN` desaparecerían
- Los índices en claves foráneas (`artista_id`, `album_id`, `cliente_id`) ya los crea automáticamente MariaDB al declarar el `FOREIGN KEY`
