# EduLense Cross-Platform Suite

EduLense is a multi-platform learning workspace designed to deliver a consistent study experience across browser, desktop, and mobile runtimes. This repository contains the shared product family, platform-specific implementations, and the build and release guidance needed to maintain them.

## Platform Coverage

- Root web app in `src/`
- Standalone web package in [`edulence_web`](./edulence_web)
- Electron desktop app in [`edulence_desktop`](./edulence_desktop)
- Expo React Native app in [`edulence_rn`](./edulence_rn)
- Flutter app in [`edulence`](./edulence)

## What The Suite Includes

- authentication and guest entry flows
- dashboard, course, explore, notes, profile, and settings experiences
- accessibility preferences and left-handed layout support
- platform-specific build pipelines for web, desktop, React Native, and Flutter
- automated verification across web, desktop, mobile, and accessibility-sensitive flows

## Documentation Hub

The top-level documentation set lives in [`docs`](./docs):

- [Documentation Index](./docs/INDEX.md)
- [Architecture Overview](./docs/ARCHITECTURE.md)
- [Setup Guide](./docs/SETUP.md)
- [API Reference](./docs/API_REFERENCE.md)
- [Troubleshooting Guide](./docs/TROUBLESHOOTING.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)
- [Contributing Guide](./docs/CONTRIBUTING.md)

Additional platform-specific references:

- [Build and Test Artifacts](./BUILD_AND_TEST_ARTIFACTS.md)
- [Desktop README](./edulence_desktop/README.md)
- [React Native README](./edulence_rn/README.md)
- [Flutter README](./edulence/README.md)
- [Standalone Web README](./edulence_web/README.md)

## Repository Layout

```text
EduLense/
├── src/                  # Primary React web app
├── public/               # Root web static assets
├── e2e/                  # Playwright browser tests
├── docs/                 # Top-level documentation
├── edulence_web/         # Standalone web package
├── edulence_desktop/     # Electron desktop package
├── edulence_rn/          # Expo React Native package
├── edulence/             # Flutter package
└── BUILD_AND_TEST_ARTIFACTS.md
```

## Prerequisites

- Node.js 18+
- npm 9+
- Flutter SDK
- Xcode for Apple platform workflows
- Android Studio and Android SDK for Android workflows
- Expo account for EAS release builds

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

## Verification Snapshot

These were the core local verification commands used in the latest readiness pass:

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

For full artifact locations and platform-specific build notes, see [Build and Test Artifacts](./BUILD_AND_TEST_ARTIFACTS.md).

## Architecture Summary

- Root web app: React, Vite, React Router, and persisted Zustand state
- Desktop app: Electron main process plus React renderer with secure preload bridge
- React Native app: Expo, React Navigation, and Zustand-based mobile state
- Flutter app: Material 3, `go_router`, and Flutter-native packaging targets

See [Architecture Overview](./docs/ARCHITECTURE.md) for the detailed breakdown.
