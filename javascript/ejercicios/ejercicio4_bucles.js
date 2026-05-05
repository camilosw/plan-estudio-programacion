// ============================================================
// EJERCICIO 4: Bucles
// ============================================================
// Dominio: Videoclub
//
// OBJETIVO: Practicar todos los tipos de bucles con datos
// de películas.
//
// EJECUCIÓN:
//   node ejercicios/ejercicio4_bucles.js
// ============================================================

// --- Datos del videoclub (no modificar) ---
const titles = [
    "El Padrino",
    "Volver al Futuro",
    "Toy Story",
    "El Secreto de sus Ojos",
    "Coco",
    "Inception",
    "Matar a un ruiseñor",
    "Mi vecino Totoro"
];

const durations = [175, 116, 81, 129, 105, 148, 129, 86];
const ratings = [9.2, 8.5, 8.3, 8.0, 8.4, 8.8, 8.3, 8.2];

// --- Parte 1: Listar con for clásico ---
// Muestra cada película con su número usando un for clásico.
//
// Salida esperada:
//   1. El Padrino
//   2. Volver al Futuro
//   ... (y así con todas)

// Tu código aquí:



// --- Parte 2: Duración total y promedio ---
// Usa for...of para calcular la duración total y el promedio.
//
// Salida esperada:
//   Duración total: 969 minutos
//   Duración promedio: 121.1 minutos

// Tu código aquí:



// --- Parte 3: Buscar con while ---
// Usa while para encontrar la primera película que dure
// menos de 90 minutos.
//
// Salida esperada:
//   Primera película corta: Toy Story (81 min)

// Tu código aquí:



// --- Parte 4: Filtrar con continue ---
// Usa for...of con continue para mostrar solo las películas
// con calificación mayor a 8.4.
//
// Salida esperada:
//   Películas destacadas (> 8.4):
//   - El Padrino (9.2)
//   - Volver al Futuro (8.5)
//   - Inception (8.8)

// Tu código aquí:



// --- Parte 5: Contar por rango de duración ---
// Recorre el array de duraciones y cuenta:
//   - Cortas: menos de 100 min
//   - Normales: 100–140 min
//   - Largas: más de 140 min
//
// Salida esperada:
//   Cortas (< 100 min): 2
//   Normales (100-140 min): 4
//   Largas (> 140 min): 2

// Tu código aquí:



// --- Parte 6: Película con mejor calificación ---
// Usa un for clásico para encontrar el índice de la película
// con la mayor calificación y muestra su título y calificación.
//
// Salida esperada:
//   Mejor película: El Padrino — 9.2

// Tu código aquí:



// ============================================================
// SOLUCIÓN
// ============================================================
/*
// Parte 1
console.log("--- Catálogo ---");
for (let i = 0; i < titles.length; i++) {
    console.log(`${i + 1}. ${titles[i]}`);
}

// Parte 2
let totalDuration = 0;
for (const d of durations) {
    totalDuration += d;
}
console.log(`\nDuración total: ${totalDuration} minutos`);
console.log(`Duración promedio: ${(totalDuration / durations.length).toFixed(1)} minutos`);

// Parte 3
let idx = 0;
while (idx < durations.length) {
    if (durations[idx] < 90) {
        console.log(`\nPrimera película corta: ${titles[idx]} (${durations[idx]} min)`);
        break;
    }
    idx++;
}

// Parte 4
console.log("\nPelículas destacadas (> 8.4):");
for (let i = 0; i < ratings.length; i++) {
    if (ratings[i] <= 8.4) {
        continue;
    }
    console.log(`- ${titles[i]} (${ratings[i]})`);
}

// Parte 5
let shortCount = 0;
let normalCount = 0;
let longCount = 0;
for (const d of durations) {
    if (d < 100) {
        shortCount++;
    } else if (d <= 140) {
        normalCount++;
    } else {
        longCount++;
    }
}
console.log(`\nCortas (< 100 min): ${shortCount}`);
console.log(`Normales (100-140 min): ${normalCount}`);
console.log(`Largas (> 140 min): ${longCount}`);

// Parte 6
let bestIndex = 0;
for (let i = 1; i < ratings.length; i++) {
    if (ratings[i] > ratings[bestIndex]) {
        bestIndex = i;
    }
}
console.log(`\nMejor película: ${titles[bestIndex]} — ${ratings[bestIndex]}`);
*/
