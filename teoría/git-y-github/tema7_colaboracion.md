# ============================================================
# TEMA 7: Colaboración en GitHub — Issues y Pull Requests
# ============================================================
#
# OBJETIVO: Aprender a usar issues para organizar trabajo
# y pull requests para proponer cambios.
#
# EXPLICACIÓN:
# GitHub no es solo para guardar código — también tiene
# herramientas para organizar el trabajo, incluso si
# trabajás sola.
#
# Pensá en un proyecto como una lista de tareas. Los
# ISSUES son las tareas ("hay que agregar tal archivo",
# "hay que corregir tal error"). Los PULL REQUESTS son
# la forma de decir "terminé esta tarea, revisá los
# cambios antes de aceptarlos".
#
# Este flujo — crear issue, crear rama, hacer cambios,
# crear PR, revisar, aceptar — es el modo estándar de
# trabajo en equipos profesionales. Aprenderlo ahora te
# va a servir para siempre.
# ============================================================


## Issues — Tareas y pendientes

Un **issue** es como un ticket o tarea. Sirve para:
- Reportar un error ("el archivo X no funciona")
- Proponer una mejora ("agregar un archivo de despedida")
- Anotar algo pendiente ("falta agregar validación")

Cada issue tiene un número automático (#1, #2, #3...) que se usa para referenciarlo.

### Crear un issue (desde GitHub)

1. Entrá a tu repositorio en GitHub
2. Hacé clic en la pestaña **"Issues"**
3. Hacé clic en **"New issue"**
4. Poné un **título** claro: `Agregar archivo de despedida`
5. En la **descripción** explicá qué hay que hacer: `Crear un archivo chau.php que imprima un mensaje de despedida`
6. Hacé clic en **"Submit new issue"**

Se crea el issue #1. Fijate que GitHub le asigna el número automáticamente.


## Ramas para resolver issues

La buena práctica es crear una **rama específica** para cada issue. Esto mantiene los cambios organizados y separados del código principal.

Es una convención incluir el número del issue en el nombre de la rama:

```bash
# Crear una rama para resolver el issue #1
git checkout -b issue-1-agregar-despedida
```

Salida esperada:

```
Switched to a new branch 'issue-1-agregar-despedida'
```

Ahora hacemos los cambios que el issue pide:

```bash
# Crear el archivo que pide el issue
echo '<?php echo "Chau, hasta la próxima!"; ?>' > chau.php

# Agregar y commitear
# Mencionamos el issue en el commit con #1
git add chau.php
git commit -m "Agrega archivo de despedida (issue #1)"
```

Salida esperada:

```
[issue-1-agregar-despedida a1b2c3d] Agrega archivo de despedida (issue #1)
 1 file changed, 1 insertion(+)
 create mode 100644 chau.php
```

Ahora subimos la rama a GitHub:

```bash
# Subir la rama a GitHub (primera vez para esta rama)
git push -u origin issue-1-agregar-despedida
```

Salida esperada:

```
Enumerating objects: 4, done.
Counting objects: 100% (4/4), done.
Writing objects: 100% (4/4), 350 bytes | 350.00 KiB/s, done.
Total 3 (delta 1), reused 0 (delta 0)
remote:
remote: Create a pull request for 'issue-1-agregar-despedida' on GitHub by visiting:
remote:      https://github.com/tu-usuario/mi-proyecto/pull/new/issue-1-agregar-despedida
remote:
To https://github.com/tu-usuario/mi-proyecto.git
 * [new branch]      issue-1-agregar-despedida -> issue-1-agregar-despedida
```

Fijate que GitHub te muestra un link para crear un Pull Request directamente.


## Pull Requests — Proponer cambios para revisión

Un **Pull Request (PR)** es una solicitud para unir los cambios de una rama a `main`. En vez de hacer `git merge` directamente (como hicimos en el tema 5), creamos un PR para que los cambios se puedan **revisar** antes de aceptarlos.

### Crear un Pull Request (desde GitHub)

1. Después de hacer push de la rama, entrá a tu repositorio en GitHub
2. GitHub te va a mostrar un banner amarillo con el botón **"Compare & pull request"** — hacé clic ahí
   (Si no aparece, andá a la pestaña "Pull requests" → "New pull request" y elegí tu rama)
3. **Título:** `Agrega archivo de despedida`
4. **Descripción:** escribí `Resuelve #1`
   - Esto es importante: al escribir "Resuelve #1", GitHub vincula el PR con el issue #1 y lo cierra automáticamente cuando se acepte el PR
5. Hacé clic en **"Create pull request"**

### Revisar los cambios del PR

En la página del PR podés ver:
- **Conversation:** comentarios y discusión
- **Commits:** los commits incluidos
- **Files changed:** los archivos que se modificaron, con las líneas agregadas (verde) y eliminadas (rojo)

Revisá la pestaña **"Files changed"** para ver exactamente qué cambió.

### Aceptar (merge) el PR

Cuando estás conforme con los cambios:

1. En la página del PR, hacé clic en **"Merge pull request"**
2. Hacé clic en **"Confirm merge"**
3. GitHub hace el merge automáticamente
4. El issue #1 se cierra automáticamente (porque pusimos "Resuelve #1")

Vas a ver un mensaje: "Pull request successfully merged and closed."


## Sincronizar los cambios (git pull)

El merge se hizo en GitHub (en la nube), pero tu computadora todavía tiene la versión vieja de `main`. Necesitás traer los cambios:

```bash
# Volver a main
git checkout main
```

Salida esperada:

```
Switched to branch 'main'
```

```bash
# Traer los cambios de GitHub
git pull
```

Salida esperada:

```
remote: Enumerating objects: 1, done.
remote: Counting objects: 100% (1/1), done.
remote: Total 1 (delta 0), reused 0 (delta 0)
Unpacking objects: 100% (1/1), done.
From https://github.com/tu-usuario/mi-proyecto
   b2c3d4e..f5g6h7i  main       -> origin/main
Updating b2c3d4e..f5g6h7i
Fast-forward
 chau.php | 1 +
 1 file changed, 1 insertion(+)
 create mode 100644 chau.php
```

Ahora tu `main` local está actualizado con los cambios que se mergearon en GitHub.

```bash
# Verificar que el archivo está
ls
```

Salida esperada:

```
chau.php  funcionalidad.php  hola.php  README.md
```

```bash
# Podés eliminar la rama local (ya no la necesitás)
git branch -d issue-1-agregar-despedida
```


## Resumen del flujo completo

```
1. Crear ISSUE en GitHub       → "Qué hay que hacer"
            ↓
2. Crear RAMA local            → git checkout -b issue-1-nombre
            ↓
3. Hacer CAMBIOS y COMMIT      → git add + git commit
            ↓
4. SUBIR la rama               → git push -u origin nombre-rama
            ↓
5. Crear PULL REQUEST           → Desde GitHub, con "Resuelve #N"
            ↓
6. REVISAR y MERGE             → Desde GitHub, "Merge pull request"
            ↓
7. SINCRONIZAR                 → git checkout main + git pull
```

Este es el flujo que usan los equipos de desarrollo en todo el mundo.


## Resumen de comandos nuevos

| Comando | Qué hace |
|---|---|
| `git push -u origin nombre-rama` | Sube una rama nueva a GitHub |
| `git pull` | Trae los cambios de GitHub a tu computadora |
| `git checkout main` | Vuelve a la rama principal |


# ============================================================
# EJERCICIO
# ============================================================
#
# Usando tu repositorio "mi-proyecto" que ya está en GitHub:
#
# 1. Creá un issue en GitHub:
#    - Título: "Agregar archivo de utilidades"
#    - Descripción: "Crear un archivo utils.php con una
#      función que salude por nombre"
#
# 2. Creá una rama local para resolver el issue:
#    git checkout -b issue-1-utilidades
#    (usá el número que GitHub le asignó a tu issue)
#
# 3. Creá el archivo utils.php:
#    Contenido sugerido:
#      <?php
#      function saludar($nombre) {
#          echo "Hola, $nombre!\n";
#      }
#      saludar("Sandra");
#
# 4. Hacé add y commit:
#    git add utils.php
#    git commit -m "Agrega archivo de utilidades (issue #1)"
#
# 5. Subí la rama a GitHub:
#    git push -u origin issue-1-utilidades
#
# 6. En GitHub, creá un Pull Request:
#    - Título: "Agrega archivo de utilidades"
#    - Descripción: "Resuelve #1"
#
# 7. Revisá los cambios en la pestaña "Files changed"
#
# 8. Hacé clic en "Merge pull request" → "Confirm merge"
#
# 9. En tu terminal, volvé a main y traé los cambios:
#    git checkout main
#    git pull
#
# VERIFICACIÓN:
# Ejecutá estos comandos y compará con la salida esperada:
#
#   git log --oneline
#   → Deberías ver el commit del merge y el de utils.php
#
#   ls
#   → ... utils.php ...
#
#   En GitHub:
#   → El issue debería estar cerrado
#   → El PR debería estar mergeado
#
# ============================================================
