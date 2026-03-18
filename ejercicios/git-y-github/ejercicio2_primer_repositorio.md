# Ejercicio 2: Tu primer repositorio — git init y git status

## Objetivo

Crear una carpeta de proyecto, convertirla en un repositorio Git, crear un archivo PHP y ver su estado con `git status`.

---

## Instrucciones

### Paso 1: Crear la carpeta del proyecto

Abrí la terminal y ejecutá:

```bash
mkdir mi-proyecto
```

### Paso 2: Entrar a la carpeta

```bash
cd mi-proyecto
```

### Paso 3: Inicializar el repositorio Git

Este comando convierte la carpeta en un repositorio Git:

```bash
git init
```

Debería aparecer un mensaje como:

```
Initialized empty Git repository in /home/usuario/mi-proyecto/.git/
```

### Paso 4: Crear el archivo hola.php

Creá un archivo llamado `hola.php` con el siguiente contenido. Podés usar cualquier editor de texto o ejecutar este comando:

```bash
echo '<?php echo "Hola mundo"; ?>' > hola.php
```

### Paso 5: Verificar el estado del repositorio

```bash
git status
```

Git debería mostrar que `hola.php` es un archivo sin rastrear (untracked).

---

## Verificación

Ejecutá este comando y compará con la salida esperada:

**Comando:**

```bash
git status
```

**Salida esperada:**

```
On branch main

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	hola.php

nothing added to commit but untracked files present (use "git add" to track)
```

Lo importante es que `hola.php` aparezca en la sección "Untracked files". Eso significa que Git lo ve pero todavía no lo está rastreando.
