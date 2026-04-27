# Kart Race Analyzer — Design System

## Overview

**Kart Race Analyzer** is a single-page web application for analyzing karting race data. Users upload PDF timing sheets from qualification and race sessions and the app parses, visualizes and archives performance data. The app is written in Russian but designed to be broadly usable by karting clubs.

### Product Surface
| Surface | Description |
|---|---|
| **Web App** | Single-page app (`index.html`). Upload → analyze PDF timing sheets → view charts + tables. |

### Sources
- **GitHub repository**: `guvenbn984/kart-analyzer` (branch: `main`)
  - Single file: `index.html` — all CSS, JS, and markup in one self-contained file
- No Figma designs provided.
- No separate asset folder — no custom fonts, no logo images, no icon sets.

---

## CONTENT FUNDAMENTALS

### Language & Tone
- The UI is entirely in **Russian** (Cyrillic). Labels, buttons, tab names, and error messages are all in Russian.
- Tone is **technical and functional** — this is a data analysis tool, not a consumer product. Language is direct, no-frills.
- Copy is concise. Labels like "Итоги" (Results), "Темп" (Pace), "Стабильность" (Consistency) are short and categorical.
- **No marketing copy**, no taglines, no brand voice flourishes.
- Numbers and times are the heroes — the UI frames everything around data readability.

### Casing
- Section headers: Title Case in Russian (e.g. "Итоговая классификация")
- Tab labels: single words, sentence case (e.g. "Итоги", "Время кругов")
- Button labels: imperative verbs ("Анализировать", "Назад")

### Emoji usage
- Emoji **are used** as icons — specifically in the upload zones (⏱, 🏁) and history list items — because there is no icon font or SVG set.
- Emoji are functional replacements for icons, not decorative.

### Specific copy examples
- Upload prompt: "Перетащите PDF или нажмите"
- CTA: "Анализировать"
- Saved results: "Сохранённые результаты"
- Search: "🔍 Поиск: дата, событие, пилот..."
- Rating explainer: "Рейтинг рассчитывается как среднее значение по всем сохранённым гонкам, в которых участвовал пилот."

---

## VISUAL FOUNDATIONS

### Color
A deep **space/navy dark theme** with racing-red primary accent and data-semantic color coding.

| Token | Value | Usage |
|---|---|---|
| `--bg` | `#0f0f1a` | Page background |
| `--bg-card` | `#1a1a2e` | Card / panel surfaces |
| `--bg-card-alt` | `#16213e` | Inset panels, table headers, alt rows |
| `--text` | `#e0e0e0` | Primary text |
| `--text-dim` | `#8892a4` | Labels, secondary info, hints |
| `--accent` | `#e94560` | Primary accent — racing red. CTAs, active tabs, highlights, "worst" value |
| `--accent-green` | `#4caf50` | Success, best lap, position gain, good scores |
| `--accent-blue` | `#4fc3f7` | Informational — card headings, hover states |
| `--accent-yellow` | `#ffd54f` | Warning, local-only badge, avg score |
| `--accent-orange` | `#ff9800` | Secondary warm accent, degradation |
| `--border` | `#2a2a4a` | All dividers and borders |

### Typography
- **Font family**: `'Segoe UI', system-ui, -apple-system, sans-serif` — pure system font, no webfonts loaded.
- **Heading sizes**: h1 at `1.6rem` (header), h3 at `1.1rem` (card titles)
- **Body**: `1rem`, `line-height: 1.5`
- **Small / dim**: `0.8–0.85rem` for labels, hints, table text
- **Bold**: `700` for summary values (`1.8rem`), `800` for driver rating scores (`1.6rem`)
- **Gradient text**: Title uses `linear-gradient(135deg, #e94560 → #ff9800)` clipped to text

### Spacing & Layout
- Max content width: `1400px` (app), `900px` (upload / history)
- Card padding: `20px`
- Card gap: `20px`
- Border radius: `10px` on cards; `6px` on inputs/buttons; `16px`–`20px` on pill elements
- Grid: CSS grid with `auto-fit, minmax()` patterns; two-column for analytics panels

### Backgrounds & Surfaces
- Page: solid `#0f0f1a` — no texture, no image, no pattern
- Header: `linear-gradient(135deg, #1a1a2e → #16213e)` with bottom border
- Cards: flat `#1a1a2e` background
- No full-bleed images, no illustrations, no gradients as page backgrounds

### Shadows
- Cards: `0 4px 20px rgba(0,0,0,0.4)` — single shadow, deep black
- CTA hover: `0 6px 25px rgba(233, 69, 96, 0.4)` — accent-colored glow

### Animation & Motion
- **Transitions**: `all 0.2s` for interactive states (tabs, buttons, history items), `0.3s` for upload zones
- **Hover lift**: `transform: translateY(-2px)` + shadow deepens on primary CTA
- **Loading spinner**: CSS `@keyframes spin` — border-top colored `--accent`, rotates
- **Bar fill**: `transition: width 0.5s ease` on driver rating bars
- No bounces, no spring physics, no entrance animations on content

### Hover & Press States
- Cards: border color shifts to `--accent-blue`
- Tabs: text color to `--text`, underline to `--accent`
- Buttons: lift + accent glow shadow
- Delete buttons: color shifts to `--accent`, border appears
- Pills/checkboxes: opacity reduces to `0.4` when unchecked/excluded

### Borders
- All borders: `1px solid #2a2a4a`
- Upload zone active: `2px dashed #e94560`
- Upload zone loaded: `2px solid #4caf50`
- Podium rows: `3px solid gold/silver/#cd7f32` on left of first cell

### Cards
- Background: `--bg-card` (`#1a1a2e`)
- Border: `1px solid --border`
- Radius: `10px`
- Shadow: `0 4px 20px rgba(0,0,0,0.4)`
- Card headings (`h3`): colored `--accent-blue`, `1.1rem`

### Corner Radii
- Cards / sections: `10px`
- Buttons (secondary): `6px`
- Pill buttons / badges: `16–20px`
- Bar fills: `4px`
- Tab underline: none (line only)

### Imagery
- **No imagery** — pure data/chart UI. Charts are drawn via Chart.js on `<canvas>`.
- Color vibe of charts: accent palette (red, blue, green, yellow, orange, purple) on dark canvas

### Iconography approach
- Emoji only (`⏱` `🏁` `🔍` `✕`). See ICONOGRAPHY section below.

---

## ICONOGRAPHY

The app uses **no icon font, no SVG icon set, and no PNG icons**. All icons are Unicode emoji or HTML entities:

| Usage | Character |
|---|---|
| Qualification upload zone | ⏱ (`&#9201;`) |
| Race upload zone | 🏁 (`&#127937;`) |
| Search in history | 🔍 (`&#128269;`) |
| Back button | ← (`&#8592;`) |
| Delete/close | ✕ (`&#10005;`) |

**No substitution needed** — this is an intentional design choice; emoji icons are embedded directly in HTML.

No logos, no brand illustrations, no SVG assets exist in the codebase. The product title is rendered in text with a CSS gradient.

---

## File Index

```
README.md                        ← This file
SKILL.md                         ← Agent skill definition
colors_and_type.css              ← CSS custom properties for colors + type
assets/                          ← (empty — no image/font assets in source)
preview/
  colors-base.html               ← Base color palette swatches
  colors-semantic.html           ← Semantic/accent color usage
  type-scale.html                ← Typography scale specimen
  type-specimens.html            ← Text element specimens
  spacing-tokens.html            ← Spacing, radius, shadow tokens
  components-buttons.html        ← Button states
  components-cards.html          ← Card and surface patterns
  components-tabs.html           ← Tab navigation
  components-badges.html         ← Status badges and pills
  components-table.html          ← Data table patterns
  components-upload.html         ← Upload zone states
  components-driver-card.html    ← Driver rating card
ui_kits/
  app/
    README.md                    ← UI kit guide
    index.html                   ← Interactive app prototype
    Header.jsx                   ← App header component
    UploadScreen.jsx             ← Upload + history screen
    AnalysisApp.jsx              ← Main tabbed analysis view
    Components.jsx               ← Shared UI components
```
