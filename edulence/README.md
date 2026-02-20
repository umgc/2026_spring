# EduLense

EduLense is a cross-platform educational productivity application designed with a left-handed–first user interface. 

## Quick Start

```bash
cd edulence
flutter pub get
flutter run
```

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

Run Maestro flows:

```bash
maestro test maestro/signin.yaml
```

## Documentation

- `docs/QUICKSTART.md`
- `docs/INDEX.md`
- `docs/IMPLEMENTATION_GUIDE.md`
- `docs/COMPLETION_SUMMARY.md`
