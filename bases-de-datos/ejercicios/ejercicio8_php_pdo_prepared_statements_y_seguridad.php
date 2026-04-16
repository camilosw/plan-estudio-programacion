<?php
// ============================================================
// EJERCICIO 8: PHP y PDO — Prepared statements y seguridad
// ============================================================
// Dominio: Tienda de música
//
// Antes de ejecutar:
//   - MariaDB corriendo: sudo service mariadb start
//   - Base de datos `tienda_musica` con `artistas` y `albumes`
//     poblados (ejercicios 4–6). Todavía no se vieron claves
//     foráneas formales.
//   - Ejecutar: php ejercicio8_php_pdo_prepared_statements_y_seguridad.php
// ============================================================
//
// OBJETIVO
// --------
// Implementa cuatro funciones que usan prepared statements para
// interactuar con la base de datos `tienda_musica`.
//
// No hay pasos predefinidos. Estudia el Tema 8 e implementa
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
// Función 1: Buscar álbumes por rango de años (BETWEEN)
// ============================================================
// Devuelve los álbumes publicados entre $desde y $hasta (inclusive).
// Usa un prepared statement con BETWEEN y parámetros nombrados.
// Devuelve un array de arrays asociativos con: titulo, anio_lanzamiento, precio.

function buscarAlbumesPorAnio(PDO $pdo, int $desde, int $hasta): array
{
    // TODO: implementar
}

// Prueba:
echo "=== Álbumes publicados entre 1990 y 2000 ===\n";
foreach (buscarAlbumesPorAnio($pdo, 1990, 2000) as $a) {
    echo "{$a['titulo']} ({$a['anio_lanzamiento']}) — \${$a['precio']}\n";
}
echo "\n";

// ============================================================
// Función 2: Buscar artistas por país (LIKE)
// ============================================================
// Busca artistas cuyo país contenga $parte_pais (búsqueda parcial).
// Usa LIKE con un prepared statement.
// Devuelve un array de arrays asociativos con: id, nombre, pais.

function buscarArtistasPorPais(PDO $pdo, string $parte_pais): array
{
    // TODO: implementar
}

// Prueba:
echo "=== Artistas de países que contengan 'Unido' ===\n";
foreach (buscarArtistasPorPais($pdo, 'Unido') as $ar) {
    echo "[{$ar['id']}] {$ar['nombre']} — {$ar['pais']}\n";
}
echo "\n";

// ============================================================
// Función 3: Agregar un álbum
// ============================================================
// Inserta un nuevo álbum en `albumes`.
// Devuelve el id asignado (lastInsertId como int).
// Usa parámetros nombrados.

function agregarAlbum(PDO $pdo, string $titulo, int $artista_id, int $anio, float $precio): int
{
    // TODO: implementar
}

// Prueba:
echo "=== Agregar álbum de prueba ===\n";
$id_nuevo = agregarAlbum($pdo, 'Álbum de Prueba', 1, 2020, 9.99);
echo "Álbum creado con id: $id_nuevo\n";
echo "\n";

// ============================================================
// Función 4: Actualizar el precio de un álbum
// ============================================================
// Actualiza el campo `precio` del álbum con ese id.
// Devuelve true si se modificó al menos una fila, false si no.

function actualizarPrecio(PDO $pdo, int $album_id, float $nuevo_precio): bool
{
    // TODO: implementar
}

// Prueba:
echo "=== Actualizar precio del álbum de prueba ===\n";
$exito = actualizarPrecio($pdo, $id_nuevo, 14.99);
echo $exito ? "Precio actualizado.\n" : "No se encontró el álbum.\n";

$stmt = $pdo->prepare("SELECT titulo, precio FROM albumes WHERE id = :id");
$stmt->execute([':id' => $id_nuevo]);
$album = $stmt->fetch();
echo "{$album['titulo']}: \${$album['precio']}\n";
echo "\n";

// Limpieza: eliminar el álbum de prueba
$pdo->prepare("DELETE FROM albumes WHERE id = :id")->execute([':id' => $id_nuevo]);
echo "Álbum de prueba eliminado.\n";

// ============================================================
// SOLUCIÓN
// ============================================================
/*

function buscarAlbumesPorAnio(PDO $pdo, int $desde, int $hasta): array
{
    $stmt = $pdo->prepare("
        SELECT titulo, anio_lanzamiento, precio
        FROM albumes
        WHERE anio_lanzamiento BETWEEN :desde AND :hasta
        ORDER BY anio_lanzamiento
    ");
    $stmt->execute([':desde' => $desde, ':hasta' => $hasta]);
    return $stmt->fetchAll();
}

function buscarArtistasPorPais(PDO $pdo, string $parte_pais): array
{
    $stmt = $pdo->prepare("
        SELECT id, nombre, pais FROM artistas
        WHERE pais LIKE :pais
        ORDER BY nombre
    ");
    $stmt->execute([':pais' => "%$parte_pais%"]);
    return $stmt->fetchAll();
}

function agregarAlbum(PDO $pdo, string $titulo, int $artista_id, int $anio, float $precio): int
{
    $stmt = $pdo->prepare("
        INSERT INTO albumes (titulo, artista_id, anio_lanzamiento, precio)
        VALUES (:titulo, :artista_id, :anio, :precio)
    ");
    $stmt->execute([
        ':titulo'     => $titulo,
        ':artista_id' => $artista_id,
        ':anio'       => $anio,
        ':precio'     => $precio,
    ]);
    return (int) $pdo->lastInsertId();
}

function actualizarPrecio(PDO $pdo, int $album_id, float $nuevo_precio): bool
{
    $stmt = $pdo->prepare("UPDATE albumes SET precio = :precio WHERE id = :id");
    $stmt->execute([':precio' => $nuevo_precio, ':id' => $album_id]);
    return $stmt->rowCount() > 0;
}

*/
