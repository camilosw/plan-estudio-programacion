# Ejercicio 6: UPDATE, DELETE y WHERE

## Dominio

Tienda de música. Continuamos con `tienda_musica` con los datos insertados en el Ejercicio 5.

---

## Objetivo

Modifica y elimina datos usando `UPDATE` y `DELETE` con condiciones `WHERE` precisas.

**Modificaciones a realizar:**

1. El álbum "Dynamo" vuelve a estar disponible. Actualiza su campo `disponible`.
2. Radiohead fundó la banda en 1985, pero el dato real es 1986. Corrige el `anio_inicio` del artista con ese nombre.
3. El precio de todos los álbumes de The Beatles (artista_id = 1) sube a 12.99. Actualízalos con una sola sentencia.
4. Inserta un artista de prueba con nombre `'Artista Temporal'` y país `'Ninguno'`, luego elimínalo por su `id`. Antes de eliminarlo, confirma con un `SELECT` qué id recibió.

**Consultas con WHERE a escribir:**

1. Álbumes que NO están disponibles
2. Artistas cuyo nombre contiene la palabra `'Stereo'`
3. Álbumes lanzados entre 1980 y 2000, ordenados por año
4. Álbumes con precio mayor o igual a 10.00
5. Artistas de `'Reino Unido'` o `'Argentina'`

---

## Tu turno

Escribe las sentencias `UPDATE`, `DELETE` e `INSERT` necesarias, y luego las cinco consultas `SELECT`. Para el `DELETE`, usa siempre el `id` como condición — nunca el nombre.

---

## Solución

```sql
USE tienda_musica;

-- 1. Dynamo vuelve a estar disponible
UPDATE albumes SET disponible = TRUE WHERE titulo = 'Dynamo';

-- 2. Corregir año de inicio de Radiohead
UPDATE artistas SET anio_inicio = 1986 WHERE nombre = 'Radiohead';

-- 3. Actualizar precio de todos los álbumes de The Beatles
UPDATE albumes SET precio = 12.99 WHERE artista_id = 1;

-- 4a. Insertar artista temporal
INSERT INTO artistas (nombre, pais) VALUES ('Artista Temporal', 'Ninguno');

-- 4b. Confirmar su id
SELECT id, nombre FROM artistas WHERE nombre = 'Artista Temporal';

-- 4c. Eliminarlo (reemplaza N por el id real que devolvió el SELECT)
DELETE FROM artistas WHERE id = N;

-- Consultas WHERE

-- 1. Álbumes no disponibles
SELECT titulo, disponible FROM albumes WHERE disponible = FALSE;

-- 2. Artistas cuyo nombre contiene 'Stereo'
SELECT * FROM artistas WHERE nombre LIKE '%Stereo%';

-- 3. Álbumes entre 1980 y 2000
SELECT titulo, anio_lanzamiento FROM albumes
WHERE anio_lanzamiento BETWEEN 1980 AND 2000
ORDER BY anio_lanzamiento;

-- 4. Álbumes con precio >= 10.00
SELECT titulo, precio FROM albumes WHERE precio >= 10.00;

-- 5. Artistas de Reino Unido o Argentina
SELECT nombre, pais FROM artistas WHERE pais IN ('Reino Unido', 'Argentina');
```

**Puntos a comparar con tu solución:**
- `UPDATE ... WHERE artista_id = 1` actualiza varias filas a la vez — es correcto y eficiente
- `BETWEEN 1980 AND 2000` incluye ambos extremos (equivale a `>= 1980 AND <= 2000`)
- `IN ('Reino Unido', 'Argentina')` es más claro que dos condiciones `OR`
- Siempre hacer un `SELECT` antes de un `DELETE` sin `WHERE` o con condición débil es un hábito importante
