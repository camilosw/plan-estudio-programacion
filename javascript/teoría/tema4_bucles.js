// ============================================================
// TEMA 4: Bucles
// ============================================================
//
// OBJETIVO: Repetir acciones de forma controlada.
//
// EXPLICACIÓN:
// Cuando tienes una lista de recetas y quieres mostrar cada
// una, no vas a escribir un console.log para cada receta.
// Los bucles permiten repetir un bloque de código tantas
// veces como necesites.
//
// EJECUCIÓN:
//   node teoría/tema4_bucles.js
// ============================================================

// --- for ---

// El bucle for tiene tres partes:
// for (inicio; condición; incremento) { ... }

const recipes = [
    "Café con leche espumosa",
    "Tarta de chocolate",
    "Sándwich club",
    "Galletas de avena",
    "Cheesecake de frutos rojos"
];

console.log("--- for clásico ---");
for (let i = 0; i < recipes.length; i++) {
    console.log(`${i + 1}. ${recipes[i]}`);
}

// --- while ---

// El while repite mientras la condición sea verdadera.
// Útil cuando no sabes cuántas veces se ejecutará.

const prepTimes = [10, 60, 15, 30, 90];

console.log("\n--- while ---");
console.log("Buscando la primera receta de más de 30 minutos...");

let index = 0;
while (index < prepTimes.length) {
    if (prepTimes[index] > 30) {
        console.log(`Encontrada en posición ${index}: ${prepTimes[index]} min`);
        break;
    }
    index++;
}
// Salida: Encontrada en posición 1: 60 min

// --- do...while ---

// Similar a while, pero se ejecuta al menos una vez antes
// de comprobar la condición.

console.log("\n--- do...while ---");

let attempts = 0;
do {
    attempts++;
    console.log(`Intento de preparación #${attempts}`);
} while (attempts < 3);

// --- for...of ---

// for...of recorre cada elemento de un array directamente,
// sin necesidad de usar un índice. Es más limpio que el for
// clásico cuando no necesitas el número de posición.

const ingredients = ["harina", "azúcar", "huevos", "mantequilla", "chocolate"];

console.log("\n--- for...of ---");
console.log("Ingredientes de la tarta:");
for (const item of ingredients) {
    console.log(`  - ${item}`);
}

// --- break y continue ---

// break: detiene el bucle completamente
// continue: salta a la siguiente iteración

const ratings = [4.5, 3.2, 4.8, 2.9, 4.1, 3.8, 4.9];

console.log("\n--- break ---");
console.log("Buscando la primera receta con menos de 3 estrellas:");
for (const r of ratings) {
    if (r < 3) {
        console.log(`Encontrada: ${r}★ — necesita mejoras`);
        break;
    }
}
// Salida: Encontrada: 2.9★ — necesita mejoras

console.log("\n--- continue ---");
console.log("Recetas destacadas (4+ estrellas):");
for (const r of ratings) {
    if (r < 4) {
        continue;
    }
    console.log(`  ${r}★`);
}

// --- Bucles anidados ---

// Un bucle dentro de otro. Útil para trabajar con datos
// organizados en grupos.

const menu = [
    ["Café con leche", "Té chai latte"],
    ["Tarta de chocolate", "Cheesecake"],
    ["Sándwich club", "Ensalada mediterránea"]
];
const categories = ["Bebidas", "Postres", "Platos principales"];

console.log("\n--- Bucles anidados ---");
for (let i = 0; i < categories.length; i++) {
    console.log(`\n${categories[i]}:`);
    for (const item of menu[i]) {
        console.log(`  - ${item}`);
    }
}

// --- Patrón acumulador ---

// Uno de los patrones más comunes: recorrer un array y
// acumular un resultado (suma, conteo, etc.)

const times = [10, 60, 15, 30, 90, 8, 20, 45];

// Sumar todos los tiempos
let totalMinutes = 0;
for (const t of times) {
    totalMinutes += t;
}
console.log("\n--- Patrón acumulador ---");
console.log(`Tiempo total: ${totalMinutes} minutos`);
// Salida: Tiempo total: 278 minutos

// Contar recetas rápidas (menos de 20 min)
let quickCount = 0;
for (const t of times) {
    if (t < 20) {
        quickCount++;
    }
}
console.log(`Recetas rápidas (< 20 min): ${quickCount}`);
// Salida: Recetas rápidas (< 20 min): 3

// Encontrar el tiempo máximo
let maxTime = times[0];
for (const t of times) {
    if (t > maxTime) {
        maxTime = t;
    }
}
console.log(`Receta más larga: ${maxTime} minutos`);
// Salida: Receta más larga: 90 minutos
