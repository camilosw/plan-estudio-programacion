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

const precioPorPorcion = 2.50;
const porciones = 8;
const precioTotal = precioPorPorcion * porciones;

console.log("--- Operadores aritméticos ---");
console.log(`Precio por porción: $${precioPorPorcion}`);
console.log(`Porciones: ${porciones}`);
console.log(`Precio total: $${precioTotal}`);       // 20
console.log(`Mitad de precio: $${precioTotal / 2}`); // 10

// Módulo (resto de la división) — útil para saber si es par/impar
console.log(`¿Porciones pares? ${porciones % 2 === 0}`); // true

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

const tiempoMinutos = 10;
const calificacion = 4.5;
const disponible = true;

console.log("\n--- Operadores lógicos ---");

// && (AND): ambas condiciones deben ser verdaderas
console.log(`¿Rápida y bien valorada? ${tiempoMinutos < 15 && calificacion > 4}`);
// Salida: true

// || (OR): al menos una condición debe ser verdadera
console.log(`¿Rápida o bien valorada? ${tiempoMinutos < 15 || calificacion > 4}`);
// Salida: true

// ! (NOT): invierte el valor
console.log(`¿No disponible? ${!disponible}`);
// Salida: false

// --- Nullish coalescing (??) ---

// El operador ?? devuelve el valor de la derecha SOLO si el
// de la izquierda es null o undefined.

const alergenoDefinido = "gluten";
const alergenoNulo = null;

console.log("\n--- Nullish coalescing ---");
console.log(alergenoDefinido ?? "Ninguno"); // "gluten"
console.log(alergenoNulo ?? "Ninguno");     // "Ninguno"

// --- if / else if / else ---

const tiempoPreparacion = 60;

console.log("\n--- if / else if / else ---");
console.log(`Tiempo de preparación: ${tiempoPreparacion} minutos`);

if (tiempoPreparacion <= 15) {
    console.log("Categoría: Receta rápida");
} else if (tiempoPreparacion <= 45) {
    console.log("Categoría: Receta media");
} else {
    console.log("Categoría: Receta elaborada");
}
// Salida: Categoría: Receta elaborada

// Ejemplo con varias condiciones
const nombre = "Tarta de chocolate";
const dificultad = "media";
const rating = 4.8;

if (rating >= 4.5 && dificultad !== "difícil") {
    console.log(`${nombre}: ¡Receta destacada y accesible!`);
} else if (rating >= 4.5) {
    console.log(`${nombre}: Destacada pero desafiante`);
} else {
    console.log(`${nombre}: Receta normal`);
}
// Salida: Tarta de chocolate: ¡Receta destacada y accesible!

// --- switch ---

// switch es útil cuando comparas una variable contra varios
// valores posibles. Cada caso termina con break.

const categoria = "postres";

console.log("\n--- switch ---");

switch (categoria) {
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

const estrellas = 4.9;
const etiqueta = estrellas >= 4.5 ? "⭐ Destacada" : "Normal";
console.log("\n--- Operador ternario ---");
console.log(`Calificación ${estrellas}: ${etiqueta}`);
// Salida: Calificación 4.9: ⭐ Destacada

const tiempoReceta = 8;
const tipo = tiempoReceta <= 15 ? "rápida" : "elaborada";
console.log(`${tiempoReceta} minutos → receta ${tipo}`);
// Salida: 8 minutos → receta rápida

// ============================================================
// EJERCICIO
// ============================================================
// Tienes estos datos de una receta:
//   const nombre = "Ensalada mediterránea";
//   const tiempo = 20;
//   const calorias = 250;
//   const esVegetariana = true;
//   const alergeno = null;
//
// 1. Usa el ternario para mostrar "Apta para vegetarianos" o
//    "Contiene carne" según esVegetariana
// 2. Usa if/else if/else para clasificar las calorías:
//    - Menos de 200: "Baja en calorías"
//    - Entre 200 y 400: "Calorías moderadas"
//    - Más de 400: "Alta en calorías"
// 3. Usa ?? para mostrar el alérgeno o "Sin alérgenos" si
//    es null
// 4. Usa switch para mostrar un emoji según la categoría
//    de la receta
// ============================================================
