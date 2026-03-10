<?php
// ============================================================
// TEMA 6: Getters y Setters — Acceso controlado a atributos privados
// ============================================================
//
// OBJETIVO: Aprender a leer y modificar atributos privados
// de forma controlada.
//
// EXPLICACIÓN:
// En el tema anterior vimos que los atributos private no se
// pueden leer ni modificar desde fuera. Pero a veces necesitamos
// hacerlo de forma CONTROLADA. Para eso existen:
//
//   - GETTER: método que permite LEER un atributo privado
//     (convencionalmente se llama getAtributo)
//
//   - SETTER: método que permite MODIFICAR un atributo privado,
//     pudiendo agregar validaciones o lógica extra
//     (convencionalmente se llama setAtributo)
//
// La ventaja de un setter es que podemos agregar lógica al
// momento de cambiar un valor. Por ejemplo, al cambiar el
// precio, podemos recalcular automáticamente el precio con
// descuento.
// ============================================================

class Producto {
    public $nombre;
    private $precio;
    private $precioConDescuento;

    function __construct($nombre, $precio) {
        $this->nombre = $nombre;
        $this->precio = $precio;
        $this->precioConDescuento = $precio;
    }

    // GETTER: permite leer el precio desde fuera
    function getPrecio() {
        return $this->precio;
    }

    // GETTER: permite leer el precio con descuento desde fuera
    function getPrecioConDescuento() {
        return $this->precioConDescuento;
    }

    // SETTER: al cambiar el precio, se recalcula automáticamente
    // el precio con descuento
    function setPrecio($nuevoPrecio) {
        if ($nuevoPrecio > 0) {
            $this->precio = $nuevoPrecio;
            $this->precioConDescuento = $nuevoPrecio; // Se resetea el descuento
            echo "Precio actualizado a \$$nuevoPrecio\n";
        } else {
            echo "El precio debe ser mayor a 0\n";
        }
    }

    function aplicarDescuento($porcentaje) {
        $this->precioConDescuento = $this->precio * (1 - $porcentaje / 100);
    }
}

$producto = new Producto("Laptop", 999.99);

// Leer atributos privados con getters
echo "Precio: \$" . $producto->getPrecio() . "\n";
// Salida: Precio: $999.99

echo "Precio con descuento: \$" . $producto->getPrecioConDescuento() . "\n";
// Salida: Precio con descuento: $999.99

echo "\n";

// Aplicar descuento del 10%
$producto->aplicarDescuento(10);
echo "Después del 10% de descuento: \$" . $producto->getPrecioConDescuento() . "\n";
// Salida: Después del 10% de descuento: $899.991

echo "\n";

// Cambiar precio con setter (resetea el descuento automáticamente)
$producto->setPrecio(1099.99);
// Salida: Precio actualizado a $1099.99

echo "Nuevo precio: \$" . $producto->getPrecio() . "\n";
// Salida: Nuevo precio: $1099.99

echo "Precio con descuento (se reseteó): \$" . $producto->getPrecioConDescuento() . "\n";
// Salida: Precio con descuento (se reseteó): $1099.99

echo "\n";

// Intentar poner un precio inválido
$producto->setPrecio(-50);
// Salida: El precio debe ser mayor a 0

// El precio no cambió
echo "Precio sigue siendo: \$" . $producto->getPrecio() . "\n";
// Salida: Precio sigue siendo: $1099.99

// ============================================================
// EJERCICIO:
// Modificar la clase CuentaCliente del tema anterior para que:
//   - depositar y comprar sigan funcionando igual
//   - Agregar un getter getSaldo() que devuelva el saldo
//   - Agregar un atributo private $limiteGasto (se define en
//     el constructor)
//   - Agregar un getter getLimiteGasto()
//   - Agregar un setter setLimiteGasto($nuevoLimite) que solo
//     permita valores positivos
//   - Modificar comprar() para que no permita compras que
//     superen el límite de gasto
//
// Ejemplo:
//   $cuenta = new CuentaCliente("Ana", 200); // límite de $200
//   $cuenta->depositar(500);
//   echo $cuenta->getSaldo();        // 500
//   echo $cuenta->getLimiteGasto();   // 200
//   $cuenta->comprar(150);           // Compra exitosa
//   $cuenta->comprar(250);           // Error: supera el límite
//   $cuenta->setLimiteGasto(300);    // Límite actualizado
//   $cuenta->comprar(250);           // Ahora sí funciona
// ============================================================
