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
const title = "Inception";
const year = 2010;
const durationMinutes = 148;
const rating = 8.8;
const genre = "ciencia ficción";
const available = false;
const rentalPrice = 3.50;

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
// Usa if/else para clasificar por duración:
//   - Menos de 90 min: "cortometraje"
//   - 90–120 min: "estándar"
//   - 121–150 min: "larga"
//   - Más de 150 min: "muy larga"
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
let era;
if (year < 1980) {
    era = "clásica";
} else if (year <= 1999) {
    era = "moderna";
} else {
    era = "contemporánea";
}
console.log(`${title} (${year}): película ${era}`);

// Parte 2
const status = available ? "Disponible para alquiler" : "No disponible para alquiler";
console.log(`\n${title}: ${status}`);

// Parte 3
if (rating > 8.0 && durationMinutes < 180) {
    console.log(`\n${title}: ¡Recomendada!`);
} else {
    console.log(`\n${title}: No cumple todos los criterios`);
}

// Parte 4
const currentYear = 2026;
const age = currentYear - year;
let discount;
if (age > 10) {
    discount = 20;
} else if (age >= 5) {
    discount = 10;
} else {
    discount = 0;
}
const finalPrice = rentalPrice * (1 - discount / 100);
console.log(`\nPrecio original: $${rentalPrice.toFixed(2)}`);
console.log(`Descuento: ${discount}%`);
console.log(`Precio final: $${finalPrice.toFixed(2)}`);

// Parte 5
let durationCategory;
if (durationMinutes < 90) {
    durationCategory = "cortometraje";
} else if (durationMinutes <= 120) {
    durationCategory = "estándar";
} else if (durationMinutes <= 150) {
    durationCategory = "larga";
} else {
    durationCategory = "muy larga";
}
console.log(`\n${title} (${durationMinutes} min): película ${durationCategory}`);

// Parte 6
let emoji;
switch (genre) {
    case "drama": emoji = "🎭"; break;
    case "comedia": emoji = "😂"; break;
    case "accion": emoji = "💥"; break;
    case "ciencia ficción": emoji = "🚀"; break;
    case "terror": emoji = "👻"; break;
    case "animación": emoji = "🎨"; break;
    default: emoji = "🎬";
}
console.log(`\n${title} — ${emoji} ${genre}`);
*/
