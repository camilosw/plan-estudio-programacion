# Plan de Estudios: JavaScript — Fundamentos del lenguaje

## Contexto

Hasta ahora, las páginas HTML que creaste son estáticas: muestran contenido, pero no reaccionan a lo que hace el usuario. Si alguien hace clic en un botón, la página no hace nada. **JavaScript** es el lenguaje que le da vida a las páginas web: permite responder a clics, validar formularios, mostrar y ocultar elementos, y mucho más.

Pero antes de trabajar con páginas web, necesitas dominar el lenguaje en sí mismo. Este módulo cubre los **fundamentos de JavaScript como lenguaje de programación**, sin tocar el navegador ni las páginas HTML. Es como aprender las reglas de la cocina antes de preparar un plato completo.

La analogía que usaremos a lo largo del módulo: **El Recetario de Sandra**. Tienes recetas con ingredientes, pasos de preparación, categorías y valoraciones. Necesitas buscar recetas rápidas, filtrar las de una categoría, calcular el tiempo total de preparación y organizar tu colección. Eso es exactamente lo que harás con JavaScript.

---

## Estructura del plan

Todos los temas son archivos JavaScript (`.js`) que puedes ejecutar desde la terminal con Node.js:

```bash
node teoría/tema1_que_es_javascript.js
```

Cada tema de teoría sigue este formato:

1. **Explicación** del concepto con ejemplos del recetario
2. **Código funcional** que puedes ejecutar y ver su salida
3. **Ejercicio breve** al final para practicar

El ejercicio práctico completo está en su archivo separado dentro de la carpeta `ejercicios/`, usando el dominio de un **Videoclub** (películas, directores, géneros).

---

## Tema 1: ¿Qué es JavaScript y primeros pasos?

**Objetivo:** Entender qué es JavaScript, instalar Node.js y ejecutar tu primer programa.

**Contenido:** qué es JavaScript, su rol en la web, instalar Node.js en WSL, ejecutar archivos con `node`, `console.log()`, comentarios (`//` y `/* */`), punto y coma.

---

## Tema 2: Variables y tipos de datos

**Objetivo:** Almacenar información en variables y conocer los tipos de datos de JavaScript.

**Contenido:** `let`, `const` (por qué no `var`), tipos primitivos (string, number, boolean, null, undefined), `typeof`, template literals, conversión de tipos, métodos de strings.

---

## Tema 3: Operadores y condicionales

**Objetivo:** Tomar decisiones en el código usando operadores y estructuras condicionales.

**Contenido:** operadores aritméticos, asignación compuesta, comparación (`===` vs `==`), lógicos, nullish coalescing (`??`), `if`/`else if`/`else`, `switch`, operador ternario.

---

## Tema 4: Bucles

**Objetivo:** Repetir acciones de forma controlada.

**Contenido:** `for`, `while`, `do...while`, `for...of`, `break`, `continue`, bucles anidados, patrón acumulador.

---

## Tema 5: Funciones

**Objetivo:** Organizar el código en bloques reutilizables.

**Contenido:** declaración de funciones, expresiones de función, arrow functions (`=>`), parámetros por defecto, `return`, scope (global, local, bloque), intro a closures, funciones como valores.

---

## Tema 6: Arrays

**Objetivo:** Trabajar con listas de datos.

**Contenido:** crear arrays, acceder por índice, `length`, modificar elementos, `push`/`pop`/`shift`/`unshift`, `splice`, `includes`, `indexOf`, `join`, `reverse`, `concat`, `slice`, iterar con `for` y `for...of`.

---

## Tema 7: Objetos

**Objetivo:** Agrupar datos relacionados en una sola estructura.

**Contenido:** objetos literales, propiedades, dot vs bracket notation, agregar/eliminar propiedades, métodos, `this`, `Object.keys()`/`values()`/`entries()`, `for...in`, objetos anidados, referencia vs valor.

---

## Tema 8: Arrays de objetos y bucles

**Objetivo:** Combinar arrays y objetos para trabajar con colecciones de datos.

**Contenido:** arrays de objetos, buscar con `for`, filtrar manualmente en nuevos arrays, contar y sumar con acumuladores, construir nuevos arrays desde existentes.

---

## Tema 9: Métodos de arrays I — forEach, map, filter, find

**Objetivo:** Usar los métodos integrados de arrays para transformar y buscar datos.

**Contenido:** concepto de callback, `forEach`, `map`, `filter`, `find`, `findIndex`. Para cada método, comparación con el equivalente manual usando `for`.

---

## Tema 10: Métodos de arrays II — reduce, sort, some, every

**Objetivo:** Dominar los métodos avanzados de arrays y encadenar operaciones.

**Contenido:** `reduce`, `sort` con funciones comparadoras, `some`, `every`, encadenar métodos.

---

## Tema 11: Desestructuración y spread/rest

**Objetivo:** Extraer datos de arrays y objetos de forma concisa, y combinar o clonar estructuras.

**Contenido:** desestructuración de arrays y objetos, renombrar al desestructurar, valores por defecto, desestructuración anidada, spread en arrays y objetos, rest en parámetros de funciones.

---

## Tema 12: Clases

**Objetivo:** Crear plantillas reutilizables para objetos con comportamiento compartido.

**Contenido:** `class`, `constructor`, métodos, `this` en clases, herencia con `extends`/`super`, métodos estáticos, propiedades privadas (`#`), getters y setters.

---

## Tema 13: Fecha y hora

**Objetivo:** Trabajar con fechas y horas usando el objeto Date.

**Contenido:** crear fechas, métodos get, meses base 0, timestamps, comparar fechas, calcular diferencias, formatear con `toLocaleDateString()`.

---

## Tema 14: Promesas y async/await

**Objetivo:** Entender el código asíncrono y manejar operaciones que toman tiempo.

**Contenido:** código síncrono vs asíncrono, callbacks, `setTimeout`/`setInterval`, promesas (resolve/reject), `.then()`/`.catch()`/`.finally()`, `async`/`await`, `try`/`catch`, `Promise.all()`.

---

## Tema 15: Proyecto integrador

**Objetivo:** Construir un sistema completo que integre todos los conceptos aprendidos.

**Contenido:** sistema del "Recetario de Sandra" con clases, arrays de objetos, métodos de arrays, desestructuración, fechas y una función asíncrona simulada.
