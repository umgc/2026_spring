# Testing Instructions

## Testing Strategy

EduLense uses platform-specific test layers instead of a single global runner.

- React web: Vitest + Playwright
- Electron desktop: Jest
- React Native: Jest + React Native Testing Library
- Flutter: Flutter widget tests and accessibility guideline checks

## Root React Web

### Unit and component tests with coverage

```bash
cd /Users/kwameduodu/EduLense/EduLense
npm run test:Coverage
```

HTML coverage:

- [../Coverage reports/React web/index.html](/Users/kwameduodu/EduLense/EduLense/Coverage%20reports/React%20web/index.html)

### Browser smoke tests

```bash
npm run test:e2e
```

Playwright covers:

- sign-in flow
- dashboard visibility
- course creation
- notes editing
- settings updates

## Electron Desktop

### Lint and build

```bash
cd /Users/kwameduodu/EduLense/EduLense/edulence_desktop
npm run lint
npm run build
```

### Jest test suite with coverage

```bash
npm run test:coverage
```

HTML coverage:

- [../Coverage reports/Electron desktop/index.html](/Users/kwameduodu/EduLense/EduLense/Coverage%20reports/Electron%20desktop/index.html)

Notable focus:

- IPC helpers
- window state handling
- renderer workflows
- keyboard navigation and accessibility-sensitive behavior

## React Native

### Type and lint checks

```bash
cd /Users/kwameduodu/EduLense/EduLense/edulence_rn
npm run typecheck
npm run lint
```

### Jest coverage run

```bash
npx jest --coverage
```

HTML coverage:

- [../Coverage reports/React Native mobile/index.html](/Users/kwameduodu/EduLense/EduLense/Coverage%20reports/React%20Native%20mobile/index.html)

Notable focus:

- snapshot coverage
- accessibility props and matchers
- auth and navigation flows
- store actions
- contrast and utility functions

## Flutter

### Widget tests with coverage

```bash
cd /Users/kwameduodu/EduLense/EduLense/edulence
flutter test --coverage
```

Generate HTML from LCOV:

```bash
genhtml coverage/lcov.info -o coverage/html
```

HTML coverage:

- [../Coverage reports/Flutter mobile/index.html](/Users/kwameduodu/EduLense/EduLense/Coverage%20reports/Flutter%20mobile/index.html)

Notable focus:

- accessibility guideline checks
- keyboard navigation behavior
- navigation and settings workflows

## Current Verified Commands

These commands were verified successfully in this local repository state:

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
