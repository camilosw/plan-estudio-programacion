# Ejercicio 5: Ramas — Trabajar en paralelo sin miedo

## Objetivo

Crear una rama, hacer cambios en ella, volver a `main` para comprobar que los cambios no están, hacer merge y eliminar la rama.

---

## Instrucciones

**Nota:** Este ejercicio asume que ya tenés un repositorio `mi-proyecto` con al menos un commit (de los ejercicios anteriores). Ejecutá los pasos desde dentro de esa carpeta.

### Paso 1: Verificar que estás en la rama main

```bash
git branch
```

Debería mostrar `* main`. Si no estás en main, ejecutá `git checkout main`.

### Paso 2: Crear una rama nueva y cambiarte a ella

```bash
git checkout -b agregar-archivo
```

Esto crea la rama `agregar-archivo` y te cambia a ella automáticamente.

### Paso 3: Verificar que estás en la rama nueva

```bash
git branch
```

Deberías ver:

```
* agregar-archivo
  main
```

El asterisco (`*`) indica en qué rama estás.

### Paso 4: Crear un archivo nuevo

Creá un archivo `nuevo.php` con este contenido:

```php
<?php
echo "Este archivo fue creado en una rama";
?>
```

### Paso 5: Hacer add y commit del archivo nuevo

```bash
git add nuevo.php
git commit -m "Agrega archivo nuevo.php desde la rama"
```

### Paso 6: Volver a la rama main

```bash
git checkout main
```

### Paso 7: Verificar que nuevo.php NO existe en main

```bash
ls
```

El archivo `nuevo.php` **no** debería aparecer en la lista. Solo existe en la rama `agregar-archivo`.

### Paso 8: Hacer merge de la rama

```bash
git merge agregar-archivo
```

Esto trae los cambios de la rama `agregar-archivo` a `main`.

### Paso 9: Verificar que nuevo.php ahora SÍ existe

```bash
ls
```

Ahora `nuevo.php` debería aparecer en la lista.

### Paso 10: Eliminar la rama

Ya no la necesitamos, así que la borramos:

```bash
git branch -d agregar-archivo
```

---

## Verificación

Ejecutá estos comandos y compará con la salida esperada:

**Comando 1:**

```bash
git log --oneline
```

**Salida esperada:** Debe mostrar el commit que hiciste en la rama, junto con los commits anteriores. Por ejemplo:

```
f1a2b3c Agrega archivo nuevo.php desde la rama
...commits anteriores...
```

**Comando 2:**

```bash
ls
```

**Salida esperada:** Debe mostrar `nuevo.php` junto con los otros archivos del proyecto:

```
hola.php  nuevo.php  ...
```

**Comando 3:**

```bash
git branch
```

**Salida esperada:** Solo debe quedar la rama `main`:

```
* main
```

Si la rama `agregar-archivo` todavía aparece, ejecutá `git branch -d agregar-archivo` para eliminarla.
