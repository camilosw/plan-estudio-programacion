=========================================================
THEMA 3: Der grundlegende Zyklus — add, commit, status
=========================================================

ZIEL
----
Den grundlegenden Git-Ablauf lernen: Dateien ändern, vorbereiten und einen Punkt im Verlauf speichern.

ERKLÄRUNG
---------

### Die drei Zustände von Git

Git hat drei Zustände für Dateien:

1. **Arbeitsverzeichnis** (working directory) — wo du deine Dateien normal bearbeitest
2. **Staging-Bereich** (staging area) — wo du die Dateien ablegst, die du in die nächste Speicherung einbeziehen möchtest
3. **Repository** (Verlauf) — wo sie dauerhaft gespeichert werden

### Die Paket-Analogie

Stell es dir wie das Vorbereiten eines Pakets zum Versenden vor:

- Du hast Sachen auf dem Tisch (Arbeitsverzeichnis) — das sind deine geänderten Dateien
- Du legst sie in die Kiste (Staging-Bereich mit `git add`) — du wählst aus, welche Änderungen du speichern möchtest
- Du versiegelst und beschriftest die Kiste (speicherst im Verlauf mit `git commit`) — diese Änderungen werden für immer festgehalten

Dieser Zyklus wiederholt sich immer wieder: Dateien bearbeiten, `git add` ausführen, `git commit` ausführen.

### git add — Dateien vorbereiten

Der Befehl `git add` verschiebt Dateien vom Arbeitsverzeichnis in den Staging-Bereich. Du sagst Git damit: "Ich möchte diese Änderungen in den nächsten Commit einbeziehen".

```bash
# 1. Die Datei zum Staging-Bereich hinzufügen
git add hallo.php

# 2. Den Zustand anzeigen — jetzt ist die Datei "vorbereitet"
git status
```

Erwartete Ausgabe:

```
On branch main

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
	new file:   hallo.php
```

Beachte, dass jetzt "Changes to be committed" steht statt "Untracked files". Die Datei ist in den Staging-Bereich gewechselt und bereit zum Speichern.

### git commit — Im Verlauf speichern

Der Befehl `git commit` nimmt alles, was im Staging-Bereich ist, und speichert es dauerhaft im Verlauf. Er enthält immer eine Nachricht, die beschreibt, was getan wurde:

```bash
# 3. Im Verlauf speichern mit einer beschreibenden Nachricht
git commit -m "Fügt Datei hallo.php mit anfänglichem Gruß hinzu"
```

Erwartete Ausgabe:

```
[main (root-commit) a1b2c3d] Fügt Datei hallo.php mit anfänglichem Gruß hinzu
 1 file changed, 1 insertion(+)
 create mode 100644 hallo.php
```

Der Code `a1b2c3d` ist ein eindeutiger Bezeichner dieses Commits (mehr dazu im nächsten Thema).

```bash
# 4. Den Zustand anzeigen — jetzt ist alles sauber
git status
```

```
On branch main
nothing to commit, working tree clean
```

"Working tree clean" bedeutet, dass es keine ausstehenden Änderungen gibt — alles ist gespeichert.

### Einen zweiten Commit machen

Jetzt ändern wir die Datei und machen einen zweiten Commit, um den vollständigen Zyklus zu üben:

```bash
# Die Datei ändern (eine zweite Zeile hinzufügen)
echo '<?php echo "Hallo Welt"; echo "Tschüss Welt"; ?>' > hallo.php

# Anzeigen, was sich geändert hat
git status
```

```
On branch main
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   hallo.php

no changes added to commit (use "git add" to track)
```

Git hat erkannt, dass die Datei geändert wurde. Jetzt muss der Zyklus wiederholt werden: add und commit.

```bash
# Vorbereiten und speichern
git add hallo.php
git commit -m "Fügt zweite Zeile mit Verabschiedung hinzu"
```

```
[main b2c3d4e] Fügt zweite Zeile mit Verabschiedung hinzu
 1 file changed, 1 insertion(+), 1 deletion(-)
```

### Gute Commit-Nachrichten

Eine gute Commit-Nachricht ist kurz und beschreibt **was** getan wurde. Die Konvention ist, Verben im Imperativ zu verwenden:

- "Fügt Konfigurationsdatei hinzu" (gut)
- "Behebt Fehler in der Preisberechnung" (gut)
- "Entfernt doppelten Code in funktionen.php" (gut)
- "Änderungen" (schlecht — sagt nichts aus)
- "Aktualisierung" (schlecht — zu vage)
- "asdfgh" (sehr schlecht)

### git add . — Alles auf einmal hinzufügen

Der Punkt (`.`) fügt **alle** geänderten und neuen Dateien auf einmal hinzu:

```bash
# ALLE geänderten Dateien hinzufügen
git add .
```

Das ist praktisch, wenn du viele Dateien hast, aber man muss aufpassen, keine ungewollten Dateien einzuschließen (wie temporäre Dateien, Passwörter usw.). Später werden wir sehen, wie man das mit `.gitignore` vermeidet.

ÜBUNG
-----

Verwende das Repository aus dem vorherigen Thema (`mein-projekt`):

1. `git add hallo.php` ausführen, um die Datei zum Staging-Bereich hinzuzufügen
2. `git commit -m "Fügt Datei hallo.php mit anfänglichem Gruß hinzu"` ausführen, um sie im Verlauf zu speichern
3. Mit `git status` überprüfen, dass alles sauber ist
4. `hallo.php` ändern: eine zweite Zeile hinzufügen, die "Tschüss Welt" ausgibt
5. Mit `git status` prüfen, dass Git die Änderung erkannt hat
6. `git add hallo.php` und `git commit -m "Fügt zweite Zeile mit Verabschiedung hinzu"` ausführen
7. Mit `git status` überprüfen, dass wieder alles sauber ist

**Überprüfung:** Am Ende solltest du 2 Commits im Verlauf haben. Du kannst es überprüfen mit:

```bash
git log --oneline
```

```
b2c3d4e Fügt zweite Zeile mit Verabschiedung hinzu
a1b2c3d Fügt Datei hallo.php mit anfänglichem Gruß hinzu
```
