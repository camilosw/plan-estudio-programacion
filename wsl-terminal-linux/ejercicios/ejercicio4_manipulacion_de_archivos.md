# Ejercicio 4: Manipulación de archivos — Organizar el taller

## Objetivo

Crear, copiar, mover, renombrar y eliminar archivos y carpetas usando la terminal. Al terminar tendrás una estructura de proyecto organizada.

---

## Instrucciones

### Paso 1: Crear la estructura del proyecto

```bash
cd ~
mkdir -p proyecto-cafeteria/menu proyecto-cafeteria/imagenes proyecto-cafeteria/docs
cd proyecto-cafeteria
```

Verifica la estructura:

```bash
ls
```

```
docs  imagenes  menu
```

### Paso 2: Crear archivos

```bash
touch menu/bebidas.txt
touch menu/comidas.txt
touch docs/README.md
```

Verifica:

```bash
ls menu/
```

```
bebidas.txt  comidas.txt
```

### Paso 3: Escribir contenido en los archivos

```bash
echo "Café americano" > menu/bebidas.txt
echo "Cappuccino" >> menu/bebidas.txt
echo "Té verde" >> menu/bebidas.txt
```

```bash
echo "Tostada con mantequilla" > menu/comidas.txt
echo "Croissant" >> menu/comidas.txt
```

```bash
echo "# La Cafetería de Sandra" > docs/README.md
echo "Bienvenida a la cafetería." >> docs/README.md
```

### Paso 4: Leer el contenido

```bash
cat menu/bebidas.txt
```

```bash
cat menu/comidas.txt
```

```bash
cat docs/README.md
```

### Paso 5: Copiar un archivo

Crea una copia de seguridad del menú de bebidas:

```bash
cp menu/bebidas.txt menu/bebidas_backup.txt
ls menu/
```

```
bebidas.txt  bebidas_backup.txt  comidas.txt
```

### Paso 6: Renombrar un archivo

Renombra `bebidas_backup.txt` a `bebidas_v1.txt`:

```bash
mv menu/bebidas_backup.txt menu/bebidas_v1.txt
ls menu/
```

```
bebidas.txt  bebidas_v1.txt  comidas.txt
```

### Paso 7: Mover un archivo a otra carpeta

Mueve el README desde `docs/` a la raíz del proyecto:

```bash
mv docs/README.md .
ls
```

```
README.md  docs  imagenes  menu
```

```bash
ls docs/
```

(Vacío — el archivo ya no está ahí)

### Paso 8: Usar nano para editar un archivo

```bash
nano README.md
```

Agrega una línea al final:
```
Proyecto de práctica del módulo WSL.
```

Guarda con `Ctrl+O` → Enter, y sal con `Ctrl+X`.

Verifica:

```bash
cat README.md
```

### Paso 9: Eliminar archivos y carpetas

Elimina el archivo de versión anterior:

```bash
rm menu/bebidas_v1.txt
ls menu/
```

```
bebidas.txt  comidas.txt
```

Elimina la carpeta `imagenes` (está vacía):

```bash
rmdir imagenes
ls
```

```
README.md  docs  menu
```

### Paso 10: Usar wildcards

Crea varios archivos de prueba:

```bash
touch prueba1.tmp prueba2.tmp prueba3.tmp
ls *.tmp
```

```
prueba1.tmp  prueba2.tmp  prueba3.tmp
```

Elimínalos todos a la vez:

```bash
rm *.tmp
ls *.tmp
```

```
ls: cannot access '*.tmp': No such file or directory
```

---

## Verificación

**Comando 1:** Ver la estructura final del proyecto

```bash
ls -R ~/proyecto-cafeteria
```

**Salida esperada:**

```
/home/sandra/proyecto-cafeteria:
README.md  docs  menu

/home/sandra/proyecto-cafeteria/docs:

/home/sandra/proyecto-cafeteria/menu:
bebidas.txt  comidas.txt
```

**Comando 2:** Ver el contenido del menú de bebidas

```bash
cat ~/proyecto-cafeteria/menu/bebidas.txt
```

**Salida esperada:**

```
Café americano
Cappuccino
Té verde
```

**Comando 3:** Confirmar que los archivos .tmp no existen

```bash
ls ~/proyecto-cafeteria/*.tmp 2>/dev/null || echo "No hay archivos .tmp"
```

**Salida esperada:**

```
No hay archivos .tmp
```
