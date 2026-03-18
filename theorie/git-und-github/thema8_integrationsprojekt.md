# ============================================================
# THEMA 8: Integrationsprojekt — Alles zusammen
# ============================================================
#
# ZIEL: Alle Konzepte von Git und GitHub in einem
# vollständigen Projekt integrieren, von Grund auf.
#
# ERKLÄRUNG:
# Dieses Thema führt nichts Neues ein. Es ist eine
# geführte Übung Schritt für Schritt, in der du alles
# anwendest, was du in den vorherigen Themen gelernt hast:
#
# - Ein Repository erstellen (Thema 2)
# - Der add/commit-Zyklus (Thema 3)
# - Verlauf und .gitignore (Thema 4)
# - Branches und merge (Thema 5)
# - GitHub, push und README (Thema 6)
# - Issues und Pull Requests (Thema 7)
#
# Am Ende wirst du ein vollständiges Projekt auf GitHub
# haben, mit Commit-Verlauf, einem geschlossenen Issue
# und einem gemergten Pull Request.
# ============================================================


## Projektbeschreibung

Du wirst ein Mini-PHP-Projekt namens `projekt-final` erstellen, das mehrere einfache Dateien hat. Der Fokus liegt nicht auf dem PHP-Code (er ist sehr einfach), sondern auf der korrekten Verwendung von Git und GitHub.

Am Ende sollte dein Repository auf GitHub haben:
- 5 Dateien: `start.php`, `funktionen.php`, `hilfsdateien.php`, `.gitignore`, `README.md`
- Einen Verlauf mit beschreibenden Commits
- Einen geschlossenen Issue
- Einen gemergten Pull Request


# ============================================================
# GEFÜHRTE ÜBUNG
# ============================================================


## SCHRITT 1 — Das Repository erstellen

Erstelle einen neuen Ordner und initialisiere ein Git-Repository:

```bash
mkdir projekt-final
cd projekt-final
git init
```

Erwartete Ausgabe:

```
Initialized empty Git repository in /home/benutzer/projekt-final/.git/
```

Überprüfe mit `git status`:

```bash
git status
```

Erwartete Ausgabe:

```
On branch main

No commits yet

nothing to commit (create/copy or use "git add" to track)
```


## SCHRITT 2 — Die erste Datei erstellen und committen

Erstelle eine Datei `start.php`, die eine Willkommensnachricht ausgibt:

```bash
echo '<?php
echo "Willkommen beim Abschlussprojekt\n";
echo "Dieses Projekt demonstriert die Verwendung von Git und GitHub\n";
?>' > start.php
```

Überprüfe, dass Git sie erkennt:

```bash
git status
```

Erwartete Ausgabe:

```
Untracked files:
  (use "git add <file>..." to include in what will be committed)
	start.php
```

Führe add und commit mit einer beschreibenden Nachricht aus:

```bash
git add start.php
git commit -m "Fügt Datei start.php mit Willkommensnachricht hinzu"
```

Erwartete Ausgabe:

```
[main (root-commit) a1b2c3d] Fügt Datei start.php mit Willkommensnachricht hinzu
 1 file changed, 4 insertions(+)
 create mode 100644 start.php
```


## SCHRITT 3 — Die zweite Datei erstellen und committen

Erstelle eine Datei `funktionen.php` mit einer einfachen Funktion:

```bash
echo '<?php
function addieren($a, $b) {
    return $a + $b;
}

$ergebnis = addieren(5, 3);
echo "5 + 3 = $ergebnis\n";
?>' > funktionen.php
```

```bash
git add funktionen.php
git commit -m "Fügt funktionen.php mit Additionsfunktion hinzu"
```

Erwartete Ausgabe:

```
[main b2c3d4e] Fügt funktionen.php mit Additionsfunktion hinzu
 1 file changed, 7 insertions(+)
 create mode 100644 funktionen.php
```


## SCHRITT 4 — .gitignore erstellen und committen

Erstelle eine `.gitignore`, um Dateien zu ignorieren, die wir nicht verfolgen möchten:

```bash
echo "*.log" > .gitignore
echo "*.tmp" >> .gitignore
echo ".DS_Store" >> .gitignore
```

```bash
git add .gitignore
git commit -m "Fügt .gitignore hinzu, um temporäre Dateien zu ignorieren"
```

Erwartete Ausgabe:

```
[main c3d4e5f] Fügt .gitignore hinzu, um temporäre Dateien zu ignorieren
 1 file changed, 3 insertions(+)
 create mode 100644 .gitignore
```

Überprüfe den bisherigen Verlauf:

```bash
git log --oneline
```

Erwartete Ausgabe:

```
c3d4e5f Fügt .gitignore hinzu, um temporäre Dateien zu ignorieren
b2c3d4e Fügt funktionen.php mit Additionsfunktion hinzu
a1b2c3d Fügt Datei start.php mit Willkommensnachricht hinzu
```

Du solltest 3 Commits mit klaren Nachrichten haben.


## SCHRITT 5 — Repository auf GitHub erstellen und hochladen

1. Gehe zu GitHub und erstelle ein neues Repository namens `projekt-final`
   - Markiere nicht "Add a README" (das erstellen wir selbst)
   - Wähle keine .gitignore und keine Lizenz
2. Kopiere die URL des Repositorys

Verbinden und hochladen:

```bash
# Mit GitHub verbinden (ersetze mit deiner URL)
git remote add origin https://github.com/dein-benutzername/projekt-final.git

# Alles hochladen
git push -u origin main
```

Erwartete Ausgabe:

```
Enumerating objects: 9, done.
Counting objects: 100% (9/9), done.
Writing objects: 100% (9/9), 750 bytes | 750.00 KiB/s, done.
Total 9 (delta 1), reused 0 (delta 0)
To https://github.com/dein-benutzername/projekt-final.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

Gehe zu deinem Repository auf GitHub und überprüfe, dass die 3 Dateien und die 3 Commits erscheinen.


## SCHRITT 6 — README.md erstellen und hochladen

```bash
echo "# Abschlussprojekt" > README.md
echo "" >> README.md
echo "Integrationsprojekt des Git- und GitHub-Moduls." >> README.md
echo "" >> README.md
echo "## Dateien" >> README.md
echo "- start.php — Willkommensnachricht" >> README.md
echo "- funktionen.php — Mathematische Funktionen" >> README.md
echo "- .gitignore — Zu ignorierende Dateien" >> README.md
```

```bash
git add README.md
git commit -m "Fügt README mit Projektbeschreibung hinzu"
git push
```

Erwartete Ausgabe des Push:

```
Enumerating objects: 4, done.
Counting objects: 100% (4/4), done.
Writing objects: 100% (4/4), 400 bytes | 400.00 KiB/s, done.
Total 3 (delta 1), reused 0 (delta 0)
To https://github.com/dein-benutzername/projekt-final.git
   c3d4e5f..d4e5f6g  main -> main
```

Gehe zu GitHub und überprüfe, dass die README als Titelseite des Projekts angezeigt wird.


## SCHRITT 7 — Einen Issue auf GitHub erstellen

1. Gehe in deinem Repository auf GitHub zum Tab **"Issues"**
2. Klicke auf **"New issue"**
3. **Titel:** `Hilfsdatei hinzufügen`
4. **Beschreibung:** `Eine Datei hilfsdateien.php mit Hilfsfunktionen für das Projekt erstellen`
5. Klicke auf **"Submit new issue"**

Issue #1 wird erstellt. Notiere die Nummer.


## SCHRITT 8 — Einen Branch erstellen, die Änderungen machen und hochladen

```bash
# Branch erstellen, um den Issue zu lösen
git checkout -b issue-1-hilfsdateien
```

Erwartete Ausgabe:

```
Switched to a new branch 'issue-1-hilfsdateien'
```

Erstelle die Datei, die der Issue verlangt:

```bash
echo '<?php
function gruessen($name) {
    echo "Hallo, $name!\n";
}

function verabschieden($name) {
    echo "Tschüss, $name! Bis zum nächsten Mal.\n";
}

gruessen("Sandra");
verabschieden("Sandra");
?>' > hilfsdateien.php
```

```bash
git add hilfsdateien.php
git commit -m "Fügt hilfsdateien.php mit Funktionen gruessen und verabschieden hinzu (Issue #1)"
```

Erwartete Ausgabe:

```
[issue-1-hilfsdateien e5f6g7h] Fügt hilfsdateien.php mit Funktionen gruessen und verabschieden hinzu (Issue #1)
 1 file changed, 11 insertions(+)
 create mode 100644 hilfsdateien.php
```

Lade den Branch auf GitHub hoch:

```bash
git push -u origin issue-1-hilfsdateien
```

Erwartete Ausgabe:

```
Enumerating objects: 4, done.
Counting objects: 100% (4/4), done.
Writing objects: 100% (4/4), 450 bytes | 450.00 KiB/s, done.
Total 3 (delta 1), reused 0 (delta 0)
remote:
remote: Create a pull request for 'issue-1-hilfsdateien' on GitHub by visiting:
remote:      https://github.com/dein-benutzername/projekt-final/pull/new/issue-1-hilfsdateien
remote:
To https://github.com/dein-benutzername/projekt-final.git
 * [new branch]      issue-1-hilfsdateien -> issue-1-hilfsdateien
```


## SCHRITT 9 — Einen Pull Request auf GitHub erstellen

1. Gehe zu deinem Repository auf GitHub
2. Du siehst ein gelbes Banner mit der Schaltfläche **"Compare & pull request"** — klicke darauf
3. **Titel:** `Fügt Hilfsdatei hinzu`
4. **Beschreibung:** `Löst #1`
5. Klicke auf **"Create pull request"**

Überprüfe den Tab **"Files changed"**, um die Änderungen zu sehen. Du solltest die Datei `hilfsdateien.php` komplett in grün sehen (alles ist neu).


## SCHRITT 10 — Den PR mergen

1. Klicke auf der Pull-Request-Seite auf **"Merge pull request"**
2. Klicke auf **"Confirm merge"**

Du siehst die Nachricht: "Pull request successfully merged and closed."

Issue #1 wird automatisch geschlossen (weil wir "Löst #1" geschrieben haben).


## SCHRITT 11 — Deinen Computer synchronisieren

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
From https://github.com/dein-benutzername/projekt-final
   d4e5f6g..h8i9j0k  main       -> origin/main
Updating d4e5f6g..h8i9j0k
Fast-forward
 hilfsdateien.php | 11 +++++++++++
 1 file changed, 11 insertions(+)
 create mode 100644 hilfsdateien.php
```

```bash
# Den lokalen Branch löschen (du brauchst ihn nicht mehr)
git branch -d issue-1-hilfsdateien
```

Erwartete Ausgabe:

```
Deleted branch issue-1-hilfsdateien (was e5f6g7h).
```


## Abschlussüberprüfung

Führe diese Befehle aus, um zu bestätigen, dass alles in Ordnung ist:

```bash
# Die Dateien anzeigen
ls
```

Erwartete Ausgabe:

```
funktionen.php  start.php  README.md  hilfsdateien.php
```

(`.gitignore` erscheint nicht mit normalem `ls`, weil es mit einem Punkt beginnt. Verwende `ls -a`, um es zu sehen.)

```bash
# Den vollständigen Verlauf anzeigen
git log --oneline
```

Erwartete Ausgabe (etwas ähnliches):

```
h8i9j0k Merge pull request #2 from dein-benutzername/issue-1-hilfsdateien
e5f6g7h Fügt hilfsdateien.php mit Funktionen gruessen und verabschieden hinzu (Issue #1)
d4e5f6g Fügt README mit Projektbeschreibung hinzu
c3d4e5f Fügt .gitignore hinzu, um temporäre Dateien zu ignorieren
b2c3d4e Fügt funktionen.php mit Additionsfunktion hinzu
a1b2c3d Fügt Datei start.php mit Willkommensnachricht hinzu
```

```bash
# Die Branches anzeigen (es sollte nur main übrig sein)
git branch
```

Erwartete Ausgabe:

```
* main
```

Überprüfe auf GitHub, dass:
- Die 5 Dateien erscheinen (start.php, funktionen.php, hilfsdateien.php, .gitignore, README.md)
- Die README als Titelseite angezeigt wird
- Issue #1 **geschlossen** ist
- Der Pull Request **gemergt** ist
- Der Verlauf alle Commits zeigt


# ============================================================
# HERZLICHEN GLÜCKWUNSCH!
# ============================================================
#
# Wenn du bis hierher gekommen bist, weißt du jetzt:
#
# - Git-Repositories erstellen
# - Commits mit beschreibenden Nachrichten machen
# - Den Verlauf und die Unterschiede anzeigen
# - Mit Branches arbeiten
# - Deinen Code auf GitHub hochladen
# - Deine Arbeit mit Issues organisieren
# - Änderungen mit Pull Requests vorschlagen
#
# Das sind die Grundlagen, die alle Entwicklungsteams
# auf der Welt verwenden. Du hast jetzt die Basis!
# ============================================================
