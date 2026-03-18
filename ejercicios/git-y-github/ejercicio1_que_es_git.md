# Ejercicio 1: Qué es Git — Instalación y configuración

## Objetivo

Instalar Git en tu computadora, configurar tu nombre y email, y verificar que todo quedó bien.

---

## Instrucciones

### Paso 1: Verificar si Git está instalado

Abrí la terminal y ejecutá:

```bash
git --version
```

Si aparece un número de versión (por ejemplo `git version 2.43.0`), ya lo tenés instalado. Si da error, hay que instalarlo:

- **Windows**: descargá el instalador desde https://git-scm.com/download/win y seguí los pasos
- **Mac**: ejecutá `xcode-select --install` en la terminal
- **Linux**: ejecutá `sudo apt install git` (Ubuntu/Debian) o `sudo dnf install git` (Fedora)

### Paso 2: Configurar tu nombre

Este nombre va a aparecer en cada commit que hagas. Ejecutá este comando reemplazando con tu nombre real:

```bash
git config --global user.name "Sandra"
```

### Paso 3: Configurar tu email

Ejecutá este comando reemplazando con tu email real:

```bash
git config --global user.email "sandra@email.com"
```

### Paso 4: Verificar la configuración

Ejecutá:

```bash
git config --list
```

Buscá en la lista que aparezcan las líneas `user.name` y `user.email` con los valores que pusiste.

---

## Verificación

Ejecutá estos comandos y compará con la salida esperada:

**Comando 1:**

```bash
git --version
```

**Salida esperada:** Debe mostrar una versión de Git, por ejemplo:

```
git version 2.43.0
```

(El número puede ser diferente, lo importante es que no dé error.)

**Comando 2:**

```bash
git config user.name
```

**Salida esperada:** Debe mostrar el nombre que configuraste:

```
Sandra
```

**Comando 3:**

```bash
git config user.email
```

**Salida esperada:** Debe mostrar el email que configuraste:

```
sandra@email.com
```
