<?php
// ============================================================
// EJERCICIO 6: Getters y Setters
// ============================================================
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
