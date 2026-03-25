<?php
// ============================================================
// EJERCICIO 6b: Métodos mágicos __get y __set
// ============================================================
//
// Abajo tenés una clase CuentaCliente que usa getters y setters
// explícitos. Tu tarea es REEMPLAZAR esos 4 métodos por los
// métodos mágicos __get y __set.
//
// IMPORTANTE: La lógica de validación debe mantenerse igual:
//   - saldo: solo se puede asignar un valor >= 0
//   - limiteGasto: solo se puede asignar un valor positivo
//   - nombre: NO se puede cambiar (mostrar mensaje de error)
//   - Cualquier otra propiedad: mostrar "Propiedad X no existe"
//
// Los métodos depositar() y comprar() NO se modifican.
//
// Al terminar, el código de ejemplo del final debe funcionar
// usando la nueva sintaxis ($cuenta->saldo en vez de
// $cuenta->getSaldo()).
// ============================================================


// --- CLASE ORIGINAL CON GETTERS Y SETTERS ---
// (Reemplazá los 4 métodos marcados por __get y __set)

class CuentaCliente {
    private $nombre;
    private $saldo;
    private $limiteGasto;

    function __construct($nombre, $limiteGasto) {
        $this->nombre = $nombre;
        $this->saldo = 0;
        $this->limiteGasto = $limiteGasto;
    }

    // --- REEMPLAZAR ESTOS 4 MÉTODOS POR __get Y __set ---

    function getSaldo() {
        return $this->saldo;
    }

    function getLimiteGasto() {
        return $this->limiteGasto;
    }

    function setLimiteGasto($nuevoLimite) {
        if ($nuevoLimite > 0) {
            $this->limiteGasto = $nuevoLimite;
            echo "Límite actualizado a \$$nuevoLimite\n";
        } else {
            echo "El límite debe ser mayor a 0\n";
        }
    }

    function setSaldo($nuevoSaldo) {
        if ($nuevoSaldo < 0) {
            echo "El saldo no puede ser negativo\n";
        } elseif ($nuevoSaldo > $this->limiteGasto) {
            echo "El saldo no puede superar el límite de \$$this->limiteGasto\n";
        } else {
            $this->saldo = $nuevoSaldo;
        }
    }

    // --- FIN DE LOS MÉTODOS A REEMPLAZAR ---

    function depositar($cantidad) {
        if ($cantidad > 0) {
            $this->saldo += $cantidad;
            echo "Depósito de \$$cantidad. Saldo: \$$this->saldo\n";
        } else {
            echo "La cantidad debe ser mayor a 0\n";
        }
    }

    function comprar($cantidad) {
        if ($cantidad > $this->limiteGasto) {
            echo "La compra de \$$cantidad supera el límite de \$$this->limiteGasto\n";
        } elseif ($cantidad > $this->saldo) {
            echo "Saldo insuficiente para comprar \$$cantidad\n";
        } else {
            $this->saldo -= $cantidad;
            echo "Compra de \$$cantidad. Saldo: \$$this->saldo\n";
        }
    }
}


// --- CÓDIGO DE EJEMPLO ---
// Al terminar, este código debe funcionar con __get y __set.
// Cambiá las líneas que usan getters/setters por la sintaxis
// directa (ej: $cuenta->getSaldo() → $cuenta->saldo)

$cuenta = new CuentaCliente("Ana", 500);

// Leer atributos (ahora: $cuenta->nombre, $cuenta->saldo, etc.)
echo "Cliente: " . $cuenta->getSaldo() . "\n"; // Cambiar a $cuenta->saldo
echo "Límite: \$" . $cuenta->getLimiteGasto() . "\n"; // Cambiar a $cuenta->limiteGasto

$cuenta->depositar(300);
// Depósito de $300. Saldo: $300

// Intentar asignar saldo negativo (debe rechazarlo)
$cuenta->setSaldo(-100); // Cambiar a $cuenta->saldo = -100
// El saldo no puede ser negativo

// Intentar asignar saldo que supera el límite
$cuenta->setSaldo(600); // Cambiar a $cuenta->saldo = 600
// El saldo no puede superar el límite de $500

// Cambiar el límite de gasto
$cuenta->setLimiteGasto(800); // Cambiar a $cuenta->limiteGasto = 800
// Límite actualizado a $800

// Intentar cambiar el nombre (debe rechazarlo)
// $cuenta->nombre = "Luis";
// El nombre no se puede cambiar

$cuenta->comprar(200);
// Compra de $200. Saldo: $100

echo "Saldo final: \$" . $cuenta->getSaldo() . "\n"; // Cambiar a $cuenta->saldo

