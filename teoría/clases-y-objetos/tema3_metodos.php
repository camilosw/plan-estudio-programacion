<?php
// ============================================================
// TEMA 3: Métodos — Funciones dentro de la clase
// ============================================================
//
// OBJETIVO: Entender que las clases pueden tener funciones
// (llamadas "métodos") que operan sobre sus propios datos.
//
// EXPLICACIÓN:
// Así como una ficha de producto tiene datos (nombre, precio),
// también puede tener acciones: "aplicar descuento", "vender".
// Estas acciones son los MÉTODOS de la clase.
//
// Un método es simplemente una función que vive dentro de la
// clase y puede acceder a los atributos del objeto con $this.
//
// NOTA IMPORTANTE: Usamos un atributo separado $precioConDescuento
// para no perder el precio original del producto.
// ============================================================

class Producto {
    public $nombre;
    public $precio;
    public $precioConDescuento;
    public $stock;

    function __construct($nombre, $precio, $stock) {
        $this->nombre = $nombre;
        $this->precio = $precio;
        $this->precioConDescuento = $precio; // Inicialmente igual al precio original
        $this->stock = $stock;
    }

    // Método para aplicar un descuento (no modifica el precio original)
    function aplicarDescuento($porcentaje) {
        $this->precioConDescuento = $this->precio * (1 - $porcentaje / 100);
    }

    // Método para vender unidades (reduce el stock)
    function vender($cantidad) {
        if ($cantidad <= $this->stock) {
            $this->stock -= $cantidad;
            echo "Vendido. Stock restante: $this->stock\n";
        } else {
            echo "No hay suficiente stock\n";
        }
    }

    // Método para mostrar toda la información del producto
    function mostrarInfo() {
        echo "$this->nombre - Precio: \$$this->precio - Con descuento: \$$this->precioConDescuento - Stock: $this->stock\n";
    }
}

// Creamos un producto y usamos sus métodos
$camiseta = new Producto("Camiseta azul", 19.99, 50);
$camiseta->mostrarInfo();
// Salida: Camiseta azul - Precio: $19.99 - Con descuento: $19.99 - Stock: 50

$camiseta->aplicarDescuento(10); // 10% de descuento
$camiseta->vender(3);            // Vendemos 3 unidades
$camiseta->mostrarInfo();
// Salida: Camiseta azul - Precio: $19.99 - Con descuento: $17.991 - Stock: 47

echo "\n";

// Intentamos vender más de lo que hay en stock
$camiseta->vender(100);
// Salida: No hay suficiente stock

