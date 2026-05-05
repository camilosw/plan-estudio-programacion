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

// --- Parte 1: Clase Pelicula ---
// Crea una clase "Pelicula" con:
//   - constructor: titulo, director, genero, anio, duracion, calificacion
//   - propiedad "disponible" inicializada en true
//   - método "mostrar" que imprima los datos formateados
//   - método "esClasica" que devuelva true si anio < 1980
//
// Crea 2 instancias y llama a mostrar() y esClasica() en cada una.
//
// Salida esperada:
//   El Padrino (1972) — drama
//     Director: Coppola | 175 min | 9.2★ | Disponible
//   ¿Es clásica? true
//
//   Coco (2017) — animación
//     Director: Unkrich | 105 min | 8.4★ | Disponible
//   ¿Es clásica? false

// Tu código aquí:



// --- Parte 2: Getters y setters ---
// Agrega a la clase Pelicula (o crea una nueva):
//   - propiedad privada #calificacion
//   - getter "calificacion" que devuelva el valor
//   - setter "calificacion" que valide entre 1 y 10
//   - getter "duracionFormateada" que devuelva "Xh Ymin"
//
// Salida esperada:
//   Calificación: 9.2
//   Duración: 2h 55min
//   (intentar poner 11): Error: la calificación debe ser entre 1 y 10

// Tu código aquí:



// --- Parte 3: Herencia ---
// Crea una clase "PeliculaAnimada" que extienda Pelicula:
//   - constructor adicional: estudio (string)
//   - sobreescribe "mostrar" para incluir el estudio
//   - método "esDeEstudio" que reciba un nombre y devuelva
//     true si coincide
//
// Crea una instancia y pruébala.
//
// Salida esperada:
//   Toy Story (1995) — animación
//     Director: Lasseter | 81 min | 8.3★ | Disponible
//     Estudio: Pixar
//   ¿Es de Pixar? true
//   ¿Es de Ghibli? false

// Tu código aquí:



// --- Parte 4: Métodos estáticos ---
// Agrega a Pelicula (o crea una nueva clase) un método
// estático "compararPorCalificacion" que reciba dos
// películas y devuelva la de mayor calificación.
//
// Salida esperada:
//   Mejor valorada: El Padrino (9.2★)

// Tu código aquí:



// --- Parte 5: Clase Videoclub ---
// Crea una clase "Videoclub" con:
//   - constructor: nombre, array de películas (vacío por defecto)
//   - método "agregar(pelicula)" que añada al array
//   - método "buscar(titulo)" que devuelva la película o null
//   - método "disponibles()" que devuelva array de disponibles
//   - método "alquilar(titulo)" que cambie disponible a false
//     y devuelva true si tuvo éxito, false si no
//   - método "devolver(titulo)" que cambie disponible a true
//   - método "mostrarCatalogo()" que muestre todas las películas
//
// Crea un videoclub, agrega películas, alquila una, devuélvela.
//
// Salida esperada:
//   === Videoclub Sandra ===
//   (catálogo con todas las películas)
//
//   Alquilar "El Padrino": true
//   Disponibles después: (lista sin El Padrino)
//
//   Devolver "El Padrino": OK
//   Disponibles después: (lista con El Padrino de vuelta)

// Tu código aquí:



// ============================================================
// SOLUCIÓN
// ============================================================
/*
// Parte 1
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

    mostrar() {
        const estado = this.disponible ? "Disponible" : "No disponible";
        console.log(`${this.titulo} (${this.anio}) — ${this.genero}`);
        console.log(`  Director: ${this.director} | ${this.duracionFormateada} | ${this.#calificacion}★ | ${estado}`);
    }

    esClasica() {
        return this.anio < 1980;
    }

    static compararPorCalificacion(peliculaA, peliculaB) {
        return peliculaA.calificacion >= peliculaB.calificacion ? peliculaA : peliculaB;
    }
}

// Parte 1: Instancias
const padrino = new Pelicula("El Padrino", "Coppola", "drama", 1972, 175, 9.2);
const coco = new Pelicula("Coco", "Unkrich", "animación", 2017, 105, 8.4);

padrino.mostrar();
console.log(`¿Es clásica? ${padrino.esClasica()}`);
console.log("");
coco.mostrar();
console.log(`¿Es clásica? ${coco.esClasica()}`);

// Parte 2: Getters y setters
console.log(`\nCalificación: ${padrino.calificacion}`);
console.log(`Duración: ${padrino.duracionFormateada}`);
padrino.calificacion = 11;

// Parte 3: Herencia
class PeliculaAnimada extends Pelicula {
    constructor(titulo, director, anio, duracion, calificacion, estudio) {
        super(titulo, director, "animación", anio, duracion, calificacion);
        this.estudio = estudio;
    }

    mostrar() {
        super.mostrar();
        console.log(`  Estudio: ${this.estudio}`);
    }

    esDeEstudio(nombre) {
        return this.estudio === nombre;
    }
}

console.log("");
const toyStory = new PeliculaAnimada("Toy Story", "Lasseter", 1995, 81, 8.3, "Pixar");
toyStory.mostrar();
console.log(`¿Es de Pixar? ${toyStory.esDeEstudio("Pixar")}`);
console.log(`¿Es de Ghibli? ${toyStory.esDeEstudio("Ghibli")}`);

// Parte 4: Métodos estáticos
const mejor = Pelicula.compararPorCalificacion(padrino, coco);
console.log(`\nMejor valorada: ${mejor.titulo} (${mejor.calificacion}★)`);

// Parte 5: Clase Videoclub
class Videoclub {
    constructor(nombre) {
        this.nombre = nombre;
        this.peliculas = [];
    }

    agregar(pelicula) {
        this.peliculas.push(pelicula);
    }

    buscar(titulo) {
        return this.peliculas.find(p => p.titulo === titulo) || null;
    }

    disponibles() {
        return this.peliculas.filter(p => p.disponible);
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

    mostrarCatalogo() {
        console.log(`\n=== ${this.nombre} ===`);
        this.peliculas.forEach(p => p.mostrar());
    }
}

const miVideoclub = new Videoclub("Videoclub Sandra");
miVideoclub.agregar(padrino);
miVideoclub.agregar(coco);
miVideoclub.agregar(toyStory);
miVideoclub.mostrarCatalogo();

console.log(`\nAlquilar "El Padrino": ${miVideoclub.alquilar("El Padrino")}`);
console.log("Disponibles después:");
miVideoclub.disponibles().forEach(p => console.log(`  - ${p.titulo}`));

miVideoclub.devolver("El Padrino");
console.log("\nDevolver \"El Padrino\": OK");
console.log("Disponibles después:");
miVideoclub.disponibles().forEach(p => console.log(`  - ${p.titulo}`));
*/
