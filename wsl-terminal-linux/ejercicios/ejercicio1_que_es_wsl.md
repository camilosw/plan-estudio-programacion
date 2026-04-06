# Ejercicio 1: ¿Qué es WSL? — Instalación y configuración

## Objetivo

Instalar WSL con Ubuntu en tu computadora Windows, configurar tu usuario y verificar que todo funciona correctamente.

---

## Instrucciones

### Paso 1: Abrir PowerShell como administrador

1. Presiona la tecla Windows
2. Escribe "PowerShell"
3. Haz clic derecho sobre "Windows PowerShell" → "Ejecutar como administrador"
4. Confirma el cuadro de control de cuentas de usuario (UAC)

### Paso 2: Instalar WSL

En PowerShell, ejecuta:

```powershell
wsl --install
```

Esto instala WSL 2 con Ubuntu. El proceso descarga e instala los componentes necesarios. Al finalizar verás un mensaje indicando que debes reiniciar.

### Paso 3: Reiniciar la computadora

Reinicia Windows cuando el comando lo solicite.

### Paso 4: Configurar tu usuario de Ubuntu

Al reiniciar, Ubuntu se abre automáticamente y te pide crear un usuario:

```
Enter new UNIX username: sandra
New password:
Retype new password:
passwd: password updated successfully
```

- El nombre de usuario debe estar en minúsculas y sin espacios
- La contraseña no se ve mientras la escribes — es normal
- **Recuerda esta contraseña**: la necesitarás para usar `sudo`

### Paso 5: Verificar la versión de WSL

Desde PowerShell (no es necesario ser administrador):

```powershell
wsl --list --verbose
```

### Paso 6: Verificar la distribución desde dentro de WSL

Abre Ubuntu desde el menú Inicio y ejecuta:

```bash
lsb_release -a
```

```bash
uname -a
```

### Paso 7: Practicar abrir y cerrar WSL

Cierra Ubuntu y vuelve a abrirlo desde el menú Inicio. Luego sal con:

```bash
exit
```

---

## Verificación

**Comando 1:** Verificar versión de WSL (desde PowerShell)

```powershell
wsl --list --verbose
```

**Salida esperada:**

```
  NAME      STATE           VERSION
* Ubuntu    Running         2
```

Lo importante: la columna VERSION debe mostrar **2**.

**Comando 2:** Verificar distribución (desde Ubuntu/WSL)

```bash
lsb_release -a
```

**Salida esperada:**

```
Distributor ID: Ubuntu
Description:    Ubuntu 24.04 LTS
Release:        24.04
Codename:       noble
```

**Comando 3:** Verificar que eres tú

```bash
whoami
```

**Salida esperada:**

```
sandra
```

(Tu nombre de usuario, el que elegiste al configurar Ubuntu)
