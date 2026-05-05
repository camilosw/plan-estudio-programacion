# Hoja de Referencia: JavaScript Fundamentos

## Variables

| Sintaxis                 | Qué hace                                      |
| ------------------------ | --------------------------------------------- |
| `const nombre = "valor"` | Declara una constante (no se puede reasignar) |
| `let contador = 0`       | Declara una variable que se puede reasignar   |
| `typeof valor`           | Devuelve el tipo de dato como string          |

## Tipos de datos

| Tipo      | Ejemplo                          | typeof        |
| --------- | -------------------------------- | ------------- |
| string    | `"hola"`, `'hola'`, `` `hola` `` | `"string"`    |
| number    | `42`, `3.14`                     | `"number"`    |
| boolean   | `true`, `false`                  | `"boolean"`   |
| null      | `null`                           | `"object"`    |
| undefined | `undefined`                      | `"undefined"` |

## Template literals

```javascript
const nombre = "Sandra";
console.log(`Hola, ${nombre}. 2+2 = ${2 + 2}`);
```

## Conversión de tipos

```javascript
Number("42"); // 42
String(42); // "42"
parseInt("30"); // 30
parseFloat("3.14"); // 3.14
```

## Métodos de strings

| Método                | Ejemplo                          | Resultado       |
| --------------------- | -------------------------------- | --------------- |
| `.length`             | `"hola".length`                  | `4`             |
| `.toUpperCase()`      | `"hola".toUpperCase()`           | `"HOLA"`        |
| `.toLowerCase()`      | `"HOLA".toLowerCase()`           | `"hola"`        |
| `.trim()`             | `"  hola  ".trim()`              | `"hola"`        |
| `.includes(texto)`    | `"hola mundo".includes("mundo")` | `true`          |
| `.indexOf(texto)`     | `"hola".indexOf("la")`           | `2`             |
| `.slice(inicio, fin)` | `"hola".slice(0, 2)`             | `"ho"`          |
| `.replace(a, b)`      | `"hola".replace("h", "H")`       | `"Hola"`        |
| `.split(sep)`         | `"a,b,c".split(",")`             | `["a","b","c"]` |
| `.startsWith(texto)`  | `"hola".startsWith("ho")`        | `true`          |
| `.endsWith(texto)`    | `"hola".endsWith("la")`          | `true`          |

## Operadores

| Operador | Descripción                      | Ejemplo                           |
| -------- | -------------------------------- | --------------------------------- |
| `===`    | Igualdad estricta (valor y tipo) | `5 === 5` → `true`                |
| `!==`    | Desigualdad estricta             | `5 !== "5"` → `true`              |
| `&&`     | AND lógico                       | `true && false` → `false`         |
| `\|\|`   | OR lógico                        | `true \|\| false` → `true`        |
| `!`      | NOT lógico                       | `!true` → `false`                 |
| `??`     | Nullish coalescing               | `null ?? "default"` → `"default"` |
| `? :`    | Ternario                         | `edad >= 18 ? "mayor" : "menor"`  |

## Condicionales

```javascript
if (condicion) {
  // ...
} else if (otraCondicion) {
  // ...
} else {
  // ...
}

switch (valor) {
  case "a":
    /* ... */ break;
  case "b":
    /* ... */ break;
  default: /* ... */
}
```

## Bucles

```javascript
// for clásico
for (let i = 0; i < array.length; i++) {}

// for...of (recorrer valores)
for (const elemento of array) {
}

// while
while (condicion) {}

// do...while
do {} while (condicion);

// break → detiene el bucle
// continue → salta a la siguiente iteración
```

## Funciones

```javascript
// Declaración
function nombre(param1, param2 = valorDefault) {
  return resultado;
}

// Expresión
const nombre = function (param) {
  return resultado;
};

// Arrow function
const nombre = (param) => resultado;
const nombre = (param) => {
  return resultado;
};
```

## Arrays — Crear y acceder

```javascript
const arr = [1, 2, 3];
arr[0]; // 1 (primer elemento)
arr[arr.length - 1]; // 3 (último elemento)
arr.length; // 3
```

## Arrays — Modificar

| Método                | Qué hace                  | Modifica original |
| --------------------- | ------------------------- | :---------------: |
| `push(elem)`          | Agrega al final           |         ✓         |
| `pop()`               | Quita del final           |         ✓         |
| `unshift(elem)`       | Agrega al inicio          |         ✓         |
| `shift()`             | Quita del inicio          |         ✓         |
| `splice(pos, n, ...)` | Quita/inserta en posición |         ✓         |
| `reverse()`           | Invierte el orden         |         ✓         |
| `sort(fn)`            | Ordena                    |         ✓         |

## Arrays — Consultar (no modifican)

| Método            | Qué hace                         |
| ----------------- | -------------------------------- |
| `includes(elem)`  | ¿Contiene el elemento? → boolean |
| `indexOf(elem)`   | Posición del elemento (o -1)     |
| `join(sep)`       | Une en un string                 |
| `slice(ini, fin)` | Extrae una porción → nuevo array |
| `concat(arr2)`    | Combina arrays → nuevo array     |

## Arrays — Métodos con callback

| Método             | Qué hace                        | Devuelve                |
| ------------------ | ------------------------------- | ----------------------- |
| `forEach(fn)`      | Ejecuta fn por cada elemento    | nada                    |
| `map(fn)`          | Transforma cada elemento        | nuevo array             |
| `filter(fn)`       | Filtra por condición            | nuevo array             |
| `find(fn)`         | Primer elemento que cumple      | un elemento o undefined |
| `findIndex(fn)`    | Posición del primero que cumple | número o -1             |
| `some(fn)`         | ¿Alguno cumple?                 | boolean                 |
| `every(fn)`        | ¿Todos cumplen?                 | boolean                 |
| `reduce(fn, init)` | Acumula en un solo valor        | cualquier tipo          |
| `sort(fn)`         | Ordena con comparador           | el array (modificado)   |

```javascript
// reduce — acumulador
const total = arr.reduce((acum, elem) => acum + elem, 0);

// sort — comparador
arr.sort((a, b) => a.valor - b.valor); // ascendente
arr.sort((a, b) => b.valor - a.valor); // descendente

// Encadenar
const resultado = arr
  .filter((x) => x.activo)
  .map((x) => x.nombre)
  .sort();
```

## Objetos

```javascript
// Crear
const obj = { nombre: "valor", edad: 25 };

// Acceder
obj.nombre; // "valor"
obj["nombre"]; // "valor" (bracket notation)

// Modificar
obj.nombre = "nuevo";
obj.nuevo = "prop"; // agregar
delete obj.edad; // eliminar

// Métodos útiles
Object.keys(obj); // ["nombre", "nuevo"]
Object.values(obj); // ["nuevo", "prop"]
Object.entries(obj); // [["nombre","nuevo"], ["nuevo","prop"]]

// Iterar
for (const clave in obj) {
}
```

## Desestructuración

```javascript
// Arrays
const [a, b, ...resto] = [1, 2, 3, 4];

// Objetos
const { nombre, edad } = persona;
const { nombre: n, edad: e = 0 } = persona; // renombrar + default

// En parámetros
function fn({ nombre, edad }) {}
```

## Spread y rest

```javascript
// Spread: expandir
const copia = [...array];
const combinado = [...arr1, ...arr2];
const copiaObj = { ...objeto };
const variante = { ...objeto, propiedad: "nuevo" };

// Rest: recoger
function fn(primero, ...resto) {}
```

## Clases

```javascript
class Persona {
  #edad; // propiedad privada

  constructor(nombre, edad) {
    this.nombre = nombre;
    this.#edad = edad;
  }

  get edad() {
    return this.#edad;
  }
  set edad(valor) {
    if (valor > 0) this.#edad = valor;
  }

  saludar() {
    console.log(`Hola, soy ${this.nombre}`);
  }

  static crear(nombre) {
    return new Persona(nombre, 0);
  }
}

class Estudiante extends Persona {
  constructor(nombre, edad, carrera) {
    super(nombre, edad);
    this.carrera = carrera;
  }

  saludar() {
    super.saludar();
    console.log(`Estudio ${this.carrera}`);
  }
}
```

## Date

```javascript
const ahora = new Date();
const fecha = new Date(2026, 4, 15); // 15 mayo 2026 (meses base 0)

fecha.getFullYear(); // 2026
fecha.getMonth(); // 4 (mayo, base 0)
fecha.getDate(); // 15
fecha.getDay(); // 5 (viernes, 0=domingo)
fecha.getHours(); // horas
fecha.getMinutes(); // minutos

// Formatear
fecha.toLocaleDateString("es-ES");
fecha.toLocaleDateString("es-ES", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

// Diferencia en días
const diffMs = fecha2 - fecha1;
const diffDias = Math.floor(diffMs / (1000 * 60 * 60 * 24));
```

## Promesas y async/await

```javascript
// Crear promesa
function operacion() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (exito) resolve(resultado);
      else reject("error");
    }, 1000);
  });
}

// Consumir con .then/.catch
operacion()
  .then((resultado) => {})
  .catch((error) => {})
  .finally(() => {});

// Consumir con async/await
async function main() {
  try {
    const resultado = await operacion();
  } catch (error) {
    console.log(error);
  }
}

// Paralelo
const [r1, r2] = await Promise.all([op1(), op2()]);
```

## Resumen rápido

| Concepto             | Sintaxis clave                          |
| -------------------- | --------------------------------------- |
| Variable constante   | `const x = valor`                       |
| Variable reasignable | `let x = valor`                         |
| Template literal     | `` `texto ${expresion}` ``              |
| Comparar             | `===`, `!==` (nunca `==`)               |
| Arrow function       | `(params) => resultado`                 |
| Desestructurar       | `const { a, b } = obj`                  |
| Spread/clonar        | `[...arr]`, `{ ...obj }`                |
| Buscar en array      | `.find(fn)`                             |
| Filtrar array        | `.filter(fn)`                           |
| Transformar array    | `.map(fn)`                              |
| Acumular             | `.reduce(fn, init)`                     |
| Clase                | `class Nombre { constructor() {} }`     |
| Herencia             | `class Hija extends Madre {}`           |
| Fecha actual         | `new Date()`                            |
| Asíncrono            | `async function fn() { await promesa }` |
