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

const receta = {
    nombre: "Café con leche espumosa",
    categoria: "bebidas",
    tiempoMinutos: 10,
    porciones: 2,
    calificacion: 4.5,
    disponible: true
};

console.log("--- Objeto literal ---");
console.log(receta);

// --- Acceder a propiedades ---

// Dot notation (notación de punto) — la más común
console.log("\n--- Dot notation ---");
console.log(receta.nombre);       // "Café con leche espumosa"
console.log(receta.tiempoMinutos); // 10

// Bracket notation (notación de corchetes)
// Útil cuando el nombre de la propiedad está en una variable
// o tiene caracteres especiales
console.log("\n--- Bracket notation ---");
console.log(receta["categoria"]); // "bebidas"

const campo = "calificacion";
console.log(receta[campo]);      // 4.5

// --- Modificar propiedades ---

console.log("\n--- Modificar ---");
receta.calificacion = 4.7;
console.log(`Nueva calificación: ${receta.calificacion}`);

// --- Agregar propiedades ---

receta.dificultad = "fácil";
console.log("Dificultad agregada:", receta.dificultad);

// --- Eliminar propiedades ---

delete receta.disponible;
console.log("¿Tiene 'disponible'?", "disponible" in receta); // false

// --- Métodos (funciones dentro de un objeto) ---

const tartaDeChocolate = {
    nombre: "Tarta de chocolate",
    categoria: "postres",
    tiempoMinutos: 60,
    calificacion: 4.8,

    mostrarResumen() {
        console.log(`${this.nombre} — ${this.categoria}`);
        console.log(`Tiempo: ${this.tiempoMinutos} min | ${this.calificacion}★`);
    },

    esRapida() {
        return this.tiempoMinutos <= 15;
    }
};

console.log("\n--- Métodos ---");
tartaDeChocolate.mostrarResumen();
// Salida:
// Tarta de chocolate — postres
// Tiempo: 60 min | 4.8★

console.log(`¿Es rápida? ${tartaDeChocolate.esRapida()}`); // false

// --- this ---

// Dentro de un método, this hace referencia al objeto que
// contiene ese método. Permite acceder a sus propiedades.

// IMPORTANTE: this solo funciona en métodos escritos con la
// sintaxis normal. NO funciona con arrow functions.

const galletas = {
    nombre: "Galletas de avena",
    porciones: 12,

    // Correcto: método con sintaxis normal
    mostrar() {
        console.log(`${this.nombre}: ${this.porciones} porciones`);
    },

    // Incorrecto: arrow function NO tiene su propio this
    // mostrar: () => {
    //     console.log(this.nombre); // undefined — no funciona
    // }
};

console.log("\n--- this ---");
galletas.mostrar(); // Galletas de avena: 12 porciones

// --- Object.keys(), Object.values(), Object.entries() ---

const brownie = {
    nombre: "Brownie con nueces",
    categoria: "postres",
    tiempoMinutos: 45,
    calificacion: 4.6
};

console.log("\n--- Object.keys/values/entries ---");

// keys: array con los nombres de las propiedades
console.log("Propiedades:", Object.keys(brownie));
// [ 'nombre', 'categoria', 'tiempoMinutos', 'calificacion' ]

// values: array con los valores
console.log("Valores:", Object.values(brownie));
// [ 'Brownie con nueces', 'postres', 45, 4.6 ]

// entries: array de pares [clave, valor]
console.log("Entradas:", Object.entries(brownie));
// [ ['nombre', 'Brownie...'], ['categoria', 'postres'], ... ]

// --- Iterar con for...in ---

console.log("\n--- for...in ---");
for (const clave in brownie) {
    console.log(`${clave}: ${brownie[clave]}`);
}
// Salida:
// nombre: Brownie con nueces
// categoria: postres
// tiempoMinutos: 45
// calificacion: 4.6

// --- Objetos anidados ---

const recetaCompleta = {
    nombre: "Cheesecake de frutos rojos",
    categoria: "postres",
    tiempoMinutos: 90,
    porciones: 8,
    ingredientePrincipal: {
        nombre: "queso crema",
        cantidad: 500,
        unidad: "gramos"
    },
    pasos: [
        "Triturar las galletas para la base",
        "Mezclar el queso crema con azúcar",
        "Hornear a 160°C por 50 minutos",
        "Refrigerar 4 horas"
    ]
};

console.log("\n--- Objetos anidados ---");
console.log(`Receta: ${recetaCompleta.nombre}`);
console.log(`Ingrediente principal: ${recetaCompleta.ingredientePrincipal.nombre}`);
console.log(`Cantidad: ${recetaCompleta.ingredientePrincipal.cantidad} ${recetaCompleta.ingredientePrincipal.unidad}`);
console.log(`Primer paso: ${recetaCompleta.pasos[0]}`);
console.log(`Total de pasos: ${recetaCompleta.pasos.length}`);

// --- Referencia vs valor ---

// Los objetos se pasan por REFERENCIA, no por valor.
// Esto significa que dos variables pueden apuntar al mismo objeto.

console.log("\n--- Referencia vs valor ---");

const original = { nombre: "Café", tiempo: 10 };
const copia = original; // NO es una copia, es la misma referencia

copia.tiempo = 15;
console.log("Original:", original.tiempo); // 15 (también cambió)

// Para hacer una copia real, usa el spread operator (...) o Object.assign
const copiaReal = { ...original };
copiaReal.tiempo = 20;
console.log("Original:", original.tiempo);  // 15 (no cambió)
console.log("Copia real:", copiaReal.tiempo); // 20

// ============================================================
// EJERCICIO
// ============================================================
// 1. Crea un objeto "receta" con estas propiedades:
//    nombre, categoria, tiempoMinutos, calificacion, disponible
//    y un ingrediente principal como objeto anidado (nombre,
//    cantidad, unidad)
//
// 2. Agrega un método "mostrarFicha" que muestre todos los
//    datos formateados usando this
//
// 3. Agrega un método "esDestacada" que devuelva true si la
//    calificación es mayor o igual a 4.5
//
// 4. Usa Object.keys para mostrar cuántas propiedades tiene
//    el objeto
//
// 5. Usa for...in para mostrar todas las propiedades y valores
// ============================================================
