// ============================================================
// TEMA 6: Arrays
// ============================================================
//
// OBJETIVO: Trabajar con listas de datos.
//
// EXPLICACIÓN:
// Un array es una lista ordenada de elementos. En el
// recetario, puedes tener una lista de ingredientes, una
// lista de pasos de preparación o una lista de recetas.
//
// Los arrays se crean con corchetes [] y cada elemento
// se separa con una coma.
//
// EJECUCIÓN:
//   node teoría/tema6_arrays.js
// ============================================================

// --- Crear arrays ---

const ingredients = ["harina", "azúcar", "huevos", "mantequilla"];
const times = [10, 60, 15, 30, 90];
const mixed = ["café", 2, true, null]; // Puede mezclar tipos (no recomendado)

console.log("--- Crear arrays ---");
console.log(ingredients);
console.log(times);

// Array vacío
const newRecipes = [];
console.log("Array vacío:", newRecipes);

// --- Acceder por índice ---

// Los índices empiezan en 0 (no en 1)
console.log("\n--- Acceder por índice ---");
console.log(`Primer ingrediente: ${ingredients[0]}`);   // harina
console.log(`Segundo ingrediente: ${ingredients[1]}`);  // azúcar
console.log(`Último ingrediente: ${ingredients[ingredients.length - 1]}`); // mantequilla

// --- length ---

console.log("\n--- length ---");
console.log(`Total de ingredientes: ${ingredients.length}`); // 4
console.log(`Total de tiempos: ${times.length}`);           // 5

// --- Modificar elementos ---

const steps = ["Mezclar", "Hornear", "Servir"];
console.log("\n--- Modificar ---");
console.log("Antes:", steps);

steps[1] = "Hornear a 180°C";
console.log("Después:", steps);

// Nota: aunque steps es const, podemos modificar su contenido.
// const impide reasignar la variable, no modificar el array.

// --- push y pop (final del array) ---

const shoppingList = ["harina", "azúcar"];

console.log("\n--- push y pop ---");
console.log("Inicio:", shoppingList);

shoppingList.push("huevos");
shoppingList.push("leche");
console.log("Después de push:", shoppingList);

const last = shoppingList.pop();
console.log("pop devuelve:", last); // "leche"
console.log("Después de pop:", shoppingList);

// --- shift y unshift (inicio del array) ---

console.log("\n--- shift y unshift ---");

shoppingList.unshift("chocolate");
console.log("Después de unshift:", shoppingList);

const first = shoppingList.shift();
console.log("shift devuelve:", first); // "chocolate"
console.log("Después de shift:", shoppingList);

// --- splice (agregar/eliminar en cualquier posición) ---

const cakeIngredients = ["harina", "azúcar", "huevos", "mantequilla", "chocolate"];

console.log("\n--- splice ---");
console.log("Antes:", cakeIngredients);

// Eliminar 1 elemento desde la posición 2
const removed = cakeIngredients.splice(2, 1);
console.log("Eliminado:", removed);
console.log("Después:", cakeIngredients);

// Insertar sin eliminar (0 elementos eliminados)
cakeIngredients.splice(2, 0, "huevos", "leche");
console.log("Después de insertar:", cakeIngredients);

// --- includes e indexOf ---

const categories = ["bebidas", "postres", "platos principales", "snacks"];

console.log("\n--- includes e indexOf ---");
console.log(`¿Tiene postres? ${categories.includes("postres")}`);     // true
console.log(`¿Tiene sopas? ${categories.includes("sopas")}`);         // false

console.log(`Posición de "snacks": ${categories.indexOf("snacks")}`); // 3
console.log(`Posición de "sopas": ${categories.indexOf("sopas")}`);   // -1

// --- join ---

// Convierte un array en un string, uniendo con un separador.

const recipeSteps = ["Mezclar ingredientes", "Verter en molde", "Hornear 30 min"];

console.log("\n--- join ---");
console.log(recipeSteps.join(" → "));
// Salida: Mezclar ingredientes → Verter en molde → Hornear 30 min

console.log(recipeSteps.join("\n"));

// --- reverse ---

console.log("\n--- reverse ---");
const nums = [1, 2, 3, 4, 5];
console.log("Original:", [...nums]);
nums.reverse();
console.log("Invertido:", nums);
// Cuidado: reverse modifica el array original

// --- concat ---

// Combina dos o más arrays en uno nuevo (no modifica los originales).

const drinks = ["Café", "Té chai"];
const desserts = ["Tarta", "Cheesecake"];

console.log("\n--- concat ---");
const fullMenu = drinks.concat(desserts);
console.log("Menú completo:", fullMenu);
console.log("Bebidas sigue igual:", drinks);

// --- slice ---

// Extrae una porción del array SIN modificar el original.
// slice(inicio, fin) — fin no se incluye

const allTimes = [10, 60, 15, 30, 90, 8, 20, 45];

console.log("\n--- slice ---");
const firstThree = allTimes.slice(0, 3);
console.log("Primeros 3:", firstThree); // [ 10, 60, 15 ]

const lastTwo = allTimes.slice(-2);
console.log("Últimos 2:", lastTwo);    // [ 20, 45 ]

console.log("Original intacto:", allTimes);

// --- Iterar con for y for...of ---

const recipeNames = ["Café con leche", "Tarta de chocolate", "Sándwich club"];

console.log("\n--- Iterar con for ---");
for (let i = 0; i < recipeNames.length; i++) {
    console.log(`${i + 1}. ${recipeNames[i]}`);
}

console.log("\n--- Iterar con for...of ---");
for (const name of recipeNames) {
    console.log(`• ${name}`);
}
