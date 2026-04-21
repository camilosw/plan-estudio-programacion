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

// LA CLASE PDO
// `PDO` es una clase que ya viene con PHP. Para conectarse a la
// base de datos se instancia con `new PDO(...)`, y el objeto que
// se obtiene **representa la conexión activa**. Todas las operaciones
// posteriores (consultas, prepared statements, transacciones) se
// hacen llamando métodos sobre ese objeto: `$pdo->query(...)`,
// `$pdo->prepare(...)`, `$pdo->beginTransaction()`, etc.
//
// El constructor recibe 4 argumentos, en este orden:
//   1. DSN (string)      — qué motor, host, puerto, base de datos y charset.
//   2. Usuario (string)  — el usuario de la base de datos.
//   3. Contraseña (string).
//   4. Opciones (array, opcional) — configuración del comportamiento del objeto.
//
// En los próximos ejemplos se usan los métodos de ese objeto.

// Los parámetros de conexión
$host     = '127.0.0.1';
$puerto   = '3306';
$nombre_bd = 'biblioteca';
$usuario  = 'sandra';
$contrasena = 'tu_contraseña_aqui'; // Cambia esto. En producción se usaría
                                    // una variable de entorno

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

// Crear la conexión
$pdo = new PDO($dsn, $usuario, $contrasena, $opciones);
echo "Conexión exitosa a la base de datos '$nombre_bd'.\n\n";

// ============================================================
// PARTE 2: Consulta simple — query()
// ============================================================

echo "=== Todos los autores ===\n";

// Para obtener los datos de la base de datos, usamos el método `query` de la 
// clase `PDO`, que retorna un objeto de tipo `PDOStatement`. En este ejemplo,
// `$resultado` contiene una instancia de la clase `PDOStatement`.
$resultado = $pdo->query("SELECT id, nombre, pais FROM autores ORDER BY nombre");

// EL OBJETO PDOStatement
// `PDOStatement` es otra clase que viene con PHP. No se instancia
// directamente: la devuelve PDO cuando ejecutas una consulta
// (`$pdo->query(...)`) o preparas una sentencia (`$pdo->prepare(...)`,
// Tema 8). El objeto **representa el resultado de una consulta** y
// expone métodos para recorrer esas filas. En los próximos ejemplos verás 
// estos métodos en acción.

// fetchAll() es uno de los métodos de la clase `PDOStatememnt` y trae todos 
// los registros como un array de arrays asociativos.
$autores = $resultado->fetchAll();

foreach ($autores as $autor) {
    echo "$autor[id] - $autor[nombre] — $autor[pais]\n";
}

// Salida esperada:
// 6 - Antoine de Saint-Exupéry — Francia
// 9 - Autor Sin Libros — España
// 7 - Fiódor Dostoyevski — Rusia
// 5 - Franz Kafka — República Checa
// 1 - Gabriel García Márquez — Colombia
// 4 - Isabel Allende — Chile
// 3 - Jorge Luis Borges — Argentina
// 2 - Umberto Eco — Italia

echo "\n";

// ============================================================
// PARTE 3: Traer un solo registro — fetch()
// ============================================================

// fetch() es otro método de la clase `PDOStatement` y trae una fila a la vez. 
// A diferencia de fetchAll() que retornaba un array de arrays asociativos,
// fetch() retorna solamente un array asociativo. Útil cuando esperas un 
// solo resultado.

echo "=== Libro con id = 3 ===\n";

$resultado = $pdo->query("SELECT titulo, anio_publicacion, paginas FROM libros WHERE id = 3");
$libro = $resultado->fetch();

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

// fetchColumn() es otro método de la clase `PDOStatement`. A diferencia de
// `fetch()` y `fetchAll()` (que devuelven arrays), `fetchColumn()` devuelve
// directamente el valor de la primera columna de la siguiente fila, como un
// escalar (número o string).
//
// ¿Por qué es ideal acá? `SELECT COUNT(*) FROM libros` devuelve una sola fila
// con una sola columna. Si usáramos `fetch()` tendríamos que escribir algo como
// `$fila = $stmt->fetch(); $total = $fila['COUNT(*)'];` — más código y una clave
// poco prolija. Con `fetchColumn()` obtenemos el número directamente.
//
// ENCADENAMIENTO DE MÉTODOS
// Observa que aquí no guardamos el `PDOStatement` en una variable intermedia:
// `$pdo->query(...)->fetchColumn()` llama a `query()`, que devuelve un objeto
// `PDOStatement`, y sobre ese objeto se llama `fetchColumn()` inmediatamente.
// Es útil cuando solo necesitamos el valor una vez y no vamos a reutilizar el
// statement.
//
// Usa `fetchColumn()` para consultas que devuelven un único valor:
// `COUNT(*)`, `MAX(...)`, `MIN(...)`, `SUM(...)`, o un `SELECT columna FROM tabla
// WHERE id = ?` donde solo interesa ese campo.

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

$resultado = $pdo->query("SELECT titulo, anio_publicacion FROM libros
                          WHERE anio_publicacion >= 1950
                          ORDER BY anio_publicacion");

while ($libro = $resultado->fetch()) {
    echo "- $libro[titulo] ($libro[anio_publicacion])\n";
}

// Salida esperada (varía según los datos):
// - El nombre de la rosa (1980)
// - Cien años de soledad (1967)
// - ...

// EL PATRÓN while ($fila = $resultado->fetch())
// Esta línea combina dos cosas en una sola expresión:
//
//   1. Llama a fetch(), que devuelve la SIGUIENTE fila del resultado
//      como array asociativo. Cada llamada avanza el cursor una fila (más 
//      abajo se explica qué es el cursor).
//   2. Asigna esa fila a $libro. El VALOR de la asignación (es decir,
//      lo que se acaba de asignar) es lo que while evalúa como condición.
//
// Mientras fetch() devuelve una fila (un array), la condición es
// verdadera y el bucle entra. Cuando ya no quedan filas, fetch()
// devuelve false y el bucle termina.
//
// No confundir con ==: aquí hay un SOLO signo igual porque es una
// asignación, no una comparación.
//
// ¿QUÉ ES EL CURSOR?
// Cuando PDO ejecuta un SELECT, el resultado no se entrega todo
// junto: queda "apuntado" por un marcador interno que recuerda
// en qué fila va la lectura. Ese marcador se llama CURSOR. Se puede
// imaginar como el dedo que se desliza por una lista de papel para
// leer un ítem a la vez sin perder el lugar.
//
// Al principio el cursor está antes de la primera fila. Cada vez
// que se llama a fetch(), el cursor avanza una posición y devuelve
// la fila donde quedó parado. Cuando ya no hay más filas, fetch()
// devuelve false.

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
