<?php
// ============================================================
// THEMA 6: Getter und Setter — Kontrollierter Zugriff auf private Attribute
// ============================================================
//
// ZIEL: Lernen, private Attribute kontrolliert zu lesen und
// zu aendern.
//
// ERKLAERUNG:
// Im vorherigen Thema haben wir gesehen, dass private Attribute
// nicht von aussen gelesen oder geaendert werden koennen. Aber
// manchmal muessen wir das KONTROLLIERT tun. Dafuer gibt es:
//
//   - GETTER: Methode die erlaubt, ein privates Attribut zu LESEN
//     (konventionell heisst sie getAttribut)
//
//   - SETTER: Methode die erlaubt, ein privates Attribut zu AENDERN,
//     wobei Validierungen oder zusaetzliche Logik hinzugefuegt
//     werden koennen (konventionell heisst sie setAttribut)
//
// Der Vorteil eines Setters ist, dass wir beim Aendern eines
// Wertes Logik hinzufuegen koennen. Zum Beispiel beim Aendern
// des Preises koennen wir automatisch den Rabattpreis neu
// berechnen.
// ============================================================

class Produkt {
    public $name;
    private $preis;
    private $preisNachRabatt;

    function __construct($name, $preis) {
        $this->name = $name;
        $this->preis = $preis;
        $this->preisNachRabatt = $preis;
    }

    // GETTER: erlaubt das Lesen des Preises von aussen
    function getPreis() {
        return $this->preis;
    }

    // GETTER: erlaubt das Lesen des Rabattpreises von aussen
    function getPreisNachRabatt() {
        return $this->preisNachRabatt;
    }

    // SETTER: beim Aendern des Preises wird automatisch
    // der Rabattpreis neu berechnet
    function setPreis($neuerPreis) {
        if ($neuerPreis > 0) {
            $this->preis = $neuerPreis;
            $this->preisNachRabatt = $neuerPreis; // Rabatt wird zurueckgesetzt
            echo "Preis aktualisiert auf \$$neuerPreis\n";
        } else {
            echo "Der Preis muss groesser als 0 sein\n";
        }
    }

    function rabattAnwenden($prozent) {
        $this->preisNachRabatt = $this->preis * (1 - $prozent / 100);
    }
}

$produkt = new Produkt("Laptop", 999.99);

// Private Attribute mit Gettern lesen
echo "Preis: \$" . $produkt->getPreis() . "\n";
// Ausgabe: Preis: $999.99

echo "Preis mit Rabatt: \$" . $produkt->getPreisNachRabatt() . "\n";
// Ausgabe: Preis mit Rabatt: $999.99

echo "\n";

// 10% Rabatt anwenden
$produkt->rabattAnwenden(10);
echo "Nach 10% Rabatt: \$" . $produkt->getPreisNachRabatt() . "\n";
// Ausgabe: Nach 10% Rabatt: $899.991

echo "\n";

// Preis mit Setter aendern (setzt den Rabatt automatisch zurueck)
$produkt->setPreis(1099.99);
// Ausgabe: Preis aktualisiert auf $1099.99

echo "Neuer Preis: \$" . $produkt->getPreis() . "\n";
// Ausgabe: Neuer Preis: $1099.99

echo "Preis mit Rabatt (wurde zurueckgesetzt): \$" . $produkt->getPreisNachRabatt() . "\n";
// Ausgabe: Preis mit Rabatt (wurde zurueckgesetzt): $1099.99

echo "\n";

// Ungueltigen Preis versuchen
$produkt->setPreis(-50);
// Ausgabe: Der Preis muss groesser als 0 sein

// Der Preis hat sich nicht geaendert
echo "Preis bleibt: \$" . $produkt->getPreis() . "\n";
// Ausgabe: Preis bleibt: $1099.99
