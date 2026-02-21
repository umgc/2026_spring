# Deployment Guide (Expo / EAS)

This guide covers release builds for Android and iOS and app store submission workflows.

## 1. Prerequisites
- Expo account with access to project owner/org
- EAS CLI available via `npx eas-cli`
- Apple Developer account (for iOS release)
- Google Play Console account (for Android release)
- Project identifiers configured:
  - iOS bundle id: `com.edulence.rn`
  - Android package: `com.edulence.rn`

## 2. Auth Setup
Login interactively:
```bash
npx eas-cli login
```

Or CI/non-interactive auth:
```bash
export EXPO_TOKEN=your_token_here
```

Check auth:
```bash
npx eas-cli whoami
```

## 3. Validate Project Before Build
```bash
npm install
npm run lint
npm run typecheck
npm test -- --coverage --runInBand
```

## 4. EAS Build Profiles
Configured in `eas.json`:
- `production-android`: release AAB (`android.buildType = app-bundle`)
- `production-ios`: release iOS build (`ios.simulator = false`)
- `production`: shared release defaults with auto version increment

## 5. Build Release Artifacts
Android release:
```bash
npm run build:android:release
```

iOS release:
```bash
npm run build:ios:release
```

Both platforms:
```bash
npm run build:release
```

You can list and inspect builds:
```bash
npx eas-cli build:list
npx eas-cli build:view <BUILD_ID>
```

## 6. Credentials
If prompted during first build:
- Android: allow EAS to manage keystore (recommended)
- iOS: allow EAS to manage distribution certificate and provisioning profile (recommended)

Manual credentials options are available if your organization requires custom signing.

## 7. Submit to Stores
Android (configured to `internal` track):
```bash
npm run submit:android:production
```

iOS:
```bash
npm run submit:ios:production
```

## 8. CI/CD Example (Non-interactive)
```bash
export EXPO_TOKEN=your_token_here
npm ci
npm run lint
npm run typecheck
npm test -- --coverage --runInBand
npx eas-cli build --platform android --profile production-android --non-interactive
npx eas-cli build --platform ios --profile production-ios --non-interactive
```

## 9. Troubleshooting

### Error: "Not logged in"
Use:
```bash
npx eas-cli login
```
or set `EXPO_TOKEN`.

### Error: Missing Apple / Google credentials
Run build interactively once and let EAS configure credentials.

### Build fails on config
Run:
```bash
npx eas-cli diagnostics
npx eas-cli build:configure
```

### Need app version bump
`eas.json` already uses `autoIncrement: true` for production profiles.

## 10. Release Checklist
- [ ] Lint/typecheck/tests passing
- [ ] Coverage report generated (`coverage/lcov-report/index.html`)
- [ ] Android production build succeeded
- [ ] iOS production build succeeded
- [ ] Android submitted (internal/alpha/production as needed)
- [ ] iOS submitted/TestFlight processed
- [ ] Release notes documented
