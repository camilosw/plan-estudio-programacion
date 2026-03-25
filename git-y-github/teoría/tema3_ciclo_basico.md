=========================================================
TEMA 3: El ciclo básico — add, commit, status
=========================================================

OBJETIVO
--------
Aprender el flujo fundamental de Git: modificar archivos, prepararlos y guardar un punto en el historial.

EXPLICACIÓN
-----------

### Los tres estados de Git

Git tiene tres estados para los archivos:

1. **Directorio de trabajo** (working directory) — donde editás tus archivos normalmente
2. **Área de preparación** (staging area) — donde ponés los archivos que querés incluir en el próximo guardado
3. **Repositorio** (historial) — donde quedan guardados permanentemente

### La analogía del paquete

Pensalo como preparar un paquete para enviar:

- Tenés cosas en la mesa (directorio de trabajo) — son tus archivos modificados
- Las ponés en la caja (área de preparación con `git add`) — elegís qué cambios querés guardar
- Sellás y etiquetás la caja (guardás en el historial con `git commit`) — esos cambios quedan registrados para siempre

Este ciclo se repite una y otra vez: editar archivos, hacer `git add`, hacer `git commit`.

### git add — Preparar archivos

El comando `git add` mueve archivos del directorio de trabajo al área de preparación. Le estás diciendo a Git: "Quiero incluir estos cambios en el próximo commit".

```bash
# 1. Agregar el archivo al área de preparación
git add hola.php

# 2. Ver el estado — ahora el archivo está "preparado"
git status
```

Salida esperada:

```
On branch main

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
	new file:   hola.php
```

Fijate que ahora dice "Changes to be committed" en vez de "Untracked files". El archivo pasó al área de preparación y está listo para ser guardado.

### git commit — Guardar en el historial

El comando `git commit` toma todo lo que está en el área de preparación y lo guarda permanentemente en el historial. Siempre lleva un mensaje que describe qué se hizo:

```bash
# 3. Guardar en el historial con un mensaje descriptivo
git commit -m "Agrega archivo hola.php con saludo inicial"
```

Salida esperada:

```
[main (root-commit) a1b2c3d] Agrega archivo hola.php con saludo inicial
 1 file changed, 1 insertion(+)
 create mode 100644 hola.php
```

El código `a1b2c3d` es un identificador único de este commit (veremos más sobre esto en el próximo tema).

```bash
# 4. Ver el estado — ahora todo está limpio
git status
```

```
On branch main
nothing to commit, working tree clean
```

"Working tree clean" significa que no hay cambios pendientes — todo está guardado.

### Hacer un segundo commit

Ahora modifiquemos el archivo y hagamos un segundo commit para practicar el ciclo completo:

```bash
# Modificar el archivo (agregar una segunda línea)
echo '<?php echo "Hola mundo"; echo "Chau mundo"; ?>' > hola.php

# Ver qué cambió
git status
```

```
On branch main
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   hola.php

no changes added to commit (use "git add" to track)
```

Git detectó que el archivo fue modificado. Ahora hay que repetir el ciclo: add y commit.

```bash
# Preparar y guardar
git add hola.php
git commit -m "Agrega segunda línea con despedida"
```

```
[main b2c3d4e] Agrega segunda línea con despedida
 1 file changed, 1 insertion(+), 1 deletion(-)
```

### Buenos mensajes de commit

Un buen mensaje de commit es breve y describe **qué** se hizo. La convención es usar verbos en imperativo:

- "Agrega archivo de configuración" (bien)
- "Corrige error en el cálculo de precios" (bien)
- "Elimina código duplicado en funciones.php" (bien)
- "cambios" (mal — no dice nada)
- "actualización" (mal — es muy vago)
- "asdfgh" (muy mal)

### git add . — Agregar todo de una vez

El punto (`.`) agrega **todos** los archivos modificados y nuevos de una vez:

```bash
# Agregar TODOS los archivos modificados
git add .
```

Es práctico cuando tenés muchos archivos, pero hay que tener cuidado de no incluir archivos que no querés (como archivos temporales, contraseñas, etc.). Más adelante veremos cómo evitar eso con `.gitignore`.

EJERCICIO
---------

Usando el repositorio del tema anterior (`mi-proyecto`):

1. Hacer `git add hola.php` para agregar el archivo al área de preparación
2. Hacer `git commit -m "Agrega archivo hola.php con saludo inicial"` para guardarlo en el historial
3. Verificar con `git status` que todo está limpio
4. Modificar `hola.php`: agregar una segunda línea que imprima "Chau mundo"
5. Revisar con `git status` que Git detectó el cambio
6. Hacer `git add hola.php` y `git commit -m "Agrega segunda línea con despedida"`
7. Verificar con `git status` que todo vuelve a estar limpio

**Verificación:** Al terminar, deberías tener 2 commits en el historial. Podés verificar con:

```bash
git log --oneline
```

```
b2c3d4e Agrega segunda línea con despedida
a1b2c3d Agrega archivo hola.php con saludo inicial
```
