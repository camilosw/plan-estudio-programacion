# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a PHP teaching curriculum for learning programming from scratch. The student has basic PHP knowledge (variables, arrays, functions). There are two modules so far:

1. **OOP (classes and objects)** — using an **online store** as the unifying theme
2. **Git and GitHub** — version control fundamentals, from installation to collaboration with Pull Requests

## Structure

### Module: OOP (clases y objetos)

- `teoría/clases-y-objetos/plan-de-estudios.md` — Curriculum plan with explanations, examples, and exercises
- `teoría/clases-y-objetos/tema1_clases_basicas.php` through `tema9_proyecto_integrador.php` — One PHP file per topic, each containing explanatory comments, working example code, and an exercise at the end
- `ejercicios/clases-y-objetos/ejercicio1_clases_basicas.php` through `ejercicio9_proyecto_integrador.php` — Exercise files

Topics: classes → constructor → methods → return vs echo → visibility → getters/setters → inheritance → static properties → integrating project.

### Module: Git y GitHub

- `teoría/git-y-github/plan-de-estudios.md` — Curriculum plan with explanations, examples, and exercises
- `teoría/git-y-github/tema1_que_es_git.md` through `tema8_proyecto_integrador.md` — One Markdown file per topic with explanations, bash command examples with expected output, and exercises
- `ejercicios/git-y-github/ejercicio1_que_es_git.md` through `ejercicio8_proyecto_integrador.md` — Exercise files with step-by-step instructions and verification sections

Topics: what is Git → first repository → add/commit cycle → log/diff/gitignore → branches → GitHub → collaboration (issues/PRs) → integrating project.

## Running PHP Files

Each OOP module file is a standalone PHP script:

```bash
php teoría/clases-y-objetos/tema1_clases_basicas.php
```

Every PHP file must execute without errors and produce the expected output shown in its comments.

## Conventions

- All content (comments, variable names, output) is in **Spanish**
- OOP module: each PHP file follows the format: header comment block with explanation → working code example → exercise as a comment block at the end
- OOP module: the online store domain uses consistent class names: `Producto`, `Cliente`, `CarritoDeCompras`, `Pedido`, `ProductoRopa`, `ProductoElectronico`
- OOP module: files are self-contained — classes are redefined in each file as needed (no includes/requires between files)
- Git module: each Markdown file follows the format: header → objective → explanation with analogy → bash command examples with expected output → exercise
- Git module: exercises use very simple PHP code to keep focus on Git concepts, and include a verification section with commands and expected output
