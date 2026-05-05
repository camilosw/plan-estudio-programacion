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
// Crea una función "formatMovie" que reciba título,
// año y duración, y DEVUELVA un string formateado.
// La duración debe mostrar horas y minutos.
//
// formatMovie("Inception", 2010, 148)
// → "Inception (2010) — 2h 28min"
//
// Salida esperada:
//   Inception (2010) — 2h 28min
//   Toy Story (1995) — 1h 21min

// Tu código aquí:



// --- Parte 2: Arrow function de clasificación ---
// Crea una arrow function "classifyMovie" que reciba
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
// Crea una función "calcRental" que reciba:
//   - basePrice (número)
//   - days (número, por defecto 1)
//   - isMember (boolean, por defecto false)
// Si es socio, aplica 15% de descuento.
// Devuelve el precio total.
//
// Salida esperada:
//   1 día, no socio: $3.50
//   3 días, no socio: $10.50
//   3 días, socio: $8.93

// Tu código aquí:



// --- Parte 4: Función que busca ---
// Crea una función "findMovie" que reciba un array de
// títulos y un texto de búsqueda. Devuelve el primer título
// que contenga el texto (sin importar mayúsculas/minúsculas),
// o "No encontrada" si no hay coincidencia.
//
// Salida esperada:
//   Buscar "futuro": Volver al Futuro
//   Buscar "toy": Toy Story
//   Buscar "avatar": No encontrada

// Tu código aquí:

const titles = ["El Padrino", "Volver al Futuro", "Toy Story", "Inception", "Coco"];



// --- Parte 5: Función que recibe función ---
// Crea una función "applyToAll" que reciba un array de
// calificaciones y una función de transformación. Debe
// devolver un nuevo array con la función aplicada a cada
// calificación.
//
// Usa applyToAll con:
//   a) Una función que redondee hacia abajo (Math.floor)
//   b) Una arrow function que convierta de escala /10 a /5
//
// Salida esperada:
//   Original: [ 9.2, 8.5, 8.3, 8.0 ]
//   Redondeadas: [ 9, 8, 8, 8 ]
//   Sobre 5: [ 4.6, 4.25, 4.15, 4 ]

// Tu código aquí:

const ratings = [9.2, 8.5, 8.3, 8.0];



// ============================================================
// SOLUCIÓN
// ============================================================
/*
// Parte 1
function formatMovie(title, year, duration) {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${title} (${year}) — ${hours}h ${minutes}min`;
}
console.log(formatMovie("Inception", 2010, 148));
console.log(formatMovie("Toy Story", 1995, 81));

// Parte 2
const classifyMovie = (rating) => {
    if (rating >= 9.0) return "imprescindible";
    if (rating >= 8.0) return "muy buena";
    if (rating >= 7.0) return "buena";
    return "regular";
};
console.log(`\n9.2 → ${classifyMovie(9.2)}`);
console.log(`8.5 → ${classifyMovie(8.5)}`);
console.log(`7.3 → ${classifyMovie(7.3)}`);
console.log(`6.1 → ${classifyMovie(6.1)}`);

// Parte 3
function calcRental(basePrice, days = 1, isMember = false) {
    let total = basePrice * days;
    if (isMember) {
        total = total * 0.85;
    }
    return Math.round(total * 100) / 100;
}
console.log(`\n1 día, no socio: $${calcRental(3.50).toFixed(2)}`);
console.log(`3 días, no socio: $${calcRental(3.50, 3).toFixed(2)}`);
console.log(`3 días, socio: $${calcRental(3.50, 3, true).toFixed(2)}`);

// Parte 4
function findMovie(movies, searchText) {
    for (const title of movies) {
        if (title.toLowerCase().includes(searchText.toLowerCase())) {
            return title;
        }
    }
    return "No encontrada";
}
console.log(`\nBuscar "futuro": ${findMovie(titles, "futuro")}`);
console.log(`Buscar "toy": ${findMovie(titles, "toy")}`);
console.log(`Buscar "avatar": ${findMovie(titles, "avatar")}`);

// Parte 5
function applyToAll(array, transform) {
    const result = [];
    for (const value of array) {
        result.push(transform(value));
    }
    return result;
}
console.log(`\nOriginal:`, ratings);
console.log("Redondeadas:", applyToAll(ratings, Math.floor));
console.log("Sobre 5:", applyToAll(ratings, r => r / 2));
*/
