# Ejercicio 7: WSL y VS Code — La ventana al taller

## Objetivo

Configurar la extensión WSL de VS Code, abrir un proyecto desde la terminal de WSL e instalar las herramientas de desarrollo dentro de WSL.

---

## Instrucciones

### Paso 1: Instalar la extensión WSL en VS Code

1. Abre VS Code en Windows (si no lo tienes, descárgalo desde code.visualstudio.com)
2. Ve a Extensions: `Ctrl+Shift+X`
3. Busca "WSL"
4. Instala la extensión "WSL" publicada por Microsoft
5. Reinicia VS Code si te lo pide

### Paso 2: Instalar PHP y Git dentro de WSL

Las herramientas de Windows no están disponibles automáticamente en WSL. Instálalas dentro de WSL:

```bash
sudo apt update
sudo apt install php git
```

Verifica:

```bash
php --version
```

```bash
git --version
```

### Paso 3: Crear un proyecto de prueba

```bash
mkdir -p ~/proyectos/cafeteria-wsl
cd ~/proyectos/cafeteria-wsl
```

Crea un archivo PHP simple:

```bash
echo '<?php echo "La Cafetería de Sandra está lista." . PHP_EOL;' > index.php
```

Ejecuta el archivo para confirmar que PHP funciona:

```bash
php index.php
```

**Salida esperada:**

```
La Cafetería de Sandra está lista.
```

### Paso 4: Abrir el proyecto en VS Code

Asegúrate de estar en la carpeta del proyecto:

```bash
pwd
```

```
/home/sandra/proyectos/cafeteria-wsl
```

Abre VS Code:

```bash
code .
```

VS Code se abre. Espera unos segundos mientras se conecta a WSL.

### Paso 5: Verificar el indicador de VS Code

En la esquina inferior izquierda de VS Code busca el botón verde. Debe decir:

```
WSL: Ubuntu
```

Si dice algo diferente, cierra VS Code, vuelve a la terminal de WSL y ejecuta `code .` de nuevo.

### Paso 6: Usar la terminal integrada de VS Code

Abre la terminal integrada de VS Code: `Ctrl+\``

Verifica que estás dentro de WSL:

```bash
pwd
```

**Salida esperada:**

```
/home/sandra/proyectos/cafeteria-wsl
```

```bash
php index.php
```

**Salida esperada:**

```
La Cafetería de Sandra está lista.
```

```bash
echo $SHELL
```

**Salida esperada:**

```
/usr/bin/zsh
```

(o `/bin/bash` si no configuraste zsh)

### Paso 7: Explorar el puente Windows-Linux

Desde la terminal de VS Code (o desde Ubuntu), explora el disco de Windows:

```bash
ls /mnt/c/Users/
```

Copia un archivo desde WSL hacia el Escritorio de Windows:

```bash
cp index.php /mnt/c/Users/Sandra/Desktop/index_desde_wsl.php
```

Abre el Explorador de Windows y verifica que el archivo está en el Escritorio.

### Paso 8: Abrir la carpeta de WSL desde Windows Explorer

Desde la terminal de WSL:

```bash
explorer.exe .
```

Se abre Windows Explorer mostrando la carpeta de tu proyecto dentro de WSL.

---

## Verificación

**Comando 1:** Verificar que PHP está instalado en WSL

```bash
php --version
```

**Salida esperada:**

```
PHP 8.3.6 (cli) (built: Apr  2 2024 12:00:00) (NTS)
Linux
```

**Comando 2:** Verificar que Git está instalado en WSL

```bash
git --version
```

**Salida esperada:**

```
git version 2.43.0
```

**Comando 3:** Ejecutar PHP desde la terminal de VS Code

En la terminal integrada de VS Code:

```bash
php ~/proyectos/cafeteria-wsl/index.php
```

**Salida esperada:**

```
La Cafetería de Sandra está lista.
```

**Verificación visual:** El indicador verde en la esquina inferior izquierda de VS Code debe decir `WSL: Ubuntu`.
