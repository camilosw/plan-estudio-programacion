<?php
// ============================================================
// EJERCICIO 16: Proyecto integrador — OOP + Base de datos
// ============================================================
// Dominio: Tienda de música
//
// Antes de ejecutar:
//   php ejercicio16_integracion_oop_dao_repositorio.php
// ============================================================
//
// OBJETIVO
// --------
// Implementa la clase AlbumRepositorio con los métodos indicados.
// Las clases de dominio y la clase Conexion ya están dadas.
//
// No hay pasos predefinidos. Estudia el Tema 16 e implementa
// los métodos para que las pruebas al final del archivo produzcan
// la salida esperada.
//
// ============================================================


// ============================================================
// Clases de dominio (ya implementadas, no modificar)
// ============================================================

class Artista
{
    public function __construct(
        public readonly int     $id,
        public readonly string  $nombre,
        public readonly ?string $pais = null,
        public readonly ?int    $anio_inicio = null
    ) {}

    public function __toString(): string
    {
        $partes = ["[{$this->id}] {$this->nombre}"];
        if ($this->pais) {
            $partes[] = $this->pais;
        }
        return implode(' — ', $partes);
    }
}

class Album
{
    public function __construct(
        public readonly int     $id,
        public readonly string  $titulo,
        public readonly int     $artista_id,
        public readonly ?int    $anio_lanzamiento = null,
        public readonly ?float  $precio = null,
        public bool             $disponible = true,
        public readonly ?string $nombre_artista = null
    ) {}

    public function __toString(): string
    {
        $estado  = $this->disponible ? 'disponible' : 'no disponible';
        $artista = $this->nombre_artista ?? "artista_id:{$this->artista_id}";
        $precio  = $this->precio !== null ? '$' . number_format($this->precio, 2) : 'sin precio';
        return "[{$this->id}] {$this->titulo} — {$artista} — {$precio} ({$estado})";
    }
}


// ============================================================
// Clase de conexión (ya implementada, no modificar)
// ============================================================

class Conexion
{
    private static ?PDO $instancia = null;

    public static function obtener(): PDO
    {
        if (self::$instancia === null) {
            self::$instancia = new PDO(
                'mysql:host=127.0.0.1;dbname=tienda_musica;charset=utf8mb4',
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
// Implementa la clase AlbumRepositorio
// ============================================================
//
// La clase debe tener una propiedad privada $pdo de tipo PDO
// que se inicialice en el constructor llamando a Conexion::obtener().
//
// Métodos a implementar:
//
// listarTodos(): array
//   Devuelve todos los álbumes como array de objetos Album,
//   incluyendo el nombre del artista en la propiedad $nombre_artista.
//   Ordena por nombre del artista y luego por año de lanzamiento.
//
// buscarPorId(int $id): ?Album
//   Busca un álbum por id. Incluye nombre_artista.
//   Devuelve el objeto Album o null si no existe.
//
// buscarPorArtista(string $nombre_artista): array
//   Devuelve álbumes cuyo artista contenga ese texto (búsqueda parcial con LIKE).
//   Incluye nombre_artista. Usa prepared statement.
//
// guardar(string $titulo, int $artista_id, ?int $anio, ?float $precio): Album
//   Inserta un nuevo álbum y devuelve el objeto Album con el id asignado.
//
// comprar(int $album_id, int $cliente_id, float $precio_pagado): int
//   Registra una compra usando una transacción:
//     1. Verificar que el álbum existe y está disponible; si no, lanzar RuntimeException.
//     2. Insertar en `compras`.
//     3. Actualizar `albumes` SET disponible = FALSE.
//     4. COMMIT y devolver el id de la compra.
//   Si algo falla, hacer ROLLBACK y relanzar la excepción.
//
// Método privado filaAAlbum(array $fila): Album
//   Convierte una fila del resultado en un objeto Album.

class AlbumRepositorio
{
    private PDO $pdo;

    public function __construct()
    {
        $this->pdo = Conexion::obtener();
    }

    // TODO: implementar los métodos aquí
}


// ============================================================
// Pruebas (no modificar — solo implementa los métodos de arriba)
// ============================================================

$repo = new AlbumRepositorio();

// --- Listar todos ---
echo "=== Todos los álbumes ===\n";
foreach ($repo->listarTodos() as $album) {
    echo $album . "\n";
}
echo "\n";

// --- Buscar por id ---
echo "=== Buscar álbum id = 3 ===\n";
$album = $repo->buscarPorId(3);
echo $album ? $album . "\n" : "No encontrado.\n";
echo "\n";

// --- Buscar por artista ---
echo "=== Álbumes de Soda ===\n";
foreach ($repo->buscarPorArtista('Soda') as $a) {
    echo $a . "\n";
}
echo "\n";

// --- Guardar un álbum nuevo ---
echo "=== Guardar álbum nuevo ===\n";
$nuevo = $repo->guardar('The Bends', 4, 1995, 10.99);
echo "Guardado: $nuevo\n";
echo "\n";

// --- Comprar un álbum (transacción) ---
echo "=== Comprar álbum id=5 (Re) — cliente id=1 ===\n";
try {
    $compra_id = $repo->comprar(5, 1, 8.99);
    echo "Compra registrada con id: $compra_id\n";

    // Verificar que quedó no disponible
    $album = $repo->buscarPorId(5);
    echo "Estado de '{$album->titulo}': " . ($album->disponible ? 'disponible' : 'no disponible') . "\n";
} catch (RuntimeException $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
echo "\n";

// --- Intentar comprar un álbum ya no disponible ---
echo "=== Intentar comprar Re de nuevo (debe fallar) ===\n";
try {
    $repo->comprar(5, 2, 8.99);
    echo "ERROR: debería haber lanzado una excepción.\n";
} catch (RuntimeException $e) {
    echo "Error esperado: " . $e->getMessage() . "\n";
}
echo "\n";

// --- Limpieza: eliminar el álbum de prueba ---
Conexion::obtener()->prepare("DELETE FROM albumes WHERE id = :id")->execute([':id' => $nuevo->id]);
echo "Álbum de prueba eliminado.\n";


// ============================================================
// SOLUCIÓN
// ============================================================
/*

class AlbumRepositorio
{
    private PDO $pdo;

    public function __construct()
    {
        $this->pdo = Conexion::obtener();
    }

    private function filaAAlbum(array $fila): Album
    {
        return new Album(
            id:             (int) $fila['id'],
            titulo:         $fila['titulo'],
            artista_id:     (int) $fila['artista_id'],
            anio_lanzamiento: isset($fila['anio_lanzamiento']) ? (int) $fila['anio_lanzamiento'] : null,
            precio:         isset($fila['precio']) ? (float) $fila['precio'] : null,
            disponible:     (bool) $fila['disponible'],
            nombre_artista: $fila['nombre_artista'] ?? null
        );
    }

    public function listarTodos(): array
    {
        $filas = $this->pdo->query("
            SELECT a.*, ar.nombre AS nombre_artista
            FROM albumes a
            INNER JOIN artistas ar ON a.artista_id = ar.id
            ORDER BY ar.nombre, a.anio_lanzamiento
        ")->fetchAll();
        return array_map([$this, 'filaAAlbum'], $filas);
    }

    public function buscarPorId(int $id): ?Album
    {
        $stmt = $this->pdo->prepare("
            SELECT a.*, ar.nombre AS nombre_artista
            FROM albumes a
            INNER JOIN artistas ar ON a.artista_id = ar.id
            WHERE a.id = :id
        ");
        $stmt->execute([':id' => $id]);
        $fila = $stmt->fetch();
        return $fila ? $this->filaAAlbum($fila) : null;
    }

    public function buscarPorArtista(string $nombre_artista): array
    {
        $stmt = $this->pdo->prepare("
            SELECT a.*, ar.nombre AS nombre_artista
            FROM albumes a
            INNER JOIN artistas ar ON a.artista_id = ar.id
            WHERE ar.nombre LIKE :nombre
            ORDER BY a.anio_lanzamiento
        ");
        $stmt->execute([':nombre' => "%$nombre_artista%"]);
        return array_map([$this, 'filaAAlbum'], $stmt->fetchAll());
    }

    public function guardar(string $titulo, int $artista_id, ?int $anio, ?float $precio): Album
    {
        $stmt = $this->pdo->prepare("
            INSERT INTO albumes (titulo, artista_id, anio_lanzamiento, precio)
            VALUES (:titulo, :artista_id, :anio, :precio)
        ");
        $stmt->execute([
            ':titulo'     => $titulo,
            ':artista_id' => $artista_id,
            ':anio'       => $anio,
            ':precio'     => $precio,
        ]);
        return $this->buscarPorId((int) $this->pdo->lastInsertId());
    }

    public function comprar(int $album_id, int $cliente_id, float $precio_pagado): int
    {
        $this->pdo->beginTransaction();
        try {
            $stmt = $this->pdo->prepare("SELECT id, disponible FROM albumes WHERE id = :id");
            $stmt->execute([':id' => $album_id]);
            $album = $stmt->fetch();

            if (!$album) {
                throw new RuntimeException("El álbum con id=$album_id no existe.");
            }
            if (!$album['disponible']) {
                throw new RuntimeException("El álbum '{$album_id}' no está disponible.");
            }

            $stmt = $this->pdo->prepare("
                INSERT INTO compras (cliente_id, album_id, precio_pagado)
                VALUES (:cliente_id, :album_id, :precio)
            ");
            $stmt->execute([
                ':cliente_id' => $cliente_id,
                ':album_id'   => $album_id,
                ':precio'     => $precio_pagado,
            ]);
            $compra_id = (int) $this->pdo->lastInsertId();

            $this->pdo->prepare("UPDATE albumes SET disponible = FALSE WHERE id = :id")
                ->execute([':id' => $album_id]);

            $this->pdo->commit();
            return $compra_id;

        } catch (Exception $e) {
            $this->pdo->rollBack();
            throw $e;
        }
    }
}

*/
