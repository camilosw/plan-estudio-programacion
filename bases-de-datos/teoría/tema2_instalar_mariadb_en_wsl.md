# TEMA 2: Instalar MariaDB en WSL

## OBJETIVO

Instalar MariaDB en Ubuntu/WSL, iniciar el servicio y dejarlo configurado de forma segura.

## EXPLICACIÓN

MariaDB funciona como un servidor: corre en segundo plano y espera conexiones. Cuando un programa (tu script PHP, la terminal, HeidiSQL) quiere leer o escribir datos, se conecta a ese servidor.

Pasos de instalación:

1. Instalar el paquete de MariaDB
2. Iniciar el servicio
3. Correr el asistente de seguridad
4. Verificar que todo funciona

Una nota sobre WSL: en Ubuntu dentro de WSL no funciona `systemctl` (el gestor de servicios estándar de Linux) a menos que hayas habilitado soporte systemd. Por eso usamos `sudo service mariadb start` en su lugar, que funciona siempre.

## INSTALACIÓN

Paso 1: Actualizar el catálogo de paquetes

```bash
sudo apt update
```

```
Hit:1 http://archive.ubuntu.com/ubuntu noble InRelease
...
Reading package lists... Done
```

Paso 2: Instalar MariaDB

```bash
sudo apt install mariadb-server
```

```
The following NEW packages will be installed:
  mariadb-server mariadb-server-10.11 ...
Do you want to continue? [Y/n] y
...
Setting up mariadb-server-10.11 ...
```

Escribe `y` y presiona Enter cuando te lo pida.

Paso 3: Iniciar el servicio

```bash
sudo service mariadb start
```

Verificar que está corriendo:

```bash
sudo service mariadb status
```

Deberías ver algo como esto seguido de otros datos

```
 ● mariadb.service - MariaDB 10.11.14 database server
...
```

Si ves que el proceso está activo, MariaDB está corriendo correctamente.

## CONFIGURACIÓN DE SEGURIDAD

El asistente `mysql_secure_installation` elimina configuraciones inseguras que vienen por defecto:

- la cuenta de usuario anónima
- la base de datos de prueba accesible sin contraseña
- el acceso remoto al usuario root

  sudo mysql_secure_installation

El asistente hará estas preguntas. Aquí están las respuestas recomendadas:

```
Enter current password for root (enter for none):
```

→ Presiona Enter (no hay contraseña todavía)

```
Switch to unix_socket authentication [Y/n]
```

→ Escribe `n` y presiona Enter
(unix_socket significa que solo `root` del sistema puede entrar sin contraseña;
lo dejamos desactivado para poder conectarnos con contraseña desde HeidiSQL más adelante)

```
Change the root password? [Y/n]
```

→ Escribe `y` y elige una contraseña segura. Guárdala: la necesitarás.

```
Remove anonymous users? [Y/n]
```

→ Escribe `y`

```
Disallow root login remotely? [Y/n]
```

→ Escribe `y`

```
Remove test database and access to it? [Y/n]
```

→ Escribe `y`

```
Reload privilege tables now? [Y/n]
```

→ Escribe `y`

```
All done!
```

## VERIFICACIÓN

Conectarse a MariaDB como administrador:

```bash
sudo mariadb
```

```
Welcome to the MariaDB monitor.  Commands end with ; or \g.
Your MariaDB connection id is 4
Server version: 10.11.6-MariaDB-0ubuntu0.24.04.1 Ubuntu 24.04

MariaDB [(none)]>
```

Verificar la versión:

```sql
SELECT VERSION();
```

```
+----------------------------------+
| VERSION()                        |
+----------------------------------+
| 10.11.6-MariaDB-0ubuntu0.24.04.1 |
+----------------------------------+
1 row in set (0.000 sec)
```

Ver las bases de datos que existen por defecto:

```sql
SHOW DATABASES;
```

```
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
+--------------------+
3 rows in set (0.001 sec)
```

Estas bases de datos son internas de MariaDB. No las modifiques. Nosotros crearemos la nuestra: `biblioteca`.

Salir del cliente:

```sql
\q
```

```
Bye
```

## INICIAR MARIADB AUTOMÁTICAMENTE

Por defecto, el servicio se detiene cuando reinicias WSL. Para iniciarlo cada vez que abres WSL, agrega esta línea al final de tu `~/.zshrc` (o `~/.bashrc` si usas bash):

```bash
sudo service mariadb start > /dev/null 2>&1
```

Luego recarga la configuración:

```bash
source ~/.zshrc
```

A partir de ahora, cada vez que abras una terminal en WSL, MariaDB arrancará en silencio.

NOTA: Si en algún momento el servicio se detiene, puedes iniciarlo manualmente con:

```bash
sudo service mariadb start
```

## VERIFICACIÓN FINAL

Después de completar los pasos anteriores, confirma que todo funciona:

**1. El servicio está corriendo**

```bash
sudo service mariadb status
```

Salida esperada (busca la línea con la versión):

```
 * /usr/bin/mysqladmin  Ver 9.1 Distrib 10.11.x-MariaDB ...
```

**2. Puedes conectarte y ver la versión**

```bash
sudo mariadb -e "SELECT VERSION();"
```

```
+----------------------------------+
| VERSION()                        |
+----------------------------------+
| 10.11.x-MariaDB-0ubuntu0.24.04.x |
+----------------------------------+
```

La versión exacta puede variar. Lo importante: que el comando funcione sin errores.

**3. Las bases de datos internas existen**

```bash
sudo mariadb -e "SHOW DATABASES;"
```

```
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
+--------------------+
```

Si ves estas tres bases de datos, la instalación fue exitosa. La base de datos `biblioteca` la crearemos en el Tema 3.
