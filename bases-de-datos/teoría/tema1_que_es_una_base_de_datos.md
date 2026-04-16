# TEMA 1: ¿Qué es una base de datos relacional?

## OBJETIVO
Entender qué problema resuelven las bases de datos, qué es una base de datos relacional y por qué usamos MariaDB en este módulo.

## EXPLICACIÓN

¿Qué pasa cuando tu aplicación cierra?

Imagina que escribes un programa PHP que guarda los libros de tu biblioteca en un array:

```
$libros = [
    ["titulo" => "Cien años de soledad", "autor" => "García Márquez"],
    ["titulo" => "El nombre de la rosa",  "autor" => "Umberto Eco"],
];
```

Funciona mientras el programa corre. Pero cuando lo cierras, todo se pierde. La próxima vez que lo abras, el array vuelve a estar vacío.

Una base de datos guarda los datos en disco de forma permanente. Sin importar cuántas veces reinicies el servidor, los datos siguen ahí.


¿Qué es una base de datos relacional?

Piensa en tu biblioteca personal física. Tienes:
- Una ficha por cada libro (título, año de publicación, número de páginas)
- Una ficha por cada autor (nombre, país, fecha de nacimiento)
- Un registro de préstamos (quién tiene qué libro, desde cuándo)

Cada tipo de ficha vive en su propio fichero. Las fichas se relacionan entre sí: el libro "Cien años de soledad" apunta a la ficha del autor "Gabriel García Márquez".

Una base de datos relacional funciona igual. Los datos se organizan en **tablas**. Cada tabla tiene **columnas** (los campos, como "título" o "año") y **filas** (los registros concretos, como un libro específico). Las tablas se pueden relacionar entre sí mediante claves.

Por ejemplo:

Tabla `autores`:
```
+----+---------------------+----------+
| id | nombre              | pais     |
+----+---------------------+----------+
|  1 | Gabriel García M.   | Colombia |
|  2 | Umberto Eco         | Italia   |
+----+---------------------+----------+
```

Tabla `libros`:
```
+----+---------------------------+-----------+------+
| id | titulo                    | autor_id  | anio |
+----+---------------------------+-----------+------+
|  1 | Cien años de soledad      |         1 | 1967 |
|  2 | El nombre de la rosa      |         2 | 1980 |
+----+---------------------------+-----------+------+
```

La columna `autor_id` en `libros` apunta a la columna `id` en `autores`. Esa conexión se llama **relación**.


¿Qué motores de bases de datos existen?

Hay varios motores. Estos son los más comunes:

- **MariaDB** — derivación de MySQL, gratuito, de código abierto. Es el paquete por defecto en Ubuntu. Será el motor de este módulo.
- **MySQL** — el motor original. Hoy pertenece a Oracle. Compatible casi al 100% con MariaDB en sintaxis básica.
- **PostgreSQL** — más avanzado, con tipos de datos más ricos. Popular en aplicaciones empresariales y de análisis de datos.
- **SQLite** — una base de datos en un solo archivo, sin servidor. Ideal para apps móviles o proyectos pequeños.

Para este módulo usamos **MariaDB** porque:
1. Se instala con `apt install mariadb-server` sin pasos adicionales en Ubuntu.
2. Es 100% compatible con MySQL: lo que aprendas aquí funciona en entornos que usan MySQL.
3. Es gratuito, activo, y la documentación es abundante.
4. PHP tiene soporte nativo excelente para MariaDB/MySQL.

SQL — el lenguaje de las bases de datos relacionales

Todos los motores anteriores (excepto algunas características avanzadas de PostgreSQL) hablan el mismo idioma: **SQL** (Structured Query Language, Lenguaje de Consulta Estructurado). SQL te permite:

- Crear tablas (`CREATE TABLE`)
- Insertar datos (`INSERT INTO`)
- Consultarlos (`SELECT`)
- Modificarlos (`UPDATE`)
- Eliminarlos (`DELETE`)

Aprender SQL con MariaDB te sirve directamente para MySQL, y en gran parte para PostgreSQL también.


## GLOSARIO BÁSICO

```
base de datos   — contenedor que agrupa tablas relacionadas entre sí
tabla           — estructura con filas y columnas, como una hoja de cálculo
columna         — un campo de datos (ej: "titulo", "anio")
fila / registro — un dato concreto dentro de una tabla (ej: un libro específico)
clave primaria  — columna que identifica de forma única cada fila (normalmente "id")
clave foránea   — columna que apunta al id de otra tabla, creando una relación
consulta        — instrucción SQL que pedimos a la base de datos
```

## EJEMPLO

La base de datos que construiremos en este módulo se llama `biblioteca`.
Tendrá estas tablas:

```
autores          — id, nombre, pais, anio_nacimiento
libros           — id, titulo, autor_id, anio_publicacion, paginas, disponible
categorias       — id, nombre
libros_categorias — libro_id, categoria_id  (tabla puente N:M)
socios           — id, nombre, email, fecha_registro
prestamos        — id, libro_id, socio_id, fecha_prestamo, fecha_devolucion
```

Cada tema del módulo agrega o consulta datos de estas tablas. Al final del módulo
tendrás una base de datos de biblioteca completamente funcional.
