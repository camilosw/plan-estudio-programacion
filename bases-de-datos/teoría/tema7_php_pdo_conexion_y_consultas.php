<?php
// ============================================================
// TEMA 7: PHP y PDO — Conexión y consultas básicas
// ============================================================
//
// OBJETIVO: Conectarse a MariaDB desde PHP usando PDO y
// ejecutar consultas de lectura (SELECT).
//
// ¿QUÉ ES PDO?
// PDO (PHP Data Objects) es la forma moderna de conectarse a
// bases de datos en PHP. Sus ventajas sobre alternativas antiguas:
//
//   - Funciona con MariaDB, MySQL, PostgreSQL, SQLite y otros
//     motores con el mismo código.
//   - Tiene soporte nativo para prepared statements (Tema 8),
//     que previenen inyección SQL.
//   - Manejo claro de errores con excepciones.
//
// Existe también `mysqli`, específico para MySQL/MariaDB.
// Este módulo usa PDO porque es la práctica recomendada actual.
//
// ANTES DE EJECUTAR ESTE ARCHIVO:
//   1. MariaDB debe estar corriendo: sudo service mariadb start
//   2. La base de datos `biblioteca` debe existir con las tablas
//      `autores` y `libros` pobladas (creadas en los Temas 4–6).
//      En este punto las tablas son planas: `libros.autor_id`
//      todavía no es una clave foránea formal (eso se ve en el
//      Tema 10). Es solo un entero que coincide con `autores.id`.
//   3. El usuario `sandra` debe tener acceso a `biblioteca`.
//   4. Ejecutar: php tema7_php_pdo_conexion_y_consultas.php
// ============================================================

// ============================================================
// PARTE 1: Conexión
// ============================================================

// Los parámetros de conexión
$host     = '127.0.0.1';
$puerto   = '3306';
$nombre_bd = 'biblioteca';
$usuario  = 'sandra';
$contrasena = 'tu_contraseña_aqui'; // Cambia esto

// El DSN (Data Source Name) especifica el motor, host y base de datos
$dsn = "mysql:host=$host;port=$puerto;dbname=$nombre_bd;charset=utf8mb4";

// Opciones de configuración de PDO
$opciones = [
    // Lanzar excepciones en errores (en vez de retornar false silenciosamente)
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    // Retornar resultados como arrays asociativos por defecto
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    // Desactivar la emulación de prepared statements (más seguro)
    PDO::ATTR_EMULATE_PREPARES   => false,
];

// Crear la conexión dentro de un try/catch para manejar errores
try {
    $pdo = new PDO($dsn, $usuario, $contrasena, $opciones);
    echo "Conexión exitosa a la base de datos '$nombre_bd'.\n\n";
} catch (PDOException $e) {
    // Mostrar el mensaje de error y terminar el script
    // En producción NO mostrarías este mensaje al usuario
    echo "Error al conectar: " . $e->getMessage() . "\n";
    exit(1);
}

// ============================================================
// PARTE 2: Consulta simple — query()
// ============================================================

// query() sirve para consultas sin datos del usuario (sin WHERE dinámico).
// Devuelve un objeto PDOStatement con los resultados.

echo "=== Todos los autores ===\n";

$resultado = $pdo->query("SELECT id, nombre, pais FROM autores ORDER BY nombre");

// fetchAll() trae todos los registros como un array de arrays asociativos
$autores = $resultado->fetchAll();

foreach ($autores as $autor) {
    echo "[$autor[id]] $autor[nombre] — $autor[pais]\n";
}

// Salida esperada:
// [6] Antoine de Saint-Exupéry — Francia
// [9] Autor Sin Libros — España
// [7] Fiódor Dostoyevski — Rusia
// [5] Franz Kafka — República Checa
// [1] Gabriel García Márquez — Colombia
// [4] Isabel Allende — Chile
// [3] Jorge Luis Borges — Argentina
// [2] Umberto Eco — Italia

echo "\n";

// ============================================================
// PARTE 3: Traer un solo registro — fetch()
// ============================================================

// fetch() trae una fila a la vez. Útil cuando esperas un solo resultado.

echo "=== Libro con id = 3 ===\n";

$stmt = $pdo->query("SELECT titulo, anio_publicacion, paginas FROM libros WHERE id = 3");
$libro = $stmt->fetch();

if ($libro) {
    echo "Título: $libro[titulo]\n";
    echo "Año:    $libro[anio_publicacion]\n";
    echo "Páginas: $libro[paginas]\n";
} else {
    echo "Libro no encontrado.\n";
}

// Salida esperada:
// Título: El nombre de la rosa
// Año:    1980
// Páginas: 502

echo "\n";

// ============================================================
// PARTE 4: Contar registros
// ============================================================

echo "=== Estadísticas ===\n";

$total_libros       = $pdo->query("SELECT COUNT(*) FROM libros")->fetchColumn();
$total_autores      = $pdo->query("SELECT COUNT(*) FROM autores")->fetchColumn();
$libros_disponibles = $pdo->query("SELECT COUNT(*) FROM libros WHERE disponible = TRUE")->fetchColumn();

echo "Total de libros:          $total_libros\n";
echo "Total de autores:         $total_autores\n";
echo "Libros disponibles:       $libros_disponibles\n";
echo "Libros no disponibles:    " . ($total_libros - $libros_disponibles) . "\n";

// Salida esperada (puede variar según los datos que tengas):
// Total de libros:          10
// Total de autores:         8
// Libros disponibles:       9
// Libros no disponibles:    1

echo "\n";

// ============================================================
// PARTE 5: Iterar fila por fila con fetch() en un bucle
// ============================================================

// Para conjuntos de datos grandes, es mejor traer una fila a la vez
// en vez de cargar todo en memoria con fetchAll().

echo "=== Libros publicados a partir del año 1950 ===\n";

$stmt = $pdo->query("SELECT titulo, anio_publicacion FROM libros
                     WHERE anio_publicacion >= 1950
                     ORDER BY anio_publicacion");

while ($libro = $stmt->fetch()) {
    echo "- $libro[titulo] ($libro[anio_publicacion])\n";
}

// Salida esperada (varía según los datos):
// - El nombre de la rosa (1980)
// - Cien años de soledad (1967)
// - ...

// ============================================================
// RESUMEN DE MÉTODOS USADOS
// ============================================================
//
// $pdo->query($sql)        — ejecuta una consulta y devuelve un PDOStatement
// $stmt->fetchAll()        — devuelve todas las filas como array de arrays
// $stmt->fetch()           — devuelve la siguiente fila (o false si no hay más)
// $stmt->fetchColumn()     — devuelve el valor de la primera columna de la fila
//
// IMPORTANTE: en este tema todas las consultas tienen datos fijos
// (sin valores del usuario). Cuando necesites usar datos externos
// en un WHERE, usa prepared statements (Tema 8). Nunca concatenes
// variables dentro de un string SQL.
//
// PRÓXIMO TEMA: prepared statements para consultas con datos del usuario.
// ============================================================

// ============================================================
// EJERCICIO
// ============================================================
// 1. Mostrar los libros con más de 300 páginas, ordenados por año
//    de publicación descendente.
//
// 2. Contar cuántos libros hay del autor con id = 1 usando
//    COUNT(*) y WHERE autor_id = 1.
//
// 3. Mostrar los autores cuyo país comience con la letra 'A'
//    (usa LIKE 'A%').
//
// (El archivo del ejercicio está en ejercicios/ejercicio7_...)
// ============================================================
