# Ejercicio 10: Normalización

## Dominio

Tienda de música. Este ejercicio es principalmente de análisis y diseño — no hay que ejecutar SQL en MariaDB. El objetivo es aprender a reconocer problemas de normalización antes de codificar.

---

## Objetivo

Analiza tres tablas mal diseñadas relacionadas con una tienda de música, identifica qué forma normal violan y propón el esquema correcto.

---

## Tu turno

### Problema 1: Violación de 1FN

Analiza esta tabla y responde las preguntas:

```
tabla: ventas_mal_disenada
+----+----------+------------------------------+-----------+-----------+
| id | cliente  | albumes_comprados            | total     | telefono1 | telefono2 |
+----+----------+------------------------------+-----------+-----------+
|  1 | Laura    | Abbey Road, OK Computer      | 21.98     | 1111-1111 | 2222-2222 |
|  2 | Marcos   | Signos                       |  7.99     | 3333-3333 | NULL      |
+----+----------+------------------------------+-----------+-----------+
```

1. ¿Cuántas violaciones de 1FN puedes identificar?
2. ¿Qué problema concreto genera guardar "Abbey Road, OK Computer" en una sola celda?
3. ¿Qué problema genera tener `telefono1` y `telefono2` como columnas separadas?
4. Diseña el esquema correcto en 1FN. ¿Qué tablas necesitas?

### Problema 2: Violación de 2FN

Analiza esta tabla con clave primaria compuesta (sello_id, album_id):

```
tabla: sello_albumes
+----------+----------+------------------+---------------+--------------+
| sello_id | album_id | nombre_sello     | pais_sello    | titulo_album |
+----------+----------+------------------+---------------+--------------+
|        1 |        1 | EMI Records      | Reino Unido   | Abbey Road   |
|        1 |        2 | EMI Records      | Reino Unido   | Sgt. Pepper's|
|        2 |        3 | BMG              | Estados Unidos| Signos       |
+----------+----------+------------------+---------------+--------------+
```

1. ¿Qué columnas dependen solo de `sello_id` (no del álbum)?
2. ¿Qué problema ocurre si EMI Records cambia de país?
3. Diseña las tablas en 2FN.

### Problema 3: Violación de 3FN

Analiza esta tabla:

```
tabla: albumes_con_datos_artista
+----+---------------+------------+------------------+---------------+
| id | titulo        | artista_id | nombre_artista   | pais_artista  |
+----+---------------+------------+------------------+---------------+
|  1 | Abbey Road    |          1 | The Beatles      | Reino Unido   |
|  2 | Sgt. Pepper's |          1 | The Beatles      | Reino Unido   |
|  3 | Signos        |          2 | Soda Stereo      | Argentina     |
+----+---------------+------------+------------------+---------------+
```

1. ¿De qué depende `nombre_artista`? ¿Del `id` del álbum o del `artista_id`?
2. ¿Hay dependencia transitiva? Descríbela.
3. ¿Cómo se corrige?

### Verificación conceptual

Revisa el esquema que construiste en `tienda_musica` y responde:

1. ¿Hay alguna columna en `albumes` que dependa de otra columna que no sea `id`?
2. ¿Por qué la tabla `albumes_generos` es la solución correcta para la relación N:M?
3. Imagina que quieres agregar el nombre del sello discográfico a `albumes`. ¿Lo agregarías como columna directa o crearías una tabla `sellos`? ¿Por qué?

---

## Solución

### Problema 1 — Violación de 1FN

**Violaciones encontradas (2):**
- `albumes_comprados` contiene múltiples valores en una sola celda (valor no atómico)
- `telefono1` + `telefono2` son columnas repetidas para el mismo tipo de dato (grupo repetitivo)

**Problema de `albumes_comprados` como lista:** no se puede filtrar por álbum individual con `WHERE`, no se puede contar cuántos álbumes compró cada cliente, y agregar un tercer álbum requiere modificar la columna.

**Problema de `telefono1/telefono2`:** si un cliente tiene tres teléfonos hay que agregar otra columna; si tiene solo uno, `telefono2` queda NULL desperdiciando espacio.

**Esquema correcto en 1FN:**

```sql
CREATE TABLE clientes (
    id      INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre  VARCHAR(150) NOT NULL
);

CREATE TABLE telefonos_cliente (
    id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT UNSIGNED NOT NULL,
    telefono   VARCHAR(20) NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

CREATE TABLE ventas (
    id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

CREATE TABLE ventas_albumes (
    venta_id INT UNSIGNED NOT NULL,
    album_id INT UNSIGNED NOT NULL,
    precio   DECIMAL(8,2) NOT NULL,
    PRIMARY KEY (venta_id, album_id)
);
```

### Problema 2 — Violación de 2FN

**Columnas que dependen solo de `sello_id`:** `nombre_sello` y `pais_sello`

**Problema de actualización:** si EMI Records cambia de país hay que actualizar cada fila donde aparece — riesgo de inconsistencia.

**Esquema correcto en 2FN:**

```sql
CREATE TABLE sellos (
    id     INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    pais   VARCHAR(100)
);

CREATE TABLE albumes (
    id        INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    titulo    VARCHAR(255) NOT NULL,
    sello_id  INT UNSIGNED,
    FOREIGN KEY (sello_id) REFERENCES sellos(id)
);
```

### Problema 3 — Violación de 3FN

**Dependencia transitiva:** `id → artista_id → nombre_artista, pais_artista`

`nombre_artista` no depende directamente del `id` del álbum, sino de `artista_id`. Esto es una dependencia transitiva: para saber el nombre del artista hay que pasar por `artista_id`.

**Corrección:** separar en dos tablas, como ya hicimos en `tienda_musica`:

```sql
-- albumes solo guarda artista_id (la referencia), no el nombre
-- artistas guarda nombre y pais
-- Para obtener ambos se usa JOIN
SELECT a.titulo, ar.nombre AS artista, ar.pais
FROM albumes a INNER JOIN artistas ar ON a.artista_id = ar.id;
```

### Verificación conceptual

1. No — en `albumes` cada columna depende únicamente del `id` del álbum. `artista_id` es una referencia (no el nombre), por lo que no hay dependencia transitiva.
2. `albumes_generos` permite que un álbum tenga varios géneros y un género aparezca en varios álbumes, sin repetir datos. Una columna `genero` en `albumes` solo permitiría un género por álbum.
3. Se crearía una tabla `sellos` separada y se agregaría `sello_id` en `albumes`. Poner `nombre_sello` directamente en `albumes` violaría la 2FN o la 3FN dependiendo de la estructura.
