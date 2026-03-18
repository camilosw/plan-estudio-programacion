# ============================================================
# THEMA 6: GitHub — Deinen Code in die Cloud hochladen
# ============================================================
#
# ZIEL: Lernen, ein Repository auf GitHub zu erstellen und
# den lokalen Code mit dem Remote zu synchronisieren.
#
# ERKLÄRUNG:
# Bis jetzt war alles, was wir gemacht haben, lokal (auf
# deinem Computer). Wenn die Festplatte kaputtgeht,
# verlierst du alles. GitHub ist eine Website, auf die du
# deine Repositories hochladen kannst für:
#
# - SICHERUNG: dein Code ist sicher in der Cloud
# - TEILEN: andere können deinen Code sehen
# - ZUSAMMENARBEIT: im Team am selben Projekt arbeiten
#
# Stell dir GitHub wie Google Drive vor, aber speziell für
# Code. Dein lokaler Ordner existiert weiterhin und
# funktioniert. GitHub ist eine Online-Kopie, die mit den
# Befehlen push (hochladen) und pull (herunterladen)
# synchronisiert wird.
#
# Um dein lokales Repository mit GitHub zu verbinden,
# brauchst du:
# 1. Ein Repository auf GitHub erstellen (über die Website)
# 2. Die Authentifizierung konfigurieren (damit GitHub
#    weiß, dass du es bist)
# 3. Verbinden und hochladen mit git remote + git push
# ============================================================


## Ein GitHub-Konto erstellen

Wenn du noch kein Konto hast:

1. Gehe zu [github.com](https://github.com)
2. Klicke auf "Sign up"
3. Folge den Schritten: wähle einen Benutzernamen, E-Mail und Passwort
4. Bestätige deine E-Mail


## Ein Repository auf GitHub erstellen (über die Website)

1. Logge dich auf github.com ein
2. Klicke auf die Schaltfläche **"+"** (oben rechts) und wähle **"New repository"**
3. Gib dem Repository einen Namen (zum Beispiel: `mein-projekt`)
4. Lass die Standardoptionen — **markiere nicht "Add a README"** (das erstellen wir selbst)
5. Klicke auf **"Create repository"**

GitHub zeigt dir eine Seite mit Anweisungen. Wir folgen denen von "push an existing repository".


## Authentifizierung: wie du GitHub beweist, dass du es bist

GitHub muss jedes Mal, wenn du Code hochlädst, deine Identität überprüfen. Es gibt zwei Methoden. Wähle die, die dir bequemer ist.

---

### Methode 1: HTTPS mit persönlichem Token

Das ist die direkteste Methode. GitHub akzeptiert keine normalen Passwörter mehr für HTTPS, also musst du ein "persönliches Token" generieren, das wie ein spezielles Passwort funktioniert.

**Schritt-für-Schritt zur Token-Erstellung:**

1. Klicke auf GitHub auf dein Profilbild (oben rechts)
2. Gehe zu **Settings** (Einstellungen)
3. Im linken Menü, scrolle nach unten zu **Developer settings**
4. Klicke auf **Personal access tokens** und dann **Tokens (classic)**
5. Klicke auf **"Generate new token"** und dann **"Generate new token (classic)"**
6. Gib einen beschreibenden Namen ein (zum Beispiel: "Mein Computer")
7. Bei **Expiration** wähle die gewünschte Dauer (90 Tage ist üblich)
8. Bei **Select scopes** markiere das Kästchen **"repo"** (das gibt Berechtigung zum Code-Hochladen)
9. Klicke auf **"Generate token"**
10. **Kopiere das Token jetzt** — es wird nur einmal angezeigt. Wenn du es verlierst, musst du ein neues erstellen.

**Wie man es verwendet:**

Wenn du zum ersten Mal `git push` ausführst, fragt Git nach Benutzername und Passwort:
- **Username:** dein GitHub-Benutzername
- **Password:** füge das Token ein (nicht dein normales Passwort)

---

### Methode 2: SSH mit SSH-Schlüssel

SSH verwendet ein Schlüsselpaar (einen öffentlichen und einen privaten), um dich automatisch zu authentifizieren, ohne jedes Mal ein Passwort eingeben zu müssen. Es ist beim ersten Mal etwas mehr Arbeit, aber danach bequemer.

**Schritt 1 — Das Schlüsselpaar generieren:**

```bash
ssh-keygen -t ed25519 -C "deine@email.com"
```

Es wird dich fragen, wo der Schlüssel gespeichert werden soll. Drücke **Enter**, um den Standardspeicherort zu akzeptieren. Danach wird nach einem Passwort (Passphrase) gefragt — du kannst es leer lassen, indem du Enter drückst.

Erwartete Ausgabe:

```
Generating public/private ed25519 key pair.
Enter file in which to save the key (/home/benutzer/.ssh/id_ed25519):
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /home/benutzer/.ssh/id_ed25519
Your public key has been saved in /home/benutzer/.ssh/id_ed25519.pub
```

**Schritt 2 — Den öffentlichen Schlüssel anzeigen (der auf GitHub hochgeladen wird):**

```bash
cat ~/.ssh/id_ed25519.pub
```

Erwartete Ausgabe (etwas ähnliches):

```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAI... deine@email.com
```

Kopiere die gesamte Zeile.

**Schritt 3 — Den Schlüssel auf GitHub hinzufügen:**

1. Gehe auf GitHub zu **Settings** und dann **SSH and GPG keys**
2. Klicke auf **"New SSH key"**
3. Gib einen beschreibenden Titel ein (zum Beispiel: "Mein Computer")
4. Füge den kopierten öffentlichen Schlüssel ein
5. Klicke auf **"Add SSH key"**

**Schritt 4 — Überprüfen, dass es funktioniert:**

```bash
ssh -T git@github.com
```

Erwartete Ausgabe:

```
Hi dein-benutzername! You've successfully authenticated, but GitHub does not provide shell access.
```

Wenn du diese Nachricht siehst, funktioniert die SSH-Authentifizierung.

**Unterschied bei der Verwendung von SSH:** Wenn du das Remote-Repository verbindest, verwendest du die URL, die mit `git@github.com:` beginnt, anstatt `https://`.

---


## Das lokale Repository mit GitHub verbinden

Jetzt, da du die Authentifizierung konfiguriert hast, verbinden wir dein lokales Repository mit dem auf GitHub. Der Befehl `git remote add` teilt Git die Adresse des Remote-Repositorys mit:

```bash
# Wenn du HTTPS gewählt hast:
git remote add origin https://github.com/dein-benutzername/mein-projekt.git

# Wenn du SSH gewählt hast:
git remote add origin git@github.com:dein-benutzername/mein-projekt.git
```

- **origin** ist der Name, den wir dem Remote-Repository geben (es ist eine Konvention, immer "origin" zu verwenden)
- Die URL ist die Adresse deines Repositorys auf GitHub

Du kannst überprüfen, ob es richtig konfiguriert ist:

```bash
git remote -v
```

Erwartete Ausgabe:

```
origin  https://github.com/dein-benutzername/mein-projekt.git (fetch)
origin  https://github.com/dein-benutzername/mein-projekt.git (push)
```


## Den Code hochladen (git push)

Der erste Push benötigt das Flag `-u`, um die Verbindung zwischen deinem lokalen und dem Remote-Branch herzustellen:

```bash
# Erstes Mal: hochladen und die Verbindung herstellen
git push -u origin main
```

Erwartete Ausgabe:

```
Enumerating objects: 10, done.
Counting objects: 100% (10/10), done.
Writing objects: 100% (10/10), 800 bytes | 800.00 KiB/s, done.
Total 10 (delta 2), reused 0 (delta 0)
To https://github.com/dein-benutzername/mein-projekt.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

Ab jetzt brauchst du jedes Mal, wenn du neue Commits hochladen möchtest, nur:

```bash
# Spätere Commits hochladen (du brauchst -u origin main nicht mehr)
git push
```


## README.md — Die Titelseite deines Projekts

Die Datei `README.md` ist besonders: GitHub zeigt sie automatisch als "Titelseite" deines Repositorys an. Sie wird im **Markdown**-Format geschrieben (Text mit einfacher Formatierung).

```bash
# Eine einfache README erstellen
echo "# Mein Projekt" > README.md
echo "" >> README.md
echo "Das ist mein erstes Projekt mit Git und GitHub." >> README.md
echo "" >> README.md
echo "## Dateien" >> README.md
echo "- hallo.php — Hauptdatei mit Begrüßung" >> README.md
```

```bash
# Hinzufügen, committen und hochladen
git add README.md
git commit -m "Fügt README mit Projektbeschreibung hinzu"
git push
```

Wenn du jetzt dein Repository auf GitHub aufrufst, siehst du den Inhalt der README.md als schön formatierte Seite.


## Zusammenfassung der neuen Befehle

| Befehl | Was er macht |
|---|---|
| `git remote add origin URL` | Verbindet dein lokales Repo mit GitHub |
| `git remote -v` | Zeigt die konfigurierten Remotes an |
| `git push -u origin main` | Lädt zum ersten Mal hoch und stellt die Verbindung her |
| `git push` | Lädt die neuen Commits hoch |


# ============================================================
# ÜBUNG
# ============================================================
#
# 1. Erstelle ein GitHub-Konto (falls du noch keins hast)
#
# 2. Erstelle ein Repository auf GitHub namens "mein-projekt"
#    (ohne README, ohne .gitignore, ohne Lizenz)
#
# 3. Konfiguriere die Authentifizierung — wähle EINE Methode:
#
#    OPTION A (HTTPS):
#    - Generiere ein persönliches Token auf GitHub
#      (Settings → Developer settings → Personal access tokens)
#    - Markiere die Berechtigung "repo"
#    - Kopiere und speichere das Token
#
#    OPTION B (SSH):
#    - Generiere die Schlüssel: ssh-keygen -t ed25519 -C "deine@email.com"
#    - Kopiere den öffentlichen Schlüssel: cat ~/.ssh/id_ed25519.pub
#    - Füge ihn auf GitHub hinzu: Settings → SSH and GPG keys
#    - Überprüfe: ssh -T git@github.com
#
# 4. Verbinde dein lokales Repository mit GitHub:
#    git remote add origin URL-DEINES-REPOS
#
# 5. Lade alle Commits hoch:
#    git push -u origin main
#
# 6. Erstelle eine README.md mit dem Namen und einer
#    Beschreibung des Projekts, führe add, commit und push aus:
#    git add README.md
#    git commit -m "Fügt README mit Projektbeschreibung hinzu"
#    git push
#
# 7. Gehe zu deinem Repository auf GitHub und überprüfe, dass:
#    - Alle Dateien erscheinen
#    - Der Commit-Verlauf sichtbar ist
#    - Die README.md als Titelseite angezeigt wird
#
# ÜBERPRÜFUNG:
# Führe diese Befehle aus und vergleiche mit der erwarteten Ausgabe:
#
#   git remote -v
#   → origin  https://github.com/dein-benutzername/mein-projekt.git (fetch)
#   → origin  https://github.com/dein-benutzername/mein-projekt.git (push)
#
#   git log --oneline
#   → Du solltest alle deine Commits sehen, einschließlich dem der README
#
# ============================================================
