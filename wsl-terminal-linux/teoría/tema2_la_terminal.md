# TEMA 2: La terminal — Tu mesa de trabajo

## OBJETIVO
Entender qué es la terminal, leer el prompt con confianza y ejecutar los primeros comandos básicos.

## EXPLICACIÓN

### ¿Qué es la terminal?

La terminal (también llamada consola o línea de comandos) es una ventana donde le das instrucciones a la computadora escribiendo texto. En vez de hacer clic en botones, escribes un comando y presionas Enter.

Puede parecer intimidante al principio, pero tiene una ventaja enorme: es precisa y rápida. Cuando sabes lo que quieres hacer, la terminal es mucho más eficiente que buscar opciones en menús.

Piénsalo como hablar directamente con la computadora en su idioma. Al principio necesitas un diccionario (esta guía), pero después de un tiempo los comandos se vuelven naturales.

### Anatomía del prompt

El prompt es el texto que aparece antes del cursor. Te da información sobre el contexto actual:

```
sandra@DESKTOP-ABC123:~$
```

Cada parte tiene un significado:

| Parte             | Significado                                      |
|-------------------|--------------------------------------------------|
| `sandra`          | Tu nombre de usuario                             |
| `@`               | Separador (se lee "en" o "arroba")               |
| `DESKTOP-ABC123`  | Nombre de tu computadora                         |
| `:`               | Separador                                        |
| `~`               | La carpeta donde estás ahora (`~` = tu casa)     |
| `$`               | Usuario normal (si fuera `#` serías administrador)|

Cuando la carpeta cambia, el prompt lo refleja:

```
sandra@DESKTOP-ABC123:~/proyectos$
```

### Tus primeros comandos

#### whoami — ¿Quién soy yo?

```bash
whoami
```

```
sandra
```

Muestra el nombre de usuario con el que estás trabajando.

#### hostname — ¿En qué máquina estoy?

```bash
hostname
```

```
DESKTOP-ABC123
```

#### date — ¿Qué fecha y hora es?

```bash
date
```

```
Wed Apr  2 10:30:00 UTC 2026
```

#### echo — Imprimir texto

```bash
echo "Hola mundo"
```

```
Hola mundo
```

`echo` imprime el texto que le pases. Es útil para mostrar mensajes y el valor de variables.

#### clear — Limpiar la pantalla

```bash
clear
```

Limpia todo el texto de la terminal. El historial de comandos no se borra, solo la vista.

#### history — Ver comandos anteriores

```bash
history
```

```
    1  whoami
    2  hostname
    3  date
    4  echo "Hola mundo"
    5  clear
    6  history
```

Muestra los últimos comandos que ejecutaste, numerados.

### Atajos de teclado esenciales

Estos atajos te ahorran muchísimo tiempo. Úsalos desde el primer día:

| Atajo              | Qué hace                                             |
|--------------------|------------------------------------------------------|
| ↑ (flecha arriba)  | Muestra el comando anterior (puedes ir hacia atrás)  |
| ↓ (flecha abajo)   | Avanza en el historial                               |
| Tab                | Autocompleta el comando o nombre de archivo           |
| Tab Tab            | Muestra todas las opciones disponibles               |
| Ctrl + C           | Cancela el comando que está ejecutándose             |
| Ctrl + L           | Limpia la pantalla (igual que `clear`)               |
| Ctrl + A           | Va al inicio de la línea                             |
| Ctrl + E           | Va al final de la línea                              |

### Cómo leer un comando

Los comandos siguen siempre la misma estructura:

```
comando [opciones] [argumentos]
```

Por ejemplo:

```bash
echo "Hola mundo"
```

- `echo` — el comando
- `"Hola mundo"` — el argumento (qué imprimir)

```bash
ls -la ~/proyectos
```

- `ls` — el comando (listar archivos)
- `-la` — opciones (lista larga + archivos ocultos)
- `~/proyectos` — argumento (qué carpeta listar)

Las opciones cortas empiezan con un guión (`-l`). Las opciones largas empiezan con dos guiones (`--version`).

### El comando man — Manual de ayuda

Para casi cualquier comando puedes ver su manual:

```bash
man ls
```

Muestra la documentación completa de `ls`. Usa las flechas para desplazarte y `q` para salir.

Para una ayuda más corta, muchos comandos aceptan `--help`:

```bash
ls --help
```
