# Ejercicio 4: Crear base de datos y primeras tablas

## Dominio

Vas a trabajar con una **tienda de música** que vende álbumes digitales. La tienda tiene artistas, álbumes y clientes que compran esos álbumes.

A lo largo de los ejercicios del módulo irás construyendo la base de datos completa de esta tienda. En este ejercicio creas la estructura inicial.

---

## Objetivo

Crea una base de datos llamada `tienda_musica` con las siguientes tablas:

**`artistas`**
- `id` — identificador único, autoincremental
- `nombre` — texto, obligatorio
- `pais` — texto, opcional
- `anio_inicio` — año en que el artista comenzó su carrera, opcional

**`albumes`**
- `id` — identificador único, autoincremental
- `titulo` — texto, obligatorio
- `artista_id` — número entero sin signo, obligatorio (por ahora no es clave foránea)
- `anio_lanzamiento` — año de lanzamiento, opcional
- `precio` — número decimal con dos cifras decimales, opcional
- `disponible` — booleano, obligatorio, verdadero por defecto

Elige los tipos de datos adecuados para cada campo. Consulta la sección "Tipos de datos básicos" del Tema 4 si necesitas referencia.

---

## Tu turno

Conéctate a MariaDB como el usuario que tienes configurado, crea la base de datos y las dos tablas. Luego verifica la estructura con los comandos que aprendiste en el Tema 4.

No hay pasos predefinidos: decide tú el orden y los comandos exactos.

---

## Solución

```sql
CREATE DATABASE IF NOT EXISTS tienda_musica
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE tienda_musica;

CREATE TABLE artistas (
    id          INT UNSIGNED NOT NULL AUTO_INCREMENT,
    nombre      VARCHAR(150) NOT NULL,
    pais        VARCHAR(100),
    anio_inicio YEAR,
    PRIMARY KEY (id)
);

CREATE TABLE albumes (
    id               INT UNSIGNED NOT NULL AUTO_INCREMENT,
    titulo           VARCHAR(255) NOT NULL,
    artista_id       INT UNSIGNED NOT NULL,
    anio_lanzamiento YEAR,
    precio           DECIMAL(8,2),
    disponible       BOOLEAN NOT NULL DEFAULT TRUE,
    PRIMARY KEY (id)
);
```

Verificación:

```sql
SHOW TABLES;

DESCRIBE artistas;

DESCRIBE albumes;
```

Salida esperada de `SHOW TABLES`:

```
+------------------------+
| Tables_in_tienda_musica|
+------------------------+
| albumes                |
| artistas               |
+------------------------+
```

**Puntos a comparar con tu solución:**
- `id` usa `INT UNSIGNED NOT NULL AUTO_INCREMENT` en ambas tablas
- `precio` es `DECIMAL(8,2)`, no `FLOAT` ni `INT` — los precios requieren decimales exactos
- `disponible` tiene `DEFAULT TRUE` para que los álbumes nuevos estén disponibles por defecto
- `artista_id` es solo un entero por ahora; la relación formal con `artistas` se agrega en el Ejercicio 8
