<?php
// ============================================================
// TEMA 7: Herencia — Clases que heredan de otras
// ============================================================
//
// OBJETIVO: Reutilizar código creando clases hijas que
// extienden una clase padre.
//
// EXPLICACIÓN:
// En una tienda online hay distintos tipos de productos:
// ropa, electrónica, comida. Todos tienen nombre, precio y
// stock, pero cada tipo puede tener atributos y comportamientos
// extra. En vez de repetir código, creamos una clase BASE
// y la EXTENDEMOS.
//
// Sintaxis:
//   class ClaseHija extends ClasePadre {
//       // atributos y métodos extra
//   }
//
// NOTA SOBRE PROTECTED:
// Aquí es donde protected cobra sentido. Los atributos
// protected son accesibles dentro de la clase Y sus clases
// hijas, pero NO desde fuera. Es perfecto para herencia.
//
// - private:   solo la propia clase puede acceder
// - protected: la propia clase Y sus hijas pueden acceder
// - public:    cualquiera puede acceder
// ============================================================

// Clase padre (base)
class Producto {
    public $nombre;
    protected $precio;   // protected: accesible en clases hijas
    protected $stock;    // protected: accesible en clases hijas

    function __construct($nombre, $precio, $stock) {
        $this->nombre = $nombre;
        $this->precio = $precio;
        $this->stock = $stock;
    }

    function getPrecio() {
        return $this->precio;
    }

    function mostrarInfo() {
        echo "$this->nombre - \$$this->precio - Stock: $this->stock\n";
    }
}

// Clase hija: hereda todo de Producto y agrega talla y color
class ProductoRopa extends Producto {
    public $talla;
    public $color;

    function __construct($nombre, $precio, $stock, $talla, $color) {
        // Llamamos al constructor del padre para reutilizar su código
        parent::__construct($nombre, $precio, $stock);
        $this->talla = $talla;
        $this->color = $color;
    }

    // Sobrescribimos mostrarInfo para agregar información extra
    function mostrarInfo() {
        parent::mostrarInfo(); // Primero mostramos la info base
        echo "  Talla: $this->talla, Color: $this->color\n";
    }
}

// Otra clase hija: hereda de Producto y agrega garantía
class ProductoElectronico extends Producto {
    public $garantiaMeses;

    function __construct($nombre, $precio, $stock, $garantiaMeses) {
        parent::__construct($nombre, $precio, $stock);
        $this->garantiaMeses = $garantiaMeses;
    }

    function mostrarInfo() {
        parent::mostrarInfo();
        echo "  Garantía: $this->garantiaMeses meses\n";
    }
}

// Creamos productos de distintos tipos
$camiseta = new ProductoRopa("Camiseta", 19.99, 50, "M", "Azul");
$laptop = new ProductoElectronico("Laptop", 999.99, 10, 24);

echo "=== Producto de Ropa ===\n";
$camiseta->mostrarInfo();
// Salida:
//   Camiseta - $19.99 - Stock: 50
//     Talla: M, Color: Azul

echo "\n=== Producto Electrónico ===\n";
$laptop->mostrarInfo();
// Salida:
//   Laptop - $999.99 - Stock: 10
//     Garantía: 24 meses

echo "\n";

// Los métodos heredados también funcionan
echo "Precio de la laptop: \$" . $laptop->getPrecio() . "\n";

// Pero no podemos acceder a protected desde fuera:
// echo $laptop->precio;  // ERROR: precio es protected

// ============================================================
// EJERCICIO:
// Crear una clase base Usuario con:
//   - Atributos: $nombre, $email
//   - Constructor y método mostrarInfo()
//
// Luego crear dos clases hijas:
//
// 1. ClienteVip que tenga:
//    - Un atributo extra $descuentoVip (porcentaje)
//    - Un método aplicarDescuento($precio) que devuelva el
//      precio con el descuento VIP aplicado
//    - Sobrescribir mostrarInfo() para mostrar también el
//      descuento VIP
//
// 2. Administrador que tenga:
//    - Un atributo extra $nivel (1, 2 o 3)
//    - Un método puedeEliminarProductos() que devuelva true
//      si el nivel es mayor a 2
//    - Sobrescribir mostrarInfo() para mostrar también el nivel
//
// Ejemplo:
//   $vip = new ClienteVip("Ana", "ana@email.com", 15);
//   echo $vip->aplicarDescuento(100); // 85
//
//   $admin = new Administrador("Carlos", "carlos@email.com", 3);
//   echo $admin->puedeEliminarProductos(); // true
// ============================================================
