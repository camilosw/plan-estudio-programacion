<?php
// ============================================================
// THEMA 2: Der Konstruktor — Objekte von Anfang an mit Daten erstellen
// ============================================================
//
// ZIEL: Vermeiden, Attribute einzeln zuzuweisen, indem __construct
// verwendet wird.
//
// ERKLAERUNG:
// Im vorherigen Thema mussten wir zum Erstellen eines Produkts
// 3 Zeilen schreiben (eine pro Attribut). Der KONSTRUKTOR
// ist eine spezielle Funktion, die automatisch beim Erstellen
// des Objekts mit "new" ausgefuehrt wird. Er ermoeglicht es,
// alle Daten auf einmal zu uebergeben.
//
// Syntax:
//   function __construct($param1, $param2) {
//       $this->attribut1 = $param1;
//       $this->attribut2 = $param2;
//   }
//
// $this bezieht sich auf das Objekt, das wir erstellen.
// ============================================================

class Produkt {
    public $name;
    public $preis;
    public $bestand;

    // Der Konstruktor empfaengt die Daten und weist sie den Attributen zu
    function __construct($name, $preis, $bestand) {
        $this->name = $name;
        $this->preis = $preis;
        $this->bestand = $bestand;
    }
}

// Jetzt koennen wir Produkte in einer einzigen Zeile erstellen
$tshirt = new Produkt("Blaues T-Shirt", 19.99, 50);
$hose = new Produkt("Schwarze Hose", 39.99, 30);
$schuhe = new Produkt("Sportschuhe", 59.99, 20);

// Wir zeigen die Daten an
echo "$tshirt->name - \$$tshirt->preis - Bestand: $tshirt->bestand\n";
echo "$hose->name - \$$hose->preis - Bestand: $hose->bestand\n";
echo "$schuhe->name - \$$schuhe->preis - Bestand: $schuhe->bestand\n";
