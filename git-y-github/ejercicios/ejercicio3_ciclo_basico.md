# Ejercicio 3: El ciclo básico — add, commit, status

## Objetivo

Practicar el flujo fundamental de Git: preparar archivos con `git add` y guardarlos en el historial con `git commit`. Al terminar vas a tener 2 commits.

---

## Instrucciones

Asegurate de estar dentro de la carpeta `mi-proyecto` del ejercicio anterior.

### Paso 1: Agregar hola.php al área de preparación

```bash
git add hola.php
```

### Paso 2: Verificar que el archivo está preparado

```bash
git status
```

Debería aparecer `hola.php` bajo "Changes to be committed" (en verde si tu terminal tiene colores).

### Paso 3: Hacer el primer commit

```bash
git commit -m "Agrega archivo hola.php con saludo inicial"
```

### Paso 4: Verificar que todo está limpio

```bash
git status
```

Debería decir "nothing to commit, working tree clean".

### Paso 5: Modificar hola.php

Abrí `hola.php` con un editor de texto y cambiá su contenido para que quede así:

```php
<?php
echo "Hola mundo";
echo "Chau mundo";
?>
```

O ejecutá este comando:

```bash
echo '<?php echo "Hola mundo"; echo "Chau mundo"; ?>' > hola.php
```

### Paso 6: Revisar el estado

```bash
git status
```

Debería mostrar `hola.php` como "modified" (modificado).

### Paso 7: Agregar y hacer el segundo commit

```bash
git add hola.php
git commit -m "Agrega segunda linea con despedida"
```

---

## Verificación

Ejecutá este comando y compará con la salida esperada:

**Comando:**

```bash
git log --oneline
```

**Salida esperada:** Deben aparecer exactamente 2 commits (los códigos al inicio van a ser diferentes en tu caso):

```
b2c3d4e Agrega segunda linea con despedida
a1b2c3d Agrega archivo hola.php con saludo inicial
```

Lo importante es que aparezcan 2 líneas, cada una con el mensaje del commit correspondiente. El commit más reciente aparece arriba.
