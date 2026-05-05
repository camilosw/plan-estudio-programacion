// ============================================================
// EJERCICIO 8: Arrays de objetos y bucles
// ============================================================
// Dominio: Videoclub
//
// OBJETIVO: Resolver problemas de búsqueda, filtrado y
// acumulación usando bucles for sobre arrays de objetos.
//
// EJECUCIÓN:
//   node ejercicios/ejercicio8_arrays_de_objetos.js
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

// --- Parte 1: Mostrar catálogo ---
// Usa "✓" para disponible y "✗" para no disponible.
//
// Salida esperada:
//   ✓ El Padrino — drama — 9.2
//   ✓ Volver al Futuro — ciencia ficción — 8.5
//   ...

// Tu código aquí:



// --- Parte 2: Buscar película ---
// Busca "Coco" por título. Muestra todos sus datos.

// Tu código aquí:



// --- Parte 3: Filtrar disponibles ---
// Crea un nuevo array con solo las películas disponibles.

// Tu código aquí:



// --- Parte 4: Películas por género ---
// Filtra las películas de género "animación".

// Tu código aquí:



// --- Parte 5: Calificación promedio ---

// Tu código aquí:



// --- Parte 6: Película más larga y más corta ---

// Tu código aquí:



// --- Parte 7: Contar por género ---
// Crea un objeto que cuente cuántas películas hay por género.

// Tu código aquí:



// ============================================================
// SOLUCIÓN
// ============================================================
/*
// Parte 1
console.log("--- Catálogo ---");
for (const m of movies) {
    const status = m.available ? "✓" : "✗";
    console.log(`${status} ${m.title} — ${m.genre} — ${m.rating}`);
}

// Parte 2
console.log("\n--- Buscar película ---");
let found = null;
for (const m of movies) {
    if (m.title === "Coco") {
        found = m;
        break;
    }
}
if (found) {
    console.log(`Encontrada: ${found.title}`);
    console.log(`Director: ${found.director}`);
    console.log(`Año: ${found.year}`);
    console.log(`Duración: ${found.duration} min`);
    console.log(`Calificación: ${found.rating}`);
}

// Parte 3
console.log("\n--- Disponibles ---");
const availableList = [];
for (const m of movies) {
    if (m.available) {
        availableList.push(m);
    }
}
console.log(`Películas disponibles: ${availableList.length}`);
for (const m of availableList) {
    console.log(`- ${m.title}`);
}

// Parte 4
console.log("\n--- Animación ---");
const animated = [];
for (const m of movies) {
    if (m.genre === "animación") {
        animated.push(m);
    }
}
console.log(`Películas de animación: ${animated.length}`);
for (const m of animated) {
    console.log(`- ${m.title} (${m.year})`);
}

// Parte 5
console.log("\n--- Promedio ---");
let ratingSum = 0;
for (const m of movies) {
    ratingSum += m.rating;
}
const average = ratingSum / movies.length;
console.log(`Calificación promedio: ${average.toFixed(1)}`);

// Parte 6
console.log("\n--- Más larga y más corta ---");
let longest = movies[0];
let shortest = movies[0];
for (const m of movies) {
    if (m.duration > longest.duration) longest = m;
    if (m.duration < shortest.duration) shortest = m;
}
console.log(`Más larga: ${longest.title} (${longest.duration} min)`);
console.log(`Más corta: ${shortest.title} (${shortest.duration} min)`);

// Parte 7
console.log("\n--- Contar por género ---");
const countByGenre = {};
for (const m of movies) {
    if (countByGenre[m.genre] === undefined) {
        countByGenre[m.genre] = 0;
    }
    countByGenre[m.genre]++;
}
console.log(countByGenre);
*/
