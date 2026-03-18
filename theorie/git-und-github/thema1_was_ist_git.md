=========================================================
THEMA 1: Was ist Git? — Versionskontrolle
=========================================================

ZIEL
----
Verstehen, was Versionskontrolle ist, warum sie nützlich ist, und Git auf deinem Computer installiert und konfiguriert haben.

ERKLÄRUNG
---------

### Welches Problem löst Git?

Stell dir vor, du schreibst einen Bericht und speicherst Dateien wie "bericht_v1.docx", "bericht_v2_final.docx", "bericht_v2_final_ENDGÜLTIG.docx". Git löst dieses Chaos: Es speichert den Änderungsverlauf automatisch, mit einer Nachricht, die jede Änderung beschreibt. So kannst du jederzeit zu einer früheren Version zurückkehren.

Es ist wie ein Notizbuch, in dem du jede Änderung an deinem Projekt notierst, mit dem Datum und einer Beschreibung. Wenn etwas schiefgeht, kannst du zurückgehen und sehen, wie alles vorher war.

### Git vs GitHub

Das sind zwei verschiedene Dinge:

- **Git** ist ein Werkzeug, das auf deinem Computer installiert wird. Es funktioniert **lokal** — du brauchst kein Internet, um es zu benutzen.
- **GitHub** ist eine Website, auf die du deinen Code hochladen kannst, um ihn zu sichern und zu teilen. Das sehen wir uns in einem späteren Thema an.

Für jetzt arbeiten wir nur mit Git auf deinem Computer.

### Installation

**Unter Linux (Ubuntu/Debian):**

```bash
sudo apt update
sudo apt install git
```

**Auf dem Mac:**

```bash
# Wenn du Homebrew installiert hast:
brew install git

# Wenn nicht, bietet macOS beim Eingeben von "git" im Terminal automatisch die Installation an
```

**Unter Windows:**

1. Lade den Installer von https://git-scm.com/download/win herunter
2. Führe den Installer aus und folge den Schritten (lass die Standardoptionen)
3. Öffne nach der Installation "Git Bash" (wird zusammen mit Git installiert) — das ist das Terminal, das wir verwenden werden

### Installation überprüfen

Nach der Installation überprüfen wir, ob es funktioniert:

```bash
git --version
```

Erwartete Ausgabe (die Nummer kann variieren):

```
git version 2.43.0
```

Wenn du eine Versionsnummer siehst, ist Git korrekt installiert.

### Erstkonfiguration

Bevor du Git verwendest, musst du ihm sagen, wer du bist. Diese Information erscheint bei jeder gespeicherten Änderung (um zu wissen, wer welche Änderung gemacht hat).

```bash
# Deinen Namen konfigurieren (erscheint bei jeder gespeicherten Änderung)
git config --global user.name "Dein Name"

# Deine E-Mail konfigurieren
git config --global user.email "deine@email.com"
```

Die Option `--global` bedeutet, dass diese Konfiguration für alle deine Projekte auf diesem Computer gilt. Man muss das nur einmal machen.

### Konfiguration überprüfen

Um zu bestätigen, dass alles in Ordnung ist:

```bash
git config --list
```

Erwartete Ausgabe:

```
user.name=Dein Name
user.email=deine@email.com
```

Du kannst auch einen bestimmten Wert überprüfen:

```bash
git config user.name
```

```
Dein Name
```

```bash
git config user.email
```

```
deine@email.com
```

ÜBUNG
-----

1. Installiere Git auf deinem Computer gemäß den Anweisungen für dein Betriebssystem
2. Überprüfe die Installation, indem du `git --version` im Terminal ausführst
3. Konfiguriere deinen Namen und deine E-Mail mit `git config --global`
4. Überprüfe mit `git config --list`, dass die Konfiguration gespeichert wurde

**Überprüfung:** Beim Ausführen der folgenden Befehle solltest du deine Informationen sehen:

```bash
git --version
git config user.name
git config user.email
```

```
git version 2.43.0
Dein Name
deine@email.com
```
