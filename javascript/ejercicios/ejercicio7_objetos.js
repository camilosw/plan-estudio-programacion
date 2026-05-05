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
// Crea un objeto "pelicula" con estas propiedades:
//   titulo, director, genero, anio, duracionMinutos,
//   calificacion, disponible
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
// 2. Agrega la propiedad "idioma" con valor "inglés"
// 3. Agrega la propiedad "premiosOscar" con valor 3
// 4. Elimina la propiedad "disponible"
// 5. Muestra el objeto actualizado
//
// Salida esperada:
//   Calificación actualizada: 9.3
//   Idioma: inglés
//   Premios Oscar: 3
//   ¿Tiene 'disponible'? false

// Tu código aquí:



// --- Parte 3: Métodos ---
// Agrega estos métodos al objeto:
//   - esClasica(): devuelve true si el año es anterior a 1980
//   - mostrarFicha(): muestra los datos formateados usando this
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
//
// Salida esperada:
//   Propiedades: 7
//   Nombres: [ 'titulo', 'director', ... ]
//   Valores: [ 'El Padrino', 'Francis Ford Coppola', ... ]

// Tu código aquí:



// --- Parte 5: Objetos anidados ---
// Crea un objeto "peliculaCompleta" que tenga:
//   - titulo, anio, calificacion
//   - director como objeto anidado: { nombre, nacionalidad }
//   - reparto como array: ["Actor 1", "Actor 2", "Actor 3"]
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
const pelicula = {
    titulo: "El Padrino",
    director: "Francis Ford Coppola",
    genero: "drama",
    anio: 1972,
    duracionMinutos: 175,
    calificacion: 9.2,
    disponible: true
};

console.log(`Título: ${pelicula.titulo}`);
console.log(`Director: ${pelicula.director}`);
console.log(`Género: ${pelicula.genero}`);
console.log(`Año: ${pelicula.anio}`);
console.log(`Duración: ${pelicula.duracionMinutos} min`);
console.log(`Calificación: ${pelicula.calificacion}/10`);
console.log(`Disponible: ${pelicula.disponible}`);

// Parte 2
pelicula.calificacion = 9.3;
pelicula.idioma = "inglés";
pelicula.premiosOscar = 3;
delete pelicula.disponible;
console.log(`\nCalificación actualizada: ${pelicula.calificacion}`);
console.log(`Idioma: ${pelicula.idioma}`);
console.log(`Premios Oscar: ${pelicula.premiosOscar}`);
console.log(`¿Tiene 'disponible'? ${"disponible" in pelicula}`);

// Parte 3
pelicula.esClasica = function() {
    return this.anio < 1980;
};

pelicula.mostrarFicha = function() {
    console.log("--- Ficha ---");
    console.log(`${this.titulo} (${this.anio})`);
    console.log(`Director: ${this.director}`);
    console.log(`Género: ${this.genero} | ${this.duracionMinutos} min | ${this.calificacion}/10`);
};

console.log(`\n¿Es clásica? ${pelicula.esClasica()}`);
pelicula.mostrarFicha();

// Parte 4
console.log(`\nPropiedades: ${Object.keys(pelicula).length}`);
console.log("Nombres:", Object.keys(pelicula));
console.log("Valores:", Object.values(pelicula));

// Parte 5
const peliculaCompleta = {
    titulo: "El Padrino",
    anio: 1972,
    calificacion: 9.2,
    director: {
        nombre: "Francis Ford Coppola",
        nacionalidad: "estadounidense"
    },
    reparto: ["Marlon Brando", "Robert Duvall", "Al Pacino"]
};

console.log(`\nDirector: ${peliculaCompleta.director.nombre} (${peliculaCompleta.director.nacionalidad})`);
console.log(`Segundo actor: ${peliculaCompleta.reparto[1]}`);

// Parte 6
const copia = { ...pelicula };
copia.titulo = "El Padrino II";
copia.anio = 1974;
console.log(`\nOriginal: ${pelicula.titulo} (${pelicula.anio})`);
console.log(`Copia: ${copia.titulo} (${copia.anio})`);
*/
