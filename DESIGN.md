# DESIGN.md: Muscle Fitness Gym Visual System

## Visual Philosophy: Industrial Athletic Brutalism × Obsidian Luxury

Reject all generic SaaS tropes: no generic Inter font, no purple-blue gradients, no card-in-a-card syndrome, no low-contrast gray text, no flat lifeless `#000000`.

### 1. Color System
- **Void Obsidian** (`--bg-void`): `#07080B` (Canvas foundation)
- **Charcoal Surface** (`--bg-surface`): `#101218` (Primary containers)
- **Elevated Steel** (`--bg-elevated`): `#171B24` (Interactive hover surfaces)
- **High-Voltage Electric Volt** (`--color-volt`): `#D4FF00` (High energy action, power, PRs)
- **Volt Glow** (`--color-volt-glow`): `rgba(212, 255, 0, 0.25)`
- **Inferno Blaze** (`--color-blaze`): `#FF4800` (MetCon, intensity indicators)
- **Arctic Plunge Cyan** (`--color-ice`): `#00F0FF` (Recovery, cold plunge, sauna)
- **Text Dominant** (`--text-primary`): `#F4F6FB` (High contrast, crisp legibility)
- **Text Secondary** (`--text-secondary`): `#9CA3AF` (Muted metadata, 4.5:1+ contrast)
- **Border Subdued** (`--border-subtle`): `rgba(255, 255, 255, 0.08)`
- **Border Highlight** (`--border-highlight`): `rgba(212, 255, 0, 0.35)`

### 2. Typography
- **Display Headings**: `'Syne', 'Bebas Neue', sans-serif` — Heavy, wide stance, sculpted athletic presence.
- **Body & Numerical UI**: `'Plus Jakarta Sans', -apple-system, sans-serif` — Surgical clarity, open apertures, geometric precision.
- Numbers: `font-variant-numeric: tabular-nums` for all stats, prices, and countdowns.
- Punctuation: Ellipsis `…`, Curly quotes `“` `”`, Non-breaking spaces for units (`12,000&nbsp;sq.ft`, `₹2,499&nbsp;/mo`).

### 3. Spatial System
- 8pt spatial grid: `8px`, `16px`, `24px`, `32px`, `48px`, `64px`, `96px`.
- Section padding: `clamp(4rem, 8vw, 7.5rem) 1.5rem`.
- Generous breathing room between typographic blocks and media.

### 4. Interactive Polish & Micro-Interactions
- Focus states: High-visibility electric volt double rings `focus-visible:ring-2 focus-visible:ring-offset-2`.
- Transitions: Hardware-accelerated `transform` and `opacity` with cubic bezier `cubic-bezier(0.16, 1, 0.3, 1)`.
- Never `transition: all`.
