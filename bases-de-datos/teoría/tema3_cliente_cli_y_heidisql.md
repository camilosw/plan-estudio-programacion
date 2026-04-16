# TEMA 3: El cliente de línea de comandos y HeidiSQL

## OBJETIVO

Dominar los comandos básicos del cliente CLI de MariaDB, crear un usuario dedicado para el módulo y conectarse a la base de datos desde Windows con HeidiSQL.

## EXPLICACIÓN

Hay dos formas de hablar con MariaDB:

1. **Desde la terminal de WSL** — el cliente de línea de comandos. Útil para comandos rápidos, scripts y cuando no tienes acceso a una interfaz gráfica.

2. **Desde HeidiSQL en Windows** — una aplicación con interfaz visual. Útil para explorar tablas, ver datos en formato de grilla y escribir consultas cómodamente.

En este módulo usaremos ambos.

## CLIENTE DE LÍNEA DE COMANDOS

Conectarse como root (administrador):

```bash
sudo mariadb
```

Conectarse como un usuario normal y con contraseña (crearemos el usuario más adelante):

```bash
mariadb -u sandra -p
```

```
Enter password:
Welcome to the MariaDB monitor.
MariaDB [(none)]>
```

Comandos básicos dentro del cliente
(todos terminan con punto y coma `;`)

Ver todas las bases de datos disponibles:

```sql
SHOW DATABASES;
```

```
+--------------------+
| Database           |
+--------------------+
| biblioteca         |
| information_schema |
| mysql              |
| performance_schema |
+--------------------+
```

Seleccionar una base de datos para trabajar en ella (por ahora no tenemos la base de datos biblioteca, así que solo estudia los comandos, no los ejecutes):

```sql
USE biblioteca;
```

```
Database changed
```

Ver las tablas de la base de datos seleccionada:

```sql
SHOW TABLES;
```

```
+----------------------+
| Tables_in_biblioteca |
+----------------------+
| autores              |
| libros               |
+----------------------+
```

Ver la estructura de una tabla:

```sql
DESCRIBE autores;
```

```
+------------------+--------------+------+-----+---------+----------------+
| Field            | Type         | Null | Key | Default | Extra          |
+------------------+--------------+------+-----+---------+----------------+
| id               | int(11)      | NO   | PRI | NULL    | auto_increment |
| nombre           | varchar(150) | NO   |     | NULL    |                |
| pais             | varchar(100) | YES  | NULL|         |                |
+------------------+--------------+------+-----+---------+----------------+
```

Limpiar la pantalla:

```sql
\! clear
```

Salir del cliente:

```sql
\q
```

## CREAR UN USUARIO DEDICADO

Usar `root` para el día a día es una mala práctica de seguridad. Lo correcto es crear un usuario con permisos limitados a la base de datos que necesitas.

Paso 1: Conectarse como root

```bash
sudo mariadb
```

Paso 2: Crear el usuario `sandra` con acceso desde cualquier host (`%`)

```sql
CREATE USER 'sandra'@'%' IDENTIFIED BY 'mi_contraseña_segura';
```

Reemplaza `mi_contraseña_segura` por una contraseña real.

Paso 3: Crear la base de datos `biblioteca`

```sql
CREATE DATABASE biblioteca CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Paso 4: Dar todos los permisos sobre `biblioteca` al usuario `sandra`

```sql
GRANT ALL PRIVILEGES ON biblioteca.* TO 'sandra'@'%';
```

Paso 5: Aplicar los cambios

```sql
FLUSH PRIVILEGES;
```

Paso 6: Salir y volver a entrar como `sandra`

```sql
\q
```

```bash
mariadb -u sandra -p biblioteca
```

```
Enter password:
Welcome to the MariaDB monitor.
MariaDB [biblioteca]>
```

A partir de aquí, usamos siempre el usuario `sandra`.

## CONFIGURAR MARIADB PARA CONECTARSE DESDE WINDOWS

Por defecto, MariaDB solo acepta conexiones desde la misma máquina (localhost). Para conectarse desde Windows con HeidiSQL, necesitamos permitir conexiones externas.

Paso 1: Editar el archivo de configuración

```bash
sudo nano /etc/mysql/mariadb.conf.d/50-server.cnf
```

Busca la línea:

```
bind-address = 127.0.0.1
```

Cámbiala por:

```
bind-address = 0.0.0.0
```

Guarda el archivo: Ctrl+O → Enter → Ctrl+X.

Paso 2: Reiniciar el servicio

```bash
sudo service mariadb restart
```

```
 * Stopping MariaDB database server mysqld         [ OK ]
 * Starting MariaDB database server mysqld          [ OK ]
```

Paso 3: Obtener la IP de WSL (necesaria si `127.0.0.1` no funciona desde Windows)

```bash
hostname -I
```

```
172.26.100.45
```

Anota esa IP. En versiones recientes de WSL2, `127.0.0.1` funciona directamente gracias al reenvío de puertos automático. Si no, usa esta IP.

## INSTALAR Y CONFIGURAR HEIDISQL

HeidiSQL es un cliente de base de datos gratuito para Windows, diseñado específicamente para MySQL y MariaDB. Tiene una interfaz clara y no requiere configuración compleja.

Paso 1: Descargar HeidiSQL
Ir a https://www.heidisql.com/download.php y descargar el instalador. Ejecutarlo con las opciones por defecto.

Paso 2: Crear una sesión de conexión

Al abrir HeidiSQL aparece el "Gestor de sesiones". Haz clic en "Nueva" (esquina inferior izquierda).

Configura los campos:

- **Tipo de red:** MariaDB or MySQL (TCP/IP)
- **Nombre de host / IP:** 127.0.0.1
- **Usuario:** sandra
- **Contraseña:** (la que elegiste al crear el usuario)
- **Puerto:** 3306
- **Base de datos:** biblioteca

Haz clic en "Abrir". Si la conexión funciona, verás el panel izquierdo con la base de datos `biblioteca`.

Si `127.0.0.1` no conecta, prueba con la IP que obtuvo `hostname -I` en WSL.

Paso 3: Explorar la interfaz

- **Panel izquierdo:** árbol con bases de datos, tablas y vistas
- **Panel central:** editor de consultas SQL
- **Panel inferior:** resultados de la consulta
- Clic derecho sobre una tabla → "Ver datos" para ver el contenido

## COMPARATIVA DE CLIENTES GRÁFICOS

```
HeidiSQL
--------
Gratis, solo para Windows, diseñado para MySQL/MariaDB.
Muy liviano y fácil de usar. Curva de aprendizaje mínima.
Ideal para empezar. Es el cliente que usa este módulo.
```

```
DBeaver Community
-----------------
Gratis, disponible para Windows/Mac/Linux. Soporta decenas de
motores (PostgreSQL, SQLite, Oracle, MongoDB, etc.). Más potente
pero más complejo de configurar. Buena elección si luego trabajas
con otras bases de datos.
```

```
MySQL Workbench
---------------
Oficial de Oracle, gratuito. Incluye diseño visual de esquemas
(diagrama ER), herramientas de migración y monitoreo del servidor.
Más pesado que HeidiSQL. Útil en entornos empresariales donde el
equipo ya lo usa.
```

Para aprender: HeidiSQL. Para proyectos con varias bases de datos distintas: DBeaver. Para trabajo en equipo con MySQL corporativo: MySQL Workbench.

## VERIFICACIÓN FINAL

Después de completar los pasos de este tema, confirma que todo está configurado correctamente.

**1. Conectarse como `sandra` desde la CLI**

```bash
mariadb -u sandra -p -e "SELECT DATABASE();" biblioteca
```

Salida esperada:

```
+------------+
| DATABASE() |
+------------+
| biblioteca |
+------------+
```

**2. Verificar los permisos del usuario**

```bash
sudo mariadb -e "SHOW GRANTS FOR 'sandra'@'%';"
```

Salida esperada (aproximada):

```
+----------------------------------------------------------+
| Grants for sandra@%                                      |
+----------------------------------------------------------+
| GRANT USAGE ON *.* TO `sandra`@`%` ...                   |
| GRANT ALL PRIVILEGES ON `biblioteca`.* TO `sandra`@`%`   |
+----------------------------------------------------------+
```

**3. Verificar la conexión desde HeidiSQL**

Después de conectarte desde Windows con HeidiSQL, deberías ver en el panel izquierdo:

- `biblioteca` (la base que creamos)
- `information_schema`

Si ves esas entradas, HeidiSQL está conectado correctamente a MariaDB en WSL.
