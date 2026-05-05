// ============================================================
// EJERCICIO 11: Desestructuración y spread/rest
// ============================================================
// Dominio: Videoclub
//
// OBJETIVO: Practicar desestructuración, spread y rest con
// datos de películas.
//
// EJECUCIÓN:
//   node ejercicios/ejercicio11_desestructuracion_y_spread.js
// ============================================================

// --- Datos del videoclub (no modificar) ---
const movies = [
    { title: "El Padrino", director: "Coppola", genre: "drama", year: 1972, duration: 175, rating: 9.2, available: true },
    { title: "Volver al Futuro", director: "Zemeckis", genre: "ciencia ficción", year: 1985, duration: 116, rating: 8.5, available: true },
    { title: "Toy Story", director: "Lasseter", genre: "animación", year: 1995, duration: 81, rating: 8.3, available: true },
    { title: "Inception", director: "Nolan", genre: "ciencia ficción", year: 2010, duration: 148, rating: 8.8, available: false }
];

const newArrivals = [
    { title: "Coco", director: "Unkrich", genre: "animación", year: 2017, duration: 105, rating: 8.4, available: true },
    { title: "Mi vecino Totoro", director: "Miyazaki", genre: "animación", year: 1988, duration: 86, rating: 8.2, available: true }
];

// --- Parte 1: Desestructuración de objetos ---
// Desestructura la primera película para obtener:
//   - title
//   - rating (renombrada como "score")
//   - genre

// Tu código aquí:



// --- Parte 2: Desestructuración con valor por defecto ---
// Desestructura la tercera película y extrae:
//   - title, director
//   - language (no existe, usar "no especificado" por defecto)

// Tu código aquí:



// --- Parte 3: Desestructuración en forEach ---
// Muestra cada película como "title (year) — rating★".

// Tu código aquí:



// --- Parte 4: Spread — combinar catálogos ---
// Combina movies y newArrivals en fullCatalog.

// Tu código aquí:



// --- Parte 5: Spread — crear versión extendida ---
// Crea una "versión extendida" de Inception: duration 170,
// agrega subtitle: "Versión del director".

// Tu código aquí:



// --- Parte 6: Rest en función ---
// Crea una función "createMarathon" que reciba un nombre
// y luego cualquier cantidad de títulos (rest).

// Tu código aquí:



// --- Parte 7: Desestructuración de arrays ---
// Del fullCatalog, extrae la primera, la segunda y el
// resto en "others".

// Tu código aquí:



// ============================================================
// SOLUCIÓN
// ============================================================
/*
// Parte 1
const { title, rating: score, genre } = movies[0];
console.log(`${title} — ${genre} — Score: ${score}`);

// Parte 2
const { title: title3, director: dir3, language = "no especificado" } = movies[2];
console.log(`\n${title3} — ${dir3} — Idioma: ${language}`);

// Parte 3
console.log("");
movies.forEach(({ title, year, rating }) => {
    console.log(`${title} (${year}) — ${rating}★`);
});

// Parte 4
const fullCatalog = [...movies, ...newArrivals];
console.log(`\nCatálogo completo: ${fullCatalog.length} películas`);

// Parte 5
const inception = movies.find(m => m.title === "Inception");
const extendedEdition = {
    ...inception,
    duration: 170,
    subtitle: "Versión del director"
};
console.log(`\nOriginal: ${inception.title} — ${inception.duration} min`);
console.log(`Extendida: ${extendedEdition.title} — ${extendedEdition.duration} min — ${extendedEdition.subtitle}`);

// Parte 6
function createMarathon(name, ...movieTitles) {
    console.log(`\n=== ${name} ===`);
    movieTitles.forEach((t, i) => console.log(`${i + 1}. ${t}`));
    console.log(`Total: ${movieTitles.length} películas`);
}
createMarathon("Noche de clásicos", "El Padrino", "Matar a un ruiseñor");

// Parte 7
const [firstMovie, secondMovie, ...others] = fullCatalog;
console.log(`\nPrimera: ${firstMovie.title}`);
console.log(`Segunda: ${secondMovie.title}`);
console.log(`Otras: ${others.length} películas`);
*/
