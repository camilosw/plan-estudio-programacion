<?php
// ============================================================
// THEMA 4: Methoden die Werte zurueckgeben vs. Methoden die ausgeben
// ============================================================
//
// ZIEL: Zwischen Methoden unterscheiden, die echo verwenden,
// und Methoden, die return verwenden, und wann welche
// eingesetzt wird.
//
// ERKLAERUNG:
// Eine Methode kann mit einem Ergebnis zwei Dinge tun:
//   1. ES AUSGEBEN mit echo (zeigt es auf dem Bildschirm an, fertig)
//   2. ES ZURUECKGEBEN mit return (gibt uns den Wert zur spaeteren Verwendung)
//
// return ist flexibler, weil der zurueckgegebene Wert:
//   - In einer Variable gespeichert werden kann
//   - In Berechnungen verwendet werden kann
//   - An eine andere Methode oder Funktion uebergeben werden kann
//   - Mit anderen Werten verglichen werden kann
// ============================================================

class Produkt {
    public $name;
    public $preis;

    function __construct($name, $preis) {
        $this->name = $name;
        $this->preis = $preis;
    }

    // Diese Methode GIBT den Preis mit MwSt ZURUECK (flexibler)
    function preisMitMwSt($mwStProzent) {
        return $this->preis * (1 + $mwStProzent / 100);
    }

    // Diese Methode GIBT Informationen AUS (weniger flexibel)
    function infoAnzeigen() {
        echo "$this->name - \$$this->preis\n";
    }
}

$produkt = new Produkt("Laptop", 999.99);

// --- Verwendung der Methode die AUSGIBT ---
$produkt->infoAnzeigen(); // Gibt aus: Laptop - $999.99
// Wir koennen nichts weiter mit diesem Ergebnis machen


// --- Verwendung der Methode die ZURUECKGIBT ---

// 1. Wir speichern das Ergebnis in einer Variable
$endpreis = $produkt->preisMitMwSt(21);
echo "Preis mit MwSt (21%): \$$endpreis\n";

// 2. Wir verwenden es direkt in einer Berechnung
$preisMitVersand = $produkt->preisMitMwSt(21) + 15;
echo "Preis mit MwSt + Versand: \$$preisMitVersand\n";

// 3. Wir verwenden es in einem Vergleich
if ($produkt->preisMitMwSt(21) > 1000) {
    echo "Dieses Produkt uebersteigt \$1000 mit MwSt\n";
}
