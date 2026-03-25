# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a programming teaching curriculum for learning from scratch. The student has basic PHP knowledge (variables, arrays, functions). There are three modules so far:

1. **OOP (classes and objects)** — using an **online store** as the unifying theme
2. **Git and GitHub** — version control fundamentals, from installation to collaboration with Pull Requests
3. **HTML and CSS** — building web pages from scratch, using **La Cafetería de Sandra** as the unifying theme

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
- HTML/CSS module: from topic 7 onward, CSS lives in external files named `estilos_temaN.css`
- Git module: exercises use very simple PHP code to keep focus on Git concepts, and include a verification section with commands and expected output

### Module: HTML y CSS

- `html-y-css/teoría/plan-de-estudios.md` — Curriculum plan with explanations, examples, and exercises
- `html-y-css/teoría/tema1_estructura_basica.html` through `tema14_proyecto_integrador.html` — One HTML file per topic, each containing explanatory comments, working example code, and an exercise at the end
- `html-y-css/teoría/estilos_tema7.css` through `estilos_tema14.css` — External CSS files paired with theory files (topics 7–14)
- `html-y-css/ejercicios/ejercicio1_estructura_basica.html` through `ejercicio13_formularios.html` — Exercise files
- `html-y-css/ejercicios/ejercicio14_proyecto_integrador/` — Folder with 4 HTML pages and a shared CSS file

Topics: HTML structure → text and headings → links → images → lists and tables → CSS basics → selectors and colors → typography → box model → display and position → flexbox → responsive design → forms → integrating project.

## Opening HTML Files

Each HTML/CSS module file is a standalone page opened in the browser:
- Double-click the `.html` file, or drag it into the browser address bar
- From VS Code: right-click → "Open with Live Server" (if extension is installed)

Every HTML file must open without errors and display the expected result described in its comments.
