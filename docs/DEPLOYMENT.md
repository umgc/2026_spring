# Deployment Guide

## Release Philosophy

EduLense ships through multiple platform pipelines. The release process is successful only when each target has:

- a reproducible build
- smoke-tested runtime behavior
- matching UI and accessibility expectations
- documentation updated with any release-relevant changes

## Root Web App

Build:

```bash
cd /Users/kwameduodu/EduLense/EduLense
npm run build
```

Artifact:

- `dist/`

Deployment notes:

- suitable for static hosting
- confirm routing configuration matches the hosting provider
- keep `vercel.json` aligned with SPA route handling if deploying to Vercel

## Standalone Web Package

Build:

```bash
cd /Users/kwameduodu/EduLense/EduLense/edulence_web
npm install
npm run build
```

Artifact:

- `edulence_web/dist/`

## Electron Desktop

Package:

```bash
cd /Users/kwameduodu/EduLense/EduLense/edulence_desktop
npm install
npm run dist
```

Expected outputs:

- macOS packaged output
- Windows packaged output
- Linux packaged output

Release notes:

- publishing is configured for GitHub Releases under `umgc/2026_spring`
- macOS distribution should be signed and notarized before public release
- Windows and Linux artifacts should be validated on native hosts before announcement

## React Native

Builds are managed through Expo Application Services.

Build:

```bash
cd /Users/kwameduodu/EduLense/EduLense/edulence_rn
npm install
npm run build:android:release
npm run build:ios:release
```

Submit:

```bash
npm run submit:android:production
npm run submit:ios:production
```

Release notes:

- requires Expo authentication and EAS configuration
- store credentials and signing are handled through EAS or the associated platform account

## Flutter

### Android

```bash
cd /Users/kwameduodu/EduLense/EduLense/edulence
flutter build apk --release
```

Artifact:

- `build/app/outputs/flutter-apk/app-release.apk`

### iOS

```bash
flutter build ipa --release
```

Artifacts:

- signed IPA under `build/ios/ipa/`
- or archive output when using `--no-codesign`

### Web

```bash
flutter build web
```

Artifact:

- `build/web/`

### macOS

```bash
flutter build macos
```

Artifact:

- `build/macos/Build/Products/Release/`

## Pre-Release Checklist

- run the platform verification commands from [Build and Test Artifacts](../BUILD_AND_TEST_ARTIFACTS.md)
- perform smoke tests on target runtimes
- confirm accessibility checks on the web release build
- verify icons, app metadata, and version numbers are current
- update documentation when workflows or release expectations changed

## CI and Future Improvements

Recommended next steps for release maturity:

- automate root web and desktop verification in CI
- automate Expo EAS build triggers per branch or tag
- automate Flutter multi-platform builds where runner infrastructure exists
- publish a versioned changelog alongside GitHub Releases
