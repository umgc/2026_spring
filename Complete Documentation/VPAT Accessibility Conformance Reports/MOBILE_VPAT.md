# Mobile VPAT Accessibility Conformance Report

## Report Scope

- Platforms covered: Flutter mobile and React Native mobile
- Repository paths:
  - `edulence/`
  - `edulence_rn/`
- Standard: WCAG 2.1 Levels A and AA
- Evaluation type: self-assessment based on source review, automated tests, build verification, and repository accessibility evidence

## Conformance Summary

- Overall assessment: `Supports` for the implemented mobile scope, with noted limitations
- Known limitations:
  - broader manual assistive technology regression across a full device matrix is still recommended
  - some advanced or placeholder feature surfaces may need additional release-time validation
  - no media-heavy workflows are currently in scope, so media criteria are generally not applicable

## WCAG 2.1 Level A And AA

| Criterion | Level | Conformance | Notes |
| --- | --- | --- | --- |
| 1.1.1 Non-text Content | A | Supports | Interactive controls include accessible labels and names in tested flows. |
| 1.2.1 Audio-only and Video-only (Prerecorded) | A | Not Applicable | No prerecorded audio-only or video-only educational media is required for core flows. |
| 1.2.2 Captions (Prerecorded) | A | Not Applicable | No prerecorded synchronized media is part of current mobile workflows. |
| 1.2.3 Audio Description or Media Alternative (Prerecorded) | A | Not Applicable | No prerecorded media alternatives are required in current scope. |
| 1.2.4 Captions (Live) | AA | Not Applicable | No live media streaming workflows are present. |
| 1.2.5 Audio Description (Prerecorded) | AA | Not Applicable | No prerecorded synchronized media is part of current mobile scope. |
| 1.3.1 Info and Relationships | A | Supports | Screen structure, labels, and control groupings are expressed in mobile UI components. |
| 1.3.2 Meaningful Sequence | A | Supports | Navigation and forms follow logical order in tested mobile flows. |
| 1.3.3 Sensory Characteristics | A | Supports | Core instructions do not rely only on shape, color, or position. |
| 1.3.4 Orientation | AA | Supports | Mobile layouts are designed for device adaptation without requiring a single orientation. |
| 1.3.5 Identify Input Purpose | AA | Supports | Auth inputs are labeled by purpose such as name, email, and password. |
| 1.4.1 Use of Color | A | Supports | Meaning is not conveyed through color alone in core tested views. |
| 1.4.2 Audio Control | A | Not Applicable | No auto-playing audio is present. |
| 1.4.3 Contrast (Minimum) | AA | Supports | Contrast checks are covered in automated test suites and theme design. |
| 1.4.4 Resize Text | AA | Supports | Large text and text scaling behavior are part of the mobile accessibility model. |
| 1.4.5 Images of Text | AA | Supports | Core text content is rendered as text rather than embedded image text. |
| 1.4.10 Reflow | AA | Supports | Mobile layouts are designed for smaller screens and tested in responsive contexts. |
| 1.4.11 Non-text Contrast | AA | Supports | Controls and key UI boundaries maintain visible contrast in supported themes. |
| 1.4.12 Text Spacing | AA | Supports | Large text and accessible spacing were accounted for in layout behavior. |
| 1.4.13 Content on Hover or Focus | AA | Supports | Core mobile flows do not depend on hover-only content. |
| 2.1.1 Keyboard | A | Supports | Keyboard-friendly validation exists in Flutter and interaction focus is structured for accessible navigation where keyboards are available. |
| 2.1.2 No Keyboard Trap | A | Supports | Tested flows do not trap focus in implemented views. |
| 2.1.4 Character Key Shortcuts | A | Supports | Mobile implementations do not rely on problematic single-character shortcuts in core scope. |
| 2.2.1 Timing Adjustable | A | Supports | Core app flows are not time-limited. |
| 2.2.2 Pause, Stop, Hide | A | Supports | No auto-updating moving content is required for current mobile scope. |
| 2.3.1 Three Flashes or Below Threshold | A | Supports | No flashing content is part of current mobile UI. |
| 2.4.1 Bypass Blocks | A | Supports | Mobile navigation relies on direct app navigation rather than repeated page blocks. |
| 2.4.2 Page Titled | A | Supports | Screen titles and headers identify the current context. |
| 2.4.3 Focus Order | A | Supports | Focus and navigation order are logical in tested auth, settings, and navigation flows. |
| 2.4.4 Link Purpose (In Context) | A | Supports | Action labels and screen entry controls are descriptive in context. |
| 2.4.5 Multiple Ways | AA | Supports | Users can reach major destinations through primary navigation and contextual actions. |
| 2.4.6 Headings and Labels | AA | Supports | Major screens and form fields use descriptive headings and labels. |
| 2.4.7 Focus Visible | AA | Supports | Focus and selected-state behavior are implemented for accessible interaction patterns. |
| 2.5.1 Pointer Gestures | A | Supports | Core flows use simple taps and do not require complex gestures. |
| 2.5.2 Pointer Cancellation | A | Supports | Standard mobile tap behavior does not require irreversible down-event-only activation. |
| 2.5.3 Label in Name | A | Supports | Accessible names align with visible labels in tested controls. |
| 2.5.4 Motion Actuation | A | Not Applicable | Motion-actuated input is not required. |
| 3.1.1 Language of Page | A | Supports | English is the current default language context. |
| 3.1.2 Language of Parts | AA | Supports | No multi-language content segments requiring explicit alternate language declarations are known in current scope. |
| 3.2.1 On Focus | A | Supports | Focus does not trigger unexpected context changes in implemented flows. |
| 3.2.2 On Input | A | Supports | User input does not cause unexpected navigation in tested forms. |
| 3.2.3 Consistent Navigation | AA | Supports | Navigation destinations remain consistent across app sections. |
| 3.2.4 Consistent Identification | AA | Supports | Similar actions are labeled consistently across mobile screens. |
| 3.3.1 Error Identification | A | Supports | Auth and form-driven flows expose error conditions in app state and UI. |
| 3.3.2 Labels or Instructions | A | Supports | Inputs are labeled and primary actions are described. |
| 3.3.3 Error Suggestion | AA | Supports with Limitations | Common auth and duplicate-account flows return understandable messages, but future complex forms may need richer suggestions. |
| 3.3.4 Error Prevention (Legal, Financial, Data) | AA | Not Applicable | Current mobile scope does not process legal or financial commitments. |
| 4.1.1 Parsing | A | Supports | The codebase uses standard framework rendering and compiled mobile runtimes. |
| 4.1.2 Name, Role, Value | A | Supports | Controls expose accessible names, roles, and state in tested flows. |
| 4.1.3 Status Messages | AA | Supports with Limitations | Accessible announcement support exists, though broader device-level screen-reader validation is still recommended. |

## Mobile-Specific Limitations

- full VoiceOver and TalkBack regression across a broader physical-device set should be completed before release
- criteria marked `Supports with Limitations` should be revisited when richer form workflows or live-service integrations are added
