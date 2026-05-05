// ============================================================
// TEMA 11: Desestructuración y spread/rest
// ============================================================
//
// OBJETIVO: Extraer datos de arrays y objetos de forma
// concisa, y combinar o clonar estructuras.
//
// EXPLICACIÓN:
// Cuando trabajas con recetas, constantemente necesitas
// extraer datos: el nombre y la categoría de una receta,
// los primeros ingredientes de una lista, etc. La
// DESESTRUCTURACIÓN te permite hacer esto en una sola línea.
//
// El operador SPREAD (...) te permite expandir un array u
// objeto, útil para clonar, combinar o crear variantes.
// REST (...) es lo contrario: recoge múltiples argumentos
// en un solo array.
//
// EJECUCIÓN:
//   node teoría/tema11_desestructuracion_y_spread.js
// ============================================================

// --- Desestructuración de arrays ---

const ingredients = ["harina", "azúcar", "huevos", "mantequilla", "chocolate"];

const [first, second, third] = ingredients;

console.log("--- Desestructuración de arrays ---");
console.log(`Primero: ${first}`);   // harina
console.log(`Segundo: ${second}`);  // azúcar
console.log(`Tercero: ${third}`);   // huevos

// Saltar elementos con comas
const [, , thirdItem, fourthItem] = ingredients;
console.log(`Tercer ingrediente: ${thirdItem}`);  // huevos
console.log(`Cuarto ingrediente: ${fourthItem}`);  // mantequilla

// Recoger el resto con ...
const [main, ...remaining] = ingredients;
console.log(`Principal: ${main}`);    // harina
console.log("Restantes:", remaining); // ['azúcar', 'huevos', 'mantequilla', 'chocolate']

// --- Desestructuración de objetos ---

const recipe = {
    name: "Tarta de chocolate",
    category: "postres",
    timeMinutes: 60,
    rating: 4.8,
    available: true
};

const { name, category, timeMinutes } = recipe;

console.log("\n--- Desestructuración de objetos ---");
console.log(`Nombre: ${name}`);       // Tarta de chocolate
console.log(`Categoría: ${category}`); // postres
console.log(`Tiempo: ${timeMinutes} min`); // 60

// --- Renombrar al desestructurar ---

const { name: recipeName, rating: recipeRating } = recipe;

console.log("\n--- Renombrar ---");
console.log(`Receta: ${recipeName}`);   // Tarta de chocolate
console.log(`Rating: ${recipeRating}`); // 4.8

// --- Valores por defecto ---

const simpleRecipe = {
    name: "Café con leche",
    timeMinutes: 10
};

const { name: n, difficulty = "fácil", servings = 1 } = simpleRecipe;

console.log("\n--- Valores por defecto ---");
console.log(`${n} — dificultad: ${difficulty} — porciones: ${servings}`);

// --- Desestructuración anidada ---

const fullRecipe = {
    name: "Cheesecake de frutos rojos",
    mainIngredient: {
        name: "queso crema",
        amount: 500,
        unit: "gramos"
    }
};

const { mainIngredient: { name: ingredientName, amount } } = fullRecipe;

console.log("\n--- Desestructuración anidada ---");
console.log(`Ingrediente: ${ingredientName} — ${amount}`);

// --- Desestructuración en parámetros de función ---

function showRecipe({ name, category, timeMinutes, rating }) {
    console.log(`${name} | ${category} | ${timeMinutes} min | ${rating}★`);
}

console.log("\n--- En parámetros de función ---");
showRecipe(recipe);

const recipes = [
    { name: "Café con leche", timeMinutes: 10, rating: 4.5 },
    { name: "Brownie", timeMinutes: 45, rating: 4.6 },
    { name: "Ensalada", timeMinutes: 20, rating: 3.8 }
];

console.log("\nCon forEach:");
recipes.forEach(({ name, rating }) => {
    console.log(`  ${name} — ${rating}★`);
});

// --- Spread en arrays ---

console.log("\n--- Spread en arrays ---");

const original = [1, 2, 3];
const copy = [...original];
copy.push(4);
console.log("Original:", original);
console.log("Copia:", copy);

const drinks = ["Café con leche", "Té chai"];
const desserts = ["Tarta", "Cheesecake"];
const fullMenu = [...drinks, ...desserts];
console.log("Menú completo:", fullMenu);

const base = ["harina", "azúcar"];
const complete = [...base, "chocolate", "nueces", ...["leche", "huevos"]];
console.log("Ingredientes completos:", complete);

// --- Spread en objetos ---

console.log("\n--- Spread en objetos ---");

const originalRecipe = {
    name: "Galletas de avena",
    timeMinutes: 30,
    rating: 4.0
};

const recipeCopy = { ...originalRecipe };
recipeCopy.rating = 4.5;
console.log("Original:", originalRecipe.rating); // 4.0
console.log("Copia:", recipeCopy.rating);        // 4.5

const sugarFreeVersion = {
    ...originalRecipe,
    name: "Galletas de avena sin azúcar",
    rating: 4.2
};
console.log("Variante:", sugarFreeVersion);

const baseData = { name: "Brownie", category: "postres" };
const extraData = { timeMinutes: 45, rating: 4.6 };
const finalRecipe = { ...baseData, ...extraData };
console.log("Receta combinada:", finalRecipe);

// --- Rest en parámetros de funciones ---

function showMenu(title, ...menuRecipes) {
    console.log(`\n=== ${title} ===`);
    menuRecipes.forEach((r, i) => console.log(`${i + 1}. ${r}`));
}

console.log("\n--- Rest en parámetros ---");
showMenu("Menú del día", "Café con leche", "Tarta de chocolate", "Ensalada");

// --- Intercambiar valores (swap) ---

console.log("\n--- Swap ---");
let a = "primero";
let b = "segundo";
console.log(`Antes: a=${a}, b=${b}`);

[a, b] = [b, a];
console.log(`Después: a=${a}, b=${b}`);
