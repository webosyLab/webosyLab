# Vishara frontend

Persian RTL React + TypeScript + Vite frontend. The original profile README remains unchanged.

## Run

From `/workspace/webosyLab`:

```sh
npm ci --cache /workspace/.npm-cache
npm run dev -- --port 5173
```

`npm run build` runs TypeScript and creates `dist/`. `npm run typecheck` checks application types. `npm test` runs functional browser tests using `/usr/bin/chromium`. On other machines, install a Playwright browser and adjust the executablePath in playwright.config.ts.

Deploy `dist/` to a static host with SPA rewrites to `index.html` for routes such as `/projects/sadeghieh-residential`. `public/_redirects` provides this rule for compatible hosts. Canonical/social URL metadata is intentionally deferred until the deployment domain is confirmed.

## Content status

Access to https://visharaco.com/ was denied by the environment egress proxy (CONNECT 403). The requested domain additions were saved to the environment draft, but do not yet apply to the running machine. No website facts were independently verified.

The brand, tagline, telephone, address and four project titles come from the supplied reference records. They are explicitly labeled where relevant. Categories reflect project titles; no location, size, dates, awards, mission, certifications or official service claims were invented. Project slugs are local routes from the brief, not asserted source URLs.

`src/data.ts` is the structured content source. The local SVG is an original conceptual architectural illustration, not a photograph of a Vishara project. Replace it with optimized, source-verified project assets and add verified descriptions before public launch. The about-page copy describes this website's visual concept rather than company history.

The form validates Persian and Arabic numerals and prepares an SMS link. It never sends to a backend and never reports delivery. The visitor must send the message in their SMS application; charges and device support depend on their provider.

## Implemented

Four primary pages, four project details, unknown-route handling, active navigation, responsive mobile menu, local Persian Vazirmatn fonts, conceptual image lightbox with Escape/focus restoration, reduced motion, client-side validation, route-specific titles/descriptions, and browser refresh support in Vite.

## Environment

Use this task's existing isolated checkout; do not create a worktree. Dependency files survive snapshots; running development servers must be started again. No secret or backend is required for this frontend.

## Black and gold redesign

All routes use obsidian surfaces, antique gold accents and warm ivory text. Local Amiri display fonts and Vazirmatn body fonts support Persian RTL typography without third-party font requests. `src/Heritage.tsx` contains original decorative SVG illustrations inspired by Persepolis double-animal capitals, fluted columns and lotus reliefs; these are contemporary interpretations, not archaeological reproductions. Decorations are hidden from assistive technology. Reduced-motion handling and existing functional controls are preserved.

## Obsidian / Royal Gold / Imperial Purple design system

The exact requested palette and semantic typography, overlay, border and artwork tokens live in `:root` in `src/style.css`. All UI colors reference these tokens; the existing conceptual architecture SVG retains its own illustration colors. Buttons support primary gold and secondary outline variants. Project cards, form fields, navigation, error/focus states and all four pages share the palette. Purple is limited to ambient backgrounds rather than body text or primary actions.

`public/images/achaemenid-architect.webp` is AI-generated decorative artwork inspired by Achaemenid reliefs: a robed guard holding architectural drawings instead of a spear. It is an artistic interpretation, not a verified historical reconstruction or a company project photograph. The desktop artwork is ~106 KiB; the mobile version ~25 KiB. CSS draws it once behind the interface using a noninteractive pseudo-element, dark overlays and no repeat. It is viewport-fixed on desktop and absolute on mobile; no scroll animation or JavaScript is needed. Fonts and artwork are local. Functional tests cover the exact tokens, background asset responses and reduced-motion/mobile behavior in addition to existing route/form/lightbox checks.
