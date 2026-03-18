# Übung 5: Branches — Parallel arbeiten ohne Angst

## Ziel

Einen Branch erstellen, Änderungen darin vornehmen, zu `main` zurückkehren um zu überprüfen, dass die Änderungen nicht vorhanden sind, einen Merge durchführen und den Branch löschen.

---

## Anleitung

**Hinweis:** Diese Übung setzt voraus, dass du bereits ein Repository `mi-proyecto` mit mindestens einem Commit hast (aus den vorherigen Übungen). Führe die Schritte innerhalb dieses Ordners aus.

### Schritt 1: Überprüfen, dass du auf dem Branch main bist

```bash
git branch
```

Es sollte `* main` anzeigen. Wenn du nicht auf main bist, führe `git checkout main` aus.

### Schritt 2: Einen neuen Branch erstellen und zu ihm wechseln

```bash
git checkout -b agregar-archivo
```

Das erstellt den Branch `agregar-archivo` und wechselt automatisch zu ihm.

### Schritt 3: Überprüfen, dass du auf dem neuen Branch bist

```bash
git branch
```

Du solltest sehen:

```
* agregar-archivo
  main
```

Das Sternchen (`*`) zeigt an, auf welchem Branch du dich befindest.

### Schritt 4: Eine neue Datei erstellen

Erstelle eine Datei `nuevo.php` mit diesem Inhalt:

```php
<?php
echo "Diese Datei wurde in einem Branch erstellt";
?>
```

### Schritt 5: add und commit der neuen Datei machen

```bash
git add nuevo.php
git commit -m "Agrega archivo nuevo.php desde la rama"
```

### Schritt 6: Zum Branch main zurückkehren

```bash
git checkout main
```

### Schritt 7: Überprüfen, dass nuevo.php NICHT in main existiert

```bash
ls
```

Die Datei `nuevo.php` sollte **nicht** in der Liste erscheinen. Sie existiert nur im Branch `agregar-archivo`.

### Schritt 8: Den Branch mergen

```bash
git merge agregar-archivo
```

Das bringt die Änderungen vom Branch `agregar-archivo` nach `main`.

### Schritt 9: Überprüfen, dass nuevo.php jetzt DOCH existiert

```bash
ls
```

Jetzt sollte `nuevo.php` in der Liste erscheinen.

### Schritt 10: Den Branch löschen

Wir brauchen ihn nicht mehr, also löschen wir ihn:

```bash
git branch -d agregar-archivo
```

---

## Überprüfung

Führe diese Befehle aus und vergleiche mit der erwarteten Ausgabe:

**Befehl 1:**

```bash
git log --oneline
```

**Erwartete Ausgabe:** Es muss der Commit angezeigt werden, den du im Branch gemacht hast, zusammen mit den vorherigen Commits. Zum Beispiel:

```
f1a2b3c Agrega archivo nuevo.php desde la rama
...vorherige Commits...
```

**Befehl 2:**

```bash
ls
```

**Erwartete Ausgabe:** Es muss `nuevo.php` zusammen mit den anderen Projektdateien angezeigt werden:

```
hola.php  nuevo.php  ...
```

**Befehl 3:**

```bash
git branch
```

**Erwartete Ausgabe:** Es sollte nur noch der Branch `main` übrig sein:

```
* main
```

Wenn der Branch `agregar-archivo` noch erscheint, führe `git branch -d agregar-archivo` aus, um ihn zu löschen.
