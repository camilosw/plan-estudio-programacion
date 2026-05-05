// ============================================================
// EJERCICIO 9: Métodos de arrays I — forEach, map, filter, find
// ============================================================
// Dominio: Videoclub
//
// OBJETIVO: Resolver los mismos problemas del ejercicio 8
// pero usando métodos de arrays en vez de bucles for.
//
// EJECUCIÓN:
//   node ejercicios/ejercicio9_metodos_de_arrays_1.js
// ============================================================

// --- Datos del videoclub (no modificar) ---
const movies = [
    { title: "El Padrino", director: "Coppola", genre: "drama", year: 1972, duration: 175, rating: 9.2, available: true },
    { title: "Volver al Futuro", director: "Zemeckis", genre: "ciencia ficción", year: 1985, duration: 116, rating: 8.5, available: true },
    { title: "Toy Story", director: "Lasseter", genre: "animación", year: 1995, duration: 81, rating: 8.3, available: true },
    { title: "El Secreto de sus Ojos", director: "Campanella", genre: "drama", year: 2009, duration: 129, rating: 8.0, available: false },
    { title: "Coco", director: "Unkrich", genre: "animación", year: 2017, duration: 105, rating: 8.4, available: true },
    { title: "Inception", director: "Nolan", genre: "ciencia ficción", year: 2010, duration: 148, rating: 8.8, available: false },
    { title: "Matar a un ruiseñor", director: "Mulligan", genre: "drama", year: 1962, duration: 129, rating: 8.3, available: true },
    { title: "Mi vecino Totoro", director: "Miyazaki", genre: "animación", year: 1988, duration: 86, rating: 8.2, available: true }
];

// --- Parte 1: forEach — mostrar catálogo ---
// Tu código aquí:



// --- Parte 2: map — crear fichas ---
// Crea un array de strings: "TÍTULO (año)" (título en mayúsculas)
// Tu código aquí:



// --- Parte 3: filter — disponibles ---
// Tu código aquí:



// --- Parte 4: filter — por género ---
// Obtén las películas de "ciencia ficción".
// Tu código aquí:



// --- Parte 5: find — buscar película ---
// Busca la película de Miyazaki. Busca una de género "terror".
// Tu código aquí:



// --- Parte 6: findIndex — posición ---
// Posición de "Inception". Posición de una película del año 2020.
// Tu código aquí:



// --- Parte 7: filter + map combinados ---
// Películas con calificación >= 8.5 disponibles → solo títulos.
// Tu código aquí:



// ============================================================
// SOLUCIÓN
// ============================================================
/*
// Parte 1
console.log("--- Catálogo ---");
movies.forEach((m, i) => {
    console.log(`${i + 1}. ${m.title} — ${m.genre} — ${m.rating}★`);
});

// Parte 2
console.log("\n--- Fichas ---");
const cards = movies.map(m => `${m.title.toUpperCase()} (${m.year})`);
console.log(cards);

// Parte 3
console.log("\n--- Disponibles ---");
const availableList = movies.filter(m => m.available);
console.log(`Disponibles: ${availableList.length}`);
availableList.forEach(m => console.log(`- ${m.title}`));

// Parte 4
console.log("\n--- Ciencia ficción ---");
const sciFi = movies.filter(m => m.genre === "ciencia ficción");
console.log("Ciencia ficción:");
sciFi.forEach(m => console.log(`- ${m.title} (${m.year})`));

// Parte 5
console.log("\n--- Buscar ---");
const miyazakiMovie = movies.find(m => m.director === "Miyazaki");
console.log(`Miyazaki: ${miyazakiMovie.title} (${miyazakiMovie.year})`);
const horrorMovie = movies.find(m => m.genre === "terror");
console.log(`Terror: ${horrorMovie ? horrorMovie.title : "No encontrada"}`);

// Parte 6
console.log("\n--- Posición ---");
const inceptionIndex = movies.findIndex(m => m.title === "Inception");
console.log(`Posición de Inception: ${inceptionIndex}`);
const year2020Index = movies.findIndex(m => m.year === 2020);
console.log(`Película de 2020: ${year2020Index} (no existe)`);

// Parte 7
console.log("\n--- Destacadas disponibles ---");
const featuredAvailable = movies
    .filter(m => m.rating >= 8.5 && m.available)
    .map(m => m.title);
console.log("Destacadas disponibles:", featuredAvailable);
*/
