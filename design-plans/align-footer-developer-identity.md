# Align Footer Branding with Full-Stack Web and Backend Identity

Written against: `5cd25d7`

## Evidence chain

- Surface: `src/components/Footer.jsx:L18`
- Problem: The footer branding currently reads `ALI HASSAN <span className="text-cyan-400">// BACKEND &amp; AUTOMATION</span>`. This creates an internal brand contradiction with `src/components/Hero.jsx:L10-L15` (which highlights `FULL-STACK WEB DEVELOPER` and `NODE.JS & REACT SPECIALIST`) and `src/components/About.jsx:L11` (`Web Solutions & Backend Automation`).
- Design evidence: The unified engineering persona across `Hero.jsx`, `About.jsx`, and `Experience.jsx` explicitly establishes dual expertise in Web Development and Backend Automation.
- Owner: `src/components/Footer.jsx`
- Scope and affected surfaces: `src/components/Footer.jsx` (persistent global footer)
- Uncertainty: None.

## Design decision

Update the footer branding subtitle to `// WEB &amp; BACKEND DEV` to maintain consistent, cohesive developer identity across the entire landing page from header to footer.

## Reuse

- Reuses existing brand typography, font weights, cyan accent span (`text-cyan-400`), and separator styling.
- Exemplar: `src/components/Hero.jsx:L57` (`OPEN TO OPPORTUNITIES // WEB & BACKEND`).

## Changes

1. `src/components/Footer.jsx`
   - Change: In line 18, replace:
     ```jsx
     ALI HASSAN <span className="text-cyan-400">// BACKEND &amp; AUTOMATION</span>
     ```
     with:
     ```jsx
     ALI HASSAN <span className="text-cyan-400">// WEB &amp; BACKEND DEV</span>
     ```
   - Preserve: Surrounding DOM structure, logo container, status pulse indicator (`SYS_READY`), social link buttons, and back-to-top button.
   - Verify: The footer renders "ALI HASSAN // WEB & BACKEND DEV" with the cyan accent on all viewports.

## Scope

- Inherit: Global footer visible at the base of every page scroll.
- Verify: Contrast ratio and typography consistency with the header brand logo (`HASSAN.DEV`).
- Exclude: Do not alter copyright notice or institution sub-label (`BS Computer Science @ GCUF`).

## Validation

- Product: Visual inspection confirms consistent branding that does not pigeonhole the developer exclusively as backend-only.
- Interface: Verify layout across small mobile screens and large desktop screens without line overflow.
- System: Confirm no other components render obsolete single-focus titles.
- Repository: `npm.cmd run build` → exits with code 0.

## Stop conditions

- Stop if site design language is updated to a different primary headline.

## Design documentation

- After acceptance and validation: None.
