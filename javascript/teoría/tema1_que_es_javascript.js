// ============================================================
// TEMA 1: ¿Qué es JavaScript y primeros pasos?
// ============================================================
//
// OBJETIVO: Entender qué es JavaScript, instalar Node.js y
// ejecutar tu primer programa.
//
// EXPLICACIÓN:
// JavaScript es el lenguaje de programación de la web. Cuando
// una página muestra una animación, valida un formulario o
// actualiza datos sin recargar, hay JavaScript detrás.
//
// Pero JavaScript no solo funciona en el navegador. También
// se puede ejecutar fuera de él, usando un programa llamado
// Node.js. Piensa en Node.js como un "motor" que entiende
// JavaScript y lo ejecuta directamente en tu computadora,
// igual que ejecutas archivos PHP con el comando `php`.
//
// En este módulo usaremos Node.js para ejecutar nuestros
// archivos JavaScript desde la terminal:
//
//   node teoría/tema1_que_es_javascript.js
//
// INSTALACIÓN DE NODE.JS EN WSL:
//   sudo apt update
//   sudo apt install nodejs
//   node --version
//
// ============================================================

// --- Tu primer programa ---

// console.log() es la forma de mostrar mensajes en la terminal.
// Es como el "echo" del mundo JavaScript.

console.log("¡Hola, mundo!");
// Salida: ¡Hola, mundo!

// --- Bienvenida al Recetario ---

console.log("========================================");
console.log("   Bienvenida al Recetario de Sandra");
console.log("========================================");

// --- Mostrar varios datos ---

// Puedes mostrar texto, números y hacer cálculos directamente
console.log("Receta: Café con leche espumosa");
console.log("Tiempo de preparación:", 10, "minutos");
console.log("Porciones:", 2);

// --- Comentarios ---

// Los comentarios son notas que el programa ignora al ejecutarse.
// Sirven para explicar el código.

// Esto es un comentario de una línea (con //)

/*
   Esto es un comentario
   de varias líneas.
   Todo lo que esté entre estos símbolos
   será ignorado por JavaScript.
*/

// --- Punto y coma ---

// En JavaScript, el punto y coma (;) al final de cada línea
// es opcional pero recomendado. Ayuda a que el código sea
// más claro y evita errores difíciles de detectar.

console.log("Con punto y coma");
console.log("Sin punto y coma")

// Ambas líneas funcionan, pero es buena práctica usar el ;

// --- Varios valores en un solo console.log ---

// Puedes separar valores con comas. JavaScript los muestra
// separados por un espacio.

console.log("Receta:", "Tarta de chocolate", "— Tiempo:", 60, "min");
// Salida: Receta: Tarta de chocolate — Tiempo: 60 min

// --- Saltos de línea ---

// Usa \n dentro del texto para crear un salto de línea
console.log("Ingredientes:\n- Harina\n- Azúcar\n- Huevos");
// Salida:
// Ingredientes:
// - Harina
// - Azúcar
// - Huevos
