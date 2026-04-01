# Code Structure Explanation

## Root App Structure

```text
EduLense/
├── src/
│   ├── components/
│   ├── data/
│   ├── hooks/
│   ├── screens/
│   ├── state/
│   ├── utils/
│   └── routesConfig.ts
├── public/
├── test/
├── e2e/
├── edulence_desktop/
├── edulence_rn/
├── edulence/
└── docs/
```

## React Web

Important areas:

- `src/components/`
  - reusable layout and UI primitives
- `src/screens/`
  - route-level user experiences
- `src/state/useAppStore.ts`
  - global state and business actions
- `src/hooks/`
  - reusable behavioral hooks
- `src/data/mockData.ts`
  - mock content and seed data

## Electron Desktop

Important areas:

- `edulence_desktop/electron/`
  - main process logic
  - preload bridge
  - window and IPC utilities
- `edulence_desktop/renderer/src/`
  - React renderer UI
- `edulence_desktop/test/jest/`
  - Jest support utilities

## React Native

Important areas:

- `edulence_rn/src/screens/`
  - mobile screen components
- `edulence_rn/src/components/`
  - reusable mobile UI controls
- `edulence_rn/src/navigation/`
  - stack and tab navigation
- `edulence_rn/src/store/useAppStore.ts`
  - Zustand state and actions
- `edulence_rn/src/theme/`
  - colors, spacing, theme resolution
- `edulence_rn/src/__tests__/`
  - unit, integration, accessibility, and snapshot tests

## Flutter

Important areas:

- `edulence/lib/main.dart`
  - app startup and top-level wiring
- `edulence/lib/screens/`
  - route-level Flutter screens
- `edulence/lib/theme/`
  - theme tokens and Material configuration
- `edulence/test/`
  - widget and accessibility tests
- `edulence/android/`, `ios/`, `web/`, `macos/`, `linux/`, `windows/`
  - platform packaging projects

## Conventions

- route-level experiences live in `screens/`
- reusable UI lives in `components/` or Flutter equivalents
- global state is centralized per platform
- tests sit close to the platform they validate
- deployment and setup guidance stays in repository docs
