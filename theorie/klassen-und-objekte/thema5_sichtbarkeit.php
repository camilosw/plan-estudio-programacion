<?php
// ============================================================
// THEMA 5: Sichtbarkeit — public, private und protected
// ============================================================
//
// ZIEL: Verstehen, warum wir nicht immer moechten, dass die
// Daten eines Objekts von aussen zugaenglich sind.
//
// ERKLAERUNG:
// Bisher waren alle Attribute "public", was bedeutet, dass
// jeder sie von ausserhalb der Klasse lesen und aendern kann.
// Aber manchmal moechten wir bestimmte Daten SCHUETZEN.
//
// Zum Beispiel: Wir moechten nicht, dass jemand den Bestand
// eines Produkts direkt aendern kann. Der Bestand sollte sich
// nur aendern, wenn etwas verkauft wird.
//
// Arten der Sichtbarkeit:
//   - public:    von ueberall zugaenglich
//   - private:   nur innerhalb der eigenen Klasse zugaenglich
//   - protected: innerhalb der Klasse und ihrer Kindklassen
//                zugaenglich (wird im Vererbungsthema behandelt)
// ============================================================

class Produkt {
    public $name;
    public $preis;
    private $preisNachRabatt;
    private $bestand;

    function __construct($name, $preis, $bestand) {
        $this->name = $name;
        $this->preis = $preis;
        $this->preisNachRabatt = $preis;
        $this->bestand = $bestand;
    }

    // Rabatt kann nur ueber diese Methode angewendet werden,
    // die prueft, ob der Prozentsatz sinnvoll ist
    function rabattAnwenden($prozent) {
        if ($prozent > 0 && $prozent <= 50) {
            $this->preisNachRabatt = $this->preis * (1 - $prozent / 100);
            echo "Rabatt angewendet. Preis mit Rabatt: \$$this->preisNachRabatt\n";
        } else {
            echo "Ungueltiger Rabatt (muss zwischen 1% und 50% liegen)\n";
        }
    }

    // Der Bestand kann nur durch Verkauf geaendert werden, wobei
    // geprueft wird, ob genuegend Bestand vorhanden ist
    function verkaufen($menge) {
        if ($menge <= $this->bestand) {
            $this->bestand -= $menge;
            echo "Verkauft. Verbleibender Bestand: $this->bestand\n";
        } else {
            echo "Nicht genuegend Bestand\n";
        }
    }

    function infoAnzeigen() {
        echo "$this->name - Preis: \$$this->preis - Mit Rabatt: \$$this->preisNachRabatt - Bestand: $this->bestand\n";
    }
}

$produkt = new Produkt("Laptop", 999.99, 10);
$produkt->infoAnzeigen();
// Ausgabe: Laptop - Preis: $999.99 - Mit Rabatt: $999.99 - Bestand: 10

echo "\n";

// Wir wenden einen gueltigen Rabatt an
$produkt->rabattAnwenden(10);
// Ausgabe: Rabatt angewendet. Preis mit Rabatt: $899.991

// Wir verkaufen 2 Stueck
$produkt->verkaufen(2);
// Ausgabe: Verkauft. Verbleibender Bestand: 8

$produkt->infoAnzeigen();
// Ausgabe: Laptop - Preis: $999.99 - Mit Rabatt: $899.991 - Bestand: 8

echo "\n";

// Wir versuchen einen ungueltigen Rabatt
$produkt->rabattAnwenden(90);
// Ausgabe: Ungueltiger Rabatt (muss zwischen 1% und 50% liegen)

echo "\n";

// Das funktioniert, weil es public ist:
echo "Name: $produkt->name\n";
echo "Preis: \$$produkt->preis\n";

// Das wuerde einen FEHLER geben, weil es private ist:
// echo $produkt->preisNachRabatt;  // Fatal error
// echo $produkt->bestand;           // Fatal error
// $produkt->bestand = 999;          // Fatal error

echo "\n(Die auskommentierten Zeilen wuerden einen Fehler geben, weil preisNachRabatt und bestand private sind)\n";
