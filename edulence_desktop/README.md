# EduLense Desktop (Electron + React)

## Features implemented
- Electron main/renderer separation with secure `preload` bridge
- Native menu bar (`File`, `Edit`, `View`, `Help`)
- Keyboard shortcuts (menu accelerators + renderer handlers)
- Desktop navigation patterns (sidebar + back/forward history)
- Window state persistence (size and position)
- File system operations (open/read/save/save-as/show in folder)
- System tray integration (show/hide + quit)
- React app in renderer process (Vite)
- Auto-updater wiring (`electron-updater`) for packaged builds
- Persisted desktop preferences and mock auth session (`userData`)

## Architecture Overview
- `electron/main.js`: main process orchestration (window lifecycle, menu, tray, IPC, updater)
- `electron/preload.js`: minimal, frozen bridge exposed to renderer via `contextBridge`
- `electron/windowState.js`: persistent window bounds/maximize/fullscreen restore helpers
- `renderer/src/App.jsx`: Flutter-inspired desktop UI and stateful desktop workflows
- `renderer/src/styles.css`: Flutter-mimic Material styling and responsive desktop/mobile layouts

### Process Model
- Main process owns privileged APIs (menus, tray, dialogs, filesystem, updater, app state persistence)
- Renderer process owns UI state and user interactions (React)
- Preload script provides the only renderer-accessible bridge (`window.desktop`)
- Renderer never receives direct Node.js access

## Electron Best Practices Used
- `contextIsolation: true`
- `sandbox: true`
- `nodeIntegration: false`
- Guarded IPC handlers with sender validation
- Input validation for file/path IPC payloads
- Close-to-tray behavior with native confirmation option
- Window state restore with off-screen protection
- Debounced renderer state persistence to reduce IPC/disk churn

## Security Notes
- Privileged operations are only available through preload-exposed methods (`window.desktop.*`)
- IPC handlers validate sender identity (main window only) and sanitize/validate payloads for file/path channels
- External links are opened in the OS browser via `shell.openExternal` (new windows denied in renderer)
- Renderer runs sandboxed with Node integration disabled
- State persistence is stored in Electron `userData` (not source-controlled)
- Auto-updates are disabled in development and only active in packaged builds

## Development Build Instructions
```bash
cd /Users/kwameduodu/Edulense/EduLense/edulence_desktop
mkdir -p .cache/electron
ELECTRON_CACHE="$PWD/.cache/electron" npm install
npm run dev
```

## Production Build Instructions
```bash
cd /Users/kwameduodu/Edulense/EduLense/edulence_desktop
npm install
npm run dist
```

### Notes for Auto-Updates
- `electron-updater` is configured for GitHub Releases (`umgc/2026_spring`)
- Auto-updates require packaged app artifacts and platform signing/notarization where applicable
- Use the app menu or Settings > Auto Updates panel to check/download/install updates in packaged builds

## Run
```bash
cd edulence_desktop
npm install
npm run dev
```

## Production build (renderer)
```bash
npm run build
npm start
```
