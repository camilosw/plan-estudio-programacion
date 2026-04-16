<?php
// ============================================================
// TEMA 8: PHP y PDO — Prepared statements y seguridad
// ============================================================
//
// OBJETIVO: Insertar y modificar datos de forma segura usando
// prepared statements, y entender qué es la inyección SQL.
//
// ¿QUÉ ES UN PREPARED STATEMENT?
// Es una consulta SQL con "marcadores de posición" en vez de
// valores directos. El proceso tiene dos pasos:
//   1. prepare() — MariaDB compila la consulta con los marcadores.
//   2. execute() — se envían los valores reales por separado.
//
// MariaDB sabe que los valores son *datos*, no código SQL.
// Aunque el usuario ingrese texto malicioso, no puede romper
// la estructura de la consulta. Ese es el escudo contra
// la inyección SQL.
//
// ANTES DE EJECUTAR ESTE ARCHIVO:
//   1. MariaDB debe estar corriendo.
//   2. La base de datos `biblioteca` debe existir con `autores`
//      y `libros` poblados (temas 4–6).
//   3. Ejecutar: php tema8_php_pdo_prepared_statements_y_seguridad.php
// ============================================================

// Conexión (igual que en el Tema 7)
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
// PARTE 1: Inyección SQL — qué es y por qué es peligrosa
// ============================================================

// Imagina este código INCORRECTO (NUNCA hagas esto):
//
//   $nombre = $_GET['nombre']; // dato del usuario
//   $sql = "SELECT * FROM autores WHERE nombre = '$nombre'";
//   $resultado = $pdo->query($sql);
//
// Si el usuario envía este valor como nombre:
//   ' OR '1'='1
//
// La consulta se convierte en:
//   SELECT * FROM autores WHERE nombre = '' OR '1'='1'
//
// '1'='1' siempre es verdadero, así que devuelve TODOS los autores.
// Con una variante más agresiva, podría eliminar tablas enteras.
//
// La solución: prepared statements. Los valores nunca se
// "concatenan" dentro del SQL; se envían separados.

// ============================================================
// PARTE 2: SELECT con prepared statement y parámetros nombrados
// ============================================================

echo "=== Buscar autor por nombre ===\n";

// Dato que vendría del usuario (podría ser malicioso)
$nombre_buscado = 'Gabriel García Márquez';

// El marcador :nombre es un parámetro nombrado
$stmt = $pdo->prepare("SELECT id, nombre, pais FROM autores WHERE nombre = :nombre");

// execute() recibe un array con los valores reales
$stmt->execute([':nombre' => $nombre_buscado]);

$autor = $stmt->fetch();

if ($autor) {
    echo "Encontrado: [$autor[id]] $autor[nombre] — $autor[pais]\n";
} else {
    echo "No se encontró ningún autor con ese nombre.\n";
}

// Salida esperada:
// Encontrado: [1] Gabriel García Márquez — Colombia

echo "\n";

// ============================================================
// PARTE 3: SELECT con múltiples parámetros
// ============================================================

echo "=== Libros disponibles con más de N páginas ===\n";

$paginas_minimas = 400;
$disponible = true;

$stmt = $pdo->prepare(
    "SELECT titulo, paginas FROM libros
     WHERE paginas > :paginas AND disponible = :disponible
     ORDER BY paginas DESC"
);

$stmt->execute([
    ':paginas'    => $paginas_minimas,
    ':disponible' => $disponible,
]);

$libros = $stmt->fetchAll();

foreach ($libros as $libro) {
    echo "$libro[titulo] — $libro[paginas] páginas\n";
}

// Salida esperada (puede variar):
// Crimen y castigo — 672 páginas
// El nombre de la rosa — 502 páginas
// Cien años de soledad — 471 páginas
// El amor en los tiempos del cólera — 468 páginas
// La casa de los espíritus — 433 páginas

echo "\n";

// ============================================================
// PARTE 4: INSERT con prepared statement
// ============================================================

echo "=== Agregar un nuevo autor ===\n";

$stmt = $pdo->prepare(
    "INSERT INTO autores (nombre, pais, anio_nacimiento)
     VALUES (:nombre, :pais, :anio)"
);

$stmt->execute([
    ':nombre' => 'Autor de Prueba',
    ':pais'   => 'Uruguay',
    ':anio'   => 1970,
]);

// lastInsertId() devuelve el id autoincremental asignado al nuevo registro
$nuevo_id = $pdo->lastInsertId();
echo "Nuevo autor creado con id: $nuevo_id\n";

// rowCount() devuelve la cantidad de filas afectadas por el último execute()
echo "Filas insertadas: " . $stmt->rowCount() . "\n";

// Salida esperada:
// Nuevo autor creado con id: 10
// Filas insertadas: 1

echo "\n";

// ============================================================
// PARTE 5: UPDATE con prepared statement
// ============================================================

echo "=== Actualizar el país de un autor ===\n";

$stmt = $pdo->prepare(
    "UPDATE autores SET pais = :pais WHERE id = :id"
);

$stmt->execute([
    ':pais' => 'Paraguay',
    ':id'   => $nuevo_id,
]);

echo "Filas actualizadas: " . $stmt->rowCount() . "\n";

// Verificar el cambio
$stmt_ver = $pdo->prepare("SELECT nombre, pais FROM autores WHERE id = :id");
$stmt_ver->execute([':id' => $nuevo_id]);
$autor_actualizado = $stmt_ver->fetch();
echo "Datos actualizados: $autor_actualizado[nombre] — $autor_actualizado[pais]\n";

// Salida esperada:
// Filas actualizadas: 1
// Datos actualizados: Autor de Prueba — Paraguay

echo "\n";

// ============================================================
// PARTE 6: DELETE con prepared statement
// ============================================================

echo "=== Eliminar el autor de prueba ===\n";

$stmt = $pdo->prepare("DELETE FROM autores WHERE id = :id");
$stmt->execute([':id' => $nuevo_id]);

echo "Filas eliminadas: " . $stmt->rowCount() . "\n";

// Salida esperada:
// Filas eliminadas: 1

echo "\n";

// ============================================================
// PARTE 7: Reutilizar un prepared statement
// ============================================================
// Una ventaja de los prepared statements: se compilan una sola
// vez en el servidor y se pueden ejecutar múltiples veces
// con distintos valores. Más eficiente que llamar a query() repetidamente.

echo "=== Insertar varios libros en un bucle ===\n";

$libros_nuevos = [
    ['La sombra del viento',    1, 2001, 561],
    ['El código Da Vinci',      1, 2003, 454],  // usamos autor_id=1 por simplicidad
];

$stmt = $pdo->prepare(
    "INSERT INTO libros (titulo, autor_id, anio_publicacion, paginas)
     VALUES (:titulo, :autor_id, :anio, :paginas)"
);

foreach ($libros_nuevos as $datos) {
    $stmt->execute([
        ':titulo'   => $datos[0],
        ':autor_id' => $datos[1],
        ':anio'     => $datos[2],
        ':paginas'  => $datos[3],
    ]);
    echo "Insertado: $datos[0] (id: " . $pdo->lastInsertId() . ")\n";
}

// Limpiar los registros de prueba
$pdo->exec("DELETE FROM libros WHERE titulo IN ('La sombra del viento', 'El código Da Vinci')");
echo "Libros de prueba eliminados.\n";

// ============================================================
// RESUMEN DE MÉTODOS USADOS
// ============================================================
//
// $pdo->prepare($sql)       — compila la consulta, retorna PDOStatement
// $stmt->execute([...])     — ejecuta con los valores reales
// $pdo->lastInsertId()      — id del último INSERT
// $stmt->rowCount()         — filas afectadas por UPDATE/DELETE/INSERT
// $pdo->exec($sql)          — ejecuta SQL sin retornar resultados (para
//                             instrucciones sin parámetros y sin SELECT)
//
// PRÓXIMO TEMA: seguimos con SQL (tipos de datos y constraints) y
// más adelante volvemos a PHP para consultas con JOIN (tema 12).
//
// ============================================================
// EJERCICIO
// ============================================================
// 1. Crear una función buscarLibrosPorAnio($pdo, $desde, $hasta)
//    que use BETWEEN con un prepared statement para devolver
//    los libros publicados entre dos años dados.
//
// 2. Crear una función buscarAutoresPorPais($pdo, $parte_pais)
//    que use LIKE con un prepared statement para buscar autores
//    cuyo país contenga el texto dado.
//    (Pista: el valor del parámetro debe ser "%$parte_pais%")
//
// (El archivo del ejercicio está en ejercicios/ejercicio8_...)
// ============================================================
