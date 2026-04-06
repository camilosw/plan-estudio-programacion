# Plan de Estudios: WSL y Terminal Linux

## Contexto

WSL (Windows Subsystem for Linux) te permite tener un entorno Linux completo dentro de Windows. Como desarrolladora, muchas herramientas (Git, PHP, Node.js, servidores web) funcionan mejor y de forma más natural en Linux. Este módulo te enseña a instalar WSL, moverte cómodamente en la terminal y usar las herramientas del día a día.

La analogía que usaremos a lo largo del módulo: **tu taller de herramientas**. Windows es tu casa donde vives normalmente. WSL es un taller equipado anexo a tu casa. El taller tiene sus propias herramientas (comandos de Linux), sus propias estanterías (el sistema de archivos), sus propios candados (permisos), su almacén de suministros (el gestor de paquetes apt) y una ventana desde la casa (VS Code con Remote-WSL).

---

## Estructura del plan

Cada tema sigue el formato:

1. **Explicación** del concepto con analogía
2. **Ejemplo** con comandos y su salida esperada

El ejercicio práctico está en su archivo separado dentro de la carpeta `ejercicios/`.

---

## Tema 1: ¿Qué es WSL? — Tu taller de herramientas

**Objetivo:** Entender qué es WSL, por qué lo necesitas como desarrolladora y dejarlo instalado con Ubuntu.

**Explicación:** WSL instala un sistema Linux real dentro de Windows, sin necesidad de máquina virtual ni de borrar Windows. Desde la terminal de WSL puedes usar comandos de Linux, instalar paquetes y correr tu código como si estuvieras en Linux.

**Ejemplo:**

```powershell
# Desde PowerShell como administrador:
wsl --install
```

```
Installing: Ubuntu
Ubuntu has been installed.
```

```bash
# Dentro de WSL, verificar la distribución:
lsb_release -a
```

```
Distributor ID: Ubuntu
Description:    Ubuntu 24.04 LTS
Release:        24.04
```

---

## Tema 2: La terminal — Tu mesa de trabajo

**Objetivo:** Entender qué es la terminal, leer el prompt y ejecutar los primeros comandos.

**Explicación:** La terminal es una ventana donde le das instrucciones a la computadora escribiendo texto. El prompt (el texto antes del cursor) te dice quién eres, en qué máquina estás y en qué carpeta te encuentras.

**Ejemplo:**

```bash
whoami
```

```
sandra
```

```bash
date
```

```
Wed Apr  2 10:30:00 UTC 2026
```

---

## Tema 3: Navegación de archivos — Las estanterías del taller

**Objetivo:** Moverte por el sistema de archivos de Linux con confianza usando `pwd`, `ls` y `cd`.

**Explicación:** El sistema de archivos de Linux es como un árbol boca abajo. La raíz (`/`) es el tronco del que cuelga todo. Tu carpeta personal es `/home/tu-usuario` y se puede escribir de forma corta como `~`.

**Ejemplo:**

```bash
pwd
```

```
/home/sandra
```

```bash
ls -la
```

```
total 20
drwxr-xr-x 3 sandra sandra 4096 Apr  2 10:00 .
drwxr-xr-x 4 root   root   4096 Apr  2 09:00 ..
-rw-r--r-- 1 sandra sandra  220 Apr  2 09:00 .bash_logout
-rw-r--r-- 1 sandra sandra 3526 Apr  2 09:00 .bashrc
```

---

## Tema 4: Manipulación de archivos — Organizar el taller

**Objetivo:** Crear, copiar, mover y eliminar archivos y carpetas desde la terminal.

**Explicación:** En Linux, todo son archivos. Desde la terminal puedes crear archivos, organizarlos en carpetas, copiarlos a otro lugar o eliminarlos. A diferencia de Windows, no hay "papelera de reciclaje" — cuando eliminas algo con `rm`, desaparece permanentemente.

**Ejemplo:**

```bash
mkdir proyectos
cd proyectos
touch README.md
echo "# Mi proyecto" > README.md
cat README.md
```

```
# Mi proyecto
```

---

## Tema 5: Permisos y usuarios — Candados y llaves

**Objetivo:** Entender el sistema de permisos de Linux y saber leer la salida de `ls -l`.

**Explicación:** Cada archivo tiene un dueño y un conjunto de permisos que definen quién puede leerlo, modificarlo o ejecutarlo. `sudo` es como la llave maestra del taller: te da permisos de administrador para operaciones que lo requieren.

**Ejemplo:**

```bash
ls -l script.sh
```

```
-rw-r--r-- 1 sandra sandra 45 Apr  2 10:00 script.sh
```

```bash
chmod +x script.sh
ls -l script.sh
```

```
-rwxr-xr-x 1 sandra sandra 45 Apr  2 10:00 script.sh
```

---

## Tema 6: Paquetes, variables y zsh — El almacén de suministros

**Objetivo:** Instalar software con `apt`, entender las variables de entorno y configurar zsh como shell.

**Explicación:** `apt` es el gestor de paquetes de Ubuntu — como una tienda de aplicaciones para la terminal. Las variables de entorno son configuraciones que el sistema y los programas leen automáticamente, como `$PATH` (dónde buscar comandos). zsh es una shell alternativa a bash con mejores características; Oh My Zsh la hace más cómoda aún.

**Ejemplo:**

```bash
sudo apt update
sudo apt install zsh
zsh --version
```

```
zsh 5.9 (x86_64-ubuntu-linux-gnu)
```

---

## Tema 7: WSL y VS Code — La ventana al taller

**Objetivo:** Entender el puente entre Windows y Linux, y abrir proyectos de WSL en VS Code.

**Explicación:** Desde WSL puedes acceder a los archivos de Windows en `/mnt/c/`. En sentido inverso, puedes abrir cualquier carpeta de WSL en VS Code con el comando `code .`. La extensión Remote-WSL hace que VS Code trabaje directamente dentro de WSL.

**Ejemplo:**

```bash
cd ~/proyectos/mi-app
code .
```

VS Code se abre mostrando el indicador verde "WSL: Ubuntu" en la barra de estado inferior. La terminal integrada de VS Code también está dentro de WSL.

---

## Tema 8: Proyecto integrador — Todo junto

**Objetivo:** Combinar todos los conocimientos del módulo en un proyecto real con estructura de carpetas, permisos, variables de entorno, zsh y VS Code.

**Ejercicio final:**
Crear desde cero un proyecto llamado `mi-taller` con estructura de carpetas, un script ejecutable, variables de entorno, instalación de un paquete y apertura en VS Code.

---

## Resumen de progresión

| Tema | Concepto clave          | Lo que aprendes                                           |
|------|-------------------------|-----------------------------------------------------------|
| 1    | ¿Qué es WSL?            | Instalación, configuración de usuario, primeros pasos     |
| 2    | La terminal             | Prompt, primeros comandos, atajos de teclado              |
| 3    | Navegación de archivos  | `pwd`, `ls`, `cd`, rutas absolutas y relativas            |
| 4    | Manipulación de archivos| `mkdir`, `touch`, `cp`, `mv`, `rm`, redirección           |
| 5    | Permisos y usuarios     | `ls -l`, `chmod`, `sudo`, r/w/x                           |
| 6    | Paquetes, variables, zsh| `apt`, variables de entorno, `~/.bashrc`, zsh/Oh My Zsh   |
| 7    | WSL y VS Code           | `/mnt/c`, `code .`, Remote-WSL, dónde guardar proyectos   |
| 8    | Proyecto integrador     | Aplicar todo en un proyecto real                          |

---

## Archivos del módulo

### Teoría (`wsl-terminal-linux/teoría/`)

- `plan-de-estudios.md` — este archivo
- `tema1_que_es_wsl.md`
- `tema2_la_terminal.md`
- `tema3_navegacion_de_archivos.md`
- `tema4_manipulacion_de_archivos.md`
- `tema5_permisos_y_usuarios.md`
- `tema6_paquetes_y_variables.md`
- `tema7_wsl_y_vscode.md`
- `tema8_proyecto_integrador.md`
- `hoja-de-referencia.md` — resumen de todos los comandos

### Ejercicios (`wsl-terminal-linux/ejercicios/`)

- `ejercicio1_que_es_wsl.md`
- `ejercicio2_la_terminal.md`
- `ejercicio3_navegacion_de_archivos.md`
- `ejercicio4_manipulacion_de_archivos.md`
- `ejercicio5_permisos_y_usuarios.md`
- `ejercicio6_paquetes_y_variables.md`
- `ejercicio7_wsl_y_vscode.md`
- `ejercicio8_proyecto_integrador.md`

## Verificación

- Cada ejercicio incluye una sección de verificación con comandos y salida esperada
- La alumna puede confirmar su progreso comparando su terminal con la salida esperada
