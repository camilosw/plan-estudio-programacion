// ============================================================
// EJERCICIO 6: Arrays
// ============================================================
// Dominio: Videoclub
//
// OBJETIVO: Practicar la creación y manipulación de arrays
// con datos de películas.
//
// EJECUCIÓN:
//   node ejercicios/ejercicio6_arrays.js
// ============================================================

// --- Datos del videoclub (no modificar) ---
const availableMovies = ["El Padrino", "Volver al Futuro", "Toy Story", "Coco"];
const rentedMovies = ["Inception", "El Secreto de sus Ojos"];

// --- Parte 1: Agregar y quitar ---
// 1. Agrega "Mi vecino Totoro" al final de availableMovies
// 2. Agrega "Matar a un ruiseñor" al inicio
// 3. Quita la última película y muestra cuál fue
// 4. Muestra el array resultante
//
// Salida esperada:
//   Quitada: Mi vecino Totoro
//   Disponibles: [ 'Matar a un ruiseñor', 'El Padrino', 'Volver al Futuro', 'Toy Story', 'Coco' ]

// Tu código aquí:



// --- Parte 2: splice ---
// Inserta "Brownie Wars" en la posición 2 (sin eliminar nada).
// Luego elimina la película de la posición 3.
// Muestra el array después de cada operación.

// Tu código aquí:



// --- Parte 3: Buscar ---
// Verifica si "Coco" está en el array de disponibles.
// Verifica si "Avatar" está en el array de disponibles.
// Muestra la posición de "El Padrino".
//
// Salida esperada:
//   ¿Está Coco? true
//   ¿Está Avatar? false
//   Posición de El Padrino: 1

// Tu código aquí:



// --- Parte 4: Combinar catálogos ---
// Combina availableMovies y rentedMovies en un nuevo array
// "fullCatalog" usando concat.
// Muestra el catálogo completo y la cantidad total.

// Tu código aquí:



// --- Parte 5: slice y join ---
// Del catálogo completo, extrae las 3 primeras películas
// usando slice.
// Une todas las películas del catálogo con " | " usando join.

// Tu código aquí:



// --- Parte 6: Iterar ---
// Recorre availableMovies con for...of y muestra cada
// película con un bullet point.
// Recorre con for clásico y muestra con número de posición.

// Tu código aquí:



// ============================================================
// SOLUCIÓN
// ============================================================
/*
// Parte 1
availableMovies.push("Mi vecino Totoro");
availableMovies.unshift("Matar a un ruiseñor");
const removed = availableMovies.pop();
console.log("Quitada:", removed);
console.log("Disponibles:", availableMovies);

// Parte 2
availableMovies.splice(2, 0, "Brownie Wars");
console.log("\nDespués de insertar:", availableMovies);
const deleted = availableMovies.splice(3, 1);
console.log("Eliminada:", deleted[0]);
console.log("Después de eliminar:", availableMovies);

// Parte 3
console.log(`\n¿Está Coco? ${availableMovies.includes("Coco")}`);
console.log(`¿Está Avatar? ${availableMovies.includes("Avatar")}`);
console.log(`Posición de El Padrino: ${availableMovies.indexOf("El Padrino")}`);

// Parte 4
const fullCatalog = availableMovies.concat(rentedMovies);
console.log("\nCatálogo completo:", fullCatalog);
console.log(`Total de películas: ${fullCatalog.length}`);

// Parte 5
const firstThree = fullCatalog.slice(0, 3);
console.log("\nPrimeras 3:", firstThree);
console.log("Catálogo en texto:", fullCatalog.join(" | "));

// Parte 6
console.log("");
for (const movie of availableMovies) {
    console.log(`• ${movie}`);
}
console.log("");
for (let i = 0; i < availableMovies.length; i++) {
    console.log(`${i + 1}. ${availableMovies[i]}`);
}
*/
