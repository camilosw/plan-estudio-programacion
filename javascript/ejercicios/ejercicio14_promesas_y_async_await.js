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
const catalog = [
    { title: "El Padrino", genre: "drama", rating: 9.2, available: true },
    { title: "Volver al Futuro", genre: "ciencia ficción", rating: 8.5, available: true },
    { title: "Toy Story", genre: "animación", rating: 8.3, available: true },
    { title: "Inception", genre: "ciencia ficción", rating: 8.8, available: false },
    { title: "Coco", genre: "animación", rating: 8.4, available: true }
];

// --- Parte 1: Crear una promesa ---
// Crea una función "findMovie" que reciba un título y
// devuelva una promesa. Después de 500ms:
//   - Si encuentra la película, resuelve con el objeto
//   - Si no la encuentra, rechaza con un mensaje de error
//
// Prueba con .then/.catch para "Coco" y "Avatar".

// Tu código aquí:



// --- Parte 2: async/await ---
// Crea una función async "showMovie" que use await
// para buscar una película y mostrar sus datos.
// Maneja errores con try/catch.

// Tu código aquí:



// --- Parte 3: Simular alquiler ---
// Crea una función "rentMovie" que reciba un título
// y devuelva una promesa. Después de 300ms:
//   - Si existe Y está disponible: resuelve
//   - Si existe pero no disponible: rechaza
//   - Si no existe: rechaza
//
// Prueba con "Toy Story", "Inception" y "Avatar".

// Tu código aquí:



// --- Parte 4: Promise.all ---
// Crea "checkAvailability" que reciba un título y devuelva
// una promesa que se resuelve con { title, available }.
// Usa Promise.all para verificar 3 películas en paralelo.

// Tu código aquí:



// --- Parte 5: Flujo completo ---
// Crea una función async "videoClubSession" que:
//   1. Busque "Volver al Futuro" (await)
//   2. Si la encuentra y está disponible, la alquile (await)
//   3. Muestre un resumen

// Tu código aquí:



// ============================================================
// SOLUCIÓN
// ============================================================
/*
// Parte 1
function findMovie(title) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const movie = catalog.find(m => m.title === title);
            if (movie) {
                resolve(movie);
            } else {
                reject(`No se encontró "${title}"`);
            }
        }, 500);
    });
}

findMovie("Coco")
    .then(m => console.log(`Encontrada: ${m.title} — ${m.genre} — ${m.rating}★`))
    .catch(err => console.log(`Error: ${err}`));

setTimeout(() => {
    findMovie("Avatar")
        .then(m => console.log(`Encontrada: ${m.title}`))
        .catch(err => console.log(`Error: ${err}`));
}, 600);

// Parte 2
async function showMovie(title) {
    try {
        const movie = await findMovie(title);
        console.log(`\n--- ${movie.title} ---`);
        console.log(`Género: ${movie.genre}`);
        console.log(`Calificación: ${movie.rating}★`);
    } catch (error) {
        console.log(`\n--- ${title} ---`);
        console.log(`Error: ${error}`);
    }
}

setTimeout(async () => {
    await showMovie("El Padrino");
    await showMovie("Matrix");
}, 1500);

// Parte 3
function rentMovie(title) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const movie = catalog.find(m => m.title === title);
            if (!movie) {
                reject(`${title} no encontrada`);
            } else if (!movie.available) {
                reject(`${title} no está disponible`);
            } else {
                resolve(`¡Alquilada con éxito!`);
            }
        }, 300);
    });
}

setTimeout(async () => {
    console.log("\n--- Alquileres ---");
    const testTitles = ["Toy Story", "Inception", "Avatar"];
    for (const title of testTitles) {
        try {
            const result = await rentMovie(title);
            console.log(`Alquilar "${title}": ${result}`);
        } catch (error) {
            console.log(`Alquilar "${title}": Error: ${error}`);
        }
    }
}, 3000);

// Parte 4
function checkAvailability(title) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const movie = catalog.find(m => m.title === title);
            resolve({
                title,
                available: movie ? movie.available : false
            });
        }, 200);
    });
}

setTimeout(async () => {
    console.log("\n--- Verificar disponibilidad ---");
    console.log("Verificando disponibilidad...");
    const results = await Promise.all([
        checkAvailability("El Padrino"),
        checkAvailability("Inception"),
        checkAvailability("Coco")
    ]);
    results.forEach(({ title, available }) => {
        const status = available ? "✓ disponible" : "✗ no disponible";
        console.log(`${title}: ${status}`);
    });
}, 5000);

// Parte 5
async function videoClubSession() {
    console.log("\n--- Sesión de videoclub ---");
    console.log("1. Buscando película...");

    try {
        const movie = await findMovie("Volver al Futuro");
        console.log(`2. Encontrada: ${movie.title}`);

        if (movie.available) {
            console.log("3. Alquilando...");
            const result = await rentMovie(movie.title);
            console.log(`4. ¡Alquiler completado! Disfruta ${movie.title}`);
        } else {
            console.log("3. No está disponible para alquiler");
        }
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}

setTimeout(() => {
    videoClubSession();
}, 6500);
*/
