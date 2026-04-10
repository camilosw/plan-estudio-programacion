# Ejercicio 8: Proyecto integrador — Todo junto

## Objetivo

Construir un proyecto completo desde cero combinando todos los conocimientos del módulo: estructura de carpetas, permisos, variables de entorno, instalación de paquetes y apertura en VS Code.

---

## Lo que construirás

Un proyecto llamado `mi-taller` con la siguiente estructura:

```
mi-taller/
├── src/
│   └── saludo.php
├── scripts/
│   └── ejecutar.sh
├── docs/
│   └── README.md
└── .env
```

Cada archivo representa un concepto aprendido:
- `saludo.php` — un script PHP que funciona desde WSL
- `ejecutar.sh` — un script bash que necesita permisos de ejecución
- `README.md` — documentación del proyecto
- `.env` — variables de entorno del proyecto

Al finalizar, el proyecto estará abierto en VS Code y podrás ejecutarlo todo desde la terminal.

---

## Instrucciones

### Paso 1: Crear la estructura del proyecto

```bash
cd ~
mkdir -p mi-taller/src mi-taller/scripts mi-taller/docs
cd mi-taller
```

Verifica:

```bash
ls
```

```
docs  scripts  src
```

### Paso 2: Crear los archivos del proyecto

**Archivo PHP:**

```bash
echo '<?php echo "Hola desde WSL, el taller está listo!" . PHP_EOL;' > src/saludo.php
```

**Script bash:**

```bash
cat > scripts/ejecutar.sh << 'EOF'
#!/bin/bash
echo "=== Ejecutando el proyecto mi-taller ==="
php ../src/saludo.php
echo "=== Listo ==="
EOF
```

**Documentación:**

```bash
cat > docs/README.md << 'EOF'
# Mi Taller

Proyecto de práctica del módulo WSL y Terminal Linux.

## Estructura

- `src/` — código fuente
- `scripts/` — scripts de automatización
- `docs/` — documentación
EOF
```

**Variables de entorno del proyecto:**

```bash
echo 'PROYECTO_NOMBRE=mi-taller' > .env
echo 'ENTORNO=desarrollo' >> .env
```

### Paso 3: Verificar la estructura con tree

Si no tienes tree instalado:

```bash
sudo apt install tree
```

```bash
tree .
```

**Salida esperada:**

```
.
├── .env
├── docs
│   └── README.md
├── scripts
│   └── ejecutar.sh
└── src
    └── saludo.php

3 directories, 4 files
```

### Paso 4: Configurar permisos del script

```bash
ls -l scripts/ejecutar.sh
```

```
-rw-r--r-- 1 sandra sandra 85 Apr  2 10:00 scripts/ejecutar.sh
```

```bash
chmod +x scripts/ejecutar.sh
ls -l scripts/ejecutar.sh
```

```
-rwxr-xr-x 1 sandra sandra 85 Apr  2 10:00 scripts/ejecutar.sh
```

### Paso 5: Ejecutar el script

```bash
cd scripts
./ejecutar.sh
```

**Salida esperada:**

```
=== Ejecutando el proyecto mi-taller ===
Hola desde WSL, el taller está listo!
=== Listo ===
```

```bash
cd ..
```

### Paso 6: Usar variables de entorno desde PHP

Primero, exporta las variables del archivo `.env` para que estén disponibles en la sesión:

```bash
export $(cat .env | xargs)
```

Ahora actualiza `src/saludo.php` para que lea esas variables con `getenv()`:

```bash
cat > src/saludo.php << 'EOF'
<?php
$proyecto = getenv('PROYECTO_NOMBRE');
$entorno  = getenv('ENTORNO');

echo "=== $proyecto ===" . PHP_EOL;
echo "Entorno: $entorno" . PHP_EOL;
echo "Hola desde WSL, el taller está listo!" . PHP_EOL;
EOF
```

Ejecuta el script:

```bash
php src/saludo.php
```

**Salida esperada:**

```
=== mi-taller ===
Entorno: desarrollo
Hola desde WSL, el taller está listo!
```

Si abres otra terminal sin haber exportado las variables, `getenv()` devuelve una cadena vacía. Por eso el paso de `export` es necesario antes de ejecutar el script.

Ahora cambia el valor de `ENTORNO` directamente en la consola y vuelve a ejecutar el script:

```bash
export ENTORNO=produccion
php src/saludo.php
```

**Salida esperada:**

```
=== mi-taller ===
Entorno: produccion
Hola desde WSL, el taller está listo!
```

El código PHP es exactamente el mismo — lo único que cambió fue la variable de entorno. Eso es la idea central: el comportamiento del programa varía según el entorno donde se ejecuta, sin tocar el código.

### Paso 7: Abrir en VS Code

```bash
code .
```

VS Code se abre con el proyecto. Verifica que en la esquina inferior izquierda diga `WSL: Ubuntu`.

Desde la terminal integrada de VS Code (Ctrl+\`), verifica que todo funciona:

```bash
php src/saludo.php
```

```bash
echo $PROYECTO_NOMBRE
```

---

## Verificación

**Comando 1:** Ver la estructura final del proyecto

```bash
tree ~/mi-taller
```

**Salida esperada:**

```
/home/sandra/mi-taller
├── .env
├── docs
│   └── README.md
├── scripts
│   └── ejecutar.sh
└── src
    └── saludo.php

3 directories, 4 files
```

**Comando 2:** Verificar permisos del script

```bash
ls -l ~/mi-taller/scripts/ejecutar.sh
```

**Salida esperada:**

```
-rwxr-xr-x 1 sandra sandra 85 Apr  2 10:00 ejecutar.sh
```

**Comando 3:** Ejecutar PHP desde la terminal

```bash
php ~/mi-taller/src/saludo.php
```

**Salida esperada:**

```
=== mi-taller ===
Entorno: desarrollo
Hola desde WSL, el taller está listo!
```

**Verificación visual en VS Code:** El indicador verde en la esquina inferior izquierda debe decir `WSL: Ubuntu`.

---

## ¿Qué aprendiste en este módulo?

| Tema | Habilidad                                                  |
|------|------------------------------------------------------------|
| 1    | Instalar y configurar WSL con Ubuntu                       |
| 2    | Leer el prompt y usar los primeros comandos               |
| 3    | Navegar el sistema de archivos con `pwd`, `ls`, `cd`      |
| 4    | Crear, copiar, mover y eliminar archivos                  |
| 5    | Leer y modificar permisos con `chmod`                     |
| 6    | Instalar software con `apt`, usar variables y zsh         |
| 7    | Abrir proyectos de WSL en VS Code con `code .`           |
| 8    | Integrar todo en un proyecto real                         |
