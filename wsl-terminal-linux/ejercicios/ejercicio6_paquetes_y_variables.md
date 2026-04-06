# Ejercicio 6: Paquetes, variables y zsh — El almacén de suministros

## Objetivo

Instalar paquetes con `apt`, trabajar con variables de entorno y configurar zsh con Oh My Zsh como shell principal.

---

## Instrucciones

### Paso 1: Actualizar el catálogo de paquetes

Antes de instalar cualquier cosa, actualiza la lista de paquetes disponibles:

```bash
sudo apt update
```

### Paso 2: Instalar tree

```bash
sudo apt install tree
```

Confirma con `y` cuando te pregunte si deseas continuar.

Verifica la instalación:

```bash
tree --version
```

### Paso 3: Usar tree para ver una estructura de carpetas

```bash
tree ~/proyecto-cafeteria
```

¿Ves la estructura del proyecto del ejercicio anterior?

### Paso 4: Explorar variables de entorno

```bash
echo $HOME
```

```bash
echo $USER
```

```bash
echo $PATH
```

Observa `$PATH`: es una lista de carpetas separadas por `:`. Cuando escribes un comando, Linux lo busca en todas esas carpetas en orden.

```bash
# ¿En qué carpeta está el comando ls?
which ls
```

```bash
# Confirma que esa carpeta está en $PATH
echo $PATH | tr ':' '\n'
```

### Paso 5: Crear una variable de entorno de sesión

```bash
export CAFETERIA="La Cafetería de Sandra"
echo $CAFETERIA
```

```bash
# Abrir una nueva sub-shell y verificar que la variable existe
bash -c 'echo $CAFETERIA'
```

### Paso 6: Hacer una variable permanente

Agrega la variable a `.bashrc` para que esté disponible siempre:

```bash
echo 'export CAFETERIA="La Cafetería de Sandra"' >> ~/.bashrc
```

```bash
# Recargar la configuración
source ~/.bashrc
echo $CAFETERIA
```

### Paso 7: Instalar zsh

```bash
sudo apt install zsh
zsh --version
```

### Paso 8: Instalar curl (necesario para Oh My Zsh)

```bash
sudo apt install curl
```

### Paso 9: Instalar Oh My Zsh

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

Durante la instalación te preguntará si quieres cambiar a zsh como shell por defecto. Escribe `Y` y Enter.

Cuando termine, cierra la terminal y ábrela de nuevo.

### Paso 10: Verificar que estás usando zsh

```bash
echo $SHELL
```

**Salida esperada:**

```
/usr/bin/zsh
```

```bash
zsh --version
```

### Paso 11: Explorar la configuración de zsh

```bash
nano ~/.zshrc
```

Busca la línea `ZSH_THEME=` y observa qué tema está configurado. El valor por defecto es `"robbyrussell"`.

Cierra nano sin cambiar nada (`Ctrl+X`).

### Paso 12: Verificar que la variable CAFETERIA sigue disponible

```bash
echo $CAFETERIA
```

**Importante:** La variable `CAFETERIA` la agregaste a `~/.bashrc`, pero ahora usas zsh. Para que también funcione en zsh, agrégala a `~/.zshrc`:

```bash
echo 'export CAFETERIA="La Cafetería de Sandra"' >> ~/.zshrc
source ~/.zshrc
echo $CAFETERIA
```

---

## Verificación

**Comando 1:** Verificar que tree está instalado

```bash
tree --version
```

**Salida esperada:**

```
tree v2.1.1 (c) 1996 - 2023 by Steve Baker, Thomas Moore, Francesc Rojas, Florian Sesser, Kyosuke Tokoro
```

(La versión puede variar)

**Comando 2:** Verificar la shell actual

```bash
echo $SHELL
```

**Salida esperada:**

```
/usr/bin/zsh
```

**Comando 3:** Verificar la variable de entorno

```bash
echo $CAFETERIA
```

**Salida esperada:**

```
La Cafetería de Sandra
```

**Comando 4:** Ver la estructura de un proyecto con tree

```bash
tree ~/proyecto-cafeteria
```

**Salida esperada:**

```
/home/sandra/proyecto-cafeteria
├── README.md
├── docs
└── menu
    ├── bebidas.txt
    └── comidas.txt

2 directories, 3 files
```
