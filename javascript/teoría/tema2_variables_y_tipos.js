// ============================================================
// TEMA 2: Variables y tipos de datos
// ============================================================
//
// OBJETIVO: Almacenar información en variables y conocer los
// tipos de datos de JavaScript.
//
// EXPLICACIÓN:
// Imagina que cada receta tiene una ficha. Esa ficha tiene
// campos: nombre, tiempo, porciones, disponible. Cada campo
// guarda un tipo de dato diferente: texto, número, verdadero/
// falso. En JavaScript, esos campos son VARIABLES.
//
// Para declarar variables usamos dos palabras clave:
//   const — para valores que NO cambian
//   let   — para valores que SÍ pueden cambiar
//
// Regla de oro: usa const siempre que puedas. Solo usa let
// cuando necesites cambiar el valor después.
//
// EJECUCIÓN:
//   node teoría/tema2_variables_y_tipos.js
// ============================================================

// --- const y let ---

const nombreReceta = "Café con leche espumosa";
const tiempoMinutos = 10;

let porciones = 2;
porciones = 4; // Podemos cambiar el valor porque usamos let

console.log("Receta:", nombreReceta);
console.log("Tiempo:", tiempoMinutos, "minutos");
console.log("Porciones:", porciones);
// Salida:
// Receta: Café con leche espumosa
// Tiempo: 10 minutos
// Porciones: 4

// Si intentamos cambiar un const, JavaScript da un error:
// nombreReceta = "Otra receta"; // TypeError: Assignment to constant variable

// --- ¿Por qué no usar var? ---

// Existe una tercera forma antigua: var. No la usamos porque
// tiene comportamientos confusos con el alcance de las variables.
// Siempre usa const o let.

// --- Los tipos de datos primitivos ---

// JavaScript tiene 5 tipos de datos básicos (primitivos):

const nombre = "Tarta de chocolate";  // string  (texto)
const tiempo = 60;                    // number  (número entero)
const precio = 4.50;                  // number  (número decimal)
const disponible = true;              // boolean (verdadero/falso)
const alergeno = null;                // null    (vacío intencional)
let instruccionesEspeciales;          // undefined (sin valor asignado)

console.log("\n--- Tipos de datos ---");
console.log("nombre:", nombre);
console.log("tiempo:", tiempo);
console.log("precio:", precio);
console.log("disponible:", disponible);
console.log("alergeno:", alergeno);
console.log("instrucciones:", instruccionesEspeciales);
// Salida:
// --- Tipos de datos ---
// nombre: Tarta de chocolate
// tiempo: 60
// precio: 4.5
// disponible: true
// alergeno: null
// instrucciones: undefined

// --- typeof: saber qué tipo tiene un dato ---

console.log("\n--- typeof ---");
console.log(typeof nombre);      // string
console.log(typeof tiempo);      // number
console.log(typeof precio);      // number
console.log(typeof disponible);  // boolean
console.log(typeof alergeno);    // object  (esto es un error histórico de JS)
console.log(typeof instruccionesEspeciales); // undefined

// --- Template literals (plantillas de texto) ---

// En vez de concatenar con +, usamos backticks (`) y ${} para
// insertar variables dentro del texto. Es más limpio y legible.

const categoria = "postres";
const calificacion = 4.8;

// Forma antigua (concatenación con +):
console.log("\n" + nombre + " — " + categoria + " — " + calificacion + "★");

// Forma moderna (template literal):
console.log(`${nombre} — ${categoria} — ${calificacion}★`);

// Ambas producen: Tarta de chocolate — postres — 4.8★

// Dentro de ${} puedes poner cualquier expresión:
console.log(`Tiempo en horas: ${tiempo / 60}`);
// Salida: Tiempo en horas: 1

// --- Conversión de tipos ---

// A veces necesitas convertir un dato de un tipo a otro.

console.log("\n--- Conversión de tipos ---");

// String a número
const textoTiempo = "45";
const numeroTiempo = Number(textoTiempo);
console.log(typeof textoTiempo, "→", typeof numeroTiempo);
// Salida: string → number

// También puedes usar parseInt y parseFloat
const entero = parseInt("30");
const decimal = parseFloat("4.5");
console.log("Entero:", entero);   // 30
console.log("Decimal:", decimal); // 4.5

// Número a string
const numeroPorciones = 6;
const textoPorciones = String(numeroPorciones);
console.log(typeof numeroPorciones, "→", typeof textoPorciones);
// Salida: number → string

// Cuidado con la conversión automática (coerción):
console.log("5" + 3);  // "53" (concatena como texto)
console.log("5" - 3);  // 2    (resta como número)
// Esto puede causar errores difíciles de encontrar.
// Por eso es importante convertir explícitamente.

// --- Métodos de strings ---

// Los strings tienen métodos integrados para manipular texto.

const receta = "  Cheesecake de Frutos Rojos  ";

console.log("\n--- Métodos de strings ---");

// Longitud del texto
console.log(receta.length); // 30 (incluye los espacios)

// Mayúsculas y minúsculas
console.log(receta.toUpperCase()); // "  CHEESECAKE DE FRUTOS ROJOS  "
console.log(receta.toLowerCase()); // "  cheesecake de frutos rojos  "

// Quitar espacios al inicio y final
console.log(receta.trim()); // "Cheesecake de Frutos Rojos"

// Buscar dentro del texto
console.log(receta.includes("Frutos"));  // true
console.log(receta.includes("Limón"));   // false

// Posición de un texto (devuelve -1 si no lo encuentra)
console.log(receta.trim().indexOf("Frutos")); // 14

// Extraer una porción del texto
console.log(receta.trim().slice(0, 10)); // "Cheesecake"

// Reemplazar texto
console.log(receta.trim().replace("Frutos Rojos", "Limón"));
// Salida: Cheesecake de Limón

// Dividir texto en un array
const ingredientes = "harina, azúcar, queso crema";
const lista = ingredientes.split(", ");
console.log(lista); // [ 'harina', 'azúcar', 'queso crema' ]

// Comprobar inicio y final
const titulo = "Café con leche espumosa";
console.log(titulo.startsWith("Café"));    // true
console.log(titulo.endsWith("espumosa"));  // true

// ============================================================
// EJERCICIO
// ============================================================
// Crea variables para una receta con los siguientes datos:
//   - nombre: "Galletas de avena" (const)
//   - tiempo: 30 (const)
//   - porciones: 12 (let)
//   - dificultad: "fácil" (const)
//   - sinGluten: false (const)
//
// 1. Muestra todos los datos usando template literals
// 2. Cambia las porciones a 24 (doble receta) y muestra el
//    nuevo valor
// 3. Usa métodos de strings para:
//    - Mostrar el nombre en mayúsculas
//    - Comprobar si el nombre incluye "avena"
//    - Extraer solo "Galletas" del nombre
// ============================================================
