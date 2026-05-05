// ============================================================
// EJERCICIO 15: Proyecto integrador — Videoclub Sandra
// ============================================================
// Dominio: Videoclub
//
// OBJETIVO: Construir un sistema completo de gestión de
// videoclub usando todos los conceptos aprendidos.
//
// Este ejercicio integra:
//   - Variables y tipos (tema 2)
//   - Condicionales (tema 3)
//   - Bucles (tema 4)
//   - Funciones (tema 5)
//   - Arrays y métodos (temas 6, 9, 10)
//   - Objetos (tema 7)
//   - Arrays de objetos (tema 8)
//   - Desestructuración y spread (tema 11)
//   - Clases y herencia (tema 12)
//   - Fechas (tema 13)
//   - Promesas y async/await (tema 14)
//
// EJECUCIÓN:
//   node ejercicios/ejercicio15_proyecto_integrador.js
// ============================================================

// ============================================================
// PASO 1: Clase Pelicula
// ============================================================
// Crea una clase "Pelicula" con:
//   - constructor: titulo, director, genero, anio, duracion, calificacion
//   - propiedad privada #calificacion (getter + setter con validación 1-10)
//   - propiedad "disponible" inicializada en true
//   - propiedad "fechaIngreso" inicializada con new Date()
//   - getter "duracionFormateada" que devuelva "Xh Ymin"
//   - getter "esClasica" que devuelva true si anio < 1980
//   - método "mostrar()" que imprima los datos formateados

// Escribe tu código aquí:



// ============================================================
// PASO 2: Clase PeliculaAnimada (herencia)
// ============================================================
// Crea una clase "PeliculaAnimada" que extienda Pelicula:
//   - constructor adicional: estudio
//   - sobreescribe "mostrar()" para incluir el estudio

// Escribe tu código aquí:



// ============================================================
// PASO 3: Clase Videoclub
// ============================================================
// Crea una clase "Videoclub" con:
//   - constructor: nombre
//   - propiedad privada #peliculas (array vacío)
//   - método "agregar(pelicula)"
//   - método "buscar(titulo)" — usa find
//   - método "disponibles()" — usa filter
//   - método "porGenero(genero)" — usa filter
//   - método "alquilar(titulo)" — cambia disponible a false, devuelve boolean
//   - método "devolver(titulo)" — cambia disponible a true
//   - método "topPeliculas(n)" — sort + slice, las mejores por calificación
//   - método "resumenPorGenero()" — usa reduce, devuelve objeto con conteos
//   - método "duracionTotal()" — usa reduce sobre disponibles
//   - método "mostrarCatalogo()" — muestra todas usando forEach y desestructuración

// Escribe tu código aquí:



// ============================================================
// PASO 4: Función async para cargar catálogo
// ============================================================
// Crea una función "cargarCatalogo()" que devuelva una promesa.
// Después de 500ms, resuelve con un array de datos de películas
// (objetos simples con titulo, director, genero, anio, duracion,
// calificacion, y opcionalmente estudio).
// Incluye al menos 6 películas (mezcla Pelicula y PeliculaAnimada).

// Escribe tu código aquí:



// ============================================================
// PASO 5: Función async "iniciarVideoclub"
// ============================================================
// Crea una función async que:
//   1. Muestre un encabezado decorado
//   2. Cargue el catálogo con await
//   3. Cree instancias de Pelicula/PeliculaAnimada según los datos
//   4. Las agregue al videoclub
//   5. Muestre el catálogo completo
//   6. Busque una película específica y la muestre
//   7. Muestre las películas de un género específico
//   8. Alquile una película y verifique que ya no está disponible
//   9. Devuelva la película y verifique que volvió a estar disponible
//  10. Muestre el top 3 por calificación
//  11. Muestre el resumen por género
//  12. Muestre la duración total de películas disponibles
//  13. Muestre la fecha del reporte formateada en español

// Escribe tu código aquí:



// ============================================================
// PASO 6: Ejecutar
// ============================================================
// Llama a iniciarVideoclub()

// Escribe tu código aquí:



// ============================================================
// SOLUCIÓN
// ============================================================
/*
// PASO 1
class Pelicula {
    #calificacion;

    constructor(titulo, director, genero, anio, duracion, calificacion) {
        this.titulo = titulo;
        this.director = director;
        this.genero = genero;
        this.anio = anio;
        this.duracion = duracion;
        this.#calificacion = calificacion;
        this.disponible = true;
        this.fechaIngreso = new Date();
    }

    get calificacion() {
        return this.#calificacion;
    }

    set calificacion(valor) {
        if (valor < 1 || valor > 10) {
            console.log("  Error: la calificación debe ser entre 1 y 10");
            return;
        }
        this.#calificacion = valor;
    }

    get duracionFormateada() {
        const h = Math.floor(this.duracion / 60);
        const m = this.duracion % 60;
        if (h === 0) return `${m}min`;
        return `${h}h ${m}min`;
    }

    get esClasica() {
        return this.anio < 1980;
    }

    mostrar() {
        const estado = this.disponible ? "✓" : "✗";
        const clasica = this.esClasica ? " [Clásica]" : "";
        console.log(`  ${estado} ${this.titulo} (${this.anio})${clasica}`);
        console.log(`    ${this.genero} | ${this.director} | ${this.duracionFormateada} | ${this.#calificacion}★`);
    }
}

// PASO 2
class PeliculaAnimada extends Pelicula {
    constructor(titulo, director, anio, duracion, calificacion, estudio) {
        super(titulo, director, "animación", anio, duracion, calificacion);
        this.estudio = estudio;
    }

    mostrar() {
        super.mostrar();
        console.log(`    Estudio: ${this.estudio}`);
    }
}

// PASO 3
class Videoclub {
    #peliculas;

    constructor(nombre) {
        this.nombre = nombre;
        this.#peliculas = [];
    }

    agregar(pelicula) {
        this.#peliculas.push(pelicula);
    }

    buscar(titulo) {
        return this.#peliculas.find(p =>
            p.titulo.toLowerCase().includes(titulo.toLowerCase())
        ) || null;
    }

    disponibles() {
        return this.#peliculas.filter(p => p.disponible);
    }

    porGenero(genero) {
        return this.#peliculas.filter(p => p.genero === genero);
    }

    alquilar(titulo) {
        const pelicula = this.buscar(titulo);
        if (pelicula && pelicula.disponible) {
            pelicula.disponible = false;
            return true;
        }
        return false;
    }

    devolver(titulo) {
        const pelicula = this.buscar(titulo);
        if (pelicula) {
            pelicula.disponible = true;
        }
    }

    topPeliculas(n = 3) {
        return [...this.#peliculas]
            .sort((a, b) => b.calificacion - a.calificacion)
            .slice(0, n);
    }

    resumenPorGenero() {
        return this.#peliculas.reduce((res, p) => {
            res[p.genero] = (res[p.genero] || 0) + 1;
            return res;
        }, {});
    }

    duracionTotal() {
        return this.disponibles()
            .reduce((total, p) => total + p.duracion, 0);
    }

    mostrarCatalogo() {
        console.log(`\n  Catálogo: ${this.#peliculas.length} películas`);
        console.log("  " + "─".repeat(40));
        this.#peliculas.forEach(p => {
            p.mostrar();
            console.log("");
        });
    }
}

// PASO 4
function cargarCatalogo() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { titulo: "El Padrino", director: "Coppola", genero: "drama", anio: 1972, duracion: 175, calificacion: 9.2 },
                { titulo: "Volver al Futuro", director: "Zemeckis", genero: "ciencia ficción", anio: 1985, duracion: 116, calificacion: 8.5 },
                { titulo: "Toy Story", director: "Lasseter", genero: "animación", anio: 1995, duracion: 81, calificacion: 8.3, estudio: "Pixar" },
                { titulo: "Inception", director: "Nolan", genero: "ciencia ficción", anio: 2010, duracion: 148, calificacion: 8.8 },
                { titulo: "Coco", director: "Unkrich", genero: "animación", anio: 2017, duracion: 105, calificacion: 8.4, estudio: "Pixar" },
                { titulo: "Mi vecino Totoro", director: "Miyazaki", genero: "animación", anio: 1988, duracion: 86, calificacion: 8.2, estudio: "Ghibli" },
                { titulo: "El Secreto de sus Ojos", director: "Campanella", genero: "drama", anio: 2009, duracion: 129, calificacion: 8.0 },
                { titulo: "Matar a un ruiseñor", director: "Mulligan", genero: "drama", anio: 1962, duracion: 129, calificacion: 8.3 }
            ]);
        }, 500);
    });
}

// PASO 5
async function iniciarVideoclub() {
    console.log("╔════════════════════════════════════════╗");
    console.log("║        VIDEOCLUB SANDRA                ║");
    console.log("║        Sistema de gestión              ║");
    console.log("╚════════════════════════════════════════╝");

    console.log("\n  Cargando catálogo...");
    const datos = await cargarCatalogo();
    const videoclub = new Videoclub("Videoclub Sandra");

    datos.forEach(({ titulo, director, genero, anio, duracion, calificacion, estudio }) => {
        if (estudio) {
            videoclub.agregar(new PeliculaAnimada(titulo, director, anio, duracion, calificacion, estudio));
        } else {
            videoclub.agregar(new Pelicula(titulo, director, genero, anio, duracion, calificacion));
        }
    });

    console.log(`  ¡${datos.length} películas cargadas!`);

    // Catálogo completo
    console.log("\n📋 CATÁLOGO COMPLETO");
    console.log("═".repeat(45));
    videoclub.mostrarCatalogo();

    // Buscar
    console.log("🔍 BUSCAR: 'Inception'");
    console.log("─".repeat(45));
    const encontrada = videoclub.buscar("Inception");
    if (encontrada) encontrada.mostrar();

    // Por género
    console.log("\n🎨 PELÍCULAS DE ANIMACIÓN");
    console.log("─".repeat(45));
    videoclub.porGenero("animación").forEach(p => {
        console.log(`  - ${p.titulo} (${p.anio})`);
    });

    // Alquilar
    console.log("\n📀 ALQUILAR 'El Padrino'");
    console.log("─".repeat(45));
    const exito = videoclub.alquilar("El Padrino");
    console.log(`  Resultado: ${exito ? "✓ Alquilada" : "✗ No disponible"}`);
    console.log(`  Disponibles ahora: ${videoclub.disponibles().length}`);

    // Devolver
    console.log("\n📥 DEVOLVER 'El Padrino'");
    console.log("─".repeat(45));
    videoclub.devolver("El Padrino");
    console.log(`  Disponibles ahora: ${videoclub.disponibles().length}`);

    // Top 3
    console.log("\n🏆 TOP 3 PELÍCULAS");
    console.log("─".repeat(45));
    videoclub.topPeliculas(3).forEach((p, i) => {
        console.log(`  ${i + 1}. ${p.titulo} — ${p.calificacion}★`);
    });

    // Resumen por género
    console.log("\n📊 RESUMEN POR GÉNERO");
    console.log("─".repeat(45));
    const { ...resumen } = videoclub.resumenPorGenero();
    for (const [genero, cantidad] of Object.entries(resumen)) {
        console.log(`  ${genero}: ${cantidad} películas`);
    }

    // Duración total
    console.log("\n⏱  DURACIÓN TOTAL DISPONIBLES");
    console.log("─".repeat(45));
    const totalMin = videoclub.duracionTotal();
    const horas = Math.floor(totalMin / 60);
    const minutos = totalMin % 60;
    console.log(`  ${totalMin} minutos (${horas}h ${minutos}min)`);

    // Fecha del reporte
    const ahora = new Date();
    const fechaFormateada = ahora.toLocaleDateString("es-ES", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });
    console.log("\n═══════════════════════════════════════════");
    console.log(`  Reporte generado: ${fechaFormateada}`);
    console.log("  ¡Gracias por usar Videoclub Sandra!");
    console.log("═══════════════════════════════════════════");
}

// PASO 6
iniciarVideoclub();
*/
