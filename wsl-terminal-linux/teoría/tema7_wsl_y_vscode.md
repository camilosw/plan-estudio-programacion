# TEMA 7: WSL y VS Code — La ventana al taller

## OBJETIVO
Entender el puente entre los sistemas de archivos de Windows y Linux, y trabajar con proyectos de WSL directamente desde VS Code.

## EXPLICACIÓN

### Dos mundos en una computadora

WSL y Windows comparten la misma máquina física, pero tienen sistemas de archivos separados. Windows usa unidades como `C:\` y `D:\`. Linux tiene su propio árbol de archivos que empieza en `/`.

Piénsalo como tu casa y tu taller: están conectados por una puerta (el punto de montaje `/mnt`), pero cada espacio tiene su propia organización.

### Acceder a Windows desde WSL

Desde WSL puedes ver los archivos de Windows a través de `/mnt/c/` (que corresponde al disco `C:\`):

```bash
ls /mnt/c/
```

```
'Program Files'  'Program Files (x86)'   Users   Windows   pagefile.sys
```

```bash
ls /mnt/c/Users/Sandra/
```

```
Desktop  Documents  Downloads  Music  Pictures  Videos
```

Puedes copiar archivos desde Windows hacia WSL:

```bash
cp /mnt/c/Users/Sandra/Downloads/archivo.txt ~/proyectos/
```

### Acceder a WSL desde Windows Explorer

Desde WSL, puedes abrir la carpeta actual en el Explorador de Windows:

```bash
explorer.exe .
```

Se abre Windows Explorer mostrando el contenido de tu carpeta de WSL. También puedes llegar ahí escribiendo `\\wsl$\Ubuntu` en la barra de direcciones del Explorador.

### ¿Dónde guardar tus proyectos?

Esta es una decisión importante. Tienes dos opciones:

**Opción A: Carpeta dentro de WSL** (`~/proyectos/`) ← **Recomendada**

```bash
mkdir -p ~/proyectos/mi-app
```

- Velocidad máxima para herramientas de Linux (Git, PHP, Node.js)
- Permisos de Linux correctos
- La ruta en Windows es `\\wsl$\Ubuntu\home\sandra\proyectos\`

**Opción B: Carpeta en Windows** (`/mnt/c/proyectos/`)

```bash
mkdir /mnt/c/proyectos/mi-app
```

- Acceso fácil desde el Explorador de Windows
- Velocidad más lenta para operaciones de archivo en Linux
- Los permisos de Linux no funcionan del mismo modo

**Recomendación:** guarda tus proyectos dentro de WSL (`~/proyectos/`). Cuando necesites compartir un archivo con Windows, cópialo con `cp` o accede desde `\\wsl$\Ubuntu`.

### VS Code y la extensión Remote-WSL

VS Code tiene soporte oficial para trabajar dentro de WSL a través de la extensión **"WSL"** (antes llamada Remote-WSL).

#### Instalar la extensión

1. Abre VS Code en Windows
2. Ve a Extensions (Ctrl+Shift+X)
3. Busca "WSL" (publicada por Microsoft)
4. Haz clic en "Install"

#### Abrir un proyecto de WSL en VS Code

Desde la terminal de WSL, navega a tu proyecto y ejecuta:

```bash
cd ~/proyectos/mi-app
code .
```

VS Code se abre automáticamente con ese proyecto. En la esquina inferior izquierda verás el indicador verde:

```
WSL: Ubuntu
```

Esto confirma que VS Code está conectado a WSL y no a Windows.

#### La terminal integrada de VS Code

Cuando abres un proyecto de WSL en VS Code, la terminal integrada (Ctrl+`) también está dentro de WSL:

```bash
# Dentro de la terminal de VS Code
pwd
```

```
/home/sandra/proyectos/mi-app
```

```bash
php --version
```

```
PHP 8.3.6 (cli) (built: Apr  2 2024 12:00:00) (NTS)
```

```bash
git --version
```

```
git version 2.43.0
```

Todas las herramientas instaladas en WSL están disponibles en esta terminal.

### Instalar PHP y Git dentro de WSL

Las herramientas que tengas instaladas en Windows **no se comparten automáticamente** con WSL. Necesitas instalarlas dentro de WSL también:

```bash
sudo apt update
sudo apt install php git
```

Verificar:

```bash
php --version
```

```
PHP 8.3.6 (cli)
```

```bash
git --version
```

```
git version 2.43.0
```

### Flujo de trabajo recomendado

Este es el flujo que usarás día a día:

1. Abre Ubuntu desde el menú Inicio (o desde Windows Terminal)
2. Navega a tu proyecto: `cd ~/proyectos/mi-app`
3. Abre VS Code: `code .`
4. Trabaja en VS Code — edita archivos, usa la terminal integrada
5. Desde la terminal de VS Code: ejecuta PHP, usa Git, instala paquetes

No necesitas abrir VS Code desde Windows ni navegar al proyecto manualmente. El comando `code .` hace todo.

### Resumen de comandos

| Comando                    | Qué hace                                              |
|----------------------------|-------------------------------------------------------|
| `ls /mnt/c/`               | Lista el contenido del disco C: de Windows           |
| `explorer.exe .`           | Abre la carpeta actual en Windows Explorer           |
| `code .`                   | Abre VS Code en la carpeta actual (dentro de WSL)   |
| `sudo apt install php git` | Instala PHP y Git dentro de WSL                     |
