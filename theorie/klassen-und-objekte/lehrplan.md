# Lehrplan: Klassen und Objekte in PHP

## Kontext

Klassen und Objekte lernen. Der Plan geht vom Grundlegendsten bis zu einem mittleren Niveau. Ein **Online-Shop** wird als roter Faden fuer alle Beispiele und Uebungen verwendet, um die Konzepte greifbar und miteinander verbunden zu machen.

---

## Struktur des Plans

Jedes Thema folgt dem Format:

1. **Erklaerung** des Konzepts (kurz)
2. **Codebeispiel** im Kontext eines Online-Shops
3. **Praktische Uebung** zum Selbstloesen

---

## Thema 1: Was ist eine Klasse? — Die Klasse als Datenvorlage

**Ziel:** Verstehen, dass eine Klasse eine Vorlage ist, um "Dinge" mit Informationen darin zu erstellen.

**Erklaerung:** Vergleich mit dem echten Leben: Ein Produktdatenblatt in einem Laden hat immer die gleichen Felder (Name, Preis, Bestand). Die Klasse ist die Vorlage dieses Datenblatts; jedes konkrete Produkt ist ein Objekt.

**Beispiel:**

```php
class Produkt {
    public $name;
    public $preis;
    public $bestand;
}

// Ein Objekt erstellen (ein konkretes Produkt)
$tshirt = new Produkt();
$tshirt->name = "Blaues T-Shirt";
$tshirt->preis = 19.99;
$tshirt->bestand = 50;

echo $tshirt->name; // Blaues T-Shirt
echo $tshirt->preis; // 19.99
```

**Uebung:**
Eine Klasse `Kunde` mit den Attributen `name`, `email` und `telefon` erstellen. Dann 2 verschiedene Kunden erstellen und ihre Daten mit `echo` anzeigen.

---

## Thema 2: Der Konstruktor — Objekte von Anfang an mit Daten erstellen

**Ziel:** Vermeiden, Attribute einzeln zuzuweisen, indem `__construct` verwendet wird.

**Erklaerung:** Der Konstruktor ist eine spezielle Funktion, die automatisch beim Erstellen des Objekts ausgefuehrt wird. Er ermoeglicht es, die Daten direkt beim Erstellen zu uebergeben.

**Beispiel:**

```php
class Produkt {
    public $name;
    public $preis;
    public $bestand;

    function __construct($name, $preis, $bestand) {
        $this->name = $name;
        $this->preis = $preis;
        $this->bestand = $bestand;
    }
}

// Jetzt in einer einzigen Zeile erstellt
$tshirt = new Produkt("Blaues T-Shirt", 19.99, 50);
echo $tshirt->name; // Blaues T-Shirt
```

**Uebung:**
Die Klasse `Kunde` aus dem vorherigen Thema so aendern, dass sie einen Konstruktor verwendet. 2 Kunden mit dem Konstruktor erstellen und ihre Daten anzeigen.

---

## Thema 3: Methoden — Funktionen innerhalb der Klasse

**Ziel:** Verstehen, dass Klassen Funktionen (Methoden) haben koennen, die mit ihren eigenen Daten arbeiten.

**Erklaerung:** So wie ein Produktdatenblatt Aktionen haben kann ("Rabatt anwenden", "Bestand reduzieren"), kann eine Klasse Funktionen haben, die mit ihren Attributen arbeiten.

**Beispiel:**

```php
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

    function rabattAnwenden($prozent) {
        $this->preisNachRabatt = $this->preis * (1 - $prozent / 100);
    }

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

$tshirt = new Produkt("Blaues T-Shirt", 19.99, 50);
$tshirt->infoAnzeigen();       // Blaues T-Shirt - Preis: $19.99 - Mit Rabatt: $19.99 - Bestand: 50
$tshirt->rabattAnwenden(10);
$tshirt->verkaufen(3);
$tshirt->infoAnzeigen();       // Blaues T-Shirt - Preis: $19.99 - Mit Rabatt: $17.991 - Bestand: 47
```

**Hinweis:** Der Originalpreis geht nicht verloren. `$preisNachRabatt` speichert den Endpreis nach dem Rabatt.

**Uebung:**
Eine Klasse `Kunde` erstellen mit:

- Attributen: `$name`, `$email`, `$punkte` (beginnt bei 0)
- Einer Methode `einkaufen($betrag)`, die 1 Punkt pro $10 Ausgaben addiert (ganzzahlige Division verwenden)
- Einer Methode `punkteAnzeigen()`, die den Namen des Kunden und seine gesammelten Punkte ausgibt

Einen Kunden erstellen, mehrere Einkaeufe taetigen und die gesammelten Punkte anzeigen.

---

## Thema 4: Methoden die Werte zurueckgeben vs. Methoden die ausgeben

**Ziel:** Zwischen Methoden unterscheiden, die `echo` verwenden, und Methoden, die `return` verwenden, und wann welche eingesetzt wird.

**Erklaerung:** Eine Methode kann direkt ausgeben oder einen Wert zurueckgeben, damit wir ihn spaeter verwenden koennen. `return` ist flexibler, weil das Ergebnis in anderen Operationen verwendet werden kann.

**Beispiel:**

```php
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

// Wir koennen den zurueckgegebenen Wert auf viele Arten nutzen
$endpreis = $produkt->preisMitMwSt(21);
echo "Preis mit MwSt: \$$endpreis\n";

// Wir koennen ihn auch in Berechnungen verwenden
$preisMitVersand = $produkt->preisMitMwSt(21) + 15;
```

**Uebung:**
Die Klasse `Produkt` so aendern, dass die Methode `rabattAnwenden` `return` verwendet (den Preis mit Rabatt zurueckgibt) anstatt das Attribut direkt zu aendern. Dann den zurueckgegebenen Wert verwenden um:

1. Den Preis mit Rabatt anzuzeigen
2. Den Preis mit Rabatt + 21% MwSt zu berechnen
3. Zu vergleichen, ob der Preis mit Rabatt unter $15 liegt

---

## Thema 5: Sichtbarkeit — public, private und protected

**Ziel:** Verstehen, warum wir nicht immer moechten, dass die Daten eines Objekts von aussen zugaenglich sind.

**Erklaerung:** Bisher war alles `public` (jeder kann lesen und aendern). Aber manchmal moechten wir Daten schuetzen. Zum Beispiel moechten wir nicht, dass jemand den Bestand eines Produkts direkt von aussen aendern kann — er sollte sich nur aendern, wenn etwas verkauft wird.

- `public`: von ueberall zugaenglich
- `private`: nur innerhalb der eigenen Klasse zugaenglich
- `protected`: innerhalb der Klasse und ihrer Kindklassen zugaenglich (wird bei Vererbung behandelt)

**Beispiel:**

```php
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

    function rabattAnwenden($prozent) {
        if ($prozent > 0 && $prozent <= 50) {
            $this->preisNachRabatt = $this->preis * (1 - $prozent / 100);
            echo "Rabatt angewendet. Preis mit Rabatt: \$$this->preisNachRabatt\n";
        } else {
            echo "Ungueltiger Rabatt (muss zwischen 1% und 50% liegen)\n";
        }
    }

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

$produkt->rabattAnwenden(10);
$produkt->verkaufen(2);
$produkt->infoAnzeigen();

// Das funktioniert (public):
echo $produkt->name;
echo $produkt->preis;

// Das gibt einen FEHLER (private):
// echo $produkt->preisNachRabatt;  // Kann nicht von aussen gelesen werden
// echo $produkt->bestand;           // Kann nicht von aussen gelesen werden
// $produkt->bestand = 999;          // Kann nicht von aussen geaendert werden
```

**Hinweis zur Erklaerung:** Private Attribute koennen nur ueber die Methoden der Klasse gelesen oder geaendert werden. Das schuetzt die Integritaet der Daten — zum Beispiel aendert sich der Bestand nur beim Verkauf, und der Rabatt wird nur angewendet, wenn er gueltig ist.

**Uebung:**
Eine Klasse `Kundenkonto` erstellen mit:

- `public $name`
- `private $guthaben` (beginnt bei 0)
- Methode `einzahlen($betrag)` — erlaubt nur positive Betraege
- Methode `einkaufen($betrag)` — erlaubt nur Einkaeufe, wenn genuegend Guthaben vorhanden ist
- Methode `guthabenAnzeigen()` — gibt den Namen und das aktuelle Guthaben aus

Einen Kunden erstellen, Einzahlungen und Einkaeufe taetigen und ueberpruefen, dass auf `$guthaben` nicht direkt von aussen zugegriffen werden kann.

---

## Thema 6: Getter und Setter — Kontrollierter Zugriff auf private Attribute

**Ziel:** Lernen, private Attribute kontrolliert zu lesen und zu aendern.

**Erklaerung:** Im vorherigen Thema haben wir gesehen, dass private Attribute nicht von aussen gelesen oder geaendert werden koennen. Aber manchmal muessen wir das kontrolliert tun. Dafuer gibt es Getter und Setter:

- **Getter**: Methode, die erlaubt, ein privates Attribut zu _lesen_
- **Setter**: Methode, die erlaubt, ein privates Attribut zu _aendern_, wobei Validierungen oder zusaetzliche Logik hinzugefuegt werden koennen

**Beispiel:**

```php
class Produkt {
    public $name;
    private $preis;
    private $preisNachRabatt;

    function __construct($name, $preis) {
        $this->name = $name;
        $this->preis = $preis;
        $this->preisNachRabatt = $preis;
    }

    // Getter: erlaubt das Lesen des Preises von aussen
    function getPreis() {
        return $this->preis;
    }

    // Getter: erlaubt das Lesen des Rabattpreises von aussen
    function getPreisNachRabatt() {
        return $this->preisNachRabatt;
    }

    // Setter: beim Aendern des Preises wird automatisch der Rabattpreis neu berechnet
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
echo $produkt->getPreis();             // 999.99
echo $produkt->getPreisNachRabatt(); // 999.99

// Rabatt anwenden
$produkt->rabattAnwenden(10);
echo $produkt->getPreisNachRabatt(); // 899.991

// Preis mit Setter aendern (setzt den Rabatt automatisch zurueck)
$produkt->setPreis(1099.99);
echo $produkt->getPreisNachRabatt(); // 1099.99 (wurde zurueckgesetzt)

// Ungueltigen Preis versuchen
$produkt->setPreis(-50); // "Der Preis muss groesser als 0 sein"
```

**Hinweis zur Erklaerung:** Der Vorteil des Setters `setPreis` ist, dass beim Aendern des Preises automatisch der `preisNachRabatt` neu berechnet wird. Wenn der Preis oeffentlich waere und direkt geaendert wuerde, wuerde der `preisNachRabatt` veraltet bleiben.

**Uebung:**
Die Klasse `Kundenkonto` aus dem vorherigen Thema so aendern, dass:

- `einzahlen` und `einkaufen` weiterhin gleich funktionieren
- Ein Getter `getGuthaben()` hinzugefuegt wird, der das Guthaben zurueckgibt
- Ein Attribut `private $ausgabenLimit` hinzugefuegt wird (wird im Konstruktor definiert)
- Ein Getter `getAusgabenLimit()` hinzugefuegt wird
- Ein Setter `setAusgabenLimit($neuesLimit)` hinzugefuegt wird, der nur positive Werte erlaubt
- `einkaufen()` so geaendert wird, dass keine Einkaeufe erlaubt werden, die das Ausgabenlimit ueberschreiten

---

## Thema 6b: Magische Methoden `__get` und `__set` — Dynamischer Zugriff auf Attribute

**Ziel:** Die magischen Methoden `__get` und `__set` von PHP kennenlernen, die das Lesen und Schreiben privater Attribute automatisch abfangen.

**Erklaerung:** Im vorherigen Thema haben wir gelernt, explizite Getter und Setter zu erstellen (`getPreis`, `setPreis`). PHP bietet eine andere Moeglichkeit: die magischen Methoden `__get` und `__set`. Sie werden automatisch aufgerufen, wenn jemand versucht, ein privates Attribut zu lesen oder zu schreiben. Der Vorteil ist, dass mit einer einzigen Methode alle Attribute verwaltet werden. Der doppelte Unterstrich (`__`) ist dieselbe Konvention wie bei `__construct`.

- `__get($attribut)`: wird beim Versuch aufgerufen, ein privates Attribut zu **lesen**
- `__set($attribut, $wert)`: wird beim Versuch aufgerufen, in ein privates Attribut zu **schreiben**

**Beispiel (Teil 1 — mit Gettern und Settern aus Thema 6):**

```php
class ProduktMitGetternSettern {
    public $name;
    private $preis;
    private $preisNachRabatt;

    function __construct($name, $preis) {
        $this->name = $name;
        $this->preis = $preis;
        $this->preisNachRabatt = $preis;
    }

    function getPreis() {
        return $this->preis;
    }

    function getPreisNachRabatt() {
        return $this->preisNachRabatt;
    }

    function setPreis($neuerPreis) {
        if ($neuerPreis > 0) {
            $this->preis = $neuerPreis;
            $this->preisNachRabatt = $neuerPreis;
            echo "Preis aktualisiert auf \$$neuerPreis\n";
        } else {
            echo "Der Preis muss groesser als 0 sein\n";
        }
    }
}

$produkt = new ProduktMitGetternSettern("Laptop", 999.99);
echo $produkt->getPreis();             // 999.99
$produkt->setPreis(1099.99);           // Preis aktualisiert auf $1099.99
```

**Beispiel (Teil 2 — dieselbe Klasse mit `__get` und `__set`):**

```php
class Produkt {
    private $name;
    private $preis;
    private $preisNachRabatt;

    function __construct($name, $preis) {
        $this->name = $name;
        $this->preis = $preis;
        $this->preisNachRabatt = $preis;
    }

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

    function __set($attribut, $wert) {
        if ($attribut == "preis") {
            if ($wert > 0) {
                $this->preis = $wert;
                $this->preisNachRabatt = $wert;
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
}

// Gleiche Funktionalitaet, natuerlichere Syntax:
$produkt = new Produkt("Laptop", 999.99);
echo $produkt->preis;       // 999.99 (verwendet __get)
$produkt->preis = 1099.99;  // Preis aktualisiert auf $1099.99 (verwendet __set)
$produkt->preis = -50;      // Der Preis muss groesser als 0 sein
$produkt->name = "Tablet";  // Der Name kann nicht geaendert werden
```

**Hinweis zur Erklaerung:** Das Verhalten ist identisch, aber die Syntax aendert sich: `$produkt->preis` statt `$produkt->getPreis()`. Explizite Getter/Setter sind besser, wenn jedes Attribut sehr unterschiedliche Logik hat; magische Methoden sind nuetzlich, wenn die Behandlung fuer mehrere Attribute einheitlich ist.

**Uebung:**
Eine Klasse `Kundenkonto` mit expliziten Gettern und Settern ist gegeben. Diese durch `__get` und `__set` ersetzen, wobei dieselbe Validierungslogik beibehalten wird (das Guthaben darf nicht negativ sein oder das Ausgabenlimit ueberschreiten, das Limit muss positiv sein, der Name kann nicht geaendert werden).

---

## Thema 7: Vererbung — Klassen die von anderen erben

**Ziel:** Code wiederverwenden, indem Kindklassen erstellt werden, die eine Elternklasse erweitern.

**Hinweis:** Hier wird `protected` wieder aufgegriffen — es wird erklaert, dass `protected`-Attribute in Kindklassen zugaenglich sind, aber nicht von aussen, im Gegensatz zu `private`.

**Erklaerung:** In einem Online-Shop gibt es verschiedene Arten von Produkten: Kleidung, Elektronik, Lebensmittel. Alle haben Name, Preis und Bestand, aber jeder Typ kann zusaetzliche Attribute und Verhaltensweisen haben. Anstatt Code zu wiederholen, erstellen wir eine Basisklasse und erweitern sie.

**Beispiel:**

```php
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

    function infoAnzeigen() {
        echo "$this->name - \$$this->preis - Bestand: $this->bestand\n";
    }
}

class KleidungsProdukt extends Produkt {
    public $groesse;
    public $farbe;

    function __construct($name, $preis, $bestand, $groesse, $farbe) {
        parent::__construct($name, $preis, $bestand);
        $this->groesse = $groesse;
        $this->farbe = $farbe;
    }

    function infoAnzeigen() {
        parent::infoAnzeigen();
        echo "  Groesse: $this->groesse, Farbe: $this->farbe\n";
    }
}

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

$tshirt = new KleidungsProdukt("T-Shirt", 19.99, 50, "M", "Blau");
$laptop = new ElektronikProdukt("Laptop", 999.99, 10, 24);

$tshirt->infoAnzeigen();
$laptop->infoAnzeigen();
```

**Hinweis zur Erklaerung:** Hier sieht man, warum `protected` existiert — die Attribute `$preis` und `$bestand` sind in Kindklassen zugaenglich, aber nicht von aussen.

**Uebung:**
Eine Basisklasse `Benutzer` mit `name` und `email` erstellen. Dann zwei Kindklassen erstellen:

- `VipKunde`, der ein zusaetzliches Attribut `$vipRabatt` hat und eine Methode `rabattAnwenden($preis)`, die den Preis mit dem Rabatt zurueckgibt
- `Administrator`, der ein zusaetzliches Attribut `$stufe` hat und eine Methode `kannProdukteLoeschen()`, die `true` zurueckgibt, wenn die Stufe groesser als 2 ist

---

## Thema 8: Statische Eigenschaften und Methoden

**Ziel:** Verstehen, dass es Daten und Funktionen gibt, die zur Klasse selbst gehoeren, nicht zu einem bestimmten Objekt.

**Erklaerung:** Manchmal gibt es Werte, die fuer alle Produkte gleich sind und sich nie aendern, wie der MwSt-Prozentsatz. Es macht keinen Sinn, dass jedes Produkt seine eigene Kopie der MwSt speichert — es ist ein Datum der Klasse im Allgemeinen. Dafuer verwenden wir `static`.

- Eine **statische Eigenschaft** wird von allen Objekten der Klasse geteilt. Sie wird mit `static` definiert und mit `self::` innerhalb der Klasse oder `Klassenname::` von aussen zugegriffen.
- Eine **statische Methode** kann ohne Erstellung eines Objekts aufgerufen werden, mit `Klassenname::methode()`. Sie ist nuetzlich fuer Operationen, die nicht von einem bestimmten Objekt abhaengen.

**Beispiel:**

```php
class Produkt {
    public $name;
    public $preis;
    private static $mwStProzent = 21;

    function __construct($name, $preis) {
        $this->name = $name;
        $this->preis = $preis;
    }

    // Statische Methode: berechnet die MwSt fuer jeden Preis, ohne ein Objekt zu benoetigen
    static function mwStBerechnen($preis) {
        return $preis * self::$mwStProzent / 100;
    }

    // Statische Methode: gibt einen Preis mit MwSt zurueck
    static function preisMitMwSt($preis) {
        return $preis + self::mwStBerechnen($preis);
    }

    // Normale Methode: verwendet den Preis des Objekts
    function getPreisMitMwSt() {
        return self::preisMitMwSt($this->preis);
    }

    function infoAnzeigen() {
        $mitMwSt = $this->getPreisMitMwSt();
        echo "$this->name - Preis: \$$this->preis - Mit MwSt: \$$mitMwSt\n";
    }
}

// Statische Methoden koennen OHNE ein Produkt zu erstellen verwendet werden
echo Produkt::mwStBerechnen(100);    // 21
echo Produkt::preisMitMwSt(100);   // 121

// Funktionieren auch mit Objekten
$laptop = new Produkt("Laptop", 999.99);
$laptop->infoAnzeigen(); // Laptop - Preis: $999.99 - Mit MwSt: $1209.9879
```

**Hinweis zur Erklaerung:** Der wichtige Unterschied:

- `$this->preis` gehoert zu EINEM bestimmten Produkt (jedes Produkt hat seinen Preis)
- `self::$mwStProzent` gehoert zur KLASSE — ist fuer alle Produkte gleich
- Statische Methoden koennen `$this` nicht verwenden, da sie nicht an ein Objekt gebunden sind

**Uebung:**
Eine Klasse `Versand` erstellen mit:

- Einer statischen Eigenschaft `$kostenProKilo` mit Wert 5 (die Kosten pro Kilo sind fuer alle Sendungen gleich)
- Einem Attribut `$ziel` und einem Attribut `$gewichtKg`
- Einer statischen Methode `kostenBerechnen($gewicht)`, die die Versandkosten zurueckgibt (Gewicht * Kosten pro Kilo)
- Einer normalen Methode `getVersandkosten()`, die die Versandkosten des Objekts mit seinem eigenen Gewicht zurueckgibt
- Einer Methode `versandAnzeigen()`, die Ziel, Gewicht und Kosten anzeigt

2 Sendungen mit verschiedenen Zielen und Gewichten erstellen. Auch die statische Methode direkt verwenden, um die Kosten einer 3-kg-Sendung zu berechnen, ohne ein Objekt zu erstellen.

---

## Thema 9: Integrationsprojekt — Mini-Online-Shop

**Ziel:** Alle Konzepte in einer vollstaendigen Uebung integrieren.

**Abschlussuebung:**
Ein einfaches Online-Shop-System erstellen, das alle waehrend des Kurses erstellten Klassen verwendet:

1. Klasse `Produkt` (mit Vererbung: `KleidungsProdukt`, `ElektronikProdukt`)
2. Klasse `Kunde` (mit private Sichtbarkeit fuer das Guthaben)
3. Klasse `Einkaufswagen` (mit Methoden zum Hinzufuegen, Entfernen und Berechnen des Gesamtbetrags)
4. Klasse `Bestellung` (mit statischem Bestellungszaehler)

Programmablauf:

```
- Mehrere Produkte verschiedener Typen erstellen
- Einen Kunden mit Guthaben erstellen
- Der Kunde fuegt Produkte zum Einkaufswagen hinzu
- Der Kunde gibt die Bestellung auf (wird vom Guthaben abgezogen)
- Bestellungszusammenfassung mit Bestellnummer, Produkten und Gesamtbetrag anzeigen
```

---

## Zusammenfassung der Progression

| Thema | Schluesselkonzept          | Was gelernt wird                              |
| ----- | -------------------------- | --------------------------------------------- |
| 1     | Klasse mit Attributen      | Was eine Klasse ist, `new`, `->`              |
| 2     | Konstruktor                | `__construct`, `$this`                        |
| 3     | Methoden                   | Funktionen innerhalb der Klasse               |
| 4     | Return vs echo             | Methoden die Werte zurueckgeben               |
| 5     | Sichtbarkeit               | `public`, `private`, `protected`              |
| 6     | Getter und Setter          | Kontrollierter Zugriff, Logik in Settern      |
| 6b    | Magische Methoden          | `__get`, `__set`, dynamischer Zugriff         |
| 7     | Vererbung                  | `extends`, `parent::`, Ueberschreibung        |
| 8     | Statisch                   | `static`, `self::`, MwSt als geteiltes Datum  |
| 9     | Integration                | Projekt das alles kombiniert                  |

---

## Zu erstellende Dateien

Es wird eine PHP-Datei pro Thema im Projektordner erstellt:

- `tema1_clases_basicas.php`
- `tema2_constructor.php`
- `tema3_metodos.php`
- `tema4_return_vs_echo.php`
- `tema5_visibilidad.php`
- `tema6_getters_setters.php`
- `tema6b_metodos_magicos.php`
- `tema7_herencia.php`
- `tema8_estaticos.php`
- `tema9_proyecto_integrador.php`

Jede Datei enthaelt die Erklaerung als Kommentare, ein funktionierendes Codebeispiel und die Uebung als Kommentar am Ende.

## Ueberpruefung

- Jede PHP-Datei muss ohne Fehler mit `php dateiname.php` ausgefuehrt werden koennen
- Die Beispiele muessen die erwartete Ausgabe produzieren, die in den Kommentaren angegeben ist
