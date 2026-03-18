<?php
// ============================================================
// THEMA 1: Was ist eine Klasse? — Die Klasse als Datenvorlage
// ============================================================
//
// ZIEL: Verstehen, dass eine Klasse eine Vorlage ist, um
// "Dinge" mit Informationen darin zu erstellen.
//
// ERKLAERUNG:
// Denk an ein Produktdatenblatt in einem Laden. Alle
// Datenblaetter haben die gleichen Felder: Name, Preis, Bestand.
// Die KLASSE ist die Vorlage dieses Datenblatts.
// Jedes konkrete Produkt, das wir erstellen, ist ein OBJEKT.
//
// Syntax:
//   class Klassenname {
//       public $attribut;
//   }
//
//   $objekt = new Klassenname();
//   $objekt->attribut = "wert";
// ============================================================

// Wir definieren die Klasse Produkt (die Vorlage)
class Produkt {
    public $name;
    public $preis;
    public $bestand;
}

// Wir erstellen ein Objekt (ein konkretes Produkt)
$tshirt = new Produkt();
$tshirt->name = "Blaues T-Shirt";
$tshirt->preis = 19.99;
$tshirt->bestand = 50;

// Wir erstellen ein weiteres Objekt (ein anderes Produkt)
$hose = new Produkt();
$hose->name = "Schwarze Hose";
$hose->preis = 39.99;
$hose->bestand = 30;

// Wir zeigen die Daten jedes Produkts an
echo "Produkt 1: $tshirt->name\n";
echo "Preis: \$$tshirt->preis\n";
echo "Bestand: $tshirt->bestand Stueck\n";
echo "\n";
echo "Produkt 2: $hose->name\n";
echo "Preis: \$$hose->preis\n";
echo "Bestand: $hose->bestand Stueck\n";
