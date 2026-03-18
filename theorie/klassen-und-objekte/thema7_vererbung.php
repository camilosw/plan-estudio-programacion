<?php
// ============================================================
// THEMA 7: Vererbung — Klassen die von anderen erben
// ============================================================
//
// ZIEL: Code wiederverwenden, indem Kindklassen erstellt
// werden, die eine Elternklasse erweitern.
//
// ERKLAERUNG:
// In einem Online-Shop gibt es verschiedene Arten von Produkten:
// Kleidung, Elektronik, Lebensmittel. Alle haben Name, Preis
// und Bestand, aber jeder Typ kann zusaetzliche Attribute und
// Verhaltensweisen haben. Anstatt Code zu wiederholen, erstellen
// wir eine BASIS-Klasse und ERWEITERN sie.
//
// Syntax:
//   class Kindklasse extends Elternklasse {
//       // zusaetzliche Attribute und Methoden
//   }
//
// HINWEIS ZU PROTECTED:
// Hier wird protected wichtig. Protected-Attribute sind
// innerhalb der Klasse UND ihrer Kindklassen zugaenglich,
// aber NICHT von aussen. Perfekt fuer Vererbung.
//
// - private:   nur die eigene Klasse kann zugreifen
// - protected: die eigene Klasse UND ihre Kinder koennen zugreifen
// - public:    jeder kann zugreifen
// ============================================================

// Elternklasse (Basis)
class Produkt {
    public $name;
    protected $preis;    // protected: in Kindklassen zugaenglich
    protected $bestand;  // protected: in Kindklassen zugaenglich

    function __construct($name, $preis, $bestand) {
        $this->name = $name;
        $this->preis = $preis;
        $this->bestand = $bestand;
    }

    function getPreis() {
        return $this->preis;
    }

    function infoAnzeigen() {
        echo "$this->name - \$$this->preis - Bestand: $this->bestand\n";
    }
}

// Kindklasse: erbt alles von Produkt und fuegt Groesse und Farbe hinzu
class KleidungsProdukt extends Produkt {
    public $groesse;
    public $farbe;

    function __construct($name, $preis, $bestand, $groesse, $farbe) {
        // Wir rufen den Konstruktor der Elternklasse auf, um ihren Code wiederzuverwenden
        parent::__construct($name, $preis, $bestand);
        $this->groesse = $groesse;
        $this->farbe = $farbe;
    }

    // Wir ueberschreiben infoAnzeigen um zusaetzliche Informationen hinzuzufuegen
    function infoAnzeigen() {
        parent::infoAnzeigen(); // Zuerst die Basisinfo anzeigen
        echo "  Groesse: $this->groesse, Farbe: $this->farbe\n";
    }
}

// Eine weitere Kindklasse: erbt von Produkt und fuegt Garantie hinzu
class ElektronikProdukt extends Produkt {
    public $garantieMonate;

    function __construct($name, $preis, $bestand, $garantieMonate) {
        parent::__construct($name, $preis, $bestand);
        $this->garantieMonate = $garantieMonate;
    }

    function infoAnzeigen() {
        parent::infoAnzeigen();
        echo "  Garantie: $this->garantieMonate Monate\n";
    }
}

// Wir erstellen Produkte verschiedener Typen
$tshirt = new KleidungsProdukt("T-Shirt", 19.99, 50, "M", "Blau");
$laptop = new ElektronikProdukt("Laptop", 999.99, 10, 24);

echo "=== Kleidungsprodukt ===\n";
$tshirt->infoAnzeigen();
// Ausgabe:
//   T-Shirt - $19.99 - Bestand: 50
//     Groesse: M, Farbe: Blau

echo "\n=== Elektronikprodukt ===\n";
$laptop->infoAnzeigen();
// Ausgabe:
//   Laptop - $999.99 - Bestand: 10
//     Garantie: 24 Monate

echo "\n";

// Geerbte Methoden funktionieren ebenfalls
echo "Preis des Laptops: \$" . $laptop->getPreis() . "\n";

// Aber wir koennen nicht auf protected von aussen zugreifen:
// echo $laptop->preis;  // FEHLER: preis ist protected
