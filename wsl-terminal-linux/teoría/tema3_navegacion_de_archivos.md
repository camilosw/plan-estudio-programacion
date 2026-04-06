=========================================================
TEMA 3: Navegación de archivos — Las estanterías del taller
=========================================================

OBJETIVO
--------
Moverte por el sistema de archivos de Linux con confianza usando `pwd`, `ls` y `cd`, y entender la diferencia entre rutas absolutas y relativas.

EXPLICACIÓN
-----------

### El árbol de directorios

El sistema de archivos de Linux es como un árbol boca abajo. La raíz (`/`) es el tronco del que cuelga todo. De la raíz cuelgan las carpetas principales, y de cada carpeta cuelgan más carpetas y archivos.

Piénsalo como las estanterías de tu taller: hay una estantería principal (la raíz), y dentro de ella hay cajones y repisas organizados por tipo de contenido.

Las carpetas más importantes de Linux:

| Carpeta    | Para qué sirve                                              |
|------------|-------------------------------------------------------------|
| `/`        | La raíz — el punto de partida de todo                      |
| `/home`    | Carpetas personales de los usuarios                         |
| `/home/tu-usuario` | Tu espacio personal (equivale a "Mis documentos" en Windows) |
| `/etc`     | Archivos de configuración del sistema                       |
| `/usr`     | Programas instalados                                        |
| `/tmp`     | Archivos temporales (se borran al reiniciar)                |
| `/mnt`     | Puntos de montaje (aquí aparecen los discos de Windows)     |

### pwd — ¿Dónde estoy?

`pwd` significa "print working directory" (imprimir el directorio de trabajo). Te dice exactamente en qué carpeta estás:

```bash
pwd
```

```
/home/sandra
```

Siempre que no sepas dónde estás, ejecuta `pwd`.

### ls — ¿Qué hay aquí?

`ls` lista el contenido de la carpeta actual:

```bash
ls
```

```
proyectos  descargas  documentos
```

Con opciones adicionales ves más información:

```bash
ls -l
```

```
total 12
drwxr-xr-x 2 sandra sandra 4096 Apr  2 10:00 descargas
drwxr-xr-x 2 sandra sandra 4096 Apr  2 10:00 documentos
drwxr-xr-x 2 sandra sandra 4096 Apr  2 10:00 proyectos
```

```bash
ls -la
```

```
total 32
drwxr-xr-x 5 sandra sandra 4096 Apr  2 10:00 .
drwxr-xr-x 4 root   root   4096 Apr  2 09:00 ..
-rw-r--r-- 1 sandra sandra  220 Apr  2 09:00 .bash_logout
-rw-r--r-- 1 sandra sandra 3526 Apr  2 09:00 .bashrc
drwxr-xr-x 2 sandra sandra 4096 Apr  2 10:00 descargas
drwxr-xr-x 2 sandra sandra 4096 Apr  2 10:00 documentos
drwxr-xr-x 2 sandra sandra 4096 Apr  2 10:00 proyectos
```

La opción `-a` incluye los archivos ocultos (los que empiezan con `.`).

Para ver una carpeta específica sin entrar en ella:

```bash
ls /etc
```

### cd — Cambiar de carpeta

`cd` significa "change directory":

```bash
cd proyectos
```

El prompt cambia para reflejar la nueva ubicación:

```
sandra@DESKTOP-ABC123:~/proyectos$
```

Para volver a la carpeta anterior (un nivel arriba):

```bash
cd ..
```

```
sandra@DESKTOP-ABC123:~$
```

Para ir directamente a tu carpeta personal desde cualquier lugar:

```bash
cd ~
```

O simplemente:

```bash
cd
```

Para ir a la raíz:

```bash
cd /
```

Para ir a una carpeta escribiendo su ruta completa:

```bash
cd /home/sandra/proyectos
```

### Rutas absolutas vs relativas

Hay dos formas de indicar una ubicación:

**Ruta absoluta:** empieza con `/` y describe la ubicación completa desde la raíz:

```bash
cd /home/sandra/proyectos
```

Funciona desde cualquier lugar. Es como dar la dirección completa de un lugar.

**Ruta relativa:** describe la ubicación a partir de donde estás ahora:

```bash
cd proyectos
```

Esto funciona solo si ya estás en `/home/sandra`. Es como decir "dobla a la derecha" — depende de dónde estés.

### Atajos de ruta

| Atajo | Significado                              |
|-------|------------------------------------------|
| `~`   | Tu carpeta personal (`/home/tu-usuario`) |
| `.`   | La carpeta donde estás ahora             |
| `..`  | La carpeta padre (un nivel arriba)       |

Ejemplos:

```bash
cd ~/proyectos        # Ir a /home/sandra/proyectos
cd ../documentos      # Subir un nivel y entrar a "documentos"
ls .                  # Listar la carpeta actual
ls ..                 # Listar la carpeta padre
```

### Navegar con Tab (autocompletado)

Si escribes parte del nombre de una carpeta y presionas Tab, la terminal completa automáticamente:

```bash
cd pro[Tab]
```

Se convierte en:

```bash
cd proyectos/
```

Si hay varias opciones que empiezan igual, presiona Tab dos veces para verlas todas.

### Ver la estructura completa con tree

El comando `tree` muestra la estructura de carpetas de forma visual (puede que necesites instalarlo, lo veremos en el tema 6):

```bash
tree ~/proyectos
```

```
/home/sandra/proyectos
├── mi-app
│   ├── index.php
│   └── estilos.css
└── practicas
    └── hola.php

2 directories, 3 files
```
