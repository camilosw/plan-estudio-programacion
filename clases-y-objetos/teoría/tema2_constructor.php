<?php
// ============================================================
// TEMA 2: El constructor — Crear objetos con datos desde el inicio
// ============================================================
//
// OBJETIVO: Evitar asignar atributos uno por uno usando __construct.
//
// EXPLICACIÓN:
// En el tema anterior, para crear un producto teníamos que
// escribir 3 líneas (una por cada atributo). El CONSTRUCTOR
// es una función especial que se ejecuta automáticamente al
// crear el objeto con "new". Nos permite pasar todos los datos
// de una sola vez.
//
// Sintaxis:
//   function __construct($param1, $param2) {
//       $this->atributo1 = $param1;
//       $this->atributo2 = $param2;
//   }
//
// $this se refiere al objeto que estamos creando.
// ============================================================

class Producto {
    public $nombre;
    public $precio;
    public $stock;

    // El constructor recibe los datos y los asigna a los atributos
    function __construct($nombre, $precio, $stock) {
        $this->nombre = $nombre;
        $this->precio = $precio;
        $this->stock = $stock;
    }
}

// Ahora podemos crear productos en una sola línea
$camiseta = new Producto("Camiseta azul", 19.99, 50);
$pantalon = new Producto("Pantalón negro", 39.99, 30);
$zapatos = new Producto("Zapatos deportivos", 59.99, 20);

// Mostramos los datos
echo "$camiseta->nombre - \$$camiseta->precio - Stock: $camiseta->stock\n";
echo "$pantalon->nombre - \$$pantalon->precio - Stock: $pantalon->stock\n";
echo "$zapatos->nombre - \$$zapatos->precio - Stock: $zapatos->stock\n";

