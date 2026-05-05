// ============================================================
// TEMA 14: Promesas y async/await
// ============================================================
//
// OBJETIVO: Entender el código asíncrono y manejar operaciones
// que toman tiempo.
//
// EXPLICACIÓN:
// Imagina que estás en la cafetería. Pides un café y mientras
// lo preparan, no te quedas parada esperando sin hacer nada:
// revisas el menú, eliges una mesa, miras tu teléfono. Cuando
// el café está listo, te avisan.
//
// En programación, hay operaciones que tardan: buscar datos
// en una base de datos, descargar un archivo, esperar una
// respuesta de un servidor. JavaScript no se detiene a esperar;
// sigue ejecutando el resto del código y "te avisa" cuando
// la operación termina. Eso es código ASÍNCRONO.
//
// EJECUCIÓN:
//   node teoría/tema14_promesas_y_async_await.js
// ============================================================

// --- Síncrono vs asíncrono ---

console.log("--- Síncrono vs asíncrono ---");
console.log("1. Pido un café");
console.log("2. Elijo una mesa");
console.log("3. Me siento");

// --- setTimeout ---

console.log("\n--- setTimeout ---");
console.log("1. Pido un café");

setTimeout(() => {
    console.log("3. ¡Café listo! (después de 1 segundo)");
}, 1000);

console.log("2. Mientras espero, elijo una mesa");

// --- setInterval ---

console.log("\n--- setInterval ---");
let seconds = 0;
const timer = setInterval(() => {
    seconds++;
    console.log(`Horneando... ${seconds} segundo(s)`);
    if (seconds >= 3) {
        clearInterval(timer);
        console.log("¡Listo para sacar del horno!");
    }
}, 500);

// --- Callbacks y el problema del "callback hell" ---

function prepareIngredient(ingredient, callback) {
    setTimeout(() => {
        console.log(`✓ ${ingredient} listo`);
        callback();
    }, 300);
}

setTimeout(() => {
    console.log("\n--- Callback hell (ejemplo) ---");
    prepareIngredient("Harina", () => {
        prepareIngredient("Azúcar", () => {
            prepareIngredient("Huevos", () => {
                console.log("Todos los ingredientes listos");
            });
        });
    });
}, 2500);

// --- Promesas ---

function findRecipe(name) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const recipes = {
                "Café con leche": { name: "Café con leche espumosa", timeMinutes: 10, rating: 4.5 },
                "Tarta": { name: "Tarta de chocolate", timeMinutes: 60, rating: 4.8 }
            };

            const recipe = recipes[name];
            if (recipe) {
                resolve(recipe);
            } else {
                reject(`No se encontró la receta "${name}"`);
            }
        }, 500);
    });
}

// --- .then() / .catch() / .finally() ---

setTimeout(() => {
    console.log("\n--- Promesas con .then/.catch ---");

    findRecipe("Tarta")
        .then(recipe => {
            console.log(`Encontrada: ${recipe.name} — ${recipe.rating}★`);
        })
        .catch(error => {
            console.log(`Error: ${error}`);
        })
        .finally(() => {
            console.log("Búsqueda finalizada");
        });

    findRecipe("Sushi")
        .then(recipe => {
            console.log(`Encontrada: ${recipe.name}`);
        })
        .catch(error => {
            console.log(`Error: ${error}`);
        });
}, 5000);

// --- async / await ---

async function searchAndShow() {
    console.log("\n--- async/await ---");

    try {
        const recipe = await findRecipe("Café con leche");
        console.log(`Encontrada: ${recipe.name}`);
        console.log(`Tiempo: ${recipe.timeMinutes} min`);
        console.log(`Calificación: ${recipe.rating}★`);
    } catch (error) {
        console.log(`Error: ${error}`);
    }

    try {
        const recipe = await findRecipe("Pizza");
        console.log(recipe);
    } catch (error) {
        console.log(`Error capturado: ${error}`);
    }
}

setTimeout(() => {
    searchAndShow();
}, 7000);

// --- Promise.all ---

function checkIngredient(ingredient) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const isAvailable = ingredient !== "azafrán";
            resolve({ ingredient, available: isAvailable });
        }, 300);
    });
}

async function checkAllIngredients() {
    console.log("\n--- Promise.all ---");
    console.log("Verificando ingredientes en paralelo...");

    const results = await Promise.all([
        checkIngredient("harina"),
        checkIngredient("azúcar"),
        checkIngredient("huevos"),
        checkIngredient("azafrán")
    ]);

    results.forEach(({ ingredient, available }) => {
        const status = available ? "✓ disponible" : "✗ no disponible";
        console.log(`  ${ingredient}: ${status}`);
    });

    const allAvailable = results.every(r => r.available);
    console.log(allAvailable
        ? "¡Todos los ingredientes disponibles!"
        : "Faltan ingredientes");
}

setTimeout(() => {
    checkAllIngredients();
}, 9000);

// --- Ejemplo práctico: simular carga de recetas ---

function loadRecipesFromDB() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { name: "Café con leche espumosa", category: "bebidas", rating: 4.5 },
                { name: "Tarta de chocolate", category: "postres", rating: 4.8 },
                { name: "Galletas de avena", category: "snacks", rating: 4.0 }
            ]);
        }, 800);
    });
}

async function startCookbook() {
    console.log("\n--- Ejemplo práctico ---");
    console.log("Cargando recetas...");

    const recipes = await loadRecipesFromDB();
    console.log(`Se cargaron ${recipes.length} recetas:`);

    recipes.forEach(r => {
        console.log(`  ${r.name} — ${r.category} — ${r.rating}★`);
    });

    const featured = recipes.filter(r => r.rating >= 4.5);
    console.log(`\nRecetas destacadas: ${featured.length}`);
}

setTimeout(() => {
    startCookbook();
}, 11000);
