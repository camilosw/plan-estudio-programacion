// ============================================================
// TEMA 14: Promesas y async/await
// ============================================================
//
// OBJETIVO: Entender el código asíncrono y manejar operaciones
// que toman tiempo.
//
// EXPLICACIÓN:
// Imagina que estás en la cafetería. Pides un café y mientras
// lo preparan, no te quedas parada esperando sin hacer nada:
// revisas el menú, eliges una mesa, miras tu teléfono. Cuando
// el café está listo, te avisan.
//
// En programación, hay operaciones que tardan: buscar datos
// en una base de datos, descargar un archivo, esperar una
// respuesta de un servidor. JavaScript no se detiene a esperar;
// sigue ejecutando el resto del código y "te avisa" cuando
// la operación termina. Eso es código ASÍNCRONO.
//
// EJECUCIÓN:
//   node teoría/tema14_promesas_y_async_await.js
// ============================================================

// --- Síncrono vs asíncrono ---

console.log("--- Síncrono vs asíncrono ---");
console.log("1. Pido un café");
console.log("2. Elijo una mesa");
console.log("3. Me siento");
// En código síncrono, cada línea espera a que termine la anterior.
// Todo se ejecuta en orden: 1, 2, 3.

// --- setTimeout ---

// setTimeout ejecuta una función DESPUÉS de un tiempo (en ms).
// Es la forma más simple de ver código asíncrono.

console.log("\n--- setTimeout ---");
console.log("1. Pido un café");

setTimeout(() => {
    console.log("3. ¡Café listo! (después de 1 segundo)");
}, 1000);

console.log("2. Mientras espero, elijo una mesa");

// La salida será: 1, 2, 3 (no 1, 3, 2)
// Porque setTimeout no detiene la ejecución.

// --- setInterval ---

// setInterval ejecuta una función repetidamente cada cierto tiempo.

console.log("\n--- setInterval ---");
let segundos = 0;
const temporizador = setInterval(() => {
    segundos++;
    console.log(`Horneando... ${segundos} segundo(s)`);
    if (segundos >= 3) {
        clearInterval(temporizador);
        console.log("¡Listo para sacar del horno!");
    }
}, 500); // Cada 500ms (usamos 500ms en vez de 1000ms para que el ejemplo sea rápido)

// --- Callbacks y el problema del "callback hell" ---

// Un callback es una función que se ejecuta cuando algo termina.
// Pero si encadenas muchos, el código se vuelve difícil de leer.

function prepararIngrediente(ingrediente, callback) {
    setTimeout(() => {
        console.log(`✓ ${ingrediente} listo`);
        callback();
    }, 300);
}

// Esto se vuelve complicado con muchos pasos anidados:
setTimeout(() => {
    console.log("\n--- Callback hell (ejemplo) ---");
    prepararIngrediente("Harina", () => {
        prepararIngrediente("Azúcar", () => {
            prepararIngrediente("Huevos", () => {
                console.log("Todos los ingredientes listos");
                // Imagina 10 pasos más... se vuelve inmanejable
            });
        });
    });
}, 2500);

// --- Promesas ---

// Una promesa representa una operación que terminará en el
// futuro. Puede resolverse (éxito) o rechazarse (error).

function buscarReceta(nombre) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const recetas = {
                "Café con leche": { nombre: "Café con leche espumosa", tiempo: 10, calificacion: 4.5 },
                "Tarta": { nombre: "Tarta de chocolate", tiempo: 60, calificacion: 4.8 }
            };

            const receta = recetas[nombre];
            if (receta) {
                resolve(receta);
            } else {
                reject(`No se encontró la receta "${nombre}"`);
            }
        }, 500);
    });
}

// --- .then() / .catch() / .finally() ---

setTimeout(() => {
    console.log("\n--- Promesas con .then/.catch ---");

    buscarReceta("Tarta")
        .then(receta => {
            console.log(`Encontrada: ${receta.nombre} — ${receta.calificacion}★`);
        })
        .catch(error => {
            console.log(`Error: ${error}`);
        })
        .finally(() => {
            console.log("Búsqueda finalizada");
        });

    // Ejemplo con error
    buscarReceta("Sushi")
        .then(receta => {
            console.log(`Encontrada: ${receta.nombre}`);
        })
        .catch(error => {
            console.log(`Error: ${error}`);
        });
}, 5000);

// --- async / await ---

// async/await es una forma más limpia de trabajar con promesas.
// await "pausa" la función hasta que la promesa se resuelva.
// Solo se puede usar dentro de una función marcada como async.

async function buscarYMostrar() {
    console.log("\n--- async/await ---");

    try {
        const receta = await buscarReceta("Café con leche");
        console.log(`Encontrada: ${receta.nombre}`);
        console.log(`Tiempo: ${receta.tiempo} min`);
        console.log(`Calificación: ${receta.calificacion}★`);
    } catch (error) {
        console.log(`Error: ${error}`);
    }

    // Ejemplo con error
    try {
        const receta = await buscarReceta("Pizza");
        console.log(receta);
    } catch (error) {
        console.log(`Error capturado: ${error}`);
    }
}

setTimeout(() => {
    buscarYMostrar();
}, 7000);

// --- Promise.all ---

// Ejecuta varias promesas en paralelo y espera a que TODAS
// terminen. Si alguna falla, todo falla.

function verificarIngrediente(ingrediente) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const disponible = ingrediente !== "azafrán";
            resolve({ ingrediente, disponible });
        }, 300);
    });
}

async function verificarTodosLosIngredientes() {
    console.log("\n--- Promise.all ---");
    console.log("Verificando ingredientes en paralelo...");

    const resultados = await Promise.all([
        verificarIngrediente("harina"),
        verificarIngrediente("azúcar"),
        verificarIngrediente("huevos"),
        verificarIngrediente("azafrán")
    ]);

    resultados.forEach(({ ingrediente, disponible }) => {
        const estado = disponible ? "✓ disponible" : "✗ no disponible";
        console.log(`  ${ingrediente}: ${estado}`);
    });

    const todosDisponibles = resultados.every(r => r.disponible);
    console.log(todosDisponibles
        ? "¡Todos los ingredientes disponibles!"
        : "Faltan ingredientes");
}

setTimeout(() => {
    verificarTodosLosIngredientes();
}, 9000);

// --- Ejemplo práctico: simular carga de recetas ---

function cargarRecetasDesdeBD() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { nombre: "Café con leche espumosa", categoria: "bebidas", calificacion: 4.5 },
                { nombre: "Tarta de chocolate", categoria: "postres", calificacion: 4.8 },
                { nombre: "Galletas de avena", categoria: "snacks", calificacion: 4.0 }
            ]);
        }, 800);
    });
}

async function iniciarRecetario() {
    console.log("\n--- Ejemplo práctico ---");
    console.log("Cargando recetas...");

    const recetas = await cargarRecetasDesdeBD();
    console.log(`Se cargaron ${recetas.length} recetas:`);

    recetas.forEach(r => {
        console.log(`  ${r.nombre} — ${r.categoria} — ${r.calificacion}★`);
    });

    const destacadas = recetas.filter(r => r.calificacion >= 4.5);
    console.log(`\nRecetas destacadas: ${destacadas.length}`);
}

setTimeout(() => {
    iniciarRecetario();
}, 11000);

// ============================================================
// EJERCICIO
// ============================================================
// 1. Crea una función "prepararReceta" que reciba un nombre
//    y devuelva una promesa. Después de 1 segundo, la
//    promesa se resuelve con el mensaje "nombre lista".
//    Si el nombre está vacío, la promesa se rechaza.
//    Usa .then/.catch para probarla.
//
// 2. Crea una función async "prepararMenu" que use await
//    para preparar 3 recetas en secuencia (una después de
//    otra) y muestre el resultado de cada una.
//
// 3. Crea 3 funciones que simulen verificar stock de
//    ingredientes (cada una devuelve una promesa con un
//    delay diferente). Usa Promise.all para verificar
//    todas en paralelo y muestra cuáles están disponibles.
// ============================================================
