# TEMA 5: Permisos y usuarios — Candados y llaves

## OBJETIVO
Entender el sistema de permisos de Linux, saber leer la salida de `ls -l` y modificar permisos con `chmod`.

## EXPLICACIÓN

### Cada archivo tiene un dueño y un candado

En el taller, algunos cajones tienen candado. Solo el dueño del cajón puede abrirlo. Otros cajones están abiertos para que cualquiera lea lo que hay dentro, pero solo el dueño puede modificarlo. Y algunos cajones contienen herramientas que cualquiera puede usar (ejecutar), pero no modificar.

En Linux funciona igual: cada archivo pertenece a un usuario y a un grupo, y tiene permisos que definen quién puede hacer qué.

### Los tres grupos de usuarios

| Grupo   | Símbolo | Quién es                                     |
|---------|---------|----------------------------------------------|
| User    | `u`     | El dueño del archivo                         |
| Group   | `g`     | El grupo al que pertenece el dueño           |
| Others  | `o`     | Todos los demás usuarios del sistema         |

### Los tres tipos de permiso

| Permiso  | Símbolo | Para archivos               | Para carpetas                    |
|----------|---------|-----------------------------|----------------------------------|
| Lectura  | `r`     | Puede leer el contenido     | Puede ver qué hay dentro (`ls`)  |
| Escritura| `w`     | Puede modificar el archivo  | Puede crear/eliminar archivos    |
| Ejecución| `x`     | Puede ejecutarlo como programa | Puede entrar con `cd`         |

### Leer la salida de ls -l

```bash
ls -l
```

```
-rwxr-xr-- 1 sandra devs 1234 Apr  2 10:00 script.sh
drwxr-xr-x 2 sandra devs 4096 Apr  2 09:00 proyectos
```

La primera columna es la parte más importante. Se divide así:

```
- r w x r - x r - -
│ ├─────┤ ├─────┤ ├─────┤
│   user   group  others
│
└── tipo: - = archivo, d = carpeta, l = enlace simbólico
```

Para el archivo `script.sh` con `-rwxr-xr--`:
- `-` → es un archivo (no una carpeta)
- `rwx` → el dueño (sandra) puede leer, escribir y ejecutar
- `r-x` → el grupo puede leer y ejecutar, pero no escribir
- `r--` → los demás solo pueden leer

Para `proyectos` con `drwxr-xr-x`:
- `d` → es una carpeta
- `rwx` → sandra puede entrar, listar y crear archivos dentro
- `r-x` → el grupo puede entrar y listar, pero no crear archivos
- `r-x` → los demás también pueden entrar y listar

### chmod — Cambiar permisos

`chmod` significa "change mode". Hay dos formas de usarlo:

#### Notación simbólica (más fácil de leer)

```bash
chmod u+x script.sh
```

Agrega (`+`) el permiso de ejecución (`x`) al usuario (`u`).

```bash
chmod g-w archivo.txt
```

Quita (`-`) el permiso de escritura (`w`) al grupo (`g`).

```bash
chmod o+r documento.txt
```

Agrega lectura a others.

```bash
chmod a+x script.sh
```

`a` (all) aplica el cambio a los tres grupos a la vez.

Verificar el cambio:

```bash
ls -l script.sh
```

```
-rw-r--r-- 1 sandra sandra 45 Apr  2 10:00 script.sh
```

```bash
chmod +x script.sh
ls -l script.sh
```

```
-rwxr-xr-x 1 sandra sandra 45 Apr  2 10:00 script.sh
```

#### Notación numérica (más compacta)

Cada permiso tiene un valor numérico:
- `r` = 4
- `w` = 2
- `x` = 1

Se suman para cada grupo:

| Número | Permisos | Significado           |
|--------|----------|-----------------------|
| 7      | rwx      | Todo                  |
| 6      | rw-      | Leer y escribir       |
| 5      | r-x      | Leer y ejecutar       |
| 4      | r--      | Solo leer             |
| 0      | ---      | Sin permisos          |

```bash
chmod 755 script.sh
```

Equivale a: dueño=rwx (7), grupo=r-x (5), others=r-x (5).

```bash
chmod 644 documento.txt
```

Equivale a: dueño=rw- (6), grupo=r-- (4), others=r-- (4). Es el permiso estándar para archivos normales.

### sudo — La llave maestra

Algunos comandos requieren permisos de administrador (root). `sudo` (superuser do) te permite ejecutarlos temporalmente:

```bash
sudo apt update
```

Te pedirá tu contraseña. Después de ingresarla, el comando se ejecuta con permisos de administrador.

Úsalo solo cuando sea necesario. Un error con permisos de root puede afectar todo el sistema.

### id — Ver tu identidad

```bash
id
```

```
uid=1000(sandra) gid=1000(sandra) groups=1000(sandra),4(adm),27(sudo)
```

- `uid` — identificador de usuario (1000 es el primer usuario normal)
- `gid` — identificador del grupo principal
- `groups` — todos los grupos a los que perteneces

El grupo `sudo` significa que puedes usar el comando `sudo`.

### Resumen de comandos

| Comando              | Qué hace                                          |
|----------------------|---------------------------------------------------|
| `ls -l`              | Lista archivos con permisos detallados            |
| `chmod u+x archivo`  | Agrega ejecución al dueño                        |
| `chmod 755 archivo`  | Establece permisos con notación numérica          |
| `chmod 644 archivo`  | Permiso estándar para archivos de texto          |
| `sudo comando`       | Ejecuta un comando como administrador            |
| `id`                 | Muestra tu usuario, grupo y grupos adicionales   |
