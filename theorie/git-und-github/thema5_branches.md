# ============================================================
# THEMA 5: Branches — Parallel arbeiten ohne Angst
# ============================================================
#
# ZIEL: Verstehen, dass Branches es ermöglichen, zu
# experimentieren, ohne den Hauptcode zu beeinflussen.
#
# ERKLÄRUNG:
# Stell dir vor, du hast ein Notizbuch mit deinen
# Unterrichtsnotizen und möchtest versuchen, ein Thema
# neu zu ordnen, bist dir aber nicht sicher, ob es
# besser wird. Was du tun würdest, ist die Seiten zu
# kopieren, auf der Kopie zu arbeiten, und wenn dir das
# Ergebnis gefällt, ersetzt du die Originale. Wenn nicht,
# wirfst du die Kopie weg und fertig.
#
# In Git ist ein BRANCH genau diese virtuelle Kopie.
# Du erstellst einen Branch, experimentierst frei, und:
# - Wenn es funktioniert → führst du ihn mit dem
#   Hauptprojekt zusammen (merge)
# - Wenn es nicht funktioniert → löschst du ihn und
#   nichts ist passiert
#
# Der Hauptbranch heißt "main". Alles, was du in einem
# anderen Branch machst, beeinflusst main NICHT, bis du
# dich entscheidest, es zusammenzuführen.
# ============================================================


## Schlüsselkonzepte

- **Branch:** eine unabhängige Entwicklungslinie. Es ist wie eine virtuelle Kopie deines Projekts, in der du ohne Angst Änderungen machen kannst.
- **main:** der Hauptbranch, in dem die "offizielle" Version deines Codes ist.
- **merge:** die Änderungen eines Branchs mit einem anderen zusammenführen (normalerweise mit main).
- **checkout:** von einem Branch zu einem anderen wechseln.


## Sehen, auf welchem Branch du bist

Der Befehl `git branch` zeigt alle existierenden Branches an. Der aktuelle Branch hat ein Sternchen (`*`).

```bash
git branch
```

Erwartete Ausgabe:

```
* main
```

Es gibt nur einen Branch (`main`) und du bist darauf.


## Einen neuen Branch erstellen

Um einen neuen Branch zu erstellen und gleichzeitig dorthin zu wechseln, verwenden wir `git checkout -b`:

```bash
# Einen neuen Branch namens "neue-funktionalitaet" erstellen und dorthin wechseln
git checkout -b neue-funktionalitaet
```

Erwartete Ausgabe:

```
Switched to a new branch 'neue-funktionalitaet'
```

Jetzt bist du auf dem Branch `neue-funktionalitaet`. Alles, was du hier machst, beeinflusst `main` nicht.

Du kannst es mit `git branch` überprüfen:

```bash
git branch
```

Erwartete Ausgabe:

```
  main
* neue-funktionalitaet
```

Das Sternchen ist jetzt bei `neue-funktionalitaet`.


## Änderungen im Branch machen

Wir erstellen eine neue Datei und machen einen Commit, alles innerhalb des Branchs:

```bash
# Eine einfache PHP-Datei erstellen
echo '<?php echo "Ich bin eine neue Datei"; ?>' > funktionalitaet.php

# Hinzufügen und committen
git add funktionalitaet.php
git commit -m "Fügt Datei für neue Funktionalität hinzu"
```

Erwartete Ausgabe:

```
[neue-funktionalitaet f1a2b3c] Fügt Datei für neue Funktionalität hinzu
 1 file changed, 1 insertion(+)
 create mode 100644 funktionalitaet.php
```

Dieser Commit existiert nur im Branch `neue-funktionalitaet`. Der Branch `main` weiß nichts von dieser Datei.


## Zurück zu main und überprüfen

```bash
# Zurück zum Branch main wechseln
git checkout main
```

Erwartete Ausgabe:

```
Switched to branch 'main'
```

```bash
# Überprüfen, dass die Datei in main NICHT existiert
ls
```

Erwartete Ausgabe:

```
hallo.php
```

Die Datei `funktionalitaet.php` erscheint nicht, weil sie nur im anderen Branch existiert. Das ist das Mächtige an Branches: Jeder hat seine eigene Version der Dateien.


## Die Änderungen zusammenführen (merge)

Wenn du mit den Änderungen eines Branchs zufrieden bist, führst du sie mit `git merge` in `main` zusammen. Es ist wichtig, auf dem Branch zu sein, der die Änderungen **empfangen** soll (in diesem Fall `main`):

```bash
# Sicherstellen, dass du auf main bist
git checkout main

# Die Änderungen des Branchs zusammenführen
git merge neue-funktionalitaet
```

Erwartete Ausgabe:

```
Updating b2c3d4e..e5f6g7h
Fast-forward
 funktionalitaet.php | 1 +
 1 file changed, 1 insertion(+)
 create mode 100644 funktionalitaet.php
```

```bash
# Überprüfen, dass die Datei jetzt in main existiert
ls
```

Erwartete Ausgabe:

```
funktionalitaet.php  hallo.php
```

Jetzt hat `main` alle Änderungen, die du im Branch gemacht hast.


## Den Branch löschen

Sobald die Änderungen in `main` sind, brauchst du den Branch nicht mehr. Du kannst ihn löschen:

```bash
git branch -d neue-funktionalitaet
```

Erwartete Ausgabe:

```
Deleted branch neue-funktionalitaet (was e5f6g7h).
```

```bash
# Überprüfen, dass nur main übrig ist
git branch
```

Erwartete Ausgabe:

```
* main
```


## Zusammenfassung des Branch-Ablaufs

Der vollständige Ablauf ist:

```bash
# 1. Branch erstellen und dorthin wechseln
git checkout -b name-des-branchs

# 2. Änderungen machen, add und commit
git add datei.php
git commit -m "Beschreibung der Änderung"

# 3. Zurück zu main
git checkout main

# 4. Die Änderungen zusammenführen
git merge name-des-branchs

# 5. Den Branch löschen
git branch -d name-des-branchs
```


## Hinweis zu Konflikten

Manchmal erkennt Git beim Merge, dass dieselben Zeilen einer Datei in beiden Branches geändert wurden. Das nennt man einen **Konflikt** und Git bittet dich, ihn manuell zu lösen, indem du wählst, welche Version du behalten möchtest.

Für jetzt ist es nur wichtig zu wissen, dass Konflikte existieren. Wir werden nicht vertiefen, wie man sie löst — das ist ein fortgeschritteneres Thema. Wenn es dir passiert, keine Angst: Git zeigt dir genau an, welche Datei den Konflikt hat und markiert die betroffenen Zeilen.


# ============================================================
# ÜBUNG
# ============================================================
#
# Verwende dein Repository "mein-projekt":
#
# 1. Überprüfe, dass du auf dem Branch main bist mit: git branch
#
# 2. Erstelle einen Branch namens "datei-hinzufuegen":
#    git checkout -b datei-hinzufuegen
#
# 3. Erstelle eine Datei "neu.php" mit einem einfachen Echo:
#    echo '<?php echo "Ich bin neu"; ?>' > neu.php
#
# 4. Führe add und commit aus:
#    git add neu.php
#    git commit -m "Fügt Datei neu.php hinzu"
#
# 5. Gehe zurück zu main:
#    git checkout main
#
# 6. Überprüfe, dass neu.php NICHT existiert:
#    ls
#
# 7. Führe merge des Branchs durch:
#    git merge datei-hinzufuegen
#
# 8. Überprüfe, dass neu.php jetzt existiert:
#    ls
#
# 9. Lösche den Branch:
#    git branch -d datei-hinzufuegen
#
# ÜBERPRÜFUNG:
# Führe diese Befehle aus und vergleiche mit der erwarteten Ausgabe:
#
#   git branch
#   → * main
#
#   ls
#   → ... neu.php ...
#
#   git log --oneline
#   → Du solltest den Commit "Fügt Datei neu.php hinzu" sehen
#
# ============================================================
