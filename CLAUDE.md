# LinkedIn Visibility Audit — Projektkontext

## Was ist das?
Kostenloses Lead-Magnet-Tool für Clevermation. Mittelständler geben Firmenname, LinkedIn Company Page, persönliches LinkedIn-Profil und E-Mail ein → automatische AI-Analyse der LinkedIn-Präsenz → Sofort-Score auf dem Bildschirm + ausführlicher PDF-Report per Mail.

**Ziel:** Qualifizierte Leads generieren, die in Clevermations LinkedIn-System (~€800/Monat SaaS) konvertieren.

**Domain:** linkedin-audit.clevermation.com (Cloudflare + Docploy, bereits aufgesetzt)
**Repo:** https://github.com/Clevermation/linkedin-visibility-audit
**Tech-Stack:** Next.js + TypeScript + Tailwind CSS

## Branding (von clevermation.com extrahiert)
- **Primary:** `#100843` (Dunkelblau)
- **Accent:** `#9458f5` (Lila)
- **CTA:** `#f28c82` (Coral)
- **Grau:** `#d2d2d6`
- **Dark BG:** `#0a0520`
- **Card Dark:** `#160d3a`
- **Fonts:** Plus Jakarta Sans (Headlines/Body), Inter (UI-Elemente)
- **Gradient:** `linear-gradient(135deg, #9458f5, #f28c82)`
- **Buttons:** Coral Background, Dark Text, `border-radius: 0.5rem`

## Aktueller Stand (Phase 1 — Frontend Skeleton)

### Was fertig ist
- [x] GitHub Repo angelegt + Docploy verbunden
- [x] Next.js + TypeScript + Tailwind initialisiert
- [x] **Landing Page** — Hero, Gradient-Text, Badge, Formular (5 Felder), Social Proof Stats
- [x] **Loading Screen** — Firmen-Initial, 5 animierte Schritte mit auto-advance, Fortschrittsbalken
- [x] **Result Screen** — Score-Ring, 4 Metriken-Karten mit Badges, Stärke/Potenzial Insights, Report-Teaser, Calendly CTA
- [x] Screen-Flow funktioniert: Landing → Loading → Result (mit Dummy-Daten)

### Was als nächstes kommt

**Phase 1 (Rest):**
- [ ] Responsive/Mobile check und ggf. fixen
- [ ] Feintuning nach Review auf der Live-Domain

**Phase 2 — Backend Anbindung:**
- [ ] n8n Webhook für Formular-Submit
- [ ] Apify Actors einrichten + testen (Company Scraper, Profile Scraper, Posts Scraper, Employee Scraper)
- [ ] Fast Track: Apify → Claude API → JSON Response an Frontend (Sofort-Screen, ~30 Sek.)
- [ ] Deep Track: Apify → Claude API → PDF generieren → Mail senden (async, ~3-8 Min.)

**Phase 3 — Polish & Go Live:**
- [ ] PDF-Report-Template mit Branding (6 Seiten)
- [ ] E-Mail-Template
- [ ] Error Handling / Edge Cases
- [ ] Live schalten + erster LinkedIn Post

## Architektur (Zwei-Track-System)

```
Frontend (Next.js) → n8n Webhook
                        │
                        ├── Fast Track (parallel, ~30s)
                        │   ├── Apify: Company Page Scraper
                        │   ├── Apify: Profile Scraper
                        │   └── Claude API → Quick-Score + Insights
                        │       → Response an Frontend
                        │
                        └── Deep Track (async, ~3-8min)
                            ├── Apify: Company Posts (letzte 30)
                            ├── Apify: Profile Posts (letzte 20)
                            ├── Apify: Employee Activity
                            └── Claude API → Deep-Analyse
                                → HTML → PDF
                                → Mail mit Anhang
                                → Lead in CRM speichern
```

## Scoring-Modell (0-100 Punkte)
| Kategorie | Max |
|-----------|-----|
| Company Page Vollständigkeit | 10 |
| Posting-Frequenz | 15 |
| Content-Qualität & Mix | 15 |
| Engagement-Rate | 15 |
| Persönliches Profil | 15 |
| Persönliche Posting-Aktivität | 15 |
| Mitarbeiter-Sichtbarkeit | 15 |

## Wichtige Dateien
- `src/app/page.tsx` — Hauptseite mit Screen-State-Management (landing/loading/result)
- `src/components/LandingPage.tsx` — Hero + Form
- `src/components/AuditForm.tsx` — Formular-Komponente mit Validierung
- `src/components/LoadingScreen.tsx` — Animierte Lade-Schritte
- `src/components/ResultScreen.tsx` — Score + Metriken + Insights (aktuell Dummy-Daten)
- `src/app/globals.css` — Clevermation Design Tokens + Animationen

## Ausführliche Dokumentation
Die vollständige PRD und das UI-Mockup (HTML) liegen unter:
- `/Users/paulkramer/Clevermation/Intern/Fulfillment/docs/output/PRD-LinkedIn-Visibility-Audit.md`
- `/Users/paulkramer/Clevermation/Intern/Fulfillment/docs/output/UI-LinkedIn-Visibility-Audit.html`

## Hinweise
- Immer "Sie" verwenden (formelle Ansprache), kein "du" — Zielgruppe ist C-Level/Mittelstand
- Immer echte Umlaute verwenden (ä, ö, ü, ß), keine Ersatzschreibweise
- Firmenname ist "Clevermation", nicht "CleverMation"
- Zielgruppe: Geschäftsführer und Marketingleiter im deutschen Mittelstand (50-500 MA)
