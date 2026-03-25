Project cleanup applied:

- Removed misplaced Flutter test files from the web app root (`test/state` and `test/widgets`).
- Those files referenced a different Flutter package name (`edulense_flutter_new`) and caused VS Code/Dart analyzer errors like:
  - Target of URI doesn't exist: 'package:flutter_test/flutter_test.dart'
- The actual Flutter project in this repo is `edulence/`, and its valid Flutter tests should live under `edulence/test/`.

How to work with this repo:
- Web React app: open the repo root and use `npm install`, `npm test`, `npm run test:coverage`, `npm run test:e2e`.
- Flutter app: open the `edulence/` folder by itself in VS Code, then run `flutter pub get` and `flutter test`.

- Fixed the course creation modal so its content stays usable within the viewport by adding a max-height and internal scrolling.
- Hardened the Playwright course-creation flow to submit the form from within the dialog, avoiding cross-browser viewport click flakiness.
