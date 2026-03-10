<?php
// ============================================================
// TEMA 8: Propiedades y métodos estáticos
// ============================================================
//
// OBJETIVO: Entender que hay datos y funciones que pertenecen
// a la CLASE en sí, no a un objeto en particular.
//
// EXPLICACIÓN:
// A veces hay valores que son iguales para todos los productos
// y nunca cambian, como el porcentaje de IVA. No tiene sentido
// que cada producto guarde su propia copia del IVA — es un
// dato de la clase en general.
//
// Para esto usamos STATIC:
//
//   - Propiedad estática: se comparte entre todos los objetos.
//     Se define con "static" y se accede con self:: dentro
//     de la clase, o NombreClase:: desde fuera.
//
//   - Método estático: se puede llamar SIN crear un objeto.
//     Útil para operaciones que no dependen de un objeto
//     específico.
//
// Diferencia clave:
//   $this->precio    → pertenece a UN producto específico
//   self::$iva       → pertenece a la CLASE (es igual para todos)
//
// IMPORTANTE: Los métodos estáticos NO pueden usar $this
// porque no están vinculados a ningún objeto.
// ============================================================

class Producto {
    public $nombre;
    public $precio;
    private static $porcentajeIva = 21;

    function __construct($nombre, $precio) {
        $this->nombre = $nombre;
        $this->precio = $precio;
    }

    // Método estático: calcula el IVA de cualquier precio
    // No necesita un objeto — solo usa el dato de la clase
    static function calcularIva($precio) {
        return $precio * self::$porcentajeIva / 100;
    }

    // Método estático: devuelve un precio con IVA incluido
    static function precioConIva($precio) {
        return $precio + self::calcularIva($precio);
    }

    // Método normal: usa el precio del objeto + el método estático
    function getPrecioConIva() {
        return self::precioConIva($this->precio);
    }

    function mostrarInfo() {
        $conIva = $this->getPrecioConIva();
        echo "$this->nombre - Precio: \$$this->precio - Con IVA: \$$conIva\n";
    }
}

// ---- Métodos estáticos: se pueden usar SIN crear un producto ----
echo "=== Usando métodos estáticos directamente ===\n";
echo "IVA de \$100: \$" . Producto::calcularIva(100) . "\n";
// Salida: IVA de $100: $21

echo "Precio con IVA de \$100: \$" . Producto::precioConIva(100) . "\n";
// Salida: Precio con IVA de $100: $121

echo "\n";

// ---- También funcionan con objetos ----
echo "=== Usando con objetos ===\n";
$laptop = new Producto("Laptop", 999.99);
$laptop->mostrarInfo();
// Salida: Laptop - Precio: $999.99 - Con IVA: $1209.9879

$camiseta = new Producto("Camiseta", 19.99);
$camiseta->mostrarInfo();
// Salida: Camiseta - Precio: $19.99 - Con IVA: $24.1879

// Nota: el IVA es el mismo (21%) para ambos productos
// porque es una propiedad ESTÁTICA (de la clase, no del objeto)

// ============================================================
// EJERCICIO:
// Crear una clase Envio con:
//   - Una propiedad estática $costoPorKilo con valor 5
//     (el costo por kilo es igual para todos los envíos)
//   - Un atributo $destino y un atributo $pesoKg
//   - Un constructor que reciba destino y peso
//   - Un método estático calcularCosto($peso) que devuelva
//     el costo de envío (peso * costo por kilo)
//   - Un método normal getCostoEnvio() que devuelva el costo
//     del envío usando su propio peso
//   - Un método mostrarEnvio() que muestre destino, peso y costo
//
// Ejemplo:
//   // Usar el método estático directamente (sin crear objeto)
//   echo Envio::calcularCosto(3); // 15
//
//   // Crear envíos
//   $envio1 = new Envio("Madrid", 2.5);
//   $envio1->mostrarEnvio(); // Madrid - 2.5 kg - Costo: $12.5
//
//   $envio2 = new Envio("Barcelona", 5);
//   $envio2->mostrarEnvio(); // Barcelona - 5 kg - Costo: $25
// ============================================================
