<?php
// ============================================================
// EJERCICIO 7: Herencia
// ============================================================
//
// EJERCICIO 7A: Tipos de clientes
// --------------------------------
// Crear una clase base Cliente con:
//   - Atributos: $nombre, $email
//   - Constructor que reciba nombre y email
//   - Método mostrarInfo() que muestre nombre y email
//
// Luego crear dos clases hijas:
//
// 1. ClienteNormal que tenga:
//    - Un atributo extra $puntos (empieza en 0)
//    - Un método sumarPuntos($cantidad) que sume puntos
//    - Sobrescribir mostrarInfo() para mostrar también los puntos
//
// 2. ClienteVip que tenga:
//    - Un atributo extra $descuento (porcentaje, ej: 15)
//    - Un método aplicarDescuento($precio) que devuelva el
//      precio con el descuento aplicado
//    - Sobrescribir mostrarInfo() para mostrar también el descuento
//
// Ejemplo de uso:
//   $normal = new ClienteNormal("Laura", "laura@email.com");
//   $normal->sumarPuntos(50);
//   $normal->mostrarInfo();
//   // Laura - laura@email.com
//   //   Puntos: 50
//
//   $vip = new ClienteVip("Ana", "ana@email.com", 15);
//   echo $vip->aplicarDescuento(200); // 170
//   $vip->mostrarInfo();
//   // Ana - ana@email.com
//   //   Descuento VIP: 15%
//
//
// EJERCICIO 7B: Jerarquía de usuarios
// ------------------------------------
// Ahora vamos a reorganizar. Crear una clase base Usuario con:
//   - Atributos: $nombre, $email
//   - Constructor y método mostrarInfo()
//
// Luego hacer que tanto Cliente como Administrador hereden
// de Usuario:
//
// 1. Cliente (hereda de Usuario):
//    - Un atributo extra $direccion
//    - Sobrescribir mostrarInfo() para mostrar también la dirección
//
// 2. Administrador (hereda de Usuario):
//    - Un atributo extra $nivel (1, 2 o 3)
//    - Un método puedeEliminarProductos() que devuelva true
//      si el nivel es mayor a 2
//    - Sobrescribir mostrarInfo() para mostrar también el nivel
//
// Ejemplo de uso:
//   $cliente = new Cliente("Laura", "laura@email.com", "Calle 123");
//   $cliente->mostrarInfo();
//   // Laura - laura@email.com
//   //   Dirección: Calle 123
//
//   $admin = new Administrador("Carlos", "carlos@email.com", 3);
//   $admin->mostrarInfo();
//   // Carlos - carlos@email.com
//   //   Nivel de administrador: 3
//   echo $admin->puedeEliminarProductos(); // true
// ============================================================
