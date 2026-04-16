<?php
// ============================================================
// TEMA 12: PHP y PDO — Consultas con JOINs
// ============================================================
//
// OBJETIVO: Ejecutar desde PHP las consultas con JOIN que
// aprendiste en SQL en el Tema 11.
//
// Desde el punto de vista de PDO no hay nada nuevo: la consulta
// sigue siendo una cadena SQL que pasas a query() o prepare().
// Lo interesante es cómo recorrer resultados que combinan
// columnas de varias tablas y cómo usar alias en las columnas.
//
// ANTES DE EJECUTAR ESTE ARCHIVO:
//   1. MariaDB corriendo: sudo service mariadb start
//   2. Base de datos `biblioteca` con las tablas `autores`,
//      `libros`, `categorias`, `libros_categorias`, `socios` y
//      `prestamos` pobladas (temas 4–11).
//   3. Ejecutar: php tema12_php_pdo_joins.php
// ============================================================

// Conexión (igual que en los temas 7 y 8)
$pdo = new PDO(
    'mysql:host=127.0.0.1;dbname=biblioteca;charset=utf8mb4',
    'sandra',
    'tu_contraseña_aqui',
    [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ]
);

// ============================================================
// PARTE 1: INNER JOIN — libros con el nombre de su autor
// ============================================================

// Cuando una columna del resultado viene de un JOIN con alias
// (por ejemplo `a.nombre AS autor`), en PHP accedes a ella con
// la clave del alias, no con el nombre original.

echo "=== Libros con el nombre de su autor ===\n";

$sql = "SELECT l.titulo, a.nombre AS autor, l.anio_publicacion
        FROM libros l
        INNER JOIN autores a ON l.autor_id = a.id
        ORDER BY a.nombre, l.anio_publicacion";

$libros = $pdo->query($sql)->fetchAll();

foreach ($libros as $libro) {
    echo "$libro[titulo] — $libro[autor] ($libro[anio_publicacion])\n";
}

// Salida esperada:
// El principito — Antoine de Saint-Exupéry (1943)
// Crimen y castigo — Fiódor Dostoyevski (1866)
// La metamorfosis — Franz Kafka (1915)
// El proceso — Franz Kafka (1925)
// Cien años de soledad — Gabriel García Márquez (1967)
// El amor en los tiempos del cólera — Gabriel García Márquez (1985)
// La casa de los espíritus — Isabel Allende (1982)
// Ficciones — Jorge Luis Borges (1944)
// El Aleph — Jorge Luis Borges (1949)
// El nombre de la rosa — Umberto Eco (1980)

echo "\n";

// ============================================================
// PARTE 2: LEFT JOIN — todos los autores, con o sin libros
// ============================================================

// Con LEFT JOIN las columnas de la tabla derecha pueden venir
// como NULL. En PHP, NULL se maneja con el operador ?? o con
// un simple if.

echo "=== Autores y sus libros (incluso los que no tienen) ===\n";

$sql = "SELECT a.nombre AS autor, l.titulo
        FROM autores a
        LEFT JOIN libros l ON a.id = l.autor_id
        ORDER BY a.nombre, l.titulo";

foreach ($pdo->query($sql) as $fila) {
    // El operador ?? devuelve el valor de la derecha si la
    // expresión de la izquierda es NULL (o no está definida).
    $titulo = $fila['titulo'] ?? '(sin libros cargados)';
    echo "$fila[autor] — $titulo\n";
}

// Salida esperada:
// Antoine de Saint-Exupéry — El principito
// Autor Sin Libros — (sin libros cargados)
// Fiódor Dostoyevski — Crimen y castigo
// ...

echo "\n";

// ============================================================
// PARTE 3: JOIN con prepared statement
// ============================================================

// Un JOIN puede (y debe) llevar parámetros cuando el filtro
// depende de datos externos. La sintaxis es la misma que vimos
// en el Tema 8: prepare() + execute() con parámetros nombrados.

echo "=== Libros de autores de un país dado ===\n";

$pais_buscado = 'Argentina';

$stmt = $pdo->prepare(
    "SELECT l.titulo, a.nombre AS autor, l.anio_publicacion
     FROM libros l
     INNER JOIN autores a ON l.autor_id = a.id
     WHERE a.pais = :pais
     ORDER BY l.anio_publicacion"
);

$stmt->execute([':pais' => $pais_buscado]);

foreach ($stmt as $fila) {
    echo "$fila[titulo] ($fila[anio_publicacion]) — $fila[autor]\n";
}

// Salida esperada:
// Ficciones (1944) — Jorge Luis Borges
// El Aleph (1949) — Jorge Luis Borges

echo "\n";

// ============================================================
// PARTE 4: JOIN de tres tablas
// ============================================================

// Para combinar `libros` con `categorias` necesitamos pasar
// por la tabla puente `libros_categorias`.

echo "=== Libros con sus categorías ===\n";

$sql = "SELECT l.titulo, c.nombre AS categoria
        FROM libros l
        INNER JOIN libros_categorias lc ON l.id = lc.libro_id
        INNER JOIN categorias c ON lc.categoria_id = c.id
        ORDER BY l.titulo, c.nombre";

// Acumulamos categorías por libro en un array asociativo
$por_libro = [];
foreach ($pdo->query($sql) as $fila) {
    $por_libro[$fila['titulo']][] = $fila['categoria'];
}

foreach ($por_libro as $titulo => $categorias) {
    echo "$titulo: " . implode(', ', $categorias) . "\n";
}

// Salida esperada (varía con tus datos):
// Cien años de soledad: Literatura latinoamericana, Novela
// El nombre de la rosa: Literatura europea, Novela, Policial
// El principito: Clásicos, Novela
// Ficciones: Cuento, Literatura latinoamericana
// La metamorfosis: Clásicos, Cuento, Literatura europea

echo "\n";

// ============================================================
// PARTE 5: LEFT JOIN para detectar huecos
// ============================================================

// Un patrón útil: LEFT JOIN + WHERE columna_derecha IS NULL
// encuentra las filas de la izquierda que no tienen coincidencia.

echo "=== Autores sin libros cargados ===\n";

$sql = "SELECT a.nombre
        FROM autores a
        LEFT JOIN libros l ON a.id = l.autor_id
        WHERE l.id IS NULL
        ORDER BY a.nombre";

foreach ($pdo->query($sql) as $fila) {
    echo "- $fila[nombre]\n";
}

// Salida esperada:
// - Autor Sin Libros

// ============================================================
// RESUMEN
// ============================================================
//
// - Un JOIN en PDO es exactamente una consulta SELECT más larga.
//   Las columnas del resultado se acceden con las claves del
//   alias (AS autor → $fila['autor']).
// - Con LEFT JOIN, las columnas de la tabla derecha pueden ser
//   NULL; manejalo con ?? o con if.
// - Se pueden combinar prepared statements con JOINs sin
//   cambios: los parámetros :nombre siguen funcionando igual.
//
// PRÓXIMO TEMA (SQL): Normalización.
// ============================================================

// ============================================================
// EJERCICIO
// ============================================================
// 1. Mostrar, para cada socio, la cantidad de préstamos que
//    tiene registrados. Usa LEFT JOIN con `prestamos` y
//    COUNT(prestamos.id) con GROUP BY socios.id. Incluye los
//    socios con 0 préstamos.
//
// 2. Mostrar los libros que no tienen ninguna categoría asignada.
//    Pista: LEFT JOIN con libros_categorias + WHERE lc.libro_id IS NULL.
//
// 3. Dado un nombre de categoría (ej: 'Novela'), listar todos
//    los libros que pertenecen a esa categoría. Usa un prepared
//    statement con parámetro :categoria.
//
// (El archivo del ejercicio está en ejercicios/ejercicio12_...)
// ============================================================
