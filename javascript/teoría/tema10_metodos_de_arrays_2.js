// ============================================================
// TEMA 10: Métodos de arrays II — reduce, sort, some, every
// ============================================================
//
// OBJETIVO: Dominar los métodos avanzados de arrays y
// encadenar operaciones.
//
// EXPLICACIÓN:
// Con map, filter y find puedes transformar, filtrar y
// buscar. Pero a veces necesitas algo más: sumar totales,
// calcular promedios, ordenar listas o verificar condiciones
// sobre toda la colección. Para eso existen reduce, sort,
// some y every.
//
// EJECUCIÓN:
//   node teoría/tema10_metodos_de_arrays_2.js
// ============================================================

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

// --- reduce ---

console.log("--- reduce: sumar ---");
const totalTime = recipes.reduce((total, recipe) => {
    return total + recipe.timeMinutes;
}, 0);
console.log(`Tiempo total: ${totalTime} minutos`);

console.log("\n--- reduce: promedio ---");
const ratingSum = recipes.reduce((sum, r) => sum + r.rating, 0);
const average = ratingSum / recipes.length;
console.log(`Calificación promedio: ${average.toFixed(1)}★`);

// Contar por categoría (acumulador es un objeto)
console.log("\n--- reduce: contar por categoría ---");
const countByCategory = recipes.reduce((result, recipe) => {
    const cat = recipe.category;
    if (result[cat] === undefined) {
        result[cat] = 0;
    }
    result[cat]++;
    return result;
}, {});
console.log(countByCategory);

// Construir un resumen por categoría
console.log("\n--- reduce: resumen por categoría ---");
const summary = recipes.reduce((result, recipe) => {
    const cat = recipe.category;
    if (result[cat] === undefined) {
        result[cat] = { count: 0, totalTime: 0 };
    }
    result[cat].count++;
    result[cat].totalTime += recipe.timeMinutes;
    return result;
}, {});

for (const cat in summary) {
    const data = summary[cat];
    console.log(`${cat}: ${data.count} recetas, ${data.totalTime} min total`);
}

// --- sort ---

// Para no modificar el original, trabajamos con una copia
const sortedRecipes = [...recipes];

console.log("\n--- sort: por calificación descendente ---");
sortedRecipes.sort((a, b) => b.rating - a.rating);
sortedRecipes.forEach(r => {
    console.log(`${r.rating}★ — ${r.name}`);
});

console.log("\n--- sort: por tiempo ascendente ---");
const byTime = [...recipes];
byTime.sort((a, b) => a.timeMinutes - b.timeMinutes);
byTime.forEach(r => {
    console.log(`${r.timeMinutes} min — ${r.name}`);
});

console.log("\n--- sort: alfabético ---");
const byName = [...recipes];
byName.sort((a, b) => a.name.localeCompare(b.name));
byName.forEach(r => console.log(`• ${r.name}`));

// --- some ---

console.log("\n--- some ---");
const hasDesserts = recipes.some(r => r.category === "postres");
console.log(`¿Hay postres? ${hasDesserts}`);

const hasSoups = recipes.some(r => r.category === "sopas");
console.log(`¿Hay sopas? ${hasSoups}`);

const hasQuick = recipes.some(r => r.timeMinutes < 10);
console.log(`¿Hay receta de menos de 10 min? ${hasQuick}`);

// --- every ---

console.log("\n--- every ---");
const allAvailable = recipes.every(r => r.available);
console.log(`¿Todas disponibles? ${allAvailable}`);

const allRated = recipes.every(r => r.rating > 3);
console.log(`¿Todas con rating > 3? ${allRated}`);

// --- Encadenar métodos ---

console.log("\n--- Encadenar: top 3 disponibles ---");
const top3 = recipes
    .filter(r => r.available)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3)
    .map(r => `${r.name} — ${r.rating}★`);

top3.forEach(card => console.log(card));

console.log("\n--- Encadenar: rápidas en mayúsculas ---");
const quickUppercase = recipes
    .filter(r => r.timeMinutes <= 15)
    .map(r => r.name.toUpperCase());

console.log(quickUppercase);

console.log("\n--- Encadenar: tiempo total de postres ---");
const dessertTime = recipes
    .filter(r => r.category === "postres")
    .reduce((total, r) => total + r.timeMinutes, 0);

console.log(`Tiempo total de postres: ${dessertTime} min`);
