<?php
// ============================================================
// THEMA 9: Integrationsprojekt — Mini-Online-Shop
// ============================================================
//
// ZIEL: Alle gelernten Konzepte in einer vollstaendigen
// Uebung integrieren, die einen Online-Shop simuliert.
//
// Verwendete Konzepte:
//   - Klassen und Objekte (Thema 1)
//   - Konstruktor (Thema 2)
//   - Methoden (Thema 3)
//   - Return vs echo (Thema 4)
//   - Sichtbarkeit (Thema 5)
//   - Getter und Setter (Thema 6)
//   - Vererbung (Thema 7)
//   - Statische Eigenschaften (Thema 8)
// ============================================================


// --- Basisklasse Produkt (Vererbung, Sichtbarkeit, protected) ---

class Produkt {
    public $name;
    protected $preis;
    protected $bestand;

    function __construct($name, $preis, $bestand) {
        $this->name = $name;
        $this->preis = $preis;
        $this->bestand = $bestand;
    }

    function getPreis() {
        return $this->preis;
    }

    function getBestand() {
        return $this->bestand;
    }

    function verkaufen($menge) {
        if ($menge <= $this->bestand) {
            $this->bestand -= $menge;
            return true;
        }
        return false;
    }

    function infoAnzeigen() {
        echo "  $this->name - \$$this->preis - Bestand: $this->bestand\n";
    }
}


// --- Kindklassen (Vererbung) ---

class KleidungsProdukt extends Produkt {
    public $groesse;

    function __construct($name, $preis, $bestand, $groesse) {
        parent::__construct($name, $preis, $bestand);
        $this->groesse = $groesse;
    }

    function infoAnzeigen() {
        echo "  $this->name (Groesse $this->groesse) - \$$this->preis - Bestand: $this->bestand\n";
    }
}

class ElektronikProdukt extends Produkt {
    public $garantieMonate;

    function __construct($name, $preis, $bestand, $garantieMonate) {
        parent::__construct($name, $preis, $bestand);
        $this->garantieMonate = $garantieMonate;
    }

    function infoAnzeigen() {
        echo "  $this->name (Garantie: {$this->garantieMonate}M) - \$$this->preis - Bestand: $this->bestand\n";
    }
}


// --- Klasse Kunde (Sichtbarkeit, Getter/Setter) ---

class Kunde {
    public $name;
    private $guthaben;

    function __construct($name, $anfangsGuthaben) {
        $this->name = $name;
        $this->guthaben = $anfangsGuthaben;
    }

    function getGuthaben() {
        return $this->guthaben;
    }

    function abbuchen($betrag) {
        if ($betrag <= $this->guthaben) {
            $this->guthaben -= $betrag;
            return true;
        }
        return false;
    }
}


// --- Klasse Einkaufswagen (Methoden, return) ---

class Einkaufswagen {
    private $artikel;  // Array der Produkte im Einkaufswagen

    function __construct() {
        $this->artikel = [];
    }

    function hinzufuegen($produkt, $menge) {
        if ($produkt->getBestand() >= $menge) {
            $this->artikel[] = [
                "produkt" => $produkt,
                "menge" => $menge
            ];
            echo "  Hinzugefuegt: $produkt->name x$menge\n";
            return true;
        }
        echo "  Nicht genuegend Bestand von $produkt->name\n";
        return false;
    }

    function gesamtBerechnen() {
        $gesamt = 0;
        foreach ($this->artikel as $artikel) {
            $gesamt += $artikel["produkt"]->getPreis() * $artikel["menge"];
        }
        return $gesamt;
    }

    function getArtikel() {
        return $this->artikel;
    }

    function leeren() {
        $this->artikel = [];
    }

    function warenkorAnzeigen() {
        if (empty($this->artikel)) {
            echo "  (Einkaufswagen leer)\n";
            return;
        }
        foreach ($this->artikel as $artikel) {
            $name = $artikel["produkt"]->name;
            $preis = $artikel["produkt"]->getPreis();
            $menge = $artikel["menge"];
            $zwischensumme = $preis * $menge;
            echo "  $name x$menge = \$$zwischensumme\n";
        }
        echo "  GESAMT: \$" . $this->gesamtBerechnen() . "\n";
    }
}


// --- Klasse Bestellung (statisch) ---

class Bestellung {
    private static $gesamtBestellungen = 0;
    private static $mwStProzent = 21;

    public $bestellNummer;
    public $kunde;
    private $artikel;
    private $gesamt;

    function __construct($kunde, $artikel, $gesamt) {
        self::$gesamtBestellungen++;
        $this->bestellNummer = self::$gesamtBestellungen;
        $this->kunde = $kunde;
        $this->artikel = $artikel;
        $this->gesamt = $gesamt;
    }

    static function getGesamtBestellungen() {
        return self::$gesamtBestellungen;
    }

    function getGesamtMitMwSt() {
        return $this->gesamt * (1 + self::$mwStProzent / 100);
    }

    function zusammenfassungAnzeigen() {
        echo "╔══════════════════════════════════════╗\n";
        echo "║  BESTELLUNG #$this->bestellNummer\n";
        echo "║  Kunde: {$this->kunde->name}\n";
        echo "║  --------------------------------\n";
        foreach ($this->artikel as $artikel) {
            $name = $artikel["produkt"]->name;
            $preis = $artikel["produkt"]->getPreis();
            $menge = $artikel["menge"];
            echo "║  $name x$menge = \$" . ($preis * $menge) . "\n";
        }
        echo "║  --------------------------------\n";
        echo "║  Zwischensumme: \$$this->gesamt\n";
        echo "║  MwSt (" . self::$mwStProzent . "%): \$" . ($this->gesamt * self::$mwStProzent / 100) . "\n";
        echo "║  GESAMT: \$" . $this->getGesamtMitMwSt() . "\n";
        echo "╚══════════════════════════════════════╝\n";
    }
}


// ============================================================
// HAUPTABLAUF DES SHOPS
// ============================================================

echo "=== MINI-ONLINE-SHOP ===\n\n";

// 1. Produkte erstellen
echo "Verfuegbare Produkte:\n";
$tshirt = new KleidungsProdukt("Blaues T-Shirt", 19.99, 50, "M");
$laptop = new ElektronikProdukt("HP Laptop", 999.99, 10, 24);
$turnschuhe = new KleidungsProdukt("Nike Turnschuhe", 79.99, 25, "42");

$tshirt->infoAnzeigen();
$laptop->infoAnzeigen();
$turnschuhe->infoAnzeigen();

echo "\n";

// 2. Einen Kunden mit Guthaben erstellen
$kunde = new Kunde("Sandra", 1500);
echo "Kunde: $kunde->name (Guthaben: \$" . $kunde->getGuthaben() . ")\n\n";

// 3. Produkte zum Einkaufswagen hinzufuegen
echo "Zum Einkaufswagen hinzufuegen:\n";
$wagen = new Einkaufswagen();
$wagen->hinzufuegen($tshirt, 2);
$wagen->hinzufuegen($laptop, 1);
$wagen->hinzufuegen($turnschuhe, 1);

echo "\nInhalt des Einkaufswagens:\n";
$wagen->warenkorAnzeigen();

echo "\n";

// 4. Bestellung aufgeben
$gesamt = $wagen->gesamtBerechnen();
echo "Bestellung ueber \$$gesamt wird bearbeitet...\n";

if ($kunde->abbuchen($gesamt)) {
    // Bestand jedes Produkts reduzieren
    foreach ($wagen->getArtikel() as $artikel) {
        $artikel["produkt"]->verkaufen($artikel["menge"]);
    }

    // Bestellung erstellen
    $bestellung = new Bestellung($kunde, $wagen->getArtikel(), $gesamt);
    $wagen->leeren();

    echo "\n";
    $bestellung->zusammenfassungAnzeigen();

    echo "\nVerbleibendes Guthaben von $kunde->name: \$" . $kunde->getGuthaben() . "\n";
    echo "Gesamtzahl der Bestellungen: " . Bestellung::getGesamtBestellungen() . "\n";
} else {
    echo "Guthaben nicht ausreichend\n";
}

echo "\nAktualisierter Bestand:\n";
$tshirt->infoAnzeigen();
$laptop->infoAnzeigen();
$turnschuhe->infoAnzeigen();
