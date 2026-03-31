# EduLense Cross-Platform Suite

EduLense is a multi-platform learning workspace that ships as:

- A React + Vite web app in the repository root
- A standalone web package in [`edulence_web`](./edulence_web)
- An Electron desktop app in [`edulence_desktop`](./edulence_desktop)
- An Expo React Native app in [`edulence_rn`](./edulence_rn)
- A Flutter app in [`edulence`](./edulence)

## Final Polish Status

As of March 30, 2026, the final polish pass completed the following:

- Fixed the root web production build failure caused by invalid CSS
- Cleaned root and desktop lint configuration so checks target real source files
- Aligned React Native and Flutter brand colors with the primary web experience
- Smoothed press states, card surfaces, and modal behavior on mobile and desktop
- Updated snapshot coverage for the polished React Native UI
- Removed stale duplicate desktop package configuration that caused build warnings

## Repository Layout

- `src/`: main React web app
- `edulence_web/`: standalone web package
- `edulence_desktop/`: Electron desktop package
- `edulence_rn/`: Expo React Native package
- `edulence/`: Flutter package
- `BUILD_AND_TEST_ARTIFACTS.md`: build and verification runbook

## Prerequisites

- Node.js 18+
- npm 9+
- Flutter SDK for the Flutter app
- Xcode and/or Android Studio for native mobile workflows

## Quick Start

### Root web app

```bash
cd /Users/kwameduodu/EduLense/EduLense
npm install
npm run dev
```

### Desktop app

```bash
cd /Users/kwameduodu/EduLense/EduLense/edulence_desktop
npm install
npm run dev
```

### React Native app

```bash
cd /Users/kwameduodu/EduLense/EduLense/edulence_rn
npm install
npm run start
```

### Flutter app

```bash
cd /Users/kwameduodu/EduLense/EduLense/edulence
flutter pub get
flutter run
```

## Verification Commands

These commands were used during the March 30, 2026 polish pass:

```bash
cd /Users/kwameduodu/EduLense/EduLense
npm run build
npm run lint
npm test -- --run

cd /Users/kwameduodu/EduLense/EduLense/edulence_desktop
npm run build
npm run lint
npm test

cd /Users/kwameduodu/EduLense/EduLense/edulence_rn
npm run typecheck
npm test

cd /Users/kwameduodu/EduLense/EduLense/edulence
flutter test
```

## Platform Notes

- Root web app: primary responsive PWA experience with page transitions and accessibility preferences
- Desktop app: Electron shell with secure preload bridge, tray support, updater wiring, and keyboard shortcuts
- React Native app: Expo-based mobile app with accessibility-first controls and parity-focused UI
- Flutter app: Material 3 app with accessibility coverage and updated brand palette

## Additional Documentation

- [Build and Test Artifacts](./BUILD_AND_TEST_ARTIFACTS.md)
- [Desktop README](./edulence_desktop/README.md)
- [React Native README](./edulence_rn/README.md)
- [Standalone Web README](./edulence_web/README.md)
