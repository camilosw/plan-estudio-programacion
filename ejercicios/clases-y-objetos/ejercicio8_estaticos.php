<?php
// ============================================================
// EJERCICIO 8: Propiedades y métodos estáticos
// ============================================================
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
