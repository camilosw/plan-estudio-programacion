<?php
// ============================================================
// ÜBUNG 6: Getters und Setters
// ============================================================
// Die Klasse Kundenkonto aus dem vorherigen Thema so ändern, dass:
//   - einzahlen und einkaufen weiterhin gleich funktionieren
//   - Einen Getter getGuthaben() hinzufügen, der das Guthaben zurückgibt
//   - Ein privates Attribut $ausgabenlimit hinzufügen (wird im
//     Konstruktor definiert)
//   - Einen Getter getAusgabenlimit() hinzufügen
//   - Einen Setter setAusgabenlimit($neuesLimit) hinzufügen, der nur
//     positive Werte erlaubt
//   - einkaufen() so ändern, dass Einkäufe, die das Ausgabenlimit
//     überschreiten, nicht erlaubt sind
//
// Beispiel:
//   $konto = new Kundenkonto("Ana", 200); // Limit von $200
//   $konto->einzahlen(500);
//   echo $konto->getGuthaben();        // 500
//   echo $konto->getAusgabenlimit();   // 200
//   $konto->einkaufen(150);            // Einkauf erfolgreich
//   $konto->einkaufen(250);            // Fehler: überschreitet das Limit
//   $konto->setAusgabenlimit(300);     // Limit aktualisiert
//   $konto->einkaufen(250);            // Jetzt funktioniert es
// ============================================================
