# Troubleshooting Guide

## Root Web App

### `npm run build` fails

Checks:

- confirm dependencies were installed from the repo root
- run `npm run lint` to surface related source issues
- verify CSS and route imports have not drifted from the Vite entry points

### Auth flow does not advance

Checks:

- use the demo account `demo@edulence.app` / `demo1234`
- clear local storage if stale persisted state is interfering
- confirm `src/state/useAppStore.ts` still exposes `signIn` and `currentUser`

### E2E tests fail locally

Checks:

- ensure Playwright browsers are installed
- ensure the preview or dev server is reachable on the configured host
- re-run with a clean local storage profile

## Desktop App

### Electron app does not start

Checks:

- run from `edulence_desktop/`
- install dependencies locally with `npm install`
- confirm the renderer build starts on the Vite port before Electron launches

### File actions fail

Checks:

- verify the issue reproduces in a packaged build or only in development
- inspect `edulence_desktop/electron/main.js` IPC handlers
- confirm payloads match the preload bridge contract

### Auto-update checks do not work

Checks:

- updater behavior is disabled or limited in development
- packaged builds need release artifacts published to GitHub Releases
- platform signing and notarization may be required before full production behavior is available

## React Native App

### Expo says `package.json` does not exist

Fix:

```bash
cd /Users/kwameduodu/EduLense/EduLense/edulence_rn
npm run start
```

### Expo cache permission errors

Fix:

```bash
npm run start:safe
```

### Android SDK path errors

Fix:

```bash
npm run start:safe:android
```

If needed, export `ANDROID_HOME` and `ANDROID_SDK_ROOT` manually.

### EAS build auth errors

Fix:

```bash
npx eas-cli login
```

Or set `EXPO_TOKEN` in CI.

## Flutter App

### `flutter pub get` or `flutter run` fails

Checks:

- confirm the installed Flutter SDK matches the project constraints
- run `flutter doctor`
- open the target platform toolchain in Xcode or Android Studio if native toolchain setup is incomplete

### iOS build fails or cannot sign

Checks:

- confirm Xcode command line tools are installed
- verify a valid signing team and provisioning setup
- use `flutter build ipa --release --no-codesign` when only archive validation is needed locally

### Desktop or mobile build succeeds but won’t launch on target hardware

Checks:

- verify on a native host for that operating system
- confirm release packaging includes the expected runtime dependencies
- repeat with a debug build to capture clearer logs

## Cross-Platform Consistency Issues

### Theme or color drift between platforms

Checks:

- compare theme token files in web, React Native, and Flutter theme folders
- verify new colors were not added in one platform without being mirrored in the others

### Accessibility behavior differs by platform

Checks:

- validate labels, roles, and focus order on each platform
- run automated tests first, then manual screen-reader checks where required
- keep landmark and semantics fixes aligned across web, desktop, React Native, and Flutter
