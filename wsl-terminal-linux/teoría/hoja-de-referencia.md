# Hoja de Referencia — WSL y Terminal Linux

Resumen de todos los comandos del módulo, organizados por categoría. Úsala como consulta rápida cuando no recuerdes un comando.

---

## WSL (desde PowerShell en Windows)

| Comando                     | Qué hace                                          |
|-----------------------------|---------------------------------------------------|
| `wsl --install`             | Instala WSL 2 con Ubuntu                         |
| `wsl --list --verbose`      | Lista las distribuciones instaladas con su versión|
| `wsl`                       | Entra a WSL (la distribución por defecto)        |
| `wsl --shutdown`            | Apaga WSL completamente                          |

---

## Terminal básica

| Comando          | Qué hace                                              |
|------------------|-------------------------------------------------------|
| `whoami`         | Muestra tu nombre de usuario                          |
| `hostname`       | Muestra el nombre de la computadora                   |
| `date`           | Muestra la fecha y hora actuales                      |
| `echo "texto"`   | Imprime texto en la pantalla                          |
| `clear`          | Limpia la pantalla (atajo: Ctrl+L)                    |
| `history`        | Muestra el historial de comandos                      |
| `man comando`    | Abre el manual de un comando                          |
| `comando --help` | Muestra ayuda resumida de un comando                  |
| `exit`           | Sale de la terminal (o de WSL)                        |

**Atajos de teclado:**

| Atajo        | Qué hace                                      |
|--------------|-----------------------------------------------|
| ↑ / ↓        | Navega por el historial de comandos           |
| Tab          | Autocompleta comandos y nombres de archivos   |
| Tab Tab      | Muestra todas las opciones disponibles        |
| Ctrl+C       | Cancela el comando en ejecución               |
| Ctrl+L       | Limpia la pantalla                            |
| Ctrl+A       | Va al inicio de la línea                      |
| Ctrl+E       | Va al final de la línea                       |

---

## Navegación de archivos

| Comando            | Qué hace                                            |
|--------------------|-----------------------------------------------------|
| `pwd`              | Muestra la ruta de la carpeta actual                |
| `ls`               | Lista el contenido de la carpeta                    |
| `ls -l`            | Lista con detalles (permisos, tamaño, fecha)        |
| `ls -la`           | Lista con detalles incluyendo archivos ocultos      |
| `ls -l /ruta`      | Lista una carpeta específica sin entrar en ella     |
| `cd carpeta`       | Entra a una carpeta                                 |
| `cd ..`            | Sube un nivel (carpeta padre)                       |
| `cd ~` o `cd`      | Va a tu carpeta personal                            |
| `cd /`             | Va a la raíz del sistema                            |
| `cd /ruta/absoluta`| Va directamente a esa ruta                          |

**Atajos de ruta:**

| Símbolo | Significa                          |
|---------|------------------------------------|
| `~`     | Tu carpeta personal (`/home/usuario`) |
| `.`     | La carpeta actual                  |
| `..`    | La carpeta padre                   |

---

## Manipulación de archivos

| Comando                  | Qué hace                                           |
|--------------------------|----------------------------------------------------|
| `mkdir nombre`           | Crea una carpeta                                   |
| `mkdir -p a/b/c`         | Crea carpetas anidadas en un solo comando          |
| `touch archivo.txt`      | Crea un archivo vacío                              |
| `cat archivo.txt`        | Muestra el contenido de un archivo                |
| `echo "texto" > archivo` | Escribe en un archivo (sobreescribe)               |
| `echo "texto" >> archivo`| Agrega al final de un archivo                      |
| `cp origen destino`      | Copia un archivo                                   |
| `cp -r carpeta/ destino/`| Copia una carpeta completa (recursivo)            |
| `mv origen destino`      | Mueve o renombra un archivo o carpeta             |
| `rm archivo`             | Elimina un archivo (¡sin papelera!)              |
| `rm -r carpeta`          | Elimina una carpeta y todo su contenido           |
| `rmdir carpeta`          | Elimina una carpeta vacía                          |
| `nano archivo`           | Abre el editor de texto en la terminal            |
| `tree`                   | Muestra la estructura de carpetas visualmente     |
| `tree /ruta`             | Muestra la estructura de una ruta específica      |

**Wildcards (comodines):**

| Comodín | Ejemplo          | Qué selecciona                        |
|---------|------------------|---------------------------------------|
| `*`     | `*.txt`          | Todos los archivos con extensión .txt |
| `?`     | `nota?.txt`      | nota1.txt, notaA.txt, etc.            |

**Atajos de nano:**

| Atajo    | Qué hace           |
|----------|--------------------|
| Ctrl+O   | Guardar el archivo |
| Ctrl+X   | Salir de nano      |
| Ctrl+K   | Cortar una línea   |
| Ctrl+U   | Pegar una línea    |

---

## Permisos y usuarios

| Comando                  | Qué hace                                            |
|--------------------------|-----------------------------------------------------|
| `ls -l`                  | Lista archivos con permisos detallados              |
| `chmod u+x archivo`      | Agrega permiso de ejecución al dueño               |
| `chmod u-w archivo`      | Quita permiso de escritura al dueño                |
| `chmod g+r archivo`      | Agrega lectura al grupo                            |
| `chmod o-r archivo`      | Quita lectura a others                             |
| `chmod a+x archivo`      | Agrega ejecución a todos los grupos               |
| `chmod 755 archivo`      | Dueño=rwx, grupo=r-x, others=r-x                  |
| `chmod 644 archivo`      | Dueño=rw-, grupo=r--, others=r-- (estándar)        |
| `chmod 600 archivo`      | Dueño=rw-, grupo=---, others=--- (privado)         |
| `sudo comando`           | Ejecuta un comando con permisos de administrador   |
| `id`                     | Muestra tu uid, gid y grupos                       |

**Leer la salida de ls -l:**

```
-rwxr-xr-- 1 sandra devs 1234 Apr  2 10:00 script.sh
│└──┘└──┘└──┘
│ user group others
└── tipo: - archivo, d carpeta
```

**Tabla de notación numérica:**

| Número | Permisos | Descripción         |
|--------|----------|---------------------|
| 7      | rwx      | Leer, escribir, ejecutar |
| 6      | rw-      | Leer y escribir         |
| 5      | r-x      | Leer y ejecutar         |
| 4      | r--      | Solo leer               |
| 0      | ---      | Sin permisos            |

---

## Paquetes (apt)

| Comando                       | Qué hace                                     |
|-------------------------------|----------------------------------------------|
| `sudo apt update`             | Actualiza el catálogo de paquetes            |
| `sudo apt install paquete`    | Instala un paquete                           |
| `sudo apt remove paquete`     | Desinstala un paquete                        |
| `sudo apt upgrade`            | Actualiza todos los paquetes instalados      |
| `apt list --installed`        | Lista los paquetes instalados                |
| `apt search nombre`           | Busca un paquete en el catálogo              |
| `which comando`               | Muestra dónde está instalado un comando      |

---

## Variables de entorno

| Comando                        | Qué hace                                         |
|--------------------------------|--------------------------------------------------|
| `echo $VARIABLE`               | Muestra el valor de una variable                 |
| `echo $HOME`                   | Muestra tu carpeta personal                      |
| `echo $USER`                   | Muestra tu nombre de usuario                     |
| `echo $PATH`                   | Muestra el PATH del sistema                      |
| `printenv`                     | Muestra todas las variables de entorno           |
| `export VAR="valor"`           | Crea una variable (solo para esta sesión)        |
| `export $(cat .env \| xargs)`  | Carga variables desde un archivo .env            |
| `source ~/.bashrc`             | Recarga la configuración de bash                 |
| `source ~/.zshrc`              | Recarga la configuración de zsh                  |

**Para hacer una variable permanente**, agrégala a `~/.bashrc` (bash) o `~/.zshrc` (zsh):

```bash
echo 'export MI_VAR="valor"' >> ~/.zshrc
source ~/.zshrc
```

---

## zsh y Oh My Zsh

| Comando                        | Qué hace                                         |
|--------------------------------|--------------------------------------------------|
| `sudo apt install zsh`         | Instala zsh                                      |
| `zsh --version`                | Verifica la versión de zsh                       |
| `chsh -s $(which zsh)`         | Cambia zsh como shell por defecto               |
| `echo $SHELL`                  | Muestra la shell activa                          |
| `nano ~/.zshrc`                | Edita la configuración de zsh                   |
| `source ~/.zshrc`              | Aplica los cambios de .zshrc sin cerrar la terminal |

Para instalar Oh My Zsh:

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

---

## WSL y VS Code

| Comando              | Qué hace                                                 |
|----------------------|----------------------------------------------------------|
| `code .`             | Abre VS Code en la carpeta actual (requiere extensión WSL)|
| `explorer.exe .`     | Abre Windows Explorer en la carpeta actual de WSL        |
| `ls /mnt/c/`         | Lista el contenido del disco C: de Windows               |
| `ls /mnt/c/Users/`   | Lista las carpetas de usuarios de Windows                |

**Ruta de WSL desde Windows Explorer:** `\\wsl$\Ubuntu`

---

## Git (dentro de WSL)

| Comando                          | Qué hace                                    |
|----------------------------------|---------------------------------------------|
| `sudo apt install git`           | Instala Git en WSL                         |
| `git init`                       | Inicializa un repositorio                  |
| `git add .`                      | Prepara todos los archivos para commit     |
| `git commit -m "mensaje"`        | Guarda los cambios con un mensaje          |
| `git log --oneline`              | Muestra el historial resumido              |
| `git status`                     | Muestra el estado del repositorio          |
