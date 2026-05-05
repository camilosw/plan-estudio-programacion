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

// --- Parte 1: reduce — duración total ---
// Calcula la duración total de todas las películas disponibles.
//
// Salida esperada:
//   Duración total (disponibles): 692 minutos

// Tu código aquí:



// --- Parte 2: reduce — calificación promedio ---
// Calcula la calificación promedio de todas las películas.
//
// Salida esperada:
//   Calificación promedio: 8.5

// Tu código aquí:



// --- Parte 3: reduce — contar por género ---
// Crea un objeto que cuente películas por género.
//
// Salida esperada:
//   { drama: 3, 'ciencia ficción': 2, animación: 3 }

// Tu código aquí:



// --- Parte 4: sort — por calificación ---
// Ordena las películas por calificación de mayor a menor.
// Muestra el ranking. (Trabaja sobre una copia del array)
//
// Salida esperada:
//   1. El Padrino — 9.2
//   2. Inception — 8.8
//   3. Volver al Futuro — 8.5
//   ...

// Tu código aquí:



// --- Parte 5: sort — por año ---
// Ordena por año de la más antigua a la más reciente.
// (Trabaja sobre una copia)
//
// Salida esperada:
//   Matar a un ruiseñor (1962)
//   El Padrino (1972)
//   ...

// Tu código aquí:



// --- Parte 6: some y every ---
// Responde estas preguntas:
//   - ¿Hay alguna película con calificación >= 9?
//   - ¿Hay alguna película de terror?
//   - ¿Todas las películas tienen calificación > 7?
//   - ¿Todas las películas están disponibles?
//
// Salida esperada:
//   ¿Alguna con cal >= 9? true
//   ¿Alguna de terror? false
//   ¿Todas con cal > 7? true
//   ¿Todas disponibles? false

// Tu código aquí:



// --- Parte 7: Encadenamiento ---
// Obtén los títulos de las 3 mejores películas disponibles,
// ordenadas por calificación descendente.
//
// Salida esperada:
//   Top 3 disponibles: [ 'El Padrino', 'Volver al Futuro', 'Coco' ]

// Tu código aquí:



// --- Parte 8: Encadenamiento avanzado ---
// Calcula la duración total de las películas de animación
// que estén disponibles.
//
// Salida esperada:
//   Duración total animación disponible: 272 minutos

// Tu código aquí:



// ============================================================
// SOLUCIÓN
// ============================================================
/*
// Parte 1
const duracionDisponibles = peliculas
    .filter(p => p.disponible)
    .reduce((total, p) => total + p.duracion, 0);
console.log(`Duración total (disponibles): ${duracionDisponibles} minutos`);

// Parte 2
const sumaCalificaciones = peliculas.reduce((suma, p) => suma + p.calificacion, 0);
const promedio = sumaCalificaciones / peliculas.length;
console.log(`\nCalificación promedio: ${promedio.toFixed(1)}`);

// Parte 3
const conteoPorGenero = peliculas.reduce((conteo, p) => {
    conteo[p.genero] = (conteo[p.genero] || 0) + 1;
    return conteo;
}, {});
console.log("\n", conteoPorGenero);

// Parte 4
console.log("\n--- Por calificación ---");
const porCalificacion = [...peliculas].sort((a, b) => b.calificacion - a.calificacion);
porCalificacion.forEach((p, i) => {
    console.log(`${i + 1}. ${p.titulo} — ${p.calificacion}`);
});

// Parte 5
console.log("\n--- Por año ---");
const porAnio = [...peliculas].sort((a, b) => a.anio - b.anio);
porAnio.forEach(p => console.log(`${p.titulo} (${p.anio})`));

// Parte 6
console.log("\n--- some / every ---");
console.log(`¿Alguna con cal >= 9? ${peliculas.some(p => p.calificacion >= 9)}`);
console.log(`¿Alguna de terror? ${peliculas.some(p => p.genero === "terror")}`);
console.log(`¿Todas con cal > 7? ${peliculas.every(p => p.calificacion > 7)}`);
console.log(`¿Todas disponibles? ${peliculas.every(p => p.disponible)}`);

// Parte 7
console.log("\n--- Top 3 disponibles ---");
const top3 = [...peliculas]
    .filter(p => p.disponible)
    .sort((a, b) => b.calificacion - a.calificacion)
    .slice(0, 3)
    .map(p => p.titulo);
console.log("Top 3 disponibles:", top3);

// Parte 8
const duracionAnimacion = peliculas
    .filter(p => p.genero === "animación" && p.disponible)
    .reduce((total, p) => total + p.duracion, 0);
console.log(`\nDuración total animación disponible: ${duracionAnimacion} minutos`);
*/
