# Übung 6: GitHub — Deinen Code in die Cloud hochladen

## Ziel

Ein Konto auf GitHub erstellen, ein Remote-Repository erstellen, die Authentifizierung konfigurieren, deinen Code hochladen und eine README hinzufügen.

---

## Anleitung

### Schritt 1: Ein GitHub-Konto erstellen (falls du noch keins hast)

1. Gehe zu https://github.com
2. Klicke auf "Sign up"
3. Folge den Schritten, um dein Konto mit deiner E-Mail zu erstellen

Falls du bereits ein Konto hast, gehe zum nächsten Schritt.

### Schritt 2: Ein Repository auf GitHub erstellen

1. Klicke auf GitHub auf den Button **"+"** (oben rechts) und wähle **"New repository"**
2. Gib bei "Repository name" ein: `mi-proyecto`
3. Lass die Sichtbarkeit auf **Public**
4. Aktiviere **nicht** "Add a README file" (das erstellen wir selbst)
5. Klicke auf **"Create repository"**

GitHub zeigt dir eine Seite mit Anweisungen an. Lass diese Seite offen, weil wir die URL des Repositorys brauchen.

### Schritt 3: Die Authentifizierung konfigurieren

Wähle **eine** der beiden Methoden:

#### Option A: HTTPS mit persönlichem Token

1. Gehe auf GitHub zu **Settings** (klicke auf dein Profilbild → Settings)
2. Scrolle im linken Menü nach unten bis **Developer settings**
3. Klicke auf **Personal access tokens** → **Tokens (classic)**
4. Klicke auf **"Generate new token"** → **"Generate new token (classic)"**
5. Gib einen beschreibenden Namen ein (z.B.: "Mein Computer")
6. Wähle bei **Expiration** "90 days" oder "No expiration"
7. Aktiviere die Berechtigung **"repo"** (die erste in der Liste)
8. Klicke auf **"Generate token"**
9. **Kopiere den Token** — er wird nur einmal angezeigt

Wenn Git beim Push nach dem Passwort fragt, verwende diesen Token anstelle deines Passworts.

#### Option B: SSH mit SSH-Schlüssel

1. Generiere im Terminal ein Schlüsselpaar:

```bash
ssh-keygen -t ed25519 -C "deine@email.com"
```

Drücke Enter, um den Standardspeicherort zu akzeptieren. Du kannst das Passwort leer lassen.

2. Zeige den öffentlichen Schlüssel an:

```bash
cat ~/.ssh/id_ed25519.pub
```

3. Kopiere den gesamten angezeigten Text
4. Gehe auf GitHub zu **Settings** → **SSH and GPG keys** → **"New SSH key"**
5. Füge den Schlüssel ein und klicke auf **"Add SSH key"**
6. Überprüfe, ob es funktioniert:

```bash
ssh -T git@github.com
```

Es sollte anzeigen: `Hi dein-benutzername! You've successfully authenticated...`

### Schritt 4: Dein lokales Repository mit GitHub verbinden

Öffne das Terminal, gehe in deinen Ordner `mi-proyecto` und führe aus:

Wenn du **HTTPS** gewählt hast:

```bash
git remote add origin https://github.com/dein-benutzername/mi-proyecto.git
```

Wenn du **SSH** gewählt hast:

```bash
git remote add origin git@github.com:dein-benutzername/mi-proyecto.git
```

Ersetze `dein-benutzername` durch deinen GitHub-Benutzernamen.

### Schritt 5: Den Code auf GitHub hochladen

```bash
git push -u origin main
```

Beim ersten Mal mit HTTPS wird nach Benutzername und Passwort gefragt. Verwende deinen GitHub-Benutzernamen und den Token als Passwort.

### Schritt 6: Eine README.md erstellen

Erstelle eine Datei `README.md` mit diesem Inhalt:

```markdown
# Mein Projekt

Dies ist mein erstes Projekt mit Git und GitHub.
```

### Schritt 7: Commit und Push der README machen

```bash
git add README.md
git commit -m "Agrega README con descripción del proyecto"
git push
```

---

## Überprüfung

**Überprüfung 1:**

Öffne in deinem Browser die URL deines Repositorys:

```
https://github.com/dein-benutzername/mi-proyecto
```

**Erwartete Ausgabe:** Du solltest sehen:
- Alle Projektdateien (`hola.php`, `nuevo.php`, `.gitignore`, `README.md`, etc.)
- Die Commit-Historie (klicke auf den Text "X commits" über der Dateiliste)
- Der Inhalt der README.md wird automatisch unterhalb der Dateiliste angezeigt

**Überprüfung 2:**

Führe im Terminal aus:

```bash
git remote -v
```

**Erwartete Ausgabe:** Es muss die GitHub-URL angezeigt werden:

```
origin  https://github.com/dein-benutzername/mi-proyecto.git (fetch)
origin  https://github.com/dein-benutzername/mi-proyecto.git (push)
```

(Wenn du SSH verwendet hast, beginnt die URL mit `git@github.com:`)

**Überprüfung 3:**

Führe im Terminal aus:

```bash
git log --oneline
```

**Erwartete Ausgabe:** Es muss den README-Commit enthalten:

```
a1b2c3d Agrega README con descripción del proyecto
...vorherige Commits...
```
