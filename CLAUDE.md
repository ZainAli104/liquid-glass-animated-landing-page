# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the dev server (http://localhost:3000)
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — run ESLint (`eslint-config-next`)

There is no test suite.

## What this is

A single-page, video-backed marketing landing page ("Venture Past Our Sky", a space-travel theme). Next.js 16 App Router, React 19, Tailwind CSS v4, and `motion` (Framer Motion) for animation. There is no backend, no routing beyond the single page, and no data layer — all content is hardcoded as module-level constants inside each component.

## Architecture

- [src/app/page.tsx](src/app/page.tsx) composes the page: `<Hero />` then `<Capabilities />`, both full-screen sections stacked on a black background.
- [src/app/layout.tsx](src/app/layout.tsx) loads the two Google fonts via `next/font` and exposes them as CSS variables `--font-heading` (Instrument Serif, used italic everywhere for display type) and `--font-body` (Barlow). Page `<title>`/`<meta>` live here.
- Section components ([Hero.tsx](src/components/Hero.tsx), [Capabilities.tsx](src/components/Capabilities.tsx)) are `"use client"` and own their own copy/data as top-of-file constants (`STATS`, `PARTNERS`, `CARDS`). Edit content by editing those constants, not by threading props.
- Shared building blocks: [FadingVideo.tsx](src/components/FadingVideo.tsx), [BlurText.tsx](src/components/BlurText.tsx), [Navbar.tsx](src/components/Navbar.tsx), [Icons.tsx](src/components/Icons.tsx) (inline SVG icon components).

## Two things to understand before editing

### The liquid-glass design system

Every card, pill, badge, and button uses one of two utility classes defined in [src/app/globals.css](src/app/globals.css): `.liquid-glass` (subtle, `blur(4px)`) and `.liquid-glass-strong` (heavy, `blur(50px)`). They combine `backdrop-filter` blur with a gradient border faked via a `::before` pseudo-element and `mask-composite`. Use these classes for any new glassy surface rather than reinventing the effect.

Critical constraint documented in the CSS: write **only the unprefixed `backdrop-filter`**. Tailwind v4's Lightning CSS compiler adds the `-webkit-` prefix itself; hand-writing both makes it collapse them and drop the unprefixed property, which silently kills the blur in Chrome/Firefox.

### Animation conventions

Entrance animations are the visual signature — everything blurs+fades+rises into place. Two reusable patterns, both keyed to a `delay` for staggering:

- **On mount** (Hero): the `enter(delay)` helper spreads `initial`/`animate`/`transition` onto a `motion` element. Animates from `blur(10px)`, `opacity 0`, `y 20/50` to resolved.
- **On scroll into view** (Capabilities): the `enterInView(delay)` helper uses `whileInView` + `viewport: { once: true }`.

When adding elements, reuse these helpers and continue the delay cascade (e.g. `enter(1.4)`, `0.2 + i * 0.15`) rather than defining new one-off transitions.

Two bespoke, non-obvious animation components:

- **FadingVideo** — background videos do *not* use the native `loop` attribute. Looping is manual via the `ended` event so each cycle gets a fade-out/fade-in, driven by a `requestAnimationFrame` fade that resumes from the current opacity so an interrupted fade never jumps. Video sources are remote CloudFront URLs hardcoded in Hero/Capabilities.
- **BlurText** — per-word staggered blur-in headline, gated by an `IntersectionObserver`. Uses `marginRight` between words (not spaces) because the tight `-4px` letter-spacing on headings eats normal spaces.

## Conventions

- Import from within `src` using the `@/*` path alias (e.g. `@/components/Hero`).
- Fonts are applied with Tailwind's `font-heading` / `font-body` utilities (wired to the CSS vars in `globals.css` via `@theme inline`). Display type is Instrument Serif set `italic`.
- The palette is black background, white text; opacity variants (`text-white/90`) do the tonal work.
