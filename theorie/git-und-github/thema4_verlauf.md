=========================================================
THEMA 4: Verlauf und Navigation — log, diff, gitignore
=========================================================

ZIEL
----
Den Änderungsverlauf anzeigen, Versionen vergleichen und lernen, Dateien zu ignorieren, die wir nicht verfolgen möchten.

ERKLÄRUNG
---------

### git log — Den Commit-Verlauf anzeigen

Jeder Commit, den wir machen, wird im Verlauf gespeichert. Wir können ihn mit `git log` anzeigen. Jeder Commit hat:

- Einen **Hash** (eindeutiger Bezeichner) — ein langer Code wie `b2c3d4e5f6a7b8c9...`
- Den **Autor** — wer die Änderung gemacht hat (der Name und die E-Mail, die du konfiguriert hast)
- Das **Datum** — wann es gemacht wurde
- Die **Nachricht** — die Beschreibung, die du geschrieben hast

```bash
# Den vollständigen Verlauf anzeigen
git log
```

Erwartete Ausgabe:

```
commit b2c3d4e (HEAD -> main)
Author: Dein Name <deine@email.com>
Date:   Mon Mar 13 10:30:00 2026

    Fügt zweite Zeile mit Verabschiedung hinzu

commit a1b2c3d
Author: Dein Name <deine@email.com>
Date:   Mon Mar 13 10:00:00 2026

    Fügt Datei hallo.php mit anfänglichem Gruß hinzu
```

Die Commits werden vom neuesten zum ältesten angezeigt. Das Wort `HEAD` zeigt an, auf welchem Commit du dich gerade befindest.

### git log --oneline — Kompaktformat

Wenn der Verlauf lang ist, kann das vollständige Format schwer zu lesen sein. Das kompakte Format zeigt eine Zeile pro Commit:

```bash
# Den Verlauf im kompakten Format anzeigen (eine Zeile pro Commit)
git log --oneline
```

```
b2c3d4e Fügt zweite Zeile mit Verabschiedung hinzu
a1b2c3d Fügt Datei hallo.php mit anfänglichem Gruß hinzu
```

Viel einfacher zu lesen. Es zeigt nur die ersten 7 Zeichen des Hashes und die Nachricht.

### git diff — Sehen, was sich geändert hat

Mit `git diff` können wir genau sehen, was sich in den Dateien geändert hat, **bevor wir `git add` ausführen**. Es ist wie ein "Vorher" und "Nachher" Vergleich.

```bash
# Eine Datei ändern und die Änderungen VOR dem add anzeigen
echo '<?php echo "Hallo Welt"; echo "Tschüss Welt"; echo "Version 3"; ?>' > hallo.php
git diff
```

```
diff --git a/hallo.php b/hallo.php
--- a/hallo.php
+++ b/hallo.php
-<?php echo "Hallo Welt"; echo "Tschüss Welt"; ?>
+<?php echo "Hallo Welt"; echo "Tschüss Welt"; echo "Version 3"; ?>
```

- Zeilen mit `-` (rot im Terminal) sind das, was **entfernt** wurde
- Zeilen mit `+` (grün im Terminal) sind das, was **hinzugefügt** wurde

Das ist sehr nützlich, um deine Änderungen vor dem Committen zu überprüfen. Es hilft dir zu verifizieren, dass du nichts versehentlich eingeschlossen hast.

**Wichtiger Hinweis:** `git diff` zeigt nur Änderungen von Dateien an, die noch NICHT mit `git add` hinzugefügt wurden. Sobald du `git add` ausführst, erscheinen die Änderungen nicht mehr in `git diff` (weil sie bereits im Staging-Bereich sind).

### .gitignore — Dateien ignorieren

Manchmal gibt es Dateien, die wir nicht von Git verfolgen lassen möchten:

- Log-Dateien (`.log`) — werden automatisch generiert und sind kein Teil des Codes
- Temporäre Dateien (`.tmp`) — sind Müll
- `.DS_Store` — eine Datei, die macOS automatisch in jedem Ordner erstellt
- Ordner wie `vendor/` oder `node_modules/` — können neu generiert werden
- Dateien mit Passwörtern oder sensiblen Daten

Um Git zu sagen, was es ignorieren soll, erstellen wir eine Datei namens `.gitignore` im Stammverzeichnis des Projekts:

```bash
# Eine .gitignore-Datei erstellen
echo "*.log" > .gitignore
echo "*.tmp" >> .gitignore
echo ".DS_Store" >> .gitignore
```

Jetzt ignoriert Git alle Dateien, die auf `.log` oder `.tmp` enden, und die Datei `.DS_Store`.

Wir können überprüfen, dass es funktioniert:

```bash
# Eine .log-Datei zum Testen erstellen
echo "dies ist ein Log" > debug.log

# Den Zustand anzeigen — die .log-Datei erscheint NICHT
git status
```

```
On branch main
Changes not staged for commit:
	modified:   hallo.php

Untracked files:
	.gitignore

```

Beachte, dass `debug.log` nicht in der Liste erscheint — Git ignoriert sie dank der `.gitignore`.

Die `.gitignore`-Datei muss committtet werden, weil sie Teil des Projekts ist:

```bash
git add .gitignore
git commit -m "Fügt .gitignore hinzu, um temporäre Dateien zu ignorieren"
```

### Häufige Muster in .gitignore

Einige nützliche Muster:

```
# Alle .log-Dateien ignorieren
*.log

# Alle .tmp-Dateien ignorieren
*.tmp

# Einen ganzen Ordner ignorieren
vendor/
node_modules/

# Eine bestimmte Datei ignorieren
config_local.php

# macOS-Dateien ignorieren
.DS_Store
```

Zeilen, die mit `#` beginnen, sind Kommentare und werden von Git ignoriert.

ÜBUNG
-----

Verwende das Repository aus den vorherigen Themen:

1. Weitere Änderungen an der Datei `hallo.php` hinzufügen (zum Beispiel eine dritte Zeile hinzufügen) und einen dritten Commit machen
2. `git log --oneline` verwenden, um die 3 Commits im Verlauf zu sehen
3. `hallo.php` erneut ändern und `git diff` verwenden, um die Änderungen vor dem Committen zu sehen
4. Add und commit dieser letzten Änderung ausführen
5. Eine `.gitignore`-Datei erstellen, die `*.log`- und `*.tmp`-Dateien ignoriert
6. Add und commit der `.gitignore` ausführen
7. Eine Datei `test.log` erstellen und mit `git status` überprüfen, dass Git sie ignoriert

**Überprüfung:** Beim Ausführen von `git log --oneline` solltest du mindestens 4 Commits sehen:

```bash
git log --oneline
```

```
f8g9h0i Fügt .gitignore hinzu, um temporäre Dateien zu ignorieren
e7f8g9h Fügt dritte Version der Datei hinzu
b2c3d4e Fügt zweite Zeile mit Verabschiedung hinzu
a1b2c3d Fügt Datei hallo.php mit anfänglichem Gruß hinzu
```

Und beim Erstellen einer `.log`-Datei sollte sie nicht in `git status` erscheinen:

```bash
echo "test" > test.log
git status
```

```
On branch main
nothing to commit, working tree clean
```
