# CLAUDE.md

Diese Datei bietet Orientierung für Claude Code (claude.ai/code) bei der Arbeit mit dem Code in diesem Repository.

## Projektübersicht

Dies ist ein PHP-Lehrplan zum Erlernen der Programmierung von Grund auf. Die Schülerin verfügt über grundlegende PHP-Kenntnisse (Variablen, Arrays, Funktionen). Es gibt bisher zwei Module:

1. **OOP (Klassen und Objekte)** — mit einem **Online-Shop** als verbindendem Thema
2. **Git und GitHub** — Grundlagen der Versionsverwaltung, von der Installation bis zur Zusammenarbeit mit Pull Requests

## Struktur

### Modul: OOP (Klassen und Objekte)

- `theorie/klassen-und-objekte/lehrplan.md` — Lehrplan mit Erklärungen, Beispielen und Übungen
- `theorie/klassen-und-objekte/thema1_grundlegende_klassen.php` bis `thema9_integrationsprojekt.php` — Eine PHP-Datei pro Thema, jeweils mit erklärenden Kommentaren, funktionierendem Beispielcode und einer Übung am Ende
- `uebungen/klassen-und-objekte/uebung1_grundlegende_klassen.php` bis `uebung9_integrationsprojekt.php` — Übungsdateien

Themen: Klassen → Konstruktor → Methoden → return vs echo → Sichtbarkeit → Getter/Setter → Magische Methoden (__get/__set) → Vererbung → Statische Eigenschaften → Integrationsprojekt.

### Modul: Git und GitHub

- `theorie/git-und-github/lehrplan.md` — Lehrplan mit Erklärungen, Beispielen und Übungen
- `theorie/git-und-github/thema1_was_ist_git.md` bis `thema8_integrationsprojekt.md` — Eine Markdown-Datei pro Thema mit Erklärungen, Bash-Befehlsbeispielen mit erwarteter Ausgabe und Übungen
- `uebungen/git-und-github/uebung1_was_ist_git.md` bis `uebung8_integrationsprojekt.md` — Übungsdateien mit Schritt-für-Schritt-Anleitungen und Überprüfungsabschnitten

Themen: Was ist Git → Erstes Repository → Add/Commit-Zyklus → Log/Diff/Gitignore → Branches → GitHub → Zusammenarbeit (Issues/PRs) → Integrationsprojekt.

## PHP-Dateien ausführen

Jede Datei des OOP-Moduls ist ein eigenständiges PHP-Skript:

```bash
php theorie/klassen-und-objekte/thema1_grundlegende_klassen.php
```

Jede PHP-Datei muss fehlerfrei ausgeführt werden und die in den Kommentaren gezeigte erwartete Ausgabe erzeugen.

## Konventionen

- Alle Inhalte (Kommentare, Variablennamen, Ausgaben) sind auf **Deutsch**
- OOP-Modul: Jede PHP-Datei folgt dem Format: Kopfkommentarblock mit Erklärung → funktionierendes Codebeispiel → Übung als Kommentarblock am Ende
- OOP-Modul: Die Online-Shop-Domäne verwendet einheitliche Klassennamen: `Produkt`, `Kunde`, `Einkaufswagen`, `Bestellung`, `KleidungsProdukt`, `ElektronikProdukt`
- OOP-Modul: Dateien sind eigenständig — Klassen werden in jeder Datei bei Bedarf neu definiert (keine includes/requires zwischen Dateien)
- Git-Modul: Jede Markdown-Datei folgt dem Format: Überschrift → Ziel → Erklärung mit Analogie → Bash-Befehlsbeispiele mit erwarteter Ausgabe → Übung
- Git-Modul: Übungen verwenden sehr einfachen PHP-Code, um den Fokus auf Git-Konzepte zu halten, und enthalten einen Überprüfungsabschnitt mit Befehlen und erwarteter Ausgabe
