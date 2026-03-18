<?php
// ============================================================
// ÜBUNG 9: Integrationsprojekt — Mini-Onlineshop
// ============================================================
// Du wirst einen kompletten Onlineshop bauen, der alles
// verwendet, was du in den Themen 1 bis 8 gelernt hast. Folge
// den Schritten in der Reihenfolge. Jeder Schritt sagt dir,
// was du erstellen sollst, und gibt dir einen Platz für
// deinen Code.
// ============================================================


// ============================================================
// SCHRITT 1: Basisklasse Produkt
// ============================================================
// Erstelle die Klasse Produkt mit:
//   - Attribute: $name (public), $preis (protected), $bestand (protected)
//   - Konstruktor, der die drei Werte empfängt
//   - Methode getPreis(), die den Preis zurückgibt
//   - Methode getBestand(), die den Bestand zurückgibt
//   - Methode verkaufen($menge): wenn genügend Bestand vorhanden ist,
//     wird er reduziert und true zurückgegeben. Wenn nicht, wird false zurückgegeben.
//   - Methode infoAnzeigen(), die anzeigt:
//     "  T-Shirt - $19.99 - Bestand: 50"
// ============================================================

// Schreibe deinen Code hier:



// ============================================================
// SCHRITT 2: Kindklassen KleidungsProdukt und ElektronikProdukt
// ============================================================
// KleidungsProdukt erbt von Produkt und fügt hinzu:
//   - Attribut: $groesse
//   - Konstruktor, der Name, Preis, Bestand und Größe empfängt
//     (verwende parent::__construct für die ersten drei)
//   - infoAnzeigen() überschreiben, damit es anzeigt:
//     "  T-Shirt (Größe M) - $19.99 - Bestand: 50"
//
// ElektronikProdukt erbt von Produkt und fügt hinzu:
//   - Attribut: $garantieMonate
//   - Konstruktor, der Name, Preis, Bestand und garantieMonate empfängt
//   - infoAnzeigen() überschreiben, damit es anzeigt:
//     "  Laptop (Garantie: 24m) - $999.99 - Bestand: 10"
// ============================================================

// Schreibe deinen Code hier:



// ============================================================
// SCHRITT 3: Klasse Kunde
// ============================================================
// Erstelle die Klasse Kunde mit:
//   - Attribute: $name (public), $guthaben (private)
//   - Konstruktor, der Name und Anfangsguthaben empfängt
//   - Methode getGuthaben(), die das Guthaben zurückgibt
//   - Methode belasten($betrag): wenn das Guthaben reicht, wird
//     es abgezogen und true zurückgegeben. Wenn nicht, wird false zurückgegeben.
// ============================================================

// Schreibe deinen Code hier:



// ============================================================
// SCHRITT 4: Klasse Einkaufswagen
// ============================================================
// Erstelle die Klasse Einkaufswagen mit:
//   - Attribut: $artikel (private, beginnt als leeres Array)
//   - Konstruktor, der $artikel als [] initialisiert
//   - Methode hinzufuegen($produkt, $menge):
//       Wenn genügend Bestand vorhanden ist (verwende getBestand()), füge ein
//       Element zum Array $artikel mit dieser Struktur hinzu:
//         ["produkt" => $produkt, "menge" => $menge]
//       und zeige "  Hinzugefügt: T-Shirt x2" an. Gibt true zurück.
//       Wenn kein Bestand vorhanden, zeige eine Meldung und gib false zurück.
//   - Methode gesamtBerechnen(): durchläuft $artikel, summiert
//       Preis * Menge jedes Artikels und gibt die Gesamtsumme zurück
//   - Methode getArtikel(): gibt das Array $artikel zurück
//   - Methode leeren(): setzt $artikel auf []
//   - Methode wagenAnzeigen(): durchläuft $artikel und zeigt jeden
//       so an: "  T-Shirt x2 = $39.98"
//       Am Ende anzeigen: "  GESAMT: $1119.97"
//       Wenn der Wagen leer ist, anzeigen "(Wagen leer)"
// ============================================================

// Schreibe deinen Code hier:



// ============================================================
// SCHRITT 5: Klasse Bestellung (mit statischen Eigenschaften)
// ============================================================
// Erstelle die Klasse Bestellung mit:
//   - Statische Eigenschaft: $gesamtBestellungen (beginnt bei 0)
//   - Statische Eigenschaft: $mehrwertsteuerProzent = 21
//   - Attribute: $bestellNummer, $kunde, $artikel (private),
//     $gesamt (private)
//   - Konstruktor, der $kunde, $artikel und $gesamt empfängt:
//       Erhöht $gesamtBestellungen und weist es $bestellNummer zu
//   - Statische Methode getGesamtBestellungen()
//   - Methode getGesamtMitMwSt(): gibt die Gesamtsumme multipliziert
//       mit (1 + mehrwertsteuerProzent / 100) zurück
//   - Methode zusammenfassungAnzeigen(): zeigt etwas wie:
//       ╔══════════════════════════════════════╗
//       ║  BESTELLUNG #1
//       ║  Kunde: Sandra
//       ║  --------------------------------
//       ║  T-Shirt x2 = $39.98
//       ║  Laptop x1 = $999.99
//       ║  --------------------------------
//       ║  Zwischensumme: $1039.97
//       ║  MwSt. (21%): $218.3937
//       ║  GESAMT: $1258.3637
//       ╚══════════════════════════════════════╝
// ============================================================

// Schreibe deinen Code hier:



// ============================================================
// SCHRITT 6: Hauptablauf — Alles zusammen testen!
// ============================================================
// Verwende jetzt die erstellten Klassen, um einen Einkauf zu simulieren:
//
// 6a. Produkte erstellen:
//   - Ein T-Shirt (KleidungsProdukt): "Blaues T-Shirt", $19.99, Bestand 50, Größe "M"
//   - Ein Laptop (ElektronikProdukt): "Laptop HP", $999.99, Bestand 10, Garantie 24 Monate
//   - Turnschuhe (KleidungsProdukt): "Nike Turnschuhe", $79.99, Bestand 25, Größe "42"
//   Die Info jedes Produkts anzeigen.
//
// 6b. Einen Kunden erstellen:
//   - Name: "Sandra", Guthaben: 1500
//   Seinen Namen und sein Guthaben anzeigen.
//
// 6c. Einen Einkaufswagen erstellen und Produkte hinzufügen:
//   - 2 T-Shirts
//   - 1 Laptop
//   - 1 Paar Turnschuhe
//   Den Inhalt des Einkaufswagens anzeigen.
//
// 6d. Die Bestellung bearbeiten:
//   - Die Gesamtsumme des Wagens berechnen
//   - Dem Kunden belasten (prüfen, ob er genügend Guthaben hat)
//   - Wenn die Belastung erfolgreich war:
//       - Den Bestand jedes Produkts reduzieren (die Artikel des
//         Wagens durchlaufen und verkaufen() für jedes Produkt aufrufen)
//       - Eine neue Bestellung erstellen
//       - Den Einkaufswagen leeren
//       - Die Zusammenfassung der Bestellung anzeigen
//       - Das verbleibende Guthaben des Kunden anzeigen
//       - Die Gesamtzahl der Bestellungen anzeigen (statisch)
//   - Wenn er nicht genügend Guthaben hat, "Guthaben reicht nicht aus" anzeigen
//
// 6e. Den aktualisierten Bestand jedes Produkts anzeigen.
// ============================================================

// Schreibe deinen Code hier:

