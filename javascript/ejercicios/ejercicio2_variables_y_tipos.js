// ============================================================
// EJERCICIO 2: Variables y tipos de datos
// ============================================================
// Dominio: Videoclub
//
// OBJETIVO: Practicar variables, tipos de datos, template
// literals y métodos de strings con datos de películas.
//
// EJECUCIÓN:
//   node ejercicios/ejercicio2_variables_y_tipos.js
// ============================================================

// --- Datos del videoclub (no modificar) ---
const tituloPelicula = "Volver al Futuro";
const director = "  Robert Zemeckis  ";
const anio = 1985;
const duracionMinutos = 116;
const calificacion = 8.5;
const disponible = true;
const secuela = null;

// --- Parte 1: Mostrar datos con template literals ---
// Muestra todos los datos de la película usando template literals.
//
// Salida esperada:
//   Película: Volver al Futuro
//   Director: Robert Zemeckis
//   Año: 1985
//   Duración: 116 minutos (1.93 horas)
//   Calificación: 8.5/10
//   Disponible: true

// Tu código aquí:



// --- Parte 2: typeof ---
// Muestra el tipo de cada variable.
//
// Salida esperada:
//   tituloPelicula: string
//   anio: number
//   disponible: boolean
//   secuela: object

// Tu código aquí:



// --- Parte 3: Conversión de tipos ---
// Convierte la calificación (sobre 10) a una escala sobre 5.
// Convierte el resultado a string.
// Convierte el string "1985" a número y súmale 30.
//
// Salida esperada:
//   Calificación sobre 5: 4.25
//   Tipo: string
//   1985 + 30 = 2015

// Tu código aquí:



// --- Parte 4: Métodos de strings ---
// Usando tituloPelicula y director:
// 1. Muestra el título en mayúsculas
// 2. Muestra el director sin espacios extras (trim)
// 3. ¿El título incluye "Futuro"?
// 4. ¿En qué posición está "al" en el título?
// 5. Extrae solo "Volver" del título (slice)
// 6. Reemplaza "Futuro" por "Pasado" en el título
// 7. Divide el título en palabras (split por " ")
//
// Salida esperada:
//   Mayúsculas: VOLVER AL FUTURO
//   Director limpio: Robert Zemeckis
//   ¿Incluye "Futuro"? true
//   Posición de "al": 7
//   Primeras 6 letras: Volver
//   Reemplazado: Volver al Pasado
//   Palabras: [ 'Volver', 'al', 'Futuro' ]

// Tu código aquí:



// --- Parte 5: Operador ?? ---
// Muestra la secuela o "No tiene secuela" si es null.
//
// Salida esperada:
//   Secuela: No tiene secuela

// Tu código aquí:



// ============================================================
// SOLUCIÓN
// ============================================================
/*
// Parte 1
console.log(`Película: ${tituloPelicula}`);
console.log(`Director: ${director.trim()}`);
console.log(`Año: ${anio}`);
console.log(`Duración: ${duracionMinutos} minutos (${(duracionMinutos / 60).toFixed(2)} horas)`);
console.log(`Calificación: ${calificacion}/10`);
console.log(`Disponible: ${disponible}`);

// Parte 2
console.log(`\ntituloPelicula: ${typeof tituloPelicula}`);
console.log(`anio: ${typeof anio}`);
console.log(`disponible: ${typeof disponible}`);
console.log(`secuela: ${typeof secuela}`);

// Parte 3
const calSobre5 = calificacion / 2;
const calTexto = String(calSobre5);
console.log(`\nCalificación sobre 5: ${calSobre5}`);
console.log(`Tipo: ${typeof calTexto}`);
const anioNumero = Number("1985");
console.log(`1985 + 30 = ${anioNumero + 30}`);

// Parte 4
console.log(`\nMayúsculas: ${tituloPelicula.toUpperCase()}`);
console.log(`Director limpio: ${director.trim()}`);
console.log(`¿Incluye "Futuro"? ${tituloPelicula.includes("Futuro")}`);
console.log(`Posición de "al": ${tituloPelicula.indexOf("al")}`);
console.log(`Primeras 6 letras: ${tituloPelicula.slice(0, 6)}`);
console.log(`Reemplazado: ${tituloPelicula.replace("Futuro", "Pasado")}`);
console.log(`Palabras:`, tituloPelicula.split(" "));

// Parte 5
console.log(`\nSecuela: ${secuela ?? "No tiene secuela"}`);
*/
