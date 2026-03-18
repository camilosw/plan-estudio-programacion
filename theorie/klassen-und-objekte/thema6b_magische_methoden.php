<?php
// ============================================================
// THEMA 6b: Magische Methoden __get und __set — Dynamischer Zugriff auf Attribute
// ============================================================
//
// ZIEL: Die magischen Methoden __get und __set von PHP
// kennenlernen, die das Lesen und Schreiben privater
// Attribute automatisch abfangen.
//
// ERKLAERUNG:
// In Thema 6 haben wir gelernt, explizite Getter und Setter
// zu erstellen (getPreis, setPreis). PHP bietet eine andere
// Moeglichkeit: die MAGISCHEN METHODEN __get und __set.
//
//   - __get($attribut) wird AUTOMATISCH aufgerufen, wenn jemand
//     versucht, ein privates oder nicht existierendes Attribut
//     zu LESEN.
//
//   - __set($attribut, $wert) wird AUTOMATISCH aufgerufen, wenn
//     jemand versucht, in ein privates oder nicht existierendes
//     Attribut zu SCHREIBEN.
//
// Der doppelte Unterstrich (__) ist dieselbe Konvention wie
// bei __construct — zeigt an, dass PHP es automatisch aufruft.
//
// UNTERSCHIED ZU EXPLIZITEN GETTERN/SETTERN:
//   - Explizit: eine Methode pro Attribut (getPreis,
//     setPreis, getBestand, setBestand...)
//   - Magisch: EINE EINZIGE __get-Methode und EINE EINZIGE
//     __set-Methode die ALLE Attribute verwalten
// ============================================================


// ============================================================
// TEIL 1: Wiederholung — Mit expliziten Gettern und Settern (Thema 6)
// ============================================================

class ProduktMitGetternSettern {
    public $name;
    private $preis;
    private $preisNachRabatt;

    function __construct($name, $preis) {
        $this->name = $name;
        $this->preis = $preis;
        $this->preisNachRabatt = $preis;
    }

    // Getter zum Lesen des Preises
    function getPreis() {
        return $this->preis;
    }

    // Getter zum Lesen des Rabattpreises
    function getPreisNachRabatt() {
        return $this->preisNachRabatt;
    }

    // Setter mit Logik: validiert den Preis und setzt den Rabatt zurueck
    function setPreis($neuerPreis) {
        if ($neuerPreis > 0) {
            $this->preis = $neuerPreis;
            $this->preisNachRabatt = $neuerPreis;
            echo "Preis aktualisiert auf \$$neuerPreis\n";
        } else {
            echo "Der Preis muss groesser als 0 sein\n";
        }
    }

    function rabattAnwenden($prozent) {
        $this->preisNachRabatt = $this->preis * (1 - $prozent / 100);
    }
}

echo "=== MIT EXPLIZITEN GETTERN UND SETTERN ===\n\n";

$produkt1 = new ProduktMitGetternSettern("Laptop", 999.99);

echo "Preis: \$" . $produkt1->getPreis() . "\n";
// Ausgabe: Preis: $999.99

$produkt1->rabattAnwenden(10);
echo "Mit Rabatt: \$" . $produkt1->getPreisNachRabatt() . "\n";
// Ausgabe: Mit Rabatt: $899.991

$produkt1->setPreis(1099.99);
// Ausgabe: Preis aktualisiert auf $1099.99

echo "Preis mit Rabatt (wurde zurueckgesetzt): \$" . $produkt1->getPreisNachRabatt() . "\n";
// Ausgabe: Preis mit Rabatt (wurde zurueckgesetzt): $1099.99

$produkt1->setPreis(-50);
// Ausgabe: Der Preis muss groesser als 0 sein


// ============================================================
// TEIL 2: Dieselbe Klasse mit __get und __set
// ============================================================
//
// Jetzt schreiben wir dieselbe Klasse neu, aber anstatt
// getPreis(), getPreisNachRabatt() und setPreis() zu haben,
// verwenden wir __get und __set.
//
// Das Ergebnis ist, dass wir schreiben koennen:
//   $produkt->preis           anstatt   $produkt->getPreis()
//   $produkt->preis = 1099    anstatt   $produkt->setPreis(1099)
//
// Es sieht aus, als waere das Attribut oeffentlich, aber im
// Hintergrund wird die Validierungslogik ausgefuehrt.
// ============================================================

class Produkt {
    private $name;
    private $preis;
    private $preisNachRabatt;

    function __construct($name, $preis) {
        $this->name = $name;
        $this->preis = $preis;
        $this->preisNachRabatt = $preis;
    }

    // __get wird automatisch beim LESEN eines privaten Attributs aufgerufen
    function __get($attribut) {
        if ($attribut == "name") {
            return $this->name;
        } elseif ($attribut == "preis") {
            return $this->preis;
        } elseif ($attribut == "preisNachRabatt") {
            return $this->preisNachRabatt;
        } else {
            echo "Die Eigenschaft '$attribut' existiert nicht\n";
            return null;
        }
    }

    // __set wird automatisch beim SCHREIBEN in ein privates Attribut aufgerufen
    function __set($attribut, $wert) {
        if ($attribut == "preis") {
            // Dieselbe Logik wie der Setter aus Thema 6
            if ($wert > 0) {
                $this->preis = $wert;
                $this->preisNachRabatt = $wert; // Rabatt wird zurueckgesetzt
                echo "Preis aktualisiert auf \$$wert\n";
            } else {
                echo "Der Preis muss groesser als 0 sein\n";
            }
        } elseif ($attribut == "name") {
            echo "Der Name kann nicht geaendert werden\n";
        } else {
            echo "Die Eigenschaft '$attribut' kann nicht geaendert werden\n";
        }
    }

    function rabattAnwenden($prozent) {
        $this->preisNachRabatt = $this->preis * (1 - $prozent / 100);
    }
}

echo "\n\n=== MIT MAGISCHEN METHODEN __get UND __set ===\n\n";

$produkt2 = new Produkt("Laptop", 999.99);

// Private Attribute lesen — sieht oeffentlich aus, verwendet aber __get
echo "Preis: \$" . $produkt2->preis . "\n";
// Ausgabe: Preis: $999.99

$produkt2->rabattAnwenden(10);
echo "Mit Rabatt: \$" . $produkt2->preisNachRabatt . "\n";
// Ausgabe: Mit Rabatt: $899.991

// Preis aendern — sieht aus wie direkte Zuweisung, verwendet aber __set
$produkt2->preis = 1099.99;
// Ausgabe: Preis aktualisiert auf $1099.99

echo "Preis mit Rabatt (wurde zurueckgesetzt): \$" . $produkt2->preisNachRabatt . "\n";
// Ausgabe: Preis mit Rabatt (wurde zurueckgesetzt): $1099.99

// Ungueltigen Preis versuchen — __set lehnt ab
$produkt2->preis = -50;
// Ausgabe: Der Preis muss groesser als 0 sein

// Versuchen den Namen zu aendern — __set verhindert es
$produkt2->name = "Tablet";
// Ausgabe: Der Name kann nicht geaendert werden

// Versuchen eine nicht existierende Eigenschaft zu lesen
echo $produkt2->farbe;
// Ausgabe: Die Eigenschaft 'farbe' existiert nicht

echo "\n";
echo "Der Name ist immer noch: " . $produkt2->name . "\n";
// Ausgabe: Der Name ist immer noch: Laptop

// ============================================================
// HINWEIS: Das Verhalten ist IDENTISCH mit expliziten Gettern
// und Settern, aber die Syntax ist natuerlicher:
//
//   VORHER (Thema 6):               JETZT (Thema 6b):
//   $produkt->getPreis()            $produkt->preis
//   $produkt->setPreis(1099)        $produkt->preis = 1099
//
// Wann welche verwenden?
//   - Explizite Getter/Setter: wenn jedes Attribut sehr
//     unterschiedliche Logik hat und es klar sein soll, was
//     jede Methode tut.
//   - __get/__set: wenn eine sauberere Syntax gewuenscht ist
//     und die Behandlung fuer mehrere Attribute einheitlich ist.
// ============================================================
