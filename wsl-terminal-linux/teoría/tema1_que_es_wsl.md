=========================================================
TEMA 1: ¿Qué es WSL? — Tu taller de herramientas
=========================================================

OBJETIVO
--------
Entender qué es WSL, por qué lo necesitas como desarrolladora e instalarlo con Ubuntu en tu computadora Windows.

EXPLICACIÓN
-----------

### ¿Qué problema resuelve WSL?

Imagina que tu casa (Windows) es cómoda para el día a día: escribir documentos, navegar por internet, usar aplicaciones con ventanas. Pero muchas herramientas de desarrollo —servidores web, gestores de paquetes, scripts de automatización— están diseñadas para Linux y son difíciles de usar en Windows.

WSL (Windows Subsystem for Linux) instala un taller equipado directamente dentro de tu casa. El taller tiene su propio sistema de archivos, sus propias herramientas y su propio ambiente. Lo mejor: no tienes que elegir entre uno u otro. Windows y Linux conviven en la misma computadora.

### ¿Qué es una distribución?

Linux no es un solo sistema operativo: es un núcleo que distintas comunidades empaquetan de formas diferentes. Cada paquete se llama **distribución** (o "distro"). Las más conocidas son Ubuntu, Debian y Fedora. WSL usa Ubuntu por defecto, que es la más popular y tiene mucha documentación.

### WSL 1 vs WSL 2

Existen dos versiones:

- **WSL 1**: compatible pero más limitada.
- **WSL 2**: más rápida, con soporte completo del kernel de Linux. Es la que debes usar.

Windows instala WSL 2 por defecto desde Windows 10 versión 2004 en adelante.

### Instalación

La instalación se hace desde PowerShell con permisos de administrador.

**Paso 1:** Abre PowerShell como administrador.
- Busca "PowerShell" en el menú Inicio
- Haz clic derecho → "Ejecutar como administrador"

**Paso 2:** Ejecuta el comando de instalación:

```powershell
wsl --install
```

```
Installing: Windows Subsystem for Linux
Windows Subsystem for Linux has been installed.
Installing: Ubuntu
Ubuntu has been installed.
The requested operation is successful. Changes will not be effective until the system is restarted.
```

**Paso 3:** Reinicia la computadora cuando te lo pida.

**Paso 4:** Al reiniciar, Ubuntu se abre automáticamente para que configures tu usuario. Elige un nombre de usuario (en minúsculas, sin espacios) y una contraseña. La contraseña no se muestra mientras la escribes — es normal.

```
Enter new UNIX username: sandra
New password:
Retype new password:
passwd: password updated successfully
```

### Verificar la instalación

Desde PowerShell (no es necesario ser administrador esta vez):

```powershell
wsl --list --verbose
```

```
  NAME      STATE           VERSION
* Ubuntu    Running         2
```

La columna VERSION debe mostrar 2. El asterisco (*) indica la distribución por defecto.

### Abrir y cerrar WSL

Para abrir WSL en cualquier momento:

```powershell
wsl
```

O busca "Ubuntu" en el menú Inicio de Windows.

Para salir de WSL y volver a la terminal de Windows:

```bash
exit
```

### Verificar que estás dentro de WSL

Cuando estás dentro de WSL, el prompt cambia. Verás algo así:

```
sandra@DESKTOP-ABC123:~$
```

Donde:
- `sandra` — tu nombre de usuario en Linux
- `DESKTOP-ABC123` — el nombre de tu computadora
- `~` — la carpeta donde estás (el símbolo `~` representa tu carpeta personal)
- `$` — indica que eres un usuario normal (no administrador)

Para confirmar que estás en Linux:

```bash
uname -a
```

```
Linux DESKTOP-ABC123 5.15.90.1-microsoft-standard-WSL2 #1 SMP x86_64 GNU/Linux
```

```bash
lsb_release -a
```

```
Distributor ID: Ubuntu
Description:    Ubuntu 24.04 LTS
Release:        24.04
Codename:       noble
```
