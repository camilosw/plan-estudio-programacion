// ============================================================
// TEMA 8: Arrays de objetos y bucles
// ============================================================
//
// OBJETIVO: Combinar arrays y objetos para trabajar con
// colecciones de datos.
//
// EXPLICACIÓN:
// Hasta ahora vimos arrays de valores simples (strings,
// números) y objetos individuales. Pero en la realidad,
// trabajamos con colecciones: muchas recetas, muchos
// ingredientes, muchos pedidos. Eso es un array de objetos.
//
// Este es un tema puente: aprenderás a resolver problemas
// de búsqueda, filtrado y transformación usando bucles for.
// En los temas 9 y 10 verás métodos de arrays que hacen
// estas mismas tareas de forma más concisa.
//
// EJECUCIÓN:
//   node teoría/tema8_arrays_de_objetos.js
// ============================================================

// --- El array de recetas ---

const recipes = [
    { name: "Café con leche espumosa", category: "bebidas", timeMinutes: 10, rating: 4.5, available: true },
    { name: "Tarta de chocolate", category: "postres", timeMinutes: 60, rating: 4.8, available: true },
    { name: "Sándwich club", category: "platos principales", timeMinutes: 15, rating: 4.2, available: false },
    { name: "Galletas de avena", category: "snacks", timeMinutes: 30, rating: 4.0, available: true },
    { name: "Cheesecake de frutos rojos", category: "postres", timeMinutes: 90, rating: 4.9, available: true },
    { name: "Té chai latte", category: "bebidas", timeMinutes: 8, rating: 4.3, available: true },
    { name: "Ensalada mediterránea", category: "platos principales", timeMinutes: 20, rating: 3.8, available: true },
    { name: "Brownie con nueces", category: "postres", timeMinutes: 45, rating: 4.6, available: false }
];

// --- Recorrer y mostrar ---

console.log("--- Todas las recetas ---");
for (let i = 0; i < recipes.length; i++) {
    const r = recipes[i];
    console.log(`${i + 1}. ${r.name} — ${r.category} — ${r.rating}★`);
}

// También con for...of (sin índice):
console.log("\n--- Con for...of ---");
for (const recipe of recipes) {
    const status = recipe.available ? "✓" : "✗";
    console.log(`${status} ${recipe.name}`);
}

// --- Buscar un elemento ---

console.log("\n--- Buscar por nombre ---");
const searchName = "Tarta de chocolate";
let found = null;

for (const recipe of recipes) {
    if (recipe.name === searchName) {
        found = recipe;
        break;
    }
}

if (found !== null) {
    console.log(`Encontrada: ${found.name} — ${found.timeMinutes} min`);
} else {
    console.log("No se encontró la receta");
}

// --- Filtrar en un nuevo array ---

console.log("\n--- Filtrar: recetas rápidas (< 20 min) ---");
const quickRecipes = [];

for (const recipe of recipes) {
    if (recipe.timeMinutes < 20) {
        quickRecipes.push(recipe);
    }
}

for (const r of quickRecipes) {
    console.log(`${r.name} — ${r.timeMinutes} min`);
}

// --- Filtrar por categoría ---

console.log("\n--- Filtrar: postres ---");
const desserts = [];

for (const recipe of recipes) {
    if (recipe.category === "postres") {
        desserts.push(recipe);
    }
}

for (const d of desserts) {
    console.log(`${d.name} — ${d.rating}★`);
}

// --- Contar elementos ---

console.log("\n--- Contar ---");
let availableCount = 0;
let unavailableCount = 0;

for (const recipe of recipes) {
    if (recipe.available) {
        availableCount++;
    } else {
        unavailableCount++;
    }
}

console.log(`Disponibles: ${availableCount}`);
console.log(`No disponibles: ${unavailableCount}`);

// --- Sumar y promediar ---

console.log("\n--- Sumar y promediar ---");
let ratingSum = 0;

for (const recipe of recipes) {
    ratingSum += recipe.rating;
}

const average = ratingSum / recipes.length;
console.log(`Calificación promedio: ${average.toFixed(1)}★`);

// --- Encontrar el máximo ---

console.log("\n--- Receta mejor valorada ---");
let bestRecipe = recipes[0];

for (const recipe of recipes) {
    if (recipe.rating > bestRecipe.rating) {
        bestRecipe = recipe;
    }
}

console.log(`${bestRecipe.name} — ${bestRecipe.rating}★`);

// --- Construir un nuevo array transformado ---

console.log("\n--- Extraer nombres ---");
const names = [];

for (const recipe of recipes) {
    names.push(recipe.name);
}

console.log(names);

// Crear un array de strings formateados
console.log("\n--- Array formateado ---");
const cards = [];

for (const recipe of recipes) {
    cards.push(`${recipe.name} (${recipe.timeMinutes} min)`);
}

for (const card of cards) {
    console.log(card);
}

// --- Agrupar por categoría ---

console.log("\n--- Agrupar por categoría ---");
const byCategory = {};

for (const recipe of recipes) {
    const cat = recipe.category;
    if (byCategory[cat] === undefined) {
        byCategory[cat] = [];
    }
    byCategory[cat].push(recipe.name);
}

for (const category in byCategory) {
    console.log(`\n${category.toUpperCase()}:`);
    for (const name of byCategory[category]) {
        console.log(`  - ${name}`);
    }
}
