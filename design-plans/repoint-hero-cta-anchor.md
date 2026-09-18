# Repoint Hero Primary CTA to Active Experience Anchor

Written against: `5cd25d7`

## Evidence chain

- Surface: `src/components/Hero.jsx:L83` (Rendered at landing route `/` above the fold)
- Problem: The primary glowing call-to-action button labeled "EXPLORE WORK" contains `href="#projects"`. Because the `<Projects />` section has been commented out in `src/App.jsx:L35` and removed from `src/components/Navbar.jsx`, clicking this primary CTA fails to navigate to any rendered element on the page.
- Design evidence: The active DOM sections traced from `src/App.jsx` are `#hero`, `#about`, `#skills`, `#experience`, `#reviews`, and `#contact`. Navigation links in `Navbar.jsx:L40-L48` explicitly link `#experience` as "TIMELINE".
- Owner: `src/components/Hero.jsx`
- Scope and affected surfaces: `src/components/Hero.jsx` (primary landing screen hero actions)
- Uncertainty: None. The `#experience` section is the primary showcase of engineering, internship, and web development deliverables.

## Design decision

Update the primary CTA anchor in `Hero.jsx` from `href="#projects"` to `href="#experience"`. This preserves the intended user journey for recruiters and hiring managers who click "EXPLORE WORK", smoothly scrolling them directly to the active professional timeline and real-world project deliveries.

## Reuse

- Reuses existing DOM section ID `#experience` defined in `src/components/Experience.jsx:L74`.
- Exemplar: `src/components/Navbar.jsx:L44` (`{ name: 'TIMELINE', href: '#experience', id: 'experience' }`).

## Changes

1. `src/components/Hero.jsx`
   - Change: In line 83, change `<a href="#projects" ...>` to `<a href="#experience" ...>`.
   - Preserve: Button styling, classes (`btn btn-primary btn-glow`, gradients, hover animations), audio interaction triggers (`playClickSound()`, `playHoverSound()`), and text content (`<span>EXPLORE WORK</span>`).
   - Verify: Clicking "EXPLORE WORK" on the desktop or mobile viewport smoothly scrolls down to the "WORK & ENGINEERING EXPERIENCE" section.

## Scope

- Inherit: All visitors clicking the primary above-the-fold CTA.
- Verify: Ensure smooth scrolling operates properly and active scrollspy highlights the corresponding section.
- Exclude: Do not alter secondary buttons ("GET IN TOUCH" targeting `#contact` and "RESUME PDF" downloading `Ali-Hassan-CV.pdf`).

## Validation

- Product: Clicking "EXPLORE WORK" immediately navigates to the `#experience` section.
- Interface: Test at desktop (1280px+), tablet (768px), and mobile (375px) viewports.
- System: Confirm no dead `#projects` anchor references remain active in user-facing controls.
- Repository: `npm.cmd run build` → exits with code 0.

## Stop conditions

- Stop if `#projects` is restored to `src/App.jsx`.

## Design documentation

- After acceptance and validation: Record in project documentation that the primary hero conversion anchor targets `#experience`.
