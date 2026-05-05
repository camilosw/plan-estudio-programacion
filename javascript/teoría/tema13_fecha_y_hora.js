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

const ahora = new Date();
console.log("--- Fecha actual ---");
console.log(ahora);
// Salida: algo como 2026-05-04T15:30:00.000Z

// --- Crear una fecha específica ---

// new Date(año, mes, día, horas, minutos, segundos)
// ¡CUIDADO! Los meses empiezan en 0 (enero = 0, diciembre = 11)

const inauguracion = new Date(2024, 2, 15); // 15 de marzo de 2024 (mes 2 = marzo)
const navidad = new Date(2026, 11, 25);     // 25 de diciembre de 2026 (mes 11 = diciembre)

console.log("\n--- Fechas específicas ---");
console.log("Inauguración:", inauguracion);
console.log("Navidad:", navidad);

// Desde un string (formato ISO)
const desdeTexto = new Date("2026-07-20");
console.log("Desde texto:", desdeTexto);

// --- Métodos get: obtener partes de la fecha ---

const fecha = new Date(2026, 4, 4, 14, 30, 0); // 4 de mayo de 2026, 14:30

console.log("\n--- Métodos get ---");
console.log(`Año: ${fecha.getFullYear()}`);     // 2026
console.log(`Mes: ${fecha.getMonth()}`);        // 4 (mayo, recuerda: base 0)
console.log(`Día del mes: ${fecha.getDate()}`); // 4
console.log(`Día de la semana: ${fecha.getDay()}`); // 1 (0=domingo, 1=lunes, ...)
console.log(`Hora: ${fecha.getHours()}`);       // 14
console.log(`Minutos: ${fecha.getMinutes()}`);  // 30

// --- Meses base 0: la trampa más común ---

// Esto es confuso pero importante:
//   0 = enero, 1 = febrero, ..., 11 = diciembre
// Para mostrarlo correctamente, puedes sumar 1 o usar un array:

const nombresMeses = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
];

console.log("\n--- Meses base 0 ---");
console.log(`Mes numérico: ${fecha.getMonth()}`);              // 4
console.log(`Mes legible: ${nombresMeses[fecha.getMonth()]}`); // mayo

// --- Días de la semana ---

const nombresDias = [
    "domingo", "lunes", "martes", "miércoles",
    "jueves", "viernes", "sábado"
];

console.log("\n--- Día de la semana ---");
console.log(`Día: ${nombresDias[fecha.getDay()]}`); // lunes

// --- Date.now() y timestamps ---

// Date.now() devuelve los milisegundos desde el 1 de enero de 1970.
// Útil para medir tiempos.

console.log("\n--- Timestamps ---");
console.log(`Timestamp actual: ${Date.now()}`);

const inicio = Date.now();
for (let i = 0; i < 1000000; i++) {} // Simulamos un proceso
const fin = Date.now();
console.log(`El proceso tardó ${fin - inicio} milisegundos`);

// --- Comparar fechas ---

const fecha1 = new Date(2026, 2, 15);  // 15 marzo
const fecha2 = new Date(2026, 8, 20);  // 20 septiembre

console.log("\n--- Comparar fechas ---");
console.log(`${fecha1 < fecha2}`);  // true (marzo es antes que septiembre)
console.log(`${fecha1 > fecha2}`);  // false
console.log(`${fecha1.getTime() === fecha2.getTime()}`); // false

// Para saber cuál es más reciente:
if (fecha1 < fecha2) {
    console.log("La primera fecha es anterior");
} else {
    console.log("La segunda fecha es anterior");
}

// --- Calcular diferencia entre fechas ---

const fechaAgregada = new Date(2026, 0, 10);  // 10 enero 2026
const hoy = new Date(2026, 4, 4);             // 4 mayo 2026

const diferenciaMs = hoy - fechaAgregada; // Resta en milisegundos
const diferenciaDias = Math.floor(diferenciaMs / (1000 * 60 * 60 * 24));

console.log("\n--- Diferencia entre fechas ---");
console.log(`Días desde que se agregó la receta: ${diferenciaDias}`);
// Salida: 114 días (aprox)

// Función reutilizable
function diasEntre(fecha1, fecha2) {
    const ms = Math.abs(fecha2 - fecha1);
    return Math.floor(ms / (1000 * 60 * 60 * 24));
}

console.log(`Días hasta navidad: ${diasEntre(hoy, new Date(2026, 11, 25))}`);

// --- Formatear fechas ---

// toLocaleDateString permite formatear según el idioma
const fechaEjemplo = new Date(2026, 4, 4);

console.log("\n--- Formatear fechas ---");

// Formato por defecto (depende del sistema)
console.log(fechaEjemplo.toLocaleDateString());

// Formato en español
console.log(fechaEjemplo.toLocaleDateString("es-ES"));
// Salida: 4/5/2026

// Con opciones de formato
console.log(fechaEjemplo.toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
}));
// Salida: lunes, 4 de mayo de 2026

// Solo mes y año
console.log(fechaEjemplo.toLocaleDateString("es-ES", {
    month: "long",
    year: "numeric"
}));
// Salida: mayo de 2026

// --- Formatear hora ---

const conHora = new Date(2026, 4, 4, 14, 30, 0);

console.log("\n--- Formatear hora ---");
console.log(conHora.toLocaleTimeString("es-ES"));
// Salida: 14:30:00

console.log(conHora.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit"
}));
// Salida: 14:30

// --- Ejemplo práctico: receta con fechas ---

console.log("\n--- Ejemplo práctico ---");

const receta = {
    nombre: "Tarta de chocolate",
    fechaCreacion: new Date(2026, 0, 15),
    ultimaPreparacion: new Date(2026, 3, 28)
};

const hoyEjemplo = new Date(2026, 4, 4);
const diasDesdeCreacion = diasEntre(receta.fechaCreacion, hoyEjemplo);
const diasDesdePreparacion = diasEntre(receta.ultimaPreparacion, hoyEjemplo);

const formato = { day: "numeric", month: "long", year: "numeric" };
console.log(`Receta: ${receta.nombre}`);
console.log(`Creada: ${receta.fechaCreacion.toLocaleDateString("es-ES", formato)}`);
console.log(`Última preparación: ${receta.ultimaPreparacion.toLocaleDateString("es-ES", formato)}`);
console.log(`Días desde creación: ${diasDesdeCreacion}`);
console.log(`Días sin preparar: ${diasDesdePreparacion}`);

// ============================================================
// EJERCICIO
// ============================================================
// 1. Crea una fecha para tu cumpleaños de este año. Muestra:
//    - El día de la semana en que cae (nombre completo)
//    - La fecha formateada en español
//
// 2. Calcula cuántos días faltan desde hoy hasta fin de año
//    (31 de diciembre)
//
// 3. Crea un array de 3 recetas, cada una con una propiedad
//    "fechaCreacion". Ordénalas de la más antigua a la más
//    reciente y muestra cada una con su fecha formateada
//
// 4. Crea una función "esRecetaReciente" que reciba una fecha
//    y devuelva true si fue creada en los últimos 30 días
// ============================================================
