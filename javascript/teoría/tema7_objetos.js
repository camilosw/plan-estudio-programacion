// ============================================================
// TEMA 7: Objetos
// ============================================================
//
// OBJETIVO: Agrupar datos relacionados en una sola estructura.
//
// EXPLICACIÓN:
// Hasta ahora, los datos de una receta los guardábamos en
// variables sueltas: nombre, tiempo, categoría... Pero todos
// esos datos pertenecen a la misma receta. Un OBJETO permite
// agruparlos bajo un mismo nombre.
//
// Piensa en una ficha de receta: tiene campos (nombre, tiempo,
// ingredientes) y cada campo tiene un valor. Eso es un objeto.
//
// EJECUCIÓN:
//   node teoría/tema7_objetos.js
// ============================================================

// --- Crear un objeto literal ---

const recipe = {
    name: "Café con leche espumosa",
    category: "bebidas",
    timeMinutes: 10,
    servings: 2,
    rating: 4.5,
    available: true
};

console.log("--- Objeto literal ---");
console.log(recipe);

// --- Acceder a propiedades ---

// Dot notation (notación de punto) — la más común
console.log("\n--- Dot notation ---");
console.log(recipe.name);        // "Café con leche espumosa"
console.log(recipe.timeMinutes); // 10

// Bracket notation (notación de corchetes)
// Útil cuando el nombre de la propiedad está en una variable
// o tiene caracteres especiales
console.log("\n--- Bracket notation ---");
console.log(recipe["category"]); // "bebidas"

const field = "rating";
console.log(recipe[field]);      // 4.5

// --- Modificar propiedades ---

console.log("\n--- Modificar ---");
recipe.rating = 4.7;
console.log(`Nueva calificación: ${recipe.rating}`);

// --- Agregar propiedades ---

recipe.difficulty = "fácil";
console.log("Dificultad agregada:", recipe.difficulty);

// --- Eliminar propiedades ---

delete recipe.available;
console.log("¿Tiene 'available'?", "available" in recipe); // false

// --- Métodos (funciones dentro de un objeto) ---

const chocolateCake = {
    name: "Tarta de chocolate",
    category: "postres",
    timeMinutes: 60,
    rating: 4.8,

    showSummary() {
        console.log(`${this.name} — ${this.category}`);
        console.log(`Tiempo: ${this.timeMinutes} min | ${this.rating}★`);
    },

    isQuick() {
        return this.timeMinutes <= 15;
    }
};

console.log("\n--- Métodos ---");
chocolateCake.showSummary();

console.log(`¿Es rápida? ${chocolateCake.isQuick()}`); // false

// --- this ---

// Dentro de un método, this hace referencia al objeto que
// contiene ese método. Permite acceder a sus propiedades.

// IMPORTANTE: this solo funciona en métodos escritos con la
// sintaxis normal. NO funciona con arrow functions.

const cookies = {
    name: "Galletas de avena",
    servings: 12,

    // Correcto: método con sintaxis normal
    show() {
        console.log(`${this.name}: ${this.servings} porciones`);
    },

    // Incorrecto: arrow function NO tiene su propio this
    // show: () => {
    //     console.log(this.name); // undefined — no funciona
    // }
};

console.log("\n--- this ---");
cookies.show(); // Galletas de avena: 12 porciones

// --- Object.keys(), Object.values(), Object.entries() ---

const brownie = {
    name: "Brownie con nueces",
    category: "postres",
    timeMinutes: 45,
    rating: 4.6
};

console.log("\n--- Object.keys/values/entries ---");

console.log("Propiedades:", Object.keys(brownie));
console.log("Valores:", Object.values(brownie));
console.log("Entradas:", Object.entries(brownie));

// --- Iterar con for...in ---

console.log("\n--- for...in ---");
for (const key in brownie) {
    console.log(`${key}: ${brownie[key]}`);
}

// --- Objetos anidados ---

const fullRecipe = {
    name: "Cheesecake de frutos rojos",
    category: "postres",
    timeMinutes: 90,
    servings: 8,
    mainIngredient: {
        name: "queso crema",
        amount: 500,
        unit: "gramos"
    },
    steps: [
        "Triturar las galletas para la base",
        "Mezclar el queso crema con azúcar",
        "Hornear a 160°C por 50 minutos",
        "Refrigerar 4 horas"
    ]
};

console.log("\n--- Objetos anidados ---");
console.log(`Receta: ${fullRecipe.name}`);
console.log(`Ingrediente principal: ${fullRecipe.mainIngredient.name}`);
console.log(`Cantidad: ${fullRecipe.mainIngredient.amount} ${fullRecipe.mainIngredient.unit}`);
console.log(`Primer paso: ${fullRecipe.steps[0]}`);
console.log(`Total de pasos: ${fullRecipe.steps.length}`);

// --- Referencia vs valor ---

// Los objetos se pasan por REFERENCIA, no por valor.
// Esto significa que dos variables pueden apuntar al mismo objeto.

console.log("\n--- Referencia vs valor ---");

const original = { name: "Café", time: 10 };
const copy = original; // NO es una copia, es la misma referencia

copy.time = 15;
console.log("Original:", original.time); // 15 (también cambió)

// Para hacer una copia real, usa el spread operator (...) o Object.assign
const realCopy = { ...original };
realCopy.time = 20;
console.log("Original:", original.time);  // 15 (no cambió)
console.log("Copia real:", realCopy.time); // 20
