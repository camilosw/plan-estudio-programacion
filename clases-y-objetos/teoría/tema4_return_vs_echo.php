<?php
// ============================================================
// TEMA 4: Métodos que devuelven valores vs. métodos que imprimen
// ============================================================
//
// OBJETIVO: Distinguir entre métodos que hacen echo y métodos
// que usan return, y cuándo usar cada uno.
//
// EXPLICACIÓN:
// Un método puede hacer dos cosas con un resultado:
//   1. IMPRIMIRLO con echo (lo muestra en pantalla y ya)
//   2. DEVOLVERLO con return (nos da el valor para usarlo después)
//
// return es más flexible porque el valor devuelto se puede:
//   - Guardar en una variable
//   - Usar en cálculos
//   - Pasar a otro método o función
//   - Comparar con otros valores
// ============================================================

class Producto {
    public $nombre;
    public $precio;

    function __construct($nombre, $precio) {
        $this->nombre = $nombre;
        $this->precio = $precio;
    }

    // Este método DEVUELVE el precio con IVA (más flexible)
    function precioConIva($porcentajeIva) {
        return $this->precio * (1 + $porcentajeIva / 100);
    }

    // Este método IMPRIME información (menos flexible)
    function mostrarInfo() {
        echo "$this->nombre - \$$this->precio\n";
    }
}

$producto = new Producto("Laptop", 999.99);

// --- Usando el método que IMPRIME ---
$producto->mostrarInfo(); // Imprime: Laptop - $999.99
// No podemos hacer nada más con este resultado


// --- Usando el método que DEVUELVE ---

// 1. Guardamos el resultado en una variable
$precioFinal = $producto->precioConIva(21);
echo "Precio con IVA (21%): \$$precioFinal\n";

// 2. Lo usamos directamente en un cálculo
$precioConEnvio = $producto->precioConIva(21) + 15;
echo "Precio con IVA + envío: \$$precioConEnvio\n";

// 3. Lo usamos en una comparación
if ($producto->precioConIva(21) > 1000) {
    echo "Este producto supera los \$1000 con IVA\n";
}

