# ============================================================
# TEMA 5: Ramas — Trabajar en paralelo sin miedo
# ============================================================
#
# OBJETIVO: Entender que las ramas permiten experimentar
# sin afectar el código principal.
#
# EXPLICACIÓN:
# Imagina que tenés un cuaderno con tus apuntes de clase y
# querés probar a reorganizar un tema, pero no estás segura
# de que te va a quedar mejor. Lo que harías es fotocopiar
# las páginas, trabajar sobre la copia, y si te gusta el
# resultado, reemplazás las originales. Si no, tirás la
# copia y listo.
#
# En Git, una RAMA (branch) es exactamente esa fotocopia
# virtual. Creás una rama, experimentás libremente, y:
# - Si funciona → la unís (merge) al proyecto principal
# - Si no funciona → la borrás y no pasa nada
#
# La rama principal se llama "main". Todo lo que hagas en
# otra rama NO afecta a main hasta que vos decidas unirlo.
# ============================================================


## Conceptos clave

- **Rama (branch):** una línea de desarrollo independiente. Es como una copia virtual de tu proyecto donde podés hacer cambios sin miedo.
- **main:** la rama principal, donde está la versión "oficial" de tu código.
- **merge:** unir los cambios de una rama a otra (generalmente a main).
- **checkout:** cambiar de una rama a otra.


## Ver en qué rama estás

El comando `git branch` muestra todas las ramas que existen. La rama actual tiene un asterisco (`*`).

```bash
git branch
```

Salida esperada:

```
* main
```

Solo hay una rama (`main`) y estás en ella.


## Crear una rama nueva

Para crear una rama nueva y cambiarte a ella al mismo tiempo, usamos `git checkout -b`:

```bash
# Crear una rama nueva llamada "nueva-funcionalidad" y cambiarte a ella
git checkout -b nueva-funcionalidad
```

Salida esperada:

```
Switched to a new branch 'nueva-funcionalidad'
```

Ahora estás en la rama `nueva-funcionalidad`. Todo lo que hagas acá no afecta a `main`.

Podés verificar con `git branch`:

```bash
git branch
```

Salida esperada:

```
  main
* nueva-funcionalidad
```

El asterisco ahora está en `nueva-funcionalidad`.


## Hacer cambios en la rama

Vamos a crear un archivo nuevo y hacer un commit, todo dentro de la rama:

```bash
# Crear un archivo PHP simple
echo '<?php echo "Soy un archivo nuevo"; ?>' > funcionalidad.php

# Agregarlo y hacer commit
git add funcionalidad.php
git commit -m "Agrega archivo de nueva funcionalidad"
```

Salida esperada:

```
[nueva-funcionalidad f1a2b3c] Agrega archivo de nueva funcionalidad
 1 file changed, 1 insertion(+)
 create mode 100644 funcionalidad.php
```

Este commit solo existe en la rama `nueva-funcionalidad`. La rama `main` no sabe nada de este archivo.


## Volver a main y verificar

```bash
# Volver a la rama main
git checkout main
```

Salida esperada:

```
Switched to branch 'main'
```

```bash
# Verificar que el archivo NO existe en main
ls
```

Salida esperada:

```
hola.php
```

El archivo `funcionalidad.php` no aparece porque solo existe en la otra rama. Esto es lo poderoso de las ramas: cada una tiene su propia versión de los archivos.


## Unir los cambios (merge)

Cuando estás conforme con los cambios de una rama, los unís a `main` con `git merge`. Es importante estar en la rama que va a **recibir** los cambios (en este caso, `main`):

```bash
# Asegurarte de estar en main
git checkout main

# Unir los cambios de la rama
git merge nueva-funcionalidad
```

Salida esperada:

```
Updating b2c3d4e..e5f6g7h
Fast-forward
 funcionalidad.php | 1 +
 1 file changed, 1 insertion(+)
 create mode 100644 funcionalidad.php
```

```bash
# Verificar que ahora el archivo SÍ existe en main
ls
```

Salida esperada:

```
funcionalidad.php  hola.php
```

Ahora `main` tiene todos los cambios que hiciste en la rama.


## Eliminar la rama

Una vez que los cambios están en `main`, ya no necesitás la rama. Podés borrarla:

```bash
git branch -d nueva-funcionalidad
```

Salida esperada:

```
Deleted branch nueva-funcionalidad (was e5f6g7h).
```

```bash
# Verificar que solo queda main
git branch
```

Salida esperada:

```
* main
```


## Resumen del flujo con ramas

El flujo completo es:

```bash
# 1. Crear rama y cambiarte a ella
git checkout -b nombre-de-la-rama

# 2. Hacer tus cambios, add y commit
git add archivo.php
git commit -m "Descripción del cambio"

# 3. Volver a main
git checkout main

# 4. Unir los cambios
git merge nombre-de-la-rama

# 5. Eliminar la rama
git branch -d nombre-de-la-rama
```


## Nota sobre conflictos

A veces, al hacer merge, Git detecta que las mismas líneas de un archivo fueron modificadas en ambas ramas. Esto se llama un **conflicto** y Git te pide que lo resuelvas manualmente, eligiendo qué versión querés conservar.

Por ahora solo es importante saber que los conflictos existen. No vamos a profundizar en cómo resolverlos — es un tema más avanzado. Si te pasa, no te asustes: Git te indica exactamente qué archivo tiene el conflicto y te marca las líneas en cuestión.


# ============================================================
# EJERCICIO
# ============================================================
#
# Usando tu repositorio "mi-proyecto":
#
# 1. Verificá que estás en la rama main con: git branch
#
# 2. Creá una rama llamada "agregar-archivo":
#    git checkout -b agregar-archivo
#
# 3. Creá un archivo "nuevo.php" con un echo simple:
#    echo '<?php echo "Soy nuevo"; ?>' > nuevo.php
#
# 4. Hacé add y commit:
#    git add nuevo.php
#    git commit -m "Agrega archivo nuevo.php"
#
# 5. Volvé a main:
#    git checkout main
#
# 6. Verificá que nuevo.php NO existe:
#    ls
#
# 7. Hacé merge de la rama:
#    git merge agregar-archivo
#
# 8. Verificá que ahora nuevo.php SÍ existe:
#    ls
#
# 9. Eliminá la rama:
#    git branch -d agregar-archivo
#
# VERIFICACIÓN:
# Ejecutá estos comandos y compará con la salida esperada:
#
#   git branch
#   → * main
#
#   ls
#   → ... nuevo.php ...
#
#   git log --oneline
#   → Deberías ver el commit "Agrega archivo nuevo.php"
#
# ============================================================
