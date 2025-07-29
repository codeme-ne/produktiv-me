# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands

This is a Ghost theme based on the Source theme for Lukas Zangerl's coaching business website.

### Essential Commands

```bash
# Install dependencies (use legacy peer deps due to postcss version conflicts)
npm install --legacy-peer-deps

# Development (requires gulpfile.js - currently missing)
npm run dev

# Build the theme
npm run build

# Run theme validation
npm test

# Create deployable zip file
npm run zip
```

### Important Build Notes

⚠️ **The gulpfile.js is currently missing from this repository.** This means:
- Automated CSS/JS compilation is not available
- Manual file copying is required for development
- The npm scripts reference gulp but will fail without the gulpfile

**Manual Development Workflow:**
1. Edit source files directly:
   - CSS: `assets/css/screen.css`
   - JS: `assets/js/*.js`
2. For production, manually copy to built directory:
   - Copy `assets/css/screen.css` → `assets/built/screen.css`
   - Concatenate JS files → `assets/built/source.js`

## Architecture Overview

### Template Structure
This German-language Ghost theme uses Handlebars templating with a component-based architecture:

- **Base Template**: `default.hbs` - Defines HTML structure, includes navigation and footer
- **Page Templates**: 
  - `home.hbs` - Landing page with profile section
  - `post.hbs`, `page.hbs` - Content pages
  - `tag.hbs`, `author.hbs` - Archive pages
- **Components**: `partials/components/` - Reusable UI elements
- **Icons**: `partials/icons/` - SVG icons as Handlebars partials

### Landing Page Implementation
The theme features a custom "Landing" header style optimized for personal branding:
- **Profile Container**: `.gh-landing-container` - Personal greeting and tagline
- **Profile Image**: `.gh-landing-image` - Circular profile photo (280px, responsive)
- **Newsletter Integration**: Built-in email subscription form
- **Responsive Design**: Mobile-first approach with desktop optimizations

### CSS & JavaScript
- **CSS**: Single large file at `assets/css/screen.css` (28,000+ lines)
- **JavaScript**: Modular structure in `assets/js/`
  - Core functionality: Navigation, lightbox, pagination
  - External libraries: PhotoSwipe, imagesloaded, reframe
- **Build Output**: `assets/built/` directory for production files

### Theme Configuration
Extensive customization options via Ghost admin (defined in `package.json`):
- Navigation layouts (3 options)
- Header styles (Landing, Highlight, Magazine, Search, Off)
- Typography (fonts for titles and body)
- Colors and background images
- Post feed layouts (List/Grid)
- Publication info sidebar

## Development Guidelines

1. **Ghost Version**: Requires Ghost 5.0.0+
2. **Language**: All content in German for Lukas Zangerl's coaching business
3. **Profile Image**: Currently hardcoded in `partials/components/header-content.hbs`
4. **Testing**: Use `npm test` to validate theme with gscan
5. **Deployment**: Create zip with `npm run zip` for Ghost upload

## Git Workflow Integration

When making commits in this repository:
1. The CLAUDE.md file should be reviewed and updated if needed
2. Use descriptive commit messages following the repository's style
3. All commits will include Claude's co-authorship signature

## Missing Dependencies

To fully restore development capabilities, you'll need:
1. A proper `gulpfile.js` with tasks for:
   - CSS compilation from source files
   - JavaScript concatenation and minification
   - Watch mode for development
   - Build task for production
2. PostCSS configuration for CSS processing

## Performance Optimizations

### Course-Boxes Component Optimization
The course-boxes component currently uses inline styles which impacts performance and maintainability.

**Current Issue:**
```handlebars
<div class="gh-feed" style="grid-template-columns: repeat(3, 1fr); margin-top: 0;">
```

**Optimized Solution:**
1. Create a dedicated CSS class `.gh-course-boxes` in `assets/css/screen.css`:
```css
.gh-course-boxes {
    grid-template-columns: repeat(3, 1fr);
    margin-top: 0;
}

/* Responsive Design */
@media (max-width: 767px) {
    .gh-course-boxes {
        grid-template-columns: 1fr;
    }
}

@media (min-width: 768px) and (max-width: 1023px) {
    .gh-course-boxes {
        grid-template-columns: repeat(2, 1fr);
    }
}
```

2. Update `partials/components/course-boxes.hbs` to use the CSS class:
```handlebars
<div class="gh-feed gh-course-boxes">
```

### File Cleanup - Zone.Identifier Files
The repository contains 202 Windows Zone.Identifier files that impact performance and increase repository size.

**Remove all Zone.Identifier files:**
```bash
# Count Zone.Identifier files
find . -name "*Zone.Identifier" | wc -l

# Remove all Zone.Identifier files
find . -name "*Zone.Identifier" -type f -delete

# Prevent future Zone.Identifier files in .gitignore
echo "*Zone.Identifier" >> .gitignore
```

**Why remove these files?**
- Windows security metadata not needed in production
- Increases repository size unnecessarily
- Slows down file operations and builds
- Can cause issues with certain build tools

### CSS & JavaScript Optimization

**Current State:**
- CSS: 62KB (source) → 45KB (built)
- JavaScript: 52KB (bundled)

**Optimization Strategies:**

1. **CSS Optimization:**
   - Enable CSS Grid fallbacks for older browsers
   - Remove unused CSS rules (PurgeCSS integration)
   - Implement Critical CSS for above-the-fold content
   - Target size: ~35KB minified

2. **JavaScript Optimization:**
   - Lazy load PhotoSwipe library (32KB) only when needed
   - Code splitting for rarely used features
   - Defer non-critical JavaScript
   - Target size: ~20KB initial bundle

3. **Implementation Steps:**
```javascript
// Lazy load PhotoSwipe
function loadPhotoSwipe() {
    if (!window.PhotoSwipe) {
        const script = document.createElement('script');
        script.src = '/assets/js/lib/photoswipe.min.js';
        script.onload = () => initializeGallery();
        document.head.appendChild(script);
    }
}

// Trigger on first image click
document.querySelectorAll('.kg-image-card').forEach(card => {
    card.addEventListener('click', loadPhotoSwipe, { once: true });
});
```

### Best Practices for Page Load Time

1. **Image Optimization:**
   - Convert images to WebP format (30-50% smaller)
   - Implement responsive images with srcset
   - Lazy load images below the fold
   - Use `loading="lazy"` attribute

2. **Font Optimization:**
   - Subset fonts for German characters only
   - Use `font-display: swap` for better perceived performance
   - Preload critical fonts

3. **Resource Hints:**
```html
<!-- Add to default.hbs <head> -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="dns-prefetch" href="https://cdn.jsdelivr.net">
<link rel="preload" href="/assets/built/screen.css" as="style">
<link rel="preload" href="/assets/fonts/inter-var.woff2" as="font" crossorigin>
```

4. **HTTP/2 Server Push:**
   - Push critical CSS and fonts
   - Configure in nginx/Apache for Ghost hosting

5. **Browser Caching:**
```apache
# .htaccess for Apache
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/webp "access plus 1 year"
    ExpiresByType font/woff2 "access plus 1 year"
</IfModule>
```

### Performance Monitoring

1. **Automated Testing:**
```bash
# Add to package.json scripts
"lighthouse": "lighthouse https://your-site.com --output html --output-path ./lighthouse-report.html"
"bundle-size": "size-limit"
```

2. **Size Limits Configuration:**
```json
// .size-limit.json
[
  {
    "path": "assets/built/screen.css",
    "limit": "40 KB"
  },
  {
    "path": "assets/built/source.js",
    "limit": "25 KB"
  }
]
```

3. **Critical Path CSS:**
   - Extract above-the-fold CSS (~10KB)
   - Inline in `<head>` for instant rendering
   - Load remaining CSS asynchronously

### Development Workflow Updates

1. **Performance-First Development:**
   - Run Lighthouse tests before each deployment
   - Monitor Core Web Vitals (LCP, FID, CLS)
   - Set performance budgets in build process

2. **Build Process Enhancement:**
```javascript
// gulpfile.js additions
const purgecss = require('@fullhuman/postcss-purgecss');
const critical = require('critical');

// PurgeCSS task
gulp.task('purgecss', () => {
    return gulp.src('assets/css/screen.css')
        .pipe(postcss([
            purgecss({
                content: ['**/*.hbs'],
                safelist: ['gh-course-boxes', /^kg-/]
            })
        ]))
        .pipe(gulp.dest('assets/built'));
});

// Critical CSS task
gulp.task('critical', () => {
    return critical.generate({
        base: './',
        src: 'index.html',
        target: 'assets/built/critical.css',
        width: 1300,
        height: 900
    });
});
```

3. **Performance Checklist:**
   - [ ] All images optimized and using WebP
   - [ ] CSS < 40KB minified
   - [ ] Initial JS bundle < 25KB
   - [ ] Lighthouse score > 90
   - [ ] First Contentful Paint < 1.5s
   - [ ] Time to Interactive < 3.5s

## Implementation Checklist Before Ghost Upload

⚠️ **WICHTIG**: Diese Schritte MÜSSEN vor dem Upload zu Ghost Pro durchgeführt werden!

### 1. Zone.Identifier Dateien entfernen
```bash
# Zeige Anzahl der zu löschenden Dateien
find . -name "*Zone.Identifier" | wc -l

# Lösche alle Zone.Identifier Dateien
find . -name "*Zone.Identifier" -type f -delete

# Verhindere zukünftige Zone.Identifier Dateien
echo "*Zone.Identifier" >> .gitignore
```

### 2. Course-Boxes CSS implementieren
Füge folgendes CSS zu `assets/css/screen.css` hinzu (am Ende der Datei):

```css
/* Course Boxes Optimization */
.gh-course-boxes {
    grid-template-columns: repeat(3, 1fr);
    margin-top: 0;
}

/* Mobile: 1 Spalte */
@media (max-width: 767px) {
    .gh-course-boxes {
        grid-template-columns: 1fr;
        gap: 2rem;
    }
}

/* Tablet: 2 Spalten */
@media (min-width: 768px) and (max-width: 1023px) {
    .gh-course-boxes {
        grid-template-columns: repeat(2, 1fr);
    }
}
```

### 3. Course-Boxes Template aktualisieren
Bearbeite `partials/components/course-boxes.hbs`:

**Ändere Zeile 3 von:**
```handlebars
<div class="gh-feed" style="grid-template-columns: repeat(3, 1fr); margin-top: 0;">
```

**Zu:**
```handlebars
<div class="gh-feed gh-course-boxes">
```

### 4. CSS Build erstellen (Manuell wegen fehlendem gulpfile.js)
```bash
# Kopiere CSS zur built Version
cp assets/css/screen.css assets/built/screen.css

# Optional: Minifiziere CSS mit Online-Tool oder npx
npx clean-css-cli -o assets/built/screen.css assets/css/screen.css
```

### 5. JavaScript Build prüfen
```bash
# Prüfe ob source.js existiert
ls -la assets/built/source.js

# Falls nicht, erstelle es manuell:
cat assets/js/dropdown.js assets/js/pagination.js assets/js/lightbox.js assets/js/main.js > assets/built/source.js
```

### 6. Theme validieren
```bash
# Installiere Dependencies falls noch nicht geschehen
npm install --legacy-peer-deps

# Führe Ghost Theme Validierung aus
npm test
```

### 7. ZIP-Datei erstellen
```bash
# Erstelle deploybare ZIP
npm run zip

# Die ZIP-Datei wird erstellt als: lukas-zangerl-coaching-dynamics.zip
```

### 8. Pre-Upload Checkliste
- [ ] Alle Zone.Identifier Dateien entfernt
- [ ] Course-Boxes CSS hinzugefügt
- [ ] Course-Boxes Template aktualisiert
- [ ] CSS zu assets/built/ kopiert
- [ ] JavaScript Bundle vorhanden
- [ ] `npm test` erfolgreich durchgelaufen
- [ ] ZIP-Datei erstellt

### Troubleshooting

**Problem: npm test schlägt fehl**
- Prüfe Ghost Version in package.json (min. 5.0.0)
- Stelle sicher, dass alle Templates valid sind

**Problem: ZIP ist zu groß**
- Lösche node_modules vor dem Zippen
- Entferne .git Ordner aus der ZIP

**Problem: Theme funktioniert nicht nach Upload**
- Prüfe Browser Console für JS-Fehler
- Stelle sicher, dass assets/built/ Dateien vorhanden sind
- Cache leeren in Ghost Admin

### Nächste Schritte nach Upload
1. Ghost Cache leeren: Ghost Admin → Settings → Labs → Clear Cache
2. Browser Cache leeren
3. Theme aktivieren und testen
4. Course-Boxes auf Homepage prüfen