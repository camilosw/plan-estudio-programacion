// ============================================================
// TEMA 12: Clases
// ============================================================
//
// OBJETIVO: Crear plantillas reutilizables para objetos con
// comportamiento compartido.
//
// EXPLICACIÓN:
// En los temas anteriores creamos objetos directamente con
// llaves {}. Pero cuando necesitas crear muchos objetos con
// la misma estructura (muchas recetas, muchos ingredientes),
// una CLASE te da una plantilla reutilizable.
//
// Una clase es como un molde: defines qué propiedades y
// métodos tendrá cada objeto, y luego creas tantos objetos
// como necesites usando ese molde.
//
// EJECUCIÓN:
//   node teoría/tema12_clases.js
// ============================================================

// --- Crear una clase ---

class Receta {
    constructor(nombre, categoria, tiempoMinutos, calificacion) {
        this.nombre = nombre;
        this.categoria = categoria;
        this.tiempoMinutos = tiempoMinutos;
        this.calificacion = calificacion;
        this.disponible = true;
    }
}

// Crear objetos (instancias) de la clase
const cafe = new Receta("Café con leche espumosa", "bebidas", 10, 4.5);
const tarta = new Receta("Tarta de chocolate", "postres", 60, 4.8);

console.log("--- Crear instancias ---");
console.log(cafe);
console.log(tarta);

// --- Métodos ---

// Los métodos son funciones que pertenecen a la clase.
// Se definen directamente en el cuerpo de la clase.

class RecetaConMetodos {
    constructor(nombre, categoria, tiempoMinutos, calificacion) {
        this.nombre = nombre;
        this.categoria = categoria;
        this.tiempoMinutos = tiempoMinutos;
        this.calificacion = calificacion;
        this.disponible = true;
    }

    mostrarResumen() {
        const estado = this.disponible ? "Disponible" : "No disponible";
        console.log(`${this.nombre} — ${this.categoria}`);
        console.log(`  Tiempo: ${this.tiempoMinutos} min | ${this.calificacion}★ | ${estado}`);
    }

    esRapida() {
        return this.tiempoMinutos <= 15;
    }

    esDestacada() {
        return this.calificacion >= 4.5;
    }

    clasificarDificultad() {
        if (this.tiempoMinutos <= 15) return "fácil";
        if (this.tiempoMinutos <= 45) return "media";
        return "difícil";
    }
}

const brownie = new RecetaConMetodos("Brownie con nueces", "postres", 45, 4.6);

console.log("\n--- Métodos ---");
brownie.mostrarResumen();
console.log(`¿Es rápida? ${brownie.esRapida()}`);           // false
console.log(`¿Es destacada? ${brownie.esDestacada()}`);      // true
console.log(`Dificultad: ${brownie.clasificarDificultad()}`); // media

// --- Getters y setters ---

// Los getters permiten acceder a un valor calculado como si
// fuera una propiedad. Los setters permiten validar al
// asignar un valor.

class RecetaCompleta {
    constructor(nombre, categoria, tiempoMinutos, calificacion) {
        this.nombre = nombre;
        this.categoria = categoria;
        this.tiempoMinutos = tiempoMinutos;
        this._calificacion = calificacion;
        this.disponible = true;
    }

    get calificacion() {
        return this._calificacion;
    }

    set calificacion(valor) {
        if (valor < 1 || valor > 5) {
            console.log("Error: la calificación debe ser entre 1 y 5");
            return;
        }
        this._calificacion = valor;
    }

    get tiempoFormateado() {
        const horas = Math.floor(this.tiempoMinutos / 60);
        const minutos = this.tiempoMinutos % 60;
        if (horas === 0) return `${minutos}min`;
        return `${horas}h ${minutos}min`;
    }
}

const cheesecake = new RecetaCompleta("Cheesecake de frutos rojos", "postres", 90, 4.9);

console.log("\n--- Getters y setters ---");
console.log(`Tiempo: ${cheesecake.tiempoFormateado}`); // 1h 30min
console.log(`Calificación: ${cheesecake.calificacion}`); // 4.9

cheesecake.calificacion = 6; // Error: la calificación debe ser entre 1 y 5
cheesecake.calificacion = 5;
console.log(`Nueva calificación: ${cheesecake.calificacion}`); // 5

// --- Herencia con extends y super ---

// Una clase puede extender otra, heredando sus propiedades
// y métodos. La clase hija puede agregar nuevos o modificar
// los existentes.

class RecetaBase {
    constructor(nombre, categoria, tiempoMinutos, calificacion) {
        this.nombre = nombre;
        this.categoria = categoria;
        this.tiempoMinutos = tiempoMinutos;
        this.calificacion = calificacion;
    }

    mostrar() {
        console.log(`${this.nombre} — ${this.categoria} — ${this.calificacion}★`);
    }
}

class RecetaPostre extends RecetaBase {
    constructor(nombre, tiempoMinutos, calificacion, temperaturaCoccion) {
        super(nombre, "postres", tiempoMinutos, calificacion);
        this.temperaturaCoccion = temperaturaCoccion;
    }

    mostrar() {
        super.mostrar();
        console.log(`  Hornear a ${this.temperaturaCoccion}°C`);
    }

    necesitaHorno() {
        return this.temperaturaCoccion > 0;
    }
}

class RecetaBebida extends RecetaBase {
    constructor(nombre, tiempoMinutos, calificacion, esCaliente) {
        super(nombre, "bebidas", tiempoMinutos, calificacion);
        this.esCaliente = esCaliente;
    }

    mostrar() {
        const temp = this.esCaliente ? "caliente" : "fría";
        super.mostrar();
        console.log(`  Bebida ${temp}`);
    }
}

console.log("\n--- Herencia ---");
const tartaHeredada = new RecetaPostre("Tarta de chocolate", 60, 4.8, 180);
tartaHeredada.mostrar();
console.log(`¿Necesita horno? ${tartaHeredada.necesitaHorno()}`);

const chai = new RecetaBebida("Té chai latte", 8, 4.3, true);
chai.mostrar();

// --- Métodos estáticos ---

// Un método estático pertenece a la clase, no a las instancias.
// Se llama directamente en la clase: Clase.metodo()

class RecetaUtil {
    constructor(nombre, tiempoMinutos) {
        this.nombre = nombre;
        this.tiempoMinutos = tiempoMinutos;
    }

    static compararPorTiempo(recetaA, recetaB) {
        return recetaA.tiempoMinutos - recetaB.tiempoMinutos;
    }

    static crearRapida(nombre) {
        return new RecetaUtil(nombre, 10);
    }
}

console.log("\n--- Métodos estáticos ---");
const rapida = RecetaUtil.crearRapida("Tostada con aguacate");
console.log(`${rapida.nombre} — ${rapida.tiempoMinutos} min`);

const recetasUtil = [
    new RecetaUtil("Tarta", 60),
    new RecetaUtil("Café", 10),
    new RecetaUtil("Ensalada", 20)
];
recetasUtil.sort(RecetaUtil.compararPorTiempo);
recetasUtil.forEach(r => console.log(`${r.tiempoMinutos} min — ${r.nombre}`));

// --- Propiedades privadas (#) ---

// Las propiedades que empiezan con # son privadas: solo se
// pueden acceder desde dentro de la clase.

class RecetaConPrivadas {
    #calificacion;
    #vecesPreparada;

    constructor(nombre, calificacion) {
        this.nombre = nombre;
        this.#calificacion = calificacion;
        this.#vecesPreparada = 0;
    }

    preparar() {
        this.#vecesPreparada++;
        console.log(`${this.nombre} preparada (${this.#vecesPreparada} veces)`);
    }

    get calificacion() {
        return this.#calificacion;
    }

    get vecesPreparada() {
        return this.#vecesPreparada;
    }
}

console.log("\n--- Propiedades privadas ---");
const galletasPriv = new RecetaConPrivadas("Galletas de avena", 4.0);
galletasPriv.preparar();
galletasPriv.preparar();
console.log(`Calificación: ${galletasPriv.calificacion}`);
console.log(`Veces preparada: ${galletasPriv.vecesPreparada}`);

// Esto daría error:
// console.log(galletasPriv.#calificacion); // SyntaxError

// ============================================================
// EJERCICIO
// ============================================================
// 1. Crea una clase "Ingrediente" con:
//    - constructor: nombre, cantidad, unidad
//    - método "mostrar" que imprima "cantidad unidad de nombre"
//      (ej: "500 gramos de harina")
//
// 2. Crea una clase "RecetaCafeteria" con:
//    - constructor: nombre, categoria, tiempoMinutos
//    - propiedad privada #calificacion (con getter y setter
//      que valide entre 1 y 5)
//    - un array de ingredientes (Ingrediente)
//    - método "agregarIngrediente" que reciba un Ingrediente
//    - método "mostrarReceta" que muestre nombre, categoría,
//      tiempo y todos los ingredientes
//
// 3. Crea una clase "RecetaEspecial" que extienda
//    RecetaCafeteria y agregue una propiedad "ocasion"
//    (cumpleaños, navidad, etc.) y sobreescriba mostrarReceta
//    para incluir la ocasión
// ============================================================
