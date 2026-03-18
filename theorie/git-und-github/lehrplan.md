# Lehrplan: Git und GitHub

## Kontext

Lerne Git zur Versionskontrolle und GitHub zum Sichern und gemeinsamen Arbeiten am Code. Der Plan geht vom Grundlegendsten (was ist Git, Installation) bis zur Zusammenarbeit mit Pull Requests auf GitHub. Die Übungen verwenden sehr einfachen PHP-Code, damit der Fokus auf dem Erlernen von Git liegt und nicht auf der Code-Logik.

---

## Struktur des Plans

Jedes Thema folgt dem Format:

1. **Erklärung** des Konzepts (kurz)
2. **Beispiel** mit Terminal-Befehlen und erwarteter Ausgabe
3. **Praktische Übung** zum Selbstlösen

---

## Thema 1: Was ist Git? — Versionskontrolle

**Ziel:** Verstehen, was Versionskontrolle ist, warum sie nützlich ist, und Git konfiguriert haben.

**Erklärung:** Stell dir vor, du schreibst einen Bericht und speicherst Dateien wie "bericht_v1.docx", "bericht_v2_final.docx", "bericht_v2_final_ENDGÜLTIG.docx". Git löst dieses Chaos: Es speichert den Änderungsverlauf automatisch, mit einer Nachricht, die jede Änderung beschreibt. So kannst du jederzeit zu einer früheren Version zurückkehren.

Git ist ein Werkzeug, das auf deinem Computer installiert wird (es funktioniert **lokal**). GitHub ist eine Website, auf die du deinen Code hochladen kannst, um ihn zu sichern und zu teilen — das sehen wir uns später an.

**Beispiel:**

```bash
# Überprüfen, ob Git installiert ist
git --version
```

```
git version 2.43.0
```

```bash
# Deinen Namen konfigurieren (erscheint bei jeder gespeicherten Änderung)
git config --global user.name "Dein Name"

# Deine E-Mail konfigurieren
git config --global user.email "deine@email.com"

# Die Konfiguration überprüfen
git config --list
```

```
user.name=Dein Name
user.email=deine@email.com
```

**Übung:**
Git auf deinem Computer installieren, deinen Namen und deine E-Mail konfigurieren und mit `git config --list` überprüfen, dass die Konfiguration gespeichert wurde.

---

## Thema 2: Dein erstes Repository — git init und git status

**Ziel:** Ein Git-Repository erstellen und verstehen, was der Ordner `.git` und der Befehl `git status` sind.

**Erklärung:** Ein Repository (oder "Repo") ist ein Ordner, dessen Änderungsverlauf Git verfolgt. Um einen beliebigen Ordner in ein Repository umzuwandeln, verwenden wir `git init`. Dadurch wird ein versteckter Ordner namens `.git` erstellt, in dem Git den gesamten Verlauf speichert — man sollte ihn nicht anfassen oder löschen.

Der wichtigste Befehl ist `git status`: Er zeigt den aktuellen Zustand deines Repositorys an. Am Anfang erscheinen Dateien als "untracked" (nicht verfolgt) — Git sieht sie, aber verfolgt sie noch nicht.

**Beispiel:**

```bash
# Einen Ordner für das Projekt erstellen
mkdir mein-projekt
cd mein-projekt

# Ein Git-Repository initialisieren
git init
```

```
Initialized empty Git repository in /home/benutzer/mein-projekt/.git/
```

```bash
# Eine einfache PHP-Datei erstellen
echo '<?php echo "Hallo Welt"; ?>' > hallo.php

# Den Zustand des Repositorys anzeigen
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

Git sagt uns, dass `hallo.php` existiert, aber noch nicht verfolgt wird.

**Übung:**
Einen Ordner namens `mein-projekt` erstellen, ein Git-Repository darin initialisieren, eine Datei `hallo.php` erstellen, die "Hallo Welt" ausgibt, und `git status` ausführen, um zu sehen, dass sie als nicht verfolgte Datei erscheint.

---

## Thema 3: Der grundlegende Zyklus — add, commit, status

**Ziel:** Den grundlegenden Git-Ablauf lernen: Dateien ändern, vorbereiten und einen Punkt im Verlauf speichern.

**Erklärung:** Git hat drei Zustände für Dateien:

1. **Arbeitsverzeichnis** — wo du deine Dateien normal bearbeitest
2. **Staging-Bereich** (Vorbereitungsbereich) — wo du die Dateien ablegst, die du in die nächste Speicherung einbeziehen möchtest
3. **Repository** (Verlauf) — wo sie dauerhaft gespeichert werden

Stell es dir wie das Vorbereiten eines Pakets zum Versenden vor: Du hast Sachen auf dem Tisch (Arbeitsverzeichnis), du legst sie in die Kiste (Staging-Bereich mit `git add`), und du versiegelst und beschriftest die Kiste (speicherst im Verlauf mit `git commit`).

**Beispiel:**

```bash
# 1. Die Datei zum Staging-Bereich hinzufügen
git add hallo.php

# 2. Den Zustand anzeigen — jetzt ist die Datei "vorbereitet"
git status
```

```
On branch main

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
	new file:   hallo.php
```

```bash
# 3. Im Verlauf speichern mit einer beschreibenden Nachricht
git commit -m "Fügt Datei hallo.php mit anfänglichem Gruß hinzu"
```

```
[main (root-commit) a1b2c3d] Fügt Datei hallo.php mit anfänglichem Gruß hinzu
 1 file changed, 1 insertion(+)
 create mode 100644 hallo.php
```

```bash
# 4. Den Zustand anzeigen — jetzt ist alles sauber
git status
```

```
On branch main
nothing to commit, working tree clean
```

**Hinweis zu Commit-Nachrichten:** Eine gute Nachricht ist kurz und beschreibt **was** getan wurde. Verwende Verben im Imperativ: "Fügt hinzu...", "Behebt...", "Entfernt...". Vermeide vage Nachrichten wie "Änderungen" oder "Aktualisierung".

**Hinweis zu `git add .`:** Der Punkt (`.`) fügt **alle** geänderten Dateien auf einmal hinzu. Das ist praktisch, aber man muss aufpassen, keine ungewollten Dateien einzuschließen (wie temporäre Dateien). Später werden wir sehen, wie man das mit `.gitignore` vermeidet.

**Übung:**
Verwende das Repository aus dem vorherigen Thema: `git add` und `git commit` für die Datei `hallo.php` ausführen. Dann die Datei ändern (eine zweite Zeile hinzufügen, die "Tschüss Welt" ausgibt), mit `git status` prüfen, erneut add und commit ausführen. Am Ende solltest du 2 Commits im Verlauf haben.

---

## Thema 4: Verlauf und Navigation — log, diff, gitignore

**Ziel:** Den Änderungsverlauf anzeigen, Versionen vergleichen und lernen, Dateien zu ignorieren, die wir nicht verfolgen möchten.

**Erklärung:** Jeder Commit, den wir machen, wird im Verlauf gespeichert. Wir können ihn mit `git log` anzeigen. Jeder Commit hat einen eindeutigen Bezeichner (einen langen Code namens "Hash"), den Autor, das Datum und die Nachricht.

Mit `git diff` können wir genau sehen, was sich in den Dateien geändert hat, bevor wir `git add` ausführen — es ist wie ein "Vorher" und "Nachher" Vergleich.

Manchmal gibt es Dateien, die wir nicht von Git verfolgen lassen möchten: temporäre Dateien, lokale Konfigurationen usw. Dafür erstellen wir eine `.gitignore`-Datei, die Git sagt, was es ignorieren soll.

**Beispiel:**

```bash
# Den vollständigen Verlauf anzeigen
git log
```

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

```bash
# Den Verlauf im kompakten Format anzeigen (eine Zeile pro Commit)
git log --oneline
```

```
b2c3d4e Fügt zweite Zeile mit Verabschiedung hinzu
a1b2c3d Fügt Datei hallo.php mit anfänglichem Gruß hinzu
```

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

Zeilen mit `-` sind das, was entfernt wurde, Zeilen mit `+` sind das, was hinzugefügt wurde.

```bash
# Eine .gitignore-Datei erstellen, um unnötige Dateien zu ignorieren
echo "*.log" > .gitignore
echo ".DS_Store" >> .gitignore
```

Jetzt ignoriert Git alle `.log`-Dateien und die `.DS_Store`-Datei (die macOS automatisch erstellt).

**Übung:**
Weitere Änderungen an der PHP-Datei hinzufügen und einen dritten Commit machen. `git log --oneline` verwenden, um die 3 Commits zu sehen. Die Datei erneut ändern und `git diff` verwenden, um die Änderungen vor dem Committen zu sehen. Eine `.gitignore`-Datei erstellen, die `*.log`- und `*.tmp`-Dateien ignoriert, add und commit der `.gitignore` ausführen.

---

## Thema 5: Branches — Parallel arbeiten ohne Angst

**Ziel:** Verstehen, dass Branches es ermöglichen, zu experimentieren, ohne den Hauptcode zu beeinflussen.

**Erklärung:** Stell dir vor, du möchtest etwas Neues in deinem Code ausprobieren, bist dir aber nicht sicher, ob es funktionieren wird. Ohne Git würdest du eine Kopie des gesamten Ordners machen "für alle Fälle". Mit Git erstellst du einen **Branch**: Das ist wie eine virtuelle Kopie des Projekts, in der du frei experimentieren kannst. Wenn es funktioniert, führst du ihn mit dem Hauptprojekt zusammen (merge). Wenn nicht, löschst du ihn und nichts ist passiert.

Der Hauptbranch heißt `main`. Wenn du einen neuen Branch erstellst, beeinflussen die Änderungen darin `main` nicht, bis du dich entscheidest, sie zusammenzuführen.

**Beispiel:**

```bash
# Anzeigen, auf welchem Branch du dich befindest
git branch
```

```
* main
```

```bash
# Einen neuen Branch erstellen und dorthin wechseln
git checkout -b neue-funktionalitaet
```

```
Switched to a new branch 'neue-funktionalitaet'
```

```bash
# Eine neue Datei in diesem Branch erstellen
echo '<?php echo "Ich bin eine neue Datei"; ?>' > funktionalitaet.php
git add funktionalitaet.php
git commit -m "Fügt Datei für neue Funktionalität hinzu"
```

```bash
# Zurück zum Branch main wechseln
git checkout main

# Überprüfen, dass die Datei in main NICHT existiert
ls
```

```
hallo.php
```

Die Datei `funktionalitaet.php` existiert nur im Branch `neue-funktionalitaet`. In `main` erscheint sie nicht.

```bash
# Die Änderungen des Branchs in main zusammenführen
git merge neue-funktionalitaet
```

```
Updating b2c3d4e..e5f6g7h
Fast-forward
 funktionalitaet.php | 1 +
 1 file changed, 1 insertion(+)
 create mode 100644 funktionalitaet.php
```

```bash
# Jetzt existiert die Datei in main
ls
```

```
funktionalitaet.php  hallo.php
```

```bash
# Den Branch löschen (wir brauchen ihn nicht mehr)
git branch -d neue-funktionalitaet
```

```
Deleted branch neue-funktionalitaet (was e5f6g7h).
```

**Hinweis zu Konflikten:** Manchmal erkennt Git beim Merge, dass dieselben Zeilen in beiden Branches geändert wurden. Das nennt man einen "Konflikt" und Git bittet dich, ihn manuell zu lösen. Für jetzt ist es nur wichtig zu wissen, dass sie existieren — wir werden nicht tiefer darauf eingehen.

**Übung:**
Einen Branch namens `datei-hinzufuegen` erstellen, dorthin wechseln, eine Datei `neu.php` mit einem einfachen Echo erstellen und committen. Zurück zu `main` wechseln und überprüfen, dass `neu.php` nicht existiert. Den Branch mergen. Überprüfen, dass die Datei jetzt existiert. Den Branch löschen.

---

## Thema 6: GitHub — Deinen Code in die Cloud hochladen

**Ziel:** Lernen, ein Repository auf GitHub zu erstellen und den lokalen Code mit dem Remote zu synchronisieren.

**Erklärung:** Bis jetzt war alles, was wir gemacht haben, lokal (auf deinem Computer). GitHub ist eine Website, auf die du deine Repositories hochladen kannst für:

- **Sicherung**: Wenn dein Computer kaputtgeht, ist dein Code sicher
- **Teilen**: Andere können deinen Code sehen
- **Zusammenarbeit**: Im Team am selben Projekt arbeiten

Um dein lokales Repository mit GitHub zu verbinden, brauchst du zwei Dinge: ein Repository auf GitHub erstellen und die Authentifizierung konfigurieren.

**Ein Repository auf GitHub erstellen:**

1. Gehe zu github.com und logge dich ein
2. Klicke auf die Schaltfläche "+" (oben rechts) und wähle "New repository"
3. Wähle einen Namen (z.B. `mein-projekt`)
4. Lass die Standardoptionen (markiere nicht "Add a README")
5. Klicke auf "Create repository"

**Authentifizierung — Methode 1: HTTPS mit persönlichem Token**

GitHub akzeptiert keine Passwörter mehr für HTTPS. Du brauchst ein persönliches Token:

1. Auf GitHub: Settings, dann Developer settings, dann Personal access tokens, dann Tokens (classic)
2. "Generate new token" auswählen, Berechtigung "repo" auswählen, "Generate token" klicken
3. Token kopieren (es wird nur einmal angezeigt)
4. Wenn Git beim Push nach dem Passwort fragt, verwende das Token anstelle deines Passworts

**Authentifizierung — Methode 2: SSH mit SSH-Schlüssel**

SSH verwendet ein Schlüsselpaar (öffentlich und privat), um dich ohne Passwort zu authentifizieren:

```bash
# 1. Das Schlüsselpaar generieren
ssh-keygen -t ed25519 -C "deine@email.com"
# Drücke Enter, um den Standardspeicherort zu akzeptieren
# Du kannst das Passwort leer lassen oder eines eingeben

# 2. Den öffentlichen Schlüssel anzeigen (der auf GitHub hochgeladen wird)
cat ~/.ssh/id_ed25519.pub
```

3. Den öffentlichen Schlüssel kopieren
4. Auf GitHub: Settings, dann SSH and GPG keys, dann "New SSH key"
5. Den Schlüssel einfügen und speichern

```bash
# 3. Überprüfen, dass es funktioniert
ssh -T git@github.com
```

```
Hi dein-benutzername! You've successfully authenticated, but GitHub does not provide shell access.
```

Mit SSH verwendest du die URL, die mit `git@github.com:` beginnt, anstatt `https://`.

**Beispiel (Code hochladen):**

```bash
# Das lokale Repository mit GitHub verbinden (mit HTTPS)
git remote add origin https://github.com/dein-benutzername/mein-projekt.git

# Oder mit SSH:
# git remote add origin git@github.com:dein-benutzername/mein-projekt.git

# Alle Commits zum Remote-Repository hochladen (erstes Mal)
git push -u origin main
```

```
Enumerating objects: 10, done.
Counting objects: 100% (10/10), done.
Writing objects: 100% (10/10), 800 bytes | 800.00 KiB/s, done.
Total 10 (delta 2), reused 0 (delta 0)
To https://github.com/dein-benutzername/mein-projekt.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

```bash
# Für spätere Commits reicht:
git push
```

**Hinweis zu README.md:** Das ist eine spezielle Datei, die GitHub als "Titelseite" deines Projekts anzeigt. Sie wird im Markdown-Format geschrieben.

```bash
# Eine README erstellen
echo "# Mein Projekt" > README.md
echo "Das ist mein erstes Projekt mit Git." >> README.md
git add README.md
git commit -m "Fügt README mit Projektbeschreibung hinzu"
git push
```

**Übung:**
Ein GitHub-Konto erstellen (falls du noch keins hast). Ein Repository auf GitHub namens `mein-projekt` erstellen. Die Authentifizierung konfigurieren (wähle die Methode, die dir lieber ist: HTTPS oder SSH). Dein lokales Repository verbinden und alle Commits hochladen. Eine `README.md` erstellen, committen und hochladen. Auf GitHub überprüfen, dass die Dateien und der Verlauf angezeigt werden.

---

## Thema 7: Zusammenarbeit auf GitHub — Issues und Pull Requests

**Ziel:** Lernen, Issues zur Arbeitsorganisation und Pull Requests zum Vorschlagen von Änderungen zu verwenden.

**Erklärung:** GitHub ist nicht nur zum Speichern von Code — es hat auch Werkzeuge zur Arbeitsorganisation:

- **Issues**: Sind wie "Aufgaben" oder "Tickets". Sie dienen dazu, Fehler zu melden, Verbesserungen vorzuschlagen oder offene Punkte zu notieren. Jeder Issue hat eine Nummer (z.B. #1, #2).
- **Pull Requests (PRs)**: Sind die Art, Änderungen vorzuschlagen. Statt direkt zu mergen, erstellst du einen PR, damit die Änderungen vor der Annahme überprüft werden können. Das ist der Standardablauf in Teams.

Der typische Ablauf ist:
1. Einen Issue erstellen, der beschreibt, was getan werden muss
2. Einen Branch für diese Arbeit erstellen
3. Die Änderungen machen und hochladen
4. Einen Pull Request erstellen, der den Branch mit main verbindet
5. Den PR überprüfen und akzeptieren (das führt den Merge automatisch durch)

**Beispiel:**

**Schritt 1 — Einen Issue auf GitHub erstellen:**
1. Klicke in deinem Repository auf GitHub auf den Tab "Issues"
2. "New issue"
3. Titel: "Verabschiedungsdatei hinzufügen"
4. Beschreibung: "Eine Datei tschuess.php erstellen, die eine Verabschiedungsnachricht ausgibt"
5. "Submit new issue" — Issue #1 wird erstellt

**Schritt 2 — Einen Branch erstellen und die Änderungen machen:**

```bash
# Einen Branch erstellen (es ist gute Praxis, die Issue-Nummer einzubeziehen)
git checkout -b issue-1-verabschiedung-hinzufuegen

# Die Änderung machen
echo '<?php echo "Tschüss, bis zum nächsten Mal!"; ?>' > tschuess.php
git add tschuess.php
git commit -m "Fügt Verabschiedungsdatei hinzu (Issue #1)"

# Den Branch auf GitHub hochladen
git push -u origin issue-1-verabschiedung-hinzufuegen
```

**Schritt 3 — Einen Pull Request auf GitHub erstellen:**
1. Nach dem Push des Branchs zeigt GitHub eine Schaltfläche "Compare & pull request"
2. Titel: "Fügt Verabschiedungsdatei hinzu"
3. Beschreibung: "Löst #1" (das verknüpft den PR mit dem Issue)
4. "Create pull request"

**Schritt 4 — Den PR überprüfen und akzeptieren:**
1. Im PR-Tab kannst du die Änderungen sehen (Tab "Files changed")
2. Wenn alles in Ordnung ist, klicke auf "Merge pull request" und dann "Confirm merge"
3. Issue #1 wird automatisch geschlossen (wegen "Löst #1" in der Beschreibung)

```bash
# Zurück zu main wechseln und die Änderungen holen
git checkout main
git pull
```

**Übung:**
Einen Issue in deinem GitHub-Repository erstellen. Einen lokalen Branch erstellen, um ihn zu lösen, die Änderungen machen und committen. Den Branch mit `git push` hochladen. Einen Pull Request auf GitHub erstellen, der den Issue erwähnt. Den PR von GitHub aus mergen. Auf deinem Computer zurück zu main wechseln und `git pull` ausführen, um die Änderungen zu holen.

---

## Thema 8: Integrationsprojekt — Alles zusammen

**Ziel:** Alle Konzepte von Git und GitHub in einem vollständigen Projekt integrieren.

**Abschlussübung:**
Ein Projekt von Grund auf erstellen und alles Gelernte anwenden:

1. Einen Ordner `projekt-final` erstellen und ein Git-Repository initialisieren
2. Eine Datei `start.php` erstellen, die "Willkommen beim Projekt" ausgibt, und committen
3. Eine Datei `funktionen.php` mit einer einfachen Funktion erstellen und committen
4. Eine `.gitignore` erstellen, die `*.log`- und `*.tmp`-Dateien ignoriert, und committen
5. Ein Repository auf GitHub erstellen und alles hochladen
6. Eine `README.md` mit dem Namen und der Beschreibung des Projekts erstellen, committen und pushen
7. Einen Issue auf GitHub erstellen: "Hilfsdatei hinzufügen"
8. Einen Branch `issue-1-hilfsdateien` erstellen, eine Datei `hilfsdateien.php` hinzufügen, committen und den Branch pushen
9. Einen Pull Request auf GitHub erstellen, der den Issue löst
10. Den PR auf GitHub mergen
11. Zurück zu main wechseln und `git pull` ausführen

Am Ende sollte das Repository auf GitHub haben:
- 4+ Dateien (start.php, funktionen.php, hilfsdateien.php, .gitignore, README.md)
- Einen Verlauf mit beschreibenden Commits
- Einen geschlossenen Issue
- Einen gemergten Pull Request

---

## Zusammenfassung des Lernfortschritts

| Thema | Schlüsselkonzept   | Was gelernt wird                                       |
| ----- | ------------------ | ------------------------------------------------------ |
| 1     | Was ist Git?       | Installation, Konfiguration, Konzept der Versionen     |
| 2     | Erstes Repo        | `git init`, `git status`, Ordner `.git`                |
| 3     | Grundlegender Zyklus | `git add`, `git commit`, die drei Zustände           |
| 4     | Verlauf            | `git log`, `git diff`, `.gitignore`                    |
| 5     | Branches           | `git branch`, `git checkout`, `git merge`              |
| 6     | GitHub             | Konto, `git remote`, `git push`, README                |
| 7     | Zusammenarbeit     | Issues, Pull Requests, Review-Ablauf                   |
| 8     | Integration        | Vollständiges Projekt mit allem kombiniert              |

---

## Zu erstellende Dateien

Für jedes Thema wird eine Markdown-Datei im Projektordner erstellt:

- `tema1_que_es_git.md`
- `tema2_primer_repositorio.md`
- `tema3_ciclo_basico.md`
- `tema4_historial.md`
- `tema5_ramas.md`
- `tema6_github.md`
- `tema7_colaboracion.md`
- `tema8_proyecto_integrador.md`

Jede Datei enthält die Erklärung, die Beispielbefehle mit ihrer erwarteten Ausgabe und die Übung am Ende.

## Überprüfung

- Jede Übung enthält einen Überprüfungsabschnitt mit Befehlen (`git status`, `git log --oneline`, `git branch`) und der erwarteten Ausgabe
- Die Schülerin kann bestätigen, dass sie auf dem richtigen Weg ist, indem sie ihr Terminal mit der erwarteten Ausgabe vergleicht
