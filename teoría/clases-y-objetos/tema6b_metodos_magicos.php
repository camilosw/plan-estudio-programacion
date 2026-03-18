<?php
// ============================================================
// TEMA 6b: Métodos mágicos __get y __set — Acceso dinámico a atributos
// ============================================================
//
// OBJETIVO: Conocer los métodos mágicos __get y __set de PHP,
// que permiten interceptar automáticamente la lectura y
// escritura de atributos privados.
//
// EXPLICACIÓN:
// En el Tema 6 aprendimos a crear getters y setters explícitos
// (getPrecio, setPrecio). PHP ofrece otra forma de hacer lo
// mismo: los MÉTODOS MÁGICOS __get y __set.
//
//   - __get($atributo) se llama AUTOMÁTICAMENTE cuando alguien
//     intenta LEER un atributo que es privado o no existe.
//
//   - __set($atributo, $valor) se llama AUTOMÁTICAMENTE cuando
//     alguien intenta ESCRIBIR en un atributo que es privado
//     o no existe.
//
// El doble guión bajo (__) es la misma convención que
// __construct — indica que PHP lo llama automáticamente.
//
// DIFERENCIA CON GETTERS/SETTERS EXPLÍCITOS:
//   - Explícitos: un método por cada atributo (getPrecio,
//     setPrecio, getStock, setStock...)
//   - Mágicos: UN SOLO método __get y UN SOLO método __set
//     que manejan TODOS los atributos
// ============================================================


// ============================================================
// PARTE 1: Repaso — Con getters y setters explícitos (Tema 6)
// ============================================================

class ProductoConGettersSetters {
    public $nombre;
    private $precio;
    private $precioConDescuento;

    function __construct($nombre, $precio) {
        $this->nombre = $nombre;
        $this->precio = $precio;
        $this->precioConDescuento = $precio;
    }

    // Getter para leer el precio
    function getPrecio() {
        return $this->precio;
    }

    // Getter para leer el precio con descuento
    function getPrecioConDescuento() {
        return $this->precioConDescuento;
    }

    // Setter con lógica: valida el precio y resetea el descuento
    function setPrecio($nuevoPrecio) {
        if ($nuevoPrecio > 0) {
            $this->precio = $nuevoPrecio;
            $this->precioConDescuento = $nuevoPrecio;
            echo "Precio actualizado a \$$nuevoPrecio\n";
        } else {
            echo "El precio debe ser mayor a 0\n";
        }
    }

    function aplicarDescuento($porcentaje) {
        $this->precioConDescuento = $this->precio * (1 - $porcentaje / 100);
    }
}

echo "=== CON GETTERS Y SETTERS EXPLÍCITOS ===\n\n";

$producto1 = new ProductoConGettersSetters("Laptop", 999.99);

echo "Precio: \$" . $producto1->getPrecio() . "\n";
// Salida: Precio: $999.99

$producto1->aplicarDescuento(10);
echo "Con descuento: \$" . $producto1->getPrecioConDescuento() . "\n";
// Salida: Con descuento: $899.991

$producto1->setPrecio(1099.99);
// Salida: Precio actualizado a $1099.99

echo "Precio con descuento (se reseteó): \$" . $producto1->getPrecioConDescuento() . "\n";
// Salida: Precio con descuento (se reseteó): $1099.99

$producto1->setPrecio(-50);
// Salida: El precio debe ser mayor a 0


// ============================================================
// PARTE 2: La misma clase con __get y __set
// ============================================================
//
// Ahora vamos a reescribir la misma clase, pero en vez de
// tener getPrecio(), getPrecioConDescuento() y setPrecio(),
// usamos __get y __set.
//
// El resultado es que podemos escribir:
//   $producto->precio           en vez de   $producto->getPrecio()
//   $producto->precio = 1099    en vez de   $producto->setPrecio(1099)
//
// Se ve como si el atributo fuera público, pero por detrás
// se ejecuta la lógica de validación.
// ============================================================

class Producto {
    private $nombre;
    private $precio;
    private $precioConDescuento;

    function __construct($nombre, $precio) {
        $this->nombre = $nombre;
        $this->precio = $precio;
        $this->precioConDescuento = $precio;
    }

    // __get se llama automáticamente al LEER un atributo privado
    function __get($atributo) {
        if ($atributo == "nombre") {
            return $this->nombre;
        } elseif ($atributo == "precio") {
            return $this->precio;
        } elseif ($atributo == "precioConDescuento") {
            return $this->precioConDescuento;
        } else {
            echo "La propiedad '$atributo' no existe\n";
            return null;
        }
    }

    // __set se llama automáticamente al ESCRIBIR en un atributo privado
    function __set($atributo, $valor) {
        if ($atributo == "precio") {
            // Misma lógica que el setter del Tema 6
            if ($valor > 0) {
                $this->precio = $valor;
                $this->precioConDescuento = $valor; // Se resetea el descuento
                echo "Precio actualizado a \$$valor\n";
            } else {
                echo "El precio debe ser mayor a 0\n";
            }
        } elseif ($atributo == "nombre") {
            echo "El nombre no se puede cambiar\n";
        } else {
            echo "La propiedad '$atributo' no se puede modificar\n";
        }
    }

    function aplicarDescuento($porcentaje) {
        $this->precioConDescuento = $this->precio * (1 - $porcentaje / 100);
    }
}

echo "\n\n=== CON MÉTODOS MÁGICOS __get Y __set ===\n\n";

$producto2 = new Producto("Laptop", 999.99);

// Leer atributos privados — parece público, pero usa __get
echo "Precio: \$" . $producto2->precio . "\n";
// Salida: Precio: $999.99

$producto2->aplicarDescuento(10);
echo "Con descuento: \$" . $producto2->precioConDescuento . "\n";
// Salida: Con descuento: $899.991

// Cambiar precio — parece asignación directa, pero usa __set
$producto2->precio = 1099.99;
// Salida: Precio actualizado a $1099.99

echo "Precio con descuento (se reseteó): \$" . $producto2->precioConDescuento . "\n";
// Salida: Precio con descuento (se reseteó): $1099.99

// Intentar poner precio inválido — __set lo rechaza
$producto2->precio = -50;
// Salida: El precio debe ser mayor a 0

// Intentar cambiar el nombre — __set lo impide
$producto2->nombre = "Tablet";
// Salida: El nombre no se puede cambiar

// Intentar leer una propiedad que no existe
echo $producto2->color;
// Salida: La propiedad 'color' no existe

echo "\n";
echo "El nombre sigue siendo: " . $producto2->nombre . "\n";
// Salida: El nombre sigue siendo: Laptop

// ============================================================
// NOTA: El comportamiento es IDÉNTICO al de getters y setters
// explícitos, pero la sintaxis es más natural:
//
//   ANTES (Tema 6):                AHORA (Tema 6b):
//   $producto->getPrecio()         $producto->precio
//   $producto->setPrecio(1099)     $producto->precio = 1099
//
// ¿Cuándo usar cada uno?
//   - Getters/setters explícitos: cuando cada atributo tiene
//     lógica muy diferente y querés que sea claro qué hace cada
//     método.
//   - __get/__set: cuando querés una sintaxis más limpia y
//     el manejo es uniforme para varios atributos.
// ============================================================

