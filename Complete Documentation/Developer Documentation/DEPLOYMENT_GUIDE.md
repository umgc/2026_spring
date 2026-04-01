# Deployment Guide

## Release Principles

Every platform release should satisfy:

- clean reproducible build
- passing automated verification
- acceptable accessibility behavior for implemented flows
- updated documentation and coverage artifacts

## React Web Deployment

### Build

```bash
cd /Users/kwameduodu/EduLense/EduLense
npm install
npm run build
```

Artifact:

- [dist/](/Users/kwameduodu/EduLense/EduLense/dist)

Deployment notes:

- deploy as a static site
- preserve SPA route handling on the host
- validate browser smoke flows after deployment

## Electron Desktop Deployment

### Package

```bash
cd /Users/kwameduodu/EduLense/EduLense/edulence_desktop
npm install
npm run dist
```

Expected targets:

- macOS
- Windows
- Linux

Deployment notes:

- GitHub Releases publishing is configured for `umgc/2026_spring`
- macOS distribution should be signed and notarized
- Windows and Linux packages should be validated on native hosts

## React Native Deployment

### Android release

```bash
cd /Users/kwameduodu/EduLense/EduLense/edulence_rn
npm install
npm run build:android:release
```

### iOS release

```bash
npm run build:ios:release
```

### Submit

```bash
npm run submit:android:production
npm run submit:ios:production
```

Deployment notes:

- EAS login and credentials are required
- App Store and Play Console release metadata should be reviewed before submission

## Flutter Deployment

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

- signed IPA in `build/ios/ipa/`
- archive output for no-codesign workflows where applicable

### Web

```bash
flutter build web
```

### macOS

```bash
flutter build macos
```

## Recommended Pre-Release Checklist

- update versioning
- run build and test commands for the target platform
- verify accessibility settings still work
- review coverage reports
- smoke test sign-in, dashboard, notes, and settings
- confirm screenshots and documentation are current
