=========================================================
THEMA 2: Dein erstes Repository — git init und git status
=========================================================

ZIEL
----
Ein Git-Repository erstellen und verstehen, was der Ordner `.git` und der Befehl `git status` sind.

ERKLÄRUNG
---------

### Was ist ein Repository?

Ein Repository (oder "Repo") ist ein Ordner, dessen Änderungsverlauf Git verfolgt. Jeder Ordner kann in ein Repository umgewandelt werden.

Stell es dir wie einen normalen Ordner vor, aber mit Superkräften: Git merkt sich jede Änderung, die du an den Dateien darin vornimmst.

### git init — Ein Repository initialisieren

Um einen beliebigen Ordner in ein Repository umzuwandeln, verwenden wir `git init`. Dieser Befehl erstellt einen versteckten Ordner namens `.git` in deinem Projekt.

```bash
# Einen Ordner für das Projekt erstellen
mkdir mein-projekt
cd mein-projekt

# Ein Git-Repository initialisieren
git init
```

Erwartete Ausgabe:

```
Initialized empty Git repository in /home/benutzer/mein-projekt/.git/
```

### Der Ordner .git

Wenn du `git init` ausführst, erstellt Git einen versteckten Ordner namens `.git`. Dieser Ordner enthält den gesamten Verlauf und die Konfiguration des Repositorys. Es ist wichtig, zwei Dinge zu wissen:

- **Man sollte ihn nicht anfassen oder löschen** — wenn du ihn löschst, verlierst du den gesamten Verlauf
- **Er ist versteckt** — du siehst ihn nicht mit normalem `ls`, aber mit `ls -a` (das versteckte Dateien anzeigt)

```bash
# Versteckte Dateien anzeigen (der Ordner .git erscheint)
ls -a
```

```
.  ..  .git
```

### git status — Den Zustand des Repositorys anzeigen

Der wichtigste Befehl im täglichen Gebrauch ist `git status`. Er zeigt den aktuellen Zustand deines Repositorys: welche Dateien sich geändert haben, welche zum Speichern vorbereitet sind usw.

Zuerst erstellen wir eine einfache PHP-Datei, damit wir etwas zum Verfolgen haben:

```bash
# Eine einfache PHP-Datei erstellen
echo '<?php echo "Hallo Welt"; ?>' > hallo.php

# Den Zustand des Repositorys anzeigen
git status
```

Erwartete Ausgabe:

```
On branch main

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	hallo.php

nothing added to commit but untracked files present (use "git add" to track)
```

### Was bedeutet "Untracked files"?

Wenn Git sagt, dass eine Datei "untracked" (nicht verfolgt) ist, bedeutet das, dass Git sie im Ordner sieht, sie aber noch nicht verfolgt. Es ist, als würde Git sagen: "Ich weiß, dass diese Datei existiert, aber du hast mich nicht gebeten, sie zu beobachten".

Damit Git beginnt, eine Datei zu verfolgen, muss man sie explizit mit `git add` hinzufügen — das sehen wir im nächsten Thema.

### Weitere Dateien hinzufügen

Wenn wir weitere Dateien erstellen, erscheinen alle als "untracked":

```bash
# Eine weitere Datei erstellen
echo '<?php echo "Tschüss Welt"; ?>' > tschuess.php

# Den Zustand anzeigen
git status
```

```
On branch main

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	tschuess.php
	hallo.php

nothing added to commit but untracked files present (use "git add" to track)
```

Git listet alle neuen Dateien auf, die es noch nicht verfolgt.

ÜBUNG
-----

1. Einen Ordner namens `mein-projekt` erstellen
2. Mit `cd mein-projekt` in den Ordner wechseln
3. Ein Git-Repository mit `git init` initialisieren
4. Überprüfen, dass der Ordner `.git` erstellt wurde, mit `ls -a`
5. Eine Datei `hallo.php` erstellen, die "Hallo Welt" ausgibt
6. `git status` ausführen, um zu sehen, dass sie als nicht verfolgte Datei erscheint

**Überprüfung:** Beim Ausführen von `git status` solltest du etwas wie folgt sehen:

```bash
git status
```

```
On branch main

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	hallo.php

nothing added to commit but untracked files present (use "git add" to track)
```
