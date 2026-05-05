// ============================================================
// TEMA 13: Fecha y hora
// ============================================================
//
// OBJETIVO: Trabajar con fechas y horas usando el objeto Date.
//
// EXPLICACIÓN:
// En el recetario, las fechas son importantes: cuándo se
// agregó una receta, cuándo fue la última vez que la
// preparaste, cuántos días faltan para un evento especial.
// JavaScript tiene un objeto llamado Date que permite crear,
// manipular y formatear fechas.
//
// EJECUCIÓN:
//   node teoría/tema13_fecha_y_hora.js
// ============================================================

// --- Crear la fecha actual ---

const now = new Date();
console.log("--- Fecha actual ---");
console.log(now);

// --- Crear una fecha específica ---

// new Date(año, mes, día, horas, minutos, segundos)
// ¡CUIDADO! Los meses empiezan en 0 (enero = 0, diciembre = 11)

const opening = new Date(2024, 2, 15); // 15 de marzo de 2024
const christmas = new Date(2026, 11, 25); // 25 de diciembre de 2026

console.log("\n--- Fechas específicas ---");
console.log("Inauguración:", opening);
console.log("Navidad:", christmas);

const fromString = new Date("2026-07-20");
console.log("Desde texto:", fromString);

// --- Métodos get: obtener partes de la fecha ---

const date = new Date(2026, 4, 4, 14, 30, 0); // 4 de mayo de 2026, 14:30

console.log("\n--- Métodos get ---");
console.log(`Año: ${date.getFullYear()}`);     // 2026
console.log(`Mes: ${date.getMonth()}`);        // 4 (mayo, base 0)
console.log(`Día del mes: ${date.getDate()}`); // 4
console.log(`Día de la semana: ${date.getDay()}`); // 1 (0=domingo)
console.log(`Hora: ${date.getHours()}`);       // 14
console.log(`Minutos: ${date.getMinutes()}`);  // 30

// --- Meses base 0: la trampa más común ---

const monthNames = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
];

console.log("\n--- Meses base 0 ---");
console.log(`Mes numérico: ${date.getMonth()}`);
console.log(`Mes legible: ${monthNames[date.getMonth()]}`);

// --- Días de la semana ---

const dayNames = [
    "domingo", "lunes", "martes", "miércoles",
    "jueves", "viernes", "sábado"
];

console.log("\n--- Día de la semana ---");
console.log(`Día: ${dayNames[date.getDay()]}`);

// --- Date.now() y timestamps ---

console.log("\n--- Timestamps ---");
console.log(`Timestamp actual: ${Date.now()}`);

const start = Date.now();
for (let i = 0; i < 1000000; i++) {}
const end = Date.now();
console.log(`El proceso tardó ${end - start} milisegundos`);

// --- Comparar fechas ---

const date1 = new Date(2026, 2, 15);
const date2 = new Date(2026, 8, 20);

console.log("\n--- Comparar fechas ---");
console.log(`${date1 < date2}`);  // true
console.log(`${date1 > date2}`);  // false
console.log(`${date1.getTime() === date2.getTime()}`); // false

if (date1 < date2) {
    console.log("La primera fecha es anterior");
} else {
    console.log("La segunda fecha es anterior");
}

// --- Calcular diferencia entre fechas ---

const addedDate = new Date(2026, 0, 10);
const today = new Date(2026, 4, 4);

const diffMs = today - addedDate;
const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

console.log("\n--- Diferencia entre fechas ---");
console.log(`Días desde que se agregó la receta: ${diffDays}`);

function daysBetween(dateA, dateB) {
    const ms = Math.abs(dateB - dateA);
    return Math.floor(ms / (1000 * 60 * 60 * 24));
}

console.log(`Días hasta navidad: ${daysBetween(today, new Date(2026, 11, 25))}`);

// --- Formatear fechas ---

const exampleDate = new Date(2026, 4, 4);

console.log("\n--- Formatear fechas ---");

console.log(exampleDate.toLocaleDateString());

console.log(exampleDate.toLocaleDateString("es-ES"));

console.log(exampleDate.toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
}));

console.log(exampleDate.toLocaleDateString("es-ES", {
    month: "long",
    year: "numeric"
}));

// --- Formatear hora ---

const withTime = new Date(2026, 4, 4, 14, 30, 0);

console.log("\n--- Formatear hora ---");
console.log(withTime.toLocaleTimeString("es-ES"));

console.log(withTime.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit"
}));

// --- Ejemplo práctico: receta con fechas ---

console.log("\n--- Ejemplo práctico ---");

const recipeWithDates = {
    name: "Tarta de chocolate",
    createdAt: new Date(2026, 0, 15),
    lastCooked: new Date(2026, 3, 28)
};

const todayExample = new Date(2026, 4, 4);
const daysSinceCreation = daysBetween(recipeWithDates.createdAt, todayExample);
const daysSinceCooked = daysBetween(recipeWithDates.lastCooked, todayExample);

const dateFormat = { day: "numeric", month: "long", year: "numeric" };
console.log(`Receta: ${recipeWithDates.name}`);
console.log(`Creada: ${recipeWithDates.createdAt.toLocaleDateString("es-ES", dateFormat)}`);
console.log(`Última preparación: ${recipeWithDates.lastCooked.toLocaleDateString("es-ES", dateFormat)}`);
console.log(`Días desde creación: ${daysSinceCreation}`);
console.log(`Días sin preparar: ${daysSinceCooked}`);
