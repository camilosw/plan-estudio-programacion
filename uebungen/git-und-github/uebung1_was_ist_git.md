# Übung 1: Was ist Git — Installation und Konfiguration

## Ziel

Git auf deinem Computer installieren, deinen Namen und deine E-Mail konfigurieren und überprüfen, dass alles richtig eingerichtet ist.

---

## Anleitung

### Schritt 1: Überprüfen, ob Git installiert ist

Öffne das Terminal und führe aus:

```bash
git --version
```

Wenn eine Versionsnummer erscheint (zum Beispiel `git version 2.43.0`), ist Git bereits installiert. Wenn ein Fehler auftritt, muss es installiert werden:

- **Windows**: Lade den Installer von https://git-scm.com/download/win herunter und folge den Schritten
- **Mac**: Führe `xcode-select --install` im Terminal aus
- **Linux**: Führe `sudo apt install git` (Ubuntu/Debian) oder `sudo dnf install git` (Fedora) aus

### Schritt 2: Deinen Namen konfigurieren

Dieser Name wird bei jedem Commit erscheinen, den du machst. Führe diesen Befehl aus und ersetze ihn durch deinen echten Namen:

```bash
git config --global user.name "Sandra"
```

### Schritt 3: Deine E-Mail konfigurieren

Führe diesen Befehl aus und ersetze ihn durch deine echte E-Mail-Adresse:

```bash
git config --global user.email "sandra@email.com"
```

### Schritt 4: Die Konfiguration überprüfen

Führe aus:

```bash
git config --list
```

Suche in der Liste nach den Zeilen `user.name` und `user.email` mit den Werten, die du eingetragen hast.

---

## Überprüfung

Führe diese Befehle aus und vergleiche mit der erwarteten Ausgabe:

**Befehl 1:**

```bash
git --version
```

**Erwartete Ausgabe:** Es muss eine Git-Version angezeigt werden, zum Beispiel:

```
git version 2.43.0
```

(Die Nummer kann anders sein, wichtig ist, dass kein Fehler auftritt.)

**Befehl 2:**

```bash
git config user.name
```

**Erwartete Ausgabe:** Es muss der Name angezeigt werden, den du konfiguriert hast:

```
Sandra
```

**Befehl 3:**

```bash
git config user.email
```

**Erwartete Ausgabe:** Es muss die E-Mail-Adresse angezeigt werden, die du konfiguriert hast:

```
sandra@email.com
```
