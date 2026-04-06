# Ejercicio 2: La terminal — Primeros comandos

## Objetivo

Ejecutar los primeros comandos en la terminal de WSL, identificar cada parte del prompt y practicar los atajos de teclado esenciales.

---

## Instrucciones

Abre Ubuntu desde el menú Inicio antes de comenzar.

### Paso 1: Observar el prompt

Mira el texto que aparece antes del cursor. Escribe en tu cuaderno o en un archivo de texto qué representa cada parte:

```
sandra@DESKTOP-ABC123:~$
```

- ¿Qué usuario eres?
- ¿En qué máquina estás?
- ¿En qué carpeta estás?
- ¿Qué significa el símbolo `$` al final?

### Paso 2: Ejecutar los comandos básicos

Ejecuta cada uno de los siguientes comandos y observa la salida:

```bash
whoami
```

```bash
hostname
```

```bash
date
```

```bash
echo "Hola, soy Sandra"
```

```bash
echo "Estoy aprendiendo WSL"
```

### Paso 3: Limpiar la pantalla

```bash
clear
```

Observa que la pantalla se limpia pero el historial no se pierde.

### Paso 4: Ver el historial

```bash
history
```

Deben aparecer los comandos que ejecutaste en los pasos anteriores.

### Paso 5: Practicar las flechas

Sin escribir nada, presiona la flecha ↑ varias veces. Observa cómo aparecen los comandos anteriores. Presiona ↓ para avanzar en el historial.

Ejecuta un comando anterior usando solo las flechas (sin escribirlo de nuevo).

### Paso 6: Practicar el autocompletado con Tab

Escribe `who` y presiona Tab:

```bash
who[Tab]
```

La terminal debe completar a `whoami`. Presiona Enter para ejecutarlo.

Ahora escribe `dat` y presiona Tab:

```bash
dat[Tab]
```

### Paso 7: Ver la ayuda de un comando

```bash
echo --help
```

```bash
date --help
```

---

## Verificación

**Comando 1:** Ver quién eres

```bash
whoami
```

**Salida esperada:**

```
sandra
```

**Comando 2:** Ver los últimos 5 comandos del historial

```bash
history | tail -5
```

**Salida esperada** (los números pueden variar, lo importante es que aparezcan tus comandos):

```
    4  date
    5  echo "Hola, soy Sandra"
    6  echo "Estoy aprendiendo WSL"
    7  clear
    8  history
```

**Comando 3:** Usar flechas y Tab

Este es un ejercicio manual — no hay salida que comparar. Confirma que:
- La flecha ↑ muestra comandos anteriores
- Tab completa el nombre de un comando

**Pregunta de reflexión:** ¿Qué diferencia notas entre la terminal y usar el Explorador de Windows con el ratón? ¿Cuándo crees que la terminal es más útil?
