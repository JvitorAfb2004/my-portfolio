# Dark Mode + Brandcast-Inspired Effects

**Goal:** Migrate portfolio from light mode to pure black dark mode with 6 visual effects inspired by agenciabrandcast.com.br, keeping lime accent and existing structure.

**Approach:** CSS-first dark theme via Tailwind v4 `@theme` tokens + className adjustments in `App.tsx`. No new dependencies, no structural changes, no copy changes.

**Base:** `#000` pure black
**Accent:** `#BEF500` lime (unchanged)
**Cards:** Glass morphism (`bg-white/[0.03] backdrop-blur-sm border-white/[0.06]`)

## Effects to Implement

1. **Dot grid pattern** — `body::before` with `radial-gradient(#fff 1px, transparent 0)` at 3px spacing, 4% opacity, `mix-blend-mode: plus-lighter`
2. **Glow orbs** — 2 fixed divs: `bg-brand-lime/[0.05] blur-[120px] mix-blend-screen`, positioned behind hero and CTA
3. **Glass header** — `bg-black/70 backdrop-blur-md border-white/[0.06]`
4. **Scroll blur reveal** — Add `filter: blur(8px) → blur(0)` to GSAP reveal tweens
5. **Gradient borders** — Section dividers use `border-white/[0.06]`
6. **Gradient text** — Hero heading: animated gradient `white → lime → white` with `background-clip: text`

## Color Palette (Dark)

| Token | Value | Usage |
|-------|-------|-------|
| `--color-brand-bg` | `#000` | Main background |
| `--color-brand-surface` | `#0A0A0A` | Elevated surfaces |
| `--color-brand-border` | `rgba(255,255,255,0.06)` | Card/section borders |
| `--color-brand-lime` | `#BEF500` | Accent (unchanged) |
| `--color-brand-gray` | `#A0A0A0` | Body text |
| `--color-brand-light-gray` | `#6A6A6A` | Subtle labels |
| Text primary | `#fff` | Headings, important text |
| Text secondary | `#A0A0A0` | Body, descriptions |

## Files Changed

- `src/index.css` — New `@theme`, dark body, dot grid, glow orbs, glass cards, scrollbar, cursor
- `src/App.tsx` — Replace all light-mode classNames with dark equivalents

## What Does NOT Change

- HTML structure, sections, copy
- GSAP animations (enhanced, not replaced)
- Lenis smooth scroll
- TiltCard component
- Icons (lucide-react)
- Navigation indicator logic
- Portfolio card data
- Testimonials data
