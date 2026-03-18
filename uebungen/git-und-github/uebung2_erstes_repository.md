# Übung 2: Dein erstes Repository — git init und git status

## Ziel

Einen Projektordner erstellen, ihn in ein Git-Repository umwandeln, eine PHP-Datei erstellen und ihren Status mit `git status` anzeigen.

---

## Anleitung

### Schritt 1: Den Projektordner erstellen

Öffne das Terminal und führe aus:

```bash
mkdir mi-proyecto
```

### Schritt 2: In den Ordner wechseln

```bash
cd mi-proyecto
```

### Schritt 3: Das Git-Repository initialisieren

Dieser Befehl wandelt den Ordner in ein Git-Repository um:

```bash
git init
```

Es sollte eine Meldung wie diese erscheinen:

```
Initialized empty Git repository in /home/usuario/mi-proyecto/.git/
```

### Schritt 4: Die Datei hola.php erstellen

Erstelle eine Datei namens `hola.php` mit folgendem Inhalt. Du kannst einen beliebigen Texteditor verwenden oder diesen Befehl ausführen:

```bash
echo '<?php echo "Hola mundo"; ?>' > hola.php
```

### Schritt 5: Den Status des Repositorys überprüfen

```bash
git status
```

Git sollte anzeigen, dass `hola.php` eine nicht verfolgte Datei (untracked) ist.

---

## Überprüfung

Führe diesen Befehl aus und vergleiche mit der erwarteten Ausgabe:

**Befehl:**

```bash
git status
```

**Erwartete Ausgabe:**

```
On branch main

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	hola.php

nothing added to commit but untracked files present (use "git add" to track)
```

Das Wichtige ist, dass `hola.php` im Abschnitt "Untracked files" erscheint. Das bedeutet, dass Git die Datei sieht, sie aber noch nicht verfolgt.
