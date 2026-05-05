// ============================================================
// EJERCICIO 14: Promesas y async/await
// ============================================================
// Dominio: Videoclub
//
// OBJETIVO: Practicar promesas y async/await simulando
// operaciones asíncronas del videoclub.
//
// EJECUCIÓN:
//   node ejercicios/ejercicio14_promesas_y_async_await.js
// ============================================================

// --- Datos del videoclub (no modificar) ---
const catalogo = [
    { titulo: "El Padrino", genero: "drama", calificacion: 9.2, disponible: true },
    { titulo: "Volver al Futuro", genero: "ciencia ficción", calificacion: 8.5, disponible: true },
    { titulo: "Toy Story", genero: "animación", calificacion: 8.3, disponible: true },
    { titulo: "Inception", genero: "ciencia ficción", calificacion: 8.8, disponible: false },
    { titulo: "Coco", genero: "animación", calificacion: 8.4, disponible: true }
];

// --- Parte 1: Crear una promesa ---
// Crea una función "buscarPelicula" que reciba un título y
// devuelva una promesa. Después de 500ms:
//   - Si encuentra la película, resuelve con el objeto
//   - Si no la encuentra, rechaza con un mensaje de error
//
// Prueba con .then/.catch para "Coco" y "Avatar".
//
// Salida esperada:
//   Buscando "Coco"...
//   Encontrada: Coco — animación — 8.4★
//
//   Buscando "Avatar"...
//   Error: No se encontró "Avatar"

// Tu código aquí:



// --- Parte 2: async/await ---
// Crea una función async "mostrarPelicula" que use await
// para buscar una película y mostrar sus datos.
// Maneja errores con try/catch.
//
// Llama a mostrarPelicula con "El Padrino" y con "Matrix".
//
// Salida esperada:
//   --- El Padrino ---
//   Género: drama
//   Calificación: 9.2★
//
//   --- Matrix ---
//   Error: No se encontró "Matrix"

// Tu código aquí:



// --- Parte 3: Simular alquiler ---
// Crea una función "alquilarPelicula" que reciba un título
// y devuelva una promesa. Después de 300ms:
//   - Si la película existe Y está disponible: resuelve con
//     un mensaje de éxito
//   - Si existe pero no está disponible: rechaza con
//     "no está disponible"
//   - Si no existe: rechaza con "no encontrada"
//
// Prueba con async/await para "Toy Story", "Inception" y "Avatar".
//
// Salida esperada:
//   Alquilar "Toy Story": ¡Alquilada con éxito!
//   Alquilar "Inception": Error: Inception no está disponible
//   Alquilar "Avatar": Error: Avatar no encontrada

// Tu código aquí:



// --- Parte 4: Promise.all ---
// Crea una función "verificarDisponibilidad" que reciba un
// título y devuelva una promesa que se resuelve con
// { titulo, disponible } después de 200ms.
//
// Usa Promise.all para verificar "El Padrino", "Inception"
// y "Coco" en paralelo. Muestra los resultados.
//
// Salida esperada:
//   Verificando disponibilidad...
//   El Padrino: ✓ disponible
//   Inception: ✗ no disponible
//   Coco: ✓ disponible

// Tu código aquí:



// --- Parte 5: Flujo completo ---
// Crea una función async "sesionVideoclub" que:
//   1. Busque "Volver al Futuro" (await)
//   2. Si la encuentra y está disponible, la alquile (await)
//   3. Muestre un resumen del alquiler
//
// Salida esperada:
//   1. Buscando película...
//   2. Encontrada: Volver al Futuro
//   3. Alquilando...
//   4. ¡Alquiler completado! Disfruta Volver al Futuro

// Tu código aquí:



// ============================================================
// SOLUCIÓN
// ============================================================
/*
// Parte 1
function buscarPelicula(titulo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const pelicula = catalogo.find(p => p.titulo === titulo);
            if (pelicula) {
                resolve(pelicula);
            } else {
                reject(`No se encontró "${titulo}"`);
            }
        }, 500);
    });
}

buscarPelicula("Coco")
    .then(p => console.log(`Encontrada: ${p.titulo} — ${p.genero} — ${p.calificacion}★`))
    .catch(err => console.log(`Error: ${err}`));

setTimeout(() => {
    buscarPelicula("Avatar")
        .then(p => console.log(`Encontrada: ${p.titulo}`))
        .catch(err => console.log(`Error: ${err}`));
}, 600);

// Parte 2
async function mostrarPelicula(titulo) {
    try {
        const pelicula = await buscarPelicula(titulo);
        console.log(`\n--- ${pelicula.titulo} ---`);
        console.log(`Género: ${pelicula.genero}`);
        console.log(`Calificación: ${pelicula.calificacion}★`);
    } catch (error) {
        console.log(`\n--- ${titulo} ---`);
        console.log(`Error: ${error}`);
    }
}

setTimeout(async () => {
    await mostrarPelicula("El Padrino");
    await mostrarPelicula("Matrix");
}, 1500);

// Parte 3
function alquilarPelicula(titulo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const pelicula = catalogo.find(p => p.titulo === titulo);
            if (!pelicula) {
                reject(`${titulo} no encontrada`);
            } else if (!pelicula.disponible) {
                reject(`${titulo} no está disponible`);
            } else {
                resolve(`¡Alquilada con éxito!`);
            }
        }, 300);
    });
}

setTimeout(async () => {
    console.log("\n--- Alquileres ---");
    const pruebas = ["Toy Story", "Inception", "Avatar"];
    for (const titulo of pruebas) {
        try {
            const resultado = await alquilarPelicula(titulo);
            console.log(`Alquilar "${titulo}": ${resultado}`);
        } catch (error) {
            console.log(`Alquilar "${titulo}": Error: ${error}`);
        }
    }
}, 3000);

// Parte 4
function verificarDisponibilidad(titulo) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const pelicula = catalogo.find(p => p.titulo === titulo);
            resolve({
                titulo,
                disponible: pelicula ? pelicula.disponible : false
            });
        }, 200);
    });
}

setTimeout(async () => {
    console.log("\n--- Verificar disponibilidad ---");
    console.log("Verificando disponibilidad...");
    const resultados = await Promise.all([
        verificarDisponibilidad("El Padrino"),
        verificarDisponibilidad("Inception"),
        verificarDisponibilidad("Coco")
    ]);
    resultados.forEach(({ titulo, disponible }) => {
        const estado = disponible ? "✓ disponible" : "✗ no disponible";
        console.log(`${titulo}: ${estado}`);
    });
}, 5000);

// Parte 5
async function sesionVideoclub() {
    console.log("\n--- Sesión de videoclub ---");
    console.log("1. Buscando película...");

    try {
        const pelicula = await buscarPelicula("Volver al Futuro");
        console.log(`2. Encontrada: ${pelicula.titulo}`);

        if (pelicula.disponible) {
            console.log("3. Alquilando...");
            const resultado = await alquilarPelicula(pelicula.titulo);
            console.log(`4. ¡Alquiler completado! Disfruta ${pelicula.titulo}`);
        } else {
            console.log("3. No está disponible para alquiler");
        }
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}

setTimeout(() => {
    sesionVideoclub();
}, 6500);
*/
