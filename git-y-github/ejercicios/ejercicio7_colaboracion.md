# Ejercicio 7: Colaboración en GitHub — Issues y Pull Requests

## Objetivo

Crear un issue en GitHub, resolverlo con una rama y un Pull Request, hacer merge del PR y sincronizar los cambios en tu computadora.

---

## Instrucciones

**Nota:** Este ejercicio asume que ya tenés tu repositorio `mi-proyecto` subido a GitHub (del ejercicio anterior).

### Paso 1: Crear un issue en GitHub

1. Entrá a tu repositorio en GitHub
2. Hacé clic en la pestaña **"Issues"**
3. Hacé clic en **"New issue"**
4. En el título poné: `Agregar archivo de utilidades`
5. En la descripción poné: `Crear un archivo utilidades.php con una función simple`
6. Hacé clic en **"Submit new issue"**

Fijate que el issue tiene el número **#1**.

### Paso 2: Crear una rama para resolver el issue

En la terminal, asegurate de estar en la carpeta `mi-proyecto` y en la rama `main`:

```bash
git checkout main
```

Creá una rama con un nombre que incluya el número del issue:

```bash
git checkout -b issue-1-utilidades
```

### Paso 3: Crear el archivo utilidades.php

Creá un archivo `utilidades.php` con este contenido:

```php
<?php
function saludar($nombre) {
    return "Hola, " . $nombre . "!";
}

echo saludar("Sandra");
?>
```

### Paso 4: Hacer add y commit

```bash
git add utilidades.php
git commit -m "Agrega archivo de utilidades (issue #1)"
```

### Paso 5: Subir la rama a GitHub

```bash
git push -u origin issue-1-utilidades
```

### Paso 6: Crear un Pull Request en GitHub

1. Entrá a tu repositorio en GitHub
2. GitHub debería mostrar un cartel amarillo con la rama que acabás de subir y un botón **"Compare & pull request"**. Hacé clic en él. (Si no aparece, andá a la pestaña "Pull requests" → "New pull request" y seleccioná la rama `issue-1-utilidades`.)
3. En el título poné: `Agrega archivo de utilidades`
4. En la descripción poné: `Resuelve #1`
5. Hacé clic en **"Create pull request"**

La descripción "Resuelve #1" le dice a GitHub que este PR resuelve el issue #1. Cuando se acepte el PR, el issue se cierra automáticamente.

### Paso 7: Hacer merge del Pull Request

1. En la página del Pull Request, hacé clic en **"Merge pull request"**
2. Hacé clic en **"Confirm merge"**

El PR queda como "Merged" y el issue #1 se cierra automáticamente.

### Paso 8: Sincronizar los cambios en tu computadora

Volvé a la rama `main` y traé los cambios:

```bash
git checkout main
git pull
```

---

## Verificación

**Verificación 1 — Issue cerrado:**

En GitHub, andá a la pestaña **"Issues"**. El issue "Agregar archivo de utilidades" debería estar cerrado (aparece tachado o con un ícono violeta). Si hacés clic en "Closed" podés verlo.

**Verificación 2 — PR mergeado:**

En GitHub, andá a la pestaña **"Pull requests"** → **"Closed"**. El PR "Agrega archivo de utilidades" debería aparecer con un ícono violeta que dice "Merged".

**Verificación 3 — Historial local:**

En la terminal, ejecutá:

```bash
git log --oneline
```

**Salida esperada:** Debe mostrar el commit del merge y el commit del archivo de utilidades:

```
c3d4e5f Merge pull request #2 from tu-usuario/issue-1-utilidades
b2c3d4e Agrega archivo de utilidades (issue #1)
...commits anteriores...
```

**Verificación 4 — Archivo presente:**

```bash
ls
```

**Salida esperada:** Debe mostrar `utilidades.php` junto con los otros archivos:

```
hola.php  nuevo.php  utilidades.php  README.md  ...
```
