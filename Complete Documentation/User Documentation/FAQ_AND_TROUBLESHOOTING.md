# FAQ And Troubleshooting

## Frequently Asked Questions

### What is EduLense?

EduLense is a cross-platform learning workspace with web, desktop, React Native, and Flutter implementations.

### Which version should I use?

- Use React web for easiest access from a browser.
- Use Electron desktop if you want native desktop menus and file actions.
- Use React Native for Expo-based mobile delivery.
- Use Flutter for Flutter-native mobile and cross-platform builds.

### Can I use EduLense without creating an account?

Some implementations support guest entry for evaluation and demo flows.

### Does EduLense work offline?

Several workflows are local-first, especially notes and locally persisted settings. Full cross-device sync is not the current focus of this repository.

## Troubleshooting By Platform

### React Web

Problem:
The web app does not start locally.

Fix:

```bash
cd /Users/kwameduodu/EduLense/EduLense
npm install
npm run dev
```

Problem:
The route opens but the page is blank.

Fix:

- check the browser console for local build errors
- rerun `npm run build`
- confirm that SPA route handling is configured correctly in deployment

### Electron Desktop

Problem:
The desktop app does not launch in development.

Fix:

```bash
cd /Users/kwameduodu/EduLense/EduLense/edulence_desktop
npm install
npm run dev
```

Problem:
Packaged updates are not working.

Fix:

- updater behavior is only active in packaged builds
- verify GitHub Releases publishing is configured for `umgc/2026_spring`
- verify signing and notarization requirements for release builds

### React Native

Problem:
Expo says `package.json` does not exist.

Fix:

```bash
cd /Users/kwameduodu/EduLense/EduLense/edulence_rn
npm run start
```

Problem:
Expo cache or permissions errors occur.

Fix:

```bash
npm run start:safe
```

Problem:
Android SDK path errors appear.

Fix:

```bash
npm run start:safe:android
```

Problem:
EAS build fails because you are not logged in.

Fix:

```bash
npx eas-cli login
```

### Flutter

Problem:
Flutter dependencies are missing.

Fix:

```bash
cd /Users/kwameduodu/EduLense/EduLense/edulence
flutter pub get
```

Problem:
Android build fails.

Fix:

- confirm Android Studio and SDK are installed
- run `flutter doctor`
- rerun `flutter build apk --debug`

Problem:
iOS build fails.

Fix:

- confirm Xcode is installed
- confirm simulator or signing configuration is correct
- run `flutter doctor`

## General Troubleshooting Commands

### Root web

```bash
npm run build
npm run lint
npm run test:Coverage
```

### Desktop

```bash
cd edulence_desktop
npm run build
npm run lint
npm run test:coverage
```

### React Native

```bash
cd edulence_rn
npm run typecheck
npx jest --coverage
```

### Flutter

```bash
cd edulence
flutter test --coverage
flutter build apk --debug
```

## When To Escalate

Escalate to the development team when:

- a platform no longer launches after a clean install
- accessibility settings no longer change the UI
- a build artifact is missing after a previously successful build
- login, notes, or settings workflows regress across multiple platforms
