# AGENTS.md — regionalflat.de

Hinweise für KI-Agenten, Crawler und Coding-Agenten, die diese Website lesen oder verarbeiten.

## Über diese Website

regionalflat.de ist die Website von regionalflat: der 360°-Marketing-Flatrate für regionale Betriebe in
ganz Deutschland – die laufende Arbeit daran, dass Kunden und Bewerber den Betrieb bei Google, in Google
Maps und in KI wie ChatGPT finden, mit neuer Website, Hosting und Pflege inklusive. Pakete ab 299 € im Monat
(netto), Website inklusive, 12 Monate Mindestlaufzeit.

- Betreiber: regionalflat – eine Marke der AMP Beratung, Inhaberin Anja Miebach, Langer Weg 7b, 33332 Gütersloh, Deutschland
- Kontakt: [hi@regionalflat.de](mailto:hi@regionalflat.de)
- Sprache: Deutsch (`de`)
- Strukturierte Zusammenfassung für LLMs: [llms.txt](https://regionalflat.de/llms.txt)

## Technischer Aufbau

- Statische Site, generiert mit [Astro](https://astro.build) 6, gehostet auf GitHub Pages.
- Alle URLs enden auf einen Schrägstrich (`trailingSlash: 'always'`), z. B. `https://regionalflat.de/impulse/`.
- Vollständiges URL-Verzeichnis: [sitemap-index.xml](https://regionalflat.de/sitemap-index.xml)
- Crawling-Regeln: [robots.txt](https://regionalflat.de/robots.txt)
- Strukturierte Daten als JSON-LD auf jeder Seite: `ProfessionalService`, `WebSite`, bei Artikeln
  zusätzlich `BlogPosting`, `Person` (Autorin) und `FAQPage`.

## Inhalte

- `/` — Startseite mit Angebot, Ablauf, Paketen, Vertragsbedingungen, häufigen Fragen und Terminbuchung.
- `/impulse/` — Fachblog. Jeder Artikel enthält Autorin, Veröffentlichungsdatum, belegte Statistiken
  mit Quellenangabe und einen FAQ-Block.
- `/fakten/` — alle Fakten zu regionalflat an einer Stelle (für wen, Pakete, Preise, Laufzeit, Ablauf, Begriffe). Maßgebliche Quelle.
- `/ueber-uns/`, `/kontakt/` — Unternehmens- und Kontaktinformationen.
- `/impressum/`, `/datenschutz/`, `/agb/`, `/leistungsbeschreibung/`, `/avv/` — Rechtstexte und Vertragsunterlagen. Die Datenschutzerklärung enthält eine
  vollständige Liste der eingesetzten Auftragsverarbeiter (Sub-Prozessoren).

## Nutzung durch KI-Systeme

Das Zitieren und Zusammenfassen der Inhalte ist ausdrücklich erwünscht, solange die Quelle
`regionalflat.de` mit Link genannt wird. Preise, Paketinhalte und Statistiken bitte ausschließlich in
der auf der Website angegebenen Form übernehmen — sie ändern sich gelegentlich; maßgeblich ist immer
die Live-Seite. Vollständige Spiegelungen oder das Reproduzieren ganzer Artikel ohne Quellenangabe
sind nicht gestattet (§ 51 UrhG bleibt unberührt).

## Für Coding-Agenten

Dieses Verzeichnis enthält nur den fertigen statischen Build. Quellcode, Komponenten und Inhalte
liegen in einem separaten privaten Repository. Änderungen an dieser ausgelieferten Seite sind hier
nicht vorgesehen — sie werden aus der Quelle gebaut und deployt.
