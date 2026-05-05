// ============================================================
// TEMA 15: Proyecto integrador — El Recetario de Sandra
// ============================================================
//
// OBJETIVO: Construir un sistema completo que integre todos
// los conceptos aprendidos en los temas 1–14.
//
// Este proyecto usa:
//   - Variables y tipos (tema 2)
//   - Condicionales y operadores (tema 3)
//   - Bucles (tema 4)
//   - Funciones y arrow functions (tema 5)
//   - Arrays y sus métodos (temas 6, 9, 10)
//   - Objetos (tema 7)
//   - Arrays de objetos (tema 8)
//   - Desestructuración y spread (tema 11)
//   - Clases y herencia (tema 12)
//   - Fechas (tema 13)
//   - Promesas y async/await (tema 14)
//
// EJECUCIÓN:
//   node teoría/tema15_proyecto_integrador.js
// ============================================================

// ============================================================
// CLASES
// ============================================================

class Receta {
    #calificacion;

    constructor(nombre, categoria, tiempoMinutos, calificacion, ingredientes = []) {
        this.nombre = nombre;
        this.categoria = categoria;
        this.tiempoMinutos = tiempoMinutos;
        this.#calificacion = calificacion;
        this.ingredientes = ingredientes;
        this.disponible = true;
        this.fechaCreacion = new Date();
    }

    get calificacion() {
        return this.#calificacion;
    }

    set calificacion(valor) {
        if (valor < 1 || valor > 5) {
            console.log("  Error: la calificación debe ser entre 1 y 5");
            return;
        }
        this.#calificacion = valor;
    }

    get tiempoFormateado() {
        const horas = Math.floor(this.tiempoMinutos / 60);
        const minutos = this.tiempoMinutos % 60;
        if (horas === 0) return `${minutos}min`;
        return `${horas}h ${minutos}min`;
    }

    get dificultad() {
        if (this.tiempoMinutos <= 15) return "fácil";
        if (this.tiempoMinutos <= 45) return "media";
        return "difícil";
    }

    mostrar() {
        const estado = this.disponible ? "✓" : "✗";
        const fecha = this.fechaCreacion.toLocaleDateString("es-ES", {
            day: "numeric",
            month: "short",
            year: "numeric"
        });
        console.log(`  ${estado} ${this.nombre}`);
        console.log(`    ${this.categoria} | ${this.tiempoFormateado} | ${this.#calificacion}★ | ${this.dificultad}`);
        console.log(`    Ingredientes: ${this.ingredientes.join(", ") || "sin especificar"}`);
        console.log(`    Creada: ${fecha}`);
    }
}

class RecetaPostre extends Receta {
    constructor(nombre, tiempoMinutos, calificacion, ingredientes, temperaturaCoccion) {
        super(nombre, "postres", tiempoMinutos, calificacion, ingredientes);
        this.temperaturaCoccion = temperaturaCoccion;
    }

    mostrar() {
        super.mostrar();
        if (this.temperaturaCoccion > 0) {
            console.log(`    Hornear a ${this.temperaturaCoccion}°C`);
        }
    }

    necesitaHorno() {
        return this.temperaturaCoccion > 0;
    }
}

class RecetaBebida extends Receta {
    constructor(nombre, tiempoMinutos, calificacion, ingredientes, esCaliente) {
        super(nombre, "bebidas", tiempoMinutos, calificacion, ingredientes);
        this.esCaliente = esCaliente;
    }

    mostrar() {
        super.mostrar();
        console.log(`    Temperatura: ${this.esCaliente ? "caliente" : "fría"}`);
    }
}

// ============================================================
// DATOS DEL RECETARIO
// ============================================================

const recetas = [
    new RecetaBebida(
        "Café con leche espumosa", 10, 4.5,
        ["café molido", "leche", "azúcar"], true
    ),
    new RecetaPostre(
        "Tarta de chocolate", 60, 4.8,
        ["chocolate", "harina", "huevos", "mantequilla", "azúcar"], 180
    ),
    new Receta(
        "Sándwich club", "platos principales", 15, 4.2,
        ["pan", "jamón", "queso", "lechuga", "tomate"]
    ),
    new Receta(
        "Galletas de avena", "snacks", 30, 4.0,
        ["avena", "miel", "mantequilla", "pasas"]
    ),
    new RecetaPostre(
        "Cheesecake de frutos rojos", 90, 4.9,
        ["queso crema", "galletas", "frutos rojos", "azúcar", "gelatina"], 160
    ),
    new RecetaBebida(
        "Té chai latte", 8, 4.3,
        ["té negro", "canela", "cardamomo", "leche", "miel"], true
    ),
    new Receta(
        "Ensalada mediterránea", "platos principales", 20, 3.8,
        ["lechuga", "tomate", "pepino", "aceitunas", "queso feta"]
    ),
    new RecetaPostre(
        "Brownie con nueces", 45, 4.6,
        ["chocolate", "nueces", "harina", "huevos", "mantequilla"], 175
    )
];

// Marcar algunas como no disponibles
recetas[2].disponible = false;
recetas[7].disponible = false;

// ============================================================
// FUNCIONES DEL RECETARIO
// ============================================================

function buscarReceta(nombre) {
    return recetas.find(r => r.nombre.toLowerCase().includes(nombre.toLowerCase()));
}

function filtrarPorCategoria(categoria) {
    return recetas.filter(r => r.categoria === categoria);
}

function recetasRapidas(maxMinutos = 20) {
    return recetas.filter(r => r.tiempoMinutos <= maxMinutos);
}

function recetasDisponibles() {
    return recetas.filter(r => r.disponible);
}

function calificacionPromedio() {
    const suma = recetas.reduce((total, r) => total + r.calificacion, 0);
    return (suma / recetas.length).toFixed(1);
}

function resumenPorCategoria() {
    return recetas.reduce((resultado, r) => {
        const cat = r.categoria;
        if (!resultado[cat]) {
            resultado[cat] = { cantidad: 0, tiempoTotal: 0, sumaRating: 0 };
        }
        resultado[cat].cantidad++;
        resultado[cat].tiempoTotal += r.tiempoMinutos;
        resultado[cat].sumaRating += r.calificacion;
        return resultado;
    }, {});
}

function topRecetas(n = 3) {
    return [...recetas]
        .filter(r => r.disponible)
        .sort((a, b) => b.calificacion - a.calificacion)
        .slice(0, n);
}

function ajustarPorciones(receta, porcionesOriginales, porcionesDeseadas) {
    const { nombre, ingredientes } = receta;
    const factor = porcionesDeseadas / porcionesOriginales;
    return {
        nombre: `${nombre} (para ${porcionesDeseadas})`,
        factor: factor.toFixed(1),
        nota: `Multiplica cada cantidad por ${factor.toFixed(1)}`
    };
}

function agregarReceta(nuevaReceta) {
    recetas.push(nuevaReceta);
    return recetas.length;
}

// Función asíncrona: simula cargar recetas destacadas desde un servidor
function cargarDestacadasDelServidor() {
    return new Promise((resolve) => {
        setTimeout(() => {
            const destacadas = recetas
                .filter(r => r.calificacion >= 4.5 && r.disponible)
                .map(({ nombre, calificacion }) => ({ nombre, calificacion }));
            resolve(destacadas);
        }, 800);
    });
}

// ============================================================
// FLUJO PRINCIPAL
// ============================================================

async function iniciarRecetario() {
    // --- Encabezado ---
    console.log("╔══════════════════════════════════════════╗");
    console.log("║     EL RECETARIO DE SANDRA               ║");
    console.log("║     Sistema de gestión de recetas         ║");
    console.log("╚══════════════════════════════════════════╝");

    // --- Catálogo completo ---
    console.log("\n📋 CATÁLOGO COMPLETO");
    console.log("─".repeat(45));
    recetas.forEach((receta, i) => {
        console.log(`\n  Receta #${i + 1}:`);
        receta.mostrar();
    });

    // --- Buscar receta ---
    console.log("\n\n🔍 BUSCAR RECETA: 'chocolate'");
    console.log("─".repeat(45));
    const encontrada = buscarReceta("chocolate");
    if (encontrada) {
        encontrada.mostrar();
    } else {
        console.log("  No se encontró la receta");
    }

    // --- Filtrar por categoría ---
    console.log("\n\n☕ BEBIDAS");
    console.log("─".repeat(45));
    const bebidas = filtrarPorCategoria("bebidas");
    bebidas.forEach(r => {
        console.log(`  ${r.nombre} — ${r.tiempoFormateado} — ${r.calificacion}★`);
    });

    // --- Recetas rápidas ---
    console.log("\n\n⚡ RECETAS RÁPIDAS (≤ 15 min)");
    console.log("─".repeat(45));
    const rapidas = recetasRapidas(15);
    rapidas.forEach(r => {
        console.log(`  ${r.nombre} — ${r.tiempoMinutos} min`);
    });

    // --- Top 3 ---
    console.log("\n\n🏆 TOP 3 RECETAS DISPONIBLES");
    console.log("─".repeat(45));
    const top = topRecetas(3);
    top.forEach((r, i) => {
        console.log(`  ${i + 1}. ${r.nombre} — ${r.calificacion}★`);
    });

    // --- Ajustar porciones ---
    console.log("\n\n📐 AJUSTAR PORCIONES");
    console.log("─".repeat(45));
    const tartaEncontrada = buscarReceta("Tarta");
    if (tartaEncontrada) {
        const ajuste = ajustarPorciones(tartaEncontrada, 8, 4);
        console.log(`  ${ajuste.nombre}`);
        console.log(`  ${ajuste.nota}`);
    }

    // --- Resumen por categoría ---
    console.log("\n\n📊 RESUMEN POR CATEGORÍA");
    console.log("─".repeat(45));
    const resumen = resumenPorCategoria();
    for (const [cat, datos] of Object.entries(resumen)) {
        const promedioRating = (datos.sumaRating / datos.cantidad).toFixed(1);
        console.log(`  ${cat}: ${datos.cantidad} recetas | ${datos.tiempoTotal} min total | ${promedioRating}★ promedio`);
    }

    // --- Agregar nueva receta ---
    console.log("\n\n➕ AGREGAR NUEVA RECETA");
    console.log("─".repeat(45));
    const nueva = new RecetaBebida(
        "Chocolate caliente", 12, 4.4,
        ["chocolate", "leche", "azúcar", "canela"], true
    );
    const totalRecetas = agregarReceta(nueva);
    console.log(`  Agregada: ${nueva.nombre}`);
    console.log(`  Total de recetas: ${totalRecetas}`);

    // --- Estadísticas ---
    console.log("\n\n📈 ESTADÍSTICAS");
    console.log("─".repeat(45));
    const disponibles = recetasDisponibles();
    console.log(`  Total de recetas: ${recetas.length}`);
    console.log(`  Disponibles: ${disponibles.length}`);
    console.log(`  No disponibles: ${recetas.length - disponibles.length}`);
    console.log(`  Calificación promedio: ${calificacionPromedio()}★`);

    const todasBuenas = recetas.every(r => r.calificacion >= 3.5);
    console.log(`  ¿Todas con rating ≥ 3.5? ${todasBuenas ? "Sí" : "No"}`);

    const algunaDificil = recetas.some(r => r.dificultad === "difícil");
    console.log(`  ¿Alguna receta difícil? ${algunaDificil ? "Sí" : "No"}`);

    // --- Cargar destacadas (async) ---
    console.log("\n\n🌐 CARGANDO DESTACADAS DEL SERVIDOR...");
    console.log("─".repeat(45));
    const destacadas = await cargarDestacadasDelServidor();
    console.log(`  Se cargaron ${destacadas.length} recetas destacadas:`);
    destacadas.forEach(({ nombre, calificacion }) => {
        console.log(`  ⭐ ${nombre} — ${calificacion}★`);
    });

    // --- Despedida ---
    const ahora = new Date();
    const fechaFormateada = ahora.toLocaleDateString("es-ES", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    console.log("\n\n═══════════════════════════════════════════");
    console.log(`  Reporte generado: ${fechaFormateada}`);
    console.log("  ¡Gracias por usar El Recetario de Sandra!");
    console.log("═══════════════════════════════════════════");
}

// --- Ejecutar ---
iniciarRecetario();
