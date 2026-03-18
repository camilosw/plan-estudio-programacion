=========================================================
TEMA 2: Tu primer repositorio — git init y git status
=========================================================

OBJETIVO
--------
Crear un repositorio Git y entender qué es la carpeta `.git` y el comando `git status`.

EXPLICACIÓN
-----------

### ¿Qué es un repositorio?

Un repositorio (o "repo") es una carpeta cuyo historial de cambios Git rastrea. Cualquier carpeta puede convertirse en un repositorio.

Pensalo como una carpeta normal, pero con superpoderes: Git recuerda cada cambio que hacés en los archivos que están adentro.

### git init — Inicializar un repositorio

Para convertir cualquier carpeta en un repositorio, usamos `git init`. Este comando crea una carpeta oculta llamada `.git` dentro de tu proyecto.

```bash
# Crear una carpeta para el proyecto
mkdir mi-proyecto
cd mi-proyecto

# Inicializar un repositorio Git
git init
```

Salida esperada:

```
Initialized empty Git repository in /home/usuario/mi-proyecto/.git/
```

### La carpeta .git

Cuando ejecutás `git init`, Git crea una carpeta oculta llamada `.git`. Esta carpeta contiene todo el historial y la configuración del repositorio. Es importante saber dos cosas:

- **No hay que tocarla ni borrarla** — si la borrás, perdés todo el historial
- **Es oculta** — no la ves con `ls` normal, pero sí con `ls -a` (que muestra archivos ocultos)

```bash
# Ver archivos ocultos (la carpeta .git aparece)
ls -a
```

```
.  ..  .git
```

### git status — Ver el estado del repositorio

El comando más importante del día a día es `git status`. Muestra el estado actual de tu repositorio: qué archivos cambiaron, cuáles están preparados para guardar, etc.

Primero, creemos un archivo PHP simple para tener algo que rastrear:

```bash
# Crear un archivo PHP simple
echo '<?php echo "Hola mundo"; ?>' > hola.php

# Ver el estado del repositorio
git status
```

Salida esperada:

```
On branch main

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	hola.php

nothing added to commit but untracked files present (use "git add" to track)
```

### ¿Qué significa "Untracked files"?

Cuando Git dice que un archivo es "untracked" (sin rastrear), significa que Git lo ve en la carpeta pero todavía no lo está siguiendo. Es como si Git dijera: "Sé que este archivo existe, pero no me pediste que lo cuide".

Para que Git empiece a rastrear un archivo, hay que agregarlo explícitamente con `git add` — eso lo veremos en el próximo tema.

### Agregar más archivos

Si creamos más archivos, todos aparecen como "untracked":

```bash
# Crear otro archivo
echo '<?php echo "Chau mundo"; ?>' > chau.php

# Ver el estado
git status
```

```
On branch main

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	chau.php
	hola.php

nothing added to commit but untracked files present (use "git add" to track)
```

Git lista todos los archivos nuevos que todavía no está rastreando.

EJERCICIO
---------

1. Crear una carpeta llamada `mi-proyecto`
2. Entrar a la carpeta con `cd mi-proyecto`
3. Inicializar un repositorio Git con `git init`
4. Verificar que la carpeta `.git` se creó usando `ls -a`
5. Crear un archivo `hola.php` que imprima "Hola mundo"
6. Ejecutar `git status` para ver que aparece como archivo sin rastrear

**Verificación:** Al ejecutar `git status` deberías ver algo como:

```bash
git status
```

```
On branch main

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	hola.php

nothing added to commit but untracked files present (use "git add" to track)
```
