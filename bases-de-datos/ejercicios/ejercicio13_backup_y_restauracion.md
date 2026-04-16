# Ejercicio 13: Backup y restauración

## Dominio

Tienda de música. Usamos `tienda_musica` con los datos de los ejercicios anteriores.

---

## Objetivo

Practica el ciclo completo de backup y restauración para proteger los datos de la tienda.

**Tarea 1 — Crear el directorio de backups y hacer el primer backup:**

Crea el directorio `~/backups/` si no existe. Luego haz un backup completo de `tienda_musica` usando `mysqldump` con `--single-transaction`. Usa la fecha de hoy en el nombre del archivo. Verifica que el archivo se creó y muestra las primeras 20 líneas para confirmar que contiene SQL válido.

**Tarea 2 — Simular un accidente y recuperarse:**

Comprueba cuántos álbumes hay en la tabla `albumes`. Luego ejecuta `DROP TABLE albumes;` para simularar un error. Verifica que la tabla ya no existe con `SHOW TABLES;`. Restaura desde el backup que creaste en la Tarea 1 y verifica que la tabla y los datos volvieron.

**Tarea 3 — Backup solo de estructura:**

Haz un backup solo de la estructura de `tienda_musica` (sin datos). Abre el archivo y comprueba que contiene los `CREATE TABLE` pero no hay instrucciones `INSERT INTO`.

---

## Tu turno

Escribe los comandos de terminal (bash) y los comandos SQL necesarios para cada tarea. Recuerda que `mysqldump` y `mariadb` se ejecutan en la terminal de WSL, no dentro del cliente SQL.

---

## Solución

### Tarea 1 — Crear directorio y hacer backup

```bash
# Crear el directorio si no existe
mkdir -p ~/backups

# Hacer el backup con la fecha en el nombre
mysqldump -u sandra -p --single-transaction tienda_musica > ~/backups/tienda_musica_$(date +%Y-%m-%d).sql

# Verificar que el archivo existe y su tamaño
ls -lh ~/backups/

# Ver las primeras 20 líneas para confirmar que es SQL válido
head -20 ~/backups/tienda_musica_$(date +%Y-%m-%d).sql
```

Salida esperada de `ls -lh`:
```
total 12K
-rw-r--r-- 1 sandra sandra 9.2K Mar 15 14:30 tienda_musica_2024-03-15.sql
```

Primeras líneas del archivo:
```sql
-- MariaDB dump 10.19  Distrib 10.6.12-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: 127.0.0.1    Database: tienda_musica
-- -------------------------------------------------------
-- Server version       10.6.12-MariaDB
...
DROP TABLE IF EXISTS `albumes`;
CREATE TABLE `albumes` (
  ...
```

---

### Tarea 2 — Simular accidente y recuperarse

```bash
# Verificar cuántos álbumes hay
mariadb -u sandra -p tienda_musica -e "SELECT COUNT(*) AS total FROM albumes;"
```

```
+-------+
| total |
+-------+
|     5 |
+-------+
```

```bash
# Simular el accidente: eliminar la tabla
mariadb -u sandra -p tienda_musica -e "DROP TABLE albumes;"

# Verificar que ya no existe
mariadb -u sandra -p tienda_musica -e "SHOW TABLES;"
```

```
+------------------------+
| Tables_in_tienda_musica|
+------------------------+
| albumes_generos        |
| artistas               |
| canciones              |
| clientes               |
| compras                |
| generos                |
+------------------------+
```

`albumes` desapareció, y con ella cualquier tabla que dependa de ella tendría problemas.

```bash
# Restaurar desde el backup
mariadb -u sandra -p tienda_musica < ~/backups/tienda_musica_2024-03-15.sql

# Verificar que la tabla volvió
mariadb -u sandra -p tienda_musica -e "SHOW TABLES;"
```

```
+------------------------+
| Tables_in_tienda_musica|
+------------------------+
| albumes                |
| albumes_generos        |
| artistas               |
| canciones              |
| clientes               |
| compras                |
| generos                |
+------------------------+
```

```bash
# Verificar que los datos también volvieron
mariadb -u sandra -p tienda_musica -e "SELECT COUNT(*) AS total FROM albumes;"
```

```
+-------+
| total |
+-------+
|     5 |
+-------+
```

---

### Tarea 3 — Backup solo de estructura

```bash
mysqldump -u sandra -p --no-data tienda_musica > ~/backups/tienda_musica_estructura.sql

# Buscar si hay INSERTs en el archivo (no debería haber ninguno)
grep -c "INSERT" ~/backups/tienda_musica_estructura.sql
```

```
0
```

```bash
# Confirmar que sí hay CREATE TABLE
grep "CREATE TABLE" ~/backups/tienda_musica_estructura.sql
```

```sql
CREATE TABLE `albumes` (
CREATE TABLE `albumes_generos` (
CREATE TABLE `artistas` (
CREATE TABLE `canciones` (
CREATE TABLE `clientes` (
CREATE TABLE `compras` (
CREATE TABLE `generos` (
```

**Puntos a comparar con tu solución:**
- El flag `--single-transaction` es el parámetro correcto para bases InnoDB: hace el backup dentro de una transacción, sin bloquear otras operaciones
- El nombre con fecha (`$(date +%Y-%m-%d)`) es esencial en producción para no sobreescribir backups anteriores
- `mysqldump` genera SQL estándar que funciona en cualquier servidor MariaDB o MySQL compatible
- Al restaurar con `mariadb < archivo.sql`, si el archivo incluye `DROP TABLE IF EXISTS` (que mysqldump agrega por defecto), las tablas existentes se reemplazan limpiamente
