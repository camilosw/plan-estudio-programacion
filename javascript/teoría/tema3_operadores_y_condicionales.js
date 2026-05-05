// ============================================================
// TEMA 3: Operadores y condicionales
// ============================================================
//
// OBJETIVO: Tomar decisiones en el código usando operadores
// y estructuras condicionales.
//
// EXPLICACIÓN:
// En el recetario, constantemente tomamos decisiones: si una
// receta tarda menos de 15 minutos es "rápida", si tiene más
// de 4 estrellas es "destacada", si no tiene ingredientes con
// gluten se marca como "apta para celíacos".
//
// Los operadores nos permiten hacer cálculos y comparaciones.
// Los condicionales nos permiten ejecutar código diferente
// según el resultado de esas comparaciones.
//
// EJECUCIÓN:
//   node teoría/tema3_operadores_y_condicionales.js
// ============================================================

// --- Operadores aritméticos ---

const pricePerServing = 2.50;
const servings = 8;
const totalPrice = pricePerServing * servings;

console.log("--- Operadores aritméticos ---");
console.log(`Precio por porción: $${pricePerServing}`);
console.log(`Porciones: ${servings}`);
console.log(`Precio total: $${totalPrice}`);       // 20
console.log(`Mitad de precio: $${totalPrice / 2}`); // 10

// Módulo (resto de la división) — útil para saber si es par/impar
console.log(`¿Porciones pares? ${servings % 2 === 0}`); // true

// Potencia
console.log(`2 al cubo: ${2 ** 3}`); // 8

// --- Asignación compuesta ---

let stock = 10;
console.log("\n--- Asignación compuesta ---");
console.log("Stock inicial:", stock);

stock += 5;  // stock = stock + 5
console.log("Después de sumar 5:", stock);  // 15

stock -= 3;  // stock = stock - 3
console.log("Después de restar 3:", stock); // 12

stock *= 2;  // stock = stock * 2
console.log("Después de duplicar:", stock); // 24

// --- Comparación: === vs == ---

console.log("\n--- Comparación ---");

// === compara valor Y tipo (comparación estricta) — SIEMPRE usar esta
console.log(5 === 5);     // true
console.log(5 === "5");   // false (número vs string)

// == compara solo valor (comparación suelta) — NO usar
console.log(5 == "5");    // true (convierte y compara, peligroso)

// !== es la negación estricta
console.log(5 !== "5");   // true
console.log(5 !== 5);     // false

// Otros operadores de comparación
console.log(10 > 5);   // true
console.log(10 < 5);   // false
console.log(10 >= 10); // true
console.log(10 <= 9);  // false

// --- Operadores lógicos ---

const timeMinutes = 10;
const rating = 4.5;
const available = true;

console.log("\n--- Operadores lógicos ---");

// && (AND): ambas condiciones deben ser verdaderas
console.log(`¿Rápida y bien valorada? ${timeMinutes < 15 && rating > 4}`);
// Salida: true

// || (OR): al menos una condición debe ser verdadera
console.log(`¿Rápida o bien valorada? ${timeMinutes < 15 || rating > 4}`);
// Salida: true

// ! (NOT): invierte el valor
console.log(`¿No disponible? ${!available}`);
// Salida: false

// --- Nullish coalescing (??) ---

// El operador ?? devuelve el valor de la derecha SOLO si el
// de la izquierda es null o undefined.

const definedAllergen = "gluten";
const nullAllergen = null;

console.log("\n--- Nullish coalescing ---");
console.log(definedAllergen ?? "Ninguno"); // "gluten"
console.log(nullAllergen ?? "Ninguno");     // "Ninguno"

// --- if / else if / else ---

const prepTime = 60;

console.log("\n--- if / else if / else ---");
console.log(`Tiempo de preparación: ${prepTime} minutos`);

if (prepTime <= 15) {
    console.log("Categoría: Receta rápida");
} else if (prepTime <= 45) {
    console.log("Categoría: Receta media");
} else {
    console.log("Categoría: Receta elaborada");
}
// Salida: Categoría: Receta elaborada

// Ejemplo con varias condiciones
const recipeName = "Tarta de chocolate";
const difficulty = "media";
const recipeRating = 4.8;

if (recipeRating >= 4.5 && difficulty !== "difícil") {
    console.log(`${recipeName}: ¡Receta destacada y accesible!`);
} else if (recipeRating >= 4.5) {
    console.log(`${recipeName}: Destacada pero desafiante`);
} else {
    console.log(`${recipeName}: Receta normal`);
}
// Salida: Tarta de chocolate: ¡Receta destacada y accesible!

// --- switch ---

// switch es útil cuando comparas una variable contra varios
// valores posibles. Cada caso termina con break.

const category = "postres";

console.log("\n--- switch ---");

switch (category) {
    case "bebidas":
        console.log("Sección: Barra de bebidas");
        break;
    case "postres":
        console.log("Sección: Vitrina de postres");
        break;
    case "platos principales":
        console.log("Sección: Cocina principal");
        break;
    case "snacks":
        console.log("Sección: Mostrador de snacks");
        break;
    default:
        console.log("Sección: General");
}
// Salida: Sección: Vitrina de postres

// --- Operador ternario ---

// Es una forma corta de escribir un if/else simple.
// Sintaxis: condición ? valorSiTrue : valorSiFalse

const stars = 4.9;
const label = stars >= 4.5 ? "⭐ Destacada" : "Normal";
console.log("\n--- Operador ternario ---");
console.log(`Calificación ${stars}: ${label}`);
// Salida: Calificación 4.9: ⭐ Destacada

const recipeTime = 8;
const type = recipeTime <= 15 ? "rápida" : "elaborada";
console.log(`${recipeTime} minutos → receta ${type}`);
// Salida: 8 minutos → receta rápida
