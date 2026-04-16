<?php
// ============================================================
// EJERCICIO 12: PHP y PDO — Consultas con JOINs
// ============================================================
// Dominio: Tienda de música
//
// Antes de ejecutar:
//   - MariaDB corriendo: sudo service mariadb start
//   - Base de datos `tienda_musica` con todas las tablas creadas
//     hasta el Ejercicio 11 (artistas, albumes, canciones,
//     generos, albumes_generos, clientes, compras).
//   - Ejecutar: php ejercicio12_php_pdo_joins.php
// ============================================================
//
// OBJETIVO
// --------
// Escribir cuatro consultas con JOINs desde PHP y recorrer los
// resultados. Estudia el Tema 12 y escribe el código que
// produzca la salida indicada en cada sección.
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
// Parte 1: Álbumes con nombre de artista
// ============================================================
// INNER JOIN entre `albumes` y `artistas`.
// Muestra: titulo, artista, anio_lanzamiento.
// Ordena por nombre de artista y luego por año.
//
// Salida esperada (varía con tus datos):
// Sgt. Pepper's — The Beatles (1967)
// Abbey Road — The Beatles (1969)
// ...

echo "=== Álbumes con su artista ===\n";
// Tu código aquí
echo "\n";

// ============================================================
// Parte 2: Artistas con cantidad de álbumes
// ============================================================
// LEFT JOIN + COUNT + GROUP BY para incluir artistas con 0 álbumes.
// Muestra: nombre del artista y total de álbumes.
// Ordena de mayor a menor cantidad.
//
// Salida esperada (varía):
// The Beatles: 3
// Radiohead: 2
// Artista Sin Álbumes: 0

echo "=== Artistas y cantidad de álbumes ===\n";
// Tu código aquí
echo "\n";

// ============================================================
// Parte 3: Álbumes sin género asignado
// ============================================================
// LEFT JOIN con `albumes_generos` + WHERE ... IS NULL para
// detectar los álbumes que no tienen ningún género.
// Muestra solo el título.
//
// Salida esperada (varía):
// - Álbum Huérfano

echo "=== Álbumes sin género asignado ===\n";
// Tu código aquí
echo "\n";

// ============================================================
// Parte 4: Álbumes de un género dado
// ============================================================
// Usando un prepared statement con parámetro :genero,
// listar los álbumes de un género específico.
// Requiere un JOIN de 3 tablas: albumes, albumes_generos, generos.
// Muestra: titulo del álbum y nombre del artista.

$genero_buscado = 'Rock';

echo "=== Álbumes de género '$genero_buscado' ===\n";
// Tu código aquí
echo "\n";

// ============================================================
// SOLUCIÓN
// ============================================================
/*

// Parte 1: Álbumes con artista
echo "=== Álbumes con su artista ===\n";
$sql = "SELECT a.titulo, ar.nombre AS artista, a.anio_lanzamiento
        FROM albumes a
        INNER JOIN artistas ar ON a.artista_id = ar.id
        ORDER BY ar.nombre, a.anio_lanzamiento";
foreach ($pdo->query($sql) as $row) {
    echo "{$row['titulo']} — {$row['artista']} ({$row['anio_lanzamiento']})\n";
}
echo "\n";

// Parte 2: Artistas con cantidad de álbumes
echo "=== Artistas y cantidad de álbumes ===\n";
$sql = "SELECT ar.nombre, COUNT(a.id) AS total
        FROM artistas ar
        LEFT JOIN albumes a ON ar.id = a.artista_id
        GROUP BY ar.id, ar.nombre
        ORDER BY total DESC, ar.nombre";
foreach ($pdo->query($sql) as $row) {
    echo "{$row['nombre']}: {$row['total']}\n";
}
echo "\n";

// Parte 3: Álbumes sin género
echo "=== Álbumes sin género asignado ===\n";
$sql = "SELECT a.titulo
        FROM albumes a
        LEFT JOIN albumes_generos ag ON a.id = ag.album_id
        WHERE ag.album_id IS NULL
        ORDER BY a.titulo";
foreach ($pdo->query($sql) as $row) {
    echo "- {$row['titulo']}\n";
}
echo "\n";

// Parte 4: Álbumes de un género dado
echo "=== Álbumes de género '$genero_buscado' ===\n";
$stmt = $pdo->prepare(
    "SELECT a.titulo, ar.nombre AS artista
     FROM albumes a
     INNER JOIN artistas ar ON a.artista_id = ar.id
     INNER JOIN albumes_generos ag ON a.id = ag.album_id
     INNER JOIN generos g ON ag.genero_id = g.id
     WHERE g.nombre = :genero
     ORDER BY a.titulo"
);
$stmt->execute([':genero' => $genero_buscado]);
foreach ($stmt as $row) {
    echo "{$row['titulo']} — {$row['artista']}\n";
}
echo "\n";

*/
