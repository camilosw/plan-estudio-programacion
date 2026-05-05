// ============================================================
// EJERCICIO 10: Métodos de arrays II — reduce, sort, some, every
// ============================================================
// Dominio: Videoclub
//
// OBJETIVO: Practicar reduce, sort, some, every y
// encadenamiento de métodos con datos de películas.
//
// EJECUCIÓN:
//   node ejercicios/ejercicio10_metodos_de_arrays_2.js
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

// --- Parte 1: reduce — duración total de disponibles ---
// Tu código aquí:



// --- Parte 2: reduce — calificación promedio ---
// Tu código aquí:



// --- Parte 3: reduce — contar por género ---
// Tu código aquí:



// --- Parte 4: sort — por calificación descendente ---
// (Trabaja sobre una copia)
// Tu código aquí:



// --- Parte 5: sort — por año ascendente ---
// Tu código aquí:



// --- Parte 6: some y every ---
// ¿Alguna con cal >= 9? ¿Alguna de terror?
// ¿Todas con cal > 7? ¿Todas disponibles?
// Tu código aquí:



// --- Parte 7: Encadenamiento — top 3 disponibles ---
// Tu código aquí:



// --- Parte 8: Encadenamiento — duración total animación disponible ---
// Tu código aquí:



// ============================================================
// SOLUCIÓN
// ============================================================
/*
// Parte 1
const availableDuration = movies
    .filter(m => m.available)
    .reduce((total, m) => total + m.duration, 0);
console.log(`Duración total (disponibles): ${availableDuration} minutos`);

// Parte 2
const ratingSum = movies.reduce((sum, m) => sum + m.rating, 0);
const average = ratingSum / movies.length;
console.log(`\nCalificación promedio: ${average.toFixed(1)}`);

// Parte 3
const countByGenre = movies.reduce((count, m) => {
    count[m.genre] = (count[m.genre] || 0) + 1;
    return count;
}, {});
console.log("\n", countByGenre);

// Parte 4
console.log("\n--- Por calificación ---");
const byRating = [...movies].sort((a, b) => b.rating - a.rating);
byRating.forEach((m, i) => {
    console.log(`${i + 1}. ${m.title} — ${m.rating}`);
});

// Parte 5
console.log("\n--- Por año ---");
const byYear = [...movies].sort((a, b) => a.year - b.year);
byYear.forEach(m => console.log(`${m.title} (${m.year})`));

// Parte 6
console.log("\n--- some / every ---");
console.log(`¿Alguna con cal >= 9? ${movies.some(m => m.rating >= 9)}`);
console.log(`¿Alguna de terror? ${movies.some(m => m.genre === "terror")}`);
console.log(`¿Todas con cal > 7? ${movies.every(m => m.rating > 7)}`);
console.log(`¿Todas disponibles? ${movies.every(m => m.available)}`);

// Parte 7
console.log("\n--- Top 3 disponibles ---");
const top3 = [...movies]
    .filter(m => m.available)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3)
    .map(m => m.title);
console.log("Top 3 disponibles:", top3);

// Parte 8
const animatedDuration = movies
    .filter(m => m.genre === "animación" && m.available)
    .reduce((total, m) => total + m.duration, 0);
console.log(`\nDuración total animación disponible: ${animatedDuration} minutos`);
*/
