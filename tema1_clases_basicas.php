<?php
// ============================================================
// TEMA 1: ¿Qué es una clase? — La clase como molde de datos
// ============================================================
//
// OBJETIVO: Entender que una clase es un molde para crear
// "cosas" con información dentro.
//
// EXPLICACIÓN:
// Piensa en una ficha de producto en una tienda. Todas las
// fichas tienen los mismos campos: nombre, precio, stock.
// La CLASE es el molde de esa ficha.
// Cada producto concreto que creamos es un OBJETO.
//
// Sintaxis:
//   class NombreClase {
//       public $atributo;
//   }
//
//   $objeto = new NombreClase();
//   $objeto->atributo = "valor";
// ============================================================

// Definimos la clase Producto (el molde)
class Producto {
    public $nombre;
    public $precio;
    public $stock;
}

// Creamos un objeto (un producto concreto)
$camiseta = new Producto();
$camiseta->nombre = "Camiseta azul";
$camiseta->precio = 19.99;
$camiseta->stock = 50;

// Creamos otro objeto (otro producto)
$pantalon = new Producto();
$pantalon->nombre = "Pantalón negro";
$pantalon->precio = 39.99;
$pantalon->stock = 30;

// Mostramos los datos de cada producto
echo "Producto 1: $camiseta->nombre\n";
echo "Precio: \$$camiseta->precio\n";
echo "Stock: $camiseta->stock unidades\n";
echo "\n";
echo "Producto 2: $pantalon->nombre\n";
echo "Precio: \$$pantalon->precio\n";
echo "Stock: $pantalon->stock unidades\n";

// ============================================================
// EJERCICIO:
// Crear una clase Cliente con los atributos:
//   - $nombre
//   - $email
//   - $telefono
//
// Luego crear 2 clientes distintos y mostrar sus datos
// con echo.
// ============================================================
