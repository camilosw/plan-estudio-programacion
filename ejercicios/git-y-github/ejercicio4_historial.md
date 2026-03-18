# Ejercicio 4: Historial y navegación — log, diff, gitignore

## Objetivo

Aprender a ver el historial de commits, comparar cambios antes de commitear y configurar Git para que ignore archivos innecesarios. Al terminar vas a tener 4 commits.

---

## Instrucciones

Asegurate de estar dentro de la carpeta `mi-proyecto` con los 2 commits del ejercicio anterior.

### Paso 1: Modificar hola.php para agregar una tercera línea

Abrí `hola.php` y modificalo para que quede así:

```php
<?php
echo "Hola mundo";
echo "Chau mundo";
echo "Version 3";
?>
```

O ejecutá este comando:

```bash
echo '<?php echo "Hola mundo"; echo "Chau mundo"; echo "Version 3"; ?>' > hola.php
```

### Paso 2: Ver los cambios antes de hacer add

Este comando muestra exactamente qué cambió en los archivos:

```bash
git diff
```

Vas a ver las líneas con `-` (lo que se eliminó) y `+` (lo que se agregó). Esto es muy útil para revisar tus cambios antes de guardarlos.

### Paso 3: Hacer add y commit

```bash
git add hola.php
git commit -m "Agrega tercera linea con version 3"
```

### Paso 4: Ver el historial compacto

```bash
git log --oneline
```

Deberían aparecer 3 commits.

### Paso 5: Crear el archivo .gitignore

El archivo `.gitignore` le dice a Git qué archivos debe ignorar. Crealo con el siguiente contenido:

```bash
echo "*.log" > .gitignore
echo "*.tmp" >> .gitignore
```

Esto le dice a Git que ignore todos los archivos que terminen en `.log` y `.tmp`.

### Paso 6: Hacer add y commit del .gitignore

```bash
git add .gitignore
git commit -m "Agrega .gitignore para ignorar archivos log y tmp"
```

---

## Verificación

Ejecutá estos comandos y compará con la salida esperada:

**Comando 1:**

```bash
git log --oneline
```

**Salida esperada:** Deben aparecer 4 commits (los códigos van a ser diferentes en tu caso):

```
f4e5d6c Agrega .gitignore para ignorar archivos log y tmp
c3d4e5f Agrega tercera linea con version 3
b2c3d4e Agrega segunda linea con despedida
a1b2c3d Agrega archivo hola.php con saludo inicial
```

Lo importante es que aparezcan 4 líneas con sus respectivos mensajes.

**Comando 2:** Verificar que .gitignore funciona creando un archivo de prueba:

```bash
echo "esto es un log de prueba" > test.log
git status
```

**Salida esperada:**

```
On branch main
nothing to commit, working tree clean
```

El archivo `test.log` no debería aparecer en `git status` porque `.gitignore` le dice a Git que lo ignore. Si apareciera sin el `.gitignore`, estaría listado como "Untracked files".
