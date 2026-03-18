# Übung 3: Der grundlegende Zyklus — add, commit, status

## Ziel

Den grundlegenden Git-Ablauf üben: Dateien mit `git add` vorbereiten und sie mit `git commit` in der Historie speichern. Am Ende wirst du 2 Commits haben.

---

## Anleitung

Stelle sicher, dass du dich im Ordner `mi-proyecto` aus der vorherigen Übung befindest.

### Schritt 1: hola.php zur Staging-Area hinzufügen

```bash
git add hola.php
```

### Schritt 2: Überprüfen, dass die Datei vorbereitet ist

```bash
git status
```

Es sollte `hola.php` unter "Changes to be committed" erscheinen (in grün, wenn dein Terminal Farben unterstützt).

### Schritt 3: Den ersten Commit machen

```bash
git commit -m "Agrega archivo hola.php con saludo inicial"
```

### Schritt 4: Überprüfen, dass alles sauber ist

```bash
git status
```

Es sollte "nothing to commit, working tree clean" anzeigen.

### Schritt 5: hola.php ändern

Öffne `hola.php` mit einem Texteditor und ändere den Inhalt, sodass er so aussieht:

```php
<?php
echo "Hola mundo";
echo "Chau mundo";
?>
```

Oder führe diesen Befehl aus:

```bash
echo '<?php echo "Hola mundo"; echo "Chau mundo"; ?>' > hola.php
```

### Schritt 6: Den Status überprüfen

```bash
git status
```

Es sollte `hola.php` als "modified" (geändert) anzeigen.

### Schritt 7: Hinzufügen und den zweiten Commit machen

```bash
git add hola.php
git commit -m "Agrega segunda linea con despedida"
```

---

## Überprüfung

Führe diesen Befehl aus und vergleiche mit der erwarteten Ausgabe:

**Befehl:**

```bash
git log --oneline
```

**Erwartete Ausgabe:** Es müssen genau 2 Commits erscheinen (die Codes am Anfang werden bei dir anders sein):

```
b2c3d4e Agrega segunda linea con despedida
a1b2c3d Agrega archivo hola.php con saludo inicial
```

Das Wichtige ist, dass 2 Zeilen erscheinen, jede mit der entsprechenden Commit-Nachricht. Der neueste Commit erscheint oben.
