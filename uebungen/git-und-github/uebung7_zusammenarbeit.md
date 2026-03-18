# Übung 7: Zusammenarbeit auf GitHub — Issues und Pull Requests

## Ziel

Ein Issue auf GitHub erstellen, es mit einem Branch und einem Pull Request lösen, den PR mergen und die Änderungen auf deinem Computer synchronisieren.

---

## Anleitung

**Hinweis:** Diese Übung setzt voraus, dass du dein Repository `mi-proyecto` bereits auf GitHub hochgeladen hast (aus der vorherigen Übung).

### Schritt 1: Ein Issue auf GitHub erstellen

1. Gehe zu deinem Repository auf GitHub
2. Klicke auf den Tab **"Issues"**
3. Klicke auf **"New issue"**
4. Gib als Titel ein: `Agregar archivo de utilidades`
5. Gib als Beschreibung ein: `Crear un archivo utilidades.php con una función simple`
6. Klicke auf **"Submit new issue"**

Beachte, dass das Issue die Nummer **#1** hat.

### Schritt 2: Einen Branch erstellen, um das Issue zu lösen

Stelle im Terminal sicher, dass du dich im Ordner `mi-proyecto` und auf dem Branch `main` befindest:

```bash
git checkout main
```

Erstelle einen Branch mit einem Namen, der die Issue-Nummer enthält:

```bash
git checkout -b issue-1-utilidades
```

### Schritt 3: Die Datei utilidades.php erstellen

Erstelle eine Datei `utilidades.php` mit diesem Inhalt:

```php
<?php
function saludar($nombre) {
    return "Hola, " . $nombre . "!";
}

echo saludar("Sandra");
?>
```

### Schritt 4: add und commit machen

```bash
git add utilidades.php
git commit -m "Agrega archivo de utilidades (issue #1)"
```

### Schritt 5: Den Branch auf GitHub hochladen

```bash
git push -u origin issue-1-utilidades
```

### Schritt 6: Einen Pull Request auf GitHub erstellen

1. Gehe zu deinem Repository auf GitHub
2. GitHub sollte ein gelbes Banner mit dem Branch anzeigen, den du gerade hochgeladen hast, sowie einen Button **"Compare & pull request"**. Klicke darauf. (Falls es nicht erscheint, gehe zum Tab "Pull requests" → "New pull request" und wähle den Branch `issue-1-utilidades` aus.)
3. Gib als Titel ein: `Agrega archivo de utilidades`
4. Gib als Beschreibung ein: `Resuelve #1`
5. Klicke auf **"Create pull request"**

Die Beschreibung "Resuelve #1" sagt GitHub, dass dieser PR das Issue #1 löst. Wenn der PR akzeptiert wird, wird das Issue automatisch geschlossen.

### Schritt 7: Den Pull Request mergen

1. Klicke auf der Pull-Request-Seite auf **"Merge pull request"**
2. Klicke auf **"Confirm merge"**

Der PR wird als "Merged" markiert und das Issue #1 wird automatisch geschlossen.

### Schritt 8: Die Änderungen auf deinem Computer synchronisieren

Wechsle zurück zum Branch `main` und hole die Änderungen:

```bash
git checkout main
git pull
```

---

## Überprüfung

**Überprüfung 1 — Issue geschlossen:**

Gehe auf GitHub zum Tab **"Issues"**. Das Issue "Agregar archivo de utilidades" sollte geschlossen sein (es erscheint durchgestrichen oder mit einem violetten Symbol). Wenn du auf "Closed" klickst, kannst du es sehen.

**Überprüfung 2 — PR gemergt:**

Gehe auf GitHub zum Tab **"Pull requests"** → **"Closed"**. Der PR "Agrega archivo de utilidades" sollte mit einem violetten Symbol erscheinen, das "Merged" anzeigt.

**Überprüfung 3 — Lokale Historie:**

Führe im Terminal aus:

```bash
git log --oneline
```

**Erwartete Ausgabe:** Es muss den Merge-Commit und den Commit der Hilfsdatei anzeigen:

```
c3d4e5f Merge pull request #2 from tu-usuario/issue-1-utilidades
b2c3d4e Agrega archivo de utilidades (issue #1)
...vorherige Commits...
```

**Überprüfung 4 — Datei vorhanden:**

```bash
ls
```

**Erwartete Ausgabe:** Es muss `utilidades.php` zusammen mit den anderen Dateien anzeigen:

```
hola.php  nuevo.php  utilidades.php  README.md  ...
```
