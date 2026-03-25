<?php
// ============================================================
// EJERCICIO 5: Visibilidad
// ============================================================
// Crear una clase CuentaCliente con:
//   - public $nombre
//   - private $saldo (empieza en 0)
//   - Método depositar($cantidad) — solo permite cantidades positivas
//   - Método comprar($cantidad) — solo permite comprar si hay
//     saldo suficiente
//   - Método mostrarSaldo() — imprime el nombre y el saldo actual
//
// Crear un cliente, hacer depósitos y compras, y verificar
// que no se puede acceder a $saldo directamente desde fuera.
//
// Ejemplo:
//   $cuenta = new CuentaCliente("Ana");
//   $cuenta->depositar(100);     // Depósito exitoso
//   $cuenta->comprar(30);        // Compra exitosa
//   $cuenta->mostrarSaldo();     // Ana - Saldo: $70
//   // $cuenta->saldo = 999999;  // ERROR: saldo es private
// ============================================================
