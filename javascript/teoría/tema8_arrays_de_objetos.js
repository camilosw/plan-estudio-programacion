// ============================================================
// TEMA 8: Arrays de objetos y bucles
// ============================================================
//
// OBJETIVO: Combinar arrays y objetos para trabajar con
// colecciones de datos.
//
// EXPLICACIÓN:
// Hasta ahora vimos arrays de valores simples (strings,
// números) y objetos individuales. Pero en la realidad,
// trabajamos con colecciones: muchas recetas, muchos
// ingredientes, muchos pedidos. Eso es un array de objetos.
//
// Este es un tema puente: aprenderás a resolver problemas
// de búsqueda, filtrado y transformación usando bucles for.
// En los temas 9 y 10 verás métodos de arrays que hacen
// estas mismas tareas de forma más concisa.
//
// EJECUCIÓN:
//   node teoría/tema8_arrays_de_objetos.js
// ============================================================

// --- El array de recetas ---

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

// --- Recorrer y mostrar ---

console.log("--- Todas las recetas ---");
for (let i = 0; i < recetas.length; i++) {
    const r = recetas[i];
    console.log(`${i + 1}. ${r.nombre} — ${r.categoria} — ${r.calificacion}★`);
}

// También con for...of (sin índice):
console.log("\n--- Con for...of ---");
for (const receta of recetas) {
    const estado = receta.disponible ? "✓" : "✗";
    console.log(`${estado} ${receta.nombre}`);
}

// --- Buscar un elemento ---

console.log("\n--- Buscar por nombre ---");
const nombreBuscado = "Tarta de chocolate";
let encontrada = null;

for (const receta of recetas) {
    if (receta.nombre === nombreBuscado) {
        encontrada = receta;
        break;
    }
}

if (encontrada !== null) {
    console.log(`Encontrada: ${encontrada.nombre} — ${encontrada.tiempoMinutos} min`);
} else {
    console.log("No se encontró la receta");
}
// Salida: Encontrada: Tarta de chocolate — 60 min

// --- Filtrar en un nuevo array ---

console.log("\n--- Filtrar: recetas rápidas (< 20 min) ---");
const rapidas = [];

for (const receta of recetas) {
    if (receta.tiempoMinutos < 20) {
        rapidas.push(receta);
    }
}

for (const r of rapidas) {
    console.log(`${r.nombre} — ${r.tiempoMinutos} min`);
}
// Salida:
// Café con leche espumosa — 10 min
// Sándwich club — 15 min
// Té chai latte — 8 min

// --- Filtrar por categoría ---

console.log("\n--- Filtrar: postres ---");
const postres = [];

for (const receta of recetas) {
    if (receta.categoria === "postres") {
        postres.push(receta);
    }
}

for (const p of postres) {
    console.log(`${p.nombre} — ${p.calificacion}★`);
}
// Salida:
// Tarta de chocolate — 4.8★
// Cheesecake de frutos rojos — 4.9★
// Brownie con nueces — 4.6★

// --- Contar elementos ---

console.log("\n--- Contar ---");
let disponibles = 0;
let noDisponibles = 0;

for (const receta of recetas) {
    if (receta.disponible) {
        disponibles++;
    } else {
        noDisponibles++;
    }
}

console.log(`Disponibles: ${disponibles}`);
console.log(`No disponibles: ${noDisponibles}`);
// Salida:
// Disponibles: 6
// No disponibles: 2

// --- Sumar y promediar ---

console.log("\n--- Sumar y promediar ---");
let sumaCalificaciones = 0;

for (const receta of recetas) {
    sumaCalificaciones += receta.calificacion;
}

const promedio = sumaCalificaciones / recetas.length;
console.log(`Calificación promedio: ${promedio.toFixed(1)}★`);
// Salida: Calificación promedio: 4.4★

// --- Encontrar el máximo ---

console.log("\n--- Receta mejor valorada ---");
let mejorReceta = recetas[0];

for (const receta of recetas) {
    if (receta.calificacion > mejorReceta.calificacion) {
        mejorReceta = receta;
    }
}

console.log(`${mejorReceta.nombre} — ${mejorReceta.calificacion}★`);
// Salida: Cheesecake de frutos rojos — 4.9★

// --- Construir un nuevo array transformado ---

// Crear un array con solo los nombres de las recetas
console.log("\n--- Extraer nombres ---");
const nombres = [];

for (const receta of recetas) {
    nombres.push(receta.nombre);
}

console.log(nombres);

// Crear un array de strings formateados
console.log("\n--- Array formateado ---");
const fichas = [];

for (const receta of recetas) {
    fichas.push(`${receta.nombre} (${receta.tiempoMinutos} min)`);
}

for (const ficha of fichas) {
    console.log(ficha);
}

// --- Agrupar por categoría ---

console.log("\n--- Agrupar por categoría ---");
const porCategoria = {};

for (const receta of recetas) {
    const cat = receta.categoria;
    if (porCategoria[cat] === undefined) {
        porCategoria[cat] = [];
    }
    porCategoria[cat].push(receta.nombre);
}

for (const categoria in porCategoria) {
    console.log(`\n${categoria.toUpperCase()}:`);
    for (const nombre of porCategoria[categoria]) {
        console.log(`  - ${nombre}`);
    }
}

// ============================================================
// EJERCICIO
// ============================================================
// Usando el array "recetas" definido arriba:
//
// 1. Busca la receta "Ensalada mediterránea" y muestra todos
//    sus datos
// 2. Crea un array con todas las recetas disponibles que
//    tengan calificación >= 4.5
// 3. Calcula el tiempo total de preparación de todas las
//    recetas disponibles
// 4. Encuentra la receta más rápida (menor tiempo)
// 5. Crea un objeto que cuente cuántas recetas hay por cada
//    categoría: { bebidas: 2, postres: 3, ... }
// ============================================================
