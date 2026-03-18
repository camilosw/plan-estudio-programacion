# Ejercicio 6: GitHub — Subir tu código a la nube

## Objetivo

Crear una cuenta en GitHub, crear un repositorio remoto, configurar la autenticación, subir tu código y agregar un README.

---

## Instrucciones

### Paso 1: Crear una cuenta en GitHub (si no tenés)

1. Entrá a https://github.com
2. Hacé clic en "Sign up"
3. Seguí los pasos para crear tu cuenta con tu email

Si ya tenés una cuenta, pasá al siguiente paso.

### Paso 2: Crear un repositorio en GitHub

1. En GitHub, hacé clic en el botón **"+"** (arriba a la derecha) y elegí **"New repository"**
2. En "Repository name" poné: `mi-proyecto`
3. Dejá la visibilidad en **Public**
4. **No** marques "Add a README file" (lo vamos a crear nosotras)
5. Hacé clic en **"Create repository"**

GitHub te va a mostrar una página con instrucciones. Dejá esa página abierta porque necesitamos la URL del repositorio.

### Paso 3: Configurar la autenticación

Elegí **uno** de estos dos métodos:

#### Opción A: HTTPS con token personal

1. En GitHub, andá a **Settings** (hacé clic en tu foto de perfil → Settings)
2. En el menú de la izquierda, bajá hasta **Developer settings**
3. Hacé clic en **Personal access tokens** → **Tokens (classic)**
4. Hacé clic en **"Generate new token"** → **"Generate new token (classic)"**
5. Poné un nombre descriptivo (ej: "Mi computadora")
6. En **Expiration** elegí "90 days" o "No expiration"
7. Marcá el permiso **"repo"** (el primero de la lista)
8. Hacé clic en **"Generate token"**
9. **Copiá el token** — solo se muestra una vez

Cuando Git te pida la contraseña al hacer push, usá este token en lugar de tu contraseña.

#### Opción B: SSH con clave SSH

1. En la terminal, generá un par de claves:

```bash
ssh-keygen -t ed25519 -C "tu@email.com"
```

Presioná Enter para aceptar la ubicación por defecto. Podés dejar la contraseña vacía.

2. Mostrá la clave pública:

```bash
cat ~/.ssh/id_ed25519.pub
```

3. Copiá todo el texto que aparece
4. En GitHub, andá a **Settings** → **SSH and GPG keys** → **"New SSH key"**
5. Pegá la clave y hacé clic en **"Add SSH key"**
6. Verificá que funciona:

```bash
ssh -T git@github.com
```

Debería decir: `Hi tu-usuario! You've successfully authenticated...`

### Paso 4: Conectar tu repositorio local con GitHub

Abrí la terminal, entrá a tu carpeta `mi-proyecto` y ejecutá:

Si elegiste **HTTPS**:

```bash
git remote add origin https://github.com/tu-usuario/mi-proyecto.git
```

Si elegiste **SSH**:

```bash
git remote add origin git@github.com:tu-usuario/mi-proyecto.git
```

Reemplazá `tu-usuario` por tu nombre de usuario de GitHub.

### Paso 5: Subir el código a GitHub

```bash
git push -u origin main
```

La primera vez que usás HTTPS, te va a pedir usuario y contraseña. Usá tu nombre de usuario de GitHub y el token como contraseña.

### Paso 6: Crear un README.md

Creá un archivo `README.md` con este contenido:

```markdown
# Mi Proyecto

Este es mi primer proyecto con Git y GitHub.
```

### Paso 7: Hacer commit y push del README

```bash
git add README.md
git commit -m "Agrega README con descripción del proyecto"
git push
```

---

## Verificación

**Verificación 1:**

Abrí en tu navegador la URL de tu repositorio:

```
https://github.com/tu-usuario/mi-proyecto
```

**Salida esperada:** Deberías ver:
- Todos los archivos del proyecto (`hola.php`, `nuevo.php`, `.gitignore`, `README.md`, etc.)
- El historial de commits (hacé clic en el texto que dice "X commits" arriba de la lista de archivos)
- El contenido del README.md se muestra automáticamente debajo de la lista de archivos

**Verificación 2:**

En la terminal, ejecutá:

```bash
git remote -v
```

**Salida esperada:** Debe mostrar la URL de GitHub:

```
origin  https://github.com/tu-usuario/mi-proyecto.git (fetch)
origin  https://github.com/tu-usuario/mi-proyecto.git (push)
```

(Si usaste SSH, la URL empieza con `git@github.com:`)

**Verificación 3:**

En la terminal, ejecutá:

```bash
git log --oneline
```

**Salida esperada:** Debe incluir el commit del README:

```
a1b2c3d Agrega README con descripción del proyecto
...commits anteriores...
```
