# Hoja de Referencia — Bases de Datos con MariaDB

Resumen de todos los comandos del módulo, organizados por categoría. Úsala como consulta rápida cuando no recuerdes un comando.

---

## Gestión del servicio (desde WSL)

| Comando                               | Qué hace                                      |
|---------------------------------------|-----------------------------------------------|
| `sudo service mariadb start`          | Inicia el servidor de MariaDB                 |
| `sudo service mariadb stop`           | Detiene el servidor                           |
| `sudo service mariadb restart`        | Reinicia el servidor                          |
| `sudo service mariadb status`         | Muestra si el servidor está corriendo         |
| `sudo mysql_secure_installation`      | Asistente de configuración de seguridad       |

---

## Cliente de línea de comandos

| Comando                                  | Qué hace                                         |
|------------------------------------------|--------------------------------------------------|
| `sudo mariadb`                           | Entra como root (sin contraseña en WSL)          |
| `mariadb -u sandra -p`                   | Entra como usuario `sandra` con contraseña       |
| `mariadb -u sandra -p biblioteca`        | Entra directamente a la base `biblioteca`        |
| `mariadb --default-character-set=utf8mb4 -u sandra -p biblioteca` | Entra con encoding correcto para tildes |
| `hostname -I`                            | Muestra la IP de WSL (para conectar HeidiSQL)    |

**Dentro del cliente:**

| Comando             | Qué hace                                      |
|---------------------|-----------------------------------------------|
| `SHOW DATABASES;`   | Lista todas las bases de datos                |
| `USE nombre_bd;`    | Selecciona una base de datos                  |
| `SHOW TABLES;`      | Lista las tablas de la base seleccionada      |
| `DESCRIBE tabla;`   | Muestra la estructura de una tabla            |
| `SHOW INDEX FROM tabla;` | Muestra los índices de una tabla         |
| `SHOW CREATE TABLE tabla\G` | Muestra el SQL de creación de la tabla |
| `\q`                | Sale del cliente                              |
| `\! clear`          | Limpia la pantalla                            |

---

## DDL — Definición de estructura

### Bases de datos

```sql
CREATE DATABASE nombre CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
DROP DATABASE IF EXISTS nombre;
```

### Tablas

```sql
CREATE TABLE nombre (
    id      INT UNSIGNED NOT NULL AUTO_INCREMENT,
    columna VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

DROP TABLE IF EXISTS nombre;
ALTER TABLE nombre ADD COLUMN nueva_col TEXT;
ALTER TABLE tabla MODIFY COLUMN col SMALLINT UNSIGNED;
ALTER TABLE tabla DROP COLUMN col;
```

### Claves foráneas

```sql
ALTER TABLE libros
ADD CONSTRAINT fk_nombre
FOREIGN KEY (autor_id) REFERENCES autores(id)
ON DELETE RESTRICT ON UPDATE CASCADE;
```

### Índices

```sql
CREATE INDEX idx_nombre ON tabla(columna);
DROP INDEX idx_nombre ON tabla;
EXPLAIN SELECT ...\G    -- ver si usa índice
```

### Vistas

```sql
CREATE VIEW nombre_vista AS SELECT ...;
DROP VIEW IF EXISTS nombre_vista;
SHOW FULL TABLES WHERE Table_type = 'VIEW';
```

---

## Tipos de datos más usados

| Tipo              | Uso                                          |
|-------------------|----------------------------------------------|
| `INT UNSIGNED`    | IDs, contadores positivos                    |
| `SMALLINT UNSIGNED` | Cantidades pequeñas (páginas, edad)        |
| `BIGINT UNSIGNED` | IDs en tablas con millones de filas          |
| `DECIMAL(10,2)`   | Precios, montos (precisión exacta)           |
| `VARCHAR(n)`      | Texto variable con largo máximo conocido     |
| `TEXT`            | Texto largo sin límite práctico              |
| `CHAR(n)`         | Texto de longitud fija (códigos de país)     |
| `DATE`            | Fecha sin hora (`2024-03-15`)                |
| `DATETIME`        | Fecha con hora (`2024-03-15 14:30:00`)       |
| `BOOLEAN`         | Verdadero/falso (internamente TINYINT(1))    |
| `YEAR`            | Solo el año (`2024`)                         |

## Constraints

| Constraint       | Qué hace                                          |
|------------------|---------------------------------------------------|
| `NOT NULL`       | El campo es obligatorio                           |
| `UNIQUE`         | No puede haber dos filas con el mismo valor       |
| `DEFAULT valor`  | Valor por defecto si no se especifica             |
| `CHECK (cond)`   | Valida que el valor cumpla una condición          |
| `AUTO_INCREMENT` | MariaDB asigna el siguiente número automáticamente|
| `PRIMARY KEY`    | Identifica de forma única cada fila               |

---

## DML — Manipulación de datos

### INSERT

```sql
INSERT INTO tabla (col1, col2) VALUES (val1, val2);

-- Múltiples filas en una instrucción:
INSERT INTO tabla (col1, col2) VALUES
    (val1a, val2a),
    (val1b, val2b);
```

### SELECT

```sql
SELECT * FROM tabla;
SELECT col1, col2 FROM tabla;
SELECT col1 AS alias FROM tabla;
SELECT * FROM tabla WHERE condicion;
SELECT * FROM tabla ORDER BY col ASC;
SELECT * FROM tabla ORDER BY col DESC;
SELECT * FROM tabla LIMIT n;
SELECT COUNT(*) FROM tabla;
SELECT COUNT(*) FROM tabla WHERE condicion;
```

### WHERE y operadores

```sql
WHERE col = valor
WHERE col != valor
WHERE col > valor AND col < valor
WHERE col BETWEEN v1 AND v2
WHERE col IN (v1, v2, v3)
WHERE col LIKE '%texto%'
WHERE col LIKE 'texto%'
WHERE col IS NULL
WHERE col IS NOT NULL
```

### UPDATE

```sql
UPDATE tabla SET col1 = val1, col2 = val2 WHERE condicion;
```

### DELETE

```sql
DELETE FROM tabla WHERE condicion;
-- ADVERTENCIA: sin WHERE elimina TODOS los registros
```

---

## JOINs

```sql
-- INNER JOIN: solo filas con coincidencia en ambas tablas
SELECT l.titulo, a.nombre
FROM libros l
INNER JOIN autores a ON l.autor_id = a.id;

-- LEFT JOIN: todas las filas de la izquierda + coincidencias de la derecha
SELECT a.nombre, l.titulo
FROM autores a
LEFT JOIN libros l ON a.id = l.autor_id;

-- Filtrar los que no tienen coincidencia (LEFT JOIN + IS NULL)
SELECT a.nombre FROM autores a
LEFT JOIN libros l ON a.id = l.autor_id
WHERE l.id IS NULL;
```

---

## Transacciones

```sql
START TRANSACTION;
-- instrucciones SQL...
COMMIT;              -- confirma todos los cambios

ROLLBACK;            -- deshace todo desde START TRANSACTION

-- Savepoints:
SAVEPOINT sp1;
ROLLBACK TO SAVEPOINT sp1;
```

---

## PHP con PDO

### Conexión

```php
$pdo = new PDO(
    'mysql:host=127.0.0.1;dbname=biblioteca;charset=utf8mb4',
    'usuario',
    'contraseña',
    [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ]
);
```

### Consultas de lectura

```php
// Sin parámetros:
$stmt = $pdo->query("SELECT * FROM tabla");
$filas = $stmt->fetchAll();           // todas las filas
$fila  = $stmt->fetch();             // una fila
$valor = $stmt->fetchColumn();       // primer valor de la primera fila

// Con parámetros (siempre usar esto con datos del usuario):
$stmt = $pdo->prepare("SELECT * FROM tabla WHERE col = :val");
$stmt->execute([':val' => $valor]);
$resultado = $stmt->fetchAll();
```

### Insertar, actualizar, eliminar

```php
$stmt = $pdo->prepare("INSERT INTO tabla (col) VALUES (:col)");
$stmt->execute([':col' => $valor]);
$id = $pdo->lastInsertId();      // id del registro insertado
$n  = $stmt->rowCount();         // filas afectadas

$pdo->exec("DELETE FROM tabla WHERE id = 1");  // sin parámetros
```

### Transacciones en PHP

```php
$pdo->beginTransaction();
try {
    $pdo->prepare(...)->execute([...]);
    $pdo->prepare(...)->execute([...]);
    $pdo->commit();
} catch (Exception $e) {
    $pdo->rollBack();
    throw $e;
}
```

---

## Gestión de usuarios (como root)

```sql
CREATE USER 'sandra'@'%' IDENTIFIED BY 'contraseña';
GRANT ALL PRIVILEGES ON biblioteca.* TO 'sandra'@'%';
FLUSH PRIVILEGES;
SHOW GRANTS FOR 'sandra'@'%';
DROP USER 'sandra'@'%';
```
