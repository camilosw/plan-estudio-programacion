<?php
// ============================================================
// TEMA 16: PHP y PDO — Transacciones
// ============================================================
//
// OBJETIVO: Usar transacciones desde PHP con PDO para agrupar
// varias operaciones como una unidad atómica.
//
// En el Tema 15 viste las transacciones en SQL con START
// TRANSACTION / COMMIT / ROLLBACK. En PHP con PDO se hace casi
// igual, pero con métodos del objeto $pdo:
//
//   $pdo->beginTransaction()  — inicia la transacción
//   $pdo->commit()            — confirma todos los cambios
//   $pdo->rollBack()          — deshace todos los cambios
//
// El patrón típico combina transacciones con try/catch:
// si cualquier operación lanza una excepción, el catch llama
// a rollBack() y los datos quedan como estaban.
//
// ANTES DE EJECUTAR ESTE ARCHIVO:
//   1. MariaDB corriendo: sudo service mariadb start
//   2. Base de datos `biblioteca` con las tablas pobladas
//      (temas 4–11), incluyendo `libros`, `socios` y `prestamos`.
//   3. Ejecutar: php tema16_php_pdo_transacciones.php
// ============================================================

// Conexión
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
// PARTE 1: Registrar un préstamo con transacción
// ============================================================

// Registrar un préstamo implica dos pasos que deben ocurrir juntos:
//   1. Insertar una fila en `prestamos`.
//   2. Actualizar `libros.disponible = FALSE`.
//
// Si falla uno, hay que deshacer el otro. La transacción lo
// garantiza con commit() / rollBack().

function registrarPrestamo(PDO $pdo, int $libro_id, int $socio_id): int
{
    $pdo->beginTransaction();

    try {
        // 1. Verificar que el libro esté disponible
        $stmt = $pdo->prepare("SELECT disponible FROM libros WHERE id = :id");
        $stmt->execute([':id' => $libro_id]);
        $libro = $stmt->fetch();

        if (!$libro) {
            throw new RuntimeException("El libro id=$libro_id no existe.");
        }
        if (!$libro['disponible']) {
            throw new RuntimeException("El libro id=$libro_id no está disponible.");
        }

        // 2. Insertar el préstamo
        $stmt = $pdo->prepare(
            "INSERT INTO prestamos (libro_id, socio_id, fecha_prestamo)
             VALUES (:libro_id, :socio_id, CURRENT_DATE)"
        );
        $stmt->execute([
            ':libro_id' => $libro_id,
            ':socio_id' => $socio_id,
        ]);
        $prestamo_id = (int) $pdo->lastInsertId();

        // 3. Marcar el libro como no disponible
        $stmt = $pdo->prepare(
            "UPDATE libros SET disponible = FALSE WHERE id = :id"
        );
        $stmt->execute([':id' => $libro_id]);

        // Todo salió bien: confirmar los cambios
        $pdo->commit();
        return $prestamo_id;

    } catch (Throwable $e) {
        // Algo falló: deshacer todos los cambios
        $pdo->rollBack();
        throw $e; // propagar para que el código que llama se entere
    }
}

// Probar: registrar un préstamo del libro 1 para el socio 5
echo "=== Registrar un préstamo ===\n";

try {
    $prestamo_id = registrarPrestamo($pdo, 1, 5);
    echo "Préstamo registrado con id: $prestamo_id\n";
} catch (Throwable $e) {
    echo "No se pudo registrar el préstamo: " . $e->getMessage() . "\n";
}

// Verificar el estado del libro
$stmt = $pdo->prepare("SELECT titulo, disponible FROM libros WHERE id = :id");
$stmt->execute([':id' => 1]);
$libro = $stmt->fetch();
echo "Estado del libro: $libro[titulo] — ";
echo ($libro['disponible'] ? 'disponible' : 'no disponible') . "\n\n";

// ============================================================
// PARTE 2: Simular un fallo y ver el rollBack en acción
// ============================================================

// Intentamos prestar un libro que ya está prestado.
// La función lanza una RuntimeException, el catch hace rollBack
// y los datos quedan intactos.

echo "=== Intentar prestar el mismo libro otra vez ===\n";

try {
    $prestamo_id = registrarPrestamo($pdo, 1, 4); // libro 1 ya no está disponible
    echo "Préstamo registrado con id: $prestamo_id\n";
} catch (Throwable $e) {
    echo "Error esperado: " . $e->getMessage() . "\n";
}

// Confirmar que no se registró ningún préstamo nuevo para el socio 4
// sobre el libro 1
$stmt = $pdo->prepare(
    "SELECT COUNT(*) FROM prestamos
     WHERE libro_id = :libro_id AND socio_id = :socio_id"
);
$stmt->execute([':libro_id' => 1, ':socio_id' => 4]);
echo "Préstamos del libro 1 al socio 4: " . $stmt->fetchColumn() . "\n\n";

// ============================================================
// PARTE 3: Registrar una devolución (otra transacción)
// ============================================================

function registrarDevolucion(PDO $pdo, int $prestamo_id): void
{
    $pdo->beginTransaction();

    try {
        // 1. Obtener el libro_id del préstamo
        $stmt = $pdo->prepare(
            "SELECT libro_id, fecha_devolucion
             FROM prestamos WHERE id = :id"
        );
        $stmt->execute([':id' => $prestamo_id]);
        $prestamo = $stmt->fetch();

        if (!$prestamo) {
            throw new RuntimeException("El préstamo id=$prestamo_id no existe.");
        }
        if ($prestamo['fecha_devolucion'] !== null) {
            throw new RuntimeException("El préstamo id=$prestamo_id ya fue devuelto.");
        }

        // 2. Marcar la fecha de devolución
        $stmt = $pdo->prepare(
            "UPDATE prestamos
             SET fecha_devolucion = CURRENT_DATE
             WHERE id = :id"
        );
        $stmt->execute([':id' => $prestamo_id]);

        // 3. Volver a poner el libro disponible
        $stmt = $pdo->prepare(
            "UPDATE libros SET disponible = TRUE WHERE id = :id"
        );
        $stmt->execute([':id' => $prestamo['libro_id']]);

        $pdo->commit();

    } catch (Throwable $e) {
        $pdo->rollBack();
        throw $e;
    }
}

echo "=== Registrar la devolución del préstamo recién creado ===\n";

try {
    registrarDevolucion($pdo, $prestamo_id);
    echo "Devolución registrada.\n";
} catch (Throwable $e) {
    echo "No se pudo devolver: " . $e->getMessage() . "\n";
}

// Verificar: el libro 1 debería volver a estar disponible
$stmt = $pdo->prepare("SELECT disponible FROM libros WHERE id = :id");
$stmt->execute([':id' => 1]);
echo "Libro 1 disponible: " . ($stmt->fetchColumn() ? 'sí' : 'no') . "\n";

// ============================================================
// RESUMEN
// ============================================================
//
// $pdo->beginTransaction()  — inicia la transacción
// $pdo->commit()            — confirma los cambios
// $pdo->rollBack()          — deshace los cambios
//
// El patrón estándar:
//
//   $pdo->beginTransaction();
//   try {
//       // operaciones
//       $pdo->commit();
//   } catch (Throwable $e) {
//       $pdo->rollBack();
//       throw $e;
//   }
//
// Usar Throwable (en lugar de Exception) asegura que también se
// capturen errores más graves del motor, no solo las excepciones
// de aplicación.
//
// PRÓXIMO TEMA (SQL): Backup y restauración con mysqldump.
// ============================================================

// ============================================================
// EJERCICIO
// ============================================================
// 1. Escribir una función transferirPrestamo($pdo, $prestamo_id,
//    $nuevo_socio_id) que cambie el socio_id de un préstamo
//    activo (fecha_devolucion IS NULL). Si el préstamo no existe
//    o ya fue devuelto, lanza una excepción. Todo dentro de una
//    transacción.
//
// 2. Escribir una función registrarDosPrestamos($pdo, $libro_id_1,
//    $libro_id_2, $socio_id) que intente registrar dos préstamos
//    en una sola transacción. Si alguno de los libros no está
//    disponible, NINGUNO de los dos debe quedar registrado.
//
// (El archivo del ejercicio está en ejercicios/ejercicio16_...)
// ============================================================
