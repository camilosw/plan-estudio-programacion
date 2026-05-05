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
const peliculasDisponibles = ["El Padrino", "Volver al Futuro", "Toy Story", "Coco"];
const peliculasAlquiladas = ["Inception", "El Secreto de sus Ojos"];

// --- Parte 1: Agregar y quitar ---
// 1. Agrega "Mi vecino Totoro" al final de peliculasDisponibles
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
//
// Salida esperada:
//   Después de insertar: [ ..., 'Brownie Wars', ... ]
//   Eliminada: ...
//   Después de eliminar: [ ... ]

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
// Combina peliculasDisponibles y peliculasAlquiladas en un
// nuevo array "catalogoCompleto" usando concat.
// Muestra el catálogo completo y la cantidad total.
//
// Salida esperada:
//   Catálogo completo: [ ..., ..., ... ]
//   Total de películas: ...

// Tu código aquí:



// --- Parte 5: slice y join ---
// Del catálogo completo, extrae las 3 primeras películas
// usando slice.
// Une todas las películas del catálogo con " | " usando join.
//
// Salida esperada:
//   Primeras 3: [ ..., ..., ... ]
//   Catálogo en texto: ... | ... | ... | ...

// Tu código aquí:



// --- Parte 6: Iterar ---
// Recorre peliculasDisponibles con for...of y muestra cada
// película con un bullet point.
// Recorre con for clásico y muestra con número de posición.
//
// Salida esperada:
//   • Matar a un ruiseñor
//   • El Padrino
//   ...
//
//   1. Matar a un ruiseñor
//   2. El Padrino
//   ...

// Tu código aquí:



// ============================================================
// SOLUCIÓN
// ============================================================
/*
// Parte 1
peliculasDisponibles.push("Mi vecino Totoro");
peliculasDisponibles.unshift("Matar a un ruiseñor");
const quitada = peliculasDisponibles.pop();
console.log("Quitada:", quitada);
console.log("Disponibles:", peliculasDisponibles);

// Parte 2
peliculasDisponibles.splice(2, 0, "Brownie Wars");
console.log("\nDespués de insertar:", peliculasDisponibles);
const eliminada = peliculasDisponibles.splice(3, 1);
console.log("Eliminada:", eliminada[0]);
console.log("Después de eliminar:", peliculasDisponibles);

// Parte 3
console.log(`\n¿Está Coco? ${peliculasDisponibles.includes("Coco")}`);
console.log(`¿Está Avatar? ${peliculasDisponibles.includes("Avatar")}`);
console.log(`Posición de El Padrino: ${peliculasDisponibles.indexOf("El Padrino")}`);

// Parte 4
const catalogoCompleto = peliculasDisponibles.concat(peliculasAlquiladas);
console.log("\nCatálogo completo:", catalogoCompleto);
console.log(`Total de películas: ${catalogoCompleto.length}`);

// Parte 5
const primeras3 = catalogoCompleto.slice(0, 3);
console.log("\nPrimeras 3:", primeras3);
console.log("Catálogo en texto:", catalogoCompleto.join(" | "));

// Parte 6
console.log("");
for (const pelicula of peliculasDisponibles) {
    console.log(`• ${pelicula}`);
}
console.log("");
for (let i = 0; i < peliculasDisponibles.length; i++) {
    console.log(`${i + 1}. ${peliculasDisponibles[i]}`);
}
*/
