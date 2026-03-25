=========================================================
TEMA 4: Historial y navegación — log, diff, gitignore
=========================================================

OBJETIVO
--------
Ver el historial de cambios, comparar versiones y aprender a ignorar archivos que no queremos rastrear.

EXPLICACIÓN
-----------

### git log — Ver el historial de commits

Cada commit que hacemos queda guardado en el historial. Podemos verlo con `git log`. Cada commit tiene:

- Un **hash** (identificador único) — es un código largo como `b2c3d4e5f6a7b8c9...`
- El **autor** — quién hizo el cambio (el nombre y email que configuraste)
- La **fecha** — cuándo se hizo
- El **mensaje** — la descripción que escribiste

```bash
# Ver el historial completo
git log
```

Salida esperada:

```
commit b2c3d4e (HEAD -> main)
Author: Tu Nombre <tu@email.com>
Date:   Mon Mar 13 10:30:00 2026

    Agrega segunda línea con despedida

commit a1b2c3d
Author: Tu Nombre <tu@email.com>
Date:   Mon Mar 13 10:00:00 2026

    Agrega archivo hola.php con saludo inicial
```

Los commits se muestran del más reciente al más antiguo. La palabra `HEAD` indica en qué commit estás parado actualmente.

### git log --oneline — Formato compacto

Cuando el historial es largo, el formato completo puede ser difícil de leer. El formato compacto muestra una línea por commit:

```bash
# Ver el historial en formato compacto (una línea por commit)
git log --oneline
```

```
b2c3d4e Agrega segunda línea con despedida
a1b2c3d Agrega archivo hola.php con saludo inicial
```

Mucho más fácil de leer. Muestra solo los primeros 7 caracteres del hash y el mensaje.

### git diff — Ver qué cambió

Con `git diff` podemos ver exactamente qué cambió en los archivos **antes de hacer `git add`**. Es como comparar "antes" y "después".

```bash
# Modificar un archivo y ver los cambios ANTES de hacer add
echo '<?php echo "Hola mundo"; echo "Chau mundo"; echo "Versión 3"; ?>' > hola.php
git diff
```

```
diff --git a/hola.php b/hola.php
--- a/hola.php
+++ b/hola.php
-<?php echo "Hola mundo"; echo "Chau mundo"; ?>
+<?php echo "Hola mundo"; echo "Chau mundo"; echo "Versión 3"; ?>
```

- Las líneas con `-` (en rojo en la terminal) son lo que se **eliminó**
- Las líneas con `+` (en verde en la terminal) son lo que se **agregó**

Esto es muy útil para revisar tus cambios antes de hacer commit. Te ayuda a verificar que no metiste nada por error.

**Nota importante:** `git diff` solo muestra cambios de archivos que todavía NO fueron agregados con `git add`. Una vez que hacés `git add`, los cambios ya no aparecen en `git diff` (porque ya están en el área de preparación).

### .gitignore — Ignorar archivos

A veces hay archivos que no queremos que Git rastree:

- Archivos de log (`.log`) — se generan automáticamente y no son parte del código
- Archivos temporales (`.tmp`) — son basura
- `.DS_Store` — un archivo que macOS crea automáticamente en cada carpeta
- Carpetas como `vendor/` o `node_modules/` — se pueden regenerar
- Archivos con contraseñas o datos sensibles

Para decirle a Git qué ignorar, creamos un archivo llamado `.gitignore` en la raíz del proyecto:

```bash
# Crear un archivo .gitignore
echo "*.log" > .gitignore
echo "*.tmp" >> .gitignore
echo ".DS_Store" >> .gitignore
```

Ahora Git ignorará todos los archivos que terminen en `.log` o `.tmp`, y el archivo `.DS_Store`.

Podemos verificar que funciona:

```bash
# Crear un archivo .log para probar
echo "esto es un log" > debug.log

# Ver el estado — el archivo .log NO aparece
git status
```

```
On branch main
Changes not staged for commit:
	modified:   hola.php

Untracked files:
	.gitignore

```

Fijate que `debug.log` no aparece en la lista — Git lo está ignorando gracias al `.gitignore`.

El archivo `.gitignore` sí hay que commitearlo, porque es parte del proyecto:

```bash
git add .gitignore
git commit -m "Agrega .gitignore para ignorar archivos temporales"
```

### Patrones comunes en .gitignore

Algunos patrones útiles:

```
# Ignorar todos los archivos .log
*.log

# Ignorar todos los archivos .tmp
*.tmp

# Ignorar una carpeta completa
vendor/
node_modules/

# Ignorar un archivo específico
config_local.php

# Ignorar archivos de macOS
.DS_Store
```

Las líneas que empiezan con `#` son comentarios y Git las ignora.

EJERCICIO
---------

Usando el repositorio de los temas anteriores:

1. Agregar más cambios al archivo `hola.php` (por ejemplo, agregar una tercera línea) y hacer un tercer commit
2. Usar `git log --oneline` para ver los 3 commits en el historial
3. Modificar `hola.php` de nuevo y usar `git diff` para ver los cambios antes de commitear
4. Hacer add y commit de ese último cambio
5. Crear un archivo `.gitignore` que ignore archivos `*.log` y `*.tmp`
6. Hacer add y commit del `.gitignore`
7. Crear un archivo `prueba.log` y verificar con `git status` que Git lo ignora

**Verificación:** Al ejecutar `git log --oneline` deberías ver al menos 4 commits:

```bash
git log --oneline
```

```
f8g9h0i Agrega .gitignore para ignorar archivos temporales
e7f8g9h Agrega tercera versión del archivo
b2c3d4e Agrega segunda línea con despedida
a1b2c3d Agrega archivo hola.php con saludo inicial
```

Y al crear un archivo `.log`, no debería aparecer en `git status`:

```bash
echo "test" > prueba.log
git status
```

```
On branch main
nothing to commit, working tree clean
```
