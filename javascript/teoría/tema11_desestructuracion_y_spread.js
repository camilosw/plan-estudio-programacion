// ============================================================
// TEMA 11: Desestructuración y spread/rest
// ============================================================
//
// OBJETIVO: Extraer datos de arrays y objetos de forma
// concisa, y combinar o clonar estructuras.
//
// EXPLICACIÓN:
// Cuando trabajas con recetas, constantemente necesitas
// extraer datos: el nombre y la categoría de una receta,
// los primeros ingredientes de una lista, etc. La
// DESESTRUCTURACIÓN te permite hacer esto en una sola línea.
//
// El operador SPREAD (...) te permite expandir un array u
// objeto, útil para clonar, combinar o crear variantes.
// REST (...) es lo contrario: recoge múltiples argumentos
// en un solo array.
//
// EJECUCIÓN:
//   node teoría/tema11_desestructuracion_y_spread.js
// ============================================================

// --- Desestructuración de arrays ---

const ingredientes = ["harina", "azúcar", "huevos", "mantequilla", "chocolate"];

// Sin desestructuración:
// const primero = ingredientes[0];
// const segundo = ingredientes[1];

// Con desestructuración:
const [primero, segundo, tercero] = ingredientes;

console.log("--- Desestructuración de arrays ---");
console.log(`Primero: ${primero}`);   // harina
console.log(`Segundo: ${segundo}`);   // azúcar
console.log(`Tercero: ${tercero}`);   // huevos

// Saltar elementos con comas
const [, , tercer, cuarto] = ingredientes;
console.log(`Tercer ingrediente: ${tercer}`);  // huevos
console.log(`Cuarto ingrediente: ${cuarto}`);  // mantequilla

// Recoger el resto con ...
const [principal, ...restantes] = ingredientes;
console.log(`Principal: ${principal}`);   // harina
console.log("Restantes:", restantes);     // ['azúcar', 'huevos', 'mantequilla', 'chocolate']

// --- Desestructuración de objetos ---

const receta = {
    nombre: "Tarta de chocolate",
    categoria: "postres",
    tiempoMinutos: 60,
    calificacion: 4.8,
    disponible: true
};

// Sin desestructuración:
// const nombre = receta.nombre;
// const categoria = receta.categoria;

// Con desestructuración:
const { nombre, categoria, tiempoMinutos } = receta;

console.log("\n--- Desestructuración de objetos ---");
console.log(`Nombre: ${nombre}`);       // Tarta de chocolate
console.log(`Categoría: ${categoria}`); // postres
console.log(`Tiempo: ${tiempoMinutos} min`); // 60

// --- Renombrar al desestructurar ---

// A veces el nombre de la propiedad no es conveniente
const { nombre: nombreReceta, calificacion: rating } = receta;

console.log("\n--- Renombrar ---");
console.log(`Receta: ${nombreReceta}`); // Tarta de chocolate
console.log(`Rating: ${rating}`);       // 4.8

// --- Valores por defecto ---

const recetaSimple = {
    nombre: "Café con leche",
    tiempoMinutos: 10
};

// Si la propiedad no existe, usa el valor por defecto
const { nombre: n, dificultad = "fácil", porciones: p = 1 } = recetaSimple;

console.log("\n--- Valores por defecto ---");
console.log(`${n} — dificultad: ${dificultad} — porciones: ${p}`);
// Salida: Café con leche — dificultad: fácil — porciones: 1

// --- Desestructuración anidada ---

const recetaCompleta = {
    nombre: "Cheesecake de frutos rojos",
    ingredientePrincipal: {
        nombre: "queso crema",
        cantidad: 500,
        unidad: "gramos"
    }
};

const { ingredientePrincipal: { nombre: ingrediente, cantidad } } = recetaCompleta;

console.log("\n--- Desestructuración anidada ---");
console.log(`Ingrediente: ${ingrediente} — ${cantidad}`);
// Salida: Ingrediente: queso crema — 500

// --- Desestructuración en parámetros de función ---

// Muy útil cuando una función recibe un objeto
function mostrarReceta({ nombre, categoria, tiempoMinutos, calificacion }) {
    console.log(`${nombre} | ${categoria} | ${tiempoMinutos} min | ${calificacion}★`);
}

console.log("\n--- En parámetros de función ---");
mostrarReceta(receta);
// Salida: Tarta de chocolate | postres | 60 min | 4.8★

// También funciona con arrays en forEach, map, etc.
const recetas = [
    { nombre: "Café con leche", tiempoMinutos: 10, calificacion: 4.5 },
    { nombre: "Brownie", tiempoMinutos: 45, calificacion: 4.6 },
    { nombre: "Ensalada", tiempoMinutos: 20, calificacion: 3.8 }
];

console.log("\nCon forEach:");
recetas.forEach(({ nombre, calificacion }) => {
    console.log(`  ${nombre} — ${calificacion}★`);
});

// --- Spread en arrays ---

console.log("\n--- Spread en arrays ---");

// Clonar un array
const original = [1, 2, 3];
const copia = [...original];
copia.push(4);
console.log("Original:", original); // [1, 2, 3] — no cambió
console.log("Copia:", copia);       // [1, 2, 3, 4]

// Combinar arrays
const bebidas = ["Café con leche", "Té chai"];
const postres = ["Tarta", "Cheesecake"];
const menuCompleto = [...bebidas, ...postres];
console.log("Menú completo:", menuCompleto);
// ['Café con leche', 'Té chai', 'Tarta', 'Cheesecake']

// Insertar elementos en medio
const base = ["harina", "azúcar"];
const completo = [...base, "chocolate", "nueces", ...["leche", "huevos"]];
console.log("Ingredientes completos:", completo);

// --- Spread en objetos ---

console.log("\n--- Spread en objetos ---");

// Clonar un objeto
const recetaOriginal = {
    nombre: "Galletas de avena",
    tiempoMinutos: 30,
    calificacion: 4.0
};

const recetaCopia = { ...recetaOriginal };
recetaCopia.calificacion = 4.5;
console.log("Original:", recetaOriginal.calificacion); // 4.0
console.log("Copia:", recetaCopia.calificacion);       // 4.5

// Crear una variante (clonar + sobreescribir)
const versionSinAzucar = {
    ...recetaOriginal,
    nombre: "Galletas de avena sin azúcar",
    calificacion: 4.2
};
console.log("Variante:", versionSinAzucar);
// { nombre: 'Galletas de avena sin azúcar', tiempoMinutos: 30, calificacion: 4.2 }

// Combinar objetos
const datosBase = { nombre: "Brownie", categoria: "postres" };
const datosExtra = { tiempoMinutos: 45, calificacion: 4.6 };
const recetaFinal = { ...datosBase, ...datosExtra };
console.log("Receta combinada:", recetaFinal);

// --- Rest en parámetros de funciones ---

// El operador rest (...) recoge argumentos "sobrantes" en un array.

function mostrarMenu(titulo, ...recetasDelMenu) {
    console.log(`\n=== ${titulo} ===`);
    recetasDelMenu.forEach((r, i) => console.log(`${i + 1}. ${r}`));
}

console.log("\n--- Rest en parámetros ---");
mostrarMenu("Menú del día", "Café con leche", "Tarta de chocolate", "Ensalada");
// Salida:
// === Menú del día ===
// 1. Café con leche
// 2. Tarta de chocolate
// 3. Ensalada

// --- Intercambiar valores (swap) ---

console.log("\n--- Swap ---");
let a = "primero";
let b = "segundo";
console.log(`Antes: a=${a}, b=${b}`);

[a, b] = [b, a];
console.log(`Después: a=${a}, b=${b}`);
// Salida: Después: a=segundo, b=primero

// ============================================================
// EJERCICIO
// ============================================================
// 1. Dado este objeto:
//    const receta = {
//        nombre: "Brownie con nueces",
//        categoria: "postres",
//        tiempoMinutos: 45,
//        calificacion: 4.6,
//        ingredientes: ["chocolate", "nueces", "harina"]
//    };
//
//    Desestructura: nombre, calificacion (renombrándola a
//    "rating"), y el primer ingrediente
//
// 2. Usa spread para crear una variante "Brownie sin nueces"
//    (clona la receta pero cambia nombre y ingredientes)
//
// 3. Crea una función con rest que reciba un título y
//    cualquier cantidad de ingredientes, y los muestre
//    formateados
//
// 4. Dado un array de recetas, usa desestructuración dentro
//    de un map para crear un array de strings:
//    "NOMBRE: CALIFICACION★"
// ============================================================
