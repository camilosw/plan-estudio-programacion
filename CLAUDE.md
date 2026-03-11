# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a PHP teaching curriculum for learning programming from scratch. The student has basic PHP knowledge (variables, arrays, functions). The current module covers **OOP (classes and objects)** using an **online store** as the unifying theme. Future modules will cover other programming topics.

## Structure

- `plan-de-estudios.md` — Curriculum plan for the current module (OOP) in Spanish with explanations, examples, and exercises
- `tema1_clases_basicas.php` through `tema9_proyecto_integrador.php` — One PHP file per topic in the OOP module, each containing explanatory comments, working example code, and an exercise at the end

Current module (OOP) topics: classes → constructor → methods → return vs echo → visibility → getters/setters → inheritance → static properties → integrating project.

## Running Files

Each file is a standalone PHP script:

```bash
php tema1_clases_basicas.php
```

Every file must execute without errors and produce the expected output shown in its comments.

## Conventions

- All content (comments, variable names, output) is in **Spanish**
- Each file follows the same format: header comment block with explanation → working code example → exercise as a comment block at the end
- The online store domain uses consistent class names across files: `Producto`, `Cliente`, `CarritoDeCompras`, `Pedido`, `ProductoRopa`, `ProductoElectronico`
- Files are self-contained — classes are redefined in each file as needed (no includes/requires between files)
