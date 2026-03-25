<?php
// ============================================================
// TEMA 5: Visibilidad — public, private y protected
// ============================================================
//
// OBJETIVO: Entender por qué no siempre queremos que los datos
// de un objeto sean accesibles desde fuera.
//
// EXPLICACIÓN:
// Hasta ahora todos los atributos eran "public", lo que
// significa que cualquiera puede leerlos y modificarlos
// desde fuera de la clase. Pero a veces queremos PROTEGER
// ciertos datos.
//
// Por ejemplo: no queremos que alguien pueda cambiar el stock
// de un producto directamente. El stock solo debería cambiar
// cuando se vende algo.
//
// Tipos de visibilidad:
//   - public:    accesible desde cualquier lugar
//   - private:   solo accesible dentro de la propia clase
//   - protected: accesible dentro de la clase y sus clases
//                hijas (lo veremos en el tema de herencia)
// ============================================================

class Producto {
    public $nombre;
    public $precio;
    private $precioConDescuento;
    private $stock;

    function __construct($nombre, $precio, $stock) {
        $this->nombre = $nombre;
        $this->precio = $precio;
        $this->precioConDescuento = $precio;
        $this->stock = $stock;
    }

    // Solo se puede aplicar descuento a través de este método,
    // que valida que el porcentaje sea razonable
    function aplicarDescuento($porcentaje) {
        if ($porcentaje > 0 && $porcentaje <= 50) {
            $this->precioConDescuento = $this->precio * (1 - $porcentaje / 100);
            echo "Descuento aplicado. Precio con descuento: \$$this->precioConDescuento\n";
        } else {
            echo "Descuento no válido (debe ser entre 1% y 50%)\n";
        }
    }

    // Solo se puede modificar el stock vendiendo, lo cual valida
    // que haya suficiente stock disponible
    function vender($cantidad) {
        if ($cantidad <= $this->stock) {
            $this->stock -= $cantidad;
            echo "Vendido. Stock restante: $this->stock\n";
        } else {
            echo "No hay suficiente stock\n";
        }
    }

    function mostrarInfo() {
        echo "$this->nombre - Precio: \$$this->precio - Con descuento: \$$this->precioConDescuento - Stock: $this->stock\n";
    }
}

$producto = new Producto("Laptop", 999.99, 10);
$producto->mostrarInfo();
// Salida: Laptop - Precio: $999.99 - Con descuento: $999.99 - Stock: 10

echo "\n";

// Aplicamos un descuento válido
$producto->aplicarDescuento(10);
// Salida: Descuento aplicado. Precio con descuento: $899.991

// Vendemos 2 unidades
$producto->vender(2);
// Salida: Vendido. Stock restante: 8

$producto->mostrarInfo();
// Salida: Laptop - Precio: $999.99 - Con descuento: $899.991 - Stock: 8

echo "\n";

// Intentamos un descuento inválido
$producto->aplicarDescuento(90);
// Salida: Descuento no válido (debe ser entre 1% y 50%)

echo "\n";

// Esto funciona porque es public:
echo "Nombre: $producto->nombre\n";
echo "Precio: \$$producto->precio\n";

// Esto daría ERROR porque es private:
// echo $producto->precioConDescuento;  // Fatal error
// echo $producto->stock;                // Fatal error
// $producto->stock = 999;               // Fatal error

echo "\n(Las líneas comentadas darían error porque precioConDescuento y stock son private)\n";

