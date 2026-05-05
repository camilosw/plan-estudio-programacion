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

const recetas = [
    "Café con leche espumosa",
    "Tarta de chocolate",
    "Sándwich club",
    "Galletas de avena",
    "Cheesecake de frutos rojos"
];

console.log("--- for clásico ---");
for (let i = 0; i < recetas.length; i++) {
    console.log(`${i + 1}. ${recetas[i]}`);
}
// Salida:
// 1. Café con leche espumosa
// 2. Tarta de chocolate
// 3. Sándwich club
// 4. Galletas de avena
// 5. Cheesecake de frutos rojos

// --- while ---

// El while repite mientras la condición sea verdadera.
// Útil cuando no sabes cuántas veces se ejecutará.

const tiemposPreparacion = [10, 60, 15, 30, 90];

console.log("\n--- while ---");
console.log("Buscando la primera receta de más de 30 minutos...");

let indice = 0;
while (indice < tiemposPreparacion.length) {
    if (tiemposPreparacion[indice] > 30) {
        console.log(`Encontrada en posición ${indice}: ${tiemposPreparacion[indice]} min`);
        break; // Detenemos la búsqueda
    }
    indice++;
}
// Salida:
// Buscando la primera receta de más de 30 minutos...
// Encontrada en posición 1: 60 min

// --- do...while ---

// Similar a while, pero se ejecuta al menos una vez antes
// de comprobar la condición.

console.log("\n--- do...while ---");

let intentos = 0;
do {
    intentos++;
    console.log(`Intento de preparación #${intentos}`);
} while (intentos < 3);
// Salida:
// Intento de preparación #1
// Intento de preparación #2
// Intento de preparación #3

// --- for...of ---

// for...of recorre cada elemento de un array directamente,
// sin necesidad de usar un índice. Es más limpio que el for
// clásico cuando no necesitas el número de posición.

const ingredientes = ["harina", "azúcar", "huevos", "mantequilla", "chocolate"];

console.log("\n--- for...of ---");
console.log("Ingredientes de la tarta:");
for (const ingrediente of ingredientes) {
    console.log(`  - ${ingrediente}`);
}
// Salida:
// Ingredientes de la tarta:
//   - harina
//   - azúcar
//   - huevos
//   - mantequilla
//   - chocolate

// --- break y continue ---

// break: detiene el bucle completamente
// continue: salta a la siguiente iteración

const calificaciones = [4.5, 3.2, 4.8, 2.9, 4.1, 3.8, 4.9];

console.log("\n--- break ---");
console.log("Buscando la primera receta con menos de 3 estrellas:");
for (const cal of calificaciones) {
    if (cal < 3) {
        console.log(`Encontrada: ${cal}★ — necesita mejoras`);
        break;
    }
}
// Salida: Encontrada: 2.9★ — necesita mejoras

console.log("\n--- continue ---");
console.log("Recetas destacadas (4+ estrellas):");
for (const cal of calificaciones) {
    if (cal < 4) {
        continue; // Salta las que tienen menos de 4
    }
    console.log(`  ${cal}★`);
}
// Salida:
// Recetas destacadas (4+ estrellas):
//   4.5★
//   4.8★
//   4.1★
//   4.9★

// --- Bucles anidados ---

// Un bucle dentro de otro. Útil para trabajar con datos
// organizados en grupos.

const menu = [
    ["Café con leche", "Té chai latte"],
    ["Tarta de chocolate", "Cheesecake"],
    ["Sándwich club", "Ensalada mediterránea"]
];
const categorias = ["Bebidas", "Postres", "Platos principales"];

console.log("\n--- Bucles anidados ---");
for (let i = 0; i < categorias.length; i++) {
    console.log(`\n${categorias[i]}:`);
    for (const item of menu[i]) {
        console.log(`  - ${item}`);
    }
}
// Salida:
// Bebidas:
//   - Café con leche
//   - Té chai latte
//
// Postres:
//   - Tarta de chocolate
//   - Cheesecake
//
// Platos principales:
//   - Sándwich club
//   - Ensalada mediterránea

// --- Patrón acumulador ---

// Uno de los patrones más comunes: recorrer un array y
// acumular un resultado (suma, conteo, etc.)

const tiempos = [10, 60, 15, 30, 90, 8, 20, 45];

// Sumar todos los tiempos
let totalMinutos = 0;
for (const t of tiempos) {
    totalMinutos += t;
}
console.log("\n--- Patrón acumulador ---");
console.log(`Tiempo total: ${totalMinutos} minutos`);
// Salida: Tiempo total: 278 minutos

// Contar recetas rápidas (menos de 20 min)
let recetasRapidas = 0;
for (const t of tiempos) {
    if (t < 20) {
        recetasRapidas++;
    }
}
console.log(`Recetas rápidas (< 20 min): ${recetasRapidas}`);
// Salida: Recetas rápidas (< 20 min): 3

// Encontrar el tiempo máximo
let tiempoMaximo = tiempos[0];
for (const t of tiempos) {
    if (t > tiempoMaximo) {
        tiempoMaximo = t;
    }
}
console.log(`Receta más larga: ${tiempoMaximo} minutos`);
// Salida: Receta más larga: 90 minutos

// ============================================================
// EJERCICIO
// ============================================================
// Tienes este array de tiempos de preparación en minutos:
//   const tiempos = [10, 60, 15, 30, 90, 8, 20, 45];
//
// 1. Usa un for clásico para mostrar cada tiempo con su
//    número de posición: "Receta 1: 10 min"
// 2. Usa for...of para calcular el promedio de todos los
//    tiempos
// 3. Usa while para encontrar el primer tiempo que sea
//    exactamente 30 minutos
// 4. Usa for...of con continue para mostrar solo los tiempos
//    mayores a 20 minutos
// ============================================================
