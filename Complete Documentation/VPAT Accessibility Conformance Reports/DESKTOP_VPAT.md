# Desktop VPAT Accessibility Conformance Report

## Report Scope

- Platform covered: Electron desktop
- Repository path: `edulence_desktop/`
- Standard: WCAG 2.1 Levels A and AA
- Evaluation type: self-assessment using source review, Jest coverage, keyboard-navigation tests, and manual desktop accessibility evidence already stored in this repository

## Conformance Summary

- Overall assessment: `Supports` for the implemented desktop shell and major workflows, with noted limitations
- Known limitations:
  - accessibility confidence is highest for the shared shell and implemented routes
  - broader Windows NVDA validation is recommended in addition to the macOS VoiceOver evidence
  - some placeholder views will need feature-specific accessibility review as they mature

## WCAG 2.1 Level A And AA

| Criterion | Level | Conformance | Notes |
| --- | --- | --- | --- |
| 1.1.1 Non-text Content | A | Supports | Buttons, dialogs, and major controls have accessible naming in the implemented shell. |
| 1.2.1 Audio-only and Video-only (Prerecorded) | A | Not Applicable | No prerecorded media workflows are required in the desktop shell. |
| 1.2.2 Captions (Prerecorded) | A | Not Applicable | No synchronized prerecorded media is present. |
| 1.2.3 Audio Description or Media Alternative (Prerecorded) | A | Not Applicable | No prerecorded media alternatives are required. |
| 1.2.4 Captions (Live) | AA | Not Applicable | No live media streaming is in scope. |
| 1.2.5 Audio Description (Prerecorded) | AA | Not Applicable | No prerecorded synchronized media is present. |
| 1.3.1 Info and Relationships | A | Supports | Landmarks, dialogs, labels, and active-state semantics are implemented. |
| 1.3.2 Meaningful Sequence | A | Supports | Keyboard navigation and route focus order are intentional and tested. |
| 1.3.3 Sensory Characteristics | A | Supports | Desktop workflows do not rely solely on color or position. |
| 1.3.4 Orientation | AA | Supports | Desktop window content adapts to resizable layouts. |
| 1.3.5 Identify Input Purpose | AA | Supports | Auth and note inputs are labeled by purpose. |
| 1.4.1 Use of Color | A | Supports | Active states and control meaning are not color-only. |
| 1.4.2 Audio Control | A | Not Applicable | No auto-playing audio is part of current scope. |
| 1.4.3 Contrast (Minimum) | AA | Supports | Theme and contrast choices emphasize readable foreground and background separation. |
| 1.4.4 Resize Text | AA | Supports | Desktop layouts support readable resizing and scalable text presentation. |
| 1.4.5 Images of Text | AA | Supports | Product text is rendered as text rather than image-based text. |
| 1.4.10 Reflow | AA | Supports with Limitations | Implemented pages are responsive within the desktop shell, though very dense future feature screens should be revalidated. |
| 1.4.11 Non-text Contrast | AA | Supports | Focus indicators, controls, and boundaries are visually distinct in implemented flows. |
| 1.4.12 Text Spacing | AA | Supports | Screen and note layouts remain usable with accessible spacing expectations. |
| 1.4.13 Content on Hover or Focus | AA | Supports | The app does not rely on hover-only disclosure for critical actions. |
| 2.1.1 Keyboard | A | Supports | Keyboard navigation is a core verified behavior in desktop tests. |
| 2.1.2 No Keyboard Trap | A | Supports | Modal dialogs and routes can be exited without trapping the keyboard user. |
| 2.1.4 Character Key Shortcuts | A | Supports | Keyboard shortcuts are managed intentionally and do not create uncontrolled single-character traps in implemented scope. |
| 2.2.1 Timing Adjustable | A | Supports | Core desktop workflows are not time-limited. |
| 2.2.2 Pause, Stop, Hide | A | Supports | No auto-animating or auto-updating content requires pause controls in current scope. |
| 2.3.1 Three Flashes or Below Threshold | A | Supports | No flashing content is part of the desktop shell. |
| 2.4.1 Bypass Blocks | A | Supports | Landmarks and route changes help users move through repeated content efficiently. |
| 2.4.2 Page Titled | A | Supports | The current desktop context is identified by route headings and desktop shell context. |
| 2.4.3 Focus Order | A | Supports | Verified through automated keyboard-navigation tests. |
| 2.4.4 Link Purpose (In Context) | A | Supports | Sidebar destinations and actionable controls are meaningfully labeled. |
| 2.4.5 Multiple Ways | AA | Supports | Major destinations are reachable through sidebar navigation and contextual controls. |
| 2.4.6 Headings and Labels | AA | Supports | Page headings and dialog labels are descriptive. |
| 2.4.7 Focus Visible | AA | Supports | Focus visibility is part of the keyboard verification effort. |
| 2.5.1 Pointer Gestures | A | Supports | Core desktop actions use simple click activation. |
| 2.5.2 Pointer Cancellation | A | Supports | Standard click interactions do not depend on down-event-only completion. |
| 2.5.3 Label in Name | A | Supports | Visible names align with accessible names in tested flows. |
| 2.5.4 Motion Actuation | A | Not Applicable | Motion input is not required. |
| 3.1.1 Language of Page | A | Supports | English is the current operating language of the desktop app. |
| 3.1.2 Language of Parts | AA | Supports | No known mixed-language content segments require special markup in current scope. |
| 3.2.1 On Focus | A | Supports | Focus changes do not trigger unexpected navigation. |
| 3.2.2 On Input | A | Supports | Input changes do not unexpectedly submit or reroute in tested flows. |
| 3.2.3 Consistent Navigation | AA | Supports | Sidebar navigation is consistent across implemented routes. |
| 3.2.4 Consistent Identification | AA | Supports | Similar controls are labeled consistently. |
| 3.3.1 Error Identification | A | Supports | Current auth and input workflows provide identifiable error conditions. |
| 3.3.2 Labels or Instructions | A | Supports | Dialogs, fields, and commands are labeled. |
| 3.3.3 Error Suggestion | AA | Supports with Limitations | Existing flows provide understandable messaging, but richer future forms may require more explicit corrective guidance. |
| 3.3.4 Error Prevention (Legal, Financial, Data) | AA | Not Applicable | Current desktop scope does not include legal or financial commitments. |
| 4.1.1 Parsing | A | Supports | Electron and React rely on standard framework parsing and rendering. |
| 4.1.2 Name, Role, Value | A | Supports | Desktop shell and dialog controls expose semantics used by assistive technologies. |
| 4.1.3 Status Messages | AA | Supports with Limitations | Route focus management and UI status behavior are implemented, but broader screen-reader regression across Windows environments is still recommended. |

## Desktop-Specific Limitations

- VoiceOver-focused evidence exists in the repo, but NVDA testing should be added before a formal production release
- placeholder views should be re-evaluated as they become fully interactive
