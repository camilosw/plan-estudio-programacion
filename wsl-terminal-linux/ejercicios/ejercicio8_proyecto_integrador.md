# Ejercicio 8: Proyecto integrador — Todo junto

## Objetivo

Construir un proyecto completo desde cero combinando todos los conocimientos del módulo: estructura de carpetas, permisos, variables de entorno, instalación de paquetes, control de versiones con Git y apertura en VS Code.

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

```bash
chmod +x scripts/ejecutar.sh
ls -l scripts/ejecutar.sh
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

### Paso 6: Cargar las variables de entorno

```bash
export $(cat .env | xargs)
echo "Proyecto: $PROYECTO_NOMBRE"
echo "Entorno: $ENTORNO"
```

**Salida esperada:**

```
Proyecto: mi-taller
Entorno: desarrollo
```

### Paso 7: Inicializar Git y hacer el primer commit

```bash
git init
git config user.name "Sandra"
git config user.email "sandra@ejemplo.com"
```

Crear `.gitignore` para excluir `.env`:

```bash
echo '.env' > .gitignore
```

Hacer el primer commit:

```bash
git add .
git status
```

Verifica que `.env` NO aparece en la lista de archivos a commitear.

```bash
git commit -m "Agrega estructura inicial del proyecto mi-taller"
```

### Paso 8: Agregar más contenido y hacer un segundo commit

```bash
echo "## Uso" >> docs/README.md
echo "Ejecuta \`scripts/ejecutar.sh\` para correr el proyecto." >> docs/README.md
```

```bash
git add docs/README.md
git commit -m "Agrega instrucciones de uso al README"
```

### Paso 9: Verificar el historial de Git

```bash
git log --oneline
```

**Salida esperada:**

```
b2c3d4e Agrega instrucciones de uso al README
a1b2c3d Agrega estructura inicial del proyecto mi-taller
```

### Paso 10: Abrir en VS Code

```bash
code .
```

Desde la terminal integrada de VS Code, verifica que todo funciona:

```bash
php src/saludo.php
```

```bash
git log --oneline
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
├── .gitignore
├── docs
│   └── README.md
├── scripts
│   └── ejecutar.sh
└── src
    └── saludo.php

3 directories, 5 files
```

**Comando 2:** Verificar permisos del script

```bash
ls -l ~/mi-taller/scripts/ejecutar.sh
```

**Salida esperada:**

```
-rwxr-xr-x 1 sandra sandra 85 Apr  2 10:00 ejecutar.sh
```

**Comando 3:** Verificar el historial de Git

```bash
cd ~/mi-taller && git log --oneline
```

**Salida esperada:**

```
b2c3d4e Agrega instrucciones de uso al README
a1b2c3d Agrega estructura inicial del proyecto mi-taller
```

**Comando 4:** Ejecutar PHP desde la terminal

```bash
php ~/mi-taller/src/saludo.php
```

**Salida esperada:**

```
Hola desde WSL, el taller está listo!
```

**Comando 5:** Verificar que .env no está en Git

```bash
cd ~/mi-taller && git ls-files
```

**Salida esperada** (`.env` no debe aparecer):

```
.gitignore
docs/README.md
scripts/ejecutar.sh
src/saludo.php
```

**Verificación visual en VS Code:** El indicador verde en la esquina inferior izquierda debe decir `WSL: Ubuntu`.
