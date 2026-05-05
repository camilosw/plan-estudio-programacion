// ============================================================
// EJERCICIO 7: Objetos
// ============================================================
// Dominio: Videoclub
//
// OBJETIVO: Practicar la creación y manipulación de objetos
// con datos de películas.
//
// EJECUCIÓN:
//   node ejercicios/ejercicio7_objetos.js
// ============================================================

// --- Parte 1: Crear un objeto película ---
// Crea un objeto "movie" con estas propiedades:
//   title, director, genre, year, durationMinutes,
//   rating, available
// Usa los datos de "El Padrino".
//
// Muestra cada propiedad con template literals.
//
// Salida esperada:
//   Título: El Padrino
//   Director: Francis Ford Coppola
//   Género: drama
//   Año: 1972
//   Duración: 175 min
//   Calificación: 9.2/10
//   Disponible: true

// Tu código aquí:



// --- Parte 2: Modificar y agregar ---
// 1. Cambia la calificación a 9.3
// 2. Agrega la propiedad "language" con valor "inglés"
// 3. Agrega la propiedad "oscars" con valor 3
// 4. Elimina la propiedad "available"
// 5. Muestra el objeto actualizado

// Tu código aquí:



// --- Parte 3: Métodos ---
// Agrega estos métodos al objeto:
//   - isClassic(): devuelve true si el año es anterior a 1980
//   - showCard(): muestra los datos formateados usando this
//
// Salida esperada:
//   ¿Es clásica? true
//   --- Ficha ---
//   El Padrino (1972)
//   Director: Francis Ford Coppola
//   Género: drama | 175 min | 9.3/10

// Tu código aquí:



// --- Parte 4: Object.keys/values/entries ---
// Muestra:
//   - Cuántas propiedades tiene el objeto
//   - Los nombres de todas las propiedades
//   - Todos los valores

// Tu código aquí:



// --- Parte 5: Objetos anidados ---
// Crea un objeto "detailedMovie" que tenga:
//   - title, year, rating
//   - director como objeto anidado: { name, nationality }
//   - cast como array: ["Actor 1", "Actor 2", "Actor 3"]
//
// Accede al nombre del director y al segundo actor.
//
// Salida esperada:
//   Director: Francis Ford Coppola (estadounidense)
//   Segundo actor: Robert Duvall

// Tu código aquí:



// --- Parte 6: Copia de objetos ---
// Crea una copia del objeto película usando spread (...).
// Modifica la copia: cambia el título a "El Padrino II" y
// el año a 1974. Verifica que el original no cambió.
//
// Salida esperada:
//   Original: El Padrino (1972)
//   Copia: El Padrino II (1974)

// Tu código aquí:



// ============================================================
// SOLUCIÓN
// ============================================================
/*
// Parte 1
const movie = {
    title: "El Padrino",
    director: "Francis Ford Coppola",
    genre: "drama",
    year: 1972,
    durationMinutes: 175,
    rating: 9.2,
    available: true
};

console.log(`Título: ${movie.title}`);
console.log(`Director: ${movie.director}`);
console.log(`Género: ${movie.genre}`);
console.log(`Año: ${movie.year}`);
console.log(`Duración: ${movie.durationMinutes} min`);
console.log(`Calificación: ${movie.rating}/10`);
console.log(`Disponible: ${movie.available}`);

// Parte 2
movie.rating = 9.3;
movie.language = "inglés";
movie.oscars = 3;
delete movie.available;
console.log(`\nCalificación actualizada: ${movie.rating}`);
console.log(`Idioma: ${movie.language}`);
console.log(`Premios Oscar: ${movie.oscars}`);
console.log(`¿Tiene 'available'? ${"available" in movie}`);

// Parte 3
movie.isClassic = function() {
    return this.year < 1980;
};

movie.showCard = function() {
    console.log("--- Ficha ---");
    console.log(`${this.title} (${this.year})`);
    console.log(`Director: ${this.director}`);
    console.log(`Género: ${this.genre} | ${this.durationMinutes} min | ${this.rating}/10`);
};

console.log(`\n¿Es clásica? ${movie.isClassic()}`);
movie.showCard();

// Parte 4
console.log(`\nPropiedades: ${Object.keys(movie).length}`);
console.log("Nombres:", Object.keys(movie));
console.log("Valores:", Object.values(movie));

// Parte 5
const detailedMovie = {
    title: "El Padrino",
    year: 1972,
    rating: 9.2,
    director: {
        name: "Francis Ford Coppola",
        nationality: "estadounidense"
    },
    cast: ["Marlon Brando", "Robert Duvall", "Al Pacino"]
};

console.log(`\nDirector: ${detailedMovie.director.name} (${detailedMovie.director.nationality})`);
console.log(`Segundo actor: ${detailedMovie.cast[1]}`);

// Parte 6
const movieCopy = { ...movie };
movieCopy.title = "El Padrino II";
movieCopy.year = 1974;
console.log(`\nOriginal: ${movie.title} (${movie.year})`);
console.log(`Copia: ${movieCopy.title} (${movieCopy.year})`);
*/
