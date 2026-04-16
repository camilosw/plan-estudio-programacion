# Ejercicio 5: INSERT y SELECT básico

## Dominio

Tienda de música. Continuamos con la base de datos `tienda_musica` creada en el Ejercicio 4.

---

## Objetivo

Inserta datos en las tablas `artistas` y `albumes`, luego escribe consultas para recuperarlos.

**Datos a insertar en `artistas`:**

| nombre | pais | anio_inicio |
|---|---|---|
| The Beatles | Reino Unido | 1960 |
| Soda Stereo | Argentina | 1982 |
| Café Tacvba | México | 1989 |
| Radiohead | Reino Unido | 1985 |

**Datos a insertar en `albumes`:**

| titulo | artista_id | anio_lanzamiento | precio | disponible |
|---|---|---|---|---|
| Abbey Road | 1 | 1969 | 9.99 | true |
| Sgt. Pepper's | 1 | 1967 | 9.99 | true |
| Signos | 2 | 1986 | 7.99 | true |
| Dynamo | 2 | 1992 | 7.99 | false |
| Re | 3 | 1994 | 8.99 | true |
| OK Computer | 4 | 1997 | 11.99 | true |

**Consultas a escribir:**

1. Todos los artistas
2. Solo el nombre y el país de los artistas
3. Todos los álbumes disponibles
4. Los álbumes lanzados antes de 1990
5. Los álbumes con precio menor a 10.00, ordenados por precio de menor a mayor
6. Cuántos álbumes hay en total (usa `COUNT`)

---

## Tu turno

Escribe los `INSERT` necesarios y luego las seis consultas `SELECT`. No uses `JOIN` todavía — en este ejercicio todo viene de una sola tabla por consulta.

---

## Solución

```sql
USE tienda_musica;

-- Insertar artistas
INSERT INTO artistas (nombre, pais, anio_inicio) VALUES
    ('The Beatles',  'Reino Unido', 1960),
    ('Soda Stereo',  'Argentina',   1982),
    ('Café Tacvba',  'México',      1989),
    ('Radiohead',    'Reino Unido', 1985);

-- Insertar álbumes
INSERT INTO albumes (titulo, artista_id, anio_lanzamiento, precio, disponible) VALUES
    ('Abbey Road',      1, 1969,  9.99, TRUE),
    ("Sgt. Pepper's",   1, 1967,  9.99, TRUE),
    ('Signos',          2, 1986,  7.99, TRUE),
    ('Dynamo',          2, 1992,  7.99, FALSE),
    ('Re',              3, 1994,  8.99, TRUE),
    ('OK Computer',     4, 1997, 11.99, TRUE);

-- 1. Todos los artistas
SELECT * FROM artistas;

-- 2. Solo nombre y país
SELECT nombre, pais FROM artistas;

-- 3. Álbumes disponibles
SELECT * FROM albumes WHERE disponible = TRUE;

-- 4. Álbumes lanzados antes de 1990
SELECT * FROM albumes WHERE anio_lanzamiento < 1990;

-- 5. Álbumes con precio menor a 10.00, ordenados por precio
SELECT titulo, precio FROM albumes WHERE precio < 10.00 ORDER BY precio ASC;

-- 6. Total de álbumes
SELECT COUNT(*) AS total_albumes FROM albumes;
```

**Puntos a comparar con tu solución:**
- El `INSERT` con múltiples filas en un solo statement es más eficiente que varios `INSERT` separados
- `WHERE disponible = TRUE` también puede escribirse `WHERE disponible = 1` — MariaDB los trata igual
- `ORDER BY precio ASC` — `ASC` es el orden por defecto, pero escribirlo hace el código más claro
- `COUNT(*)` cuenta todas las filas; `COUNT(columna)` ignora los NULL de esa columna
