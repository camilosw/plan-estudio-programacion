// ============================================================
// EJERCICIO 15: Proyecto integrador — Videoclub Sandra
// ============================================================
// Dominio: Videoclub
//
// OBJETIVO: Construir un sistema completo de gestión de
// videoclub usando todos los conceptos aprendidos.
//
// EJECUCIÓN:
//   node ejercicios/ejercicio15_proyecto_integrador.js
// ============================================================

// ============================================================
// PASO 1: Clase Movie
// ============================================================
// Crea una clase "Movie" con:
//   - constructor: title, director, genre, year, duration, rating
//   - propiedad privada #rating (getter + setter con validación 1-10)
//   - propiedad "available" inicializada en true
//   - propiedad "addedAt" inicializada con new Date()
//   - getter "formattedDuration" que devuelva "Xh Ymin"
//   - getter "isClassic" que devuelva true si year < 1980
//   - método "show()" que imprima los datos formateados

// Tu código aquí:



// ============================================================
// PASO 2: Clase AnimatedMovie (herencia)
// ============================================================
// Crea una clase "AnimatedMovie" que extienda Movie:
//   - constructor adicional: studio
//   - sobreescribe "show()" para incluir el estudio

// Tu código aquí:



// ============================================================
// PASO 3: Clase VideoClub
// ============================================================
// Crea una clase "VideoClub" con:
//   - constructor: name
//   - propiedad privada #movies (array vacío)
//   - método "add(movie)"
//   - método "find(title)" — usa find
//   - método "getAvailable()" — usa filter
//   - método "getByGenre(genre)" — usa filter
//   - método "rent(title)" — cambia available a false, devuelve boolean
//   - método "returnMovie(title)" — cambia available a true
//   - método "getTopMovies(n)" — sort + slice
//   - método "getSummaryByGenre()" — usa reduce
//   - método "getTotalDuration()" — usa reduce sobre disponibles
//   - método "showCatalog()" — usa forEach con desestructuración

// Tu código aquí:



// ============================================================
// PASO 4: Función async para cargar catálogo
// ============================================================
// Crea una función "loadCatalog()" que devuelva una promesa.
// Después de 500ms, resuelve con un array de datos de películas.
// Incluye al menos 6 películas (mezcla Movie y AnimatedMovie).

// Tu código aquí:



// ============================================================
// PASO 5: Función async "startVideoClub"
// ============================================================
// Crea una función async que:
//   1. Muestre un encabezado decorado
//   2. Cargue el catálogo con await
//   3. Cree instancias y las agregue al videoclub
//   4. Muestre el catálogo completo
//   5. Busque una película y la muestre
//   6. Muestre películas de un género
//   7. Alquile una película y verifique
//   8. Devuelva la película y verifique
//   9. Muestre el top 3
//  10. Muestre resumen por género
//  11. Muestre duración total
//  12. Muestre la fecha del reporte

// Tu código aquí:



// ============================================================
// PASO 6: Ejecutar
// ============================================================

// Tu código aquí:



// ============================================================
// SOLUCIÓN
// ============================================================
/*
// PASO 1
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
        this.addedAt = new Date();
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

    get isClassic() {
        return this.year < 1980;
    }

    show() {
        const status = this.available ? "✓" : "✗";
        const classic = this.isClassic ? " [Clásica]" : "";
        console.log(`  ${status} ${this.title} (${this.year})${classic}`);
        console.log(`    ${this.genre} | ${this.director} | ${this.formattedDuration} | ${this.#rating}★`);
    }
}

// PASO 2
class AnimatedMovie extends Movie {
    constructor(title, director, year, duration, rating, studio) {
        super(title, director, "animación", year, duration, rating);
        this.studio = studio;
    }

    show() {
        super.show();
        console.log(`    Estudio: ${this.studio}`);
    }
}

// PASO 3
class VideoClub {
    #movies;

    constructor(name) {
        this.name = name;
        this.#movies = [];
    }

    add(movie) {
        this.#movies.push(movie);
    }

    find(title) {
        return this.#movies.find(m =>
            m.title.toLowerCase().includes(title.toLowerCase())
        ) || null;
    }

    getAvailable() {
        return this.#movies.filter(m => m.available);
    }

    getByGenre(genre) {
        return this.#movies.filter(m => m.genre === genre);
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

    getTopMovies(n = 3) {
        return [...this.#movies]
            .sort((a, b) => b.rating - a.rating)
            .slice(0, n);
    }

    getSummaryByGenre() {
        return this.#movies.reduce((result, m) => {
            result[m.genre] = (result[m.genre] || 0) + 1;
            return result;
        }, {});
    }

    getTotalDuration() {
        return this.getAvailable()
            .reduce((total, m) => total + m.duration, 0);
    }

    showCatalog() {
        console.log(`\n  Catálogo: ${this.#movies.length} películas`);
        console.log("  " + "─".repeat(40));
        this.#movies.forEach(m => {
            m.show();
            console.log("");
        });
    }
}

// PASO 4
function loadCatalog() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { title: "El Padrino", director: "Coppola", genre: "drama", year: 1972, duration: 175, rating: 9.2 },
                { title: "Volver al Futuro", director: "Zemeckis", genre: "ciencia ficción", year: 1985, duration: 116, rating: 8.5 },
                { title: "Toy Story", director: "Lasseter", genre: "animación", year: 1995, duration: 81, rating: 8.3, studio: "Pixar" },
                { title: "Inception", director: "Nolan", genre: "ciencia ficción", year: 2010, duration: 148, rating: 8.8 },
                { title: "Coco", director: "Unkrich", genre: "animación", year: 2017, duration: 105, rating: 8.4, studio: "Pixar" },
                { title: "Mi vecino Totoro", director: "Miyazaki", genre: "animación", year: 1988, duration: 86, rating: 8.2, studio: "Ghibli" },
                { title: "El Secreto de sus Ojos", director: "Campanella", genre: "drama", year: 2009, duration: 129, rating: 8.0 },
                { title: "Matar a un ruiseñor", director: "Mulligan", genre: "drama", year: 1962, duration: 129, rating: 8.3 }
            ]);
        }, 500);
    });
}

// PASO 5
async function startVideoClub() {
    console.log("╔════════════════════════════════════════╗");
    console.log("║        VIDEOCLUB SANDRA                ║");
    console.log("║        Sistema de gestión              ║");
    console.log("╚════════════════════════════════════════╝");

    console.log("\n  Cargando catálogo...");
    const data = await loadCatalog();
    const club = new VideoClub("Videoclub Sandra");

    data.forEach(({ title, director, genre, year, duration, rating, studio }) => {
        if (studio) {
            club.add(new AnimatedMovie(title, director, year, duration, rating, studio));
        } else {
            club.add(new Movie(title, director, genre, year, duration, rating));
        }
    });

    console.log(`  ¡${data.length} películas cargadas!`);

    console.log("\n📋 CATÁLOGO COMPLETO");
    console.log("═".repeat(45));
    club.showCatalog();

    console.log("🔍 BUSCAR: 'Inception'");
    console.log("─".repeat(45));
    const found = club.find("Inception");
    if (found) found.show();

    console.log("\n🎨 PELÍCULAS DE ANIMACIÓN");
    console.log("─".repeat(45));
    club.getByGenre("animación").forEach(m => {
        console.log(`  - ${m.title} (${m.year})`);
    });

    console.log("\n📀 ALQUILAR 'El Padrino'");
    console.log("─".repeat(45));
    const success = club.rent("El Padrino");
    console.log(`  Resultado: ${success ? "✓ Alquilada" : "✗ No disponible"}`);
    console.log(`  Disponibles ahora: ${club.getAvailable().length}`);

    console.log("\n📥 DEVOLVER 'El Padrino'");
    console.log("─".repeat(45));
    club.returnMovie("El Padrino");
    console.log(`  Disponibles ahora: ${club.getAvailable().length}`);

    console.log("\n🏆 TOP 3 PELÍCULAS");
    console.log("─".repeat(45));
    club.getTopMovies(3).forEach((m, i) => {
        console.log(`  ${i + 1}. ${m.title} — ${m.rating}★`);
    });

    console.log("\n📊 RESUMEN POR GÉNERO");
    console.log("─".repeat(45));
    const summary = club.getSummaryByGenre();
    for (const [genre, count] of Object.entries(summary)) {
        console.log(`  ${genre}: ${count} películas`);
    }

    console.log("\n⏱  DURACIÓN TOTAL DISPONIBLES");
    console.log("─".repeat(45));
    const totalMin = club.getTotalDuration();
    const hours = Math.floor(totalMin / 60);
    const minutes = totalMin % 60;
    console.log(`  ${totalMin} minutos (${hours}h ${minutes}min)`);

    const now = new Date();
    const formattedDate = now.toLocaleDateString("es-ES", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });
    console.log("\n═══════════════════════════════════════════");
    console.log(`  Reporte generado: ${formattedDate}`);
    console.log("  ¡Gracias por usar Videoclub Sandra!");
    console.log("═══════════════════════════════════════════");
}

// PASO 6
startVideoClub();
*/
