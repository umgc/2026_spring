# EduLense

EduLense is a cross-platform educational productivity application designed with a left-handed-first user interface.

## Quick Start

```bash
cd edulence
flutter pub get
flutter run
```

## Build Artifacts

### Android APK

```bash
flutter build apk --release
```

Output:
- `build/app/outputs/flutter-apk/app-release.apk`

### iOS IPA

```bash
flutter build ipa --release
```

Output:
- `build/ios/ipa/*.ipa`

If iOS signing is not configured:

```bash
flutter build ipa --release --no-codesign
```

Output:
- `build/ios/archive/Runner.xcarchive`

## Project Layout

```text
edulence/
├── lib/                # App code
│   ├── main.dart
│   ├── screens/
│   ├── widgets/
│   ├── theme/
│   └── constants/
├── maestro/            # Maestro E2E flows
├── test/               # Widget and accessibility tests
└── docs/               # Supporting documentation
```

## Accessibility

Implemented coverage includes:
- Semantics labels on key interactive controls
- Logical focus traversal and keyboard navigation
- Tap target sizing via Flutter accessibility guidelines
- Text contrast checks
- Text scaling support up to 200%

## Testing

Run all tests:

```bash
flutter test
```

### UI and E2E Workflow Testing

Critical workflow coverage is implemented across widget, integration, and Maestro layers.

Files:
- Widget/UI tests: `test/widget_test.dart`
- Integration tests:
  - `integration_test/critical_workflows_test.dart`
  - `integration_test/accessibility_flows_test.dart`
- Maestro suite:
  - `maestro/flutter/run_all.yaml`
  - `maestro/flutter/*.yaml`

Run all Flutter UI tests:

```bash
flutter test
flutter test integration_test
maestro test maestro/flutter/run_all.yaml
```

For full cross-platform documentation (Flutter + React Native drop-in suite), see:
- `../TEST_SUITE_UI_E2E.md`
- `../BUILD_AND_TEST_ARTIFACTS.md`

## Documentation

- `docs/QUICKSTART.md`
- `docs/INDEX.md`
- `docs/IMPLEMENTATION_GUIDE.md`
- `docs/COMPLETION_SUMMARY.md`
