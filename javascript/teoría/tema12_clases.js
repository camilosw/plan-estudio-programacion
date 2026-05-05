// ============================================================
// TEMA 12: Clases
// ============================================================
//
// OBJETIVO: Crear plantillas reutilizables para objetos con
// comportamiento compartido.
//
// EXPLICACIÓN:
// En los temas anteriores creamos objetos directamente con
// llaves {}. Pero cuando necesitas crear muchos objetos con
// la misma estructura (muchas recetas, muchos ingredientes),
// una CLASE te da una plantilla reutilizable.
//
// Una clase es como un molde: defines qué propiedades y
// métodos tendrá cada objeto, y luego creas tantos objetos
// como necesites usando ese molde.
//
// EJECUCIÓN:
//   node teoría/tema12_clases.js
// ============================================================

// --- Crear una clase ---

class Recipe {
    constructor(name, category, timeMinutes, rating) {
        this.name = name;
        this.category = category;
        this.timeMinutes = timeMinutes;
        this.rating = rating;
        this.available = true;
    }
}

const coffee = new Recipe("Café con leche espumosa", "bebidas", 10, 4.5);
const cake = new Recipe("Tarta de chocolate", "postres", 60, 4.8);

console.log("--- Crear instancias ---");
console.log(coffee);
console.log(cake);

// --- Métodos ---

class RecipeWithMethods {
    constructor(name, category, timeMinutes, rating) {
        this.name = name;
        this.category = category;
        this.timeMinutes = timeMinutes;
        this.rating = rating;
        this.available = true;
    }

    showSummary() {
        const status = this.available ? "Disponible" : "No disponible";
        console.log(`${this.name} — ${this.category}`);
        console.log(`  Tiempo: ${this.timeMinutes} min | ${this.rating}★ | ${status}`);
    }

    isQuick() {
        return this.timeMinutes <= 15;
    }

    isFeatured() {
        return this.rating >= 4.5;
    }

    classifyDifficulty() {
        if (this.timeMinutes <= 15) return "fácil";
        if (this.timeMinutes <= 45) return "media";
        return "difícil";
    }
}

const brownie = new RecipeWithMethods("Brownie con nueces", "postres", 45, 4.6);

console.log("\n--- Métodos ---");
brownie.showSummary();
console.log(`¿Es rápida? ${brownie.isQuick()}`);
console.log(`¿Es destacada? ${brownie.isFeatured()}`);
console.log(`Dificultad: ${brownie.classifyDifficulty()}`);

// --- Getters y setters ---

class FullRecipe {
    constructor(name, category, timeMinutes, rating) {
        this.name = name;
        this.category = category;
        this.timeMinutes = timeMinutes;
        this._rating = rating;
        this.available = true;
    }

    get rating() {
        return this._rating;
    }

    set rating(value) {
        if (value < 1 || value > 5) {
            console.log("Error: la calificación debe ser entre 1 y 5");
            return;
        }
        this._rating = value;
    }

    get formattedTime() {
        const hours = Math.floor(this.timeMinutes / 60);
        const minutes = this.timeMinutes % 60;
        if (hours === 0) return `${minutes}min`;
        return `${hours}h ${minutes}min`;
    }
}

const cheesecake = new FullRecipe("Cheesecake de frutos rojos", "postres", 90, 4.9);

console.log("\n--- Getters y setters ---");
console.log(`Tiempo: ${cheesecake.formattedTime}`);
console.log(`Calificación: ${cheesecake.rating}`);

cheesecake.rating = 6; // Error: la calificación debe ser entre 1 y 5
cheesecake.rating = 5;
console.log(`Nueva calificación: ${cheesecake.rating}`);

// --- Herencia con extends y super ---

class BaseRecipe {
    constructor(name, category, timeMinutes, rating) {
        this.name = name;
        this.category = category;
        this.timeMinutes = timeMinutes;
        this.rating = rating;
    }

    show() {
        console.log(`${this.name} — ${this.category} — ${this.rating}★`);
    }
}

class DessertRecipe extends BaseRecipe {
    constructor(name, timeMinutes, rating, bakingTemp) {
        super(name, "postres", timeMinutes, rating);
        this.bakingTemp = bakingTemp;
    }

    show() {
        super.show();
        console.log(`  Hornear a ${this.bakingTemp}°C`);
    }

    needsOven() {
        return this.bakingTemp > 0;
    }
}

class DrinkRecipe extends BaseRecipe {
    constructor(name, timeMinutes, rating, isHot) {
        super(name, "bebidas", timeMinutes, rating);
        this.isHot = isHot;
    }

    show() {
        const temp = this.isHot ? "caliente" : "fría";
        super.show();
        console.log(`  Bebida ${temp}`);
    }
}

console.log("\n--- Herencia ---");
const inheritedCake = new DessertRecipe("Tarta de chocolate", 60, 4.8, 180);
inheritedCake.show();
console.log(`¿Necesita horno? ${inheritedCake.needsOven()}`);

const chai = new DrinkRecipe("Té chai latte", 8, 4.3, true);
chai.show();

// --- Métodos estáticos ---

class RecipeUtil {
    constructor(name, timeMinutes) {
        this.name = name;
        this.timeMinutes = timeMinutes;
    }

    static compareByTime(recipeA, recipeB) {
        return recipeA.timeMinutes - recipeB.timeMinutes;
    }

    static createQuick(name) {
        return new RecipeUtil(name, 10);
    }
}

console.log("\n--- Métodos estáticos ---");
const quick = RecipeUtil.createQuick("Tostada con aguacate");
console.log(`${quick.name} — ${quick.timeMinutes} min`);

const utilRecipes = [
    new RecipeUtil("Tarta", 60),
    new RecipeUtil("Café", 10),
    new RecipeUtil("Ensalada", 20)
];
utilRecipes.sort(RecipeUtil.compareByTime);
utilRecipes.forEach(r => console.log(`${r.timeMinutes} min — ${r.name}`));

// --- Propiedades privadas (#) ---

class PrivateRecipe {
    #rating;
    #timesCooked;

    constructor(name, rating) {
        this.name = name;
        this.#rating = rating;
        this.#timesCooked = 0;
    }

    cook() {
        this.#timesCooked++;
        console.log(`${this.name} preparada (${this.#timesCooked} veces)`);
    }

    get rating() {
        return this.#rating;
    }

    get timesCooked() {
        return this.#timesCooked;
    }
}

console.log("\n--- Propiedades privadas ---");
const privateCookies = new PrivateRecipe("Galletas de avena", 4.0);
privateCookies.cook();
privateCookies.cook();
console.log(`Calificación: ${privateCookies.rating}`);
console.log(`Veces preparada: ${privateCookies.timesCooked}`);

// Esto daría error:
// console.log(privateCookies.#rating); // SyntaxError
