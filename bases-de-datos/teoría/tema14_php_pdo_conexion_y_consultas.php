<?php
// ============================================================
// TEMA 14: PHP y PDO — Conexión y consultas básicas
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
//   - Tiene soporte nativo para prepared statements (Tema 15),
//     que previenen inyección SQL.
//   - Manejo claro de errores con excepciones.
//
// Existe también `mysqli`, específico para MySQL/MariaDB.
// Este módulo usa PDO porque es la práctica recomendada actual.
//
// ANTES DE EJECUTAR ESTE ARCHIVO:
//   1. MariaDB debe estar corriendo: sudo service mariadb start
//   2. La base de datos `biblioteca` debe existir con datos.
//      (Creada y poblada en los Temas 2–9)
//   3. El usuario `sandra` debe tener acceso a `biblioteca`.
//   4. Ejecutar: php tema14_php_pdo_conexion_y_consultas.php
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
// PARTE 4: Consulta con JOIN
// ============================================================

echo "=== Libros con el nombre de su autor ===\n";

$sql = "SELECT l.titulo, a.nombre AS autor, l.anio_publicacion
        FROM libros l
        INNER JOIN autores a ON l.autor_id = a.id
        ORDER BY a.nombre, l.anio_publicacion";

$libros = $pdo->query($sql)->fetchAll();

foreach ($libros as $libro) {
    echo "$libro[titulo] — $libro[autor] ($libro[anio_publicacion])\n";
}

echo "\n";

// ============================================================
// PARTE 5: Contar registros
// ============================================================

echo "=== Estadísticas ===\n";

$total_libros   = $pdo->query("SELECT COUNT(*) FROM libros")->fetchColumn();
$total_autores  = $pdo->query("SELECT COUNT(*) FROM autores")->fetchColumn();
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
// PARTE 6: Iterar fila por fila con fetch() en un bucle
// ============================================================

// Para conjuntos de datos grandes, es mejor traer una fila a la vez
// en vez de cargar todo en memoria con fetchAll().

echo "=== Socios activos ===\n";

$stmt = $pdo->query("SELECT nombre, email FROM socios WHERE activo = TRUE ORDER BY nombre");

while ($socio = $stmt->fetch()) {
    echo "- $socio[nombre] <$socio[email]>\n";
}

// Salida esperada:
// - Ana Martínez <ana@ejemplo.com>
// - Carlos Ruiz <carlos@ejemplo.com>
// - Luis Torres <luis@ejemplo.com>
// - María García <maria@ejemplo.com>
// - Sofía Herrera <sofia@ejemplo.com>

// ============================================================
// RESUMEN DE MÉTODOS USADOS
// ============================================================
//
// $pdo->query($sql)        — ejecuta una consulta y devuelve un PDOStatement
// $stmt->fetchAll()        — devuelve todas las filas como array de arrays
// $stmt->fetch()           — devuelve la siguiente fila (o false si no hay más)
// $stmt->fetchColumn()     — devuelve el valor de la primera columna de la fila
//
// PRÓXIMO TEMA: prepared statements para consultas con datos del usuario.
// ============================================================

// ============================================================
// EJERCICIO
// ============================================================
// 1. Mostrar todos los socios con su cantidad de préstamos
//    (usa COUNT y GROUP BY junto con un LEFT JOIN).
//
// 2. Mostrar los libros que tienen más de 300 páginas,
//    con el nombre del autor al lado.
//
// 3. Mostrar los 3 autores más longevos (mayor anio_nacimiento
//    significa que son los más jóvenes — busca los más bajos).
//
// (El archivo del ejercicio está en ejercicios/ejercicio14_...)
// ============================================================
