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

const recetas = [
    { nombre: "Café con leche espumosa", categoria: "bebidas", tiempoMinutos: 10, calificacion: 4.5, disponible: true },
    { nombre: "Tarta de chocolate", categoria: "postres", tiempoMinutos: 60, calificacion: 4.8, disponible: true },
    { nombre: "Sándwich club", categoria: "platos principales", tiempoMinutos: 15, calificacion: 4.2, disponible: false },
    { nombre: "Galletas de avena", categoria: "snacks", tiempoMinutos: 30, calificacion: 4.0, disponible: true },
    { nombre: "Cheesecake de frutos rojos", categoria: "postres", tiempoMinutos: 90, calificacion: 4.9, disponible: true },
    { nombre: "Té chai latte", categoria: "bebidas", tiempoMinutos: 8, calificacion: 4.3, disponible: true },
    { nombre: "Ensalada mediterránea", categoria: "platos principales", tiempoMinutos: 20, calificacion: 3.8, disponible: true },
    { nombre: "Brownie con nueces", categoria: "postres", tiempoMinutos: 45, calificacion: 4.6, disponible: false }
];

// --- ¿Qué es un callback? ---

// Un callback es una función que le pasas como argumento a otra.
// Los métodos de arrays reciben un callback y lo ejecutan
// por cada elemento del array.

// Ejemplo básico:
function saludar(nombre) {
    console.log(`¡Hola, ${nombre}!`);
}

// Aquí "saludar" es el callback que le pasamos a forEach
console.log("--- ¿Qué es un callback? ---");
["Sandra", "Carlos", "María"].forEach(saludar);
// Salida:
// ¡Hola, Sandra!
// ¡Hola, Carlos!
// ¡Hola, María!

// Normalmente usamos arrow functions directamente:
["Sandra", "Carlos", "María"].forEach(nombre => console.log(`Hola, ${nombre}`));

// --- forEach ---

// forEach recorre cada elemento y ejecuta el callback.
// No devuelve nada (no crea un nuevo array).
// Es como un for...of pero en forma de método.

console.log("\n--- forEach ---");
recetas.forEach(receta => {
    console.log(`• ${receta.nombre} — ${receta.calificacion}★`);
});

// forEach también recibe el índice como segundo argumento
console.log("\nCon índice:");
recetas.forEach((receta, indice) => {
    console.log(`${indice + 1}. ${receta.nombre}`);
});

// Equivalente con for (tema 8):
// for (let i = 0; i < recetas.length; i++) {
//     console.log(`${i + 1}. ${recetas[i].nombre}`);
// }

// --- map ---

// map crea un NUEVO ARRAY transformando cada elemento.
// El callback debe devolver (return) el nuevo valor.

console.log("\n--- map ---");

// Extraer solo los nombres
const nombres = recetas.map(receta => receta.nombre);
console.log("Nombres:", nombres);

// Crear fichas formateadas
const fichas = recetas.map(receta => {
    return `${receta.nombre} (${receta.tiempoMinutos} min)`;
});
console.log("Fichas:", fichas);

// Equivalente con for (tema 8):
// const nombres = [];
// for (const receta of recetas) {
//     nombres.push(receta.nombre);
// }

// --- filter ---

// filter crea un NUEVO ARRAY con solo los elementos que
// cumplen la condición. El callback debe devolver true/false.

console.log("\n--- filter ---");

// Recetas rápidas (menos de 20 minutos)
const rapidas = recetas.filter(receta => receta.tiempoMinutos < 20);
console.log("Recetas rápidas:");
rapidas.forEach(r => console.log(`  ${r.nombre} — ${r.tiempoMinutos} min`));
// Salida:
//   Café con leche espumosa — 10 min
//   Sándwich club — 15 min
//   Té chai latte — 8 min

// Recetas disponibles con buena calificación
const destacadas = recetas.filter(r => r.disponible && r.calificacion >= 4.5);
console.log("\nDestacadas y disponibles:");
destacadas.forEach(r => console.log(`  ${r.nombre} — ${r.calificacion}★`));
// Salida:
//   Café con leche espumosa — 4.5★
//   Tarta de chocolate — 4.8★
//   Cheesecake de frutos rojos — 4.9★

// Filtrar por categoría
const postres = recetas.filter(r => r.categoria === "postres");
console.log(`\nPostres encontrados: ${postres.length}`);

// Equivalente con for (tema 8):
// const rapidas = [];
// for (const receta of recetas) {
//     if (receta.tiempoMinutos < 20) {
//         rapidas.push(receta);
//     }
// }

// --- find ---

// find devuelve el PRIMER elemento que cumple la condición.
// Si ninguno cumple, devuelve undefined.
// A diferencia de filter, find solo devuelve UN elemento.

console.log("\n--- find ---");

const tarta = recetas.find(r => r.nombre === "Tarta de chocolate");
console.log("Encontrada:", tarta.nombre, "—", tarta.tiempoMinutos, "min");

const sopas = recetas.find(r => r.categoria === "sopas");
console.log("Sopas:", sopas); // undefined

// Equivalente con for (tema 8):
// let tarta = null;
// for (const receta of recetas) {
//     if (receta.nombre === "Tarta de chocolate") {
//         tarta = receta;
//         break;
//     }
// }

// --- findIndex ---

// findIndex devuelve la POSICIÓN del primer elemento que
// cumple la condición. Si no encuentra, devuelve -1.

console.log("\n--- findIndex ---");

const indiceCheesecake = recetas.findIndex(r => r.nombre === "Cheesecake de frutos rojos");
console.log(`Cheesecake está en posición: ${indiceCheesecake}`); // 4

const indiceSopa = recetas.findIndex(r => r.categoria === "sopas");
console.log(`Sopas está en posición: ${indiceSopa}`); // -1

// --- Resumen comparativo ---

console.log("\n--- Resumen ---");
console.log("forEach → recorre sin crear array nuevo");
console.log("map     → transforma cada elemento → nuevo array");
console.log("filter  → filtra por condición → nuevo array");
console.log("find    → busca el primero que cumple → un elemento");

// ============================================================
// EJERCICIO
// ============================================================
// Usando el array "recetas":
//
// 1. Usa map para crear un array de strings con el formato:
//    "NOMBRE — CATEGORÍA" (nombre en mayúsculas)
//
// 2. Usa filter para obtener todas las recetas de la
//    categoría "bebidas"
//
// 3. Usa find para encontrar la receta "Galletas de avena"
//    y muestra su calificación
//
// 4. Usa filter para obtener recetas con calificación >= 4.5
//    que NO estén disponibles
//
// 5. Usa findIndex para encontrar la posición del "Brownie
//    con nueces"
// ============================================================
