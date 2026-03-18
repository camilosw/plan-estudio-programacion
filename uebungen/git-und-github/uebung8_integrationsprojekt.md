# Übung 8: Integrationsprojekt — Alles zusammen

## Ziel

Ein Projekt von Grund auf erstellen und dabei alles Gelernte anwenden: lokales Repository, Commits, .gitignore, GitHub, README, Issue, Branch, Pull Request und Merge.

---

## Anleitung

### SCHRITT 1: Den Projektordner erstellen und Git initialisieren

```bash
mkdir proyecto-final
cd proyecto-final
git init
```

### SCHRITT 2: Die Datei inicio.php erstellen und committen

Erstelle eine Datei `inicio.php` mit diesem Inhalt:

```php
<?php
echo "Willkommen beim Abschlussprojekt";
?>
```

Mache add und commit:

```bash
git add inicio.php
git commit -m "Agrega archivo inicio.php con mensaje de bienvenida"
```

### SCHRITT 3: Die Datei funciones.php erstellen und committen

Erstelle eine Datei `funciones.php` mit diesem Inhalt:

```php
<?php
function sumar($a, $b) {
    return $a + $b;
}

echo "3 + 5 = " . sumar(3, 5);
?>
```

Mache add und commit:

```bash
git add funciones.php
git commit -m "Agrega funciones.php con función sumar"
```

### SCHRITT 4: .gitignore erstellen und committen

Erstelle eine Datei `.gitignore` mit diesem Inhalt:

```
*.log
*.tmp
```

Mache add und commit:

```bash
git add .gitignore
git commit -m "Agrega .gitignore para ignorar archivos log y tmp"
```

### SCHRITT 5: Ein Repository auf GitHub erstellen und den Code hochladen

1. Klicke auf GitHub auf **"+"** → **"New repository"**
2. Name: `proyecto-final`
3. Lass es als **Public**
4. Aktiviere **nicht** "Add a README file"
5. Klicke auf **"Create repository"**

Verbinde im Terminal das lokale Repository mit GitHub und lade den Code hoch:

```bash
git remote add origin https://github.com/dein-benutzername/proyecto-final.git
git push -u origin main
```

(Wenn du SSH verwendest, ersetze die URL durch `git@github.com:dein-benutzername/proyecto-final.git`)

### SCHRITT 6: README.md erstellen, committen und pushen

Erstelle eine Datei `README.md` mit diesem Inhalt:

```markdown
# Abschlussprojekt

Integrationsprojekt des Git- und GitHub-Moduls.
Enthält PHP-Beispieldateien und Hilfsprogramme.
```

Mache add, commit und push:

```bash
git add README.md
git commit -m "Agrega README con descripción del proyecto"
git push
```

### SCHRITT 7: Ein Issue auf GitHub erstellen

1. Gehe in deinem Repository auf GitHub zum Tab **"Issues"**
2. Klicke auf **"New issue"**
3. Titel: `Agregar archivo de utilidades`
4. Beschreibung: `Crear un archivo utilidades.php con funciones auxiliares`
5. Klicke auf **"Submit new issue"**

Notiere die Issue-Nummer (es sollte **#1** sein).

### SCHRITT 8: Einen Branch erstellen, utilidades.php hinzufügen, committen und pushen

Im Terminal:

```bash
git checkout -b issue-1-utilidades
```

Erstelle eine Datei `utilidades.php` mit diesem Inhalt:

```php
<?php
function mostrarFecha() {
    return date("d/m/Y");
}

echo "Heute ist: " . mostrarFecha();
?>
```

Mache add, commit und push des Branches:

```bash
git add utilidades.php
git commit -m "Agrega utilidades.php con función mostrarFecha (issue #1)"
git push -u origin issue-1-utilidades
```

### SCHRITT 9: Einen Pull Request auf GitHub erstellen

1. Auf GitHub sollte ein gelbes Banner mit dem Branch erscheinen, den du gerade hochgeladen hast. Klicke auf **"Compare & pull request"**.
2. Titel: `Agrega archivo de utilidades`
3. Beschreibung: `Resuelve #1`
4. Klicke auf **"Create pull request"**

### SCHRITT 10: Den Pull Request mergen

1. Klicke auf der Pull-Request-Seite auf **"Merge pull request"**
2. Klicke auf **"Confirm merge"**

Das Issue #1 wird automatisch geschlossen dank "Resuelve #1" in der Beschreibung.

### SCHRITT 11: Zurück zu main wechseln und die Änderungen holen

Im Terminal:

```bash
git checkout main
git pull
```

---

## Überprüfung

Überprüfe, ob alles richtig ist, mit diesen Prüfungen:

**Überprüfung 1 — Dateien auf GitHub:**

Gehe zu `https://github.com/dein-benutzername/proyecto-final` und überprüfe, ob diese Dateien vorhanden sind:
- `inicio.php`
- `funciones.php`
- `.gitignore`
- `README.md`
- `utilidades.php`

Der Inhalt der README wird unterhalb der Dateiliste angezeigt.

**Überprüfung 2 — Issue geschlossen:**

Klicke im Tab **"Issues"** auf GitHub auf **"Closed"**. Das Issue "Agregar archivo de utilidades" muss als geschlossen erscheinen.

**Überprüfung 3 — Pull Request gemergt:**

Im Tab **"Pull requests"** → **"Closed"**. Der PR "Agrega archivo de utilidades" muss mit einem violetten Symbol erscheinen, das "Merged" anzeigt.

**Überprüfung 4 — Lokale Historie:**

Führe im Terminal aus:

```bash
git log --oneline
```

**Erwartete Ausgabe:** Es müssen alle Commits des Projekts angezeigt werden:

```
g7h8i9j Merge pull request #2 from tu-usuario/issue-1-utilidades
f6g7h8i Agrega utilidades.php con función mostrarFecha (issue #1)
e5f6g7h Agrega README con descripción del proyecto
d4e5f6g Agrega .gitignore para ignorar archivos log y tmp
c3d4e5f Agrega funciones.php con función sumar
b2c3d4e Agrega archivo inicio.php con mensaje de bienvenida
```

(Die Codes am Anfang jeder Zeile werden auf deinem Computer anders sein.)

**Überprüfung 5 — Lokale Dateien:**

```bash
ls
```

**Erwartete Ausgabe:**

```
funciones.php  inicio.php  README.md  utilidades.php
```

(Die Datei `.gitignore` wird bei `ls` nicht angezeigt, weil sie eine versteckte Datei ist. Du kannst sie mit `ls -a` sehen.)
