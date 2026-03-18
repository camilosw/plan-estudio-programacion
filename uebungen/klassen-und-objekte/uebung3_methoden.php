<?php
// ============================================================
// ÜBUNG 3: Methoden
// ============================================================
// Erstelle eine Klasse Kunde mit:
//   - Attribute: $name, $email, $punkte (beginnt bei 0)
//   - Eine Methode einkaufen($betrag), die 1 Punkt pro
//     ausgegebene $10 addiert (ganzzahlige Division verwenden: intdiv($betrag, 10))
//   - Eine Methode punkteAnzeigen(), die den Namen des
//     Kunden und seine gesammelten Punkte ausgibt
//
// Beispiel für die Verwendung:
//   $kunde = new Kunde("Ana", "ana@email.com");
//   $kunde->einkaufen(55);  // Bekommt 5 Punkte
//   $kunde->einkaufen(23);  // Bekommt 2 weitere Punkte
//   $kunde->punkteAnzeigen(); // Ana hat 7 Punkte
// ============================================================
