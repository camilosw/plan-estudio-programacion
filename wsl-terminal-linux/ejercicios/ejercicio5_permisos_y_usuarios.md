# Ejercicio 5: Permisos y usuarios — Candados y llaves

## Objetivo

Leer y modificar permisos de archivos usando `ls -l` y `chmod`, entender qué significa cada parte de la salida y usar `sudo` correctamente.

---

## Instrucciones

### Paso 1: Ver tus permisos actuales

```bash
cd ~
ls -l
```

Observa la primera columna de cada línea. Para un archivo normal verás algo como `-rw-r--r--` y para una carpeta `drwxr-xr-x`.

¿Qué permisos tiene tu carpeta `proyecto-cafeteria`?

### Paso 2: Crear un script de prueba

```bash
cd ~
nano saludo.sh
```

Escribe este contenido:

```bash
#!/bin/bash
echo "Hola! Este script funciona."
```

Guarda con `Ctrl+O` → Enter, sal con `Ctrl+X`.

### Paso 3: Intentar ejecutar el script (fallará)

```bash
./saludo.sh
```

**Salida esperada:**

```
bash: ./saludo.sh: Permission denied
```

El script no tiene permisos de ejecución. Verifícalo:

```bash
ls -l saludo.sh
```

```
-rw-r--r-- 1 sandra sandra 40 Apr  2 10:00 saludo.sh
```

Los tres guiones `r--` del usuario confirman que no tiene `x` (ejecución).

### Paso 4: Agregar permiso de ejecución

```bash
chmod u+x saludo.sh
ls -l saludo.sh
```

**Salida esperada:**

```
-rwxr--r-- 1 sandra sandra 40 Apr  2 10:00 saludo.sh
```

Ahora el dueño tiene `rwx`.

### Paso 5: Ejecutar el script

```bash
./saludo.sh
```

**Salida esperada:**

```
Hola! Este script funciona.
```

### Paso 6: Practicar diferentes combinaciones de chmod

```bash
# Quitar permiso de escritura al dueño
chmod u-w saludo.sh
ls -l saludo.sh
```

```
-r-xr--r-- 1 sandra sandra 40 Apr  2 10:00 saludo.sh
```

```bash
# Intentar editar (fallará porque no hay permiso de escritura)
echo "nueva linea" >> saludo.sh
```

```
bash: saludo.sh: Permission denied
```

```bash
# Restaurar permisos normales
chmod 644 saludo.sh
ls -l saludo.sh
```

```
-rw-r--r-- 1 sandra sandra 40 Apr  2 10:00 saludo.sh
```

### Paso 7: Practicar con notación numérica

Crea un archivo y configura permisos típicos:

```bash
touch config.txt
chmod 600 config.txt
ls -l config.txt
```

**Salida esperada:**

```
-rw------- 1 sandra sandra 0 Apr  2 10:00 config.txt
```

Solo el dueño puede leer y escribir. Los demás no tienen acceso.

```bash
chmod 755 saludo.sh
ls -l saludo.sh
```

**Salida esperada:**

```
-rwxr-xr-x 1 sandra sandra 40 Apr  2 10:00 saludo.sh
```

Permisos típicos para un script ejecutable.

### Paso 8: Ver tu identidad de usuario

```bash
id
```

Observa tu uid, gid y los grupos a los que perteneces. ¿Estás en el grupo `sudo`?

### Paso 9: Usar sudo

```bash
sudo ls /root
```

Ingresa tu contraseña cuando se la pida.

```bash
# Ver quién puede usar sudo en este sistema
cat /etc/sudoers | head -20
```

---

## Verificación

**Comando 1:** Verificar que el script tiene permisos de ejecución

```bash
ls -l ~/saludo.sh
```

**Salida esperada:**

```
-rwxr-xr-x 1 sandra sandra 40 Apr  2 10:00 saludo.sh
```

**Comando 2:** Ejecutar el script

```bash
~/saludo.sh
```

**Salida esperada:**

```
Hola! Este script funciona.
```

**Comando 3:** Verificar permisos del archivo de configuración

```bash
ls -l ~/config.txt
```

**Salida esperada:**

```
-rw------- 1 sandra sandra 0 Apr  2 10:00 config.txt
```

**Pregunta de reflexión:** ¿Por qué tiene sentido que `config.txt` tenga permisos 600? ¿Qué tipo de información guardarías en un archivo con esos permisos?
