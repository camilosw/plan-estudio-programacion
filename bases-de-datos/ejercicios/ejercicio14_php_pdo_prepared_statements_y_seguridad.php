<?php
// ============================================================
// EJERCICIO 14: PHP y PDO — Prepared statements y seguridad
// ============================================================
// Dominio: Tienda de música
//
// Antes de ejecutar:
//   php ejercicio14_php_pdo_prepared_statements_y_seguridad.php
// ============================================================
//
// OBJETIVO
// --------
// Implementa cuatro funciones que usan prepared statements para
// interactuar con la base de datos `tienda_musica`.
//
// No hay pasos predefinidos. Estudia el Tema 14 e implementa
// cada función para que produzca la salida indicada.
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
// Función 1: Buscar álbumes por nombre de artista (LIKE)
// ============================================================
// Busca álbumes cuyos artistas contengan $nombre_artista en su nombre
// (búsqueda parcial). Usa un prepared statement.
// Devuelve un array de arrays asociativos con: titulo, artista, anio_lanzamiento.

function buscarAlbumesPorArtista(PDO $pdo, string $nombre_artista): array
{
    // TODO: implementar
}

// Prueba:
echo "=== Álbumes de Beatles ===\n";
foreach (buscarAlbumesPorArtista($pdo, 'Beatles') as $a) {
    echo "{$a['titulo']} ({$a['anio_lanzamiento']}) — {$a['artista']}\n";
}
// Salida esperada:
// Abbey Road (1969) — The Beatles
// Sgt. Pepper's (1967) — The Beatles
echo "\n";

// ============================================================
// Función 2: Agregar un cliente
// ============================================================
// Inserta un nuevo cliente en `clientes`.
// Devuelve el id asignado (lastInsertId).
// Usa parámetros nombrados.

function agregarCliente(PDO $pdo, string $nombre, string $email, ?string $telefono = null): int
{
    // TODO: implementar
}

// Prueba:
echo "=== Agregar cliente de prueba ===\n";
$id_nuevo = agregarCliente($pdo, 'Cliente Prueba', 'prueba@ejercicio.com', '11-0000-0000');
echo "Cliente creado con id: $id_nuevo\n";
echo "\n";

// ============================================================
// Función 3: Desactivar un cliente (borrado lógico)
// ============================================================
// Actualiza el campo `activo` a FALSE del cliente con ese id.
// Devuelve true si se modificó al menos una fila, false si no.

function desactivarCliente(PDO $pdo, int $id): bool
{
    // TODO: implementar
}

// Prueba:
echo "=== Desactivar cliente de prueba ===\n";
$exito = desactivarCliente($pdo, $id_nuevo);
echo $exito ? "Cliente desactivado.\n" : "No se encontró el cliente.\n";

$stmt = $pdo->prepare("SELECT nombre, activo FROM clientes WHERE id = :id");
$stmt->execute([':id' => $id_nuevo]);
$cliente = $stmt->fetch();
echo "Estado de {$cliente['nombre']}: " . ($cliente['activo'] ? 'activo' : 'inactivo') . "\n";
echo "\n";

// ============================================================
// Función 4: Registrar una compra con validación previa
// ============================================================
// Antes de insertar, verifica que el álbum existe y está disponible.
// Si no está disponible, lanza: throw new RuntimeException("...")
// Si está disponible, inserta en `compras` y devuelve el id de la compra.
// (La transacción completa — insert + update disponible — es para el Ejercicio 15)

function registrarCompra(PDO $pdo, int $cliente_id, int $album_id, float $precio): int
{
    // TODO: implementar
}

// Prueba:
echo "=== Intentar comprar el álbum id=5 (Re) ===\n";
try {
    $compra_id = registrarCompra($pdo, 1, 5, 8.99);
    echo "Compra registrada con id: $compra_id\n";
} catch (RuntimeException $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
echo "\n";

// Limpieza: eliminar el cliente de prueba
$pdo->prepare("DELETE FROM clientes WHERE id = :id")->execute([':id' => $id_nuevo]);
echo "Cliente de prueba eliminado.\n";

// ============================================================
// SOLUCIÓN
// ============================================================
/*

function buscarAlbumesPorArtista(PDO $pdo, string $nombre_artista): array
{
    $stmt = $pdo->prepare("
        SELECT a.titulo, ar.nombre AS artista, a.anio_lanzamiento
        FROM albumes a
        INNER JOIN artistas ar ON a.artista_id = ar.id
        WHERE ar.nombre LIKE :nombre
        ORDER BY a.anio_lanzamiento DESC
    ");
    $stmt->execute([':nombre' => "%$nombre_artista%"]);
    return $stmt->fetchAll();
}

function agregarCliente(PDO $pdo, string $nombre, string $email, ?string $telefono = null): int
{
    $stmt = $pdo->prepare("
        INSERT INTO clientes (nombre, email, telefono)
        VALUES (:nombre, :email, :telefono)
    ");
    $stmt->execute([
        ':nombre'   => $nombre,
        ':email'    => $email,
        ':telefono' => $telefono,
    ]);
    return (int) $pdo->lastInsertId();
}

function desactivarCliente(PDO $pdo, int $id): bool
{
    $stmt = $pdo->prepare("UPDATE clientes SET activo = FALSE WHERE id = :id");
    $stmt->execute([':id' => $id]);
    return $stmt->rowCount() > 0;
}

function registrarCompra(PDO $pdo, int $cliente_id, int $album_id, float $precio): int
{
    $stmt = $pdo->prepare("SELECT id, disponible FROM albumes WHERE id = :id");
    $stmt->execute([':id' => $album_id]);
    $album = $stmt->fetch();

    if (!$album) {
        throw new RuntimeException("El álbum con id=$album_id no existe.");
    }
    if (!$album['disponible']) {
        throw new RuntimeException("El álbum con id=$album_id no está disponible.");
    }

    $stmt = $pdo->prepare("
        INSERT INTO compras (cliente_id, album_id, precio_pagado)
        VALUES (:cliente_id, :album_id, :precio)
    ");
    $stmt->execute([
        ':cliente_id' => $cliente_id,
        ':album_id'   => $album_id,
        ':precio'     => $precio,
    ]);
    return (int) $pdo->lastInsertId();
}

*/
