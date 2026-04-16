<?php
// ============================================================
// TEMA 15: PHP y PDO — Prepared statements y seguridad
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
// ============================================================

// Conexión (igual que en el Tema 14)
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
//   $sql = "SELECT * FROM socios WHERE nombre = '$nombre'";
//   $resultado = $pdo->query($sql);
//
// Si el usuario envía este valor como nombre:
//   ' OR '1'='1
//
// La consulta se convierte en:
//   SELECT * FROM socios WHERE nombre = '' OR '1'='1'
//
// '1'='1' siempre es verdadero, así que devuelve TODOS los socios.
// Con una variante más agresiva, podría eliminar tablas enteras.
//
// La solución: prepared statements. Los valores nunca se
// "concatenan" dentro del SQL; se envían separados.

// ============================================================
// PARTE 2: SELECT con prepared statement y parámetros nombrados
// ============================================================

echo "=== Buscar socio por email ===\n";

// Dato que vendría del usuario (podría ser malicioso)
$email_buscado = 'maria@ejemplo.com';

// El marcador :email es un parámetro nombrado
$stmt = $pdo->prepare("SELECT id, nombre, email FROM socios WHERE email = :email");

// execute() recibe un array con los valores reales
$stmt->execute([':email' => $email_buscado]);

$socio = $stmt->fetch();

if ($socio) {
    echo "Encontrado: [$socio[id]] $socio[nombre] — $socio[email]\n";
} else {
    echo "No se encontró ningún socio con ese email.\n";
}

// Salida esperada:
// Encontrado: [1] María García — maria@ejemplo.com

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

echo "=== Agregar un nuevo socio ===\n";

$stmt = $pdo->prepare(
    "INSERT INTO socios (nombre, email, telefono)
     VALUES (:nombre, :email, :telefono)"
);

$stmt->execute([
    ':nombre'   => 'Elena Sánchez',
    ':email'    => 'elena@ejemplo.com',
    ':telefono' => '11-3456-7890',
]);

// lastInsertId() devuelve el id autoincremental asignado al nuevo registro
$nuevo_id = $pdo->lastInsertId();
echo "Nuevo socio creado con id: $nuevo_id\n";

// rowCount() devuelve la cantidad de filas afectadas por el último execute()
echo "Filas insertadas: " . $stmt->rowCount() . "\n";

// Salida esperada:
// Nuevo socio creado con id: 6
// Filas insertadas: 1

echo "\n";

// ============================================================
// PARTE 5: UPDATE con prepared statement
// ============================================================

echo "=== Actualizar teléfono de un socio ===\n";

$stmt = $pdo->prepare(
    "UPDATE socios SET telefono = :telefono WHERE id = :id"
);

$stmt->execute([
    ':telefono' => '11-9999-0000',
    ':id'       => $nuevo_id,
]);

echo "Filas actualizadas: " . $stmt->rowCount() . "\n";

// Verificar el cambio
$stmt_ver = $pdo->prepare("SELECT nombre, telefono FROM socios WHERE id = :id");
$stmt_ver->execute([':id' => $nuevo_id]);
$socio_actualizado = $stmt_ver->fetch();
echo "Datos actualizados: $socio_actualizado[nombre] — $socio_actualizado[telefono]\n";

// Salida esperada:
// Filas actualizadas: 1
// Datos actualizados: Elena Sánchez — 11-9999-0000

echo "\n";

// ============================================================
// PARTE 6: DELETE con prepared statement
// ============================================================

echo "=== Eliminar el socio de prueba ===\n";

$stmt = $pdo->prepare("DELETE FROM socios WHERE id = :id");
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
// ============================================================
// EJERCICIO
// ============================================================
// 1. Crear una función registrarPrestamo($pdo, $libro_id, $socio_id)
//    que use un prepared statement para insertar en `prestamos`.
//    La función debe verificar antes que el libro esté disponible.
//    Si no está disponible, debe lanzar una excepción.
//
// 2. Crear una función buscarLibrosPorAutor($pdo, $nombre_autor)
//    que use LIKE con un prepared statement para buscar libros
//    cuyo autor contenga el texto dado.
//    (Pista: el valor del parámetro debe ser "%$nombre_autor%")
//
// (El archivo del ejercicio está en ejercicios/ejercicio15_...)
// ============================================================
