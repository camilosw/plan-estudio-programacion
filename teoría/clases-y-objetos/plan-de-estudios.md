# Plan de Estudios: Clases y Objetos en PHP

## Contexto

Aprender clases y objetos. El plan va de lo más básico a un nivel intermedio. Se usa una **tienda online** como hilo conductor para todos los ejemplos y ejercicios, haciendo los conceptos tangibles y conectados entre sí.

---

## Estructura del plan

Cada tema sigue el formato:

1. **Explicación** breve del concepto
2. **Ejemplo de código** con contexto de tienda online
3. **Ejercicio práctico** para que la alumna resuelva

---

## Tema 1: ¿Qué es una clase? — La clase como molde de datos

**Objetivo:** Entender que una clase es un molde para crear "cosas" con información dentro.

**Explicación:** Comparar con la vida real: una ficha de producto en una tienda tiene siempre los mismos campos (nombre, precio, stock). La clase es el molde de esa ficha; cada producto concreto es un objeto.

**Ejemplo:**

```php
class Producto {
    public $nombre;
    public $precio;
    public $stock;
}

// Crear un objeto (un producto concreto)
$camiseta = new Producto();
$camiseta->nombre = "Camiseta azul";
$camiseta->precio = 19.99;
$camiseta->stock = 50;

echo $camiseta->nombre; // Camiseta azul
echo $camiseta->precio; // 19.99
```

**Ejercicio:**
Crear una clase `Cliente` con los atributos `nombre`, `email` y `telefono`. Luego crear 2 clientes distintos y mostrar sus datos con `echo`.

---

## Tema 2: El constructor — Crear objetos con datos desde el inicio

**Objetivo:** Evitar asignar atributos uno por uno usando `__construct`.

**Explicación:** El constructor es una función especial que se ejecuta automáticamente al crear el objeto. Permite pasar los datos directamente al momento de crearlo.

**Ejemplo:**

```php
class Producto {
    public $nombre;
    public $precio;
    public $stock;

    function __construct($nombre, $precio, $stock) {
        $this->nombre = $nombre;
        $this->precio = $precio;
        $this->stock = $stock;
    }
}

// Ahora se crea en una sola línea
$camiseta = new Producto("Camiseta azul", 19.99, 50);
echo $camiseta->nombre; // Camiseta azul
```

**Ejercicio:**
Modificar la clase `Cliente` del tema anterior para que use constructor. Crear 2 clientes usando el constructor y mostrar sus datos.

---

## Tema 3: Métodos — Funciones dentro de la clase

**Objetivo:** Entender que las clases pueden tener funciones (métodos) que operan sobre sus propios datos.

**Explicación:** Así como una ficha de producto puede tener acciones ("aplicar descuento", "reducir stock"), una clase puede tener funciones que trabajan con sus atributos.

**Ejemplo:**

```php
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

    function aplicarDescuento($porcentaje) {
        $this->precioConDescuento = $this->precio * (1 - $porcentaje / 100);
    }

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

$camiseta = new Producto("Camiseta azul", 19.99, 50);
$camiseta->mostrarInfo();       // Camiseta azul - Precio: $19.99 - Con descuento: $19.99 - Stock: 50
$camiseta->aplicarDescuento(10);
$camiseta->vender(3);
$camiseta->mostrarInfo();       // Camiseta azul - Precio: $19.99 - Con descuento: $17.991 - Stock: 47
```

**Nota:** El precio original no se pierde. `$precioConDescuento` guarda el precio final después del descuento.

**Ejercicio:**
Crear una clase `Cliente` con:

- Atributos: `$nombre`, `$email`, `$puntos` (empieza en 0)
- Un método `comprar($monto)` que sume 1 punto por cada $10 gastados (usar división entera)
- Un método `mostrarPuntos()` que imprima el nombre del cliente y sus puntos acumulados

Crear un cliente, hacer varias compras y mostrar los puntos acumulados.

---

## Tema 4: Métodos que devuelven valores vs. métodos que imprimen

**Objetivo:** Distinguir entre métodos que hacen `echo` y métodos que usan `return`, y cuándo usar cada uno.

**Explicación:** Un método puede imprimir directamente o devolver un valor para que lo usemos después. `return` es más flexible porque permite usar el resultado en otras operaciones.

**Ejemplo:**

```php
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

// Podemos usar el valor devuelto de muchas formas
$precioFinal = $producto->precioConIva(21);
echo "Precio con IVA: \$$precioFinal\n";

// También podemos usarlo en cálculos
$precioConEnvio = $producto->precioConIva(21) + 15;
```

**Ejercicio:**
Modificar la clase `Producto` para que el método `aplicarDescuento` use `return` (devuelva el precio con descuento) en vez de modificar el atributo directamente. Luego usar el valor devuelto para:

1. Mostrar el precio con descuento
2. Calcular el precio con descuento + 21% de IVA
3. Comparar si el precio con descuento es menor a $15

---

## Tema 5: Visibilidad — public, private y protected

**Objetivo:** Entender por qué no siempre queremos que los datos de un objeto sean accesibles desde fuera.

**Explicación:** Hasta ahora todo era `public` (cualquiera puede leer y modificar). Pero a veces queremos proteger los datos. Por ejemplo, no queremos que alguien pueda cambiar el stock de un producto directamente desde fuera — solo debería cambiar cuando se vende algo.

- `public`: accesible desde cualquier lugar
- `private`: solo accesible dentro de la propia clase
- `protected`: accesible dentro de la clase y sus clases hijas (se verá con herencia)

**Ejemplo:**

```php
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

    function aplicarDescuento($porcentaje) {
        if ($porcentaje > 0 && $porcentaje <= 50) {
            $this->precioConDescuento = $this->precio * (1 - $porcentaje / 100);
            echo "Descuento aplicado. Precio con descuento: \$$this->precioConDescuento\n";
        } else {
            echo "Descuento no válido (debe ser entre 1% y 50%)\n";
        }
    }

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

$producto->aplicarDescuento(10);
$producto->vender(2);
$producto->mostrarInfo();

// Esto funciona (public):
echo $producto->nombre;
echo $producto->precio;

// Esto da ERROR (private):
// echo $producto->precioConDescuento;  // No se puede leer desde fuera
// echo $producto->stock;                // No se puede leer desde fuera
// $producto->stock = 999;               // No se puede modificar desde fuera
```

**Nota para la explicación:** Los atributos privados solo se pueden leer o modificar a través de los métodos de la clase. Esto protege la integridad de los datos — por ejemplo, el stock solo cambia cuando se vende algo, y el descuento solo se aplica si es válido.

**Ejercicio:**
Crear una clase `CuentaCliente` con:

- `public $nombre`
- `private $saldo` (empieza en 0)
- Método `depositar($cantidad)` — solo permite cantidades positivas
- Método `comprar($cantidad)` — solo permite comprar si hay saldo suficiente
- Método `mostrarSaldo()` — imprime el nombre y el saldo actual

Crear un cliente, hacer depósitos y compras, y verificar que no se puede acceder a `$saldo` directamente desde fuera.

---

## Tema 6: Getters y Setters — Acceso controlado a atributos privados

**Objetivo:** Aprender a leer y modificar atributos privados de forma controlada.

**Explicación:** En el tema anterior vimos que los atributos privados no se pueden leer ni modificar desde fuera. Pero a veces necesitamos hacerlo de forma controlada. Para eso existen los getters y setters:

- **Getter**: método que permite _leer_ un atributo privado
- **Setter**: método que permite _modificar_ un atributo privado, pudiendo agregar validaciones o lógica extra

**Ejemplo:**

```php
class Producto {
    public $nombre;
    private $precio;
    private $precioConDescuento;

    function __construct($nombre, $precio) {
        $this->nombre = $nombre;
        $this->precio = $precio;
        $this->precioConDescuento = $precio;
    }

    // Getter: permite leer el precio desde fuera
    function getPrecio() {
        return $this->precio;
    }

    // Getter: permite leer el precio con descuento desde fuera
    function getPrecioConDescuento() {
        return $this->precioConDescuento;
    }

    // Setter: al cambiar el precio, se recalcula automáticamente el precio con descuento
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
echo $producto->getPrecio();             // 999.99
echo $producto->getPrecioConDescuento(); // 999.99

// Aplicar descuento
$producto->aplicarDescuento(10);
echo $producto->getPrecioConDescuento(); // 899.991

// Cambiar precio con setter (resetea el descuento automáticamente)
$producto->setPrecio(1099.99);
echo $producto->getPrecioConDescuento(); // 1099.99 (se reseteó)

// Intentar poner precio inválido
$producto->setPrecio(-50); // "El precio debe ser mayor a 0"
```

**Nota para la explicación:** La ventaja del setter `setPrecio` es que al cambiar el precio, automáticamente recalcula el `precioConDescuento`. Si el precio fuera público y se cambiara directamente, el `precioConDescuento` quedaría desactualizado.

**Ejercicio:**
Modificar la clase `CuentaCliente` del tema anterior para que:

- `depositar` y `comprar` sigan funcionando igual
- Agregar un getter `getSaldo()` que devuelva el saldo
- Agregar un atributo `private $limiteGasto` (se define en el constructor)
- Agregar un getter `getLimiteGasto()`
- Agregar un setter `setLimiteGasto($nuevoLimite)` que solo permita valores positivos
- Modificar `comprar()` para que no permita compras que superen el límite de gasto

---

## Tema 7: Herencia — Clases que heredan de otras

**Objetivo:** Reutilizar código creando clases hijas que extienden una clase padre.

**Nota:** Aquí se retoma `protected` — se explica que los atributos `protected` son accesibles en las clases hijas pero no desde fuera, a diferencia de `private`.

**Explicación:** En una tienda online hay distintos tipos de productos: ropa, electrónica, comida. Todos tienen nombre, precio y stock, pero cada tipo puede tener atributos y comportamientos extra. En vez de repetir código, creamos una clase base y la extendemos.

**Ejemplo:**

```php
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

    function mostrarInfo() {
        echo "$this->nombre - \$$this->precio - Stock: $this->stock\n";
    }
}

class ProductoRopa extends Producto {
    public $talla;
    public $color;

    function __construct($nombre, $precio, $stock, $talla, $color) {
        parent::__construct($nombre, $precio, $stock);
        $this->talla = $talla;
        $this->color = $color;
    }

    function mostrarInfo() {
        parent::mostrarInfo();
        echo "  Talla: $this->talla, Color: $this->color\n";
    }
}

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

$camiseta = new ProductoRopa("Camiseta", 19.99, 50, "M", "Azul");
$laptop = new ProductoElectronico("Laptop", 999.99, 10, 24);

$camiseta->mostrarInfo();
$laptop->mostrarInfo();
```

**Nota para la explicación:** Aquí se ve por qué existe `protected` — los atributos `$precio` y `$stock` son accesibles en las clases hijas pero no desde fuera.

**Ejercicio:**
Crear una clase base `Usuario` con `nombre` y `email`. Luego crear dos clases hijas:

- `ClienteVip` que tenga un atributo extra `$descuentoVip` y un método `aplicarDescuento($precio)` que devuelva el precio con el descuento
- `Administrador` que tenga un atributo extra `$nivel` y un método `puedeEliminarProductos()` que devuelva `true` si el nivel es mayor a 2

---

## Tema 8: Propiedades y métodos estáticos

**Objetivo:** Entender que hay datos y funciones que pertenecen a la clase en sí, no a un objeto en particular.

**Explicación:** A veces hay valores que son iguales para todos los productos y nunca cambian, como el porcentaje de IVA. No tiene sentido que cada producto guarde su propia copia del IVA — es un dato de la clase en general. Para esto usamos `static`.

- Una **propiedad estática** se comparte entre todos los objetos de la clase. Se define con `static` y se accede con `self::` dentro de la clase o `NombreClase::` desde fuera.
- Un **método estático** se puede llamar sin crear un objeto, usando `NombreClase::metodo()`. Es útil para operaciones que no dependen de un objeto específico.

**Ejemplo:**

```php
class Producto {
    public $nombre;
    public $precio;
    private static $porcentajeIva = 21;

    function __construct($nombre, $precio) {
        $this->nombre = $nombre;
        $this->precio = $precio;
    }

    // Método estático: calcula el IVA de cualquier precio, sin necesitar un objeto
    static function calcularIva($precio) {
        return $precio * self::$porcentajeIva / 100;
    }

    // Método estático: devuelve un precio con IVA incluido
    static function precioConIva($precio) {
        return $precio + self::calcularIva($precio);
    }

    // Método normal: usa el precio del objeto
    function getPrecioConIva() {
        return self::precioConIva($this->precio);
    }

    function mostrarInfo() {
        $conIva = $this->getPrecioConIva();
        echo "$this->nombre - Precio: \$$this->precio - Con IVA: \$$conIva\n";
    }
}

// Los métodos estáticos se pueden usar SIN crear un producto
echo Producto::calcularIva(100);    // 21
echo Producto::precioConIva(100);   // 121

// También funcionan con objetos
$laptop = new Producto("Laptop", 999.99);
$laptop->mostrarInfo(); // Laptop - Precio: $999.99 - Con IVA: $1209.9879
```

**Nota para la explicación:** La diferencia clave:

- `$this->precio` pertenece a UN producto específico (cada producto tiene su precio)
- `self::$porcentajeIva` pertenece a la CLASE — es el mismo para todos los productos
- Los métodos estáticos no pueden usar `$this` porque no están vinculados a un objeto

**Ejercicio:**
Crear una clase `Envio` con:

- Una propiedad estática `$costoPorKilo` con valor 5 (el costo por kilo es igual para todos los envíos)
- Un atributo `$destino` y un atributo `$pesoKg`
- Un método estático `calcularCosto($peso)` que devuelva el costo de envío (peso \* costo por kilo)
- Un método normal `getCostoEnvio()` que devuelva el costo de envío del objeto usando su propio peso
- Un método `mostrarEnvio()` que muestre destino, peso y costo

Crear 2 envíos con destinos y pesos distintos. También usar el método estático directamente para calcular el costo de un envío de 3 kg sin crear un objeto.

---

## Tema 9: Proyecto integrador — Mini tienda online

**Objetivo:** Integrar todos los conceptos en un ejercicio completo.

**Ejercicio final:**
Construir un sistema simple de tienda online que use todas las clases creadas durante el curso:

1. Clase `Producto` (con herencia: `ProductoRopa`, `ProductoElectronico`)
2. Clase `Cliente` (con visibilidad private para el saldo)
3. Clase `CarritoDeCompras` (con métodos para agregar, eliminar y calcular total)
4. Clase `Pedido` (con contador estático de pedidos)

Flujo del programa:

```
- Crear varios productos de distintos tipos
- Crear un cliente con saldo
- El cliente agrega productos al carrito
- El cliente realiza el pedido (se descuenta del saldo)
- Mostrar resumen del pedido con número de pedido, productos y total
```

---

## Resumen de progresión

| Tema | Concepto clave      | Lo que aprende                               |
| ---- | ------------------- | -------------------------------------------- |
| 1    | Clase con atributos | Qué es una clase, `new`, `->`                |
| 2    | Constructor         | `__construct`, `$this`                       |
| 3    | Métodos             | Funciones dentro de la clase                 |
| 4    | Return vs echo      | Métodos que devuelven valores                |
| 5    | Visibilidad         | `public`, `private`, `protected`             |
| 6    | Getters y Setters   | Acceso controlado, lógica en setters         |
| 7    | Herencia            | `extends`, `parent::`, sobrescritura         |
| 8    | Estáticos           | `static`, `self::`, IVA como dato compartido |
| 9    | Integración         | Proyecto que combina todo                    |

---

## Archivos a crear

Se creará un archivo PHP por cada tema dentro de la carpeta del proyecto:

- `tema1_clases_basicas.php`
- `tema2_constructor.php`
- `tema3_metodos.php`
- `tema4_return_vs_echo.php`
- `tema5_visibilidad.php`
- `tema6_getters_setters.php`
- `tema7_herencia.php`
- `tema8_estaticos.php`
- `tema9_proyecto_integrador.php`

Cada archivo contendrá la explicación como comentarios, el ejemplo de código funcional y el ejercicio como comentario al final.

## Verificación

- Cada archivo PHP debe ejecutarse sin errores con `php nombrearchivo.php`
- Los ejemplos deben producir la salida esperada indicada en los comentarios
