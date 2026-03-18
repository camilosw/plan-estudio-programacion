<?php
// ============================================================
// ÜBUNG 7: Vererbung
// ============================================================
//
// ÜBUNG 7A: Kundentypen
// --------------------------------
// Erstelle eine Basisklasse Kunde mit:
//   - Attribute: $name, $email
//   - Konstruktor, der Name und Email empfängt
//   - Methode infoAnzeigen(), die Name und Email anzeigt
//
// Dann zwei Kindklassen erstellen:
//
// 1. NormalerKunde, der hat:
//    - Ein zusätzliches Attribut $punkte (beginnt bei 0)
//    - Eine Methode punkteHinzufuegen($menge), die Punkte addiert
//    - infoAnzeigen() überschreiben, um auch die Punkte anzuzeigen
//
// 2. VipKunde, der hat:
//    - Ein zusätzliches Attribut $rabatt (Prozentsatz, z.B.: 15)
//    - Eine Methode rabattAnwenden($preis), die den Preis mit
//      angewendetem Rabatt zurückgibt
//    - infoAnzeigen() überschreiben, um auch den Rabatt anzuzeigen
//
// Beispiel für die Verwendung:
//   $normal = new NormalerKunde("Laura", "laura@email.com");
//   $normal->punkteHinzufuegen(50);
//   $normal->infoAnzeigen();
//   // Laura - laura@email.com
//   //   Punkte: 50
//
//   $vip = new VipKunde("Ana", "ana@email.com", 15);
//   echo $vip->rabattAnwenden(200); // 170
//   $vip->infoAnzeigen();
//   // Ana - ana@email.com
//   //   VIP-Rabatt: 15%
//
//
// ÜBUNG 7B: Benutzerhierarchie
// ------------------------------------
// Jetzt reorganisieren wir. Erstelle eine Basisklasse Benutzer mit:
//   - Attribute: $name, $email
//   - Konstruktor und Methode infoAnzeigen()
//
// Dann sollen sowohl Kunde als auch Administrator von
// Benutzer erben:
//
// 1. Kunde (erbt von Benutzer):
//    - Ein zusätzliches Attribut $adresse
//    - infoAnzeigen() überschreiben, um auch die Adresse anzuzeigen
//
// 2. Administrator (erbt von Benutzer):
//    - Ein zusätzliches Attribut $stufe (1, 2 oder 3)
//    - Eine Methode kannProdukteLoeschen(), die true zurückgibt,
//      wenn die Stufe größer als 2 ist
//    - infoAnzeigen() überschreiben, um auch die Stufe anzuzeigen
//
// Beispiel für die Verwendung:
//   $kunde = new Kunde("Laura", "laura@email.com", "Straße 123");
//   $kunde->infoAnzeigen();
//   // Laura - laura@email.com
//   //   Adresse: Straße 123
//
//   $admin = new Administrator("Carlos", "carlos@email.com", 3);
//   $admin->infoAnzeigen();
//   // Carlos - carlos@email.com
//   //   Administratorstufe: 3
//   echo $admin->kannProdukteLoeschen(); // true
// ============================================================
