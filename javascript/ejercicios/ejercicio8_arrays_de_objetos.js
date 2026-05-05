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

// --- Parte 1: Mostrar catálogo ---
// Recorre el array y muestra cada película con su estado.
// Usa "✓" para disponible y "✗" para no disponible.
//
// Salida esperada:
//   ✓ El Padrino — drama — 9.2
//   ✓ Volver al Futuro — ciencia ficción — 8.5
//   ...
//   ✗ Inception — ciencia ficción — 8.8
//   ...

// Tu código aquí:



// --- Parte 2: Buscar película ---
// Busca "Coco" por título usando un for. Muestra todos sus
// datos si la encuentra.
//
// Salida esperada:
//   Encontrada: Coco
//   Director: Unkrich
//   Año: 2017
//   Duración: 105 min
//   Calificación: 8.4

// Tu código aquí:



// --- Parte 3: Filtrar disponibles ---
// Crea un nuevo array con solo las películas disponibles.
// Muestra cuántas hay y sus títulos.
//
// Salida esperada:
//   Películas disponibles: 6
//   - El Padrino
//   - Volver al Futuro
//   ...

// Tu código aquí:



// --- Parte 4: Películas por género ---
// Filtra las películas de género "animación" en un nuevo
// array y muéstralas.
//
// Salida esperada:
//   Películas de animación: 3
//   - Toy Story (1995)
//   - Coco (2017)
//   - Mi vecino Totoro (1988)

// Tu código aquí:



// --- Parte 5: Calificación promedio ---
// Calcula la calificación promedio de todas las películas.
//
// Salida esperada:
//   Calificación promedio: 8.5

// Tu código aquí:



// --- Parte 6: Película más larga y más corta ---
// Encuentra la película con mayor y menor duración.
//
// Salida esperada:
//   Más larga: El Padrino (175 min)
//   Más corta: Toy Story (81 min)

// Tu código aquí:



// --- Parte 7: Contar por género ---
// Crea un objeto que cuente cuántas películas hay por género.
//
// Salida esperada:
//   { drama: 3, 'ciencia ficción': 2, animación: 3 }

// Tu código aquí:



// ============================================================
// SOLUCIÓN
// ============================================================
/*
// Parte 1
console.log("--- Catálogo ---");
for (const p of peliculas) {
    const estado = p.disponible ? "✓" : "✗";
    console.log(`${estado} ${p.titulo} — ${p.genero} — ${p.calificacion}`);
}

// Parte 2
console.log("\n--- Buscar película ---");
let encontrada = null;
for (const p of peliculas) {
    if (p.titulo === "Coco") {
        encontrada = p;
        break;
    }
}
if (encontrada) {
    console.log(`Encontrada: ${encontrada.titulo}`);
    console.log(`Director: ${encontrada.director}`);
    console.log(`Año: ${encontrada.anio}`);
    console.log(`Duración: ${encontrada.duracion} min`);
    console.log(`Calificación: ${encontrada.calificacion}`);
}

// Parte 3
console.log("\n--- Disponibles ---");
const disponibles = [];
for (const p of peliculas) {
    if (p.disponible) {
        disponibles.push(p);
    }
}
console.log(`Películas disponibles: ${disponibles.length}`);
for (const p of disponibles) {
    console.log(`- ${p.titulo}`);
}

// Parte 4
console.log("\n--- Animación ---");
const animacion = [];
for (const p of peliculas) {
    if (p.genero === "animación") {
        animacion.push(p);
    }
}
console.log(`Películas de animación: ${animacion.length}`);
for (const p of animacion) {
    console.log(`- ${p.titulo} (${p.anio})`);
}

// Parte 5
console.log("\n--- Promedio ---");
let sumaCalificaciones = 0;
for (const p of peliculas) {
    sumaCalificaciones += p.calificacion;
}
const promedio = sumaCalificaciones / peliculas.length;
console.log(`Calificación promedio: ${promedio.toFixed(1)}`);

// Parte 6
console.log("\n--- Más larga y más corta ---");
let masLarga = peliculas[0];
let masCorta = peliculas[0];
for (const p of peliculas) {
    if (p.duracion > masLarga.duracion) masLarga = p;
    if (p.duracion < masCorta.duracion) masCorta = p;
}
console.log(`Más larga: ${masLarga.titulo} (${masLarga.duracion} min)`);
console.log(`Más corta: ${masCorta.titulo} (${masCorta.duracion} min)`);

// Parte 7
console.log("\n--- Contar por género ---");
const conteoPorGenero = {};
for (const p of peliculas) {
    if (conteoPorGenero[p.genero] === undefined) {
        conteoPorGenero[p.genero] = 0;
    }
    conteoPorGenero[p.genero]++;
}
console.log(conteoPorGenero);
*/
