# ============================================================
# TEMA 8: Proyecto integrador — Todo junto
# ============================================================
#
# OBJETIVO: Integrar todos los conceptos de Git y GitHub
# en un proyecto completo, desde cero.
#
# EXPLICACIÓN:
# Este tema no introduce nada nuevo. Es un ejercicio
# guiado paso a paso donde vas a aplicar todo lo que
# aprendiste en los temas anteriores:
#
# - Crear un repositorio (Tema 2)
# - El ciclo add/commit (Tema 3)
# - Historial y .gitignore (Tema 4)
# - Ramas y merge (Tema 5)
# - GitHub, push y README (Tema 6)
# - Issues y Pull Requests (Tema 7)
#
# Al final vas a tener un proyecto completo en GitHub
# con historial de commits, un issue cerrado y un
# Pull Request mergeado.
# ============================================================


## Descripción del proyecto

Vas a crear un mini-proyecto PHP llamado `proyecto-final` que tiene varios archivos simples. El foco no está en el código PHP (es muy básico) sino en usar Git y GitHub correctamente.

Al finalizar, tu repositorio en GitHub debería tener:
- 5 archivos: `inicio.php`, `funciones.php`, `utilidades.php`, `.gitignore`, `README.md`
- Un historial de commits descriptivos
- Un issue cerrado
- Un Pull Request mergeado


# ============================================================
# EJERCICIO GUIADO
# ============================================================


## PASO 1 — Crear el repositorio

Creá una carpeta nueva e inicializá un repositorio Git:

```bash
mkdir proyecto-final
cd proyecto-final
git init
```

Salida esperada:

```
Initialized empty Git repository in /home/usuario/proyecto-final/.git/
```

Verificá con `git status`:

```bash
git status
```

Salida esperada:

```
On branch main

No commits yet

nothing to commit (create/copy or use "git add" to track)
```


## PASO 2 — Crear el primer archivo y hacer commit

Creá un archivo `inicio.php` que imprima un mensaje de bienvenida:

```bash
echo '<?php
echo "Bienvenido al proyecto final\n";
echo "Este proyecto demuestra el uso de Git y GitHub\n";
?>' > inicio.php
```

Verificá que Git lo detecta:

```bash
git status
```

Salida esperada:

```
Untracked files:
  (use "git add <file>..." to include in what will be committed)
	inicio.php
```

Hacé add y commit con un mensaje descriptivo:

```bash
git add inicio.php
git commit -m "Agrega archivo inicio.php con mensaje de bienvenida"
```

Salida esperada:

```
[main (root-commit) a1b2c3d] Agrega archivo inicio.php con mensaje de bienvenida
 1 file changed, 4 insertions(+)
 create mode 100644 inicio.php
```


## PASO 3 — Crear el segundo archivo y hacer commit

Creá un archivo `funciones.php` con una función simple:

```bash
echo '<?php
function sumar($a, $b) {
    return $a + $b;
}

$resultado = sumar(5, 3);
echo "5 + 3 = $resultado\n";
?>' > funciones.php
```

```bash
git add funciones.php
git commit -m "Agrega funciones.php con función sumar"
```

Salida esperada:

```
[main b2c3d4e] Agrega funciones.php con función sumar
 1 file changed, 7 insertions(+)
 create mode 100644 funciones.php
```


## PASO 4 — Crear .gitignore y hacer commit

Creá un `.gitignore` para ignorar archivos que no queremos rastrear:

```bash
echo "*.log" > .gitignore
echo "*.tmp" >> .gitignore
echo ".DS_Store" >> .gitignore
```

```bash
git add .gitignore
git commit -m "Agrega .gitignore para ignorar archivos temporales"
```

Salida esperada:

```
[main c3d4e5f] Agrega .gitignore para ignorar archivos temporales
 1 file changed, 3 insertions(+)
 create mode 100644 .gitignore
```

Verificá el historial hasta ahora:

```bash
git log --oneline
```

Salida esperada:

```
c3d4e5f Agrega .gitignore para ignorar archivos temporales
b2c3d4e Agrega funciones.php con función sumar
a1b2c3d Agrega archivo inicio.php con mensaje de bienvenida
```

Deberías tener 3 commits con mensajes claros.


## PASO 5 — Crear repositorio en GitHub y subir

1. Entrá a GitHub y creá un repositorio nuevo llamado `proyecto-final`
   - No marques "Add a README" (lo vamos a crear nosotras)
   - No elijas .gitignore ni licencia
2. Copiá la URL del repositorio

Conectá y subí:

```bash
# Conectar con GitHub (reemplazá con tu URL)
git remote add origin https://github.com/tu-usuario/proyecto-final.git

# Subir todo
git push -u origin main
```

Salida esperada:

```
Enumerating objects: 9, done.
Counting objects: 100% (9/9), done.
Writing objects: 100% (9/9), 750 bytes | 750.00 KiB/s, done.
Total 9 (delta 1), reused 0 (delta 0)
To https://github.com/tu-usuario/proyecto-final.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

Entrá a tu repositorio en GitHub y verificá que aparecen los 3 archivos y los 3 commits.


## PASO 6 — Crear README.md y subirlo

```bash
echo "# Proyecto Final" > README.md
echo "" >> README.md
echo "Proyecto integrador del módulo de Git y GitHub." >> README.md
echo "" >> README.md
echo "## Archivos" >> README.md
echo "- inicio.php — Mensaje de bienvenida" >> README.md
echo "- funciones.php — Funciones matemáticas" >> README.md
echo "- .gitignore — Archivos a ignorar" >> README.md
```

```bash
git add README.md
git commit -m "Agrega README con descripción del proyecto"
git push
```

Salida esperada del push:

```
Enumerating objects: 4, done.
Counting objects: 100% (4/4), done.
Writing objects: 100% (4/4), 400 bytes | 400.00 KiB/s, done.
Total 3 (delta 1), reused 0 (delta 0)
To https://github.com/tu-usuario/proyecto-final.git
   c3d4e5f..d4e5f6g  main -> main
```

Entrá a GitHub y verificá que el README se muestra como portada del proyecto.


## PASO 7 — Crear un issue en GitHub

1. En tu repositorio en GitHub, andá a la pestaña **"Issues"**
2. Hacé clic en **"New issue"**
3. **Título:** `Agregar archivo de utilidades`
4. **Descripción:** `Crear un archivo utilidades.php con funciones de utilidad para el proyecto`
5. Hacé clic en **"Submit new issue"**

Se crea el issue #1. Anotá el número.


## PASO 8 — Crear una rama, hacer los cambios y subir

```bash
# Crear rama para resolver el issue
git checkout -b issue-1-utilidades
```

Salida esperada:

```
Switched to a new branch 'issue-1-utilidades'
```

Creá el archivo que pide el issue:

```bash
echo '<?php
function saludar($nombre) {
    echo "Hola, $nombre!\n";
}

function despedir($nombre) {
    echo "Chau, $nombre! Hasta la próxima.\n";
}

saludar("Sandra");
despedir("Sandra");
?>' > utilidades.php
```

```bash
git add utilidades.php
git commit -m "Agrega utilidades.php con funciones saludar y despedir (issue #1)"
```

Salida esperada:

```
[issue-1-utilidades e5f6g7h] Agrega utilidades.php con funciones saludar y despedir (issue #1)
 1 file changed, 11 insertions(+)
 create mode 100644 utilidades.php
```

Subí la rama a GitHub:

```bash
git push -u origin issue-1-utilidades
```

Salida esperada:

```
Enumerating objects: 4, done.
Counting objects: 100% (4/4), done.
Writing objects: 100% (4/4), 450 bytes | 450.00 KiB/s, done.
Total 3 (delta 1), reused 0 (delta 0)
remote:
remote: Create a pull request for 'issue-1-utilidades' on GitHub by visiting:
remote:      https://github.com/tu-usuario/proyecto-final/pull/new/issue-1-utilidades
remote:
To https://github.com/tu-usuario/proyecto-final.git
 * [new branch]      issue-1-utilidades -> issue-1-utilidades
```


## PASO 9 — Crear un Pull Request en GitHub

1. Entrá a tu repositorio en GitHub
2. Vas a ver un banner amarillo con el botón **"Compare & pull request"** — hacé clic
3. **Título:** `Agrega archivo de utilidades`
4. **Descripción:** `Resuelve #1`
5. Hacé clic en **"Create pull request"**

Revisá la pestaña **"Files changed"** para ver los cambios. Deberías ver el archivo `utilidades.php` completo en verde (todo es nuevo).


## PASO 10 — Hacer merge del PR

1. En la página del Pull Request, hacé clic en **"Merge pull request"**
2. Hacé clic en **"Confirm merge"**

Vas a ver el mensaje: "Pull request successfully merged and closed."

El issue #1 se cierra automáticamente (porque pusimos "Resuelve #1").


## PASO 11 — Sincronizar tu computadora

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
From https://github.com/tu-usuario/proyecto-final
   d4e5f6g..h8i9j0k  main       -> origin/main
Updating d4e5f6g..h8i9j0k
Fast-forward
 utilidades.php | 11 +++++++++++
 1 file changed, 11 insertions(+)
 create mode 100644 utilidades.php
```

```bash
# Eliminar la rama local (ya no la necesitás)
git branch -d issue-1-utilidades
```

Salida esperada:

```
Deleted branch issue-1-utilidades (was e5f6g7h).
```


## Verificación final

Ejecutá estos comandos para confirmar que todo quedó bien:

```bash
# Ver los archivos
ls
```

Salida esperada:

```
funciones.php  inicio.php  README.md  utilidades.php
```

(`.gitignore` no aparece con `ls` normal porque empieza con punto. Usá `ls -a` para verlo.)

```bash
# Ver el historial completo
git log --oneline
```

Salida esperada (algo similar a):

```
h8i9j0k Merge pull request #2 from tu-usuario/issue-1-utilidades
e5f6g7h Agrega utilidades.php con funciones saludar y despedir (issue #1)
d4e5f6g Agrega README con descripción del proyecto
c3d4e5f Agrega .gitignore para ignorar archivos temporales
b2c3d4e Agrega funciones.php con función sumar
a1b2c3d Agrega archivo inicio.php con mensaje de bienvenida
```

```bash
# Ver las ramas (solo debería quedar main)
git branch
```

Salida esperada:

```
* main
```

En GitHub verificá que:
- Aparecen los 5 archivos (inicio.php, funciones.php, utilidades.php, .gitignore, README.md)
- El README se muestra como portada
- El issue #1 está **cerrado**
- El Pull Request está **mergeado**
- El historial muestra todos los commits


# ============================================================
# ¡FELICITACIONES!
# ============================================================
#
# Si llegaste hasta acá, ya sabés:
#
# - Crear repositorios Git
# - Hacer commits con mensajes descriptivos
# - Ver el historial y las diferencias
# - Trabajar con ramas
# - Subir tu código a GitHub
# - Organizar tu trabajo con issues
# - Proponer cambios con Pull Requests
#
# Estos son los fundamentos que usan todos los equipos
# de desarrollo en el mundo. ¡Ya tenés la base!
# ============================================================
