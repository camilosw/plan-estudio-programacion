<?php
// ============================================================
// EJERCICIO 13: PHP y PDO — Conexión y consultas básicas
// ============================================================
// Dominio: Tienda de música
//
// Antes de ejecutar:
//   - MariaDB corriendo: sudo service mariadb start
//   - Base de datos `tienda_musica` con datos cargados (ejercicios 4-9)
//   - Ejecutar: php ejercicio13_php_pdo_conexion_y_consultas.php
// ============================================================
//
// OBJETIVO
// --------
// Conectarse a la base de datos `tienda_musica` con PDO y escribir
// cuatro consultas de lectura usando query() y fetchAll()/fetch().
//
// No hay pasos predefinidos. Estudia el Tema 13 y escribe el código
// que produzca la salida indicada en cada sección.
//
// ============================================================

// ============================================================
// Parte 1: Conexión
// ============================================================
// Crea la conexión PDO a `tienda_musica`.
// Recuerda usar try/catch y terminar con exit(1) si falla.

// Tu código aquí

// ============================================================
// Parte 2: Listar todos los artistas
// ============================================================
// Obtén todos los artistas ordenados por nombre.
// Muestra id, nombre y país.
//
// Salida esperada (puede variar con tus datos):
// [1] The Beatles — Reino Unido
// [2] Café Tacvba — México
// ...

echo "=== Todos los artistas ===\n";
// Tu código aquí
echo "\n";

// ============================================================
// Parte 3: Buscar un álbum por id
// ============================================================
// Obtén el álbum con id = 6 y muestra su título,
// año de lanzamiento y precio.
// Usa fetch() en vez de fetchAll() (esperas un solo resultado).
//
// Salida esperada:
// Título: OK Computer
// Año:    1997
// Precio: $11.99

echo "=== Álbum con id = 6 ===\n";
// Tu código aquí
echo "\n";

// ============================================================
// Parte 4: Álbumes con nombre de artista (JOIN)
// ============================================================
// Escribe una consulta que muestre el título del álbum y el nombre
// del artista usando INNER JOIN. Ordena por nombre del artista.
//
// Salida esperada:
// Abbey Road — The Beatles
// Sgt. Pepper's — The Beatles
// ...

echo "=== Álbumes con artista ===\n";
// Tu código aquí
echo "\n";

// ============================================================
// Parte 5: Clientes con total de compras
// ============================================================
// Muestra el nombre de cada cliente y la cantidad de compras
// que realizó. Usa LEFT JOIN para incluir clientes con 0 compras.
// Ordena por cantidad de compras de mayor a menor.
//
// Salida esperada:
// Laura Sánchez: 2 compras
// Paula Vega: 1 compras
// Marcos Díaz: 0 compras

echo "=== Clientes con cantidad de compras ===\n";
// Tu código aquí
echo "\n";

// ============================================================
// SOLUCIÓN
// ============================================================
/*
<?php

// Parte 1: Conexión
$host      = '127.0.0.1';
$puerto    = '3306';
$nombre_bd = 'tienda_musica';
$usuario   = 'sandra';
$contrasena = 'tu_contraseña_aqui';

$dsn = "mysql:host=$host;port=$puerto;dbname=$nombre_bd;charset=utf8mb4";

try {
    $pdo = new PDO($dsn, $usuario, $contrasena, [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ]);
} catch (PDOException $e) {
    echo "Error de conexión: " . $e->getMessage() . "\n";
    exit(1);
}

// Parte 2: Todos los artistas
echo "=== Todos los artistas ===\n";
$artistas = $pdo->query("SELECT id, nombre, pais FROM artistas ORDER BY nombre")->fetchAll();
foreach ($artistas as $artista) {
    echo "[{$artista['id']}] {$artista['nombre']} — {$artista['pais']}\n";
}
echo "\n";

// Parte 3: Álbum por id
echo "=== Álbum con id = 6 ===\n";
$album = $pdo->query("SELECT titulo, anio_lanzamiento, precio FROM albumes WHERE id = 6")->fetch();
if ($album) {
    echo "Título: {$album['titulo']}\n";
    echo "Año:    {$album['anio_lanzamiento']}\n";
    echo "Precio: \${$album['precio']}\n";
} else {
    echo "Álbum no encontrado.\n";
}
echo "\n";

// Parte 4: Álbumes con artista (JOIN)
echo "=== Álbumes con artista ===\n";
$albumes = $pdo->query("
    SELECT a.titulo, ar.nombre AS artista
    FROM albumes a
    INNER JOIN artistas ar ON a.artista_id = ar.id
    ORDER BY ar.nombre, a.titulo
")->fetchAll();
foreach ($albumes as $row) {
    echo "{$row['titulo']} — {$row['artista']}\n";
}
echo "\n";

// Parte 5: Clientes con total de compras
echo "=== Clientes con cantidad de compras ===\n";
$resumen = $pdo->query("
    SELECT cl.nombre, COUNT(c.id) AS total_compras
    FROM clientes cl
    LEFT JOIN compras c ON cl.id = c.cliente_id
    GROUP BY cl.id, cl.nombre
    ORDER BY total_compras DESC
")->fetchAll();
foreach ($resumen as $row) {
    echo "{$row['nombre']}: {$row['total_compras']} compras\n";
}
echo "\n";
*/
