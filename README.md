# Themestruktur

## Hauptdateien und ihre Funktionen

Das Theme basiert auf dem Source-Theme von Ghost und verwendet Handlebars (.hbs) für Templates. Hier ist eine Übersicht der wichtigsten Dateien und ihrer Funktionen:

### Root-Verzeichnis
- `default.hbs` - Die Haupttemplate-Datei, die das grundlegende HTML-Gerüst definiert und Header/Footer einbindet
- `home.hbs` - Template für die Startseite
- `index.hbs` - Template für Beitragsübersichten/Listenansichten
- `post.hbs` - Template für einzelne Blogbeiträge
- `page.hbs` - Template für statische Seiten
- `tag.hbs` - Template für Tag-Archive (z.B. alle Beiträge mit einem bestimmten Tag)
- `author.hbs` - Template für Autoren-Archive (z.B. alle Beiträge eines bestimmten Autors)
- `gulpfile.js` - Konfigurationsdatei für Gulp (Build-Tool für CSS/JS-Kompilierung)
- `package.json` - NPM-Paketdatei mit Theme-Metadaten und Abhängigkeiten

### Verzeichnisstruktur

#### /partials
Enthält wiederverwendbare Template-Teile, die in andere Templates eingebunden werden:

- `/components` - Größere UI-Komponenten wie Navigation, Footer, Header usw.
- `/icons` - SVG-Icons, die im Theme verwendet werden (über Handlebars eingebunden)
- `/typography` - Schriftarten-Definitionen für verschiedene Stiloptionen

#### /assets
Enthält alle statischen Ressourcen:

- `/css` - Quell-CSS-Dateien (werden kompiliert zu `/built/screen.css`)
- `/js` - JavaScript-Dateien
  - `/lib` - Externe JavaScript-Bibliotheken (PhotoSwipe, imagesloaded, reframe)
  - `/dropdown.js` - Navigation-Dropdown-Funktionalität
  - `/lightbox.js` - Bild-Lightbox-Funktionalität
  - `/pagination.js` - Endlos-Scroll und Paginierung
  - `/main.js` - Allgemeine JavaScript-Funktionen
- `/built` - Kompilierte und minifizierte CSS/JS-Dateien (werden automatisch erstellt)
- `/fonts` - Schriftarten-Dateien
- `/images` - Bilder für das Theme

## Wie alles zusammenhängt

1. **Template-Hierarchie**:
   - `default.hbs` ist das Basis-Template, das das HTML-Grundgerüst definiert
   - Alle anderen Templates (home.hbs, post.hbs usw.) werden in default.hbs eingebunden
   - Die Templates verwenden Partials aus dem `/partials`-Verzeichnis

2. **CSS und JavaScript**:
   - Die Quelldateien liegen in `/assets/css` und `/assets/js`
   - Gulp kompiliert diese zu `/assets/built/screen.css` und `/assets/built/source.js`
   - Diese werden dann in `default.hbs` eingebunden

3. **Theme-Einstellungen**:
   - Werden in `package.json` unter `config.custom` definiert
   - Zugänglich in Templates über `@custom`-Variablen (z.B. `{{@custom.title_font}}`)

4. **Komponenten-Einbindung**:
   - Partials werden mit `{{> "partial-name"}}` eingebunden
   - Icons werden mit `{{> "icons/icon-name"}}` eingebunden

## Entwicklung und Anpassung

Um am Theme zu arbeiten:

1. Installiere Node.js und Yarn
2. Führe `yarn install` aus, um Abhängigkeiten zu installieren
3. Führe `yarn dev` aus, um den Entwicklungsserver zu starten
4. Ändere Dateien in `/assets/css` oder `/assets/js` - sie werden automatisch kompiliert
5. Erstelle eine `.zip`-Datei mit `yarn zip` zum Hochladen in Ghost

### Tipps für Anpassungen:

- Für neue Seiten-Templates: Erstelle `page-[slug].hbs` (z.B. `page-about.hbs` für /about/)
- Für neue Tag-Templates: Erstelle `tag-[slug].hbs` (z.B. `tag-news.hbs` für /tag/news/)
- Für neue Komponenten: Erstelle Dateien in `/partials/components/`
- Für neue Icons: Füge SVG-Dateien zu `/partials/icons/` hinzu
