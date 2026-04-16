# TEMA 6: Paquetes, variables y zsh — El almacén de suministros

## OBJETIVO
Instalar software con `apt`, entender las variables de entorno, y configurar zsh con Oh My Zsh como shell mejorado.

## EXPLICACIÓN

### apt — El almacén de suministros

`apt` (Advanced Package Tool) es el gestor de paquetes de Ubuntu. Piénsalo como una tienda de herramientas para tu taller: tiene un catálogo enorme y puedes instalar lo que necesites con un solo comando, sin buscar instaladores ni hacer clic en "Siguiente".

Antes de instalar cualquier cosa, actualiza el catálogo para obtener la lista más reciente de versiones disponibles:

```bash
sudo apt update
```

```
Hit:1 http://archive.ubuntu.com/ubuntu noble InRelease
Get:2 http://archive.ubuntu.com/ubuntu noble-updates InRelease [126 kB]
Fetched 126 kB in 1s (126 kB/s)
Reading package lists... Done
Building dependency tree... Done
```

#### Instalar un paquete

```bash
sudo apt install tree
```

```
Reading package lists... Done
Building dependency tree... Done
The following NEW packages will be installed:
  tree
0 upgraded, 1 newly installed, 0 to remove and 0 not upgraded.
Do you want to continue? [Y/n] y
```

Escribe `y` y Enter para confirmar.

Verificar que se instaló:

```bash
tree --version
```

```
tree v2.1.1 (c) 1996 - 2023 by Steve Baker, Thomas Moore, Francesc Rojas, Florian Sesser, Kyosuke Tokoro
```

#### Desinstalar un paquete

```bash
sudo apt remove tree
```

#### Ver qué tienes instalado

```bash
apt list --installed
```

```
Listing... Done
adduser/noble,now 3.137ubuntu1 all [installed]
apt/noble,now 2.7.14build2 amd64 [installed]
...
```

### Variables de entorno

Las variables de entorno son como "notas pegadas en la pared del taller" que todos los programas pueden leer. Almacenan configuraciones importantes del sistema y del usuario.

#### Ver variables de entorno

```bash
echo $HOME
```

```
/home/sandra
```

```bash
echo $USER
```

```
sandra
```

```bash
echo $PATH
```

```
/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games
```

`$PATH` es especialmente importante: cuando escribes un comando, Linux lo busca en todas las carpetas listadas en `$PATH`, en orden. Por eso puedes escribir `ls` en vez de `/usr/bin/ls`.

Para ver todas las variables de entorno a la vez:

```bash
printenv
```

#### Crear una variable de entorno

```bash
export MI_PROYECTO="cafeteria-sandra"
echo $MI_PROYECTO
```

```
cafeteria-sandra
```

El prefijo `export` hace que la variable esté disponible para los programas que ejecutes desde esa terminal.

**Problema:** si cierras la terminal, la variable desaparece.

#### Hacer una variable permanente con .bashrc

El archivo `~/.bashrc` se ejecuta automáticamente cada vez que abres una terminal. Si agregas una variable ahí, siempre estará disponible.

```bash
echo 'export MI_PROYECTO="cafeteria-sandra"' >> ~/.bashrc
```

Para que los cambios tomen efecto en la sesión actual sin cerrar la terminal:

```bash
source ~/.bashrc
```

### Cambiar de bash a zsh

bash es la shell que viene por defecto en Ubuntu. zsh es una alternativa más moderna con mejores funcionalidades: autocompletado más inteligente, historial mejorado, temas visuales y plugins.

#### Instalar zsh

```bash
sudo apt install zsh
```

Verificar:

```bash
zsh --version
```

```
zsh 5.9 (x86_64-ubuntu-linux-gnu)
```

#### Cambiar zsh como shell por defecto

```bash
chsh -s $(which zsh)
```

```
Password:
```

Ingresa tu contraseña. Cierra la terminal y ábrela de nuevo. La primera vez que abres zsh te pregunta si quieres crear un archivo de configuración:

```
This is the Z Shell configuration function for new users,
zsh-newuser-install.
...
(q) Quit and do nothing. The function will be run again next time.
```

Escribe `q` por ahora — lo configuraremos con Oh My Zsh.

Para confirmar que estás usando zsh:

```bash
echo $SHELL
```

```
/usr/bin/zsh
```

### Oh My Zsh — Personalizar el taller

Oh My Zsh es un framework para gestionar la configuración de zsh. Agrega temas visuales, plugins y hace que la terminal sea mucho más agradable.

#### Instalación

Primero asegúrate de tener `curl` instalado:

```bash
sudo apt install curl
```

Luego instala Oh My Zsh:

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

```
         __                                     __
  ____  / /_     ____ ___  __  __   ____  _____/ /_
 / __ \/ __ \   / __ `__ \/ / / /  /_  / / ___/ __ \
/ /_/ / / / /  / / / / / / /_/ /    / /_(__  ) / / /
\____/_/ /_/  /_/ /_/ /_/\__, /    /___/____/_/ /_/
                         /____/                       ....is now installed!
```

#### El archivo de configuración .zshrc

Oh My Zsh crea el archivo `~/.zshrc` para configurar zsh. Para editarlo:

```bash
nano ~/.zshrc
```

Las líneas más útiles al principio:

```bash
# Cambiar el tema (busca temas en https://github.com/ohmyzsh/ohmyzsh/wiki/Themes)
ZSH_THEME="agnoster"

# Plugins activados (agrega más separados por espacios)
plugins=(git)
```

El tema `robbyrussell` (el por defecto) es una buena opción para empezar. El plugin `git` agrega información del repositorio en el prompt.

Después de guardar cambios en `.zshrc`:

```bash
source ~/.zshrc
```

#### Resumen: bash vs zsh

| Característica         | bash                | zsh (con Oh My Zsh)           |
|------------------------|---------------------|-------------------------------|
| Autocompletado         | Básico              | Inteligente, con menú visual  |
| Historial compartido   | No                  | Sí (entre terminales abiertas)|
| Temas visuales         | No                  | Sí, muchos disponibles        |
| Plugins                | Manual              | Fácil de agregar              |
| Archivo de config      | `~/.bashrc`         | `~/.zshrc`                    |

### Resumen de comandos

| Comando                    | Qué hace                                         |
|----------------------------|--------------------------------------------------|
| `sudo apt update`          | Actualiza el catálogo de paquetes                |
| `sudo apt install paquete` | Instala un paquete                               |
| `sudo apt remove paquete`  | Desinstala un paquete                            |
| `apt list --installed`     | Lista los paquetes instalados                    |
| `echo $VARIABLE`           | Muestra el valor de una variable de entorno     |
| `export VAR="valor"`       | Crea una variable de entorno (sesión actual)    |
| `printenv`                 | Muestra todas las variables de entorno           |
| `source ~/.bashrc`         | Recarga el archivo de configuración de bash     |
| `source ~/.zshrc`          | Recarga el archivo de configuración de zsh      |
| `chsh -s $(which zsh)`     | Cambia la shell por defecto a zsh               |
