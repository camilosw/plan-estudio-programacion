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
const peliculas = [
    { titulo: "El Padrino", director: "Coppola", genero: "drama", anio: 1972, duracion: 175, calificacion: 9.2, disponible: true },
    { titulo: "Volver al Futuro", director: "Zemeckis", genero: "ciencia ficción", anio: 1985, duracion: 116, calificacion: 8.5, disponible: true },
    { titulo: "Toy Story", director: "Lasseter", genero: "animación", anio: 1995, duracion: 81, calificacion: 8.3, disponible: true },
    { titulo: "Inception", director: "Nolan", genero: "ciencia ficción", anio: 2010, duracion: 148, calificacion: 8.8, disponible: false }
];

const nuevasAdquisiciones = [
    { titulo: "Coco", director: "Unkrich", genero: "animación", anio: 2017, duracion: 105, calificacion: 8.4, disponible: true },
    { titulo: "Mi vecino Totoro", director: "Miyazaki", genero: "animación", anio: 1988, duracion: 86, calificacion: 8.2, disponible: true }
];

// --- Parte 1: Desestructuración de objetos ---
// Desestructura la primera película para obtener:
//   - titulo
//   - calificacion (renombrada como "rating")
//   - genero
//
// Salida esperada:
//   El Padrino — drama — Rating: 9.2

// Tu código aquí:



// --- Parte 2: Desestructuración con valor por defecto ---
// Desestructura la tercera película y extrae:
//   - titulo
//   - director
//   - idioma (no existe, usar "no especificado" por defecto)
//
// Salida esperada:
//   Toy Story — Lasseter — Idioma: no especificado

// Tu código aquí:



// --- Parte 3: Desestructuración en forEach ---
// Usa forEach con desestructuración en el callback para
// mostrar cada película como "titulo (anio) — calificacion★".
//
// Salida esperada:
//   El Padrino (1972) — 9.2★
//   Volver al Futuro (1985) — 8.5★
//   ...

// Tu código aquí:



// --- Parte 4: Spread — combinar catálogos ---
// Combina "peliculas" y "nuevasAdquisiciones" en un nuevo
// array "catalogoCompleto" usando spread.
// Muestra el total de películas.
//
// Salida esperada:
//   Catálogo completo: 6 películas

// Tu código aquí:



// --- Parte 5: Spread — crear versión extendida ---
// Crea una "versión extendida" de Inception clonando el
// objeto y cambiando: duracion a 170, y agrega
// subtitulo: "Versión del director".
//
// Verifica que el original no cambió.
//
// Salida esperada:
//   Original: Inception — 148 min
//   Extendida: Inception — 170 min — Versión del director

// Tu código aquí:



// --- Parte 6: Rest en función ---
// Crea una función "crearMaraton" que reciba un nombre de
// maratón y luego cualquier cantidad de títulos de películas
// (rest). Muestra el nombre de la maratón y la lista.
//
// crearMaraton("Noche de clásicos", "El Padrino", "Matar a un ruiseñor")
//
// Salida esperada:
//   === Noche de clásicos ===
//   1. El Padrino
//   2. Matar a un ruiseñor
//   Total: 2 películas

// Tu código aquí:



// --- Parte 7: Desestructuración de arrays ---
// Del catalogoCompleto (si lo creaste en parte 4), extrae:
//   - La primera película
//   - La segunda película
//   - El resto en un array "otras"
// Muestra los títulos.
//
// Salida esperada:
//   Primera: El Padrino
//   Segunda: Volver al Futuro
//   Otras: 4 películas

// Tu código aquí:



// ============================================================
// SOLUCIÓN
// ============================================================
/*
// Parte 1
const { titulo, calificacion: rating, genero } = peliculas[0];
console.log(`${titulo} — ${genero} — Rating: ${rating}`);

// Parte 2
const { titulo: titulo3, director: dir3, idioma = "no especificado" } = peliculas[2];
console.log(`\n${titulo3} — ${dir3} — Idioma: ${idioma}`);

// Parte 3
console.log("");
peliculas.forEach(({ titulo, anio, calificacion }) => {
    console.log(`${titulo} (${anio}) — ${calificacion}★`);
});

// Parte 4
const catalogoCompleto = [...peliculas, ...nuevasAdquisiciones];
console.log(`\nCatálogo completo: ${catalogoCompleto.length} películas`);

// Parte 5
const inception = peliculas.find(p => p.titulo === "Inception");
const inceptionExtendida = {
    ...inception,
    duracion: 170,
    subtitulo: "Versión del director"
};
console.log(`\nOriginal: ${inception.titulo} — ${inception.duracion} min`);
console.log(`Extendida: ${inceptionExtendida.titulo} — ${inceptionExtendida.duracion} min — ${inceptionExtendida.subtitulo}`);

// Parte 6
function crearMaraton(nombre, ...titulos) {
    console.log(`\n=== ${nombre} ===`);
    titulos.forEach((t, i) => console.log(`${i + 1}. ${t}`));
    console.log(`Total: ${titulos.length} películas`);
}
crearMaraton("Noche de clásicos", "El Padrino", "Matar a un ruiseñor");

// Parte 7
const [primera, segunda, ...otras] = catalogoCompleto;
console.log(`\nPrimera: ${primera.titulo}`);
console.log(`Segunda: ${segunda.titulo}`);
console.log(`Otras: ${otras.length} películas`);
*/
