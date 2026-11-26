# SupportPRO Design System

- **Version**: 1.0
- **Status**: Locked
- **Date**: 2026-11-26

This document defines the locked visual tokens, typography, spacing, radii, and component specifications for the SupportPRO website so every inside page matches the homepage.

---

## 1. Color Tokens

Dark mode is the default theme (`[data-theme="dark"]`). Light mode is supported via `:root`.

| Token | Role | Dark Mode (Default) | Light Mode |
|---|---|---|---|
| `--bg-base` | Page background | `#0A0A0A` | `#FDFAF5` |
| `--surface-1` | Primary section / card surface | `#111111` | `#F5F0E8` |
| `--surface-2` | Elevated card / input surface | `#161616` | `#FFFFFF` |
| `--border-subtle` | Hairline card & divider border | `rgba(255, 255, 255, 0.10)` (8–12%) | `rgba(0, 0, 0, 0.10)` |
| `--border-strong` | Hover / emphasized border | `rgba(255, 255, 255, 0.16)` | `rgba(0, 0, 0, 0.18)` |
| `--text-primary` | Primary headings & body copy | `#F5F5F2` | `#1A1A18` |
| `--text-secondary` | Muted descriptions & captions | `#A7A7A3` | `#5A5A54` |
| `--text-muted` | Subtle metadata & counters | `#777773` | `#9A9A94` |
| `--primary` | Brand accent & primary buttons | `#F57C00` | `#F57C00` |
| `--primary-hover` | Primary button hover state | `#E06D00` | `#E06D00` |
| `--primary-foreground` | Text on primary accent | `#FFFFFF` | `#FFFFFF` |
| `--success` | Confirmation & status states only (never buttons) | `#10B981` | `#059669` |

> **Rule**: Never use green (`#008000`, `bg-green-*`) for action buttons such as *Add To Cart* or *Request For Quote*. All primary CTAs use `--primary`.

---

## 2. Typography

| Role | Font Family | Usage |
|---|---|---|
| **Display (`--font-display`)** | `Instrument Serif`, Georgia, serif | H1 and H2 editorial headings (e.g., `Cloud Management.`) |
| **Body & UI (`--font-sans`)** | `Inter`, system-ui, sans-serif | Paragraphs, buttons, form controls, navigation |
| **Technical Labels (`--font-mono`)** | `ui-monospace`, SFMono-Regular, monospace | Small technical labels, counters, badges (e.g., `Transparent Pricing`, `01`–`07`) |

---

## 3. Spacing Scale (4px Steps)

| Token | Value | Usage |
|---|---|---|
| `--space-1` | `4px` | Micro gaps |
| `--space-2` | `8px` | Compact icon/label gaps |
| `--space-3` | `12px` | Inline element gaps |
| `--space-4` | `16px` | Form field spacing, small padding |
| `--space-6` | `24px` | Card internal padding |
| `--space-8` | `32px` | Large card padding |
| `--space-12` | `48px` | Subsection spacing |
| `--space-16` | `64px` | Mobile section vertical padding (`--section-padding-mobile`) |
| `--space-24` | `96px` | Desktop section vertical padding (`--section-padding-desktop`) |

---

## 4. Radii & Focus Ring

| Token | Value | Usage |
|---|---|---|
| `--radius-pill` | `9999px` | Primary & secondary buttons, badges, steppers |
| `--radius-card` | `16px` | Cards, feature tiles, pricing containers, form fields |
| `--radius-card-lg` | `24px` | Highlighted custom-plan & quote banners |
| `--focus-ring-width` | `2px` | Focus outline thickness on every interactive element |
| `--focus-ring-offset` | `2px` | Focus outline offset (`:focus-visible`) |
| `--focus-ring-color` | `var(--primary)` | Focus outline color |

---

## 5. Components

1. **Primary Button (`PrimaryButton`)**: Pill radius (`--radius-pill`), `--primary` background, `--primary-hover` on hover, `--primary-foreground` text, 2px orange `:focus-visible` ring with 2px offset.
2. **Secondary Button (`SecondaryButton`)**: Pill radius (`--radius-pill`), transparent / `--surface-2` background, `1px solid var(--border-strong)`, `--text-primary` text, `--primary` border/text on hover, 2px orange `:focus-visible` ring with 2px offset.
3. **Card**: `--surface-2` background, `1px solid var(--border-subtle)` border, `--radius-card` (`16px`) radius, `24px`–`32px` padding.
4. **Feature Tile (`ParticleBadge`)**: `--surface-2` background, `1px solid var(--border-subtle)`, `--radius-card` (`16px`), numbered `01`–`NN` mono badge + `--primary` icon container.
5. **Pricing Row**: `--surface-1` / `--surface-2` container, `--radius-card` (`16px`), checkbox + plan title + quantity stepper (`--radius-pill`) + price + `SecondaryButton` (*Continue Shopping*) + `PrimaryButton` (*Add To Cart*).
6. **Form Field**: `--surface-1` / `--surface-2` background, `1px solid var(--border-subtle)`, `--radius-card` (`16px`), left icon, `--primary` focus border.
7. **Toast / Confirmation**: Uses `--success` exclusively for confirmation states (e.g., *Request Received*, *Health Score*), never for action buttons.

---

## 6. Differences from Previous Homepage Values

| Element | Previous Value | Locked v1.0 Token Value | Notes |
|---|---|---|---|
| Dark background (`--bg-base`) | `#0B0B0B` / `#0A0D12` | `#0A0A0A` | Unified to `#0A0A0A` |
| Dark surfaces (`--surface-1` / `--surface-2`) | `#101010` / `#151515` / `#141414` | `#111111` / `#161616` | Unified to `#111` and `#161616` |
| Primary orange (`--primary`) | `#FF8101` | `#F57C00` | Unified to `#F57C00` |
| Inside page *Add To Cart* button | `#008000` (green) | `var(--primary)` (`#F57C00`) | Replaced green action buttons with orange primary |
| Card border radius (`--radius-card`) | Mix of `16px` (`rounded-2xl`) and `24px` (`rounded-3xl`) | `16px` standard (`24px` for large banners) | Standardized card radius token |
