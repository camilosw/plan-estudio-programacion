// ============================================================
// TEMA 6: Arrays
// ============================================================
//
// OBJETIVO: Trabajar con listas de datos.
//
// EXPLICACIÓN:
// Un array es una lista ordenada de elementos. En el
// recetario, puedes tener una lista de ingredientes, una
// lista de pasos de preparación o una lista de recetas.
//
// Los arrays se crean con corchetes [] y cada elemento
// se separa con una coma.
//
// EJECUCIÓN:
//   node teoría/tema6_arrays.js
// ============================================================

// --- Crear arrays ---

const ingredientes = ["harina", "azúcar", "huevos", "mantequilla"];
const tiempos = [10, 60, 15, 30, 90];
const mezcla = ["café", 2, true, null]; // Puede mezclar tipos (no recomendado)

console.log("--- Crear arrays ---");
console.log(ingredientes);
console.log(tiempos);

// Array vacío
const nuevasRecetas = [];
console.log("Array vacío:", nuevasRecetas);

// --- Acceder por índice ---

// Los índices empiezan en 0 (no en 1)
console.log("\n--- Acceder por índice ---");
console.log(`Primer ingrediente: ${ingredientes[0]}`);   // harina
console.log(`Segundo ingrediente: ${ingredientes[1]}`);  // azúcar
console.log(`Último ingrediente: ${ingredientes[ingredientes.length - 1]}`); // mantequilla

// --- length ---

console.log("\n--- length ---");
console.log(`Total de ingredientes: ${ingredientes.length}`); // 4
console.log(`Total de tiempos: ${tiempos.length}`);           // 5

// --- Modificar elementos ---

const pasos = ["Mezclar", "Hornear", "Servir"];
console.log("\n--- Modificar ---");
console.log("Antes:", pasos);

pasos[1] = "Hornear a 180°C";
console.log("Después:", pasos);
// Salida: [ 'Mezclar', 'Hornear a 180°C', 'Servir' ]

// Nota: aunque pasos es const, podemos modificar su contenido.
// const impide reasignar la variable, no modificar el array.

// --- push y pop (final del array) ---

const listaCompras = ["harina", "azúcar"];

console.log("\n--- push y pop ---");
console.log("Inicio:", listaCompras);

listaCompras.push("huevos");
listaCompras.push("leche");
console.log("Después de push:", listaCompras);
// [ 'harina', 'azúcar', 'huevos', 'leche' ]

const ultimo = listaCompras.pop();
console.log("pop devuelve:", ultimo); // "leche"
console.log("Después de pop:", listaCompras);
// [ 'harina', 'azúcar', 'huevos' ]

// --- shift y unshift (inicio del array) ---

console.log("\n--- shift y unshift ---");

listaCompras.unshift("chocolate");
console.log("Después de unshift:", listaCompras);
// [ 'chocolate', 'harina', 'azúcar', 'huevos' ]

const primero = listaCompras.shift();
console.log("shift devuelve:", primero); // "chocolate"
console.log("Después de shift:", listaCompras);
// [ 'harina', 'azúcar', 'huevos' ]

// --- splice (agregar/eliminar en cualquier posición) ---

const ingredientesTarta = ["harina", "azúcar", "huevos", "mantequilla", "chocolate"];

console.log("\n--- splice ---");
console.log("Antes:", ingredientesTarta);

// Eliminar 1 elemento desde la posición 2
const eliminado = ingredientesTarta.splice(2, 1);
console.log("Eliminado:", eliminado); // [ 'huevos' ]
console.log("Después:", ingredientesTarta);
// [ 'harina', 'azúcar', 'mantequilla', 'chocolate' ]

// Insertar sin eliminar (0 elementos eliminados)
ingredientesTarta.splice(2, 0, "huevos", "leche");
console.log("Después de insertar:", ingredientesTarta);
// [ 'harina', 'azúcar', 'huevos', 'leche', 'mantequilla', 'chocolate' ]

// --- includes e indexOf ---

const categorias = ["bebidas", "postres", "platos principales", "snacks"];

console.log("\n--- includes e indexOf ---");
console.log(`¿Tiene postres? ${categorias.includes("postres")}`);     // true
console.log(`¿Tiene sopas? ${categorias.includes("sopas")}`);         // false

console.log(`Posición de "snacks": ${categorias.indexOf("snacks")}`); // 3
console.log(`Posición de "sopas": ${categorias.indexOf("sopas")}`);   // -1 (no existe)

// --- join ---

// Convierte un array en un string, uniendo con un separador.

const pasosReceta = ["Mezclar ingredientes", "Verter en molde", "Hornear 30 min"];

console.log("\n--- join ---");
console.log(pasosReceta.join(" → "));
// Salida: Mezclar ingredientes → Verter en molde → Hornear 30 min

console.log(pasosReceta.join("\n"));
// Salida:
// Mezclar ingredientes
// Verter en molde
// Hornear 30 min

// --- reverse ---

console.log("\n--- reverse ---");
const nums = [1, 2, 3, 4, 5];
console.log("Original:", [...nums]); // Copiamos para mostrar el original
nums.reverse();
console.log("Invertido:", nums); // [ 5, 4, 3, 2, 1 ]
// Cuidado: reverse modifica el array original

// --- concat ---

// Combina dos o más arrays en uno nuevo (no modifica los originales).

const bebidas = ["Café", "Té chai"];
const postres = ["Tarta", "Cheesecake"];

console.log("\n--- concat ---");
const menuCompleto = bebidas.concat(postres);
console.log("Menú completo:", menuCompleto);
// [ 'Café', 'Té chai', 'Tarta', 'Cheesecake' ]
console.log("Bebidas sigue igual:", bebidas); // [ 'Café', 'Té chai' ]

// --- slice ---

// Extrae una porción del array SIN modificar el original.
// slice(inicio, fin) — fin no se incluye

const todosLosTiempos = [10, 60, 15, 30, 90, 8, 20, 45];

console.log("\n--- slice ---");
const primerosTres = todosLosTiempos.slice(0, 3);
console.log("Primeros 3:", primerosTres); // [ 10, 60, 15 ]

const ultimosDos = todosLosTiempos.slice(-2);
console.log("Últimos 2:", ultimosDos);    // [ 20, 45 ]

console.log("Original intacto:", todosLosTiempos);

// --- Iterar con for y for...of ---

const recetas = ["Café con leche", "Tarta de chocolate", "Sándwich club"];

console.log("\n--- Iterar con for ---");
for (let i = 0; i < recetas.length; i++) {
    console.log(`${i + 1}. ${recetas[i]}`);
}

console.log("\n--- Iterar con for...of ---");
for (const receta of recetas) {
    console.log(`• ${receta}`);
}

// ============================================================
// EJERCICIO
// ============================================================
// Tienes este array de ingredientes:
//   const ingredientes = ["harina", "azúcar", "huevos"];
//
// 1. Agrega "mantequilla" al final y "chocolate" al inicio
// 2. Muestra la cantidad total de ingredientes
// 3. Elimina el ingrediente de la posición 2 con splice
// 4. Verifica si "huevos" sigue en la lista con includes
// 5. Une todos los ingredientes en un string separado por ", "
// 6. Crea un nuevo array con solo los 2 primeros ingredientes
//    usando slice
// ============================================================
