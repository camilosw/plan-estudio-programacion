// ============================================================
// TEMA 15: Proyecto integrador — El Recetario de Sandra
// ============================================================
//
// OBJETIVO: Construir un sistema completo que integre todos
// los conceptos aprendidos en los temas 1–14.
//
// Este proyecto usa:
//   - Variables y tipos (tema 2)
//   - Condicionales y operadores (tema 3)
//   - Bucles (tema 4)
//   - Funciones y arrow functions (tema 5)
//   - Arrays y sus métodos (temas 6, 9, 10)
//   - Objetos (tema 7)
//   - Arrays de objetos (tema 8)
//   - Desestructuración y spread (tema 11)
//   - Clases y herencia (tema 12)
//   - Fechas (tema 13)
//   - Promesas y async/await (tema 14)
//
// EJECUCIÓN:
//   node teoría/tema15_proyecto_integrador.js
// ============================================================

// ============================================================
// CLASES
// ============================================================

class Recipe {
    #rating;

    constructor(name, category, timeMinutes, rating, ingredients = []) {
        this.name = name;
        this.category = category;
        this.timeMinutes = timeMinutes;
        this.#rating = rating;
        this.ingredients = ingredients;
        this.available = true;
        this.createdAt = new Date();
    }

    get rating() {
        return this.#rating;
    }

    set rating(value) {
        if (value < 1 || value > 5) {
            console.log("  Error: la calificación debe ser entre 1 y 5");
            return;
        }
        this.#rating = value;
    }

    get formattedTime() {
        const hours = Math.floor(this.timeMinutes / 60);
        const minutes = this.timeMinutes % 60;
        if (hours === 0) return `${minutes}min`;
        return `${hours}h ${minutes}min`;
    }

    get difficulty() {
        if (this.timeMinutes <= 15) return "fácil";
        if (this.timeMinutes <= 45) return "media";
        return "difícil";
    }

    show() {
        const status = this.available ? "✓" : "✗";
        const dateStr = this.createdAt.toLocaleDateString("es-ES", {
            day: "numeric",
            month: "short",
            year: "numeric"
        });
        console.log(`  ${status} ${this.name}`);
        console.log(`    ${this.category} | ${this.formattedTime} | ${this.#rating}★ | ${this.difficulty}`);
        console.log(`    Ingredientes: ${this.ingredients.join(", ") || "sin especificar"}`);
        console.log(`    Creada: ${dateStr}`);
    }
}

class DessertRecipe extends Recipe {
    constructor(name, timeMinutes, rating, ingredients, bakingTemp) {
        super(name, "postres", timeMinutes, rating, ingredients);
        this.bakingTemp = bakingTemp;
    }

    show() {
        super.show();
        if (this.bakingTemp > 0) {
            console.log(`    Hornear a ${this.bakingTemp}°C`);
        }
    }

    needsOven() {
        return this.bakingTemp > 0;
    }
}

class DrinkRecipe extends Recipe {
    constructor(name, timeMinutes, rating, ingredients, isHot) {
        super(name, "bebidas", timeMinutes, rating, ingredients);
        this.isHot = isHot;
    }

    show() {
        super.show();
        console.log(`    Temperatura: ${this.isHot ? "caliente" : "fría"}`);
    }
}

// ============================================================
// DATOS DEL RECETARIO
// ============================================================

const recipes = [
    new DrinkRecipe(
        "Café con leche espumosa", 10, 4.5,
        ["café molido", "leche", "azúcar"], true
    ),
    new DessertRecipe(
        "Tarta de chocolate", 60, 4.8,
        ["chocolate", "harina", "huevos", "mantequilla", "azúcar"], 180
    ),
    new Recipe(
        "Sándwich club", "platos principales", 15, 4.2,
        ["pan", "jamón", "queso", "lechuga", "tomate"]
    ),
    new Recipe(
        "Galletas de avena", "snacks", 30, 4.0,
        ["avena", "miel", "mantequilla", "pasas"]
    ),
    new DessertRecipe(
        "Cheesecake de frutos rojos", 90, 4.9,
        ["queso crema", "galletas", "frutos rojos", "azúcar", "gelatina"], 160
    ),
    new DrinkRecipe(
        "Té chai latte", 8, 4.3,
        ["té negro", "canela", "cardamomo", "leche", "miel"], true
    ),
    new Recipe(
        "Ensalada mediterránea", "platos principales", 20, 3.8,
        ["lechuga", "tomate", "pepino", "aceitunas", "queso feta"]
    ),
    new DessertRecipe(
        "Brownie con nueces", 45, 4.6,
        ["chocolate", "nueces", "harina", "huevos", "mantequilla"], 175
    )
];

recipes[2].available = false;
recipes[7].available = false;

// ============================================================
// FUNCIONES DEL RECETARIO
// ============================================================

function findRecipe(name) {
    return recipes.find(r => r.name.toLowerCase().includes(name.toLowerCase()));
}

function filterByCategory(category) {
    return recipes.filter(r => r.category === category);
}

function getQuickRecipes(maxMinutes = 20) {
    return recipes.filter(r => r.timeMinutes <= maxMinutes);
}

function getAvailableRecipes() {
    return recipes.filter(r => r.available);
}

function getAverageRating() {
    const sum = recipes.reduce((total, r) => total + r.rating, 0);
    return (sum / recipes.length).toFixed(1);
}

function getSummaryByCategory() {
    return recipes.reduce((result, r) => {
        const cat = r.category;
        if (!result[cat]) {
            result[cat] = { count: 0, totalTime: 0, ratingSum: 0 };
        }
        result[cat].count++;
        result[cat].totalTime += r.timeMinutes;
        result[cat].ratingSum += r.rating;
        return result;
    }, {});
}

function getTopRecipes(n = 3) {
    return [...recipes]
        .filter(r => r.available)
        .sort((a, b) => b.rating - a.rating)
        .slice(0, n);
}

function adjustServings(recipe, originalServings, desiredServings) {
    const { name } = recipe;
    const factor = desiredServings / originalServings;
    return {
        name: `${name} (para ${desiredServings})`,
        factor: factor.toFixed(1),
        note: `Multiplica cada cantidad por ${factor.toFixed(1)}`
    };
}

function addRecipe(newRecipe) {
    recipes.push(newRecipe);
    return recipes.length;
}

function loadFeaturedFromServer() {
    return new Promise((resolve) => {
        setTimeout(() => {
            const featured = recipes
                .filter(r => r.rating >= 4.5 && r.available)
                .map(({ name, rating }) => ({ name, rating }));
            resolve(featured);
        }, 800);
    });
}

// ============================================================
// FLUJO PRINCIPAL
// ============================================================

async function startCookbook() {
    console.log("╔══════════════════════════════════════════╗");
    console.log("║     EL RECETARIO DE SANDRA               ║");
    console.log("║     Sistema de gestión de recetas         ║");
    console.log("╚══════════════════════════════════════════╝");

    // --- Catálogo completo ---
    console.log("\n📋 CATÁLOGO COMPLETO");
    console.log("─".repeat(45));
    recipes.forEach((recipe, i) => {
        console.log(`\n  Receta #${i + 1}:`);
        recipe.show();
    });

    // --- Buscar receta ---
    console.log("\n\n🔍 BUSCAR RECETA: 'chocolate'");
    console.log("─".repeat(45));
    const found = findRecipe("chocolate");
    if (found) {
        found.show();
    } else {
        console.log("  No se encontró la receta");
    }

    // --- Filtrar por categoría ---
    console.log("\n\n☕ BEBIDAS");
    console.log("─".repeat(45));
    const drinks = filterByCategory("bebidas");
    drinks.forEach(r => {
        console.log(`  ${r.name} — ${r.formattedTime} — ${r.rating}★`);
    });

    // --- Recetas rápidas ---
    console.log("\n\n⚡ RECETAS RÁPIDAS (≤ 15 min)");
    console.log("─".repeat(45));
    const quick = getQuickRecipes(15);
    quick.forEach(r => {
        console.log(`  ${r.name} — ${r.timeMinutes} min`);
    });

    // --- Top 3 ---
    console.log("\n\n🏆 TOP 3 RECETAS DISPONIBLES");
    console.log("─".repeat(45));
    const top = getTopRecipes(3);
    top.forEach((r, i) => {
        console.log(`  ${i + 1}. ${r.name} — ${r.rating}★`);
    });

    // --- Ajustar porciones ---
    console.log("\n\n📐 AJUSTAR PORCIONES");
    console.log("─".repeat(45));
    const cakeFound = findRecipe("Tarta");
    if (cakeFound) {
        const adjusted = adjustServings(cakeFound, 8, 4);
        console.log(`  ${adjusted.name}`);
        console.log(`  ${adjusted.note}`);
    }

    // --- Resumen por categoría ---
    console.log("\n\n📊 RESUMEN POR CATEGORÍA");
    console.log("─".repeat(45));
    const summary = getSummaryByCategory();
    for (const [cat, data] of Object.entries(summary)) {
        const avgRating = (data.ratingSum / data.count).toFixed(1);
        console.log(`  ${cat}: ${data.count} recetas | ${data.totalTime} min total | ${avgRating}★ promedio`);
    }

    // --- Agregar nueva receta ---
    console.log("\n\n➕ AGREGAR NUEVA RECETA");
    console.log("─".repeat(45));
    const newRecipe = new DrinkRecipe(
        "Chocolate caliente", 12, 4.4,
        ["chocolate", "leche", "azúcar", "canela"], true
    );
    const totalRecipes = addRecipe(newRecipe);
    console.log(`  Agregada: ${newRecipe.name}`);
    console.log(`  Total de recetas: ${totalRecipes}`);

    // --- Estadísticas ---
    console.log("\n\n📈 ESTADÍSTICAS");
    console.log("─".repeat(45));
    const availableList = getAvailableRecipes();
    console.log(`  Total de recetas: ${recipes.length}`);
    console.log(`  Disponibles: ${availableList.length}`);
    console.log(`  No disponibles: ${recipes.length - availableList.length}`);
    console.log(`  Calificación promedio: ${getAverageRating()}★`);

    const allGood = recipes.every(r => r.rating >= 3.5);
    console.log(`  ¿Todas con rating ≥ 3.5? ${allGood ? "Sí" : "No"}`);

    const anyHard = recipes.some(r => r.difficulty === "difícil");
    console.log(`  ¿Alguna receta difícil? ${anyHard ? "Sí" : "No"}`);

    // --- Cargar destacadas (async) ---
    console.log("\n\n🌐 CARGANDO DESTACADAS DEL SERVIDOR...");
    console.log("─".repeat(45));
    const featured = await loadFeaturedFromServer();
    console.log(`  Se cargaron ${featured.length} recetas destacadas:`);
    featured.forEach(({ name, rating }) => {
        console.log(`  ⭐ ${name} — ${rating}★`);
    });

    // --- Despedida ---
    const now = new Date();
    const formattedDate = now.toLocaleDateString("es-ES", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    console.log("\n\n═══════════════════════════════════════════");
    console.log(`  Reporte generado: ${formattedDate}`);
    console.log("  ¡Gracias por usar El Recetario de Sandra!");
    console.log("═══════════════════════════════════════════");
}

startCookbook();
