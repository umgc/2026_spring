# Architecture Overview

## Product Shape

EduLense is a multi-platform study workspace focused on the same product themes across every client:

- Authentication and guest access
- Course discovery and dashboard workflows
- Notes and study organization
- Accessibility and preference controls
- Cross-platform visual consistency

The repository contains more than one implementation because different delivery targets need different runtime models:

- Root web app: responsive browser-first experience
- Standalone web app: separately packaged Vite web distribution
- Desktop app: Electron shell plus React renderer
- React Native app: Expo-managed mobile implementation
- Flutter app: Material 3 cross-platform implementation

## Repository Topology

```text
EduLense/
├── src/                    # Primary React web app
├── public/                 # Root web static assets
├── e2e/                    # Playwright browser smoke coverage
├── edulence_web/           # Standalone web package
├── edulence_desktop/       # Electron desktop app
├── edulence_rn/            # Expo React Native app
├── edulence/               # Flutter app
├── docs/                   # Top-level repository documentation
└── BUILD_AND_TEST_ARTIFACTS.md
```

## Platform Architecture

### Root web app

Stack:

- React 19
- Vite
- React Router
- Zustand with persisted local storage state
- Vitest and Playwright

Flow:

- `src/main.tsx` boots the React app inside `BrowserRouter`
- `src/App.tsx` defines public and protected routes
- `src/state/useAppStore.ts` owns app-level state and actions
- `src/components/AppShell.tsx` provides persistent layout and navigation
- route screens under `src/screens/` render the product workflows

Persistence:

- Browser state is stored in local storage under `edulence-web-state`

### Standalone web package

`edulence_web/` is a separately packaged Vite web target that mirrors the product direction of the root web app. It is useful when the team needs an isolated web bundle or independent deployment workflow.

### Electron desktop app

Stack:

- Electron
- React renderer
- Vite renderer build
- Jest and ESLint
- `electron-updater` for packaged update workflows

Process model:

- `electron/main.js` owns window lifecycle, menus, tray, updater, dialogs, and file system actions
- `electron/preload.js` exposes a constrained `window.desktop` bridge
- `renderer/src/App.jsx` renders the desktop experience

Security model:

- `contextIsolation: true`
- `sandbox: true`
- `nodeIntegration: false`
- privileged behavior only via IPC handlers and preload bridge

### React Native app

Stack:

- Expo SDK 53
- React Native 0.79
- React Navigation
- Zustand
- Jest and React Native Testing Library
- EAS Build / Submit

Flow:

- navigation is split across auth and tab experiences
- global preferences and auth state live in `edulence_rn/src/store/useAppStore.ts`
- shared UI primitives live under `edulence_rn/src/components/`
- theme resolution lives under `edulence_rn/src/theme/`

### Flutter app

Stack:

- Flutter
- Material 3
- `go_router`
- `provider`
- widget and integration testing

Flow:

- `lib/main.dart` initializes the application shell
- screens and widgets live under `lib/screens/` and `lib/widgets/`
- app theming lives in `lib/theme/`
- platform projects in `android/`, `ios/`, `macos/`, `linux/`, `windows/`, and `web/` handle packaging

## Shared Product Concepts

Across the implementations, the product is organized around similar user journeys:

- `Sign in`, `Sign up`, or `Continue as guest`
- land on `Dashboard`
- manage `Courses`
- discover content in `Explore`
- work in `Notes`
- review `Profile`
- adjust preferences in `Settings`

That shared shape is what allows the team to maintain consistency even though the rendering stacks differ.

## State and Data Model

The current suite is largely local-first and demo-data driven.

Common data concepts:

- authenticated user record
- theme and accessibility preferences
- course list and progress values
- notes and active note state
- local save status messaging

The root web app persists a subset of this state locally. The React Native app keeps the same concepts in Zustand. The desktop app persists desktop-specific state through Electron. The Flutter app uses Flutter-native state patterns.

## Testing Strategy

The repo uses layered verification rather than a single global test runner:

- Root web: Vitest plus Playwright
- Desktop: Jest for renderer and Electron-focused behavior
- React Native: Jest plus snapshot and accessibility-oriented tests
- Flutter: widget tests and platform build validation

For the commands used in the final readiness pass, see [Build and Test Artifacts](../BUILD_AND_TEST_ARTIFACTS.md).
