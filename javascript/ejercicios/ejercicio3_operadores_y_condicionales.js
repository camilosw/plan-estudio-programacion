// ============================================================
// EJERCICIO 3: Operadores y condicionales
// ============================================================
// Dominio: Videoclub
//
// OBJETIVO: Practicar operadores y condicionales con datos
// de películas.
//
// EJECUCIÓN:
//   node ejercicios/ejercicio3_operadores_y_condicionales.js
// ============================================================

// --- Datos del videoclub (no modificar) ---
const titulo = "Inception";
const anio = 2010;
const duracionMinutos = 148;
const calificacion = 8.8;
const genero = "ciencia ficción";
const disponible = false;
const precioAlquiler = 3.50;

// --- Parte 1: Clasificar por época ---
// Clasifica la película según su año:
//   - Antes de 1980: "clásica"
//   - 1980–1999: "moderna"
//   - 2000 en adelante: "contemporánea"
//
// Salida esperada:
//   Inception (2010): película contemporánea

// Tu código aquí:



// --- Parte 2: Verificar disponibilidad ---
// Usa el operador ternario para mostrar si la película
// está disponible o no.
//
// Salida esperada:
//   Inception: No disponible para alquiler

// Tu código aquí:



// --- Parte 3: Recomendación ---
// Una película se recomienda si cumple AMBAS condiciones:
//   - Calificación mayor a 8.0
//   - Duración menor a 180 minutos
//
// Salida esperada:
//   Inception: ¡Recomendada!

// Tu código aquí:



// --- Parte 4: Calcular precio con descuento ---
// Si la película tiene más de 10 años (desde 2026):
//   descuento del 20%
// Si tiene entre 5 y 10 años: descuento del 10%
// Si es más reciente: sin descuento
// Muestra el precio original, el descuento y el precio final.
//
// Salida esperada:
//   Precio original: $3.50
//   Descuento: 20%
//   Precio final: $2.80

// Tu código aquí:



// --- Parte 5: Categoría por duración ---
// Usa switch para clasificar por duración:
//   - Menos de 90 min: "cortometraje"
//   - 90–120 min: "estándar"
//   - 121–150 min: "larga"
//   - Más de 150 min: "muy larga"
// Usa Math.floor(duracionMinutos / 30) como caso para el switch,
// o usa if/else si lo prefieres.
//
// Salida esperada:
//   Inception (148 min): película larga

// Tu código aquí:



// --- Parte 6: Emoji por género ---
// Usa switch para asignar un emoji según el género:
//   "drama" → "🎭", "comedia" → "😂", "accion" → "💥",
//   "ciencia ficción" → "🚀", "terror" → "👻",
//   "animación" → "🎨", default → "🎬"
//
// Salida esperada:
//   Inception — 🚀 ciencia ficción

// Tu código aquí:



// ============================================================
// SOLUCIÓN
// ============================================================
/*
// Parte 1
let epoca;
if (anio < 1980) {
    epoca = "clásica";
} else if (anio <= 1999) {
    epoca = "moderna";
} else {
    epoca = "contemporánea";
}
console.log(`${titulo} (${anio}): película ${epoca}`);

// Parte 2
const estado = disponible ? "Disponible para alquiler" : "No disponible para alquiler";
console.log(`\n${titulo}: ${estado}`);

// Parte 3
if (calificacion > 8.0 && duracionMinutos < 180) {
    console.log(`\n${titulo}: ¡Recomendada!`);
} else {
    console.log(`\n${titulo}: No cumple todos los criterios`);
}

// Parte 4
const anioActual = 2026;
const antiguedad = anioActual - anio;
let descuento;
if (antiguedad > 10) {
    descuento = 20;
} else if (antiguedad >= 5) {
    descuento = 10;
} else {
    descuento = 0;
}
const precioFinal = precioAlquiler * (1 - descuento / 100);
console.log(`\nPrecio original: $${precioAlquiler.toFixed(2)}`);
console.log(`Descuento: ${descuento}%`);
console.log(`Precio final: $${precioFinal.toFixed(2)}`);

// Parte 5
let categoriaDuracion;
if (duracionMinutos < 90) {
    categoriaDuracion = "cortometraje";
} else if (duracionMinutos <= 120) {
    categoriaDuracion = "estándar";
} else if (duracionMinutos <= 150) {
    categoriaDuracion = "larga";
} else {
    categoriaDuracion = "muy larga";
}
console.log(`\n${titulo} (${duracionMinutos} min): película ${categoriaDuracion}`);

// Parte 6
let emoji;
switch (genero) {
    case "drama": emoji = "🎭"; break;
    case "comedia": emoji = "😂"; break;
    case "accion": emoji = "💥"; break;
    case "ciencia ficción": emoji = "🚀"; break;
    case "terror": emoji = "👻"; break;
    case "animación": emoji = "🎨"; break;
    default: emoji = "🎬";
}
console.log(`\n${titulo} — ${emoji} ${genero}`);
*/
