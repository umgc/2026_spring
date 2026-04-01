# Install And Access Guide

## Web

### React web

How to access:

1. Open a supported desktop or laptop browser.
2. Navigate to the hosted EduLense web URL when deployed.
3. If running locally, start the app:

```bash
cd /Users/kwameduodu/EduLense/EduLense
npm install
npm run dev
```

4. Open the local URL printed by Vite, typically `http://localhost:5173/`.

### Standalone web package

Use when the team deploys `edulence_web/` independently:

```bash
cd /Users/kwameduodu/EduLense/EduLense/edulence_web
npm install
npm run dev
```

## Electron Desktop

### Development access

```bash
cd /Users/kwameduodu/EduLense/EduLense/edulence_desktop
npm install
npm run dev
```

### Packaged desktop access

Build distributables:

```bash
npm run dist
```

After packaging:

- macOS users open the generated `.dmg` or app bundle
- Windows users open the generated installer
- Linux users open the generated AppImage or package output

## React Native Mobile

### Development access with Expo

```bash
cd /Users/kwameduodu/EduLense/EduLense/edulence_rn
npm install
npm run start
```

Options:

- scan the QR code with Expo Go
- press `a` for Android
- press `i` for iOS on macOS

Safer launch options when permissions or SDK path issues exist:

```bash
npm run start:safe
npm run start:safe:android
```

### Release access

- Android and iOS release builds are produced through EAS
- end users install the store-delivered mobile app or test build shared from EAS

## Flutter Mobile

### Development access

```bash
cd /Users/kwameduodu/EduLense/EduLense/edulence
flutter pub get
flutter run
```

### Android APK access

```bash
flutter build apk --debug
```

Output:

- [edulence/build/app/outputs/flutter-apk/app-debug.apk](/Users/kwameduodu/EduLense/EduLense/edulence/build/app/outputs/flutter-apk/app-debug.apk)

### iOS simulator access

```bash
flutter build ios --simulator
```

### Release access

- Android release APK or AAB can be distributed internally or through a mobile store process
- iOS release builds require Apple signing before installation on devices

## Minimum Environment Notes

- Node.js 18+ and npm 9+ for the JavaScript-based platforms
- Flutter SDK for the Flutter app
- Android Studio and Android SDK for Android-native testing
- Xcode for iOS and macOS-native testing
