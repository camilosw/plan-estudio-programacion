# Plan de Estudios: Bases de Datos con MariaDB

## Contexto

Los datos que maneja una aplicación necesitan sobrevivir entre ejecuciones. Guardarlos en variables o archivos de texto no escala: se mezclan, se pierden y son difíciles de consultar. Una **base de datos relacional** resuelve esto: organiza la información en tablas, la mantiene íntegra y permite consultarla de formas complejas en milisegundos.

Este módulo usa **MariaDB** como motor de base de datos. MariaDB es el paquete por defecto en Ubuntu, es gratuito, de código abierto y 100% compatible con la sintaxis de MySQL. Todo lo que aprendas aquí aplica directamente en entornos profesionales.

La analogía que usaremos a lo largo del módulo: **una biblioteca personal**. Tienes libros, autores, categorías y socios que piden préstamos. Necesitas guardar todo eso de forma organizada, encontrar un libro por autor en décimas de segundo y saber qué socios tienen libros prestados. Eso es exactamente lo que hace una base de datos.

---

## Estructura del plan

El módulo **alterna bloques de SQL con bloques de PHP + PDO**: en cuanto aprendes lo suficiente de SQL para ser útil, pasas a aplicarlo desde PHP, y luego vuelves a profundizar en SQL antes del siguiente bloque de PHP.

Cada tema de teoría sigue este formato:

1. **Explicación** del concepto con analogía
2. **Ejemplo** con comandos SQL o PHP y su salida esperada

El ejercicio práctico está en su archivo separado dentro de la carpeta `ejercicios/`.

Los temas de SQL son archivos Markdown (`.md`) con comandos SQL y de terminal. Los temas de PHP son archivos `.php` que puedes ejecutar con `php nombrearchivo.php`.

Orden de archivos:

- **md (SQL):** temas 1, 2, 3, 4, 5, 6, 9, 10, 11, 13, 14, 15, 17
- **php (PHP + PDO):** temas 7, 8, 12, 16, 18

---

## Tema 1: ¿Qué es una base de datos relacional?

**Objetivo:** Entender qué es una base de datos, qué problema resuelve y por qué usamos MariaDB.

**Contenido:** tablas, filas, columnas, relaciones entre tablas. Diferencia entre MariaDB, MySQL, PostgreSQL y SQLite. Por qué MariaDB en este módulo.

---

## Tema 2: Instalar MariaDB en WSL

**Objetivo:** Instalar MariaDB en Ubuntu/WSL y dejarlo listo para usar.

**Contenido:** `apt install mariadb-server`, iniciar el servicio, `mysql_secure_installation`, verificación.

---

## Tema 3: El cliente de línea de comandos y HeidiSQL

**Objetivo:** Conectarse a MariaDB desde la terminal de WSL y desde Windows con HeidiSQL.

**Contenido:** comandos básicos del cliente CLI (`SHOW DATABASES`, `USE`, `SHOW TABLES`, `\q`), crear un usuario dedicado con permisos, configurar acceso remoto para HeidiSQL, instalar HeidiSQL y conectarse. Comparativa con DBeaver y MySQL Workbench.

---

## Tema 4: Crear base de datos y primeras tablas

**Objetivo:** Crear la base de datos `biblioteca` y las primeras tablas con tipos de datos básicos.

**Contenido:** `CREATE DATABASE`, `CREATE TABLE`, tipos `INT`, `VARCHAR`, `TEXT`, `DATE`, `PRIMARY KEY`, `AUTO_INCREMENT`.

---

## Tema 5: INSERT y SELECT básico

**Objetivo:** Insertar datos y consultarlos.

**Contenido:** `INSERT INTO`, `SELECT *`, `SELECT columnas`, `ORDER BY`, `LIMIT`.

---

## Tema 6: UPDATE, DELETE y WHERE

**Objetivo:** Modificar y eliminar datos, filtrar con condiciones.

**Contenido:** `UPDATE ... SET ... WHERE`, `DELETE ... WHERE`, operadores de comparación, `LIKE`, `IN`, `BETWEEN`. Advertencia sobre `DELETE` sin `WHERE`.

---

## Tema 7: PHP y PDO — Conexión y consultas básicas

**Objetivo:** Conectarse a MariaDB desde PHP y leer datos con PDO.

**Contenido:** `new PDO(...)`, `setAttribute`, `query()`, `fetch()`, `fetchAll()`, `fetchColumn()`, manejo de errores con `try/catch`. Ejemplos sobre tablas planas (sin JOINs, aún sin claves foráneas).

---

## Tema 8: PHP y PDO — Prepared statements y seguridad

**Objetivo:** Insertar, modificar y eliminar datos de forma segura desde PHP.

**Contenido:** `prepare()` + `execute()` con parámetros nombrados, qué es la inyección SQL y cómo prevenirla, `lastInsertId()`, `rowCount()`, `exec()` para SQL sin parámetros.

---

## Tema 9: Tipos de datos y constraints

**Objetivo:** Elegir el tipo de dato correcto y proteger la integridad de los datos.

**Contenido:** `NOT NULL`, `UNIQUE`, `DEFAULT`, `CHECK`. Comparativa de tipos: `VARCHAR` vs `TEXT`, `INT` vs `BIGINT`, `DATE` vs `DATETIME`.

---

## Tema 10: Claves foráneas y relaciones

**Objetivo:** Relacionar tablas entre sí y mantener integridad referencial.

**Contenido:** relación 1:N (autor → libros), relación N:M (libros ↔ categorías con tabla puente), `FOREIGN KEY ... REFERENCES`, `ON DELETE CASCADE` y `ON DELETE RESTRICT`.

---

## Tema 11: JOINs

**Objetivo:** Consultar datos de varias tablas al mismo tiempo.

**Contenido:** `INNER JOIN`, `LEFT JOIN`, `RIGHT JOIN`. Casos reales: "todos los libros con el nombre de su autor", "autores que no tienen libros cargados".

---

## Tema 12: PHP y PDO — Consultas con JOINs

**Objetivo:** Ejecutar desde PHP las consultas con JOIN que aprendiste en SQL.

**Contenido:** INNER JOIN y LEFT JOIN desde `query()` y desde `prepare()`, cómo usar alias de columnas al acceder al resultado, manejo de NULL con `??`, JOINs de tres tablas, patrón "LEFT JOIN + IS NULL" para detectar huecos.

---

## Tema 13: Normalización

**Objetivo:** Diseñar tablas sin datos duplicados ni dependencias incorrectas.

**Contenido:** Primera, segunda y tercera forma normal (1FN, 2FN, 3FN). Ejemplo: tabla mal diseñada con autor repetido en cada fila → normalizarla paso a paso.

---

## Tema 14: Índices y vistas

**Objetivo:** Acelerar consultas con índices y simplificarlas con vistas.

**Contenido:** `CREATE INDEX`, cuándo usarlo y cuándo no. `CREATE VIEW` para encapsular consultas complejas como una tabla virtual.

---

## Tema 15: Transacciones

**Objetivo:** Ejecutar varias operaciones como una unidad atómica: o todas pasan, o ninguna.

**Contenido:** `START TRANSACTION`, `COMMIT`, `ROLLBACK`. Ejemplo: registrar un préstamo modifica dos tablas; si algo falla, se revierten ambas.

---

## Tema 16: PHP y PDO — Transacciones

**Objetivo:** Aplicar las transacciones desde PHP usando los métodos de PDO.

**Contenido:** `beginTransaction()`, `commit()`, `rollBack()`, el patrón estándar `try { ... $pdo->commit(); } catch (Throwable $e) { $pdo->rollBack(); throw $e; }`. Ejemplo completo: registrar un préstamo tocando `prestamos` y `libros` en una sola unidad atómica.

---

## Tema 17: Backup y restauración

**Objetivo:** Hacer copias de seguridad de la base de datos con `mysqldump` y restaurarlas desde la terminal.

**Contenido:** `mysqldump` con sus opciones principales (`--single-transaction`, `--no-data`, `--databases`), restaurar con `mariadb < archivo.sql`, nombres de archivo con fecha, dónde guardar los backups desde WSL.

---

## Tema 18: Proyecto integrador — OOP + Base de datos (patrón repositorio)

**Objetivo:** Conectar el módulo de OOP con la base de datos usando el patrón repositorio.

**Contenido:** clases `Libro` y `Autor` como objetos PHP, clase `LibroRepositorio` con métodos `buscarPorId()`, `guardar()`, `listarTodos()`, `eliminar()`. Cómo mapear filas de la base de datos a instancias de clases PHP.
