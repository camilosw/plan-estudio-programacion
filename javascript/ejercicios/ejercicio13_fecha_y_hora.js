// ============================================================
// EJERCICIO 13: Fecha y hora
// ============================================================
// Dominio: Videoclub
//
// OBJETIVO: Practicar el objeto Date con datos del videoclub:
// fechas de estreno, alquileres y vencimientos.
//
// EJECUCIÓN:
//   node ejercicios/ejercicio13_fecha_y_hora.js
// ============================================================

// --- Parte 1: Fechas de estreno ---
// Crea objetos Date para las fechas de estreno de estas
// películas y muéstralas formateadas en español:
//   - El Padrino: 15 de marzo de 1972
//   - Toy Story: 22 de noviembre de 1995
//   - Coco: 20 de octubre de 2017
//
// Salida esperada:
//   El Padrino: 15 de marzo de 1972
//   Toy Story: 22 de noviembre de 1995
//   Coco: 20 de octubre de 2017

// Tu código aquí:



// --- Parte 2: Día de la semana ---
// Para cada fecha de estreno, muestra en qué día de la
// semana se estrenó la película.
//
// Salida esperada:
//   El Padrino se estrenó un miércoles
//   Toy Story se estrenó un miércoles
//   Coco se estrenó un viernes

// Tu código aquí:



// --- Parte 3: Antigüedad ---
// Calcula cuántos años tiene cada película desde su estreno
// hasta hoy. Usa la fecha actual.
//
// Salida esperada (variará según la fecha actual):
//   El Padrino: 54 años
//   Toy Story: 30 años
//   Coco: 8 años

// Tu código aquí:



// --- Parte 4: Alquiler y vencimiento ---
// Simula un alquiler:
//   - Fecha de alquiler: hoy
//   - Días de alquiler: 3
//   - Calcula la fecha de devolución
//   - Muestra ambas fechas formateadas
//
// Salida esperada (variará según la fecha):
//   Película: Inception
//   Fecha de alquiler: 4 de mayo de 2026
//   Fecha de devolución: 7 de mayo de 2026

// Tu código aquí:



// --- Parte 5: ¿Está vencido? ---
// Crea una función "estaVencido" que reciba una fecha de
// devolución y devuelva true si ya pasó de hoy.
// Prueba con una fecha pasada y una futura.
//
// Salida esperada:
//   Devolución 1 enero 2026: vencido
//   Devolución 31 diciembre 2026: vigente

// Tu código aquí:



// --- Parte 6: Ordenar por fecha ---
// Dado un array de alquileres con fecha, ordénalos del más
// reciente al más antiguo.
//
// Salida esperada:
//   1. Coco — 15/4/2026
//   2. Toy Story — 10/3/2026
//   3. El Padrino — 5/1/2026

// Tu código aquí:

const alquileres = [
    { titulo: "El Padrino", fechaAlquiler: new Date(2026, 0, 5) },
    { titulo: "Coco", fechaAlquiler: new Date(2026, 3, 15) },
    { titulo: "Toy Story", fechaAlquiler: new Date(2026, 2, 10) }
];



// ============================================================
// SOLUCIÓN
// ============================================================
/*
// Parte 1
const estrenos = [
    { titulo: "El Padrino", fecha: new Date(1972, 2, 15) },
    { titulo: "Toy Story", fecha: new Date(1995, 10, 22) },
    { titulo: "Coco", fecha: new Date(2017, 9, 20) }
];

const formatoFecha = { day: "numeric", month: "long", year: "numeric" };

console.log("--- Fechas de estreno ---");
estrenos.forEach(e => {
    console.log(`${e.titulo}: ${e.fecha.toLocaleDateString("es-ES", formatoFecha)}`);
});

// Parte 2
const dias = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];

console.log("\n--- Día de estreno ---");
estrenos.forEach(e => {
    console.log(`${e.titulo} se estrenó un ${dias[e.fecha.getDay()]}`);
});

// Parte 3
const hoy = new Date();

console.log("\n--- Antigüedad ---");
estrenos.forEach(e => {
    const anios = hoy.getFullYear() - e.fecha.getFullYear();
    console.log(`${e.titulo}: ${anios} años`);
});

// Parte 4
console.log("\n--- Alquiler ---");
const fechaAlquiler = new Date();
const diasAlquiler = 3;
const fechaDevolucion = new Date(fechaAlquiler);
fechaDevolucion.setDate(fechaDevolucion.getDate() + diasAlquiler);

console.log(`Película: Inception`);
console.log(`Fecha de alquiler: ${fechaAlquiler.toLocaleDateString("es-ES", formatoFecha)}`);
console.log(`Fecha de devolución: ${fechaDevolucion.toLocaleDateString("es-ES", formatoFecha)}`);

// Parte 5
function estaVencido(fechaDevolucion) {
    return fechaDevolucion < new Date();
}

console.log("\n--- ¿Está vencido? ---");
const dev1 = new Date(2026, 0, 1);
const dev2 = new Date(2026, 11, 31);
console.log(`Devolución 1 enero 2026: ${estaVencido(dev1) ? "vencido" : "vigente"}`);
console.log(`Devolución 31 diciembre 2026: ${estaVencido(dev2) ? "vencido" : "vigente"}`);

// Parte 6
console.log("\n--- Ordenar por fecha ---");
const ordenados = [...alquileres].sort((a, b) => b.fechaAlquiler - a.fechaAlquiler);
ordenados.forEach((a, i) => {
    console.log(`${i + 1}. ${a.titulo} — ${a.fechaAlquiler.toLocaleDateString("es-ES")}`);
});
*/
