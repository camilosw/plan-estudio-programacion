=========================================================
TEMA 1: ¿Qué es Git? — Control de versiones
=========================================================

OBJETIVO
--------
Entender qué es el control de versiones, por qué es útil y dejar Git instalado y configurado en tu computadora.

EXPLICACIÓN
-----------

### ¿Qué problema resuelve Git?

Imagina que estás escribiendo un informe y guardas archivos como "informe_v1.docx", "informe_v2_final.docx", "informe_v2_final_FINAL.docx". Git resuelve este caos: guarda el historial de cambios automáticamente, con un mensaje que describe cada cambio. Así siempre podés volver a cualquier versión anterior.

Es como tener un cuaderno donde anotás cada cambio que hacés en tu proyecto, con la fecha y una descripción. Si algo sale mal, podés volver atrás y ver cómo estaba todo antes.

### Git vs GitHub

Son dos cosas distintas:

- **Git** es una herramienta que se instala en tu computadora. Funciona **localmente** — no necesitás internet para usarla.
- **GitHub** es un sitio web donde podés subir tu código para respaldarlo y compartirlo. Lo veremos más adelante en otro tema.

Por ahora, solo vamos a trabajar con Git en tu computadora.

### Instalación

**En Linux (Ubuntu/Debian):**

```bash
sudo apt update
sudo apt install git
```

**En Mac:**

```bash
# Si tenés Homebrew instalado:
brew install git

# Si no, al escribir "git" en la terminal, macOS te ofrece instalarlo automáticamente
```

**En Windows:**

1. Descargá el instalador desde https://git-scm.com/download/win
2. Ejecutá el instalador y seguí los pasos (dejá las opciones por defecto)
3. Una vez instalado, abrí "Git Bash" (se instala junto con Git) — es la terminal que vamos a usar

### Verificar la instalación

Una vez instalado, verificamos que funciona:

```bash
git --version
```

Salida esperada (el número puede variar):

```
git version 2.43.0
```

Si ves un número de versión, Git está instalado correctamente.

### Configuración inicial

Antes de usar Git, necesitás decirle quién sos. Esta información aparecerá en cada cambio que guardes (para saber quién hizo cada cambio).

```bash
# Configurar tu nombre (aparecerá en cada cambio que guardes)
git config --global user.name "Tu Nombre"

# Configurar tu email
git config --global user.email "tu@email.com"
```

La opción `--global` significa que esta configuración aplica para todos tus proyectos en esta computadora. Solo hay que hacerlo una vez.

### Verificar la configuración

Para confirmar que todo quedó bien:

```bash
git config --list
```

Salida esperada:

```
user.name=Tu Nombre
user.email=tu@email.com
```

También podés verificar un valor específico:

```bash
git config user.name
```

```
Tu Nombre
```

```bash
git config user.email
```

```
tu@email.com
```

EJERCICIO
---------

1. Instalá Git en tu computadora siguiendo las instrucciones de tu sistema operativo
2. Verificá la instalación ejecutando `git --version` en la terminal
3. Configurá tu nombre y email con `git config --global`
4. Verificá con `git config --list` que la configuración quedó guardada

**Verificación:** Al ejecutar los siguientes comandos deberías ver tu información:

```bash
git --version
git config user.name
git config user.email
```

```
git version 2.43.0
Tu Nombre
tu@email.com
```
