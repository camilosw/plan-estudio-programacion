<?php
// ============================================================
// THEMA 3: Methoden — Funktionen innerhalb der Klasse
// ============================================================
//
// ZIEL: Verstehen, dass Klassen Funktionen (genannt "Methoden")
// haben koennen, die mit ihren eigenen Daten arbeiten.
//
// ERKLAERUNG:
// So wie ein Produktdatenblatt Daten hat (Name, Preis),
// kann es auch Aktionen haben: "Rabatt anwenden", "verkaufen".
// Diese Aktionen sind die METHODEN der Klasse.
//
// Eine Methode ist einfach eine Funktion, die innerhalb der
// Klasse lebt und auf die Attribute des Objekts mit $this
// zugreifen kann.
//
// WICHTIGER HINWEIS: Wir verwenden ein separates Attribut
// $preisNachRabatt, um den Originalpreis des Produkts nicht
// zu verlieren.
// ============================================================

class Produkt {
    public $name;
    public $preis;
    public $preisNachRabatt;
    public $bestand;

    function __construct($name, $preis, $bestand) {
        $this->name = $name;
        $this->preis = $preis;
        $this->preisNachRabatt = $preis; // Anfangs gleich dem Originalpreis
        $this->bestand = $bestand;
    }

    // Methode zum Anwenden eines Rabatts (aendert nicht den Originalpreis)
    function rabattAnwenden($prozent) {
        $this->preisNachRabatt = $this->preis * (1 - $prozent / 100);
    }

    // Methode zum Verkaufen von Einheiten (reduziert den Bestand)
    function verkaufen($menge) {
        if ($menge <= $this->bestand) {
            $this->bestand -= $menge;
            echo "Verkauft. Verbleibender Bestand: $this->bestand\n";
        } else {
            echo "Nicht genuegend Bestand\n";
        }
    }

    // Methode zum Anzeigen aller Produktinformationen
    function infoAnzeigen() {
        echo "$this->name - Preis: \$$this->preis - Mit Rabatt: \$$this->preisNachRabatt - Bestand: $this->bestand\n";
    }
}

// Wir erstellen ein Produkt und verwenden seine Methoden
$tshirt = new Produkt("Blaues T-Shirt", 19.99, 50);
$tshirt->infoAnzeigen();
// Ausgabe: Blaues T-Shirt - Preis: $19.99 - Mit Rabatt: $19.99 - Bestand: 50

$tshirt->rabattAnwenden(10); // 10% Rabatt
$tshirt->verkaufen(3);       // Wir verkaufen 3 Stueck
$tshirt->infoAnzeigen();
// Ausgabe: Blaues T-Shirt - Preis: $19.99 - Mit Rabatt: $17.991 - Bestand: 47

echo "\n";

// Wir versuchen mehr zu verkaufen als auf Lager ist
$tshirt->verkaufen(100);
// Ausgabe: Nicht genuegend Bestand
