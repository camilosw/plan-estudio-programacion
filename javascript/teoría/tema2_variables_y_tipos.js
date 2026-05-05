// ============================================================
// TEMA 2: Variables y tipos de datos
// ============================================================
//
// OBJETIVO: Almacenar información en variables y conocer los
// tipos de datos de JavaScript.
//
// EXPLICACIÓN:
// Imagina que cada receta tiene una ficha. Esa ficha tiene
// campos: nombre, tiempo, porciones, disponible. Cada campo
// guarda un tipo de dato diferente: texto, número, verdadero/
// falso. En JavaScript, esos campos son VARIABLES.
//
// Para declarar variables usamos dos palabras clave:
//   const — para valores que NO cambian
//   let   — para valores que SÍ pueden cambiar
//
// Regla de oro: usa const siempre que puedas. Solo usa let
// cuando necesites cambiar el valor después.
//
// EJECUCIÓN:
//   node teoría/tema2_variables_y_tipos.js
// ============================================================

// --- const y let ---

const recipeName = "Café con leche espumosa";
const timeMinutes = 10;

let servings = 2;
servings = 4; // Podemos cambiar el valor porque usamos let

console.log("Receta:", recipeName);
console.log("Tiempo:", timeMinutes, "minutos");
console.log("Porciones:", servings);
// Salida:
// Receta: Café con leche espumosa
// Tiempo: 10 minutos
// Porciones: 4

// Si intentamos cambiar un const, JavaScript da un error:
// recipeName = "Otra receta"; // TypeError: Assignment to constant variable

// --- ¿Por qué no usar var? ---

// Existe una tercera forma antigua: var. No la usamos porque
// tiene comportamientos confusos con el alcance de las variables.
// Siempre usa const o let.

// --- Los tipos de datos primitivos ---

// JavaScript tiene 5 tipos de datos básicos (primitivos):

const name = "Tarta de chocolate";     // string  (texto)
const time = 60;                       // number  (número entero)
const price = 4.50;                    // number  (número decimal)
const available = true;                // boolean (verdadero/falso)
const allergen = null;                 // null    (vacío intencional)
let specialInstructions;               // undefined (sin valor asignado)

console.log("\n--- Tipos de datos ---");
console.log("nombre:", name);
console.log("tiempo:", time);
console.log("precio:", price);
console.log("disponible:", available);
console.log("alérgeno:", allergen);
console.log("instrucciones:", specialInstructions);
// Salida:
// --- Tipos de datos ---
// nombre: Tarta de chocolate
// tiempo: 60
// precio: 4.5
// disponible: true
// alérgeno: null
// instrucciones: undefined

// --- typeof: saber qué tipo tiene un dato ---

console.log("\n--- typeof ---");
console.log(typeof name);       // string
console.log(typeof time);       // number
console.log(typeof price);      // number
console.log(typeof available);  // boolean
console.log(typeof allergen);   // object  (esto es un error histórico de JS)
console.log(typeof specialInstructions); // undefined

// --- Template literals (plantillas de texto) ---

// En vez de concatenar con +, usamos backticks (`) y ${} para
// insertar variables dentro del texto. Es más limpio y legible.

const category = "postres";
const rating = 4.8;

// Forma antigua (concatenación con +):
console.log("\n" + name + " — " + category + " — " + rating + "★");

// Forma moderna (template literal):
console.log(`${name} — ${category} — ${rating}★`);

// Ambas producen: Tarta de chocolate — postres — 4.8★

// Dentro de ${} puedes poner cualquier expresión:
console.log(`Tiempo en horas: ${time / 60}`);
// Salida: Tiempo en horas: 1

// --- Conversión de tipos ---

// A veces necesitas convertir un dato de un tipo a otro.

console.log("\n--- Conversión de tipos ---");

// String a número
const timeText = "45";
const timeNumber = Number(timeText);
console.log(typeof timeText, "→", typeof timeNumber);
// Salida: string → number

// También puedes usar parseInt y parseFloat
const integer = parseInt("30");
const decimal = parseFloat("4.5");
console.log("Entero:", integer);   // 30
console.log("Decimal:", decimal);  // 4.5

// Número a string
const servingsNumber = 6;
const servingsText = String(servingsNumber);
console.log(typeof servingsNumber, "→", typeof servingsText);
// Salida: number → string

// Cuidado con la conversión automática (coerción):
console.log("5" + 3);  // "53" (concatena como texto)
console.log("5" - 3);  // 2    (resta como número)
// Esto puede causar errores difíciles de encontrar.
// Por eso es importante convertir explícitamente.

// --- Métodos de strings ---

// Los strings tienen métodos integrados para manipular texto.

const recipe = "  Cheesecake de Frutos Rojos  ";

console.log("\n--- Métodos de strings ---");

// Longitud del texto
console.log(recipe.length); // 30 (incluye los espacios)

// Mayúsculas y minúsculas
console.log(recipe.toUpperCase()); // "  CHEESECAKE DE FRUTOS ROJOS  "
console.log(recipe.toLowerCase()); // "  cheesecake de frutos rojos  "

// Quitar espacios al inicio y final
console.log(recipe.trim()); // "Cheesecake de Frutos Rojos"

// Buscar dentro del texto
console.log(recipe.includes("Frutos"));  // true
console.log(recipe.includes("Limón"));   // false

// Posición de un texto (devuelve -1 si no lo encuentra)
console.log(recipe.trim().indexOf("Frutos")); // 14

// Extraer una porción del texto
console.log(recipe.trim().slice(0, 10)); // "Cheesecake"

// Reemplazar texto
console.log(recipe.trim().replace("Frutos Rojos", "Limón"));
// Salida: Cheesecake de Limón

// Dividir texto en un array
const ingredientList = "harina, azúcar, queso crema";
const items = ingredientList.split(", ");
console.log(items); // [ 'harina', 'azúcar', 'queso crema' ]

// Comprobar inicio y final
const title = "Café con leche espumosa";
console.log(title.startsWith("Café"));    // true
console.log(title.endsWith("espumosa"));  // true
