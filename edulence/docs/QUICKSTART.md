# Quick Start

## Prerequisites

- Flutter SDK installed
- A connected emulator/device

## Run the App

```bash
cd edulence
flutter pub get
flutter run
```

## Run Tests

```bash
cd edulence
flutter test
```

## Run Maestro Sign-in Flow

```bash
cd edulence
maestro test maestro/signin.yaml
```

## Troubleshooting

- If dependencies fail: `flutter clean && flutter pub get`
- If device is not detected: `flutter devices`
- If Maestro fails to connect: ensure emulator/device is running
