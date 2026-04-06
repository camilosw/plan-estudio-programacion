# Ejercicio 3: Navegación de archivos — Explorando el taller

## Objetivo

Navegar el sistema de archivos de Linux con confianza usando `pwd`, `ls` y `cd`, explorando tanto tu carpeta personal como el árbol completo.

---

## Instrucciones

### Paso 1: Ver dónde empiezas

Cuando abres Ubuntu, siempre empiezas en tu carpeta personal. Confírmalo:

```bash
pwd
```

### Paso 2: Listar el contenido de tu carpeta

```bash
ls
```

```bash
ls -l
```

```bash
ls -la
```

Observa la diferencia entre los tres comandos. ¿Qué agrega cada opción?

### Paso 3: Explorar las carpetas ocultas

Los archivos que empiezan con `.` son ocultos. Con `ls -la` puedes verlos:

```bash
ls -la
```

Identifica en la lista:
- `.bashrc` — configuración de bash
- `.bash_logout` — comandos que se ejecutan al cerrar la terminal
- `.` — la carpeta actual
- `..` — la carpeta padre

### Paso 4: Subir y bajar en el árbol

Sube a la carpeta `/home`:

```bash
cd ..
pwd
```

Sube otra vez, a la raíz `/`:

```bash
cd ..
pwd
```

Lista el contenido de la raíz:

```bash
ls
```

Identifica las carpetas principales: `home`, `etc`, `usr`, `tmp`, `mnt`.

### Paso 5: Usar rutas absolutas

Desde cualquier lugar, ve directamente a tu carpeta personal usando la ruta absoluta:

```bash
cd /home/sandra
pwd
```

### Paso 6: Usar el atajo ~

El símbolo `~` siempre apunta a tu carpeta personal:

```bash
cd /etc
pwd
cd ~
pwd
```

### Paso 7: Explorar /mnt/c (el disco de Windows)

```bash
ls /mnt/c/
```

```bash
ls /mnt/c/Users/
```

¿Puedes ver tu carpeta de usuario de Windows?

### Paso 8: Crear carpetas para practicar y navegar

```bash
cd ~
mkdir practica-navegacion
cd practica-navegacion
mkdir carpeta-a
mkdir carpeta-b
mkdir carpeta-a/subcarpeta
pwd
```

Ahora navega usando rutas relativas:

```bash
cd carpeta-a
pwd
cd subcarpeta
pwd
cd ../..
pwd
```

---

## Verificación

**Comando 1:** Confirmar que estás en tu carpeta personal

```bash
pwd
```

**Salida esperada:**

```
/home/sandra
```

**Comando 2:** Ver el contenido con detalles

```bash
ls -l ~
```

**Salida esperada** (debe mostrar al menos la carpeta que creaste):

```
total 4
drwxr-xr-x 3 sandra sandra 4096 Apr  2 10:00 practica-navegacion
```

**Comando 3:** Navegar con ruta absoluta y relativa

```bash
cd /home/sandra/practica-navegacion/carpeta-a/subcarpeta && pwd
```

**Salida esperada:**

```
/home/sandra/practica-navegacion/carpeta-a/subcarpeta
```

**Comando 4:** Volver a casa con ~

```bash
cd ~ && pwd
```

**Salida esperada:**

```
/home/sandra
```
