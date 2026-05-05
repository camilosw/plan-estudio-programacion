// ============================================================
// EJERCICIO 12: Clases
// ============================================================
// Dominio: Videoclub
//
// OBJETIVO: Practicar clases, herencia, métodos estáticos y
// propiedades privadas con el dominio del videoclub.
//
// EJECUCIÓN:
//   node ejercicios/ejercicio12_clases.js
// ============================================================

// --- Parte 1: Clase Movie ---
// Crea una clase "Movie" con:
//   - constructor: title, director, genre, year, duration, rating
//   - propiedad "available" inicializada en true
//   - método "show" que imprima los datos formateados
//   - método "isClassic" que devuelva true si year < 1980
//
// Crea 2 instancias y pruébalas.

// Tu código aquí:



// --- Parte 2: Getters y setters ---
// Agrega a Movie (o crea una nueva):
//   - propiedad privada #rating
//   - getter "rating"
//   - setter "rating" que valide entre 1 y 10
//   - getter "formattedDuration" que devuelva "Xh Ymin"

// Tu código aquí:



// --- Parte 3: Herencia ---
// Crea una clase "AnimatedMovie" que extienda Movie:
//   - constructor adicional: studio (string)
//   - sobreescribe "show" para incluir el estudio
//   - método "isFromStudio(name)" que devuelva true si coincide

// Tu código aquí:



// --- Parte 4: Métodos estáticos ---
// Agrega un método estático "compareByRating" que reciba
// dos películas y devuelva la de mayor calificación.

// Tu código aquí:



// --- Parte 5: Clase VideoClub ---
// Crea una clase "VideoClub" con:
//   - constructor: name, array de películas (vacío por defecto)
//   - método "add(movie)"
//   - método "find(title)" → película o null
//   - método "getAvailable()" → array de disponibles
//   - método "rent(title)" → cambia available a false, devuelve boolean
//   - método "returnMovie(title)" → cambia available a true
//   - método "showCatalog()"
//
// Crea un videoclub, agrega películas, alquila una, devuélvela.

// Tu código aquí:



// ============================================================
// SOLUCIÓN
// ============================================================
/*
// Parte 1
class Movie {
    #rating;

    constructor(title, director, genre, year, duration, rating) {
        this.title = title;
        this.director = director;
        this.genre = genre;
        this.year = year;
        this.duration = duration;
        this.#rating = rating;
        this.available = true;
    }

    get rating() {
        return this.#rating;
    }

    set rating(value) {
        if (value < 1 || value > 10) {
            console.log("  Error: la calificación debe ser entre 1 y 10");
            return;
        }
        this.#rating = value;
    }

    get formattedDuration() {
        const h = Math.floor(this.duration / 60);
        const m = this.duration % 60;
        if (h === 0) return `${m}min`;
        return `${h}h ${m}min`;
    }

    show() {
        const status = this.available ? "Disponible" : "No disponible";
        console.log(`${this.title} (${this.year}) — ${this.genre}`);
        console.log(`  Director: ${this.director} | ${this.formattedDuration} | ${this.#rating}★ | ${status}`);
    }

    isClassic() {
        return this.year < 1980;
    }

    static compareByRating(movieA, movieB) {
        return movieA.rating >= movieB.rating ? movieA : movieB;
    }
}

const godfather = new Movie("El Padrino", "Coppola", "drama", 1972, 175, 9.2);
const coco = new Movie("Coco", "Unkrich", "animación", 2017, 105, 8.4);

godfather.show();
console.log(`¿Es clásica? ${godfather.isClassic()}`);
console.log("");
coco.show();
console.log(`¿Es clásica? ${coco.isClassic()}`);

// Parte 2
console.log(`\nCalificación: ${godfather.rating}`);
console.log(`Duración: ${godfather.formattedDuration}`);
godfather.rating = 11;

// Parte 3
class AnimatedMovie extends Movie {
    constructor(title, director, year, duration, rating, studio) {
        super(title, director, "animación", year, duration, rating);
        this.studio = studio;
    }

    show() {
        super.show();
        console.log(`  Estudio: ${this.studio}`);
    }

    isFromStudio(name) {
        return this.studio === name;
    }
}

console.log("");
const toyStory = new AnimatedMovie("Toy Story", "Lasseter", 1995, 81, 8.3, "Pixar");
toyStory.show();
console.log(`¿Es de Pixar? ${toyStory.isFromStudio("Pixar")}`);
console.log(`¿Es de Ghibli? ${toyStory.isFromStudio("Ghibli")}`);

// Parte 4
const best = Movie.compareByRating(godfather, coco);
console.log(`\nMejor valorada: ${best.title} (${best.rating}★)`);

// Parte 5
class VideoClub {
    constructor(name) {
        this.name = name;
        this.movies = [];
    }

    add(movie) {
        this.movies.push(movie);
    }

    find(title) {
        return this.movies.find(m => m.title === title) || null;
    }

    getAvailable() {
        return this.movies.filter(m => m.available);
    }

    rent(title) {
        const movie = this.find(title);
        if (movie && movie.available) {
            movie.available = false;
            return true;
        }
        return false;
    }

    returnMovie(title) {
        const movie = this.find(title);
        if (movie) {
            movie.available = true;
        }
    }

    showCatalog() {
        console.log(`\n=== ${this.name} ===`);
        this.movies.forEach(m => m.show());
    }
}

const myClub = new VideoClub("Videoclub Sandra");
myClub.add(godfather);
myClub.add(coco);
myClub.add(toyStory);
myClub.showCatalog();

console.log(`\nAlquilar "El Padrino": ${myClub.rent("El Padrino")}`);
console.log("Disponibles después:");
myClub.getAvailable().forEach(m => console.log(`  - ${m.title}`));

myClub.returnMovie("El Padrino");
console.log("\nDevolver \"El Padrino\": OK");
console.log("Disponibles después:");
myClub.getAvailable().forEach(m => console.log(`  - ${m.title}`));
*/
