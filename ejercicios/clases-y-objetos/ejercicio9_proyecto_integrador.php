<?php
// ============================================================
// EJERCICIO 9: Proyecto integrador — Mini tienda online
// ============================================================
// Vas a construir una tienda online completa usando todo lo
// que aprendiste en los temas 1 al 8. Sigue los pasos en
// orden. Cada paso te dice qué crear y te da un espacio
// para escribir tu código.
// ============================================================


// ============================================================
// PASO 1: Clase base Producto
// ============================================================
// Crear la clase Producto con:
//   - Atributos: $nombre (public), $precio (protected), $stock (protected)
//   - Constructor que reciba los tres valores
//   - Método getPrecio() que devuelva el precio
//   - Método getStock() que devuelva el stock
//   - Método vender($cantidad): si hay suficiente stock, lo
//     reduce y devuelve true. Si no, devuelve false.
//   - Método mostrarInfo() que muestre:
//     "  Camiseta - $19.99 - Stock: 50"
// ============================================================

// Escribe tu código aquí:



// ============================================================
// PASO 2: Clases hijas ProductoRopa y ProductoElectronico
// ============================================================
// ProductoRopa hereda de Producto y agrega:
//   - Atributo: $talla
//   - Constructor que reciba nombre, precio, stock y talla
//     (usa parent::__construct para los primeros tres)
//   - Sobrescribir mostrarInfo() para que muestre:
//     "  Camiseta (Talla M) - $19.99 - Stock: 50"
//
// ProductoElectronico hereda de Producto y agrega:
//   - Atributo: $garantiaMeses
//   - Constructor que reciba nombre, precio, stock y garantiaMeses
//   - Sobrescribir mostrarInfo() para que muestre:
//     "  Laptop (Garantía: 24m) - $999.99 - Stock: 10"
// ============================================================

// Escribe tu código aquí:



// ============================================================
// PASO 3: Clase Cliente
// ============================================================
// Crear la clase Cliente con:
//   - Atributos: $nombre (public), $saldo (private)
//   - Constructor que reciba nombre y saldo inicial
//   - Método getSaldo() que devuelva el saldo
//   - Método cobrar($monto): si el saldo alcanza, lo resta
//     y devuelve true. Si no, devuelve false.
// ============================================================

// Escribe tu código aquí:



// ============================================================
// PASO 4: Clase CarritoDeCompras
// ============================================================
// Crear la clase CarritoDeCompras con:
//   - Atributo: $items (private, empieza como array vacío)
//   - Constructor que inicialice $items como []
//   - Método agregar($producto, $cantidad):
//       Si hay suficiente stock (usar getStock()), agrega un
//       elemento al array $items con esta estructura:
//         ["producto" => $producto, "cantidad" => $cantidad]
//       y muestra "  Agregado: Camiseta x2". Devuelve true.
//       Si no hay stock, muestra un mensaje y devuelve false.
//   - Método calcularTotal(): recorre $items, suma
//       precio * cantidad de cada item y devuelve el total
//   - Método getItems(): devuelve el array $items
//   - Método vaciar(): pone $items como []
//   - Método mostrarCarrito(): recorre $items y muestra cada
//       uno así: "  Camiseta x2 = $39.98"
//       Al final muestra: "  TOTAL: $1119.97"
//       Si el carrito está vacío, muestra "(carrito vacío)"
// ============================================================

// Escribe tu código aquí:



// ============================================================
// PASO 5: Clase Pedido (con propiedades estáticas)
// ============================================================
// Crear la clase Pedido con:
//   - Propiedad estática: $totalPedidos (empieza en 0)
//   - Propiedad estática: $porcentajeIva = 21
//   - Atributos: $numeroPedido, $cliente, $items (private),
//     $total (private)
//   - Constructor que reciba $cliente, $items y $total:
//       Incrementa $totalPedidos y lo asigna a $numeroPedido
//   - Método estático getTotalPedidos()
//   - Método getTotalConIva(): devuelve el total multiplicado
//       por (1 + porcentajeIva / 100)
//   - Método mostrarResumen(): muestra algo como:
//       ╔══════════════════════════════════════╗
//       ║  PEDIDO #1
//       ║  Cliente: Sandra
//       ║  --------------------------------
//       ║  Camiseta x2 = $39.98
//       ║  Laptop x1 = $999.99
//       ║  --------------------------------
//       ║  Subtotal: $1039.97
//       ║  IVA (21%): $218.3937
//       ║  TOTAL: $1258.3637
//       ╚══════════════════════════════════════╝
// ============================================================

// Escribe tu código aquí:



// ============================================================
// PASO 6: Flujo principal — ¡A probar todo junto!
// ============================================================
// Ahora usa las clases que creaste para simular una compra:
//
// 6a. Crear productos:
//   - Una camiseta (ProductoRopa): "Camiseta azul", $19.99, stock 50, talla "M"
//   - Una laptop (ProductoElectronico): "Laptop HP", $999.99, stock 10, garantía 24 meses
//   - Unas zapatillas (ProductoRopa): "Zapatillas Nike", $79.99, stock 25, talla "42"
//   Mostrar la info de cada producto.
//
// 6b. Crear un cliente:
//   - Nombre: "Sandra", saldo: 1500
//   Mostrar su nombre y saldo.
//
// 6c. Crear un carrito y agregar productos:
//   - 2 camisetas
//   - 1 laptop
//   - 1 par de zapatillas
//   Mostrar el contenido del carrito.
//
// 6d. Procesar el pedido:
//   - Calcular el total del carrito
//   - Cobrar al cliente (verificar si tiene saldo)
//   - Si el cobro fue exitoso:
//       - Reducir el stock de cada producto (recorrer los items
//         del carrito y llamar a vender() en cada producto)
//       - Crear un nuevo Pedido
//       - Vaciar el carrito
//       - Mostrar el resumen del pedido
//       - Mostrar el saldo restante del cliente
//       - Mostrar el total de pedidos realizados (estático)
//   - Si no tiene saldo, mostrar "Saldo insuficiente"
//
// 6e. Mostrar el stock actualizado de cada producto.
// ============================================================

// Escribe tu código aquí:

