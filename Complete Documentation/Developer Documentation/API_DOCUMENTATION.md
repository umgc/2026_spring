# API Documentation

## Scope

EduLense is primarily a client application suite. The most important APIs in this repository are internal application interfaces, state actions, route contracts, and the Electron preload bridge rather than a shared server-side HTTP API.

## Web Route API

Defined from the root React application.

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

- `*`

## Root React Web State API

Source:

- `src/state/useAppStore.ts`

State includes:

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

Primary actions include:

- `setThemeMode(themeMode)`
- `setLeftHandedMode(value)`
- `setLargeText(value)`
- `setHighContrast(value)`
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

- browser `localStorage`
- key: `edulence-web-state`

## React Native State API

Source:

- `edulence_rn/src/store/useAppStore.ts`

State includes:

- `themeMode`
- `leftHandedMode`
- `largeText`
- `highContrast`
- `users`
- `currentUser`
- `authError`

Primary actions include:

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

## Electron Desktop Preload Bridge API

Exposed as `window.desktop` from:

- `edulence_desktop/electron/preload.js`

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

### Event subscriptions

- `onMenuCommand(callback)`
- `onWindowAction(callback)`
- `onUpdaterStatus(callback)`

## External HTTP API

Current state:

- no shared production HTTP backend contract is documented in this repository
- data is local-first or demo-data driven
- if a backend is introduced later, add endpoint contracts, payload schemas, auth model, and error envelopes here
