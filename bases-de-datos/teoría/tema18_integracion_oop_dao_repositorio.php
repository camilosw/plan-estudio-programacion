<?php
// ============================================================
// TEMA 18: Proyecto integrador — OOP + Base de datos
//          Patrón repositorio (DAO)
// ============================================================
//
// OBJETIVO: Conectar el módulo de OOP con la base de datos.
// En lugar de mezclar SQL dentro de la lógica de negocio,
// usamos el patrón repositorio: una clase dedicada a todas
// las operaciones de base de datos para un tipo de objeto.
//
// ¿QUÉ ES EL PATRÓN REPOSITORIO?
// Es una forma de organizar el código que separa dos
// responsabilidades:
//
//   Clase de dominio (Libro, Autor):
//     Representa el objeto del negocio con sus atributos.
//     No sabe nada de base de datos.
//
//   Clase repositorio (LibroRepositorio):
//     Sabe cómo leer y escribir objetos en la base de datos.
//     No contiene lógica de negocio: solo SQL + PDO.
//
// Esta separación hace que el código sea más ordenado,
// más fácil de leer y más fácil de modificar.
//
// ANTES DE EJECUTAR:
//   php tema18_integracion_oop_dao_repositorio.php
// ============================================================


// ============================================================
// PARTE 1: Clases de dominio
// ============================================================

class Autor
{
    public function __construct(
        public readonly int    $id,
        public readonly string $nombre,
        public readonly ?string $pais = null,
        public readonly ?int   $anio_nacimiento = null
    ) {}

    public function __toString(): string
    {
        $info = $this->nombre;
        if ($this->pais) {
            $info .= " ({$this->pais})";
        }
        return $info;
    }
}

class Libro
{
    public function __construct(
        public readonly int    $id,
        public readonly string $titulo,
        public readonly int    $autor_id,
        public readonly ?int   $anio_publicacion = null,
        public readonly ?int   $paginas = null,
        public bool            $disponible = true,
        public readonly ?string $nombre_autor = null  // campo de conveniencia (del JOIN)
    ) {}

    public function __toString(): string
    {
        $estado = $this->disponible ? 'disponible' : 'prestado';
        $autor  = $this->nombre_autor ?? "autor_id:{$this->autor_id}";
        return "[{$this->id}] {$this->titulo} — {$autor} ($estado)";
    }
}


// ============================================================
// PARTE 2: Clase de conexión (Singleton simple)
// ============================================================

class Conexion
{
    private static ?PDO $instancia = null;

    public static function obtener(): PDO
    {
        if (self::$instancia === null) {
            self::$instancia = new PDO(
                'mysql:host=127.0.0.1;dbname=biblioteca;charset=utf8mb4',
                'sandra',
                'tu_contraseña_aqui',
                [
                    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES   => false,
                ]
            );
        }
        return self::$instancia;
    }
}


// ============================================================
// PARTE 3: Repositorio de libros
// ============================================================

class LibroRepositorio
{
    private PDO $pdo;

    public function __construct()
    {
        $this->pdo = Conexion::obtener();
    }

    // Devuelve todos los libros como array de objetos Libro
    public function listarTodos(): array
    {
        $stmt = $this->pdo->query(
            "SELECT l.*, a.nombre AS nombre_autor
             FROM libros l
             INNER JOIN autores a ON l.autor_id = a.id
             ORDER BY l.titulo"
        );

        $libros = [];
        while ($fila = $stmt->fetch()) {
            $libros[] = $this->filaALibro($fila);
        }
        return $libros;
    }

    // Devuelve un Libro por su id, o null si no existe
    public function buscarPorId(int $id): ?Libro
    {
        $stmt = $this->pdo->prepare(
            "SELECT l.*, a.nombre AS nombre_autor
             FROM libros l
             INNER JOIN autores a ON l.autor_id = a.id
             WHERE l.id = :id"
        );
        $stmt->execute([':id' => $id]);
        $fila = $stmt->fetch();

        return $fila ? $this->filaALibro($fila) : null;
    }

    // Devuelve los libros disponibles para préstamo
    public function listarDisponibles(): array
    {
        $stmt = $this->pdo->query(
            "SELECT l.*, a.nombre AS nombre_autor
             FROM libros l
             INNER JOIN autores a ON l.autor_id = a.id
             WHERE l.disponible = TRUE
             ORDER BY l.titulo"
        );

        $libros = [];
        while ($fila = $stmt->fetch()) {
            $libros[] = $this->filaALibro($fila);
        }
        return $libros;
    }

    // Inserta un nuevo libro y devuelve el objeto con el id asignado
    public function guardar(string $titulo, int $autor_id, ?int $anio = null, ?int $paginas = null): Libro
    {
        $stmt = $this->pdo->prepare(
            "INSERT INTO libros (titulo, autor_id, anio_publicacion, paginas)
             VALUES (:titulo, :autor_id, :anio, :paginas)"
        );
        $stmt->execute([
            ':titulo'   => $titulo,
            ':autor_id' => $autor_id,
            ':anio'     => $anio,
            ':paginas'  => $paginas,
        ]);

        $nuevo_id = (int) $this->pdo->lastInsertId();
        return $this->buscarPorId($nuevo_id);
    }

    // Marca un libro como no disponible o disponible
    public function actualizarDisponibilidad(int $id, bool $disponible): bool
    {
        $stmt = $this->pdo->prepare(
            "UPDATE libros SET disponible = :disponible WHERE id = :id"
        );
        $stmt->execute([':disponible' => $disponible, ':id' => $id]);
        return $stmt->rowCount() > 0;
    }

    // Elimina un libro por su id. Devuelve true si se eliminó.
    public function eliminar(int $id): bool
    {
        $stmt = $this->pdo->prepare("DELETE FROM libros WHERE id = :id");
        $stmt->execute([':id' => $id]);
        return $stmt->rowCount() > 0;
    }

    // Método privado: convierte una fila del resultado en un objeto Libro
    private function filaALibro(array $fila): Libro
    {
        return new Libro(
            id:               (int) $fila['id'],
            titulo:           $fila['titulo'],
            autor_id:         (int) $fila['autor_id'],
            anio_publicacion: isset($fila['anio_publicacion']) ? (int) $fila['anio_publicacion'] : null,
            paginas:          isset($fila['paginas']) ? (int) $fila['paginas'] : null,
            disponible:       (bool) $fila['disponible'],
            nombre_autor:     $fila['nombre_autor'] ?? null
        );
    }
}


// ============================================================
// PARTE 4: Repositorio de préstamos (con transacción)
// ============================================================

class PrestamoRepositorio
{
    private PDO $pdo;

    public function __construct()
    {
        $this->pdo = Conexion::obtener();
    }

    // Registra un préstamo: inserta en `prestamos` y marca el libro como no disponible.
    // Si cualquiera de los dos pasos falla, ambos se revierten (transacción).
    public function registrar(int $libro_id, int $socio_id): int
    {
        // Verificar que el libro existe y está disponible
        $stmt = $this->pdo->prepare("SELECT disponible FROM libros WHERE id = :id");
        $stmt->execute([':id' => $libro_id]);
        $libro = $stmt->fetch();

        if (!$libro) {
            throw new RuntimeException("El libro con id $libro_id no existe.");
        }
        if (!$libro['disponible']) {
            throw new RuntimeException("El libro con id $libro_id no está disponible.");
        }

        $this->pdo->beginTransaction();

        try {
            // Paso 1: insertar el préstamo
            $stmt_prestamo = $this->pdo->prepare(
                "INSERT INTO prestamos (libro_id, socio_id, fecha_prestamo)
                 VALUES (:libro_id, :socio_id, CURRENT_DATE)"
            );
            $stmt_prestamo->execute([':libro_id' => $libro_id, ':socio_id' => $socio_id]);
            $prestamo_id = (int) $this->pdo->lastInsertId();

            // Paso 2: marcar el libro como no disponible
            $stmt_libro = $this->pdo->prepare(
                "UPDATE libros SET disponible = FALSE WHERE id = :id"
            );
            $stmt_libro->execute([':id' => $libro_id]);

            $this->pdo->commit();
            return $prestamo_id;

        } catch (Exception $e) {
            $this->pdo->rollBack();
            throw new RuntimeException("Error al registrar el préstamo: " . $e->getMessage());
        }
    }

    // Registra la devolución de un libro.
    public function registrarDevolucion(int $prestamo_id): bool
    {
        // Obtener el libro_id del préstamo
        $stmt = $this->pdo->prepare(
            "SELECT libro_id FROM prestamos WHERE id = :id AND fecha_devolucion IS NULL"
        );
        $stmt->execute([':id' => $prestamo_id]);
        $prestamo = $stmt->fetch();

        if (!$prestamo) {
            throw new RuntimeException("Préstamo $prestamo_id no encontrado o ya devuelto.");
        }

        $libro_id = $prestamo['libro_id'];

        $this->pdo->beginTransaction();

        try {
            $stmt_dev = $this->pdo->prepare(
                "UPDATE prestamos SET fecha_devolucion = CURRENT_DATE WHERE id = :id"
            );
            $stmt_dev->execute([':id' => $prestamo_id]);

            $stmt_libro = $this->pdo->prepare(
                "UPDATE libros SET disponible = TRUE WHERE id = :id"
            );
            $stmt_libro->execute([':id' => $libro_id]);

            $this->pdo->commit();
            return true;

        } catch (Exception $e) {
            $this->pdo->rollBack();
            throw new RuntimeException("Error al registrar la devolución: " . $e->getMessage());
        }
    }
}


// ============================================================
// PARTE 5: Uso de los repositorios
// ============================================================

$repos_libros   = new LibroRepositorio();
$repos_prestamos = new PrestamoRepositorio();

// --- Listar todos los libros ---
echo "=== Todos los libros ===\n";
foreach ($repos_libros->listarTodos() as $libro) {
    echo $libro . "\n";
}
echo "\n";

// --- Buscar un libro por id ---
echo "=== Buscar libro id = 5 ===\n";
$libro = $repos_libros->buscarPorId(5);
if ($libro) {
    echo $libro . "\n";
    echo "Páginas: $libro->paginas\n";
}
echo "\n";

// --- Agregar un libro nuevo ---
echo "=== Agregar un libro nuevo ===\n";
$nuevo = $repos_libros->guardar('El otoño del patriarca', 1, 1975, 368);
echo "Guardado: $nuevo\n";
echo "\n";

// --- Registrar un préstamo ---
echo "=== Registrar un préstamo ===\n";
try {
    $prestamo_id = $repos_prestamos->registrar($nuevo->id, 3);
    echo "Préstamo registrado con id: $prestamo_id\n";

    // Verificar que el libro ya no está disponible
    $libro_check = $repos_libros->buscarPorId($nuevo->id);
    echo "Estado del libro: " . ($libro_check->disponible ? 'disponible' : 'prestado') . "\n";
} catch (RuntimeException $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
echo "\n";

// --- Intentar prestar el mismo libro de nuevo (debe fallar) ---
echo "=== Intentar prestar libro ya prestado ===\n";
try {
    $repos_prestamos->registrar($nuevo->id, 1);
} catch (RuntimeException $e) {
    echo "Error esperado: " . $e->getMessage() . "\n";
}
echo "\n";

// --- Registrar devolución ---
echo "=== Registrar devolución ===\n";
try {
    $repos_prestamos->registrarDevolucion($prestamo_id);
    $libro_devuelto = $repos_libros->buscarPorId($nuevo->id);
    echo "Libro devuelto. Estado: " . ($libro_devuelto->disponible ? 'disponible' : 'prestado') . "\n";
} catch (RuntimeException $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
echo "\n";

// --- Limpiar el libro de prueba ---
$repos_libros->eliminar($nuevo->id);
echo "Libro de prueba eliminado.\n";

// ============================================================
// EJERCICIO
// ============================================================
// Crear la clase AutorRepositorio con estos métodos:
//
//   listarTodos(): array         — devuelve todos los autores como objetos Autor
//   buscarPorId(int $id): ?Autor — busca un autor por id
//   buscarPorPais(string $pais): array — todos los autores de ese país
//   guardar(string $nombre, ?string $pais, ?int $anio): Autor — inserta y devuelve
//   eliminar(int $id): bool      — elimina si no tiene libros; lanza excepción si tiene
//
// Para `eliminar`: antes de borrar, verificar con una consulta si el autor tiene
// libros asociados. Si tiene, lanzar: new RuntimeException("No se puede eliminar...").
//
// (El archivo del ejercicio está en ejercicios/ejercicio16_...)
// ============================================================
