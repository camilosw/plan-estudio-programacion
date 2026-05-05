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

// Tu código aquí:



// --- Parte 2: Día de la semana ---
// Para cada fecha de estreno, muestra en qué día de la
// semana se estrenó la película.

// Tu código aquí:



// --- Parte 3: Antigüedad ---
// Calcula cuántos años tiene cada película desde su estreno.

// Tu código aquí:



// --- Parte 4: Alquiler y vencimiento ---
// Simula un alquiler:
//   - Fecha de alquiler: hoy
//   - Días de alquiler: 3
//   - Calcula la fecha de devolución

// Tu código aquí:



// --- Parte 5: ¿Está vencido? ---
// Crea una función "isOverdue" que reciba una fecha de
// devolución y devuelva true si ya pasó de hoy.

// Tu código aquí:



// --- Parte 6: Ordenar por fecha ---
// Dado un array de alquileres con fecha, ordénalos del más
// reciente al más antiguo.

// Tu código aquí:

const rentals = [
    { title: "El Padrino", rentalDate: new Date(2026, 0, 5) },
    { title: "Coco", rentalDate: new Date(2026, 3, 15) },
    { title: "Toy Story", rentalDate: new Date(2026, 2, 10) }
];



// ============================================================
// SOLUCIÓN
// ============================================================
/*
// Parte 1
const releases = [
    { title: "El Padrino", date: new Date(1972, 2, 15) },
    { title: "Toy Story", date: new Date(1995, 10, 22) },
    { title: "Coco", date: new Date(2017, 9, 20) }
];

const dateFormat = { day: "numeric", month: "long", year: "numeric" };

console.log("--- Fechas de estreno ---");
releases.forEach(r => {
    console.log(`${r.title}: ${r.date.toLocaleDateString("es-ES", dateFormat)}`);
});

// Parte 2
const dayNames = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];

console.log("\n--- Día de estreno ---");
releases.forEach(r => {
    console.log(`${r.title} se estrenó un ${dayNames[r.date.getDay()]}`);
});

// Parte 3
const today = new Date();

console.log("\n--- Antigüedad ---");
releases.forEach(r => {
    const years = today.getFullYear() - r.date.getFullYear();
    console.log(`${r.title}: ${years} años`);
});

// Parte 4
console.log("\n--- Alquiler ---");
const rentalDate = new Date();
const rentalDays = 3;
const dueDate = new Date(rentalDate);
dueDate.setDate(dueDate.getDate() + rentalDays);

console.log(`Película: Inception`);
console.log(`Fecha de alquiler: ${rentalDate.toLocaleDateString("es-ES", dateFormat)}`);
console.log(`Fecha de devolución: ${dueDate.toLocaleDateString("es-ES", dateFormat)}`);

// Parte 5
function isOverdue(dueDate) {
    return dueDate < new Date();
}

console.log("\n--- ¿Está vencido? ---");
const due1 = new Date(2026, 0, 1);
const due2 = new Date(2026, 11, 31);
console.log(`Devolución 1 enero 2026: ${isOverdue(due1) ? "vencido" : "vigente"}`);
console.log(`Devolución 31 diciembre 2026: ${isOverdue(due2) ? "vencido" : "vigente"}`);

// Parte 6
console.log("\n--- Ordenar por fecha ---");
const sorted = [...rentals].sort((a, b) => b.rentalDate - a.rentalDate);
sorted.forEach((r, i) => {
    console.log(`${i + 1}. ${r.title} — ${r.rentalDate.toLocaleDateString("es-ES")}`);
});
*/
