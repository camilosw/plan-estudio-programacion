# ============================================================
# THEMA 7: Zusammenarbeit auf GitHub — Issues und Pull Requests
# ============================================================
#
# ZIEL: Lernen, Issues zur Arbeitsorganisation und
# Pull Requests zum Vorschlagen von Änderungen zu verwenden.
#
# ERKLÄRUNG:
# GitHub ist nicht nur zum Speichern von Code — es hat
# auch Werkzeuge zur Arbeitsorganisation, selbst wenn du
# alleine arbeitest.
#
# Stell dir ein Projekt wie eine Aufgabenliste vor. Die
# ISSUES sind die Aufgaben ("diese Datei muss hinzugefügt
# werden", "dieser Fehler muss behoben werden"). Die
# PULL REQUESTS sind die Art zu sagen "ich habe diese
# Aufgabe erledigt, überprüfe die Änderungen bevor du
# sie akzeptierst".
#
# Dieser Ablauf — Issue erstellen, Branch erstellen,
# Änderungen machen, PR erstellen, überprüfen, akzeptieren
# — ist die Standardarbeitsweise in professionellen Teams.
# Ihn jetzt zu lernen, wird dir für immer nützlich sein.
# ============================================================


## Issues — Aufgaben und offene Punkte

Ein **Issue** ist wie ein Ticket oder eine Aufgabe. Er dient dazu:
- Einen Fehler zu melden ("Datei X funktioniert nicht")
- Eine Verbesserung vorzuschlagen ("eine Verabschiedungsdatei hinzufügen")
- Etwas Offenes zu notieren ("Validierung fehlt noch")

Jeder Issue hat eine automatische Nummer (#1, #2, #3...), die verwendet wird, um ihn zu referenzieren.

### Einen Issue erstellen (von GitHub aus)

1. Gehe zu deinem Repository auf GitHub
2. Klicke auf den Tab **"Issues"**
3. Klicke auf **"New issue"**
4. Gib einen klaren **Titel** ein: `Verabschiedungsdatei hinzufügen`
5. Erkläre in der **Beschreibung**, was getan werden muss: `Eine Datei tschuess.php erstellen, die eine Verabschiedungsnachricht ausgibt`
6. Klicke auf **"Submit new issue"**

Issue #1 wird erstellt. Beachte, dass GitHub die Nummer automatisch zuweist.


## Branches zum Lösen von Issues

Die gute Praxis ist, einen **spezifischen Branch** für jeden Issue zu erstellen. Das hält die Änderungen organisiert und vom Hauptcode getrennt.

Es ist Konvention, die Issue-Nummer in den Branch-Namen aufzunehmen:

```bash
# Einen Branch erstellen, um Issue #1 zu lösen
git checkout -b issue-1-verabschiedung-hinzufuegen
```

Erwartete Ausgabe:

```
Switched to a new branch 'issue-1-verabschiedung-hinzufuegen'
```

Jetzt machen wir die Änderungen, die der Issue verlangt:

```bash
# Die Datei erstellen, die der Issue verlangt
echo '<?php echo "Tschüss, bis zum nächsten Mal!"; ?>' > tschuess.php

# Hinzufügen und committen
# Wir erwähnen den Issue im Commit mit #1
git add tschuess.php
git commit -m "Fügt Verabschiedungsdatei hinzu (Issue #1)"
```

Erwartete Ausgabe:

```
[issue-1-verabschiedung-hinzufuegen a1b2c3d] Fügt Verabschiedungsdatei hinzu (Issue #1)
 1 file changed, 1 insertion(+)
 create mode 100644 tschuess.php
```

Jetzt laden wir den Branch auf GitHub hoch:

```bash
# Den Branch auf GitHub hochladen (erstes Mal für diesen Branch)
git push -u origin issue-1-verabschiedung-hinzufuegen
```

Erwartete Ausgabe:

```
Enumerating objects: 4, done.
Counting objects: 100% (4/4), done.
Writing objects: 100% (4/4), 350 bytes | 350.00 KiB/s, done.
Total 3 (delta 1), reused 0 (delta 0)
remote:
remote: Create a pull request for 'issue-1-verabschiedung-hinzufuegen' on GitHub by visiting:
remote:      https://github.com/dein-benutzername/mein-projekt/pull/new/issue-1-verabschiedung-hinzufuegen
remote:
To https://github.com/dein-benutzername/mein-projekt.git
 * [new branch]      issue-1-verabschiedung-hinzufuegen -> issue-1-verabschiedung-hinzufuegen
```

Beachte, dass GitHub dir direkt einen Link zum Erstellen eines Pull Requests anzeigt.


## Pull Requests — Änderungen zur Überprüfung vorschlagen

Ein **Pull Request (PR)** ist eine Anfrage, die Änderungen eines Branchs mit `main` zusammenzuführen. Anstatt direkt `git merge` auszuführen (wie wir es in Thema 5 gemacht haben), erstellen wir einen PR, damit die Änderungen vor der Annahme **überprüft** werden können.

### Einen Pull Request erstellen (von GitHub aus)

1. Nach dem Push des Branchs, gehe zu deinem Repository auf GitHub
2. GitHub zeigt dir ein gelbes Banner mit der Schaltfläche **"Compare & pull request"** — klicke darauf
   (Wenn es nicht erscheint, gehe zum Tab "Pull requests", dann "New pull request" und wähle deinen Branch)
3. **Titel:** `Fügt Verabschiedungsdatei hinzu`
4. **Beschreibung:** schreibe `Löst #1`
   - Das ist wichtig: Wenn du "Löst #1" schreibst, verknüpft GitHub den PR mit Issue #1 und schließt ihn automatisch, wenn der PR akzeptiert wird
5. Klicke auf **"Create pull request"**

### Die Änderungen des PRs überprüfen

Auf der PR-Seite kannst du sehen:
- **Conversation:** Kommentare und Diskussion
- **Commits:** die enthaltenen Commits
- **Files changed:** die geänderten Dateien, mit hinzugefügten Zeilen (grün) und entfernten Zeilen (rot)

Überprüfe den Tab **"Files changed"**, um genau zu sehen, was sich geändert hat.

### Den PR akzeptieren (merge)

Wenn du mit den Änderungen zufrieden bist:

1. Klicke auf der PR-Seite auf **"Merge pull request"**
2. Klicke auf **"Confirm merge"**
3. GitHub führt den Merge automatisch durch
4. Issue #1 wird automatisch geschlossen (weil wir "Löst #1" geschrieben haben)

Du siehst die Nachricht: "Pull request successfully merged and closed."


## Die Änderungen synchronisieren (git pull)

Der Merge wurde auf GitHub (in der Cloud) durchgeführt, aber dein Computer hat noch die alte Version von `main`. Du musst die Änderungen holen:

```bash
# Zurück zu main wechseln
git checkout main
```

Erwartete Ausgabe:

```
Switched to branch 'main'
```

```bash
# Die Änderungen von GitHub holen
git pull
```

Erwartete Ausgabe:

```
remote: Enumerating objects: 1, done.
remote: Counting objects: 100% (1/1), done.
remote: Total 1 (delta 0), reused 0 (delta 0)
Unpacking objects: 100% (1/1), done.
From https://github.com/dein-benutzername/mein-projekt
   b2c3d4e..f5g6h7i  main       -> origin/main
Updating b2c3d4e..f5g6h7i
Fast-forward
 tschuess.php | 1 +
 1 file changed, 1 insertion(+)
 create mode 100644 tschuess.php
```

Jetzt ist dein lokales `main` mit den Änderungen aktualisiert, die auf GitHub gemergt wurden.

```bash
# Überprüfen, dass die Datei da ist
ls
```

Erwartete Ausgabe:

```
tschuess.php  funktionalitaet.php  hallo.php  README.md
```

```bash
# Du kannst den lokalen Branch löschen (du brauchst ihn nicht mehr)
git branch -d issue-1-verabschiedung-hinzufuegen
```


## Zusammenfassung des vollständigen Ablaufs

```
1. ISSUE auf GitHub erstellen       → "Was getan werden muss"
            ↓
2. Lokalen BRANCH erstellen         → git checkout -b issue-1-name
            ↓
3. ÄNDERUNGEN und COMMIT machen     → git add + git commit
            ↓
4. Den Branch HOCHLADEN             → git push -u origin branch-name
            ↓
5. PULL REQUEST erstellen            → Von GitHub aus, mit "Löst #N"
            ↓
6. ÜBERPRÜFEN und MERGE             → Von GitHub aus, "Merge pull request"
            ↓
7. SYNCHRONISIEREN                  → git checkout main + git pull
```

Das ist der Ablauf, den Entwicklungsteams auf der ganzen Welt verwenden.


## Zusammenfassung der neuen Befehle

| Befehl | Was er macht |
|---|---|
| `git push -u origin branch-name` | Lädt einen neuen Branch auf GitHub hoch |
| `git pull` | Holt die Änderungen von GitHub auf deinen Computer |
| `git checkout main` | Wechselt zurück zum Hauptbranch |


# ============================================================
# ÜBUNG
# ============================================================
#
# Verwende dein Repository "mein-projekt", das bereits auf GitHub ist:
#
# 1. Erstelle einen Issue auf GitHub:
#    - Titel: "Hilfsdatei hinzufügen"
#    - Beschreibung: "Eine Datei utils.php erstellen mit einer
#      Funktion, die nach Name grüßt"
#
# 2. Erstelle einen lokalen Branch, um den Issue zu lösen:
#    git checkout -b issue-1-hilfsdateien
#    (verwende die Nummer, die GitHub deinem Issue zugewiesen hat)
#
# 3. Erstelle die Datei utils.php:
#    Vorgeschlagener Inhalt:
#      <?php
#      function gruessen($name) {
#          echo "Hallo, $name!\n";
#      }
#      gruessen("Sandra");
#
# 4. Führe add und commit aus:
#    git add utils.php
#    git commit -m "Fügt Hilfsdatei hinzu (Issue #1)"
#
# 5. Lade den Branch auf GitHub hoch:
#    git push -u origin issue-1-hilfsdateien
#
# 6. Erstelle auf GitHub einen Pull Request:
#    - Titel: "Fügt Hilfsdatei hinzu"
#    - Beschreibung: "Löst #1"
#
# 7. Überprüfe die Änderungen im Tab "Files changed"
#
# 8. Klicke auf "Merge pull request" → "Confirm merge"
#
# 9. In deinem Terminal, gehe zurück zu main und hole die Änderungen:
#    git checkout main
#    git pull
#
# ÜBERPRÜFUNG:
# Führe diese Befehle aus und vergleiche mit der erwarteten Ausgabe:
#
#   git log --oneline
#   → Du solltest den Merge-Commit und den von utils.php sehen
#
#   ls
#   → ... utils.php ...
#
#   Auf GitHub:
#   → Der Issue sollte geschlossen sein
#   → Der PR sollte gemergt sein
#
# ============================================================
