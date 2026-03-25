# ============================================================
# TEMA 6: GitHub — Subir tu código a la nube
# ============================================================
#
# OBJETIVO: Aprender a crear un repositorio en GitHub y
# sincronizar el código local con el remoto.
#
# EXPLICACIÓN:
# Hasta ahora todo lo que hicimos fue local (en tu
# computadora). Si se rompe el disco, perdés todo. GitHub
# es un sitio web donde podés subir tus repositorios para:
#
# - RESPALDO: tu código está a salvo en la nube
# - COMPARTIR: otros pueden ver tu código
# - COLABORAR: trabajar en equipo sobre el mismo proyecto
#
# Pensá en GitHub como Google Drive pero específico para
# código. Tu carpeta local sigue existiendo y funcionando.
# GitHub es una copia online que se mantiene sincronizada
# con los comandos push (subir) y pull (bajar).
#
# Para conectar tu repositorio local con GitHub necesitás:
# 1. Crear un repositorio en GitHub (desde la web)
# 2. Configurar la autenticación (para que GitHub sepa
#    que sos vos)
# 3. Conectar y subir con git remote + git push
# ============================================================


## Crear una cuenta en GitHub

Si todavía no tenés cuenta:

1. Entrá a [github.com](https://github.com)
2. Hacé clic en "Sign up"
3. Seguí los pasos: elegí un nombre de usuario, email y contraseña
4. Verificá tu email


## Crear un repositorio en GitHub (desde la web)

1. Logueate en github.com
2. Hacé clic en el botón **"+"** (arriba a la derecha) y elegí **"New repository"**
3. Poné un nombre al repositorio (por ejemplo: `mi-proyecto`)
4. Dejá las opciones por defecto — **no marques "Add a README"** (lo vamos a crear nosotras)
5. Hacé clic en **"Create repository"**

GitHub te va a mostrar una página con instrucciones. Vamos a seguir las de "push an existing repository".


## Autenticación: cómo demostrarle a GitHub que sos vos

GitHub necesita verificar tu identidad cada vez que subís código. Hay dos métodos. Elegí el que te resulte más cómodo.

---

### Método 1: HTTPS con token personal

Este es el método más directo. GitHub ya no acepta contraseñas normales para HTTPS, así que necesitás generar un "token personal" que funciona como una contraseña especial.

**Paso a paso para crear el token:**

1. En GitHub, hacé clic en tu foto de perfil (arriba a la derecha)
2. Andá a **Settings** (Configuración)
3. En el menú de la izquierda, bajá hasta **Developer settings**
4. Hacé clic en **Personal access tokens** → **Tokens (classic)**
5. Hacé clic en **"Generate new token"** → **"Generate new token (classic)"**
6. Poné un nombre descriptivo (por ejemplo: "Mi computadora")
7. En **Expiration**, elegí la duración que quieras (90 días es lo común)
8. En **Select scopes**, marcá la casilla **"repo"** (esto da permiso para subir código)
9. Hacé clic en **"Generate token"**
10. **Copiá el token ahora** — solo se muestra una vez. Si lo perdés, tenés que crear uno nuevo.

**Cómo usarlo:**

Cuando hagas `git push` por primera vez, Git te va a pedir usuario y contraseña:
- **Username:** tu nombre de usuario de GitHub
- **Password:** pegá el token (no tu contraseña normal)

---

### Método 2: SSH con clave SSH

SSH usa un par de claves (una pública y una privada) para autenticarte automáticamente, sin tener que poner contraseña cada vez. Es un poco más de trabajo la primera vez, pero después es más cómodo.

**Paso 1 — Generar el par de claves:**

```bash
ssh-keygen -t ed25519 -C "tu@email.com"
```

Te va a preguntar dónde guardar la clave. Presioná **Enter** para aceptar la ubicación por defecto. Después te pide una contraseña (passphrase) — podés dejarla vacía presionando Enter.

Salida esperada:

```
Generating public/private ed25519 key pair.
Enter file in which to save the key (/home/usuario/.ssh/id_ed25519):
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /home/usuario/.ssh/id_ed25519
Your public key has been saved in /home/usuario/.ssh/id_ed25519.pub
```

**Paso 2 — Ver la clave pública (la que se sube a GitHub):**

```bash
cat ~/.ssh/id_ed25519.pub
```

Salida esperada (algo parecido a):

```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAI... tu@email.com
```

Copiá toda esa línea.

**Paso 3 — Agregar la clave en GitHub:**

1. En GitHub, andá a **Settings** → **SSH and GPG keys**
2. Hacé clic en **"New SSH key"**
3. Poné un título descriptivo (por ejemplo: "Mi computadora")
4. Pegá la clave pública que copiaste
5. Hacé clic en **"Add SSH key"**

**Paso 4 — Verificar que funciona:**

```bash
ssh -T git@github.com
```

Salida esperada:

```
Hi tu-usuario! You've successfully authenticated, but GitHub does not provide shell access.
```

Si ves ese mensaje, la autenticación SSH está funcionando.

**Diferencia al usar SSH:** cuando conectés el repositorio remoto, usás la URL que empieza con `git@github.com:` en vez de `https://`.

---


## Conectar el repositorio local con GitHub

Ahora que tenés la autenticación configurada, vamos a conectar tu repositorio local con el de GitHub. El comando `git remote add` le dice a Git la dirección del repositorio remoto:

```bash
# Si elegiste HTTPS:
git remote add origin https://github.com/tu-usuario/mi-proyecto.git

# Si elegiste SSH:
git remote add origin git@github.com:tu-usuario/mi-proyecto.git
```

- **origin** es el nombre que le damos al repositorio remoto (es una convención, siempre se usa "origin")
- La URL es la dirección de tu repositorio en GitHub

Podés verificar que se configuró bien:

```bash
git remote -v
```

Salida esperada:

```
origin  https://github.com/tu-usuario/mi-proyecto.git (fetch)
origin  https://github.com/tu-usuario/mi-proyecto.git (push)
```


## Subir el código (git push)

El primer push necesita la flag `-u` para establecer la conexión entre tu rama local y la remota:

```bash
# Primera vez: subir y establecer la conexión
git push -u origin main
```

Salida esperada:

```
Enumerating objects: 10, done.
Counting objects: 100% (10/10), done.
Writing objects: 100% (10/10), 800 bytes | 800.00 KiB/s, done.
Total 10 (delta 2), reused 0 (delta 0)
To https://github.com/tu-usuario/mi-proyecto.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

A partir de ahora, cada vez que hagas nuevos commits y quieras subirlos, solo necesitás:

```bash
# Subir commits posteriores (ya no necesitás -u origin main)
git push
```


## README.md — La portada de tu proyecto

El archivo `README.md` es especial: GitHub lo muestra automáticamente como la "portada" de tu repositorio. Se escribe en formato **Markdown** (texto con formato simple).

```bash
# Crear un README básico
echo "# Mi Proyecto" > README.md
echo "" >> README.md
echo "Este es mi primer proyecto con Git y GitHub." >> README.md
echo "" >> README.md
echo "## Archivos" >> README.md
echo "- hola.php — Archivo principal con saludo" >> README.md
```

```bash
# Agregar, commitear y subir
git add README.md
git commit -m "Agrega README con descripción del proyecto"
git push
```

Ahora si entrás a tu repositorio en GitHub, vas a ver el contenido del README.md renderizado como una página bonita.


## Resumen de comandos nuevos

| Comando | Qué hace |
|---|---|
| `git remote add origin URL` | Conecta tu repo local con GitHub |
| `git remote -v` | Muestra los remotos configurados |
| `git push -u origin main` | Sube por primera vez y establece la conexión |
| `git push` | Sube los commits nuevos |


# ============================================================
# EJERCICIO
# ============================================================
#
# 1. Creá una cuenta en GitHub (si todavía no tenés)
#
# 2. Creá un repositorio en GitHub llamado "mi-proyecto"
#    (sin README, sin .gitignore, sin licencia)
#
# 3. Configurá la autenticación — elegí UN método:
#
#    OPCIÓN A (HTTPS):
#    - Generá un token personal en GitHub
#      (Settings → Developer settings → Personal access tokens)
#    - Marcá el permiso "repo"
#    - Copiá y guardá el token
#
#    OPCIÓN B (SSH):
#    - Generá las claves: ssh-keygen -t ed25519 -C "tu@email.com"
#    - Copiá la clave pública: cat ~/.ssh/id_ed25519.pub
#    - Agregala en GitHub: Settings → SSH and GPG keys
#    - Verificá: ssh -T git@github.com
#
# 4. Conectá tu repositorio local con GitHub:
#    git remote add origin URL-DE-TU-REPO
#
# 5. Subí todos los commits:
#    git push -u origin main
#
# 6. Creá un README.md con el nombre y una descripción
#    del proyecto, hacé add, commit y push:
#    git add README.md
#    git commit -m "Agrega README con descripción del proyecto"
#    git push
#
# 7. Entrá a tu repositorio en GitHub y verificá que:
#    - Aparecen todos los archivos
#    - Se ve el historial de commits
#    - El README.md se muestra como portada
#
# VERIFICACIÓN:
# Ejecutá estos comandos y compará con la salida esperada:
#
#   git remote -v
#   → origin  https://github.com/tu-usuario/mi-proyecto.git (fetch)
#   → origin  https://github.com/tu-usuario/mi-proyecto.git (push)
#
#   git log --oneline
#   → Deberías ver todos tus commits, incluyendo el del README
#
# ============================================================
