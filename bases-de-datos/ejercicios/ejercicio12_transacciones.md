# Ejercicio 12: Transacciones

## Dominio

Tienda de música. Usamos `tienda_musica` con los datos de los ejercicios anteriores.

---

## Objetivo

Implementa dos operaciones de negocio de la tienda usando transacciones para garantizar que los datos se mantienen consistentes.

**Operación 1 — Registrar una compra:**

Cuando un cliente compra un álbum deben ocurrir dos cosas al mismo tiempo:
- Se inserta una fila en `compras`
- El álbum se marca como `disponible = FALSE` (el stock se agotó)

Si cualquiera de las dos falla, ninguna debe guardarse.

Registra la compra del álbum "Signos" por el cliente "Marcos Díaz". Busca sus ids con `SELECT` antes de iniciar la transacción.

**Operación 2 — Simular un error con ROLLBACK:**

Inicia una transacción que inserte una compra para un cliente inexistente (id = 999). La inserción fallará por la clave foránea. Observa qué pasa con `ROLLBACK` y verifica que la tabla `compras` no tiene la fila.

**Operación 3 — Reponer stock:**

Cuando un álbum vuelve a estar disponible (por ejemplo, se agrega una edición digital), se actualiza `disponible = TRUE`. Hazlo para "Signos" usando una transacción, y verifica el estado antes y después.

---

## Tu turno

Escribe las tres secuencias de SQL con sus `START TRANSACTION`, operaciones y `COMMIT` o `ROLLBACK`. Usa `SELECT` antes de cada transacción para confirmar los ids y el estado inicial.

---

## Solución

```sql
USE tienda_musica;

-- ─── Operación 1: Registrar compra ────────────────────────────────────────────

-- Buscar ids
SELECT id, nombre FROM clientes WHERE nombre = 'Marcos Díaz';
-- Resultado: id = 2

SELECT id, titulo, disponible FROM albumes WHERE titulo = 'Signos';
-- Resultado: id = 3, disponible = 1

START TRANSACTION;

INSERT INTO compras (cliente_id, album_id, precio_pagado)
VALUES (2, 3, 7.99);

UPDATE albumes SET disponible = FALSE WHERE id = 3;

COMMIT;

-- Verificar
SELECT titulo, disponible FROM albumes WHERE id = 3;
SELECT * FROM compras ORDER BY id DESC LIMIT 1;


-- ─── Operación 2: Simular error con ROLLBACK ──────────────────────────────────

START TRANSACTION;

-- Esto fallará: cliente_id = 999 no existe (viola la clave foránea)
INSERT INTO compras (cliente_id, album_id, precio_pagado)
VALUES (999, 1, 9.99);

ROLLBACK;

-- Verificar que la fila no existe
SELECT COUNT(*) FROM compras WHERE cliente_id = 999;
-- Debe devolver 0


-- ─── Operación 3: Reponer stock ───────────────────────────────────────────────

-- Estado actual
SELECT titulo, disponible FROM albumes WHERE titulo = 'Signos';
-- disponible = 0

START TRANSACTION;

UPDATE albumes SET disponible = TRUE WHERE titulo = 'Signos';

COMMIT;

-- Verificar
SELECT titulo, disponible FROM albumes WHERE titulo = 'Signos';
-- disponible = 1
```

**Puntos a comparar con tu solución:**
- La transacción en la Operación 1 garantiza atomicidad: si el `UPDATE` falla (por ejemplo, por un error de red), el `INSERT` también se deshace — la tabla no queda con una compra sin stock actualizado
- En la Operación 2, MariaDB hace el `ROLLBACK` automáticamente cuando una sentencia dentro de una transacción viola una clave foránea — pero es buena práctica llamarlo explícitamente para dejar claro el flujo
- En PHP (Tema 14), el `ROLLBACK` se llama dentro del bloque `catch` de un `try/catch`, que es la forma correcta de manejar errores en código de aplicación
- `COMMIT` solo guarda los cambios si todas las sentencias anteriores de la transacción tuvieron éxito
