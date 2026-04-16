# TEMA 4: Manipulación de archivos — Organizar el taller

## OBJETIVO
Crear, copiar, mover y eliminar archivos y carpetas desde la terminal.

## EXPLICACIÓN

### En Linux todo es un archivo

En Linux, casi todo se representa como un archivo: documentos, programas, dispositivos. Desde la terminal puedes crear, leer, copiar, mover y eliminar archivos con comandos simples.

Una advertencia importante: **en Linux no hay papelera de reciclaje**. Cuando eliminas un archivo con `rm`, desaparece para siempre. Sé cuidadosa antes de ejecutar cualquier comando de eliminación.

### mkdir — Crear carpetas

`mkdir` significa "make directory":

```bash
mkdir proyectos
```

Para crear carpetas anidadas de una sola vez, usa `-p`:

```bash
mkdir -p proyectos/mi-app/src
```

```bash
ls proyectos/
```

```
mi-app
```

```bash
ls proyectos/mi-app/
```

```
src
```

### touch — Crear archivos vacíos

```bash
touch notas.txt
```

Si el archivo ya existe, `touch` actualiza su fecha de modificación pero no cambia el contenido.

```bash
ls -l notas.txt
```

```
-rw-r--r-- 1 sandra sandra 0 Apr  2 10:00 notas.txt
```

El tamaño es 0 porque está vacío.

### cat — Ver el contenido de un archivo

```bash
cat notas.txt
```

(No muestra nada porque está vacío)

```bash
cat /etc/os-release
```

```
PRETTY_NAME="Ubuntu 24.04 LTS"
NAME="Ubuntu"
VERSION_ID="24.04"
```

### Escribir en archivos con redirección

El símbolo `>` redirige la salida de un comando hacia un archivo (lo crea o lo sobreescribe):

```bash
echo "# Mi proyecto" > README.md
cat README.md
```

```
# Mi proyecto
```

El símbolo `>>` agrega al final del archivo sin borrar lo que había:

```bash
echo "Este es mi primer proyecto." >> README.md
cat README.md
```

```
# Mi proyecto
Este es mi primer proyecto.
```

**Cuidado con `>`**: si el archivo ya existe, lo sobreescribe completamente sin preguntar.

### cp — Copiar archivos y carpetas

```bash
cp README.md README_copia.md
ls
```

```
README.md  README_copia.md  notas.txt
```

Para copiar una carpeta completa con todo su contenido, usa `-r` (recursive):

```bash
cp -r proyectos/ proyectos_backup/
```

### mv — Mover o renombrar

Mover un archivo a otra carpeta:

```bash
mv notas.txt proyectos/
ls
```

```
README.md  README_copia.md  proyectos/
```

Renombrar un archivo (es la misma operación: mover al mismo lugar con otro nombre):

```bash
mv README_copia.md LEEME.md
ls
```

```
LEEME.md  README.md  proyectos/
```

### rm — Eliminar archivos

```bash
rm LEEME.md
ls
```

```
README.md  proyectos/
```

Para eliminar una carpeta y todo su contenido:

```bash
rm -r proyectos_backup/
```

**Nunca ejecutes `rm -rf /` ni `rm -rf ~`** — eliminaría todo tu sistema o tu carpeta personal sin posibilidad de recuperar nada.

### rmdir — Eliminar carpetas vacías

```bash
rmdir carpeta_vacia/
```

Solo funciona si la carpeta está completamente vacía. Si tiene archivos, usa `rm -r`.

### Wildcards — Comodines

Los wildcards te permiten referirte a varios archivos al mismo tiempo:

| Comodín | Significa                           | Ejemplo                |
|---------|-------------------------------------|------------------------|
| `*`     | Cualquier cantidad de caracteres    | `*.txt` — todos los .txt |
| `?`     | Exactamente un carácter             | `nota?.txt` — nota1.txt, notaA.txt |

```bash
ls *.md
```

```
README.md
```

```bash
rm *.tmp
```

Elimina todos los archivos con extensión `.tmp` en la carpeta actual.

### nano — Editor de texto en la terminal

Para editar archivos directamente en la terminal, `nano` es el editor más sencillo:

```bash
nano README.md
```

Se abre una interfaz de texto. Escribe o edita el contenido. Los atajos aparecen en la parte inferior:

- `Ctrl + O` → Guardar (luego Enter para confirmar el nombre)
- `Ctrl + X` → Salir
- `Ctrl + K` → Cortar línea
- `Ctrl + U` → Pegar línea

### Resumen de comandos

| Comando              | Qué hace                                          |
|----------------------|---------------------------------------------------|
| `mkdir carpeta`      | Crea una carpeta                                  |
| `mkdir -p a/b/c`     | Crea carpetas anidadas                            |
| `touch archivo.txt`  | Crea un archivo vacío                             |
| `cat archivo.txt`    | Muestra el contenido de un archivo               |
| `echo "texto" > f`   | Escribe texto en un archivo (sobreescribe)        |
| `echo "texto" >> f`  | Agrega texto al final de un archivo              |
| `cp origen destino`  | Copia un archivo                                  |
| `cp -r origen dest`  | Copia una carpeta completa                        |
| `mv origen destino`  | Mueve o renombra                                  |
| `rm archivo`         | Elimina un archivo (¡sin papelera!)              |
| `rm -r carpeta`      | Elimina una carpeta y todo su contenido          |
| `nano archivo`       | Abre el editor de texto en la terminal           |
