# EduLense React Native (Expo)

React Native implementation of EduLense with feature parity to the Flutter version, accessibility-first UX, and production-ready Expo/EAS workflows.

## What This Project Is
- Mobile app built with Expo + React Native + TypeScript
- Mirrors the core Flutter EduLense experience (auth, home, explore, profile, settings)
- Uses Zustand for lightweight global state management
- Includes accessibility, tests, and release build configuration

## Flutter vs React Native Comparison

### Shared Product Features
- Authentication entry flow (Sign In / Sign Up)
- Main tab navigation (Home, Explore, Profile)
- Settings for theme and accessibility preferences
- Accessibility semantics on interactive elements
- Responsive behavior and readable typography

### Architectural Comparison
- Flutter:
  - Widget tree and `StatefulWidget`/`StatelessWidget`
  - App state in Dart classes/providers
  - Native rendering engine via Flutter runtime
- React Native:
  - Functional components + hooks
  - Global state in Zustand (`src/store/useAppStore.ts`)
  - Native UI primitives bridged from JS runtime

### Theming and Accessibility Comparison
- Flutter:
  - `ThemeMode` with system/light/dark
  - Focus traversal and semantics widgets
- React Native:
  - `useAppTheme` resolves system/light/dark + high contrast + left-handed layout
  - `accessible`, `accessibilityRole`, `accessibilityLabel`, `accessibilityHint`
  - VoiceOver/TalkBack announcement hook (`useAccessibilityAnnouncement`)

### Platform Optimizations in RN
- Android ripple feedback on pressables
- iOS pressed-opacity feedback
- Keyboard-aware auth form behavior (`KeyboardAvoidingView`, dismiss gestures)
- Android tab hide-on-keyboard
- iOS large-title Settings header

## Tech Stack
- Expo SDK 53
- React 19 + React Native 0.79
- TypeScript
- React Navigation (stack + bottom tabs)
- Zustand
- Jest + React Native Testing Library
- EAS Build / Submit

## Repository Structure
- `src/screens/`: app screens
- `src/components/`: reusable UI components
- `src/navigation/`: navigators and routes
- `src/store/`: global state + selector hooks
- `src/theme/`: colors, spacing, theme resolution
- `src/hooks/`: reusable logic hooks
- `src/utils/`: pure helpers
- `src/__tests__/`: unit, integration, accessibility, snapshot tests
- `docs/ARCHITECTURE.md`: architecture/design notes
- `FLUTTER_VS_RN_PARITY.md`: parity checklist
- `DEPLOYMENT.md`: build and release runbook

## Prerequisites
- Node.js 18+ (LTS recommended)
- npm 9+
- Xcode (for iOS simulator/device builds on macOS)
- Android Studio + SDK (for Android emulator/device)
- Expo account for cloud builds

## Detailed Setup (React Native)

### 1. Install dependencies
```bash
npm install
```

### 2. Validate environment
```bash
npm run lint
npm run typecheck
npm test -- --runInBand
```

### 3. Start Metro/Expo
```bash
npm run start
```

If you previously had Expo permission issues, use:
```bash
npm run start:safe
```

If Android SDK path warnings appear, use:
```bash
npm run start:safe:android
```

### 4. Run on simulators/devices
- Android emulator/device: press `a` in Expo CLI (or scan QR in Expo Go)
- iOS simulator/device: press `i` in Expo CLI (macOS only)

## Quality and Testing

### Lint + Type Safety
```bash
npm run lint
npm run typecheck
npm run analyze:security
```

### Test Suite
```bash
npm test -- --runInBand
```

### Coverage + HTML report
```bash
npm test -- --coverage --runInBand
```
Coverage report:
- `coverage/lcov-report/index.html`

## Build and Release (Expo/EAS)

### Release builds
```bash
npm run build:android:release
npm run build:ios:release
```

### Build both
```bash
npm run build:release
```

### Submit
```bash
npm run submit:android:production
npm run submit:ios:production
```

See full instructions in `DEPLOYMENT.md`.

## Troubleshooting Guide

### 1) Expo says `ConfigError: package.json does not exist`
Cause:
- Running Expo from the wrong directory.

Fix:
- `cd /Users/kwameduodu/EduLense/EduLense/edulence_rn`
- then run `npm run start`

### 2) Expo permission errors (`EACCES` in ~/.expo/native-modules-cache)
Cause:
- Local permissions in Expo cache directory.

Fix:
- Use safe start script:
```bash
npm run start:safe
```

### 3) Android SDK path errors (`Failed to resolve Android SDK path`)
Cause:
- `ANDROID_HOME` / `ANDROID_SDK_ROOT` not set correctly.

Fix:
- Use:
```bash
npm run start:safe:android
```
- Or export env vars manually to your SDK path.

### 4) Buttons appear not to work on auth flow
Checks:
- Confirm form fields have values
- Run tests:
```bash
npm test -- --runInBand
```
- Verify store/auth logic in `src/store/useAppStore.ts`

### 5) `eas-cli` build fails with `Not logged in`
Cause:
- Expo auth missing.

Fix:
```bash
npx eas-cli login
# or
export EXPO_TOKEN=your_token
```

### 6) Build starts but signing/credentials fails
Cause:
- Missing Apple/Google credentials configuration.

Fix:
- Run one interactive build and allow EAS to manage credentials:
```bash
npx eas-cli build --platform android --profile production-android
npx eas-cli build --platform ios --profile production-ios
```

## Development Notes
- Keep business logic in store/actions, not screen components
- Prefer selector hooks over broad store reads for render performance
- Add/extend tests with every new feature
- Keep parity checklist updated when Flutter implementation changes

## APK and IPA Build Artifacts

### Android (APK/AAB via EAS)

```bash
npx eas-cli build --platform android --profile production-android
```

Artifact:
- Download from EAS build URL printed by CLI.

### iOS (IPA via EAS)

```bash
npx eas-cli build --platform ios --profile production-ios
```

Artifact:
- Download from EAS build URL printed by CLI.

### iOS Simulator testing artifact

```bash
npx eas-cli build --platform ios --profile ios-simulator
```

Artifact:
- Simulator `.app` from EAS build URL.

## Full Test + Build Quick Run

```bash
npm test -- --coverage
maestro test --platform ios --udid <IOS_SIM_UDID> maestro/run_all.yaml
npx eas-cli build --platform android --profile production-android
npx eas-cli build --platform ios --profile production-ios
```
