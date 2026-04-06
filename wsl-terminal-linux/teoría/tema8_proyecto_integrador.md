=========================================================
TEMA 8: Proyecto integrador — Todo junto
=========================================================

OBJETIVO
--------
Combinar todos los conocimientos del módulo en un proyecto real: estructura de carpetas, permisos, variables de entorno, instalación de paquetes, zsh y VS Code.

EXPLICACIÓN
-----------

### Lo que construirás

Crearás un proyecto llamado `mi-taller` con la siguiente estructura:

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

Al finalizar, el proyecto estará abierto en VS Code, bajo control de Git, y podrás ejecutarlo todo desde la terminal.

### Paso a paso

#### 1. Crear la estructura de carpetas

```bash
cd ~
mkdir -p mi-taller/src mi-taller/scripts mi-taller/docs
cd mi-taller
```

#### 2. Crear los archivos del proyecto

```bash
# Archivo PHP
echo '<?php echo "Hola desde WSL, el taller está listo!" . PHP_EOL;' > src/saludo.php

# Script bash
cat > scripts/ejecutar.sh << 'EOF'
#!/bin/bash
echo "=== Ejecutando el proyecto mi-taller ==="
php ../src/saludo.php
echo "=== Listo ==="
EOF

# README
cat > docs/README.md << 'EOF'
# Mi Taller

Proyecto de práctica del módulo WSL y Terminal Linux.

## Estructura

- `src/` — código fuente
- `scripts/` — scripts de automatización
- `docs/` — documentación
EOF

# Variables de entorno del proyecto
echo 'PROYECTO_NOMBRE=mi-taller' > .env
echo 'ENTORNO=desarrollo' >> .env
```

#### 3. Verificar la estructura

Instala `tree` si no lo tienes:

```bash
sudo apt install tree
```

```bash
tree .
```

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

#### 4. Configurar permisos

El script necesita permisos de ejecución:

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

#### 5. Ejecutar el script

```bash
cd scripts
./ejecutar.sh
```

```
=== Ejecutando el proyecto mi-taller ===
Hola desde WSL, el taller está listo!
=== Listo ===
```

```bash
cd ..
```

#### 6. Cargar y usar variables de entorno

```bash
# Leer el archivo .env y exportar las variables
export $(cat .env | xargs)

# Verificar
echo $PROYECTO_NOMBRE
```

```
mi-taller
```

```bash
echo $ENTORNO
```

```
desarrollo
```

#### 7. Inicializar Git

```bash
git init
git config user.name "Sandra"
git config user.email "sandra@ejemplo.com"
```

```
Initialized empty Git repository in /home/sandra/mi-taller/.git/
```

Crear un `.gitignore` para no versionar el archivo `.env`:

```bash
echo '.env' > .gitignore
```

Hacer el primer commit:

```bash
git add .
git status
```

```
On branch main

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
        new file:   .gitignore
        new file:   docs/README.md
        new file:   scripts/ejecutar.sh
        new file:   src/saludo.php
```

```bash
git commit -m "Agrega estructura inicial del proyecto mi-taller"
```

```
[main (root-commit) a1b2c3d] Agrega estructura inicial del proyecto mi-taller
 4 files changed, 12 insertions(+)
```

#### 8. Abrir en VS Code

```bash
code .
```

VS Code se abre con el proyecto. Verifica que en la esquina inferior izquierda diga `WSL: Ubuntu`.

Abre la terminal integrada de VS Code (Ctrl+\`) y ejecuta:

```bash
php src/saludo.php
```

```
Hola desde WSL, el taller está listo!
```

#### 9. Verificación final

```bash
# Ver la estructura completa
tree .

# Ver los permisos de cada archivo
ls -la src/ scripts/ docs/

# Ver el historial de Git
git log --oneline

# Confirmar que PHP funciona
php src/saludo.php

# Confirmar la variable de entorno
echo $PROYECTO_NOMBRE
```

Salida esperada de `git log --oneline`:

```
a1b2c3d Agrega estructura inicial del proyecto mi-taller
```

### ¿Qué aprendiste en este módulo?

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
