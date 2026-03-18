<?php
// ============================================================
// ÜBUNG 5: Sichtbarkeit
// ============================================================
// Erstelle eine Klasse Kundenkonto mit:
//   - public $name
//   - private $guthaben (beginnt bei 0)
//   - Methode einzahlen($betrag) — erlaubt nur positive Beträge
//   - Methode einkaufen($betrag) — erlaubt nur den Einkauf, wenn
//     genügend Guthaben vorhanden ist
//   - Methode guthabenAnzeigen() — gibt den Namen und das aktuelle
//     Guthaben aus
//
// Einen Kunden erstellen, Einzahlungen und Einkäufe machen und
// überprüfen, dass man von außen nicht direkt auf $guthaben
// zugreifen kann.
//
// Beispiel:
//   $konto = new Kundenkonto("Ana");
//   $konto->einzahlen(100);       // Einzahlung erfolgreich
//   $konto->einkaufen(30);        // Einkauf erfolgreich
//   $konto->guthabenAnzeigen();   // Ana - Guthaben: $70
//   // $konto->guthaben = 999999; // FEHLER: guthaben ist private
// ============================================================
