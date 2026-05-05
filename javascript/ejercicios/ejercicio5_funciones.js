// ============================================================
// EJERCICIO 5: Funciones
// ============================================================
// Dominio: Videoclub
//
// OBJETIVO: Practicar declaración de funciones, arrow
// functions, parámetros por defecto y return.
//
// EJECUCIÓN:
//   node ejercicios/ejercicio5_funciones.js
// ============================================================

// --- Parte 1: Función de formato ---
// Crea una función "formatearPelicula" que reciba título,
// año y duración, y DEVUELVA un string formateado.
// La duración debe mostrar horas y minutos.
//
// formatearPelicula("Inception", 2010, 148)
// → "Inception (2010) — 2h 28min"
//
// formatearPelicula("Toy Story", 1995, 81)
// → "Toy Story (1995) — 1h 21min"
//
// Salida esperada:
//   Inception (2010) — 2h 28min
//   Toy Story (1995) — 1h 21min

// Tu código aquí:



// --- Parte 2: Arrow function de clasificación ---
// Crea una arrow function "clasificarPelicula" que reciba
// una calificación y devuelva:
//   >= 9.0: "imprescindible"
//   >= 8.0: "muy buena"
//   >= 7.0: "buena"
//   < 7.0: "regular"
//
// Salida esperada:
//   9.2 → imprescindible
//   8.5 → muy buena
//   7.3 → buena
//   6.1 → regular

// Tu código aquí:



// --- Parte 3: Parámetros por defecto ---
// Crea una función "calcularAlquiler" que reciba:
//   - precioBase (número)
//   - dias (número, por defecto 1)
//   - esSocio (boolean, por defecto false)
// Si es socio, aplica 15% de descuento.
// Devuelve el precio total.
//
// calcularAlquiler(3.50)          → 3.50
// calcularAlquiler(3.50, 3)       → 10.50
// calcularAlquiler(3.50, 3, true) → 8.93 (con descuento)
//
// Salida esperada:
//   1 día, no socio: $3.50
//   3 días, no socio: $10.50
//   3 días, socio: $8.93

// Tu código aquí:



// --- Parte 4: Función que busca ---
// Crea una función "buscarPelicula" que reciba un array de
// títulos y un texto de búsqueda. Devuelve el primer título
// que contenga el texto (sin importar mayúsculas/minúsculas),
// o "No encontrada" si no hay coincidencia.
//
// Salida esperada:
//   Buscar "futuro": Volver al Futuro
//   Buscar "toy": Toy Story
//   Buscar "avatar": No encontrada

// Tu código aquí:

const titulos = ["El Padrino", "Volver al Futuro", "Toy Story", "Inception", "Coco"];



// --- Parte 5: Función que recibe función ---
// Crea una función "aplicarATodas" que reciba un array de
// calificaciones y una función de transformación. Debe
// devolver un nuevo array con la función aplicada a cada
// calificación.
//
// Usa aplicarATodas con:
//   a) Una función que redondee hacia abajo (Math.floor)
//   b) Una arrow function que convierta de escala /10 a /5
//
// Salida esperada:
//   Original: [ 9.2, 8.5, 8.3, 8.0 ]
//   Redondeadas: [ 9, 8, 8, 8 ]
//   Sobre 5: [ 4.6, 4.25, 4.15, 4 ]

// Tu código aquí:

const calificaciones = [9.2, 8.5, 8.3, 8.0];



// ============================================================
// SOLUCIÓN
// ============================================================
/*
// Parte 1
function formatearPelicula(titulo, anio, duracion) {
    const horas = Math.floor(duracion / 60);
    const minutos = duracion % 60;
    return `${titulo} (${anio}) — ${horas}h ${minutos}min`;
}
console.log(formatearPelicula("Inception", 2010, 148));
console.log(formatearPelicula("Toy Story", 1995, 81));

// Parte 2
const clasificarPelicula = (calificacion) => {
    if (calificacion >= 9.0) return "imprescindible";
    if (calificacion >= 8.0) return "muy buena";
    if (calificacion >= 7.0) return "buena";
    return "regular";
};
console.log(`\n9.2 → ${clasificarPelicula(9.2)}`);
console.log(`8.5 → ${clasificarPelicula(8.5)}`);
console.log(`7.3 → ${clasificarPelicula(7.3)}`);
console.log(`6.1 → ${clasificarPelicula(6.1)}`);

// Parte 3
function calcularAlquiler(precioBase, dias = 1, esSocio = false) {
    let total = precioBase * dias;
    if (esSocio) {
        total = total * 0.85;
    }
    return Math.round(total * 100) / 100;
}
console.log(`\n1 día, no socio: $${calcularAlquiler(3.50).toFixed(2)}`);
console.log(`3 días, no socio: $${calcularAlquiler(3.50, 3).toFixed(2)}`);
console.log(`3 días, socio: $${calcularAlquiler(3.50, 3, true).toFixed(2)}`);

// Parte 4
function buscarPelicula(peliculas, texto) {
    for (const titulo of peliculas) {
        if (titulo.toLowerCase().includes(texto.toLowerCase())) {
            return titulo;
        }
    }
    return "No encontrada";
}
console.log(`\nBuscar "futuro": ${buscarPelicula(titulos, "futuro")}`);
console.log(`Buscar "toy": ${buscarPelicula(titulos, "toy")}`);
console.log(`Buscar "avatar": ${buscarPelicula(titulos, "avatar")}`);

// Parte 5
function aplicarATodas(array, transformacion) {
    const resultado = [];
    for (const valor of array) {
        resultado.push(transformacion(valor));
    }
    return resultado;
}
console.log(`\nOriginal:`, calificaciones);
console.log("Redondeadas:", aplicarATodas(calificaciones, Math.floor));
console.log("Sobre 5:", aplicarATodas(calificaciones, c => c / 2));
*/
