# Remove Recursive Self-Portfolio Reference from CLI Terminal

Written against: `5cd25d7`

## Evidence chain

- Surface: `src/components/TerminalContact.jsx:L67-L70`
- Problem: In the interactive bash terminal simulator, executing the `projects` command prints `3. Modern React Cyber Hub (alistackdev.github.io)`. This violates the explicit user design decision that visitors are already viewing the active portfolio and projects should showcase external deliverables rather than self-referential links.
- Design evidence: Documented project deliverables across `src/components/Experience.jsx:L40-L53` and academic coursework feature `romicmedia.com`, `loghomestore.ca`, and C++ OOP systems (`Cinema & Parking Management Systems`).
- Owner: `src/components/TerminalContact.jsx`
- Scope and affected surfaces: `src/components/TerminalContact.jsx` (interactive terminal log buffer)
- Uncertainty: None.

## Design decision

Replace the self-referential portfolio entry in the `projects` command response with a reference to the C++ OOP academic software systems (`Smart Parking & Cinema Management Systems`), matching real engineering accomplishments.

## Reuse

- Reuses existing terminal log styling, line breaks (`\n`), and success text highlighting (`type: 'info'`).
- Exemplar: `src/components/Experience.jsx:L48-L53`.

## Changes

1. `src/components/TerminalContact.jsx`
   - Change: In line 69, update the `text` string for the `projects` command:
     Replace:
     ```javascript
     text: 'PROJECTS: \n1. Canada Log Home Store RAG Pipeline (loghomestore.ca)\n2. Romic Media Platform (romicmedia.com)\n3. Modern React Cyber Hub (alistackdev.github.io)\n4. C++ OOP Cinema & Parking Systems'
     ```
     with:
     ```javascript
     text: 'PROJECTS: \n1. Canada Log Home Store RAG Pipeline (loghomestore.ca)\n2. Romic Media Platform (romicmedia.com)\n3. Cinema Booking Management System (C++ OOP)\n4. Smart Parking Allocation System (C++ OOP)'
     ```
   - Preserve: Command parsing logic, audio tone triggering, Formspree submission handling, and comms port cards.
   - Verify: Typing `projects` in the terminal output lists the four distinct external/academic engineering projects without mentioning `alistackdev.github.io`.

## Scope

- Inherit: Interactive terminal simulator output buffer.
- Verify: Help command (`help`) and project listing syntax.
- Exclude: Do not modify form fields (name, email, message) or Formspree integration.

## Validation

- Product: Terminal output correctly communicates real engineering scope without recursive self-referential links.
- Interface: Test typing `projects` in the command input and verify legible, non-overflowing text output in the terminal console.
- System: Verify alignment with `Experience.jsx` timeline entries.
- Repository: `npm.cmd run build` → exits with code 0.

## Stop conditions

- Stop if interactive terminal command structure is replaced.

## Design documentation

- After acceptance and validation: None.
