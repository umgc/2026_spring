# Web VPAT Accessibility Conformance Report

## Report Scope

- Platform covered: React web application at repository root
- Repository path: `src/`
- Standard: WCAG 2.1 Levels A and AA
- Evaluation type: self-assessment using source review, Vitest, Playwright, accessibility evidence screenshots, and verified local build/test results

## Conformance Summary

- Overall assessment: `Supports` for the implemented web scope, with noted limitations
- Known limitations:
  - placeholder or future routes should be reassessed as functionality expands
  - broader manual browser and assistive technology regression is still recommended before external release
  - current repository evidence is strongest for implemented auth, dashboard, courses, notes, and settings flows

## WCAG 2.1 Level A And AA

| Criterion | Level | Conformance | Notes |
| --- | --- | --- | --- |
| 1.1.1 Non-text Content | A | Supports | Buttons, forms, and controls are labeled in the implemented browser flows. |
| 1.2.1 Audio-only and Video-only (Prerecorded) | A | Not Applicable | No prerecorded media workflows are part of the current web app. |
| 1.2.2 Captions (Prerecorded) | A | Not Applicable | No prerecorded synchronized media is present. |
| 1.2.3 Audio Description or Media Alternative (Prerecorded) | A | Not Applicable | No such media content is required for current scope. |
| 1.2.4 Captions (Live) | AA | Not Applicable | No live multimedia is in scope. |
| 1.2.5 Audio Description (Prerecorded) | AA | Not Applicable | No prerecorded synchronized media is part of current scope. |
| 1.3.1 Info and Relationships | A | Supports | Headings, grouped controls, and route-level structure are expressed in markup. |
| 1.3.2 Meaningful Sequence | A | Supports | The page and form order is logical and testable. |
| 1.3.3 Sensory Characteristics | A | Supports | Instructions do not rely solely on sensory references. |
| 1.3.4 Orientation | AA | Supports | The web experience is responsive and not locked to a single orientation. |
| 1.3.5 Identify Input Purpose | AA | Supports | Common auth inputs expose input purpose through labels and field semantics. |
| 1.4.1 Use of Color | A | Supports | Color is not the only channel for primary meaning in implemented views. |
| 1.4.2 Audio Control | A | Not Applicable | No auto-playing audio is present. |
| 1.4.3 Contrast (Minimum) | AA | Supports | Theme and contrast behavior were designed and tested for readable text. |
| 1.4.4 Resize Text | AA | Supports | The web shell supports scaling and readable layout behavior. |
| 1.4.5 Images of Text | AA | Supports | Primary information is rendered as text. |
| 1.4.10 Reflow | AA | Supports | Responsive layouts support smaller widths and changing viewport sizes. |
| 1.4.11 Non-text Contrast | AA | Supports | Controls and visible state indicators provide adequate differentiation. |
| 1.4.12 Text Spacing | AA | Supports | Current web layout remains usable under accessibility-sensitive spacing and size adjustments. |
| 1.4.13 Content on Hover or Focus | AA | Supports | Critical functionality is not hidden behind hover-only behavior. |
| 2.1.1 Keyboard | A | Supports | Web workflows support keyboard access and browser-based interaction. |
| 2.1.2 No Keyboard Trap | A | Supports | Focusable workflows do not intentionally trap users. |
| 2.1.4 Character Key Shortcuts | A | Supports | No problematic single-character shortcut dependency is present in the core web shell. |
| 2.2.1 Timing Adjustable | A | Supports | Core learning flows are not time-limited. |
| 2.2.2 Pause, Stop, Hide | A | Supports | No auto-scrolling or auto-updating moving content is required in core scope. |
| 2.3.1 Three Flashes or Below Threshold | A | Supports | No flashing content is present. |
| 2.4.1 Bypass Blocks | A | Supports | Browser navigation structure and route segmentation provide efficient pathing through the app. |
| 2.4.2 Page Titled | A | Supports | The app provides clear route contexts and headings. |
| 2.4.3 Focus Order | A | Supports | Focus order is logical in auth, settings, notes, and route transitions. |
| 2.4.4 Link Purpose (In Context) | A | Supports | Links and controls are meaningfully named. |
| 2.4.5 Multiple Ways | AA | Supports | Major areas are reachable through navigation and contextual quick actions. |
| 2.4.6 Headings and Labels | AA | Supports | Headings and form labels are descriptive. |
| 2.4.7 Focus Visible | AA | Supports | Focus styling is present for keyboard users. |
| 2.5.1 Pointer Gestures | A | Supports | Core browser workflows use standard click and simple pointer interaction. |
| 2.5.2 Pointer Cancellation | A | Supports | Standard click-based activation is used in implemented flows. |
| 2.5.3 Label in Name | A | Supports | Accessible names align with visible labels in tested controls. |
| 2.5.4 Motion Actuation | A | Not Applicable | Motion-based input is not required. |
| 3.1.1 Language of Page | A | Supports | English is the default language context. |
| 3.1.2 Language of Parts | AA | Supports | No known mixed-language sections requiring alternate language markup are currently present. |
| 3.2.1 On Focus | A | Supports | Focus does not create unexpected changes of context in core routes. |
| 3.2.2 On Input | A | Supports | Inputs do not trigger unexpected navigation in tested flows. |
| 3.2.3 Consistent Navigation | AA | Supports | Navigation remains consistent across routes. |
| 3.2.4 Consistent Identification | AA | Supports | Similar actions are named consistently. |
| 3.3.1 Error Identification | A | Supports | Auth and form interactions surface identifiable errors. |
| 3.3.2 Labels or Instructions | A | Supports | Forms and controls are labeled clearly. |
| 3.3.3 Error Suggestion | AA | Supports with Limitations | Existing error feedback is understandable, though future complex validation may require more detailed correction guidance. |
| 3.3.4 Error Prevention (Legal, Financial, Data) | AA | Not Applicable | Current web scope does not handle legal or financial commitments. |
| 4.1.1 Parsing | A | Supports | React and Vite render standard browser DOM structures. |
| 4.1.2 Name, Role, Value | A | Supports | Forms, navigation, and controls expose semantics appropriately in implemented flows. |
| 4.1.3 Status Messages | AA | Supports with Limitations | Browser UI updates are structured and tested, but continued manual screen-reader verification is recommended for release candidates. |

## Web-Specific Limitations

- broader manual testing with screen readers across Chrome, Safari, and Firefox should be repeated before release
- future growth in dynamic widgets or dialogs should include focused accessibility regression passes
