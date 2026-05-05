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
const peliculas = [
    { titulo: "El Padrino", director: "Coppola", genero: "drama", anio: 1972, duracion: 175, calificacion: 9.2, disponible: true },
    { titulo: "Volver al Futuro", director: "Zemeckis", genero: "ciencia ficción", anio: 1985, duracion: 116, calificacion: 8.5, disponible: true },
    { titulo: "Toy Story", director: "Lasseter", genero: "animación", anio: 1995, duracion: 81, calificacion: 8.3, disponible: true },
    { titulo: "El Secreto de sus Ojos", director: "Campanella", genero: "drama", anio: 2009, duracion: 129, calificacion: 8.0, disponible: false },
    { titulo: "Coco", director: "Unkrich", genero: "animación", anio: 2017, duracion: 105, calificacion: 8.4, disponible: true },
    { titulo: "Inception", director: "Nolan", genero: "ciencia ficción", anio: 2010, duracion: 148, calificacion: 8.8, disponible: false },
    { titulo: "Matar a un ruiseñor", director: "Mulligan", genero: "drama", anio: 1962, duracion: 129, calificacion: 8.3, disponible: true },
    { titulo: "Mi vecino Totoro", director: "Miyazaki", genero: "animación", anio: 1988, duracion: 86, calificacion: 8.2, disponible: true }
];

// --- Parte 1: forEach — mostrar catálogo ---
// Usa forEach para mostrar cada película con su número.
//
// Salida esperada:
//   1. El Padrino — drama — 9.2★
//   2. Volver al Futuro — ciencia ficción — 8.5★
//   ...

// Tu código aquí:



// --- Parte 2: map — crear fichas ---
// Usa map para crear un array de strings con formato:
//   "TÍTULO (año)"
// (título en mayúsculas)
//
// Salida esperada:
//   [
//     'EL PADRINO (1972)',
//     'VOLVER AL FUTURO (1985)',
//     ...
//   ]

// Tu código aquí:



// --- Parte 3: filter — disponibles ---
// Usa filter para obtener solo las películas disponibles.
// Muestra cuántas son y sus títulos.
//
// Salida esperada:
//   Disponibles: 6
//   - El Padrino
//   - Volver al Futuro
//   ...

// Tu código aquí:



// --- Parte 4: filter — por género ---
// Usa filter para obtener las películas de "ciencia ficción".
//
// Salida esperada:
//   Ciencia ficción:
//   - Volver al Futuro (1985)
//   - Inception (2010)

// Tu código aquí:



// --- Parte 5: find — buscar película ---
// Usa find para encontrar la película de Miyazaki.
// Usa find para buscar una película de género "terror".
//
// Salida esperada:
//   Miyazaki: Mi vecino Totoro (1988)
//   Terror: No encontrada

// Tu código aquí:



// --- Parte 6: findIndex — posición ---
// Usa findIndex para encontrar la posición de "Inception".
// Usa findIndex para buscar una película del año 2020.
//
// Salida esperada:
//   Posición de Inception: 5
//   Película de 2020: -1 (no existe)

// Tu código aquí:



// --- Parte 7: filter + map combinados ---
// Usa filter para obtener las películas con calificación >= 8.5
// que estén disponibles, y luego map para extraer solo los títulos.
//
// Salida esperada:
//   Destacadas disponibles: [ 'El Padrino', 'Volver al Futuro' ]

// Tu código aquí:



// ============================================================
// SOLUCIÓN
// ============================================================
/*
// Parte 1
console.log("--- Catálogo ---");
peliculas.forEach((p, i) => {
    console.log(`${i + 1}. ${p.titulo} — ${p.genero} — ${p.calificacion}★`);
});

// Parte 2
console.log("\n--- Fichas ---");
const fichas = peliculas.map(p => `${p.titulo.toUpperCase()} (${p.anio})`);
console.log(fichas);

// Parte 3
console.log("\n--- Disponibles ---");
const disponibles = peliculas.filter(p => p.disponible);
console.log(`Disponibles: ${disponibles.length}`);
disponibles.forEach(p => console.log(`- ${p.titulo}`));

// Parte 4
console.log("\n--- Ciencia ficción ---");
const cienciaFiccion = peliculas.filter(p => p.genero === "ciencia ficción");
console.log("Ciencia ficción:");
cienciaFiccion.forEach(p => console.log(`- ${p.titulo} (${p.anio})`));

// Parte 5
console.log("\n--- Buscar ---");
const miyazaki = peliculas.find(p => p.director === "Miyazaki");
console.log(`Miyazaki: ${miyazaki.titulo} (${miyazaki.anio})`);
const terror = peliculas.find(p => p.genero === "terror");
console.log(`Terror: ${terror ? terror.titulo : "No encontrada"}`);

// Parte 6
console.log("\n--- Posición ---");
const posInception = peliculas.findIndex(p => p.titulo === "Inception");
console.log(`Posición de Inception: ${posInception}`);
const pos2020 = peliculas.findIndex(p => p.anio === 2020);
console.log(`Película de 2020: ${pos2020} (no existe)`);

// Parte 7
console.log("\n--- Destacadas disponibles ---");
const destacadasDisponibles = peliculas
    .filter(p => p.calificacion >= 8.5 && p.disponible)
    .map(p => p.titulo);
console.log("Destacadas disponibles:", destacadasDisponibles);
*/
