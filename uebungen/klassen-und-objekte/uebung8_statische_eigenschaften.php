<?php
// ============================================================
// ÜBUNG 8: Statische Eigenschaften und Methoden
// ============================================================
// Erstelle eine Klasse Versand mit:
//   - Eine statische Eigenschaft $kostenProKilo mit dem Wert 5
//     (die Kosten pro Kilo sind für alle Sendungen gleich)
//   - Ein Attribut $ziel und ein Attribut $gewichtKg
//   - Ein Konstruktor, der Ziel und Gewicht empfängt
//   - Eine statische Methode kostenBerechnen($gewicht), die die
//     Versandkosten zurückgibt (Gewicht * Kosten pro Kilo)
//   - Eine normale Methode getVersandkosten(), die die Kosten
//     der Sendung anhand ihres eigenen Gewichts zurückgibt
//   - Eine Methode versandAnzeigen(), die Ziel, Gewicht und Kosten anzeigt
//
// Beispiel:
//   // Die statische Methode direkt verwenden (ohne Objekt zu erstellen)
//   echo Versand::kostenBerechnen(3); // 15
//
//   // Sendungen erstellen
//   $versand1 = new Versand("Madrid", 2.5);
//   $versand1->versandAnzeigen(); // Madrid - 2.5 kg - Kosten: $12.5
//
//   $versand2 = new Versand("Barcelona", 5);
//   $versand2->versandAnzeigen(); // Barcelona - 5 kg - Kosten: $25
// ============================================================
