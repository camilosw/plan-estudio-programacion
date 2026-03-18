<?php
// ============================================================
// ÜBUNG 6b: Magische Methoden __get und __set
// ============================================================
//
// Unten findest du eine Klasse Kundenkonto, die explizite Getters
// und Setters verwendet. Deine Aufgabe ist es, diese 4 Methoden
// durch die magischen Methoden __get und __set zu ERSETZEN.
//
// WICHTIG: Die Validierungslogik muss gleich bleiben:
//   - guthaben: nur ein Wert >= 0 darf zugewiesen werden
//   - ausgabenlimit: nur ein positiver Wert darf zugewiesen werden
//   - name: darf NICHT geändert werden (Fehlermeldung anzeigen)
//   - Jede andere Eigenschaft: "Eigenschaft X existiert nicht" anzeigen
//
// Die Methoden einzahlen() und einkaufen() werden NICHT geändert.
//
// Am Ende muss der Beispielcode unten mit der neuen Syntax
// funktionieren ($konto->guthaben statt $konto->getGuthaben()).
// ============================================================


// --- ORIGINALKLASSE MIT GETTERS UND SETTERS ---
// (Ersetze die 4 markierten Methoden durch __get und __set)

class Kundenkonto {
    private $name;
    private $guthaben;
    private $ausgabenlimit;

    function __construct($name, $ausgabenlimit) {
        $this->name = $name;
        $this->guthaben = 0;
        $this->ausgabenlimit = $ausgabenlimit;
    }

    // --- DIESE 4 METHODEN DURCH __get UND __set ERSETZEN ---

    function getGuthaben() {
        return $this->guthaben;
    }

    function getAusgabenlimit() {
        return $this->ausgabenlimit;
    }

    function setAusgabenlimit($neuesLimit) {
        if ($neuesLimit > 0) {
            $this->ausgabenlimit = $neuesLimit;
            echo "Limit aktualisiert auf \$$neuesLimit\n";
        } else {
            echo "Das Limit muss größer als 0 sein\n";
        }
    }

    function setGuthaben($neuesGuthaben) {
        if ($neuesGuthaben < 0) {
            echo "Das Guthaben darf nicht negativ sein\n";
        } elseif ($neuesGuthaben > $this->ausgabenlimit) {
            echo "Das Guthaben darf das Limit von \$$this->ausgabenlimit nicht überschreiten\n";
        } else {
            $this->guthaben = $neuesGuthaben;
        }
    }

    // --- ENDE DER ZU ERSETZENDEN METHODEN ---

    function einzahlen($betrag) {
        if ($betrag > 0) {
            $this->guthaben += $betrag;
            echo "Einzahlung von \$$betrag. Guthaben: \$$this->guthaben\n";
        } else {
            echo "Der Betrag muss größer als 0 sein\n";
        }
    }

    function einkaufen($betrag) {
        if ($betrag > $this->ausgabenlimit) {
            echo "Der Einkauf von \$$betrag überschreitet das Limit von \$$this->ausgabenlimit\n";
        } elseif ($betrag > $this->guthaben) {
            echo "Guthaben reicht nicht aus für den Einkauf von \$$betrag\n";
        } else {
            $this->guthaben -= $betrag;
            echo "Einkauf von \$$betrag. Guthaben: \$$this->guthaben\n";
        }
    }
}


// --- BEISPIELCODE ---
// Am Ende muss dieser Code mit __get und __set funktionieren.
// Ändere die Zeilen, die Getters/Setters verwenden, auf die
// direkte Syntax (z.B.: $konto->getGuthaben() → $konto->guthaben)

$konto = new Kundenkonto("Ana", 500);

// Attribute lesen (jetzt: $konto->name, $konto->guthaben, usw.)
echo "Kunde: " . $konto->getGuthaben() . "\n"; // Ändern zu $konto->guthaben
echo "Limit: \$" . $konto->getAusgabenlimit() . "\n"; // Ändern zu $konto->ausgabenlimit

$konto->einzahlen(300);
// Einzahlung von $300. Guthaben: $300

// Versuch, negatives Guthaben zuzuweisen (muss abgelehnt werden)
$konto->setGuthaben(-100); // Ändern zu $konto->guthaben = -100
// Das Guthaben darf nicht negativ sein

// Versuch, Guthaben über dem Limit zuzuweisen
$konto->setGuthaben(600); // Ändern zu $konto->guthaben = 600
// Das Guthaben darf das Limit von $500 nicht überschreiten

// Ausgabenlimit ändern
$konto->setAusgabenlimit(800); // Ändern zu $konto->ausgabenlimit = 800
// Limit aktualisiert auf $800

// Versuch, den Namen zu ändern (muss abgelehnt werden)
// $konto->name = "Luis";
// Der Name kann nicht geändert werden

$konto->einkaufen(200);
// Einkauf von $200. Guthaben: $100

echo "Endguthaben: \$" . $konto->getGuthaben() . "\n"; // Ändern zu $konto->guthaben
