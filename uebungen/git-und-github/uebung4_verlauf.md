# Übung 4: Historie und Navigation — log, diff, gitignore

## Ziel

Lernen, die Commit-Historie anzuzeigen, Änderungen vor dem Commit zu vergleichen und Git so zu konfigurieren, dass unnötige Dateien ignoriert werden. Am Ende wirst du 4 Commits haben.

---

## Anleitung

Stelle sicher, dass du dich im Ordner `mi-proyecto` mit den 2 Commits aus der vorherigen Übung befindest.

### Schritt 1: hola.php ändern, um eine dritte Zeile hinzuzufügen

Öffne `hola.php` und ändere die Datei, sodass sie so aussieht:

```php
<?php
echo "Hola mundo";
echo "Chau mundo";
echo "Version 3";
?>
```

Oder führe diesen Befehl aus:

```bash
echo '<?php echo "Hola mundo"; echo "Chau mundo"; echo "Version 3"; ?>' > hola.php
```

### Schritt 2: Die Änderungen vor dem add ansehen

Dieser Befehl zeigt genau, was sich in den Dateien geändert hat:

```bash
git diff
```

Du wirst Zeilen mit `-` (was entfernt wurde) und `+` (was hinzugefügt wurde) sehen. Das ist sehr nützlich, um deine Änderungen vor dem Speichern zu überprüfen.

### Schritt 3: add und commit machen

```bash
git add hola.php
git commit -m "Agrega tercera linea con version 3"
```

### Schritt 4: Die kompakte Historie ansehen

```bash
git log --oneline
```

Es sollten 3 Commits erscheinen.

### Schritt 5: Die .gitignore-Datei erstellen

Die Datei `.gitignore` sagt Git, welche Dateien ignoriert werden sollen. Erstelle sie mit folgendem Inhalt:

```bash
echo "*.log" > .gitignore
echo "*.tmp" >> .gitignore
```

Das sagt Git, dass alle Dateien mit der Endung `.log` und `.tmp` ignoriert werden sollen.

### Schritt 6: add und commit der .gitignore machen

```bash
git add .gitignore
git commit -m "Agrega .gitignore para ignorar archivos log y tmp"
```

---

## Überprüfung

Führe diese Befehle aus und vergleiche mit der erwarteten Ausgabe:

**Befehl 1:**

```bash
git log --oneline
```

**Erwartete Ausgabe:** Es müssen 4 Commits erscheinen (die Codes werden bei dir anders sein):

```
f4e5d6c Agrega .gitignore para ignorar archivos log y tmp
c3d4e5f Agrega tercera linea con version 3
b2c3d4e Agrega segunda linea con despedida
a1b2c3d Agrega archivo hola.php con saludo inicial
```

Das Wichtige ist, dass 4 Zeilen mit ihren jeweiligen Nachrichten erscheinen.

**Befehl 2:** Überprüfen, dass .gitignore funktioniert, indem eine Testdatei erstellt wird:

```bash
echo "esto es un log de prueba" > test.log
git status
```

**Erwartete Ausgabe:**

```
On branch main
nothing to commit, working tree clean
```

Die Datei `test.log` sollte nicht in `git status` erscheinen, weil `.gitignore` Git sagt, sie zu ignorieren. Ohne `.gitignore` würde sie als "Untracked files" aufgelistet werden.
