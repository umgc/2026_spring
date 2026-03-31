# API Reference

This repository is primarily a client application suite, so its most important APIs are internal application interfaces rather than public HTTP endpoints.

## Web Routes

Defined in `src/App.tsx`.

Public route:

- `/auth/:mode?`

Protected routes:

- `/dashboard`
- `/courses`
- `/explore`
- `/notes`
- `/profile`
- `/settings/*`
- `/help`

Fallback route:

- `*` renders the not found screen

## Root Web State API

Defined in `src/state/useAppStore.ts`.

State:

- `themeMode`
- `leftHandedMode`
- `largeText`
- `highContrast`
- `users`
- `currentUser`
- `authError`
- `courses`
- `notes`
- `activeNoteId`
- `installReady`
- `lastSavedMessage`
- `appMeta`

Primary actions:

- `setThemeMode(themeMode)`
- `setLeftHandedMode(leftHandedMode)`
- `setLargeText(largeText)`
- `setHighContrast(highContrast)`
- `clearAuthError()`
- `signIn(email, password)`
- `signUp(name, email, password)`
- `continueAsGuest(name?, email?)`
- `signOut()`
- `addCourse(courseDraft)`
- `setActiveNote(activeNoteId)`
- `updateNoteBody(id, body)`
- `createNote()`
- `renameNote(id, title)`
- `toggleFavoriteNote(id)`
- `setInstallReady(installReady)`
- `resolveTheme(mode)`

Persistence:

- persisted key: `edulence-web-state`
- storage: browser `localStorage`

## React Native State API

Defined in `edulence_rn/src/store/useAppStore.ts`.

State:

- `themeMode`
- `leftHandedMode`
- `largeText`
- `highContrast`
- `users`
- `currentUser`
- `authError`

Primary actions:

- `setThemeMode(value)`
- `setLeftHandedMode(value)`
- `setLargeText(value)`
- `setHighContrast(value)`
- `clearAuthError()`
- `signIn(email, password)`
- `signUp(name, email, password)`
- `continueAsGuest(name?, email?)`
- `signOut()`

Selector hooks:

- `useAuthState()`
- `useAuthActions()`
- `useThemePreferences()`
- `useThemeActions()`

## Electron Preload Bridge

Defined in `edulence_desktop/electron/preload.js` and exposed as `window.desktop`.

### `window.desktop.appInfo`

- `platform`

### `window.desktop.file`

- `open()`
- `save(payload)`
- `saveAs(payload)`
- `read(filePath)`
- `write(payload)`
- `openFolder()`
- `listDir(folderPath)`
- `showOpenDialog()`

### `window.desktop.app`

- `toggleTrayWindow()`
- `getRecentFiles()`
- `showItemInFolder(filePath)`
- `openPath(targetPath)`

### `window.desktop.state`

- `get()`
- `save(state)`

### `window.desktop.updater`

- `getStatus()`
- `check()`
- `download()`
- `install()`

### Desktop event subscriptions

- `onMenuCommand(callback)`
- `onWindowAction(callback)`
- `onUpdaterStatus(callback)`

## Build and Verification Interfaces

Top-level web:

- `npm run dev`
- `npm run build`
- `npm run lint`
- `npm test -- --run`
- `npm run test:e2e`

Desktop:

- `npm run dev`
- `npm run build`
- `npm run lint`
- `npm test`
- `npm run dist`

React Native:

- `npm run start`
- `npm run android`
- `npm run ios`
- `npm run lint`
- `npm run typecheck`
- `npm test`
- `npm run build:android:release`
- `npm run build:ios:release`

Flutter:

- `flutter run`
- `flutter test`
- `flutter build web`
- `flutter build macos`
- `flutter build apk --release`
- `flutter build ios --simulator`
- `flutter build ipa --release`

## Current External Service Surface

The codebase currently behaves as a local-first application suite:

- no shared backend API contract is documented in this repository
- demo auth and content are stored locally within each platform implementation
- desktop update delivery is configured through GitHub Releases for `umgc/2026_spring`

If a server-backed API is introduced later, add a dedicated HTTP API section here with request and response contracts.
