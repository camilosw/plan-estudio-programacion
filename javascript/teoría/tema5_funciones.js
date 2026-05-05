// ============================================================
// TEMA 5: Funciones
// ============================================================
//
// OBJETIVO: Organizar el código en bloques reutilizables.
//
// EXPLICACIÓN:
// En el recetario, hay tareas que repites constantemente:
// calcular el costo de una receta, clasificar su dificultad,
// formatear los datos para mostrarlos. En vez de copiar y
// pegar el mismo código, lo envuelves en una FUNCIÓN.
//
// Una función es como una receta dentro de tu recetario:
// tiene un nombre, recibe ingredientes (parámetros) y
// produce un resultado (valor de retorno).
//
// EJECUCIÓN:
//   node teoría/tema5_funciones.js
// ============================================================

// --- Declaración de función ---

// La forma clásica de crear una función.
// Se declara con la palabra function, seguida del nombre.

function saludar() {
    console.log("¡Bienvenida al Recetario de Sandra!");
}

saludar();
// Salida: ¡Bienvenida al Recetario de Sandra!

// --- Parámetros y argumentos ---

// Los parámetros son los datos que la función necesita.
// Los argumentos son los valores que le pasamos al llamarla.

function mostrarReceta(nombre, tiempo) {
    console.log(`${nombre} — ${tiempo} minutos`);
}

console.log("\n--- Parámetros ---");
mostrarReceta("Café con leche espumosa", 10);
mostrarReceta("Tarta de chocolate", 60);
// Salida:
// Café con leche espumosa — 10 minutos
// Tarta de chocolate — 60 minutos

// --- Parámetros por defecto ---

// Puedes darle un valor por defecto a un parámetro.
// Si no se pasa un argumento, usa el valor por defecto.

function mostrarRecetaConPorciones(nombre, tiempo, porciones = 4) {
    console.log(`${nombre} — ${tiempo} min — ${porciones} porciones`);
}

console.log("\n--- Parámetros por defecto ---");
mostrarRecetaConPorciones("Galletas de avena", 30, 12);
mostrarRecetaConPorciones("Brownie con nueces", 45);
// Salida:
// Galletas de avena — 30 min — 12 porciones
// Brownie con nueces — 45 min — 4 porciones (usa el default)

// --- return ---

// return devuelve un valor al código que llamó a la función.
// La función se detiene en el return.

function calcularPrecioPorPorcion(precioTotal, porciones) {
    return precioTotal / porciones;
}

const precio = calcularPrecioPorPorcion(24, 8);
console.log("\n--- return ---");
console.log(`Precio por porción: $${precio}`);
// Salida: Precio por porción: $3

function clasificarDificultad(tiempoMinutos, cantidadIngredientes) {
    if (tiempoMinutos <= 15 && cantidadIngredientes <= 5) {
        return "fácil";
    } else if (tiempoMinutos <= 45) {
        return "media";
    } else {
        return "difícil";
    }
}

console.log(clasificarDificultad(10, 3));   // "fácil"
console.log(clasificarDificultad(30, 8));   // "media"
console.log(clasificarDificultad(90, 12));  // "difícil"

// --- Expresiones de función ---

// Puedes guardar una función en una variable (constante).
// Se llama "expresión de función".

const formatearReceta = function(nombre, categoria, calificacion) {
    return `${nombre} | ${categoria} | ${calificacion}★`;
};

console.log("\n--- Expresión de función ---");
console.log(formatearReceta("Cheesecake de frutos rojos", "postres", 4.9));
// Salida: Cheesecake de frutos rojos | postres | 4.9★

// --- Arrow functions (funciones flecha) ---

// Una forma más corta de escribir funciones. Usa => en vez
// de la palabra function.

// Forma completa:
const calcularTiempoTotal = (tiempo1, tiempo2) => {
    return tiempo1 + tiempo2;
};

// Forma abreviada (cuando el cuerpo es una sola expresión,
// el return es implícito):
const sumarTiempos = (t1, t2) => t1 + t2;

// Con un solo parámetro, los paréntesis son opcionales:
const esRapida = tiempo => tiempo <= 15;

console.log("\n--- Arrow functions ---");
console.log(`Total: ${calcularTiempoTotal(10, 60)} min`);
console.log(`Suma: ${sumarTiempos(30, 45)} min`);
console.log(`¿10 min es rápida? ${esRapida(10)}`);   // true
console.log(`¿60 min es rápida? ${esRapida(60)}`);   // false

// --- Scope (alcance) ---

// Las variables tienen un alcance que determina dónde se
// pueden usar.

const recetario = "El Recetario de Sandra"; // Variable global

function mostrarInfo() {
    const mensaje = "Información interna"; // Variable local
    console.log(recetario); // Puede acceder a la global
    console.log(mensaje);   // Puede acceder a su propia variable
}

console.log("\n--- Scope ---");
mostrarInfo();
console.log(recetario); // Funciona: es global
// console.log(mensaje); // Error: mensaje no está definida aquí

// Scope de bloque: let y const solo existen dentro de { }
if (true) {
    const variableDeBloque = "Solo existo aquí dentro";
    console.log(variableDeBloque); // Funciona
}
// console.log(variableDeBloque); // Error: no existe fuera del if

// --- Closures (intro básica) ---

// Un closure es una función que "recuerda" las variables del
// lugar donde fue creada, incluso después de que ese lugar
// ya terminó de ejecutarse.

function crearContador(nombre) {
    let cuenta = 0;
    return function() {
        cuenta++;
        return `${nombre}: preparada ${cuenta} vez/veces`;
    };
}

const contadorCafe = crearContador("Café con leche");
const contadorTarta = crearContador("Tarta de chocolate");

console.log("\n--- Closures ---");
console.log(contadorCafe());  // Café con leche: preparada 1 vez/veces
console.log(contadorCafe());  // Café con leche: preparada 2 vez/veces
console.log(contadorTarta()); // Tarta de chocolate: preparada 1 vez/veces
console.log(contadorCafe());  // Café con leche: preparada 3 vez/veces

// Cada contador tiene su propia variable "cuenta" independiente.

// --- Funciones como valores ---

// En JavaScript, las funciones son valores. Puedes guardarlas
// en variables, pasarlas como argumentos o devolverlas como
// resultado de otra función.

function aplicarOperacion(a, b, operacion) {
    return operacion(a, b);
}

const sumar = (a, b) => a + b;
const multiplicar = (a, b) => a * b;

console.log("\n--- Funciones como valores ---");
console.log(`Sumar: ${aplicarOperacion(10, 5, sumar)}`);        // 15
console.log(`Multiplicar: ${aplicarOperacion(10, 5, multiplicar)}`); // 50

// Esto es la base de los callbacks que veremos más adelante.

// ============================================================
// EJERCICIO
// ============================================================
// 1. Crea una función "ajustarPorciones" que reciba:
//    - cantidadOriginal (número de ingrediente)
//    - porcionesOriginales
//    - porcionesDeseadas (con valor por defecto 4)
//    Y devuelva la cantidad ajustada.
//    Ejemplo: ajustarPorciones(200, 8, 4) → 100
//
// 2. Crea una arrow function "formatearTiempo" que reciba
//    minutos y devuelva un string formateado:
//    - 90 → "1h 30min"
//    - 45 → "45min"
//    - 120 → "2h 0min"
//
// 3. Crea una función "evaluarReceta" que reciba nombre,
//    tiempo y calificación, y muestre:
//    - Si calificación >= 4.5: "nombre: ★ Receta estrella ★"
//    - Si no: "nombre: Buena receta"
//    Usa la función clasificarDificultad dentro de ella.
// ============================================================
