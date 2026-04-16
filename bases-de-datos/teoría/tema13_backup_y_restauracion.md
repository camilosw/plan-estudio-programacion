# TEMA 13: Backup y restauración

## OBJETIVO
Hacer copias de seguridad de una base de datos con `mysqldump` y restaurarlas desde la línea de comandos.

## EXPLICACIÓN

Tus tablas, datos e índices existen en archivos internos de MariaDB. Si el disco falla, si borras una tabla por error, o si necesitas mover la base a otro servidor, necesitas una copia de seguridad.

**La analogía de la biblioteca:** imagina que fotocopias todo el catálogo y los registros de préstamo y los guardas en una carpeta aparte. Si se pierde el original, puedes reconstruirlo desde la fotocopia. Eso es exactamente lo que hace `mysqldump`.

### ¿Qué hace `mysqldump`?

`mysqldump` lee tu base de datos y genera un archivo `.sql` con todas las instrucciones necesarias para recrearla desde cero: los `CREATE TABLE`, los `INSERT INTO` con cada fila, los índices y las claves foráneas. Es texto plano que puedes abrir con cualquier editor.

Eso tiene dos ventajas importantes:
- El archivo es portable: funciona en cualquier servidor con MariaDB o MySQL.
- Es legible: puedes revisar qué hay dentro antes de restaurar.

---

## EJEMPLO

Todos los comandos `mysqldump` y `mariadb` se ejecutan **en la terminal de WSL**, no dentro del cliente SQL.

### Hacer un backup completo de una base de datos

```bash
mysqldump -u sandra -p biblioteca > biblioteca_backup.sql
```

```
Enter password:
```

El archivo `biblioteca_backup.sql` se crea en el directorio actual. Si quieres guardarlo en otro lugar:

```bash
mysqldump -u sandra -p biblioteca > ~/backups/biblioteca_2024-03-15.sql
```

Verificar que se creó correctamente:

```bash
ls -lh ~/backups/biblioteca_2024-03-15.sql
```

```
-rw-r--r-- 1 sandra sandra 8.4K Mar 15 14:22 biblioteca_2024-03-15.sql
```

Ver las primeras líneas del archivo generado:

```bash
head -30 ~/backups/biblioteca_2024-03-15.sql
```

```sql
-- MariaDB dump 10.19  Distrib 10.6.12-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: 127.0.0.1    Database: biblioteca
-- ------------------------------------------------------
-- Server version       10.6.12-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
...

--
-- Table structure for table `autores`
--

DROP TABLE IF EXISTS `autores`;
CREATE TABLE `autores` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `nacionalidad` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;
```

El archivo contiene primero la estructura (CREATE TABLE) y luego los datos (INSERT INTO) de cada tabla.

---

### Backup solo de la estructura (sin datos)

Útil cuando quieres copiar el esquema a otro entorno sin llevarte los datos:

```bash
mysqldump -u sandra -p --no-data biblioteca > biblioteca_estructura.sql
```

### Backup de varias bases de datos

```bash
mysqldump -u sandra -p --databases biblioteca otra_bd > varias.sql
```

### Backup de todas las bases de datos (solo como root)

```bash
sudo mysqldump -u root --all-databases > todas_las_bases.sql
```

---

### Restaurar desde un backup

Restaurar sobreescribe la base de datos con el contenido del archivo. Si la base destino no existe, hay que crearla primero.

**Paso 1 — Crear la base de datos destino (si no existe):**

```bash
mariadb -u sandra -p -e "CREATE DATABASE IF NOT EXISTS biblioteca CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
```

```
Enter password:
```

**Paso 2 — Restaurar el backup:**

```bash
mariadb -u sandra -p biblioteca < ~/backups/biblioteca_2024-03-15.sql
```

```
Enter password:
```

Si no hay mensajes de error, la restauración fue exitosa.

**Paso 3 — Verificar:**

```bash
mariadb -u sandra -p biblioteca -e "SHOW TABLES;"
```

```
Enter password:
+---------------------+
| Tables_in_biblioteca|
+---------------------+
| autores             |
| categorias          |
| libros              |
| libros_categorias   |
| prestamos           |
| socios              |
+---------------------+
```

---

### Simular un error y recuperarse

Esto muestra el valor real de tener un backup. Primero comprobamos cuántos autores hay:

```bash
mariadb -u sandra -p biblioteca -e "SELECT COUNT(*) AS total FROM autores;"
```

```
+-------+
| total |
+-------+
|     7 |
+-------+
```

Luego, accidentalmente eliminamos la tabla:

```bash
mariadb -u sandra -p biblioteca -e "DROP TABLE autores;"
```

Verificamos que desapareció:

```bash
mariadb -u sandra -p biblioteca -e "SHOW TABLES;"
```

```
+---------------------+
| Tables_in_biblioteca|
+---------------------+
| categorias          |
| libros              |
| libros_categorias   |
| prestamos           |
| socios              |
+---------------------+
```

Restauramos desde el backup:

```bash
mariadb -u sandra -p biblioteca < ~/backups/biblioteca_2024-03-15.sql
```

Verificamos la recuperación:

```bash
mariadb -u sandra -p biblioteca -e "SELECT COUNT(*) AS total FROM autores;"
```

```
+-------+
| total |
+-------+
|     7 |
+-------+
```

La tabla y sus datos volvieron exactamente como estaban.

---

## La opción `--single-transaction`

Por defecto, `mysqldump` bloquea las tablas mientras las lee para garantizar consistencia. En bases de datos con el motor InnoDB (el que usamos), existe una alternativa mejor: `--single-transaction`. Hace el backup dentro de una transacción, lo que evita bloqueos y permite que otras conexiones sigan leyendo y escribiendo durante el proceso.

```bash
mysqldump -u sandra -p --single-transaction biblioteca > biblioteca_backup.sql
```

Para aprendizaje con una base pequeña no hace diferencia práctica, pero es el parámetro que verás en scripts de backup en producción.

---

## Dónde guardar los backups

Los backups dentro de WSL están en el sistema de archivos de Linux. Para abrirlos desde Windows Explorer, la ruta es:

```
\\wsl$\Ubuntu\home\sandra\backups\
```

Una buena práctica es incluir la fecha en el nombre del archivo:

```bash
mysqldump -u sandra -p --single-transaction biblioteca > ~/backups/biblioteca_$(date +%Y-%m-%d).sql
```

`$(date +%Y-%m-%d)` se expande a la fecha actual, por ejemplo `2024-03-15`.
