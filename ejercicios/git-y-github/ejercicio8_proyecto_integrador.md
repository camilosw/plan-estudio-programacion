# Ejercicio 8: Proyecto integrador — Todo junto

## Objetivo

Crear un proyecto desde cero aplicando todo lo aprendido: repositorio local, commits, .gitignore, GitHub, README, issue, rama, Pull Request y merge.

---

## Instrucciones

### PASO 1: Crear la carpeta del proyecto e inicializar Git

```bash
mkdir proyecto-final
cd proyecto-final
git init
```

### PASO 2: Crear el archivo inicio.php y hacer commit

Creá un archivo `inicio.php` con este contenido:

```php
<?php
echo "Bienvenido al proyecto final";
?>
```

Hacé add y commit:

```bash
git add inicio.php
git commit -m "Agrega archivo inicio.php con mensaje de bienvenida"
```

### PASO 3: Crear el archivo funciones.php y hacer commit

Creá un archivo `funciones.php` con este contenido:

```php
<?php
function sumar($a, $b) {
    return $a + $b;
}

echo "3 + 5 = " . sumar(3, 5);
?>
```

Hacé add y commit:

```bash
git add funciones.php
git commit -m "Agrega funciones.php con función sumar"
```

### PASO 4: Crear .gitignore y hacer commit

Creá un archivo `.gitignore` con este contenido:

```
*.log
*.tmp
```

Hacé add y commit:

```bash
git add .gitignore
git commit -m "Agrega .gitignore para ignorar archivos log y tmp"
```

### PASO 5: Crear un repositorio en GitHub y subir el código

1. En GitHub, hacé clic en **"+"** → **"New repository"**
2. Nombre: `proyecto-final`
3. Dejalo como **Public**
4. **No** marques "Add a README file"
5. Hacé clic en **"Create repository"**

En la terminal, conectá el repositorio local con GitHub y subí el código:

```bash
git remote add origin https://github.com/tu-usuario/proyecto-final.git
git push -u origin main
```

(Si usás SSH, reemplazá la URL por `git@github.com:tu-usuario/proyecto-final.git`)

### PASO 6: Crear README.md, hacer commit y push

Creá un archivo `README.md` con este contenido:

```markdown
# Proyecto Final

Proyecto integrador del módulo de Git y GitHub.
Incluye archivos PHP de ejemplo y utilidades.
```

Hacé add, commit y push:

```bash
git add README.md
git commit -m "Agrega README con descripción del proyecto"
git push
```

### PASO 7: Crear un issue en GitHub

1. En tu repositorio en GitHub, andá a la pestaña **"Issues"**
2. Hacé clic en **"New issue"**
3. Título: `Agregar archivo de utilidades`
4. Descripción: `Crear un archivo utilidades.php con funciones auxiliares`
5. Hacé clic en **"Submit new issue"**

Anotá el número del issue (debería ser **#1**).

### PASO 8: Crear una rama, agregar utilidades.php, hacer commit y push

En la terminal:

```bash
git checkout -b issue-1-utilidades
```

Creá un archivo `utilidades.php` con este contenido:

```php
<?php
function mostrarFecha() {
    return date("d/m/Y");
}

echo "Hoy es: " . mostrarFecha();
?>
```

Hacé add, commit y push de la rama:

```bash
git add utilidades.php
git commit -m "Agrega utilidades.php con función mostrarFecha (issue #1)"
git push -u origin issue-1-utilidades
```

### PASO 9: Crear un Pull Request en GitHub

1. En GitHub, debería aparecer un cartel amarillo con la rama que acabás de subir. Hacé clic en **"Compare & pull request"**.
2. Título: `Agrega archivo de utilidades`
3. Descripción: `Resuelve #1`
4. Hacé clic en **"Create pull request"**

### PASO 10: Hacer merge del Pull Request

1. En la página del Pull Request, hacé clic en **"Merge pull request"**
2. Hacé clic en **"Confirm merge"**

El issue #1 se cierra automáticamente gracias al "Resuelve #1" en la descripción.

### PASO 11: Volver a main y traer los cambios

En la terminal:

```bash
git checkout main
git pull
```

---

## Verificación

Comprobá que todo quedó bien con estas verificaciones:

**Verificación 1 — Archivos en GitHub:**

Entrá a `https://github.com/tu-usuario/proyecto-final` y verificá que aparecen estos archivos:
- `inicio.php`
- `funciones.php`
- `.gitignore`
- `README.md`
- `utilidades.php`

El contenido del README se muestra debajo de la lista de archivos.

**Verificación 2 — Issue cerrado:**

En la pestaña **"Issues"** de GitHub, hacé clic en **"Closed"**. Debe aparecer el issue "Agregar archivo de utilidades" como cerrado.

**Verificación 3 — Pull Request mergeado:**

En la pestaña **"Pull requests"** → **"Closed"**. Debe aparecer el PR "Agrega archivo de utilidades" con un ícono violeta que dice "Merged".

**Verificación 4 — Historial local:**

En la terminal, ejecutá:

```bash
git log --oneline
```

**Salida esperada:** Debe mostrar todos los commits del proyecto:

```
g7h8i9j Merge pull request #2 from tu-usuario/issue-1-utilidades
f6g7h8i Agrega utilidades.php con función mostrarFecha (issue #1)
e5f6g7h Agrega README con descripción del proyecto
d4e5f6g Agrega .gitignore para ignorar archivos log y tmp
c3d4e5f Agrega funciones.php con función sumar
b2c3d4e Agrega archivo inicio.php con mensaje de bienvenida
```

(Los códigos al principio de cada línea van a ser diferentes en tu computadora.)

**Verificación 5 — Archivos locales:**

```bash
ls
```

**Salida esperada:**

```
funciones.php  inicio.php  README.md  utilidades.php
```

(El archivo `.gitignore` no aparece con `ls` porque es un archivo oculto. Podés verlo con `ls -a`.)
