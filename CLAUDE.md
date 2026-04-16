# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a programming teaching curriculum for learning from scratch. The student has basic PHP knowledge (variables, arrays, functions). There are five modules:

1. **OOP (classes and objects)** — using an **online store** as the unifying theme
2. **Git and GitHub** — version control fundamentals, from installation to collaboration with Pull Requests
3. **HTML and CSS** — building web pages from scratch, using **La Cafetería de Sandra** as the unifying theme
4. **WSL and Linux Terminal** — setting up WSL, navigating the file system, permissions, package management, zsh, and VS Code integration — using **"Tu Taller de Herramientas"** as the unifying analogy
5. **Bases de Datos con MariaDB** — relational databases from scratch: MariaDB on WSL, HeidiSQL, SQL, PHP PDO, and OOP integration — using **"Biblioteca personal"** as the unifying theme

## Structure

### Module: OOP (clases y objetos)

- `clases-y-objetos/teoría/plan-de-estudios.md` — Curriculum plan with explanations, examples, and exercises
- `clases-y-objetos/teoría/tema1_clases_basicas.php` through `tema9_proyecto_integrador.php` — One PHP file per topic, each containing explanatory comments, working example code, and an exercise at the end
- `clases-y-objetos/ejercicios/ejercicio1_clases_basicas.php` through `ejercicio9_proyecto_integrador.php` — Exercise files

Topics: classes → constructor → methods → return vs echo → visibility → getters/setters → magic methods (__get/__set) → inheritance → static properties → integrating project.

### Module: Git y GitHub

- `git-y-github/teoría/plan-de-estudios.md` — Curriculum plan with explanations, examples, and exercises
- `git-y-github/teoría/tema1_que_es_git.md` through `tema8_proyecto_integrador.md` — One Markdown file per topic with explanations, bash command examples with expected output, and exercises
- `git-y-github/ejercicios/ejercicio1_que_es_git.md` through `ejercicio8_proyecto_integrador.md` — Exercise files with step-by-step instructions and verification sections

Topics: what is Git → first repository → add/commit cycle → log/diff/gitignore → branches → GitHub → collaboration (issues/PRs) → integrating project.

## Running PHP Files

Each OOP module file is a standalone PHP script:

```bash
php clases-y-objetos/teoría/tema1_clases_basicas.php
```

Every PHP file must execute without errors and produce the expected output shown in its comments.

## Conventions

- All content (comments, variable names, output) is in **Spanish** (neutral Spanish — not Argentine voseo)
- The OOP and Git modules were originally written with Argentine voseo but the HTML/CSS module uses neutral Spanish
- OOP module: each PHP file follows the format: header comment block with explanation → working code example → exercise as a comment block at the end
- OOP module: the online store domain uses consistent class names: `Producto`, `Cliente`, `CarritoDeCompras`, `Pedido`, `ProductoRopa`, `ProductoElectronico`
- OOP module: files are self-contained — classes are redefined in each file as needed (no includes/requires between files)
- Git module: each Markdown file follows the format: header → objective → explanation with analogy → bash command examples with expected output → exercise
- HTML/CSS module: each HTML file follows the format: header comment block with explanation and analogy → working HTML/CSS example with inline comments → exercise as a comment block at the end
- HTML/CSS module: the coffee shop theme uses consistent CSS class names: `.tarjeta-producto`, `.tarjeta-contenido`, `.contenedor-tarjetas`, `.precio`, `.badge`, `.formulario-contacto`
- HTML/CSS module: topic files use placeholder images from `https://placehold.co/` to avoid local image dependencies
- HTML/CSS module: from topic 8 onward, CSS lives in external files named `estilos_temaN.css`
- Git module: exercises use very simple PHP code to keep focus on Git concepts, and include a verification section with commands and expected output

### Module: HTML y CSS

- `html-y-css/teoría/plan-de-estudios.md` — Curriculum plan with explanations, examples, and exercises
- `html-y-css/teoría/tema1_estructura_basica.html` through `tema15_proyecto_integrador.html` — One HTML file per topic, each containing explanatory comments, working example code, and an exercise at the end
- `html-y-css/teoría/estilos_tema8.css` through `estilos_tema15.css` — External CSS files paired with theory files (topics 8–15)
- `html-y-css/ejercicios/ejercicio1_estructura_basica.html` through `ejercicio14_formularios.html` — Exercise files
- `html-y-css/ejercicios/ejercicio15_proyecto_integrador/` — Folder with 4 HTML pages and a shared CSS file

Topics: HTML structure → text and headings → HTML attributes → links → images → lists and tables → CSS basics → selectors and colors → typography → box model → display and position → flexbox → responsive design → forms → integrating project.

### Module: WSL y Terminal Linux

- `wsl-terminal-linux/teoría/plan-de-estudios.md` — Curriculum plan
- `wsl-terminal-linux/teoría/tema1_que_es_wsl.md` through `tema8_proyecto_integrador.md` — One Markdown file per topic with explanations, bash command examples with expected output (no exercise section in theory files)
- `wsl-terminal-linux/teoría/hoja-de-referencia.md` — Quick-reference cheat sheet of all commands organized by category
- `wsl-terminal-linux/ejercicios/ejercicio1_que_es_wsl.md` through `ejercicio8_proyecto_integrador.md` — Exercise files with step-by-step instructions and verification sections

Topics: what is WSL → the terminal → file navigation → file manipulation → permissions → packages/environment variables/zsh (including Oh My Zsh) → WSL and VS Code → integrating project.

Key conventions for this module:
- Theory files use the same banner format as the Git module (`===` headers, ALL-CAPS sections with dashed underlines) but **do NOT include an EJERCICIO section** — exercises are exclusively in the `ejercicios/` folder
- Content uses neutral Spanish throughout (no Argentine voseo)
- The unifying analogy is "Tu Taller de Herramientas": Windows=house, WSL=workshop, commands=tools, directories=shelves, permissions=locks, apt=supply store, VS Code=window between house and workshop

### Module: Bases de Datos con MariaDB

- `bases-de-datos/teoría/plan-de-estudios.md` — Curriculum plan
- The module alternates SQL (Markdown) and PHP+PDO (PHP) files so the student applies PHP as soon as the basic SQL operations are known. File extensions by topic:
  - **Markdown (SQL):** temas 1, 2, 3, 4, 5, 6, 9, 10, 11, 13, 14, 15, 17
  - **PHP (PHP + PDO):** temas 7, 8, 12, 16, 18
- `bases-de-datos/teoría/hoja-de-referencia.md` — Quick-reference cheat sheet organized by category
- `bases-de-datos/ejercicios/ejercicio1_que_es_una_base_de_datos.md` — Design exercise (reflexive, no SQL to run)
- Exercise files mirror the theory numbering and file types. Markdown exercises use the **tienda de música** domain (different from the biblioteca domain in theory files). Format: domain context → objective without step-by-step instructions → solution at the end for comparison
- PHP exercise files (ejercicios 7, 8, 12, 16, 18) use TODO stubs and a solution in a block comment at the end
- **Topics 2 and 3 have no separate exercise file** — the theory files include a VERIFICACIÓN FINAL section at the end

Topics: what is a relational DB → install MariaDB on WSL → CLI client + HeidiSQL → CREATE TABLE → INSERT/SELECT → UPDATE/DELETE/WHERE → **PHP PDO connection → prepared statements + security** → data types + constraints → foreign keys + relations → JOINs → **PHP PDO with JOINs** → normalization → indexes + views → transactions → **PHP PDO transactions** → backup and restore → OOP + repository pattern (integrating project).

Key conventions for this module:
- Content uses neutral Spanish throughout (no Argentine voseo)
- Theory Markdown files use the same banner format as the WSL module (`===` headers, ALL-CAPS sections with dashed underlines) and do NOT include an exercise section — exercises are exclusively in `ejercicios/`
- Theory PHP files (7, 8, 12, 16, 18) follow the OOP module format: header comment block with explanation → working example code → solution stub as a block comment at the end
- The PHP bloques progress with the SQL knowledge so far: tema 7–8 use only flat tables (no JOINs, no formal FKs); tema 12 adds JOINs; tema 16 adds transactions; tema 18 integrates OOP
- The unifying domain for **theory** is **Biblioteca personal**: tables `autores`, `libros`, `categorias`, `libros_categorias`, `socios`, `prestamos`
- The unifying domain for **exercises** (topics 4–18) is **Tienda de música**: tables `artistas`, `albumes`, `canciones`, `generos`, `albumes_generos`, `clientes`, `compras`
- Exercise format (Markdown topics): ## Dominio → ## Objetivo (goal without step-by-step) → ## Tu turno → ## Solución
- Exercise format (PHP topics): PHP file with TODO stubs and complete solution in a block comment `/* ... */` at the end
- Consistent class names for PHP exercises: `Artista`, `Album`, `AlbumRepositorio`, `Conexion`
- Credentials in examples: user `sandra`, theory database `biblioteca`, exercise database `tienda_musica`, password shown as placeholder `'tu_contraseña_aqui'`
- GUI client: **HeidiSQL** (Windows) — documented in topic 3. DBeaver and MySQL Workbench mentioned briefly as alternatives
- PHP API: **PDO** with `PDO::ATTR_EMULATE_PREPARES => false` and `PDO::ERRMODE_EXCEPTION`. `mysqli` is only mentioned as an alternative that exists

## Running Database Module PHP Files

PHP topics (7, 8, 12, 16, 18) and their exercises are standalone PHP scripts. They require MariaDB running and the respective database populated:

```bash
sudo service mariadb start
php bases-de-datos/teoría/tema7_php_pdo_conexion_y_consultas.php
php bases-de-datos/ejercicios/ejercicio7_php_pdo_conexion_y_consultas.php
```

## Opening HTML Files

Each HTML/CSS module file is a standalone page opened in the browser:
- Double-click the `.html` file, or drag it into the browser address bar
- From VS Code: right-click → "Open with Live Server" (if extension is installed)

Every HTML file must open without errors and display the expected result described in its comments.
