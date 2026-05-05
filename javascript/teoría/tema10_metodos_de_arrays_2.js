// ============================================================
// TEMA 10: Métodos de arrays II — reduce, sort, some, every
// ============================================================
//
// OBJETIVO: Dominar los métodos avanzados de arrays y
// encadenar operaciones.
//
// EXPLICACIÓN:
// Con map, filter y find puedes transformar, filtrar y
// buscar. Pero a veces necesitas algo más: sumar totales,
// calcular promedios, ordenar listas o verificar condiciones
// sobre toda la colección. Para eso existen reduce, sort,
// some y every.
//
// EJECUCIÓN:
//   node teoría/tema10_metodos_de_arrays_2.js
// ============================================================

const recetas = [
    { nombre: "Café con leche espumosa", categoria: "bebidas", tiempoMinutos: 10, calificacion: 4.5, disponible: true },
    { nombre: "Tarta de chocolate", categoria: "postres", tiempoMinutos: 60, calificacion: 4.8, disponible: true },
    { nombre: "Sándwich club", categoria: "platos principales", tiempoMinutos: 15, calificacion: 4.2, disponible: false },
    { nombre: "Galletas de avena", categoria: "snacks", tiempoMinutos: 30, calificacion: 4.0, disponible: true },
    { nombre: "Cheesecake de frutos rojos", categoria: "postres", tiempoMinutos: 90, calificacion: 4.9, disponible: true },
    { nombre: "Té chai latte", categoria: "bebidas", tiempoMinutos: 8, calificacion: 4.3, disponible: true },
    { nombre: "Ensalada mediterránea", categoria: "platos principales", tiempoMinutos: 20, calificacion: 3.8, disponible: true },
    { nombre: "Brownie con nueces", categoria: "postres", tiempoMinutos: 45, calificacion: 4.6, disponible: false }
];

// --- reduce ---

// reduce recorre el array y ACUMULA un resultado en un solo
// valor. Recibe dos argumentos:
//   1. Un callback con (acumulador, elementoActual)
//   2. El valor inicial del acumulador

// Sumar todos los tiempos
console.log("--- reduce: sumar ---");
const tiempoTotal = recetas.reduce((total, receta) => {
    return total + receta.tiempoMinutos;
}, 0);
console.log(`Tiempo total: ${tiempoTotal} minutos`);
// Salida: Tiempo total: 278 minutos

// Equivalente con for:
// let tiempoTotal = 0;
// for (const receta of recetas) {
//     tiempoTotal += receta.tiempoMinutos;
// }

// Calcular el promedio
console.log("\n--- reduce: promedio ---");
const sumaCalificaciones = recetas.reduce((suma, r) => suma + r.calificacion, 0);
const promedio = sumaCalificaciones / recetas.length;
console.log(`Calificación promedio: ${promedio.toFixed(1)}★`);
// Salida: Calificación promedio: 4.4★

// Contar por categoría (acumulador es un objeto)
console.log("\n--- reduce: contar por categoría ---");
const conteo = recetas.reduce((resultado, receta) => {
    const cat = receta.categoria;
    if (resultado[cat] === undefined) {
        resultado[cat] = 0;
    }
    resultado[cat]++;
    return resultado;
}, {});
console.log(conteo);
// { bebidas: 2, postres: 3, 'platos principales': 2, snacks: 1 }

// Construir un resumen por categoría
console.log("\n--- reduce: resumen por categoría ---");
const resumen = recetas.reduce((resultado, receta) => {
    const cat = receta.categoria;
    if (resultado[cat] === undefined) {
        resultado[cat] = { cantidad: 0, tiempoTotal: 0 };
    }
    resultado[cat].cantidad++;
    resultado[cat].tiempoTotal += receta.tiempoMinutos;
    return resultado;
}, {});

for (const cat in resumen) {
    const datos = resumen[cat];
    console.log(`${cat}: ${datos.cantidad} recetas, ${datos.tiempoTotal} min total`);
}

// --- sort ---

// sort ordena el array MODIFICANDO el original.
// Sin argumento, ordena como texto (alfabéticamente).
// Con una función comparadora, puedes definir el criterio.

// La función comparadora recibe dos elementos (a, b):
//   - Si retorna negativo: a va primero
//   - Si retorna positivo: b va primero
//   - Si retorna 0: no cambia el orden

// Para no modificar el original, trabajamos con una copia
const copiaRecetas = [...recetas];

// Ordenar por calificación (mayor a menor)
console.log("\n--- sort: por calificación descendente ---");
copiaRecetas.sort((a, b) => b.calificacion - a.calificacion);
copiaRecetas.forEach(r => {
    console.log(`${r.calificacion}★ — ${r.nombre}`);
});

// Ordenar por tiempo (menor a mayor)
console.log("\n--- sort: por tiempo ascendente ---");
const porTiempo = [...recetas];
porTiempo.sort((a, b) => a.tiempoMinutos - b.tiempoMinutos);
porTiempo.forEach(r => {
    console.log(`${r.tiempoMinutos} min — ${r.nombre}`);
});

// Ordenar por nombre (alfabéticamente)
console.log("\n--- sort: alfabético ---");
const porNombre = [...recetas];
porNombre.sort((a, b) => a.nombre.localeCompare(b.nombre));
porNombre.forEach(r => console.log(`• ${r.nombre}`));

// --- some ---

// some comprueba si AL MENOS UN elemento cumple la condición.
// Devuelve true/false.

console.log("\n--- some ---");
const hayPostres = recetas.some(r => r.categoria === "postres");
console.log(`¿Hay postres? ${hayPostres}`); // true

const haySopas = recetas.some(r => r.categoria === "sopas");
console.log(`¿Hay sopas? ${haySopas}`); // false

const hayRapida = recetas.some(r => r.tiempoMinutos < 10);
console.log(`¿Hay receta de menos de 10 min? ${hayRapida}`); // true

// --- every ---

// every comprueba si TODOS los elementos cumplen la condición.
// Devuelve true/false.

console.log("\n--- every ---");
const todasDisponibles = recetas.every(r => r.disponible);
console.log(`¿Todas disponibles? ${todasDisponibles}`); // false

const todasConRating = recetas.every(r => r.calificacion > 3);
console.log(`¿Todas con rating > 3? ${todasConRating}`); // true

// --- Encadenar métodos ---

// Puedes encadenar métodos uno tras otro. Cada método devuelve
// un array (excepto reduce, some, every, find) sobre el que
// puedes seguir operando.

// Top 3 recetas disponibles por calificación
console.log("\n--- Encadenar: top 3 disponibles ---");
const top3 = recetas
    .filter(r => r.disponible)
    .sort((a, b) => b.calificacion - a.calificacion)
    .slice(0, 3)
    .map(r => `${r.nombre} — ${r.calificacion}★`);

top3.forEach(ficha => console.log(ficha));
// Salida:
// Cheesecake de frutos rojos — 4.9★
// Tarta de chocolate — 4.8★
// Café con leche espumosa — 4.5★

// Nombres de recetas rápidas, en mayúsculas
console.log("\n--- Encadenar: rápidas en mayúsculas ---");
const rapidasMayusculas = recetas
    .filter(r => r.tiempoMinutos <= 15)
    .map(r => r.nombre.toUpperCase());

console.log(rapidasMayusculas);
// [ 'CAFÉ CON LECHE ESPUMOSA', 'SÁNDWICH CLUB', 'TÉ CHAI LATTE' ]

// Tiempo total solo de postres
console.log("\n--- Encadenar: tiempo total de postres ---");
const tiempoPostres = recetas
    .filter(r => r.categoria === "postres")
    .reduce((total, r) => total + r.tiempoMinutos, 0);

console.log(`Tiempo total de postres: ${tiempoPostres} min`);
// Salida: Tiempo total de postres: 195 min

// ============================================================
// EJERCICIO
// ============================================================
// Usando el array "recetas":
//
// 1. Usa reduce para calcular el tiempo promedio de todas
//    las recetas
//
// 2. Usa sort para ordenar las recetas por tiempo de menor
//    a mayor y muestra el resultado
//
// 3. Usa some para verificar si hay alguna receta con
//    calificación perfecta (5.0)
//
// 4. Usa every para verificar si todas las recetas tienen
//    nombre (propiedad nombre no vacía)
//
// 5. Encadena métodos para obtener los nombres de las
//    recetas no disponibles, ordenados alfabéticamente
// ============================================================
