# Plan de Estudios: Git y GitHub

## Contexto

Aprender a usar Git para controlar versiones del código y GitHub para respaldarlo y colaborar. El plan va de lo más básico (qué es Git, instalación) hasta colaborar con Pull Requests en GitHub. Los ejercicios usan código PHP muy simple para que el foco esté en aprender Git, no en la lógica del código.

---

## Estructura del plan

Cada tema sigue el formato:

1. **Explicación** breve del concepto
2. **Ejemplo** con comandos de terminal y su salida esperada
3. **Ejercicio práctico** para que la alumna resuelva

---

## Tema 1: ¿Qué es Git? — Control de versiones

**Objetivo:** Entender qué es el control de versiones, por qué es útil y dejar Git configurado.

**Explicación:** Imagina que estás escribiendo un informe y guardas archivos como "informe_v1.docx", "informe_v2_final.docx", "informe_v2_final_FINAL.docx". Git resuelve este caos: guarda el historial de cambios automáticamente, con un mensaje que describe cada cambio. Así siempre podés volver a cualquier versión anterior.

Git es una herramienta que se instala en tu computadora (funciona **localmente**). GitHub es un sitio web donde podés subir tu código para respaldarlo y compartirlo — lo veremos más adelante.

**Ejemplo:**

```bash
# Verificar que Git está instalado
git --version
```

```
git version 2.43.0
```

```bash
# Configurar tu nombre (aparecerá en cada cambio que guardes)
git config --global user.name "Tu Nombre"

# Configurar tu email
git config --global user.email "tu@email.com"

# Verificar la configuración
git config --list
```

```
user.name=Tu Nombre
user.email=tu@email.com
```

**Ejercicio:**
Instalar Git en tu computadora, configurar tu nombre y email, y verificar con `git config --list` que la configuración quedó guardada.

---

## Tema 2: Tu primer repositorio — git init y git status

**Objetivo:** Crear un repositorio Git y entender qué es la carpeta `.git` y el comando `git status`.

**Explicación:** Un repositorio (o "repo") es una carpeta cuyo historial de cambios Git rastrea. Para convertir cualquier carpeta en un repositorio, usamos `git init`. Esto crea una carpeta oculta llamada `.git` donde Git guarda todo el historial — no hay que tocarla ni borrarla.

El comando más importante es `git status`: muestra el estado actual de tu repositorio. Al principio, los archivos aparecen como "untracked" (sin rastrear) — Git los ve pero todavía no los está siguiendo.

**Ejemplo:**

```bash
# Crear una carpeta para el proyecto
mkdir mi-proyecto
cd mi-proyecto

# Inicializar un repositorio Git
git init
```

```
Initialized empty Git repository in /home/usuario/mi-proyecto/.git/
```

```bash
# Crear un archivo PHP simple
echo '<?php echo "Hola mundo"; ?>' > hola.php

# Ver el estado del repositorio
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

Git nos dice que `hola.php` existe pero no está siendo rastreado todavía.

**Ejercicio:**
Crear una carpeta llamada `mi-proyecto`, inicializar un repositorio Git dentro, crear un archivo `hola.php` que imprima "Hola mundo", y ejecutar `git status` para ver que aparece como archivo sin rastrear.

---

## Tema 3: El ciclo básico — add, commit, status

**Objetivo:** Aprender el flujo fundamental de Git: modificar archivos, prepararlos y guardar un punto en el historial.

**Explicación:** Git tiene tres estados para los archivos:

1. **Directorio de trabajo** — donde editás tus archivos normalmente
2. **Área de preparación** (staging area) — donde ponés los archivos que querés incluir en el próximo guardado
3. **Repositorio** (historial) — donde quedan guardados permanentemente

Pensalo como preparar un paquete para enviar: tenés cosas en la mesa (directorio de trabajo), las ponés en la caja (área de preparación con `git add`), y sellás y etiquetás la caja (guardás en el historial con `git commit`).

**Ejemplo:**

```bash
# 1. Agregar el archivo al área de preparación
git add hola.php

# 2. Ver el estado — ahora el archivo está "preparado"
git status
```

```
On branch main

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
	new file:   hola.php
```

```bash
# 3. Guardar en el historial con un mensaje descriptivo
git commit -m "Agrega archivo hola.php con saludo inicial"
```

```
[main (root-commit) a1b2c3d] Agrega archivo hola.php con saludo inicial
 1 file changed, 1 insertion(+)
 create mode 100644 hola.php
```

```bash
# 4. Ver el estado — ahora todo está limpio
git status
```

```
On branch main
nothing to commit, working tree clean
```

**Nota sobre mensajes de commit:** Un buen mensaje es breve y describe **qué** se hizo. Usá verbos en imperativo: "Agrega...", "Corrige...", "Elimina...". Evitá mensajes vagos como "cambios" o "actualización".

**Nota sobre `git add .`:** El punto (`.`) agrega **todos** los archivos modificados de una vez. Es práctico pero hay que tener cuidado de no incluir archivos que no querés (como archivos temporales). Más adelante veremos cómo evitar eso con `.gitignore`.

**Ejercicio:**
Usando el repositorio del tema anterior: hacer `git add` y `git commit` del archivo `hola.php`. Luego modificar el archivo (agregar una segunda línea que imprima "Chau mundo"), revisar con `git status`, hacer add y commit de nuevo. Al terminar, deberías tener 2 commits en el historial.

---

## Tema 4: Historial y navegación — log, diff, gitignore

**Objetivo:** Ver el historial de cambios, comparar versiones y aprender a ignorar archivos que no queremos rastrear.

**Explicación:** Cada commit que hacemos queda guardado en el historial. Podemos verlo con `git log`. Cada commit tiene un identificador único (un código largo llamado "hash"), el autor, la fecha y el mensaje.

Con `git diff` podemos ver exactamente qué cambió en los archivos antes de hacer `git add` — es como comparar "antes" y "después".

A veces hay archivos que no queremos que Git rastree: archivos temporales, configuraciones locales, etc. Para eso creamos un archivo `.gitignore` que le dice a Git qué ignorar.

**Ejemplo:**

```bash
# Ver el historial completo
git log
```

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

```bash
# Ver el historial en formato compacto (una línea por commit)
git log --oneline
```

```
b2c3d4e Agrega segunda línea con despedida
a1b2c3d Agrega archivo hola.php con saludo inicial
```

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

Las líneas con `-` son lo que se eliminó, las líneas con `+` son lo que se agregó.

```bash
# Crear un archivo .gitignore para ignorar archivos innecesarios
echo "*.log" > .gitignore
echo ".DS_Store" >> .gitignore
```

Ahora Git ignorará todos los archivos `.log` y el archivo `.DS_Store` (que macOS crea automáticamente).

**Ejercicio:**
Agregar más cambios al archivo PHP y hacer un tercer commit. Usar `git log --oneline` para ver los 3 commits. Modificar el archivo de nuevo y usar `git diff` para ver los cambios antes de commitear. Crear un archivo `.gitignore` que ignore archivos `*.log` y `*.tmp`, hacer add y commit del `.gitignore`.

---

## Tema 5: Ramas — Trabajar en paralelo sin miedo

**Objetivo:** Entender que las ramas permiten experimentar sin afectar el código principal.

**Explicación:** Imagina que querés probar algo nuevo en tu código pero no estás segura de que va a funcionar. Sin Git, harías una copia de toda la carpeta "por las dudas". Con Git, creás una **rama** (branch): es como hacer una copia virtual del proyecto donde podés experimentar libremente. Si funciona, la unís (merge) al proyecto principal. Si no, la borrás y no pasa nada.

La rama principal se llama `main`. Cuando creás una nueva rama, los cambios que hagas ahí no afectan a `main` hasta que decidas unirlos.

**Ejemplo:**

```bash
# Ver en qué rama estás
git branch
```

```
* main
```

```bash
# Crear una rama nueva y cambiarte a ella
git checkout -b nueva-funcionalidad
```

```
Switched to a new branch 'nueva-funcionalidad'
```

```bash
# Crear un archivo nuevo en esta rama
echo '<?php echo "Soy un archivo nuevo"; ?>' > funcionalidad.php
git add funcionalidad.php
git commit -m "Agrega archivo de nueva funcionalidad"
```

```bash
# Volver a la rama main
git checkout main

# Verificar que el archivo NO existe en main
ls
```

```
hola.php
```

El archivo `funcionalidad.php` solo existe en la rama `nueva-funcionalidad`. En `main` no aparece.

```bash
# Unir los cambios de la rama a main
git merge nueva-funcionalidad
```

```
Updating b2c3d4e..e5f6g7h
Fast-forward
 funcionalidad.php | 1 +
 1 file changed, 1 insertion(+)
 create mode 100644 funcionalidad.php
```

```bash
# Ahora el archivo SÍ existe en main
ls
```

```
funcionalidad.php  hola.php
```

```bash
# Eliminar la rama (ya no la necesitamos)
git branch -d nueva-funcionalidad
```

```
Deleted branch nueva-funcionalidad (was e5f6g7h).
```

**Nota sobre conflictos:** A veces, al hacer merge, Git detecta que las mismas líneas fueron modificadas en ambas ramas. Esto se llama "conflicto" y Git te pide que lo resuelvas manualmente. Por ahora solo es importante saber que existen — no vamos a profundizar en esto.

**Ejercicio:**
Crear una rama llamada `agregar-archivo`, cambiarte a ella, crear un archivo `nuevo.php` con un echo simple, hacer commit. Volver a `main` y verificar que `nuevo.php` no existe. Hacer merge de la rama. Verificar que ahora sí existe. Eliminar la rama.

---

## Tema 6: GitHub — Subir tu código a la nube

**Objetivo:** Aprender a crear un repositorio en GitHub y sincronizar el código local con el remoto.

**Explicación:** Hasta ahora todo lo que hicimos fue local (en tu computadora). GitHub es un sitio web donde podés subir tus repositorios para:

- **Respaldo**: si se rompe tu computadora, tu código está a salvo
- **Compartir**: otros pueden ver tu código
- **Colaborar**: trabajar en equipo sobre el mismo proyecto

Para conectar tu repositorio local con GitHub, necesitás dos cosas: crear un repositorio en GitHub y configurar la autenticación.

**Crear un repositorio en GitHub:**

1. Entrá a github.com y logueate
2. Hacé clic en el botón "+" (arriba a la derecha) → "New repository"
3. Elegí un nombre (ej: `mi-proyecto`)
4. Dejá las opciones por defecto (no marques "Add a README")
5. Hacé clic en "Create repository"

**Autenticación — Método 1: HTTPS con token personal**

GitHub ya no acepta contraseñas para HTTPS. Necesitás un token personal:

1. En GitHub: Settings → Developer settings → Personal access tokens → Tokens (classic)
2. "Generate new token" → seleccioná el permiso "repo" → "Generate token"
3. Copiá el token (solo se muestra una vez)
4. Cuando Git te pida la contraseña al hacer push, usá el token en lugar de tu contraseña

**Autenticación — Método 2: SSH con clave SSH**

SSH usa un par de claves (pública y privada) para autenticarte sin contraseña:

```bash
# 1. Generar el par de claves
ssh-keygen -t ed25519 -C "tu@email.com"
# Presioná Enter para aceptar la ubicación por defecto
# Podés dejar la contraseña vacía o poner una

# 2. Ver la clave pública (la que se sube a GitHub)
cat ~/.ssh/id_ed25519.pub
```

3. Copiá la clave pública
4. En GitHub: Settings → SSH and GPG keys → "New SSH key"
5. Pegá la clave y guardá

```bash
# 3. Verificar que funciona
ssh -T git@github.com
```

```
Hi tu-usuario! You've successfully authenticated, but GitHub does not provide shell access.
```

Con SSH, usás la URL que empieza con `git@github.com:` en vez de `https://`.

**Ejemplo (subir código):**

```bash
# Conectar el repositorio local con GitHub (usando HTTPS)
git remote add origin https://github.com/tu-usuario/mi-proyecto.git

# O con SSH:
# git remote add origin git@github.com:tu-usuario/mi-proyecto.git

# Subir todos los commits al repositorio remoto (primera vez)
git push -u origin main
```

```
Enumerating objects: 10, done.
Counting objects: 100% (10/10), done.
Writing objects: 100% (10/10), 800 bytes | 800.00 KiB/s, done.
Total 10 (delta 2), reused 0 (delta 0)
To https://github.com/tu-usuario/mi-proyecto.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

```bash
# Para subir commits posteriores, solo hace falta:
git push
```

**Nota sobre README.md:** Es un archivo especial que GitHub muestra como la "portada" de tu proyecto. Se escribe en formato Markdown.

```bash
# Crear un README
echo "# Mi Proyecto" > README.md
echo "Este es mi primer proyecto con Git." >> README.md
git add README.md
git commit -m "Agrega README con descripción del proyecto"
git push
```

**Ejercicio:**
Crear una cuenta en GitHub (si no tenés). Crear un repositorio en GitHub llamado `mi-proyecto`. Configurar la autenticación (elegí el método que prefieras: HTTPS o SSH). Conectar tu repositorio local y subir todos los commits. Crear un `README.md`, commitearlo y subirlo. Verificar en GitHub que aparecen los archivos y el historial.

---

## Tema 7: Colaboración en GitHub — Issues y Pull Requests

**Objetivo:** Aprender a usar issues para organizar trabajo y pull requests para proponer cambios.

**Explicación:** GitHub no es solo para guardar código — también tiene herramientas para organizar el trabajo:

- **Issues**: son como "tareas" o "tickets". Sirven para reportar errores, proponer mejoras o anotar cosas pendientes. Cada issue tiene un número (ej: #1, #2).
- **Pull Requests (PRs)**: son la forma de proponer cambios. En vez de hacer merge directamente, creás un PR para que los cambios se puedan revisar antes de aceptarlos. Es el flujo estándar en equipos.

El flujo típico es:
1. Crear un issue describiendo qué hay que hacer
2. Crear una rama para trabajar en eso
3. Hacer los cambios y subirlos
4. Crear un Pull Request que conecta la rama con main
5. Revisar y aceptar el PR (esto hace el merge automáticamente)

**Ejemplo:**

**Paso 1 — Crear un issue en GitHub:**
1. En tu repositorio en GitHub, hacé clic en la pestaña "Issues"
2. "New issue"
3. Título: "Agregar archivo de despedida"
4. Descripción: "Crear un archivo chau.php que imprima un mensaje de despedida"
5. "Submit new issue" — se crea el issue #1

**Paso 2 — Crear una rama y hacer los cambios:**

```bash
# Crear una rama (es buena práctica incluir el número del issue)
git checkout -b issue-1-agregar-despedida

# Hacer el cambio
echo '<?php echo "Chau, hasta la próxima!"; ?>' > chau.php
git add chau.php
git commit -m "Agrega archivo de despedida (issue #1)"

# Subir la rama a GitHub
git push -u origin issue-1-agregar-despedida
```

**Paso 3 — Crear un Pull Request en GitHub:**
1. Al hacer push de la rama, GitHub muestra un botón "Compare & pull request"
2. Título: "Agrega archivo de despedida"
3. Descripción: "Resuelve #1" (esto vincula el PR con el issue)
4. "Create pull request"

**Paso 4 — Revisar y aceptar el PR:**
1. En la pestaña del PR podés ver los cambios (pestaña "Files changed")
2. Si todo está bien, hacé clic en "Merge pull request" → "Confirm merge"
3. El issue #1 se cierra automáticamente (por el "Resuelve #1" en la descripción)

```bash
# Volver a main y traer los cambios
git checkout main
git pull
```

**Ejercicio:**
Crear un issue en tu repositorio de GitHub. Crear una rama local para resolverlo, hacer los cambios y commitear. Subir la rama con `git push`. Crear un Pull Request en GitHub que mencione el issue. Hacer merge del PR desde GitHub. Volver a main en tu computadora y hacer `git pull` para traer los cambios.

---

## Tema 8: Proyecto integrador — Todo junto

**Objetivo:** Integrar todos los conceptos de Git y GitHub en un proyecto completo.

**Ejercicio final:**
Crear un proyecto desde cero aplicando todo lo aprendido:

1. Crear una carpeta `proyecto-final` e inicializar un repositorio Git
2. Crear un archivo `inicio.php` que imprima "Bienvenido al proyecto", hacer commit
3. Crear un archivo `funciones.php` con una función simple, hacer commit
4. Crear un `.gitignore` que ignore archivos `*.log` y `*.tmp`, hacer commit
5. Crear un repositorio en GitHub y subir todo
6. Crear un `README.md` con el nombre y descripción del proyecto, commitear y pushear
7. Crear un issue en GitHub: "Agregar archivo de utilidades"
8. Crear una rama `issue-1-utilidades`, agregar un archivo `utilidades.php`, commitear y pushear la rama
9. Crear un Pull Request en GitHub que resuelva el issue
10. Hacer merge del PR en GitHub
11. Volver a main y hacer `git pull`

Al finalizar, el repositorio en GitHub debería tener:
- 4+ archivos (inicio.php, funciones.php, utilidades.php, .gitignore, README.md)
- Un historial de commits descriptivos
- Un issue cerrado
- Un Pull Request mergeado

---

## Resumen de progresión

| Tema | Concepto clave   | Lo que aprende                                    |
| ---- | ---------------- | ------------------------------------------------- |
| 1    | ¿Qué es Git?    | Instalación, configuración, concepto de versiones |
| 2    | Primer repo      | `git init`, `git status`, carpeta `.git`          |
| 3    | Ciclo básico     | `git add`, `git commit`, los tres estados         |
| 4    | Historial        | `git log`, `git diff`, `.gitignore`               |
| 5    | Ramas            | `git branch`, `git checkout`, `git merge`         |
| 6    | GitHub           | Cuenta, `git remote`, `git push`, README          |
| 7    | Colaboración     | Issues, Pull Requests, flujo de revisión          |
| 8    | Integración      | Proyecto completo combinando todo                 |

---

## Archivos a crear

Se creará un archivo Markdown por cada tema dentro de la carpeta del proyecto:

- `tema1_que_es_git.md`
- `tema2_primer_repositorio.md`
- `tema3_ciclo_basico.md`
- `tema4_historial.md`
- `tema5_ramas.md`
- `tema6_github.md`
- `tema7_colaboracion.md`
- `tema8_proyecto_integrador.md`

Cada archivo contendrá la explicación, los comandos de ejemplo con su salida esperada y el ejercicio al final.

## Verificación

- Cada ejercicio incluye una sección de verificación con comandos (`git status`, `git log --oneline`, `git branch`) y la salida esperada
- La alumna puede confirmar que va bien comparando su terminal con la salida esperada
