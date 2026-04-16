<?php
// ============================================================
// EJERCICIO 7: PHP y PDO — Conexión y consultas básicas
// ============================================================
// Dominio: Tienda de música
//
// Antes de ejecutar:
//   - MariaDB corriendo: sudo service mariadb start
//   - Base de datos `tienda_musica` con las tablas `artistas` y
//     `albumes` pobladas (ejercicios 4–6). Todavía no se vieron
//     claves foráneas formales: `albumes.artista_id` es un entero
//     que coincide con `artistas.id`.
//   - Ejecutar: php ejercicio7_php_pdo_conexion_y_consultas.php
// ============================================================
//
// OBJETIVO
// --------
// Conectarse a la base de datos `tienda_musica` con PDO y escribir
// cuatro consultas de lectura usando query() y fetchAll()/fetch().
//
// No hay pasos predefinidos. Estudia el Tema 7 y escribe el código
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
// Parte 4: Álbumes con precio superior
// ============================================================
// Muestra todos los álbumes cuyo precio sea mayor a 10.00,
// ordenados por precio descendente. Muestra título y precio.
//
// Salida esperada (varía con tus datos):
// The Dark Side of the Moon — $13.99
// OK Computer — $11.99
// ...

echo "=== Álbumes con precio > 10 ===\n";
// Tu código aquí
echo "\n";

// ============================================================
// Parte 5: Estadísticas
// ============================================================
// Muestra:
//   - Total de artistas
//   - Total de álbumes
//   - Cantidad de álbumes disponibles (disponible = TRUE)
// Usa COUNT(*) y fetchColumn().
//
// Salida esperada (varía con tus datos):
// Total de artistas:    8
// Total de álbumes:     12
// Álbumes disponibles:  11

echo "=== Estadísticas ===\n";
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

// Parte 4: Álbumes con precio superior
echo "=== Álbumes con precio > 10 ===\n";
$albumes = $pdo->query(
    "SELECT titulo, precio FROM albumes WHERE precio > 10
     ORDER BY precio DESC"
)->fetchAll();
foreach ($albumes as $row) {
    echo "{$row['titulo']} — \${$row['precio']}\n";
}
echo "\n";

// Parte 5: Estadísticas
echo "=== Estadísticas ===\n";
$total_artistas = $pdo->query("SELECT COUNT(*) FROM artistas")->fetchColumn();
$total_albumes  = $pdo->query("SELECT COUNT(*) FROM albumes")->fetchColumn();
$disponibles    = $pdo->query("SELECT COUNT(*) FROM albumes WHERE disponible = TRUE")->fetchColumn();

echo "Total de artistas:    $total_artistas\n";
echo "Total de álbumes:     $total_albumes\n";
echo "Álbumes disponibles:  $disponibles\n";
echo "\n";
*/
