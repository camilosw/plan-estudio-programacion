// ============================================================
// TEMA 5: Funciones
// ============================================================
//
// OBJETIVO: Organizar el código en bloques reutilizables.
//
// EXPLICACIÓN:
// En el recetario, hay tareas que repites constantemente:
// calcular el costo de una receta, clasificar su dificultad,
// formatear los datos para mostrarlos. En vez de copiar y
// pegar el mismo código, lo envuelves en una FUNCIÓN.
//
// Una función es como una receta dentro de tu recetario:
// tiene un nombre, recibe ingredientes (parámetros) y
// produce un resultado (valor de retorno).
//
// EJECUCIÓN:
//   node teoría/tema5_funciones.js
// ============================================================

// --- Declaración de función ---

// La forma clásica de crear una función.
// Se declara con la palabra function, seguida del nombre.

function greet() {
    console.log("¡Bienvenida al Recetario de Sandra!");
}

greet();
// Salida: ¡Bienvenida al Recetario de Sandra!

// --- Parámetros y argumentos ---

// Los parámetros son los datos que la función necesita.
// Los argumentos son los valores que le pasamos al llamarla.

function showRecipe(name, time) {
    console.log(`${name} — ${time} minutos`);
}

console.log("\n--- Parámetros ---");
showRecipe("Café con leche espumosa", 10);
showRecipe("Tarta de chocolate", 60);

// --- Parámetros por defecto ---

// Puedes darle un valor por defecto a un parámetro.
// Si no se pasa un argumento, usa el valor por defecto.

function showRecipeWithServings(name, time, servings = 4) {
    console.log(`${name} — ${time} min — ${servings} porciones`);
}

console.log("\n--- Parámetros por defecto ---");
showRecipeWithServings("Galletas de avena", 30, 12);
showRecipeWithServings("Brownie con nueces", 45);
// Salida:
// Galletas de avena — 30 min — 12 porciones
// Brownie con nueces — 45 min — 4 porciones (usa el default)

// --- return ---

// return devuelve un valor al código que llamó a la función.
// La función se detiene en el return.

function calcPricePerServing(totalPrice, servings) {
    return totalPrice / servings;
}

const price = calcPricePerServing(24, 8);
console.log("\n--- return ---");
console.log(`Precio por porción: $${price}`);
// Salida: Precio por porción: $3

function classifyDifficulty(timeMinutes, ingredientCount) {
    if (timeMinutes <= 15 && ingredientCount <= 5) {
        return "fácil";
    } else if (timeMinutes <= 45) {
        return "media";
    } else {
        return "difícil";
    }
}

console.log(classifyDifficulty(10, 3));   // "fácil"
console.log(classifyDifficulty(30, 8));   // "media"
console.log(classifyDifficulty(90, 12));  // "difícil"

// --- Expresiones de función ---

// Puedes guardar una función en una variable (constante).
// Se llama "expresión de función".

const formatRecipe = function(name, category, rating) {
    return `${name} | ${category} | ${rating}★`;
};

console.log("\n--- Expresión de función ---");
console.log(formatRecipe("Cheesecake de frutos rojos", "postres", 4.9));
// Salida: Cheesecake de frutos rojos | postres | 4.9★

// --- Arrow functions (funciones flecha) ---

// Una forma más corta de escribir funciones. Usa => en vez
// de la palabra function.

// Forma completa:
const calcTotalTime = (time1, time2) => {
    return time1 + time2;
};

// Forma abreviada (cuando el cuerpo es una sola expresión,
// el return es implícito):
const addTimes = (t1, t2) => t1 + t2;

// Con un solo parámetro, los paréntesis son opcionales:
const isQuick = time => time <= 15;

console.log("\n--- Arrow functions ---");
console.log(`Total: ${calcTotalTime(10, 60)} min`);
console.log(`Suma: ${addTimes(30, 45)} min`);
console.log(`¿10 min es rápida? ${isQuick(10)}`);   // true
console.log(`¿60 min es rápida? ${isQuick(60)}`);   // false

// --- Scope (alcance) ---

// Las variables tienen un alcance que determina dónde se
// pueden usar.

const cookbookName = "El Recetario de Sandra"; // Variable global

function showInfo() {
    const message = "Información interna"; // Variable local
    console.log(cookbookName); // Puede acceder a la global
    console.log(message);      // Puede acceder a su propia variable
}

console.log("\n--- Scope ---");
showInfo();
console.log(cookbookName); // Funciona: es global
// console.log(message); // Error: message no está definida aquí

// Scope de bloque: let y const solo existen dentro de { }
if (true) {
    const blockVariable = "Solo existo aquí dentro";
    console.log(blockVariable); // Funciona
}
// console.log(blockVariable); // Error: no existe fuera del if

// --- Closures (intro básica) ---

// Un closure es una función que "recuerda" las variables del
// lugar donde fue creada, incluso después de que ese lugar
// ya terminó de ejecutarse.

function createCounter(name) {
    let count = 0;
    return function() {
        count++;
        return `${name}: preparada ${count} vez/veces`;
    };
}

const coffeeCounter = createCounter("Café con leche");
const cakeCounter = createCounter("Tarta de chocolate");

console.log("\n--- Closures ---");
console.log(coffeeCounter());  // Café con leche: preparada 1 vez/veces
console.log(coffeeCounter());  // Café con leche: preparada 2 vez/veces
console.log(cakeCounter());    // Tarta de chocolate: preparada 1 vez/veces
console.log(coffeeCounter());  // Café con leche: preparada 3 vez/veces

// Cada contador tiene su propia variable "count" independiente.

// --- Funciones como valores ---

// En JavaScript, las funciones son valores. Puedes guardarlas
// en variables, pasarlas como argumentos o devolverlas como
// resultado de otra función.

function applyOperation(a, b, operation) {
    return operation(a, b);
}

const add = (a, b) => a + b;
const multiply = (a, b) => a * b;

console.log("\n--- Funciones como valores ---");
console.log(`Sumar: ${applyOperation(10, 5, add)}`);        // 15
console.log(`Multiplicar: ${applyOperation(10, 5, multiply)}`); // 50

// Esto es la base de los callbacks que veremos más adelante.
