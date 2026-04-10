# Hoja de Referencia — Clases y Objetos (PHP)

Resumen de toda la sintaxis del módulo, organizada por tema. Úsala como consulta rápida cuando no recuerdes cómo se escribe algo.

---

## Clases y objetos básicos

| Sintaxis                       | Qué hace                      |
| ------------------------------ | ----------------------------- |
| `class NombreClase { }`        | Define una clase              |
| `public $propiedad;`           | Declara una propiedad pública |
| `$objeto = new NombreClase();` | Crea un objeto (instancia)    |
| `$objeto->propiedad`           | Lee o escribe una propiedad   |
| `$objeto->metodo()`            | Llama a un método             |

```php
class Producto {
    public $nombre;
    public $precio;
}

$camiseta = new Producto();
$camiseta->nombre = "Camiseta azul";
$camiseta->precio = 19.99;
```

---

## Constructor

| Sintaxis                        | Qué hace                                         |
| ------------------------------- | ------------------------------------------------ |
| `function __construct(...) { }` | Se ejecuta automáticamente al crear el objeto    |
| `$this->propiedad = $valor;`    | Asigna un valor a la propiedad del objeto actual |

```php
class Producto {
    public $nombre;
    public $precio;

    function __construct($nombre, $precio) {
        $this->nombre  = $nombre;
        $this->precio  = $precio;
    }
}

$camiseta = new Producto("Camiseta azul", 19.99);
```

---

## Métodos

| Sintaxis                      | Qué hace                                |
| ----------------------------- | --------------------------------------- |
| `function nombreMetodo() { }` | Define un método dentro de la clase     |
| `$this->propiedad`            | Accede a la propiedad del propio objeto |
| `$this->otroMetodo()`         | Llama a otro método del mismo objeto    |

```php
class Producto {
    public $nombre;
    public $precio;
    public $stock;

    function vender($cantidad) {
        if ($cantidad <= $this->stock) {
            $this->stock -= $cantidad;
        }
    }

    function mostrarInfo() {
        echo "Producto: {$this->nombre}, Precio: {$this->precio}";
    }
}
```

---

## Return vs Echo

| Situación                                    | Qué usar |
| -------------------------------------------- | -------- |
| El método entrega un valor para usar después | `return` |
| El método solo muestra algo en pantalla      | `echo`   |

```php
// Con return — el valor se puede guardar, calcular, comparar
function precioConIva($porcentaje) {
    return $this->precio * (1 + $porcentaje / 100);
}

$total = $producto->precioConIva(21);       // guarda el valor
echo $producto->precioConIva(21);           // muestra el valor
$esBarato = $producto->precioConIva(21) < 50; // compara el valor

// Con echo — solo muestra, no se puede reusar
function mostrarPrecio() {
    echo "Precio: " . $this->precio;
}
```

---

## Visibilidad

| Modificador | Desde la clase | Desde clases hijas | Desde fuera |
| ----------- | -------------- | ------------------ | ----------- |
| `public`    | Sí             | Sí                 | Sí          |
| `protected` | Sí             | Sí                 | No          |
| `private`   | Sí             | No                 | No          |

```php
class Producto {
    public    $nombre;       // accesible desde cualquier lugar
    protected $precio;       // accesible en la clase y en clases hijas
    private   $stock;        // solo accesible dentro de esta clase

    function vender($cantidad) {
        if ($cantidad <= $this->stock) {   // ok: acceso interno
            $this->stock -= $cantidad;
        }
    }
}

$p = new Producto("Laptop", 999.99, 10);
echo $p->nombre;   // ok: public
// echo $p->stock; // ERROR: private
```

---

## Getters y Setters

### Explícitos (recomendados)

| Convención                   | Ejemplo                           |
| ---------------------------- | --------------------------------- |
| `getNombrePropiedad()`       | Devuelve el valor de la propiedad |
| `setNombrePropiedad($valor)` | Establece el valor con validación |

```php
class Producto {
    private $precio;

    function getPrecio() {
        return $this->precio;
    }

    function setPrecio($nuevoPrecio) {
        if ($nuevoPrecio > 0) {
            $this->precio = $nuevoPrecio;
        }
    }
}

$p->setPrecio(29.99);
echo $p->getPrecio();
```

### Métodos mágicos `__get` y `__set`

| Método mágico              | Cuándo se ejecuta                                  |
| -------------------------- | -------------------------------------------------- |
| `__get($atributo)`         | Al leer una propiedad privada o inexistente        |
| `__set($atributo, $valor)` | Al escribir en una propiedad privada o inexistente |

```php
class Producto {
    private $precio;

    function __get($atributo) {
        if ($atributo === "precio") {
            return $this->precio;
        }
    }

    function __set($atributo, $valor) {
        if ($atributo === "precio" && $valor > 0) {
            $this->precio = $valor;
        }
    }
}

$p->precio = 29.99;   // llama a __set
echo $p->precio;      // llama a __get
```

---

## Herencia

| Sintaxis                       | Qué hace                                             |
| ------------------------------ | ---------------------------------------------------- |
| `class Hija extends Padre { }` | La clase hija hereda propiedades y métodos del padre |
| `parent::__construct(...)`     | Llama al constructor del padre                       |
| `parent::nombreMetodo()`       | Llama a un método del padre                          |
| Redefinir un método en la hija | Sobrescribe el comportamiento (override)             |

```php
class Producto {
    protected $nombre;
    protected $precio;

    function __construct($nombre, $precio) {
        $this->nombre = $nombre;
        $this->precio = $precio;
    }

    function mostrarInfo() {
        echo "{$this->nombre}: \${$this->precio}";
    }
}

class ProductoRopa extends Producto {
    private $talla;

    function __construct($nombre, $precio, $talla) {
        parent::__construct($nombre, $precio);   // llama al padre
        $this->talla = $talla;
    }

    function mostrarInfo() {                     // sobreescritura
        parent::mostrarInfo();                   // reutiliza el padre
        echo " | Talla: {$this->talla}";
    }
}
```

---

## Propiedades y métodos estáticos

| Sintaxis                   | Qué hace                                                 |
| -------------------------- | -------------------------------------------------------- |
| `static $propiedad`        | Propiedad compartida por todos los objetos               |
| `static function metodo()` | Método que no necesita un objeto para llamarse           |
| `self::$propiedad`         | Accede a una propiedad estática desde dentro de la clase |
| `self::metodo()`           | Llama a un método estático desde dentro de la clase      |
| `NombreClase::$propiedad`  | Accede a una propiedad estática desde fuera              |
| `NombreClase::metodo()`    | Llama a un método estático desde fuera                   |

```php
class Pedido {
    private static $totalPedidos = 0;

    function __construct() {
        self::$totalPedidos++;             // incrementa al crear cada pedido
    }

    static function getTotalPedidos() {
        return self::$totalPedidos;
    }
}

$p1 = new Pedido();
$p2 = new Pedido();
echo Pedido::getTotalPedidos();   // 2
```

---

## Resumen rápido

| Concepto                | Sintaxis clave                                         |
| ----------------------- | ------------------------------------------------------ |
| Definir clase           | `class Producto { }`                                   |
| Crear objeto            | `$p = new Producto("Laptop", 999.99)`                  |
| Acceder a propiedad     | `$p->nombre`                                           |
| Llamar a método         | `$p->mostrarInfo()`                                    |
| Constructor             | `function __construct($a, $b) { $this->a = $a; }`      |
| Propiedad privada       | `private $stock;`                                      |
| Getter explícito        | `function getStock() { return $this->stock; }`         |
| Setter explícito        | `function setStock($v) { $this->stock = $v; }`         |
| Getter mágico           | `function __get($attr) { return $this->$attr; }`       |
| Setter mágico           | `function __set($attr, $val) { $this->$attr = $val; }` |
| Heredar                 | `class ProductoRopa extends Producto { }`              |
| Llamar al padre         | `parent::__construct(...)`                             |
| Propiedad estática      | `private static $contador = 0;`                        |
| Acceso estático externo | `Pedido::getTotalPedidos()`                            |
| Acceso estático interno | `self::$contador`                                      |
