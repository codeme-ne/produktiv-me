# Lukas Zangerl Coaching Dynamics – Ghost Theme (DE)

Ein modernes, schnelles und anpassbares Ghost-Theme auf Basis des offiziellen Ghost-Source-Themes – vollständig auf Deutsch. Perfekt für Magazine, Blogs und wissensbasierte Publikationen.

- Kompatibel mit Ghost ab Version 5.0.0
- Lizenz: MIT
- Basierend auf: Ghost Source

## Inhaltsverzeichnis
- Einführung
- Features
- Voraussetzungen
- Installation
- Entwicklung
- Build & Release
- Theme-Einstellungen (Custom Settings)
- Dateistruktur
- Tipps für Anpassungen
- Support & Beiträge
- Lizenz

---

## Einführung

Dieses Theme wurde speziell für deutschsprachige Publikationen entwickelt. Es bringt eine klare Typografie, flexible Startseitendesigns und sinnvolle Voreinstellungen mit. Durch Custom Settings in Ghost lässt es sich ohne Codekenntnisse an viele Anwendungsfälle anpassen.

## Features

- Verschiedene Header-/Startseitenstile: Landing, Highlight, Magazine, Suche
- Flexible Navigationslayouts (Logo zentriert, links, gestapelt)
- Schriften wählbar (Sans, Serif, Mono)
- Beitragsfeed als Liste oder Grid
- Optional: Autoren, Veröffentlichungsdatum, verwandte Artikel
- Bild-Lightbox, Endlos-Scroll/Paginierung, Responsive Images
- Saubere Struktur, klar dokumentiert

## Voraussetzungen

- Ghost: >= 5.0.0
- Node.js und Yarn (empfohlen) installiert

## Installation

Es gibt zwei gängige Wege:

1) Über das Ghost Admin Interface
- Repository als ZIP bauen (siehe “Build & Release”)
- In Ghost Admin: Design > Theme hochladen > ZIP-Datei auswählen
- Aktivieren

2) Manuell (Entwicklung/Serverzugriff)
- Dieses Repo klonen
- Theme-Ordner als ZIP packen und in Ghost hochladen
- Alternativ via Ghost-CLI auf dem Server einspielen

## Entwicklung

1) Abhängigkeiten installieren
- yarn install

2) Entwicklungsmodus starten (mit Live-Reload, Asset-Build)
- yarn dev

3) Produktionsbuild erstellen
- yarn build

4) Lint/Kompatibilitätstest (Ghost GScan)
- yarn test

5) ZIP-Paket erzeugen (zum Upload in Ghost)
- yarn zip

Hinweis: Die Asset-Pipeline läuft über Gulp. CSS/JS werden nach assets/built/ kompiliert und in den Templates eingebunden.

## Build & Release

- Vor Veröffentlichung: yarn test (führt u. a. gscan aus)
- Version anheben und Tags pushen (skriptgestützt):
  - yarn ship
- Release-Assets aktualisieren:
  - Wird im Anschluss via gulp release erledigt (postship)

Das Skript yarn zip erstellt ein distributables ZIP (benannt nach dem Paketnamen).

## Theme-Einstellungen (Custom Settings)

Alle Einstellungen sind in Ghost Admin unter Design > Globale Einstellungen (oder Theme-Einstellungen) verfügbar. Folgende Optionen stehen zur Verfügung:

- Navigation
  - navigation_layout (Auswahl): 
    - Logo in the middle
    - Logo on the left
    - Stacked

- Farben & Branding
  - site_background_color (Farbe): Standard #ffffff
  - header_and_footer_color (Auswahl):
    - Background color
    - Accent color

- Typografie
  - title_font (Auswahl):
    - Modern sans-serif
    - Elegant serif
    - Consistent mono
  - body_font (Auswahl):
    - Modern sans-serif
    - Elegant serif

- Newsletter/Signup
  - signup_heading (Text): Überschrift im Footer (fällt auf Seitentitel zurück, wenn leer)
  - signup_subheading (Text): Untertitel im Footer (fällt auf Seitenbeschreibung zurück, wenn leer)

- Startseite (Header-Varianten)
  - header_style (Auswahl):
    - Landing (Empfehlung)
    - Highlight
    - Magazine
    - Search
    - Off
  - header_text (Text): Beschreibung/Unterzeile (sichtbar bei Landing & Search)
  - background_image (Boolean): Publikations-Cover als Hintergrund verwenden (Landing & Search)
  - show_featured_posts (Boolean): Empfohlene Beiträge im Header anzeigen (Highlight & Magazine)

- Beitragsfeed
  - post_feed_style (Auswahl): List oder Grid
  - show_images_in_feed (Boolean): Teaserbilder in Listenansicht
  - show_author (Boolean): Autor im Feed anzeigen
  - show_publish_date (Boolean): Datum im Feed anzeigen
  - show_publication_info_sidebar (Boolean): Publikationsinfos in Sidebar auf der Startseite

- Beitrag/Artikelansicht
  - show_post_metadata (Boolean): Metadaten (Autor, Datum, Lesezeit)
  - enable_drop_caps_on_posts (Boolean): Initialen/Drop Caps am Beitragsanfang
  - show_related_articles (Boolean): Verwandte Artikel unter Beiträgen

Weitere globale Konfiguration:
- posts_per_page: 12
- Responsive Image Breakpoints: xs (160), s (320), m (600), l (960), xl (1200), xxl (2000)

## Dateistruktur

- Root
  - default.hbs: Basislayout (bindet Header/Footer, Assets, Wrapper)
  - home.hbs: Startseite
  - index.hbs: Beitragsübersichten/Listen
  - post.hbs: Einzelbeitrag
  - page.hbs: Statische Seite
  - tag.hbs: Tag-Archiv
  - author.hbs: Autor-Archiv
  - gulpfile.js: Build-Pipeline (CSS/JS, Minify, Zip)
  - package.json: Metadaten, Skripte, Abhängigkeiten

- /partials
  - /components: Navigation, Header, Footer, UI-Module
  - /icons: SVG-Icons
  - /typography: Schriften-Definitionen

- /assets
  - /css: Quell-CSS (kompiliert zu /assets/built/screen.css)
  - /js: Skripte
    - /lib: Drittbibliotheken (PhotoSwipe, imagesloaded, reframe)
    - dropdown.js: Navigations-Dropdown
    - lightbox.js: Bild-Lightbox
    - pagination.js: Endlos-Scroll & Paginierung
    - main.js: allgemeine Funktionen
  - /built: Kompilierte/minifizierte CSS/JS (automatisch erstellt)
  - /fonts: Schriftdateien
  - /images: Theme-Bilder

## Tipps für Anpassungen

- Seitentemplates
  - Neue statische Seite: page-[slug].hbs (z. B. page-about.hbs für /about/)
- Tag-Templates
  - Tag-spezifisch: tag-[slug].hbs (z. B. tag-news.hbs für /tag/news/)
- Komponenten
  - Neue UI-Bausteine unter /partials/components/
- Icons
  - SVGs unter /partials/icons/ ablegen und via {{> "icons/dein-icon"}} einbinden
- Partials
  - Einbindung via {{> "partial-name"}}

## Support & Beiträge

- Issues, Vorschläge und Fehler: bitte ein Issue im Repository erstellen.
- Beiträge (PRs) sind willkommen. Bitte vor größeren Änderungen ein kurzes Issue/Discussion eröffnen.

## Lizenz

MIT – siehe LICENSE im Repository.
