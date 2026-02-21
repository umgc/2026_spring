# Build and Testing Instructions (Flutter + React Native)

This document provides clear commands for testing and producing Android APK and iOS IPA artifacts.

## 1) Flutter app (`edulence`)

### Run tests
```bash
cd edulence
flutter pub get
flutter test
flutter test integration_test
maestro test maestro/flutter/run_all.yaml
```

### Build Android APK
```bash
cd edulence
flutter build apk --release
```
Output:
- `edulence/build/app/outputs/flutter-apk/app-release.apk`

### Build iOS IPA
```bash
cd edulence
flutter build ipa --release
```
Output (signed release):
- `edulence/build/ios/ipa/*.ipa`

If signing is not configured:
```bash
flutter build ipa --release --no-codesign
```
Output:
- `edulence/build/ios/archive/Runner.xcarchive` (archive for later export to IPA in Xcode)

## 2) React Native app (`edulence_rn`)

### Run tests
```bash
cd /Users/kwameduodu/EduLense/EduLense/edulence_rn
npm install
npm test -- --coverage
maestro test --platform ios --udid <IOS_SIM_UDID> maestro/run_all.yaml
```

### Build Android APK (EAS)
```bash
cd /Users/kwameduodu/EduLense/EduLense/edulence_rn
npx eas-cli build --platform android --profile production-android
```
Artifact:
- Download APK/AAB from the EAS build page shown by CLI.

### Build iOS IPA (EAS)
```bash
cd /Users/kwameduodu/EduLense/EduLense/edulence_rn
npx eas-cli build --platform ios --profile production-ios
```
Artifact:
- Download IPA from the EAS build page shown by CLI.

### Optional iOS simulator artifact (for testing)
```bash
npx eas-cli build --platform ios --profile ios-simulator
```
Artifact:
- Simulator `.app` artifact from EAS build page.

## 3) GitHub update checklist

For each repository branch:
```bash
git add .
git commit -m "Add build and testing instructions for APK/IPA artifacts"
git push origin <branch>
```

Recommended README sections:
- Prerequisites
- Test commands
- APK build command + output location
- IPA build command + output location
- Troubleshooting
