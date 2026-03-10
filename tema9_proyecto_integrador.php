<?php
// ============================================================
// TEMA 9: Proyecto integrador — Mini tienda online
// ============================================================
//
// OBJETIVO: Integrar todos los conceptos aprendidos en un
// ejercicio completo que simula una tienda online.
//
// Conceptos utilizados:
//   - Clases y objetos (Tema 1)
//   - Constructor (Tema 2)
//   - Métodos (Tema 3)
//   - Return vs echo (Tema 4)
//   - Visibilidad (Tema 5)
//   - Getters y Setters (Tema 6)
//   - Herencia (Tema 7)
//   - Propiedades estáticas (Tema 8)
// ============================================================


// --- Clase base Producto (herencia, visibilidad, protected) ---

class Producto {
    public $nombre;
    protected $precio;
    protected $stock;

    function __construct($nombre, $precio, $stock) {
        $this->nombre = $nombre;
        $this->precio = $precio;
        $this->stock = $stock;
    }

    function getPrecio() {
        return $this->precio;
    }

    function getStock() {
        return $this->stock;
    }

    function vender($cantidad) {
        if ($cantidad <= $this->stock) {
            $this->stock -= $cantidad;
            return true;
        }
        return false;
    }

    function mostrarInfo() {
        echo "  $this->nombre - \$$this->precio - Stock: $this->stock\n";
    }
}


// --- Clases hijas (herencia) ---

class ProductoRopa extends Producto {
    public $talla;

    function __construct($nombre, $precio, $stock, $talla) {
        parent::__construct($nombre, $precio, $stock);
        $this->talla = $talla;
    }

    function mostrarInfo() {
        echo "  $this->nombre (Talla $this->talla) - \$$this->precio - Stock: $this->stock\n";
    }
}

class ProductoElectronico extends Producto {
    public $garantiaMeses;

    function __construct($nombre, $precio, $stock, $garantiaMeses) {
        parent::__construct($nombre, $precio, $stock);
        $this->garantiaMeses = $garantiaMeses;
    }

    function mostrarInfo() {
        echo "  $this->nombre (Garantía: {$this->garantiaMeses}m) - \$$this->precio - Stock: $this->stock\n";
    }
}


// --- Clase Cliente (visibilidad, getters/setters) ---

class Cliente {
    public $nombre;
    private $saldo;

    function __construct($nombre, $saldoInicial) {
        $this->nombre = $nombre;
        $this->saldo = $saldoInicial;
    }

    function getSaldo() {
        return $this->saldo;
    }

    function cobrar($monto) {
        if ($monto <= $this->saldo) {
            $this->saldo -= $monto;
            return true;
        }
        return false;
    }
}


// --- Clase CarritoDeCompras (métodos, return) ---

class CarritoDeCompras {
    private $items;  // Array de productos en el carrito

    function __construct() {
        $this->items = [];
    }

    function agregar($producto, $cantidad) {
        if ($producto->getStock() >= $cantidad) {
            $this->items[] = [
                "producto" => $producto,
                "cantidad" => $cantidad
            ];
            echo "  Agregado: $producto->nombre x$cantidad\n";
            return true;
        }
        echo "  No hay suficiente stock de $producto->nombre\n";
        return false;
    }

    function calcularTotal() {
        $total = 0;
        foreach ($this->items as $item) {
            $total += $item["producto"]->getPrecio() * $item["cantidad"];
        }
        return $total;
    }

    function getItems() {
        return $this->items;
    }

    function vaciar() {
        $this->items = [];
    }

    function mostrarCarrito() {
        if (empty($this->items)) {
            echo "  (carrito vacío)\n";
            return;
        }
        foreach ($this->items as $item) {
            $nombre = $item["producto"]->nombre;
            $precio = $item["producto"]->getPrecio();
            $cantidad = $item["cantidad"];
            $subtotal = $precio * $cantidad;
            echo "  $nombre x$cantidad = \$$subtotal\n";
        }
        echo "  TOTAL: \$" . $this->calcularTotal() . "\n";
    }
}


// --- Clase Pedido (estáticos) ---

class Pedido {
    private static $totalPedidos = 0;
    private static $porcentajeIva = 21;

    public $numeroPedido;
    public $cliente;
    private $items;
    private $total;

    function __construct($cliente, $items, $total) {
        self::$totalPedidos++;
        $this->numeroPedido = self::$totalPedidos;
        $this->cliente = $cliente;
        $this->items = $items;
        $this->total = $total;
    }

    static function getTotalPedidos() {
        return self::$totalPedidos;
    }

    function getTotalConIva() {
        return $this->total * (1 + self::$porcentajeIva / 100);
    }

    function mostrarResumen() {
        echo "╔══════════════════════════════════════╗\n";
        echo "║  PEDIDO #$this->numeroPedido\n";
        echo "║  Cliente: {$this->cliente->nombre}\n";
        echo "║  --------------------------------\n";
        foreach ($this->items as $item) {
            $nombre = $item["producto"]->nombre;
            $precio = $item["producto"]->getPrecio();
            $cantidad = $item["cantidad"];
            echo "║  $nombre x$cantidad = \$" . ($precio * $cantidad) . "\n";
        }
        echo "║  --------------------------------\n";
        echo "║  Subtotal: \$$this->total\n";
        echo "║  IVA (" . self::$porcentajeIva . "%): \$" . ($this->total * self::$porcentajeIva / 100) . "\n";
        echo "║  TOTAL: \$" . $this->getTotalConIva() . "\n";
        echo "╚══════════════════════════════════════╝\n";
    }
}


// ============================================================
// FLUJO PRINCIPAL DE LA TIENDA
// ============================================================

echo "🏪 === MINI TIENDA ONLINE ===\n\n";

// 1. Crear productos
echo "📦 Productos disponibles:\n";
$camiseta = new ProductoRopa("Camiseta azul", 19.99, 50, "M");
$laptop = new ProductoElectronico("Laptop HP", 999.99, 10, 24);
$zapatillas = new ProductoRopa("Zapatillas Nike", 79.99, 25, "42");

$camiseta->mostrarInfo();
$laptop->mostrarInfo();
$zapatillas->mostrarInfo();

echo "\n";

// 2. Crear un cliente con saldo
$cliente = new Cliente("Sandra", 1500);
echo "👤 Cliente: $cliente->nombre (Saldo: \$" . $cliente->getSaldo() . ")\n\n";

// 3. Agregar productos al carrito
echo "🛒 Agregando al carrito:\n";
$carrito = new CarritoDeCompras();
$carrito->agregar($camiseta, 2);
$carrito->agregar($laptop, 1);
$carrito->agregar($zapatillas, 1);

echo "\n📋 Contenido del carrito:\n";
$carrito->mostrarCarrito();

echo "\n";

// 4. Realizar el pedido
$total = $carrito->calcularTotal();
echo "💳 Procesando pedido por \$$total...\n";

if ($cliente->cobrar($total)) {
    // Reducir stock de cada producto
    foreach ($carrito->getItems() as $item) {
        $item["producto"]->vender($item["cantidad"]);
    }

    // Crear el pedido
    $pedido = new Pedido($cliente, $carrito->getItems(), $total);
    $carrito->vaciar();

    echo "\n";
    $pedido->mostrarResumen();

    echo "\n👤 Saldo restante de $cliente->nombre: \$" . $cliente->getSaldo() . "\n";
    echo "📊 Total de pedidos realizados: " . Pedido::getTotalPedidos() . "\n";
} else {
    echo "❌ Saldo insuficiente\n";
}

echo "\n📦 Stock actualizado:\n";
$camiseta->mostrarInfo();
$laptop->mostrarInfo();
$zapatillas->mostrarInfo();

// ============================================================
// EJERCICIO PARA LA ALUMNA:
// Construir este mismo sistema desde cero, paso a paso:
//
// 1. Crear la clase Producto con herencia (ProductoRopa,
//    ProductoElectronico)
// 2. Crear la clase Cliente con saldo privado
// 3. Crear la clase CarritoDeCompras con métodos para agregar,
//    calcular total y mostrar
// 4. Crear la clase Pedido con contador estático y IVA estático
//
// Luego simular el flujo completo:
//   - Crear productos variados
//   - Crear un cliente
//   - Agregar productos al carrito
//   - Procesar el pedido
//   - Mostrar el resumen
// ============================================================
