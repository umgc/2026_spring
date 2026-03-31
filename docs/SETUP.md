# Setup Guide

## Prerequisites

Install the following before working across all targets:

- Node.js 18 or newer
- npm 9 or newer
- Flutter SDK compatible with `edulence/pubspec.yaml`
- Xcode for iOS and macOS workflows
- Android Studio and Android SDK for Android workflows
- Expo account for EAS cloud builds

## Repository Bootstrap

```bash
cd /Users/kwameduodu/EduLense/EduLense
npm install
```

## Root Web App

Run locally:

```bash
cd /Users/kwameduodu/EduLense/EduLense
npm run dev
```

Verify:

```bash
npm run build
npm run lint
npm test -- --run
npm run test:e2e
```

## Standalone Web Package

Run locally:

```bash
cd /Users/kwameduodu/EduLense/EduLense/edulence_web
npm install
npm run dev
```

Verify:

```bash
npm run build
npm run lint
```

## Desktop App

Run locally:

```bash
cd /Users/kwameduodu/EduLense/EduLense/edulence_desktop
npm install
npm run dev
```

Verify:

```bash
npm run build
npm run lint
npm test
```

Package:

```bash
npm run dist
```

## React Native App

Run locally:

```bash
cd /Users/kwameduodu/EduLense/EduLense/edulence_rn
npm install
npm run start
```

Alternative startup helpers:

- `npm run start:safe`
- `npm run start:safe:android`

Run native development targets:

```bash
npm run android
npm run ios
```

Verify:

```bash
npm run lint
npm run typecheck
npm test -- --runInBand
```

## Flutter App

Run locally:

```bash
cd /Users/kwameduodu/EduLense/EduLense/edulence
flutter pub get
flutter run
```

Verify:

```bash
flutter test
```

Platform builds:

```bash
flutter build web
flutter build macos
flutter build apk --debug
flutter build ios --simulator
```

## Platform Notes

### Android

- React Native uses Expo or EAS workflows.
- Flutter can be run and built locally with Android Studio and a configured SDK.

### iOS

- React Native iOS requires macOS plus Xcode tooling.
- Flutter iOS simulator and release archive flows require Xcode and local signing configuration.

### Windows and Linux

- Desktop packaging can generate platform artifacts through Electron Builder.
- Real runtime validation should still happen on native Windows and Linux hosts before release.

### macOS

- Desktop and Flutter macOS builds can be produced locally.
- signed distribution still requires Apple developer signing and notarization.
