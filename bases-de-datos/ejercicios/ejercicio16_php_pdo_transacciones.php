<?php
// ============================================================
// EJERCICIO 16: PHP y PDO — Transacciones
// ============================================================
// Dominio: Tienda de música
//
// Antes de ejecutar:
//   - MariaDB corriendo: sudo service mariadb start
//   - Base de datos `tienda_musica` con todas las tablas
//     pobladas hasta el Ejercicio 15.
//   - Ejecutar: php ejercicio16_php_pdo_transacciones.php
// ============================================================
//
// OBJETIVO
// --------
// Implementar dos funciones que agrupan varias operaciones
// en una transacción. Si alguna operación falla, ninguna
// debe quedar aplicada. Estudia el Tema 16.
//
// ============================================================

// Conexión (completa la contraseña)
$pdo = new PDO(
    'mysql:host=127.0.0.1;dbname=tienda_musica;charset=utf8mb4',
    'sandra',
    'tu_contraseña_aqui',
    [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ]
);

// ============================================================
// Función 1: Registrar una compra con transacción
// ============================================================
// Pasos dentro de la transacción:
//   1. Verificar que el álbum existe y está disponible.
//      Si no, lanzar RuntimeException.
//   2. Insertar en `compras` con cliente_id, album_id y precio.
//   3. Marcar el álbum como no disponible (disponible = FALSE).
// Si cualquier paso falla, se debe hacer rollBack().
// Devuelve el id de la compra insertada.

function registrarCompra(PDO $pdo, int $cliente_id, int $album_id, float $precio): int
{
    // TODO: implementar con beginTransaction / commit / rollBack
}

// Prueba 1: compra válida
echo "=== Registrar compra del álbum id=5 ===\n";
try {
    $compra_id = registrarCompra($pdo, 1, 5, 9.99);
    echo "Compra registrada con id: $compra_id\n";
} catch (Throwable $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
echo "\n";

// Prueba 2: intentar comprar el mismo álbum otra vez (ya no disponible)
echo "=== Intentar comprar de nuevo el álbum id=5 ===\n";
try {
    $compra_id = registrarCompra($pdo, 2, 5, 9.99);
    echo "Compra registrada con id: $compra_id\n";
} catch (Throwable $e) {
    echo "Error esperado: " . $e->getMessage() . "\n";
}
echo "\n";

// ============================================================
// Función 2: Anular una compra (deshacer con transacción)
// ============================================================
// Pasos dentro de la transacción:
//   1. Verificar que la compra existe. Si no, RuntimeException.
//   2. Obtener el album_id de esa compra.
//   3. Eliminar la fila de `compras`.
//   4. Marcar el álbum como disponible (disponible = TRUE).

function anularCompra(PDO $pdo, int $compra_id): void
{
    // TODO: implementar con beginTransaction / commit / rollBack
}

echo "=== Anular la compra registrada ===\n";
try {
    anularCompra($pdo, $compra_id);
    echo "Compra anulada. El álbum vuelve a estar disponible.\n";
} catch (Throwable $e) {
    echo "Error: " . $e->getMessage() . "\n";
}

// Verificar que el álbum 5 está disponible de nuevo
$stmt = $pdo->prepare("SELECT disponible FROM albumes WHERE id = :id");
$stmt->execute([':id' => 5]);
echo "Álbum 5 disponible: " . ($stmt->fetchColumn() ? 'sí' : 'no') . "\n";

// ============================================================
// SOLUCIÓN
// ============================================================
/*

function registrarCompra(PDO $pdo, int $cliente_id, int $album_id, float $precio): int
{
    $pdo->beginTransaction();
    try {
        $stmt = $pdo->prepare("SELECT disponible FROM albumes WHERE id = :id");
        $stmt->execute([':id' => $album_id]);
        $album = $stmt->fetch();

        if (!$album) {
            throw new RuntimeException("El álbum id=$album_id no existe.");
        }
        if (!$album['disponible']) {
            throw new RuntimeException("El álbum id=$album_id no está disponible.");
        }

        $stmt = $pdo->prepare(
            "INSERT INTO compras (cliente_id, album_id, precio_pagado)
             VALUES (:cliente_id, :album_id, :precio)"
        );
        $stmt->execute([
            ':cliente_id' => $cliente_id,
            ':album_id'   => $album_id,
            ':precio'     => $precio,
        ]);
        $compra_id = (int) $pdo->lastInsertId();

        $stmt = $pdo->prepare("UPDATE albumes SET disponible = FALSE WHERE id = :id");
        $stmt->execute([':id' => $album_id]);

        $pdo->commit();
        return $compra_id;
    } catch (Throwable $e) {
        $pdo->rollBack();
        throw $e;
    }
}

function anularCompra(PDO $pdo, int $compra_id): void
{
    $pdo->beginTransaction();
    try {
        $stmt = $pdo->prepare("SELECT album_id FROM compras WHERE id = :id");
        $stmt->execute([':id' => $compra_id]);
        $compra = $stmt->fetch();

        if (!$compra) {
            throw new RuntimeException("La compra id=$compra_id no existe.");
        }

        $stmt = $pdo->prepare("DELETE FROM compras WHERE id = :id");
        $stmt->execute([':id' => $compra_id]);

        $stmt = $pdo->prepare("UPDATE albumes SET disponible = TRUE WHERE id = :id");
        $stmt->execute([':id' => $compra['album_id']]);

        $pdo->commit();
    } catch (Throwable $e) {
        $pdo->rollBack();
        throw $e;
    }
}

*/
