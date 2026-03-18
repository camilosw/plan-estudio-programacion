<?php
// ============================================================
// THEMA 8: Statische Eigenschaften und Methoden
// ============================================================
//
// ZIEL: Verstehen, dass es Daten und Funktionen gibt, die zur
// KLASSE selbst gehoeren, nicht zu einem bestimmten Objekt.
//
// ERKLAERUNG:
// Manchmal gibt es Werte, die fuer alle Produkte gleich sind
// und sich nie aendern, wie der MwSt-Prozentsatz. Es macht
// keinen Sinn, dass jedes Produkt seine eigene Kopie der MwSt
// speichert — es ist ein Datum der Klasse im Allgemeinen.
//
// Dafuer verwenden wir STATIC:
//
//   - Statische Eigenschaft: wird von allen Objekten geteilt.
//     Wird mit "static" definiert und mit self:: innerhalb
//     der Klasse oder Klassenname:: von aussen zugegriffen.
//
//   - Statische Methode: kann OHNE ein Objekt zu erstellen
//     aufgerufen werden. Nuetzlich fuer Operationen, die nicht
//     von einem bestimmten Objekt abhaengen.
//
// Wichtiger Unterschied:
//   $this->preis     → gehoert zu EINEM bestimmten Produkt
//   self::$mwSt      → gehoert zur KLASSE (ist fuer alle gleich)
//
// WICHTIG: Statische Methoden koennen $this NICHT verwenden,
// da sie an kein Objekt gebunden sind.
// ============================================================

class Produkt {
    public $name;
    public $preis;
    private static $mwStProzent = 21;

    function __construct($name, $preis) {
        $this->name = $name;
        $this->preis = $preis;
    }

    // Statische Methode: berechnet die MwSt fuer jeden Preis
    // Benoetigt kein Objekt — verwendet nur das Klassendatum
    static function mwStBerechnen($preis) {
        return $preis * self::$mwStProzent / 100;
    }

    // Statische Methode: gibt einen Preis mit MwSt zurueck
    static function preisMitMwSt($preis) {
        return $preis + self::mwStBerechnen($preis);
    }

    // Normale Methode: verwendet den Preis des Objekts + die statische Methode
    function getPreisMitMwSt() {
        return self::preisMitMwSt($this->preis);
    }

    function infoAnzeigen() {
        $mitMwSt = $this->getPreisMitMwSt();
        echo "$this->name - Preis: \$$this->preis - Mit MwSt: \$$mitMwSt\n";
    }
}

// ---- Statische Methoden: koennen OHNE ein Produkt zu erstellen verwendet werden ----
echo "=== Statische Methoden direkt verwenden ===\n";
echo "MwSt von \$100: \$" . Produkt::mwStBerechnen(100) . "\n";
// Ausgabe: MwSt von $100: $21

echo "Preis mit MwSt von \$100: \$" . Produkt::preisMitMwSt(100) . "\n";
// Ausgabe: Preis mit MwSt von $100: $121

echo "\n";

// ---- Funktionieren auch mit Objekten ----
echo "=== Mit Objekten verwenden ===\n";
$laptop = new Produkt("Laptop", 999.99);
$laptop->infoAnzeigen();
// Ausgabe: Laptop - Preis: $999.99 - Mit MwSt: $1209.9879

$tshirt = new Produkt("T-Shirt", 19.99);
$tshirt->infoAnzeigen();
// Ausgabe: T-Shirt - Preis: $19.99 - Mit MwSt: $24.1879

// Hinweis: Die MwSt ist fuer beide Produkte gleich (21%),
// weil es eine STATISCHE Eigenschaft ist (der Klasse, nicht des Objekts)
