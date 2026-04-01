# Developer Setup And Overview

## Repository

- Repository: `https://github.com/umgc/2026_spring.git`
- Local root: `/Users/kwameduodu/EduLense/EduLense`

## Prerequisites

- Node.js 18+
- npm 9+
- Flutter SDK compatible with `edulence/pubspec.yaml`
- Android Studio and Android SDK
- Xcode for iOS and macOS workflows
- Expo account for EAS builds

## Repository Bootstrap

### Root web app

```bash
cd /Users/kwameduodu/EduLense/EduLense
npm install
```

### Desktop app

```bash
cd /Users/kwameduodu/EduLense/EduLense/edulence_desktop
npm install
```

### React Native app

```bash
cd /Users/kwameduodu/EduLense/EduLense/edulence_rn
npm install
```

### Flutter app

```bash
cd /Users/kwameduodu/EduLense/EduLense/edulence
flutter pub get
```

## Local Development Commands

### React web

```bash
cd /Users/kwameduodu/EduLense/EduLense
npm run dev
```

### Electron desktop

```bash
cd /Users/kwameduodu/EduLense/EduLense/edulence_desktop
npm run dev
```

### React Native

```bash
cd /Users/kwameduodu/EduLense/EduLense/edulence_rn
npm run start
```

### Flutter

```bash
cd /Users/kwameduodu/EduLense/EduLense/edulence
flutter run
```

## Recommended Verification Pass

```bash
cd /Users/kwameduodu/EduLense/EduLense
npm run build
npm run lint
npm run test:Coverage

cd /Users/kwameduodu/EduLense/EduLense/edulence_desktop
npm run build
npm run lint
npm run test:coverage

cd /Users/kwameduodu/EduLense/EduLense/edulence_rn
npm run typecheck
npx jest --coverage
npx expo export --platform android

cd /Users/kwameduodu/EduLense/EduLense/edulence
flutter test --coverage
flutter build apk --debug
```

## Developer Documentation Map

- [ARCHITECTURE_OVERVIEW.md](/Users/kwameduodu/EduLense/EduLense/Complete%20Documentation/Developer%20Documentation/ARCHITECTURE_OVERVIEW.md)
- [CODE_STRUCTURE.md](/Users/kwameduodu/EduLense/EduLense/Complete%20Documentation/Developer%20Documentation/CODE_STRUCTURE.md)
- [API_DOCUMENTATION.md](/Users/kwameduodu/EduLense/EduLense/Complete%20Documentation/Developer%20Documentation/API_DOCUMENTATION.md)
- [TESTING_INSTRUCTIONS.md](/Users/kwameduodu/EduLense/EduLense/Complete%20Documentation/Developer%20Documentation/TESTING_INSTRUCTIONS.md)
- [DEPLOYMENT_GUIDE.md](/Users/kwameduodu/EduLense/EduLense/Complete%20Documentation/Developer%20Documentation/DEPLOYMENT_GUIDE.md)
