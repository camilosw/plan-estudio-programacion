// ============================================================
// TEMA 9: Métodos de arrays I — forEach, map, filter, find
// ============================================================
//
// OBJETIVO: Usar los métodos integrados de arrays para
// transformar y buscar datos.
//
// EXPLICACIÓN:
// En el tema anterior, resolviste problemas de búsqueda y
// filtrado usando bucles for. JavaScript tiene métodos
// integrados que hacen lo mismo de forma más concisa.
//
// La clave para entender estos métodos es el concepto de
// CALLBACK: una función que le pasas a otra función para
// que la ejecute por ti. Cada método recorre el array
// internamente y ejecuta tu callback en cada elemento.
//
// EJECUCIÓN:
//   node teoría/tema9_metodos_de_arrays_1.js
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

// --- ¿Qué es un callback? ---

// Un callback es una función que le pasas como argumento a otra.
// Los métodos de arrays reciben un callback y lo ejecutan
// por cada elemento del array.

function greet(name) {
    console.log(`¡Hola, ${name}!`);
}

console.log("--- ¿Qué es un callback? ---");
["Sandra", "Carlos", "María"].forEach(greet);

// Normalmente usamos arrow functions directamente:
["Sandra", "Carlos", "María"].forEach(name => console.log(`Hola, ${name}`));

// --- forEach ---

// forEach recorre cada elemento y ejecuta el callback.
// No devuelve nada (no crea un nuevo array).
// Es como un for...of pero en forma de método.

console.log("\n--- forEach ---");
recipes.forEach(recipe => {
    console.log(`• ${recipe.name} — ${recipe.rating}★`);
});

// forEach también recibe el índice como segundo argumento
console.log("\nCon índice:");
recipes.forEach((recipe, index) => {
    console.log(`${index + 1}. ${recipe.name}`);
});

// --- map ---

// map crea un NUEVO ARRAY transformando cada elemento.
// El callback debe devolver (return) el nuevo valor.

console.log("\n--- map ---");

const names = recipes.map(recipe => recipe.name);
console.log("Nombres:", names);

const cards = recipes.map(recipe => {
    return `${recipe.name} (${recipe.timeMinutes} min)`;
});
console.log("Fichas:", cards);

// --- filter ---

// filter crea un NUEVO ARRAY con solo los elementos que
// cumplen la condición. El callback debe devolver true/false.

console.log("\n--- filter ---");

const quickRecipes = recipes.filter(recipe => recipe.timeMinutes < 20);
console.log("Recetas rápidas:");
quickRecipes.forEach(r => console.log(`  ${r.name} — ${r.timeMinutes} min`));

const featured = recipes.filter(r => r.available && r.rating >= 4.5);
console.log("\nDestacadas y disponibles:");
featured.forEach(r => console.log(`  ${r.name} — ${r.rating}★`));

const desserts = recipes.filter(r => r.category === "postres");
console.log(`\nPostres encontrados: ${desserts.length}`);

// --- find ---

// find devuelve el PRIMER elemento que cumple la condición.
// Si ninguno cumple, devuelve undefined.
// A diferencia de filter, find solo devuelve UN elemento.

console.log("\n--- find ---");

const cake = recipes.find(r => r.name === "Tarta de chocolate");
console.log("Encontrada:", cake.name, "—", cake.timeMinutes, "min");

const soup = recipes.find(r => r.category === "sopas");
console.log("Sopas:", soup); // undefined

// --- findIndex ---

// findIndex devuelve la POSICIÓN del primer elemento que
// cumple la condición. Si no encuentra, devuelve -1.

console.log("\n--- findIndex ---");

const cheesecakeIndex = recipes.findIndex(r => r.name === "Cheesecake de frutos rojos");
console.log(`Cheesecake está en posición: ${cheesecakeIndex}`); // 4

const soupIndex = recipes.findIndex(r => r.category === "sopas");
console.log(`Sopas está en posición: ${soupIndex}`); // -1

// --- Resumen comparativo ---

console.log("\n--- Resumen ---");
console.log("forEach → recorre sin crear array nuevo");
console.log("map     → transforma cada elemento → nuevo array");
console.log("filter  → filtra por condición → nuevo array");
console.log("find    → busca el primero que cumple → un elemento");
